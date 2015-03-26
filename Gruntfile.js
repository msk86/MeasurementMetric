module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            dist: {
                src: [
                    'public/vendor/jquery/*.js',
                    'public/vendor/highcharts/*.js',
                    'public/vendor/angularjs/*.js',
                    'public/vendor/moment/*.js',
                    'public/vendor/ng-contextmenu/*.js',

                    'public/javascripts/libs/*.js',

                    'public/javascripts/*.js',
                    'public/javascripts/helpers/*.js',
                    'public/javascripts/services/*.js',
                    'public/javascripts/directives/*.js',
                    'public/javascripts/controllers/*.js'
                ],
                dest: 'public/javascripts/mm.js'
            }
        },
        uglify: {
            build: {
                src: 'public/javascripts/mm.js',
                dest: 'public/javascripts/mm.min.js'
            }
        },
        clean: ['build', 'dist', 'public/javascripts/mm.js', 'public/javascripts/mm.min.js'],
        watch: {
            source: {
                files: ['sass/**/*.scss'],
                tasks: ['sass'],
                options: {
                    livereload: true// needed to run LiveReload
                }
            },
            spec: {
                files: ['public/**/*', 'spec/**/*.js'],
                tasks: ['package'],
                options: {
                    spawn: true
                }
            }
        },
        sass: {
            dist: {
                files: {
                    'public/stylesheets/style.css' : 'sass/application.scss'
                }
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: 'public/vendor/'
                }
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-sass');


    grunt.registerTask('compile-assets', ['sass']);
    grunt.registerTask('package', ['clean', 'compile-assets', 'concat', 'uglify']);

    // Default task(s).
    grunt.registerTask('default', ['bower']);

};
