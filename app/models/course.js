Ninja.Models.Course = Backbone.Model.extend({
  
  initialize: function () {
    this.set('id',this.get('course_id'));
    this.set('name', this.get('name').replace('/','-'));
    this.sublist = new Ninja.Models.Sections([],{id: this.id});
  }
});
