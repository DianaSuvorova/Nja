/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function () {return {landing:false};},

  componentWillMount: function () {
    Backbone.history.on('route', this.route)
    this.route();
  },

  route: function () {
    if (!this.props.router.path || this.props.router.path.split(/[//]+/)[0] != "classes") this.setState({landing: true});
    else this.setState({landing: false});
  },

  render: function () {
    var navbar = < Ninja.Views.Navbar router = {this.props.router} />;  
    var landing = <Ninja.Views.Landing/> 
    var lists = < Ninja.Views.Lists  model = {[this.props.model]} router = {this.props.router}/>
    var content = this.state.landing ? landing : lists;

    return ( <div className = 'holder'>{navbar}{content}</div>);
  }
});
