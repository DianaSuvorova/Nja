Ninja.Router = Backbone.Router.extend({
  routes: {
    '': 'routeLogin'
  },

  routeLogin: function () {
  React.renderComponent(new RView(), document.body);

  }
});