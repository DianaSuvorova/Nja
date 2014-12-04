/** @jsx React.DOM **/
Ninja.Views.Navbar = React.createClass({
    
  onClickClasses: function () {
    this.props.router.navigate('/classes' , {trigger: true, pushState: true});
    return false;
  },

  render: function () {
    return (
      <nav className="navbar navbar-fixed-top" role="navigation">
        <div className = "logo">
          <a className="logo navbar-link" href="/">  </a>
        </div>
        <div className = "get-app">
          <a className = "navbar-link" href="https://itunes.apple.com/us/app/id903690805#"> 
            <h3> <i className="fa fa-arrow-down"></i> Get App</h3>
          </a>         
        </div>
      </nav>
    )
  }
})