Ninja.Models.App = Backbone.Model.extend({

  initialize: function () {
    this.departments = new Ninja.Models.Departments();
    this.courses = new Ninja.Models.Courses();
    this.course = new Ninja.Models.Course();
  }

});
