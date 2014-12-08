var os = require('os'),
    pkg = require('./package'),
    platform = os.platform(),
    teamify,
    isDarwin = platform == 'darwin';

teamify = function(commands) {
  var parse = function(team_name, team_nick, team_slug, command, index, commands) {
    return command.replace(/\{\{BUILD_TEAM_NAME\}\}/g, team_name)
                  .replace(/\{\{BUILD_TEAM_NICK\}\}/g, team_nick)
                  .replace(/\{\{BUILD_TEAM_SLUG\}\}/g, team_slug)
                  .replace(/\{\{BUILD_VERSION\}\}/g, pkg.version);
  };

 return [ ].concat(commands.map(parse.bind(null, 'Grêmio', 'Gremista', 'gremio')),
                   commands.map(parse.bind(null, 'Inter', 'Colorado', 'inter')))
           .join('; ');
};

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: pkg,

    browserify: {
      main: {
        files: {
          'app/build/scripts/main.js': ['app/scripts/main.js']
        }
      },

      specs: {
        files: {
          'test/build/spec.build.js': ['test/spec.*.js']
        }
      }
    },

    jasmine: {
      dev: {
        src: ['app/js/build.js'],
        options: {
          specs: 'test/build/spec.build.js'
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
        options: {
          beautify: true
        },
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
            'sed -i ' + (isDarwin ? '""' : '') + ' "s/{{ENVIRONMENT_TEAM_NICK}}/{{BUILD_TEAM_NICK}}/g" build/chrome/{{BUILD_TEAM_SLUG}}/manifest.json',
            'sed -i ' + (isDarwin ? '""' : '') + ' "s/{{ENVIRONMENT_VERSION}}/{{BUILD_VERSION}}/g" build/chrome/{{BUILD_TEAM_SLUG}}/manifest.json',

            'mkdir -p build/chrome/{{BUILD_TEAM_SLUG}}/styles',
            'cp app/build/styles/{{BUILD_TEAM_SLUG}}.css build/chrome/{{BUILD_TEAM_SLUG}}/styles/main.css',

            'mkdir -p build/chrome/{{BUILD_TEAM_SLUG}}/images',
            'cp app/images/* build/chrome/{{BUILD_TEAM_SLUG}}/images/ 1>/dev/null 2>&1',
            'cp -R app/images/{{BUILD_TEAM_SLUG}}/ build/chrome/{{BUILD_TEAM_SLUG}}/images/',

            'cp app/index.html build/chrome/{{BUILD_TEAM_SLUG}}/index.html',

            'mkdir -p build/chrome/{{BUILD_TEAM_SLUG}}/scripts',
            'cp app/build/scripts/main.min.js build/chrome/{{BUILD_TEAM_SLUG}}/scripts/main.js',

            'sed -i ' + (isDarwin ? '""' : '') + ' "s/{{ENVIRONMENT_TEAM_NICK}}/{{BUILD_TEAM_NICK}}/g" build/chrome/{{BUILD_TEAM_SLUG}}/index.html',
            'sed -i ' + (isDarwin ? '""' : '') + ' "s/{{ENVIRONMENT_TEAM_SLUG}}/{{BUILD_TEAM_SLUG}}/g" build/chrome/{{BUILD_TEAM_SLUG}}/index.html',

            'sed -i ' + (isDarwin ? '""' : '') + ' "s/{{ENVIRONMENT_KIND_SLUG}}/chrome/g" build/chrome/{{BUILD_TEAM_SLUG}}/scripts/main.js',
            'sed -i ' + (isDarwin ? '""' : '') + ' "s/{{ENVIRONMENT_TEAM_SLUG}}/{{BUILD_TEAM_SLUG}}/g" build/chrome/{{BUILD_TEAM_SLUG}}/scripts/main.js',

            'cd build/chrome/{{BUILD_TEAM_SLUG}}',
            'zip -r "{{BUILD_TEAM_SLUG}}-{{BUILD_VERSION}}.zip" * 1>/dev/null 2>&1',
            'mv "{{BUILD_TEAM_SLUG}}-{{BUILD_VERSION}}.zip" ..',
            'cd ../../..'
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
            'cp app/images/* build/sandbox/{{BUILD_TEAM_SLUG}}/images/ 1>/dev/null 2>&1',
            'cp -R app/images/{{BUILD_TEAM_SLUG}}/ build/sandbox/{{BUILD_TEAM_SLUG}}/images/',

            'cp app/index.html build/sandbox/{{BUILD_TEAM_SLUG}}/index.html',

            'mkdir -p build/sandbox/{{BUILD_TEAM_SLUG}}/scripts',
            'cp app/build/scripts/main.js build/sandbox/{{BUILD_TEAM_SLUG}}/scripts/main.js',

            'sed -i ' + (isDarwin ? '""' : '') + ' "s/{{ENVIRONMENT_TEAM_NICK}}/{{BUILD_TEAM_NICK}}/g" build/sandbox/{{BUILD_TEAM_SLUG}}/index.html',
            'sed -i ' + (isDarwin ? '""' : '') + ' "s/{{ENVIRONMENT_TEAM_SLUG}}/{{BUILD_TEAM_SLUG}}/g" build/sandbox/{{BUILD_TEAM_SLUG}}/index.html',

            'sed -i ' + (isDarwin ? '""' : '') + ' "s/{{ENVIRONMENT_KIND_SLUG}}/sandbox/g" build/sandbox/{{BUILD_TEAM_SLUG}}/scripts/main.js',
            'sed -i ' + (isDarwin ? '""' : '') + ' "s/{{ENVIRONMENT_TEAM_SLUG}}/{{BUILD_TEAM_SLUG}}/g" build/sandbox/{{BUILD_TEAM_SLUG}}/scripts/main.js'
          ];

          return teamify(commands);
        })()
      }
    },

    watch: {
      html: {
        files: 'app/index.html',
        tasks: ['build:pack']
      },

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

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('test', ['browserify:specs', 'jasmine']);
  grunt.registerTask('default', ['build', 'connect', 'watch']);

  grunt.registerMultiTask('build', function() {
    grunt.task.run(this.data);
  });
};
