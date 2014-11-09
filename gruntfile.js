var vendorJs = ['components/vendor/js/zepto.js',
                'components/vendor/js/react.js',
                'components/vendor/js/underscore.js',
                'components/vendor/js/backbone.js',
                'components/vendor/js/d3.v3.js'
                ];


module.exports = function (grunt) {
  grunt.initConfig({
    react: {
      files: {
        expand: true,
        cwd: 'app/views/',
        src: ['*.jsx'],
        dest: 'dist/react',
        ext: '.js'
      }
    },

    concat: {
      js:{
        src: [vendorJs, 'app/helpers/*.js', 'app/models/*.js', 'dist/react/*.js'],
        dest: 'dist/build.js'
      },
      css: {
        src: ['components/vendor/css/bootstrap/dist/css/bootstrap.css', 'dist/build.css'],
        dest: 'dist/build.css'
      }
    },
    sass: {
      dist: {
        files: {
          'dist/build.css':  'app/assets/sass/custom.scss',
        }
      }
    },
    nodemon: {
      fakepi: {
        script: 'pi/fakepi.js',
        options: {
          ignore: [ '/**', 'components/**', 'node_modules/**'],
          watch: ['pi/fakepi.js'],
          env: {PORT: '8102'}
        }
      }
    },

    concurrent: {
      app: {
        tasks: ['nodemon:fakepi', 'watch'],
        options: {logConcurrentOutput: true}
      }
    },

    watch: {
      js: {files: ['app/views/*.jsx', 'app/models/*.js', 'app/helpers/.*js'], tasks: ['react', 'concat:js']},
      css: {files: [' app/assets/sass/*.scss'], tasks: ['sass', 'concat:css']},

    }
  
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('app', ['react','sass', 'concat', 'concurrent:app']);
};