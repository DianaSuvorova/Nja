Ninja.Models.Sections = Backbone.Collection.extend ({
  model: Ninja.Models.Section,

  initialize: function (models, options) { _.extend(this, options); },

  url: function () { return '/course/' + this.id;},

  parse: function (response) { return response.course_sections; },

  getByName: function (name) { return this.findWhere({name: name}); },

  hydrate: function () {
    var deferred = $.Deferred();
    this.fetch({ success: function(model, response, options) { deferred.resolveWith(this, model);} });
    return deferred.promise();
  }


});
