Ninja.Router = Backbone.Router.extend({
  routes: { '*anyRoute': 'proceedTo'},

  initialize: function () { this.route = []; },

  proceedTo: function (route) {
    if (route) { this.route = route.split(/[//]+/).slice(0); }
  }

});
