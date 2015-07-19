Ninja.Models.Profile = Backbone.Model.extend ({

  url: function () { return '/api/target';},

  hydrate: function () {
    var deferred = $.Deferred();
    this.fetch({
      headers: {'Authorization' : globals.readCookie('access_token')},
      success: function(model, response, options) { this.onHydrate(); deferred.resolve(model, null); }.bind(this),
      error: function(model, response, options) { deferred.resolve(model, response.responseJSON); },
    });
    return deferred.promise();
  },

  onHydrate: function () {
   if (this.get('targets').length) this.targets = new Ninja.Models.Targets(this.get('targets'));
  }

});