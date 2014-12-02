Ninja.Router = Backbone.Router.extend({
  routes: { '*anyRoute': 'proceedTo'},

  inititalize: function () { this.stack = []; this.previousStack = []; },

  proceedTo: function (path) {
    var stack;
    this.path = path;
    this.previousStack = this.stack ? this.stack : [];
    if (path) {
      stack = path.split(/[//]+/);
      if (stack[0] === "classes") {
        this.stack = stack.slice(1, stack.length)
      }
    }
    else this.stack = [];
  }

});
