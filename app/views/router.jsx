Ninja.Router = Backbone.Router.extend({
  routes: { '*anyRoute': 'proceedTo'},

  proceedTo: function (path) {
    this.path = path;
    if (path) {
      this.stack = path.split(/[//]+/);
    }
    else this.stack = [];
  }

});
