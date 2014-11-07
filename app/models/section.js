Ninja.Models.Section = Backbone.Model.extend ({
  
  initialize: function () {
    this.set('id',this.get('section_id'));
    this.set('name',this.get('section_name'));
  },

  getStatusColor: function () {
    if (this.get('events')[0].status === 'Open') return 'green';
    if (this.get('events')[0].status === 'Cancelled') return 'gray';
    if (this.get('events')[0].status === 'Cancelled') return 'red';
    if (this.get('events')[0].status === 'W-List') return 'yellow';
  }


});
