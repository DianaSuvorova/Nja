Ninja.Models.Departments = Backbone.Collection.extend ({

  initialize: function (models, options) { _.extend(this, options); },

  url: function () {
    console.log('/school/' + this.school_id);
    return '/school/' + this.school_id;
  },

  parse: function (response) { return response.school_departments; }

});
