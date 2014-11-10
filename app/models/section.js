Ninja.Models.Section = Backbone.Model.extend ({
  
  initialize: function () {
    this.set('id',this.get('section_id'));
    this.set('name',this.get('section_name'));
    this.sublist = new Ninja.Models.Events(this.get('events'));
    var splitSection = this.get('name').split(' ');
    this.sectionType = splitSection[0];
    this.sectionId = (splitSection.length >1 ) ? splitSection[1] : '-';

  }

});
