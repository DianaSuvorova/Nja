/** @jsx React.DOM **/
Ninja.Router = Backbone.Router.extend({
  routes: {
    '': 'routeLogin'
  },

  routeLogin: function () {
//    globals.app.model.setSchool('ucla');
    React.renderComponent(<Ninja.Views.FilterableDepartmentTable departments = {new Ninja.Models.Departments()} /> , document.body);
  }

});
