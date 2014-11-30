Ninja.Models.Departments = Backbone.Collection.extend ({
  model: Ninja.Models.Department,

  initialize: function (models, options) { _.extend(this, options); },

  url: function () { return '/api/school/' + this.id;},

  parse: function (response) { return response.school_departments; },

  hydrate: function () {
    var deferred = $.Deferred();
    this.fetch({ success: function(model, response, options) { deferred.resolve(model);} });
    return deferred.promise();
  }

});
