module.exports = function(grunt) {
    'use strict';

    var isProduction = process.argv.indexOf("--production") != -1;

    grunt.initConfig({
        pkg: require('./package'),

        jshint: {
            all: 'app/js/*.js'
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
        }
    });

    [   'grunt-sass',
        'grunt-contrib-jshint',
        'grunt-contrib-uglify',
        'grunt-contrib-jasmine',
        'grunt-contrib-watch',
        'grunt-browserify',
    ].forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'uglify', 'browserify']);

};
