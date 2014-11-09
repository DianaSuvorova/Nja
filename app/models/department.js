Ninja.Models.Department = Backbone.Model.extend ({

  initialize: function () {
    this.set('id',this.get('department_id'));
    this.set('name', this.get('name').replace('/','-'));
    this.sublist = new Ninja.Models.Courses([],{id: this.id});

  },

});
