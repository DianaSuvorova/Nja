Ninja.Models.Courses = Backbone.Collection.extend ({
  name: 'courses',
  model: Ninja.Models.Course,

  initialize: function (models, options) { _.extend(this, options); },

  url: function () { return '/department/' + this.id;},

  parse: function (response) { return response.department_courses; },

  hydrate: function () {
    var deferred = $.Deferred();
    this.fetch({ success: function(model, response, options) { deferred.resolve(model);} });
    return deferred.promise();
  }

});
