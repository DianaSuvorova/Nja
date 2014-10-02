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
        src: [vendorJs, 'app/views/*.js', 'app/models/*.js', 'app/helpers/*.js', 'dist/react/*.js'],
        dest: 'dist/build.js'
      },
      all:{
        src: ['blocks/header.html','dist/bootstrap.css','blocks/body.html','dist/build.js','blocks/footer.html'],
        dest: 'index.html'
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
      js: {files: ['JSX/*.jsx','app/**/.*js', 'app/views/*.js', 'app/models/*.js', 'app/helpers/.*js'],
      tasks: ['react', 'concat:js','concat:all']},
    }
  
  });

  grunt.loadNpmTasks('grunt-react');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('app', ['react', 'concat:js', 'concat:all', 'concurrent:app']);
};