/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function () {return {landing:false, spin: false, mobile: this.isMobile() };},

  componentWillMount: function () {
    Backbone.history.on('route', this.route)
    this.route();
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

  route: function () {
    if (!this.props.router.path || this.props.router.path.split(/[//]+/)[0] != "classes") this.setState({landing: true});
    else this.setState({landing: false});
  },

  render: function () {
    console.log(this.state.mobile);
    var navbar = < Ninja.Views.Navbar router = {this.props.router} spin = {this.state.spin} setSpin = {this.setSpin}/>;  
    var landing = <Ninja.Views.Landing setSpin = {this.setSpin}/> 
    var lists = < Ninja.Views.Lists  model = {[this.props.model]} router = {this.props.router} mobile = {this.state.mobile} setSpin = {this.setSpin}/>
    var content = this.state.landing ? landing : lists;

    return ( <div id = 'container'>{navbar}{content}</div>);
  }
});
