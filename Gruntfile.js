module.exports = function(grunt) {

  grunt.initConfig({

//Using Windows7 I got an error for jpg file when using imagemin (write EOF in file)
//Chosen to use sprites for jpg images: any better solution?
jpg_sprites: {
    options: {
      compression : {
        type : "JPEG",
        quality : 100
      }
    },
    files: {
      'src/views/images' : ['dist/views/images/*.jpg'],
      'src/img' : ['dist/img/*.jpg']
    }
  },


    imagemin: {
        set1: {
          options: {
            optimizationLevel: 5,
          },
          files: [{
            expand: true,
            src: ['*.{gif,png}'],
            cwd: 'src/views/images',
            dest: 'dist/views/images',
            ext: '.png'
          }]
        },
//is set 2 needed or with src ['**/*.{gif,jpg,png}'], cwd: ['src/'] and dest: ['dist/'] all folders are covered?
        set2: {
          options: {
            optimizationLevel: 5,
          },
          files: [{
            expand: true,
            src: ['*.{gif,png}'],
            cwd: 'src/img',
            dest: 'dist/img',
            ext: '.png'
          }]
        }
    },

    htmlmin: {
      dist: {
          options: {
            removeComments: true,
            collapseWhitespace: true
          },
          files: {
            'dist/index.html': 'src/index.html',
            'dist/project-2048.html': 'src/project-2048.html',
            'dist/project-mobile.html': 'src/project-mobile.html',
            'dist/project-webperf.html': 'src/project-webperf.html',
            'dist/views/pizza.html': 'src/views/pizza.html'
          }
      }
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.css'],
          dest: 'dist/',
          ext: '.css'
    }]
    },

    uglify: {
      my_target: {
        options: {
          beautify: true,
          mangle: false
      },
      files: {
        'dist/js/perfmatters.js': 'src/js/perfmatters.js',
        'dist/views/main.js': 'src/views/main.js',
      }
    }
    },

    jshint: {
      all: ['Gruntfile.js']
  },
  /* Clear out the dist directory if it exists, not working: No 'clean' target found
    clean: {
      dev: {
        src: ['dist'],
      },
    }, */
  }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jpg-sprites');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
//grunt.loadNpmTasks('grunt-contrib-clean');
//task clean deleted, since not resolved error
  grunt.registerTask('default', ['jpg_sprites', 'imagemin', 'htmlmin', 'cssmin', 'uglify', 'jshint']);

};