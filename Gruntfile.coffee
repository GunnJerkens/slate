module.exports = (grunt) ->

  # load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks)

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    concat:
      dev:
        files:
          'public/js/slate.min.js': [
            'public/js/src/slate.js'
            'public/js/src/*.js'
          ]
          'public/js/vendor.min.js': [
            'public/js/src/vendor/jquery.js'
            'public/js/src/vendor/underscore.js'
            'public/js/src/vendor/backbone.js'
            'public/js/src/vendor/handlebars.js'
            'public/js/src/vendor/raphael.min.js'
            'public/js/src/vendor/jquery-ui.min.js'
            'public/js/src/vendor/jquery.ui.touch-punch.min.js'
          ]

    compass:
      dist:
        options:
          config: 'public/style/config.rb'
          sassDir: 'public/style/sass'
          imagesDir: 'public/img'
          cssDir: 'public/style'
          environment: 'production'
          outputStyle: 'compressed'

    browserSync:
      files:
        src: 'public/style/screen.css'
      options:
        host: "localhost"
        watchTask: true

    watch:
      styles:
        files: ['public/style/**/*.{sass,scss}']
        tasks: ['compass']
      scripts:
        files: ['public/js/src/**/*.js']
        tasks: ['concat']

  grunt.registerTask 'default', ['concat', 'compass', 'browserSync', 'watch']
