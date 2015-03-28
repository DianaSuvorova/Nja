/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function () { 
    var user = globals.readCookie("phone_number");
    var token = globals.readCookie("access_token");
    return {route: '', spin: false, mobile: this.isMobile(), accountShow: false, user: user, token: token };
  },

  componentWillMount: function () {
    Backbone.history.on('route', this.route)
    this.route();
//    document.ontouchmove = function(e) {e.preventDefault()};
    window.addEventListener("resize",  this.handleResize);
  },

  isMobile:function () {
    return ( $(window).width() < 992) ? true : false;
  },

  handleResize: function () {
    this.setState({mobile: this.isMobile()})
  },

  componentWillUnmount: function() {
    window.removeEventListener('resize', this.handleResize);
  },

  setSpin: function (state) {
    this.setState({spin: state})
  },

  onShowAccount: function (state) {
    this.setState({accountShow: state})
  },

  setUser: function (user){
    this.setState({user: user});
  },

  route: function () {
    var path =  null;
    if (this.props.router.path) path = this.props.router.path.split(/[//]+/)[0];
    if (!path) this.setState({route: 'landing'});
    else this.setState({route: path})
  },

  render: function () {
    var navbar = < Ninja.Views.Navbar router = {this.props.router} spin = {this.state.spin} setSpin = {this.setSpin} onShowAccount= {this.onShowAccount} user = {this.state.user}/>;  
    var landing = <Ninja.Views.Landing setSpin = {this.setSpin}/> 
    var lists = < Ninja.Views.Lists  model = {[this.props.model]} router = {this.props.router} mobile = {this.state.mobile} setSpin = {this.setSpin}/>
    var footer = < Ninja.Views.Footer mobile = {this.state.mobile}/>
    var account = < Ninja.Views.Account  accountShow = {this.state.accountShow} onToggleShowAccount= {this.onShowAccount} setUser = {this.setUser} user = {this.state.user}/>
    var content = (this.state.route === 'classes') ? lists : landing;

    return (  <div>{navbar}{content}{account}{footer} </div>);

  }
});
