Ninja.Models.Schools = Backbone.Collection.extend ({
  name: 'schools',
  url: '/school',
  model: Ninja.Models.School,

  parse: function (response) { return response.schools; },

  hydrate: function () {
    var deferred = $.Deferred();
    this.fetch({ success: function(model, response, options) { deferred.resolve(model);} });
    return deferred.promise();
  }

});
