Ninja.Models.Event = Backbone.Model.extend ({

  getStatusColor: function () {
    if (this.get('status') === 'Open') return 'green';
    if (this.get('status') === 'Cancelled') return 'gray';
    if (this.get('status') === 'Cancelled' || this.get('status') === 'Closed') return 'red';
    if (this.get('status') === 'W-List') return 'gold';
  },

});
