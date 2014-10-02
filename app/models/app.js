Ninja.Models.App = Backbone.Model.extend({
  
  setSchool: function (school) {
    this.set('school', school);
    this.trigger('change:school');
  }

});
