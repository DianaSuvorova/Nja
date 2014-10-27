/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function () {
    return {
      school: this.props.router.school,
      department: this.props.router.department,
      course: this.props.router.course
    };
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


  onSelectSchool: function (school) { 
    this.setState({ school: school, department: null, course : null }) 
  },

  onSelectCourse: function (course) { this.setState({course: course}) },
  
  render: function () {
    var  model = this.props.model,
         view = 'Loading Data...',
         schools, departments, courses, course;

         console.log(model);
        
          schools = < Ninja.Views.List 
                          model = {model.schools} 
                          key = {'app'} 
                          onNavigate = {this.onSelectSchool}
                        />;

          if (this.state.school)
          departments = < Ninja.Views.List 
                            model = { model.departments }
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
      if (this.state.course)
        course = < Ninja.Views.Course
                      model = {model.course}
                      key = {'course'}
                      course = {this.state.course}
                  />;

    return (
      <div className = "col-lg-12">
          <div className = "col-lg-1"> {schools} </div>
          <div className = "col-lg-3"> {departments} </div>
          <div className = "col-lg-3"> {courses} </div>
          <div className = "col-lg-3"> {course} </div>
      </div>
      )
  }
});
