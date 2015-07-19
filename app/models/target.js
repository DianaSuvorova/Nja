Ninja.Models.Target = Backbone.Model.extend ({

  initialize : function () {
    this.url = '/classes/' + this.get('school_id') + '/' + this.get('department_id') + '/'  + this.get('course_id');
  }

});