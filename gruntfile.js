module.exports = function(grunt) {
  'use strict';

  var teamify = function(commands) {
    var parse = function(team, command, index, commands) {
      return command.replace(/\{\{TEAM\}\}/g, team);
    };

   return [ ].concat(commands.map(parse.bind(null, 'gremio')),
                     commands.map(parse.bind(null, 'inter')))
             .join('; ');
  };

  grunt.initConfig({
    pkg: require('./package'),

    browserify: {
      main: {
        files: {
          'app/build/scripts/main.js': ['app/scripts/main.js']
        }
      }
    },

    build: {
      test: ['jshint'],
      clean: ['shell:clean'],
      styles: ['sass'],
      scripts: ['browserify', 'uglify'],
      tree: ['shell:tree'],
      pack: [
        'shell:packChrome',
        'shell:packSandbox'
      ]
    },

    connect: {
      main: {
        options: {
          base: 'build/sandbox',
          hostname: '*',
          port: 8888
        }
      }
    },

    jshint: {
      main: ['app/scripts/*.js']
    },

    uglify: {
      main: {
        files: {
          'app/build/scripts/main.min.js': 'app/build/scripts/main.js'
        }
      }
    },

    sass: {
      main: {
        options: {
          outputStyle: 'compressed'
        },

        files: [{
          cwd: '.',
          expand: true,
          ext: '.css',
          flatten: true,
          src: ['app/styles/*.scss'],
          dest: 'app/build/styles'
        }]
      }
    },

    shell: {
      clean: {
        command: [
          'rm -fr app/build/*',
          'rm -fr build/*'
        ].join('; ')
      },

      tree: {
        command: (function() {
          var commands = [
            'mkdir -p build/chrome/{{TEAM}}',
            'mkdir -p build/firefox/{{TEAM}}',
            'mkdir -p build/linux/{{TEAM}}',
            'mkdir -p build/os-x/{{TEAM}}',
            'mkdir -p build/sandbox/{{TEAM}}',
            'mkdir -p build/windows/{{TEAM}}'
          ];

          return teamify(commands);
        })()
      },

      packChrome: {
        command: (function() {
          var commands = [
            'cp third/chrome/manifest.json build/chrome/{{TEAM}}/manifest.json',

            'mkdir -p build/chrome/{{TEAM}}/styles',
            'cp app/build/styles/{{TEAM}}.css build/chrome/{{TEAM}}/styles/main.css',

            'cp -R app/images/ build/chrome/{{TEAM}}/images/',
            'cp app/index.html build/chrome/{{TEAM}}/index.html',

            'mkdir -p build/chrome/{{TEAM}}/scripts',
            'cp app/build/scripts/main.min.js build/chrome/{{TEAM}}/scripts/main.js',

            'sed -i "" "s/{{ENVIRONMENT_KIND_SLUG}}/chrome/g" build/chrome/{{TEAM}}/scripts/main.js',
            'sed -i "" "s/{{ENVIRONMENT_TEAM_SLUG}}/{{TEAM}}/g" build/chrome/{{TEAM}}/scripts/main.js'
          ];

          return teamify(commands);
        })()
      },

      packSandbox: {
        command: (function() {
          var commands = [
            'mkdir -p build/sandbox/{{TEAM}}/styles',
            'cp app/build/styles/{{TEAM}}.css build/sandbox/{{TEAM}}/styles/main.css',

            'cp -R app/images/ build/sandbox/{{TEAM}}/images/',
            'cp app/index.html build/sandbox/{{TEAM}}/index.html',

            'mkdir -p build/sandbox/{{TEAM}}/scripts',
            'cp app/build/scripts/main.js build/sandbox/{{TEAM}}/scripts/main.js',

            'sed -i "" "s/{{ENVIRONMENT_KIND_SLUG}}/sandbox/g" build/sandbox/{{TEAM}}/scripts/main.js',
            'sed -i "" "s/{{ENVIRONMENT_TEAM_SLUG}}/{{TEAM}}/g" build/sandbox/{{TEAM}}/scripts/main.js'
          ];

          return teamify(commands);
        })()
      }
    },

    watch: {
      scripts: {
        files: 'app/scripts/*.js',
        tasks: ['build:test', 'build:scripts', 'build:pack']
      },

      styles: {
        files: ['app/styles/*.scss'],
        tasks: ['build:styles', 'build:pack']
      }
    }
  });

  [
    'grunt-browserify',
    'grunt-contrib-connect',
    'grunt-contrib-jasmine',
    'grunt-contrib-jasmine',
    'grunt-contrib-jshint',
    'grunt-contrib-uglify',
    'grunt-contrib-watch',
    'grunt-sass',
    'grunt-shell'
  ].forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['build', 'connect', 'watch']);

  grunt.registerMultiTask('build', function() {
    grunt.task.run(this.data);
  });
};
