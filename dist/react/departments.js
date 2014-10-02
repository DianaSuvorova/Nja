/** @jsx React.DOM **/

Ninja.Views.Departments = Backbone.View.extend({

  initialize : function () {
    this.listenTo(this.model, 'reset', this.render);
  },

  render : function () {
    React.renderComponent(FilterableDepartmentTable({departments: this.model.models}) , document.body);
  }

});
