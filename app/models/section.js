Ninja.Models.Section = Backbone.Model.extend ({
  
  initialize: function () {
    this.set('id',this.get('section_id'));
    this.set('name',this.get('section_name').replace('/','-'));
  }

});
