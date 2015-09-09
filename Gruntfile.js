'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    var path = {
            work: 'work',
            scss: 'work/_scss',
            css:  'work/css',
            js:   'work/js',
            img:  'work/img',
            dist: 'dist'
        };

    grunt.initConfig({
        path: path,

        // sass compile
        sass: {
            options: {
                sourcemap: 'auto'
            },
            prototype : {
                options: {
                    style: 'expanded'
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.scss %>/',
                        src: ['*.scss'],
                        dest: '<%= path.css %>/',
                        ext: '.css'
                    },
                ]
            }
        },

        // autoprefixer
        autoprefixer: {
            options: {
                browsers: [
                    'last 2 versions',
                    'Explorer >= 8',
                    'Firefox ESR',
                    'Safari >= 7',
                    'Android >= 4.0',
                    'iOS >= 7'
                ],
                map: {
                    inline: false
                }
            },
            prototype: {
                expand: true,
                cwd: '<%= path.css %>',
                dest: '<%= path.css %>',
                src: '**/*.css'
            }
        },

        // watch files
        watch: {
            css: {
                files: ['<%= path.css %>/**'],
                tasks: ['newer:autoprefixer']
            },
            sass: {
                files: ['<%= path.scss %>/**'],
                tasks: ['sass']
            }
        },

        // established server
        browserSync: {
            prototype: {
                options: {
                    server: {
                        baseDir: '<%= path.work %>',
                        directory: true
                    },
                    ui: {
                      port: 9010
                    },
                    ghostMode: {
                      clicks: false,
                      location: false,
                      forms: false,
                      scroll: false
                    },
                    port: 9000,
                    notify: false,
                    watchTask: true
                },
                src: '<%= path.work %>'
            }
        },


        // clean
        clean: {
           dist: ['<%= path.dist %>/*']
        },

        // copy
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= path.work %>/',
                        dest: '<%= path.dist %>',
                        filter: 'isFile',
                        src: [
                            '**/*',
                            '!_scss/**'
                        ]
                    }
                ]
            }
        }

    });


    grunt.registerTask('serve', function(name) {
        grunt.task.run([
            'sass',
            'autoprefixer',
            'browserSync',
            'watch',
        ]);
    });

    grunt.registerTask('default', [
        'sass',
        'autoprefixer',
        'clean',
        'copy'
    ]);

};
