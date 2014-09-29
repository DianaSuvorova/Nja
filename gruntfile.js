var vendorJs = ['components/vendor/js/zepto.js',
                'components/vendor/js/react.js',
                'components/vendor/js/underscore.js',
                'components/vendor/js/d3.v3.js'
                ];


module.exports = function (grunt) {
  grunt.initConfig({
    react: {
      files: {
        expand: true,
        cwd: 'JSX',
        src: ['*.jsx'],
        dest: 'dist',
        ext: '.js'
      }
    },

    concat: {
      js:{
        src: [vendorJs, 'dist/index.js'],
        dest: 'dist/build.js'
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
      js: {files: ['JSX/*.jsx'], tasks: ['react', 'concat']},
    }
  
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('app', ['react', 'concat', 'concurrent:app']);
};