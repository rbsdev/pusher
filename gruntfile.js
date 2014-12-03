module.exports = function(grunt) {
  'use strict';

  var teamify = function(commands) {
    var parse = function(team_name, team_nick, team_slug, command, index, commands) {
      return command.replace(/\{\{BUILD_TEAM_NAME\}\}/g, team_name)
                    .replace(/\{\{BUILD_TEAM_NICK\}\}/g, team_nick)
                    .replace(/\{\{BUILD_TEAM_SLUG\}\}/g, team_slug);
    };

   return [ ].concat(commands.map(parse.bind(null, 'Grêmio', 'Gremista', 'gremio')),
                     commands.map(parse.bind(null, 'Inter', 'Colorado', 'inter')))
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
            'mkdir -p build/chrome/{{BUILD_TEAM_SLUG}}',
            'mkdir -p build/firefox/{{BUILD_TEAM_SLUG}}',
            'mkdir -p build/linux/{{BUILD_TEAM_SLUG}}',
            'mkdir -p build/os-x/{{BUILD_TEAM_SLUG}}',
            'mkdir -p build/sandbox/{{BUILD_TEAM_SLUG}}',
            'mkdir -p build/windows/{{BUILD_TEAM_SLUG}}'
          ];

          return teamify(commands);
        })()
      },

      packChrome: {
        command: (function() {
          var commands = [
            'cp third/chrome/manifest.json build/chrome/{{BUILD_TEAM_SLUG}}/manifest.json',
            'sed -i "" "s/{{ENVIRONMENT_TEAM_NICK}}/{{BUILD_TEAM_NICK}}/g" build/chrome/{{BUILD_TEAM_SLUG}}/manifest.json',

            'mkdir -p build/chrome/{{BUILD_TEAM_SLUG}}/styles',
            'cp app/build/styles/{{BUILD_TEAM_SLUG}}.css build/chrome/{{BUILD_TEAM_SLUG}}/styles/main.css',

            'mkdir -p build/chrome/{{BUILD_TEAM_SLUG}}/images',
            'cp -R app/images/zh.svg build/chrome/{{BUILD_TEAM_SLUG}}/images/',
            'cp -R app/images/{{BUILD_TEAM_SLUG}}/ build/chrome/{{BUILD_TEAM_SLUG}}/images/',

            'cp app/index.html build/chrome/{{BUILD_TEAM_SLUG}}/index.html',

            'mkdir -p build/chrome/{{BUILD_TEAM_SLUG}}/scripts',
            'cp app/build/scripts/main.min.js build/chrome/{{BUILD_TEAM_SLUG}}/scripts/main.js',

            'sed -i "" "s/{{ENVIRONMENT_TEAM_NICK}}/{{BUILD_TEAM_NICK}}/g" build/chrome/{{BUILD_TEAM_SLUG}}/index.html',
            'sed -i "" "s/{{ENVIRONMENT_TEAM_SLUG}}/{{BUILD_TEAM_SLUG}}/g" build/chrome/{{BUILD_TEAM_SLUG}}/index.html',

            'sed -i "" "s/{{ENVIRONMENT_KIND_SLUG}}/chrome/g" build/chrome/{{BUILD_TEAM_SLUG}}/scripts/main.js',
            'sed -i "" "s/{{ENVIRONMENT_TEAM_SLUG}}/{{BUILD_TEAM_SLUG}}/g" build/chrome/{{BUILD_TEAM_SLUG}}/scripts/main.js'
          ];

          return teamify(commands);
        })()
      },

      packSandbox: {
        command: (function() {
          var commands = [
            'mkdir -p build/sandbox/{{BUILD_TEAM_SLUG}}/styles',
            'cp app/build/styles/{{BUILD_TEAM_SLUG}}.css build/sandbox/{{BUILD_TEAM_SLUG}}/styles/main.css',

            'mkdir -p build/sandbox/{{BUILD_TEAM_SLUG}}/images',
            'cp -R app/images/zh.svg build/sandbox/{{BUILD_TEAM_SLUG}}/images/',
            'cp -R app/images/{{BUILD_TEAM_SLUG}}/ build/sandbox/{{BUILD_TEAM_SLUG}}/images/',

            'cp app/index.html build/sandbox/{{BUILD_TEAM_SLUG}}/index.html',

            'mkdir -p build/sandbox/{{BUILD_TEAM_SLUG}}/scripts',
            'cp app/build/scripts/main.js build/sandbox/{{BUILD_TEAM_SLUG}}/scripts/main.js',

            'sed -i "" "s/{{ENVIRONMENT_TEAM_NICK}}/{{BUILD_TEAM_NICK}}/g" build/sandbox/{{BUILD_TEAM_SLUG}}/index.html',
            'sed -i "" "s/{{ENVIRONMENT_TEAM_SLUG}}/{{BUILD_TEAM_SLUG}}/g" build/sandbox/{{BUILD_TEAM_SLUG}}/index.html',

            'sed -i "" "s/{{ENVIRONMENT_KIND_SLUG}}/sandbox/g" build/sandbox/{{BUILD_TEAM_SLUG}}/scripts/main.js',
            'sed -i "" "s/{{ENVIRONMENT_TEAM_SLUG}}/{{BUILD_TEAM_SLUG}}/g" build/sandbox/{{BUILD_TEAM_SLUG}}/scripts/main.js'
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
