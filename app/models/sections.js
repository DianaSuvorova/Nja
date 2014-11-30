Ninja.Models.Sections = Backbone.Collection.extend ({
  model: Ninja.Models.Section,

  initialize: function (models, options) { _.extend(this, options); },

  url: function () { return '/course/' + this.id;},

  parse: function (response) { return response.course_sections; },

  hydrate: function () {
    var deferred = $.Deferred();
    this.fetch({ success: function(model, response, options) { deferred.resolve(model);} });
    return deferred.promise();
  }


});
