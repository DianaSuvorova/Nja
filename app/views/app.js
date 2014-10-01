Ninja.Views.App = Backbone.View.extend({
  el: 'body',

  initialize: function () {
    this.departmentsView = null;
    //new Ninja.Views.Departments({model: this.model.departments});
  },

  build: function () {
    this.currentView = this.departmentsView;
  },

  render: function () {
    if (this.previousView) this.previousView.$el.remove();
    this.$el.append(this.currentView.el);
    this.currentView.render();
  }

});
