Ninja.Models.App = Backbone.Model.extend({
  initialize: function () {
    this.departments = new Ninja.Models.Departments();
  }

});
