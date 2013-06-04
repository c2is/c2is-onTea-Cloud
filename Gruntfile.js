/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      less: {
        files: 'less/*.less',
        tasks: ['mincss']
      },
      js: {
        files: 'js/*.js',
        tasks: ['minjs']
      }
    },
	
	smushit:{
	  path: {
		src:'images/common'
	  }
	},

    uglify: {
	  fixed: {
		src: [
			'vendors/fixed-fixed/fixedfixed.js'
		],
		dest: 'js/min/fixed.min.js'
	  }
    },

    recess: {
      dist: {
        options: {
		  compile: true
        },
        files: {
          'css/normalize.css': [
			'vendors/normalize-css/normalize.css'
          ],
          'css/fixed.css': [
             'less/fixed.less'
          ]
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-smushit');

  grunt.registerTask('default', ['recess','uglify']);
  grunt.registerTask('mincss', 'recess');
  grunt.registerTask('minjs', 'uglify');
  grunt.registerTask('minjscss', ['recess','uglify']);

  grunt.registerTask('minjs:fixed', 'uglify:fixed');
};
