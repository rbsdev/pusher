var teamify = function(commands) {
  var parse = function(team, command, index, commands) {
    return command.replace(/\{\{TEAM\}\}/g, team);
  };

  return [ ].concat(commands.map(parse.bind(null, 'gremio')),
                    commands.map(parse.bind(null, 'inter')))
            .join('; ');
};

module.exports = function(grunt) {
    'use strict';

    var isProduction = process.argv.indexOf("--production") != -1;

    grunt.initConfig({
        pkg: require('./package'),

        build: {
          clean: ['shell:clean'],
          tree: ['shell:tree'],
          pack: ['shell:packChrome']
        },

        jshint: {
            all: ['app/js/list.js', 'app/js/list.js', 'app/js/template.js', 'app/js/ajax.js']
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
              files: ['app/js/main.js', 'app/js/list.js', 'app/js/template.js', 'app/js/ajax.js'],
              tasks: ['jshint', 'browserify', 'uglify']
            },

            css: {
              files: [ "app/styles/*.scss" ],
              tasks: ["sass"]
            }
        },

        sass: {
          main: {
            options: {
              outputStyle: isProduction ? 'compressed' : 'nested',
              sourceMap: !isProduction
            },

            files: [{
              cwd: '.',
              expand: true,
              ext: '.min.css',
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
                'cp -R app/css/ build/chrome/{{TEAM}}/css/',
                'cp -R app/img/ build/chrome/{{TEAM}}/img/',
                'cp app/index.html build/chrome/{{TEAM}}/index.html',
                'cp app/js/build.min.js build/chrome/{{TEAM}}/js/build.min.js'
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
