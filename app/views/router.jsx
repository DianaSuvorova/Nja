Ninja.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    ':schoolId': 'goToSchool',
    ':schoolId/:departmentId': 'goToDepartment',
    ':schoolId/:departmentId/:courseId': 'goToCourse'
  },

  goToSchool: function (schoolId) {
    globals.app.set('school',schoolId);
  },
  
  goToDepartment: function (schoolId, departmentId) {
    globals.app.set('school', schoolId);
    globals.app.set('department', departmentId);
  },
  
  goToCourse: function (schoolId, departmentId, courseId) {
    globals.app.set('school', schoolId);
    globals.app.set('department', departmentId);
    globals.app.set('course', courseId);
  }

});
