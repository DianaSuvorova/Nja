Ninja.Models.Profile = Backbone.Model.extend ({

  url: function () { return '/api/target';},

  hydrate: function () {
    var deferred = $.Deferred();
    this.fetch({
      headers: {'Authorization' : globals.readCookie('access_token')},
      success: function(model, response, options) { deferred.resolve(model);}
    });
    return deferred.promise();
  }

});