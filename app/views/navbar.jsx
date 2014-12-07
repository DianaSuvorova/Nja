/** @jsx React.DOM **/
Ninja.Views.Navbar = React.createClass({
    
  onClickClasses: function () {
    this.props.router.navigate('/classes' , {trigger: true, pushState: true});
    return false;
  },

  setLoaingStateTrue: function () {
    this.props.setSpin(true);
  },

  setLoaingStateFalse: function () {
    this.props.setSpin(false);
  },


  render: function () {
    var logoClass = globals.cx({
      'logo': true,
      'spin': this.props.spin
    });

    return (
      <nav className="navbar navbar-fixed-top" role="navigation">
        <div className = "logo-container" onMouseEnter = {this.setLoaingStateTrue}  onMouseLeave = {this.setLoaingStateFalse}>
          <div className = {logoClass}>
            <a className="logo navbar-link" href="/">
            </a>
          </div>
        </div>
        <div className = "get-app" onMouseEnter = {this.setLoaingStateTrue}  onMouseLeave = {this.setLoaingStateFalse}>
          <a className = "navbar-link" href="https://itunes.apple.com/us/app/id903690805#"> 
            <h3> <i className="fa fa-arrow-down"></i> Get App</h3>
          </a>         
        </div>
      </nav>
    )
  }
})