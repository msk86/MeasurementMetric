module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: './',
                        dest: 'dist/',
                        src: [
                            'public/javascripts/**/*.js',
                            'app.js'
                        ]
                    }
                ]
            },
            build: {
                src: 'public/javascripts/*.js',
                dest: 'dist/MeasureMetric.min.js'
            }
        },
        clean: ['build', 'dist', 'test-data/assets'],
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
                    'public/stylesheets/style.css' : 'sass/style.scss'
                }
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-sass');


    grunt.registerTask('compile-assets', ['shell:compile', 'shell:css2js']);
    grunt.registerTask('package', ['compile-assets', 'uglify']);


    // Default task(s).
    grunt.registerTask('default', ['uglify']);

};
