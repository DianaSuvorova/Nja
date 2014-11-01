Ninja.Router = Backbone.Router.extend({
  routes: { '*anyRoute': 'proceedTo'},

  proceedTo: function (route) {
    if (route) console.log(route.split(/[//]+/));
    if (route) globals.app.route = route.split(/[//]+/);
  }

});
