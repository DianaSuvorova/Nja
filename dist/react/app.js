/** @jsx React.DOM */
Ninja.Views.App = React.createClass({displayName: 'App',

  componentDidMount: function () {
    this.props.model.on('change', this.onChange);
  },

  onChange: function () {
    this.forceUpdate(); 
  },
  
  render: function () {
    var model = this.props.model,
         view = 'Loading Data...',
         departments, courses;

    console.log(model.has('school'),model.has('department'));
    
    if (model.has('school')) {
      departments = Ninja.Views.List({
          list: model.departments, 
          school: model.get('school'), 
           key: 'school'}
        );
      if (model.has('department')) {
          courses = Ninja.Views.List({
            list: model.courses, 
            school: model.get('school'), 
            department: model.get('department'), 
           key: 'department'}
          );
       }
   }
    return (
      React.DOM.div({className: "col-lg-10"}, 
        React.DOM.div({className: "col-lg-4"}, 
          departments
        ), 
        React.DOM.div({className: "col-lg-4"}, 
          courses
        )
      )
      )
  }
});