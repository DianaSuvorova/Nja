/** @jsx React.DOM **/
Ninja.Views.Navbar = React.createClass({
    
  onClickClasses: function () {
    this.props.router.navigate('/classes' , {trigger: true, pushState: true});
    return false;
  },

  render: function () {
    return (
      <nav className="navbar navbar-fixed-top" role="navigation">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href="/">
              <img alt="Class Radar" src="/dist/logo@2x.png"/>
            </a>
          </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a href="https://itunes.apple.com/us/app/id903690805#"> <i className="fa fa-arrow-down"></i> Get app</a></li>
            </ul>
        </div>
      </nav>
    )
  }
})