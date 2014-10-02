Ninja.Router = Backbone.Router.extend({
  routes: {
    '': 'routeLogin'
  },

  routeLogin: function () {
    globals.app.model.setSchool('ucla');
  }
});
