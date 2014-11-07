Ninja.Models.Course = Backbone.Model.extend({
  
  initialize: function () {
    this.set('id',this.get('course_id'));
    this.sublist = new Ninja.Models.Sections([],{id: this.id});
  }
});
