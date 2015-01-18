/** @jsx React.DOM **/
Ninja.Views.Footer = React.createClass({

  getInitialState: function () {return {active: false}},

  onIconClick : function () { this.setState({active: !this.state.active})},

   render: function () {

    var footerClass = globals.cx({
      'navbar navbar-default' : true, 
      'active' : this.state.active
    });

    return (<nav id = "footer" className = {footerClass} >
            <address>
              <span className = "icon" onClick = {this.onIconClick}>
                <i className="fa fa-envelope"></i>
              </span>
              <span>classradar@gmail.com</span>
            </address>        
     </nav>)
   }

});