module.exports = function(grunt) {

    'use strict';

    grunt.initConfig({
        pkg: require('./package'),

        jshint: {
            all: 'app/js/list.js'
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

    [
        'grunt-contrib-connect',
        'grunt-contrib-jshint',
        'grunt-contrib-uglify',
        'grunt-contrib-jasmine',
        'grunt-contrib-watch',
        'grunt-browserify'
    ].forEach(grunt.loadNpmTasks);

  grunt.registerTask('default', ['uglify', 'browserify', 'connect:server', 'watch']);

};
