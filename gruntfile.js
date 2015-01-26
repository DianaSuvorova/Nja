var vendorJs = ['components/vendor/js/jquery-2.1.1.min.js',
                'components/vendor/js/react.js',
                'components/vendor/js/underscore.js',
                'components/vendor/js/backbone.js',
                'components/vendor/js/d3.v3.js'                ];


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
      ga:{
        src: ['components/ga.js'],
        dest: 'dist/ga.js'
      },
      no_ga:{
        src: ['components/ga_empty.js'],
        dest: 'dist/ga.js'
      }
    },
    less: {
      dist: {
        files: {
          'dist/build.css':  'app/assets/less/main.less',
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
      css: {files: [' app/assets/less/*.less'], tasks: ['less']},
    },
    cssmin: {
      combine: {
        files: {'dist/build.css': ['dist/build.css']}
      }
    },
   uglify: {
      options: {
        mangle: true,
        compress: true,
      },
      target: {
        files: {'dist/build.js': ['dist/build.js']}
      }
    }
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('app', ['react','less', 'concat:js', 'concat:no_ga', 'concurrent:app']);
  grunt.registerTask('build', ['react', 'less', 'concat:js', 'concat:ga', 'cssmin', 'uglify']);
};