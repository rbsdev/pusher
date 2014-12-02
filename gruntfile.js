module.exports = function(grunt) {
    'use strict';

    var isProduction = process.argv.indexOf("--production") != -1;

    grunt.initConfig({
        pkg: require('./package'),

        jshint: {
            all: ['app/js/list.js', 'app/js/template.js', 'app/js/ajax.js']
        },

        uglify: {
            build: {
                files: {
                    'app/js/build.min.js': 'build.js'
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    'app/js/build.js': 'app/js/*.js'
                }
            }
        },

        watch: {
            // files: ['<%= jshint.files %>'],
            // tasks: ['jshint']
            js: {
              files: [ 'app/js/*.js' ],
              tasks: ['jshint']
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
        }
    });

    [   'grunt-sass',
        'grunt-contrib-jshint',
        'grunt-contrib-uglify',
        'grunt-contrib-jasmine',
        'grunt-contrib-watch',
        'grunt-browserify',
        'grunt-contrib-connect',
    ].forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['uglify', 'browserify', 'connect:server', 'jshint', 'watch']);

};
