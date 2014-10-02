Ninja.Models.Departments = Backbone.Collection.extend ({
  url: '/departments',

  initialize: function () { this.fetch({reset: true}); }

});
