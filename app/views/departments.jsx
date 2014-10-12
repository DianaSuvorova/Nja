/** @jsx React.DOM **/

Ninja.Views.Departments = Backbone.View.extend({

  initialize : function () {
    this.listenTo(this.model, 'reset', this.render);
  },

  render : function () {
    React.renderComponent(<Ninja.Views.FilterableDepartmentTable departments = {this.model} /> , document.body);
  }

});
