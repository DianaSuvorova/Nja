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
      $("a.logo").one('animationiteration webkitAnimationIteration', function() {
        this.setState({spin: false});
      }.bind(this))
  },

  getApp: function () {
    window.location = 'https://itunes.apple.com/us/app/id903690805#';
  },

  trackiTunesLinkClickEvent: function () {
    if (window._gat) _gaq.push(['_trackEvent', 'appStoreClick', 'from navBar']);
  },

  render: function () {
    var logoClass = globals.cx({
      'logo' : true,
      'spin': this.state.spin
    });

    return (
      <div className="row navbar">
        <div className = "col-xs-6 col-md-2" >
            <a className={logoClass} onMouseEnter = {this.setLoaingStateTrue} onMouseOver = {this.setLoaingStateTrue}  onMouseLeave = {this.setLoaingStateFalse} href="/"></a>
        </div>
        <div className = "col-md-offset-6 col-xs-6 col-md-2">
          <a href = 'https://itunes.apple.com/us/app/id903690805#'  onClick = {this.trackiTunesLinkClickEvent} > <i className="fa fa-arrow-down"></i> Get App</a>
        </div>
        <div className = "col-md-2 col-xs-12 hidden-xs hidden-sm">
          <a className = "navbar-link" href="/classes" onClick = {this.onClickClasses}> <i className="fa fa-align-justify"> </i> See Classes</a>
        </div>         
      </div>
    )
  }
})