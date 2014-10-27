Ninja.Models.Schools = Backbone.Collection.extend ({
 url: '/school',
 model: Ninja.Models.School,

 parse: function (response) { return response.schools; }

});
