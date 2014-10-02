Ninja.Views.App = Backbone.View.extend({
  el: 'body',

  initialize: function () {
    this.departmentsView = new Ninja.Views.Departments( {model: new Ninja.Models.Departments()});
    this.listenTo(this.model, 'change:school', this.build);
  },

  build: function () {
    this.currentView = this.departmentsView;
    this.render();
  },

  render: function () {
    if (this.previousView) this.previousView.$el.remove();
    this.$el.append(this.currentView.el);
    this.currentView.render();
  }

});
