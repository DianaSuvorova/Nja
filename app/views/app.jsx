/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  render: function () {
    var navbar = < Ninja.Views.Navbar/>;    
    // var isSmallScreen = globals.isBreakpoint('xs') || globals.isBreakpoint('sm') ? true : false  ;
    return ( 
      <div>
        {navbar}
        < Ninja.Views.Lists  model = {[this.props.model]} router = {this.props.router}/>
      </div>
    )
  }
});
