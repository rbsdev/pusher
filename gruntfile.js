module.exports = function(grunt) {

    'use strict';

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
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        }
    });

    [
        'grunt-contrib-jshint',
        'grunt-contrib-uglify',
        'grunt-contrib-jasmine',
        'grunt-browserify',
    ].forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['jshint', 'uglify']);

};
