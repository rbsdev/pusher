module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        pkg: require('./package'),

        jshint: {
            all: 'app/js/*.js'
        },

        browserify: {
            dist: {
                files: {
                    'app/js/build.js': 'app/js/*.js'
                }
            }
        }
    });

    [
        'grunt-contrib-jshint',
        'grunt-contrib-uglify',
        'grunt-contrib-jasmine',
        'grunt-browserify',
    ].forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', [ ]);
};
