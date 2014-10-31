Ninja.Models.Courses = Backbone.Collection.extend ({
  name: 'courses',
  model: Ninja.Models.Course,

  initialize: function (models, options) { _.extend(this, options); },

  url: function () { return '/department/' + this.id;},

  parse: function (response) { return response.department_courses; },

  getByName: function (name) { return this.findWhere({name: name}); },

  hydrate: function () {
    var deferred = $.Deferred();
    this.fetch({ success: function(model, response, options) { deferred.resolveWith(this, model);} });
    return deferred.promise();
  }

});
