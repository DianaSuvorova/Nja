Ninja.Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    ':schoolId': 'goToSchool',
    ':schoolId/:departmentId': 'goToDepartment',
    ':schoolId/:departmentId/:courseId': 'goToCourse'
  },

  goToSchool: function (schoolId) {
    this.school = schoolId;

  },
  
  goToDepartment: function (schoolId, departmentId) {
    this.school = schoolId;
    this.department = departmentId;
  },
  
  goToCourse: function (schoolId, departmentId, courseId) {
    this.school = schoolId;
    this.department = departmentId;
    this.course = courseId;
  }

});
