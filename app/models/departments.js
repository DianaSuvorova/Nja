Ninja.Models.Departments = Backbone.Collection.extend ({
  model: Ninja.Models.Department,

  initialize: function (models, options) { _.extend(this, options); },

  url: function () { return '/school/' + this.id;},

  parse: function (response) { return response.school_departments; },

  getByName: function (name) { return this.findWhere({name: name}); },

  hydrate: function () {
    var deferred = $.Deferred();
    this.fetch({ success: function(model, response, options) { deferred.resolveWith(this, model);} });
    return deferred.promise();
  }

});
