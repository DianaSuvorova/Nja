Ninja.Models.School = Backbone.Model.extend ({

  initialize: function () {
    this.set('id',this.get('school_id'));
    this.set('name',this.get('school_name'));
  },

});
