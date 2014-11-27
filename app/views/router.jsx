Ninja.Router = Backbone.Router.extend({
  routes: { '*anyRoute': 'proceedTo'},

  inititalize: function () { this.stack = []; this.previousStack = []; },

  proceedTo: function (path) {
    this.path = path;
    this.previousStack = this.stack ? this.stack : [];
    if (path) {
      this.stack = path.split(/[//]+/);
    }
    else this.stack = [];
  }

});
