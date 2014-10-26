/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function () {
    return {
      school: this.props.router.school,
      department: this.props.router.department,
      course: this.props.router.course
    };
  },

  onNavigate: function () {
    var url;
    if (this.state.school) {
      url = '/' + this.state.school;
      if (this.state.department) {
        url = url + '/' + this.state.department ;
        if (this.state.course) url = url + '/' + this.state.course;
      }
    }
    this.props.router.navigate(url);
  },

  componentWillUpdate: function (nextProps, nextState) {
    var url;
    if (nextState.school) url = '/' + nextState.school;
    if (nextState.department) url = url + '/' + nextState.department ;
    if (nextState.course) url = url + '/' + nextState.course;

    this.props.router.navigate(url);
  },

  onSelectDepartment: function (department) { 
    this.setState({ department: department, course : null }) 
  },

  onSelectCourse: function (course) { this.setState({course: course}) },

  componentDidMount : function() {
    this.onChange = (function () {this.forceUpdate();}).bind(this);
    this.props.model.on("change", this.onChange);
  },
  
  render: function () {
    var  model = this.props.model,
         view = 'Loading Data...',
         departments, courses, course;

        if (this.state.school) 
          departments = < Ninja.Views.List 
                            model = {model.departments} 
                            key = {'school'} 
                            school = {this.state.school} 
                            onNavigate = {this.onSelectDepartment}
                          />;
        if (this.state.department)
          courses = < Ninja.Views.List 
                        model = {model.courses}
                        key = {'department'}
                        department = {this.state.department}
                        onNavigate = {this.onSelectCourse}
                      />;
        if (this.state.department)
        course = < Ninja.Views.Course
                      model = {model}
                      key = {'course'}
                      course = {this.state.course}
                  />;

    return (
      <div className = "col-lg-12">
         <div className = "col-lg-3"> {departments} </div>
         <div className = "col-lg-3"> {courses} </div>
      </div>
      )
  }
});
