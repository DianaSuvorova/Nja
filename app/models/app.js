Ninja.Models.App = Backbone.Model.extend({

  initialize: function () {
    this.schools = new Ninja.Models.Schools();
  },

  setDepartments: function (schoolId) {
    console.log('setDepartments');
    this.departments = new Ninja.Models.Departments({school_id: this.schools.findWhere({name: schoolId}).id});
  }

});
