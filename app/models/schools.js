Ninja.Models.Schools = Backbone.Collection.extend ({
  name: 'schools',
  url: '/school',
  model: Ninja.Models.School,


  parse: function (response) { return response.schools; },

  getByName: function (name) { return this.findWhere({name: name}); },

  hydrate: function () {
    var deferred = $.Deferred();
    this.fetch({ success: function(model, response, options) { deferred.resolveWith(this, model);} });
    return deferred.promise();
  },


  lookup: function(name) {
    var model;
    var deferred = $.Deferred();

    if (model = this.getByName(name)) { deferred.resolveWith(this, model);}
    else {
        model = new Model({id: id});
        model.fetch({
            success: function(model, response, options) {
                deferred.resolveWith(this, model);
            }
        });
    }

    // Returning a Promise so that only this function can modify
    // the Deferred object
    return deferred.promise();
}

});
