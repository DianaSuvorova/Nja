/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function () {return {landing:true};},

  componentWillMount: function () {
    Backbone.history.on('route', this.route)
    this.route();
  },

  route: function () {
    if (this.props.router.path === 'classes')
    this.setState({landing: false});
  },

  render: function () {
    var mobile = globals.isBreakpoint('xs') || globals.isBreakpoint('sm') ? true : false;
    var navbar = < Ninja.Views.Navbar/>;  
    var landing = <Ninja.Views.Landing/> 
    var lists = < Ninja.Views.Lists  model = {[this.props.model]} router = {this.props.router} mobile = {mobile}/>
    var content = this.state.landing ? landing : lists;

    return ( <div className="container-fluid container">{navbar}{content}</div>);
  }
});
