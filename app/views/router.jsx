Ninja.Router = Backbone.Router.extend({
  routes: { '*anyRoute': 'proceedTo'},

  initialize: function () { this.route = []; },

  proceedTo: function (route) {
    this.route = route;
    this.modelStack = [];
    if (route) {
      var nameStack = route.split(/[//]+/);
      this.getModelStack(nameStack, globals.app.sublist);
    }
  },

  getModelStack: function (nameStack, collection) {
    var name = nameStack[0];
    var model = collection.getByName(name);
    this.modelStack.push(model);
    if (nameStack.length >1) {this.getModelStack(nameStack.slice(1), model.sublist);}
  }

});
