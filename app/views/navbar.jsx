/** @jsx React.DOM **/
Ninja.Views.Navbar = React.createClass({

  getInitialState: function () {return {spin: false}},
    
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

  componentWillReceiveProps: function (nextProps){
    var $el = $(this.getDOMNode());
    if (nextProps.spin) {
      this.setState({spin: true});
    }
    else    
      $("div.logo").one('animationiteration webkitAnimationIteration', function() {
        this.setState({spin: false});
      }.bind(this))
  },

  render: function () {
    var logoClass = globals.cx({
      'logo': true,
      'spin': this.state.spin
    });

    return (
      <nav className="navbar navbar-fixed-top" role="navigation">
        <div className = "logo-container" onMouseEnter = {this.setLoaingStateTrue} onMouseOver = {this.setLoaingStateTrue}  onMouseLeave = {this.setLoaingStateFalse}>
          <div className = {logoClass}>
            <a className="logo navbar-link" href="/">
            </a>
          </div>
        </div>
        <div className = "get-app" onMouseEnter = {this.setLoaingStateTrue} onMouseOver = {this.setLoaingStateTrue}  onMouseLeave = {this.setLoaingStateFalse}>
          <a className = "c" href="https://itunes.apple.com/us/app/id903690805#"> 
            <h3> <i className="fa fa-arrow-down"></i> Get App</h3>
          </a>
          <a className = "navbar-link" href="/classes" onClick = {this.onClickClasses}> 
            <h3> <i className="fa fa-align-justify"> </i> See Classes</h3>
          </a>         
        </div>
      </nav>
    )
  }
})