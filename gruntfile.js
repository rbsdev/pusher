var teamify = function(commands) {
  var parse = function(team, command, index, commands) {
    return command.replace(/\{\{TEAM\}\}/g, team);
  };

  return [ ].concat(commands.map(parse.bind(null, 'gremio')),
                    commands.map(parse.bind(null, 'inter')))
            .join('; ');
};

var files = {
  js: ['app/js/list.js', 'app/js/template.js', 'app/js/ajax.js', 'app/js/humanize-date.js']
}

module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: require('./package'),

        build: {
          test: ['jshint'],
          styles: ['sass'],
          scripts: ['browserify', 'uglify'],
          clean: ['shell:clean'],
          tree: ['shell:tree'],
          pack: ['shell:packChrome']
        },

        jshint: {
            all: files.js
        },

        uglify: {
            build: {
                files: {
                    'app/js/build.min.js': 'app/js/build.js'
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    'app/js/build.js': ['app/js/main.js']
                }
            }
        },

        watch: {
            // files: ['<%= jshint.files %>'],
            // tasks: ['jshint']
            js: {
              files: files.js,
              tasks: ['build:test', 'build:scripts']
            },

            css: {
              files: [ "app/styles/*.scss" ],
              tasks: ["build:styles"]
            }
        },

        sass: {
          main: {
            options: {
              outputStyle: 'compressed',
              sourceMap: false
            },

            files: [{
              cwd: '.',
              expand: true,
              ext: '.css',
              flatten: true,
              src: ["app/styles/*.scss"],
              dest: "app/css"
            }]
          }
        },

        connect: {
            server: {
                options: {
                    port: 8888,
                    keepalive: false
                }
            }
        },

        shell: {
          clean: {
            command: 'rm -fr build/*'
          },
          tree: {
            command: (function() {
              var commands = [
                'mkdir -p build/chrome/{{TEAM}}',
                'mkdir -p build/firefox/{{TEAM}}',
                'mkdir -p build/linux/{{TEAM}}',
                'mkdir -p build/os-x/{{TEAM}}',
                'mkdir -p build/windows/{{TEAM}}',
              ];

              return teamify(commands);
            })()
          },
          packChrome: {
            command: (function() {
              var commands = [
                'cp app/chrome/manifest.json build/chrome/{{TEAM}}/manifest.json',

                'mkdir -p build/chrome/{{TEAM}}/css',
                'cp app/css/{{TEAM}}.css build/chrome/{{TEAM}}/css/main.css',

                'cp -R app/img/ build/chrome/{{TEAM}}/img/',
                'cp app/index.html build/chrome/{{TEAM}}/index.html',

                'mkdir -p build/chrome/{{TEAM}}/js',
                'cp app/js/build.js build/chrome/{{TEAM}}/js/build.js',
                'cp app/js/build.min.js build/chrome/{{TEAM}}/js/build.min.js',

                'sed -i "" "s/{{ENVIRONMENT_KIND_SLUG}}/chrome/g" build/chrome/{{TEAM}}/js/build.js build/chrome/{{TEAM}}/js/build.min.js',
                'sed -i "" "s/{{ENVIRONMENT_TEAM_SLUG}}/{{TEAM}}/g" build/chrome/{{TEAM}}/js/build.js build/chrome/{{TEAM}}/js/build.min.js'
              ];

              return teamify(commands);
            })()
          }
        }
    });

    [   'grunt-sass',
        'grunt-contrib-jshint',
        'grunt-contrib-uglify',
        'grunt-contrib-jasmine',
        'grunt-contrib-watch',
        'grunt-browserify',
        'grunt-contrib-connect',
        'grunt-shell'
    ].forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['connect:server', 'watch']);

  grunt.registerMultiTask('build', function() {
    grunt.task.run(this.data);
  });
};
