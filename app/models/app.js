Ninja.Models.App = Backbone.Model.extend({

  initialize: function () {
    this.sublist = new Ninja.Models.Schools();
  },

});
