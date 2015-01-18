/** @jsx React.DOM **/
Ninja.Views.Footer = React.createClass({

  getInitialState: function () {return {active: false}},

  onIconClick : function () { this.setState({active: !this.state.active})},

   render: function () {

    var footerClass = globals.cx({
      'navbar navbar-default' : true, 
      'active' : this.state.active
    });

//  var email =  this.props.mobile ?  <a href="mailto:classradar@gmail.com">classradar@gmail.com</a> : "classradar@gmail.com";

    return (<nav id = "footer" className = {footerClass} >
            <address>
              <span className = "icon" onClick = {this.onIconClick}>
                <i className="fa fa-envelope"></i>
              </span>
              <span className = 'email'>classradar@gmail.com</span>
            </address>        
     </nav>)
   }

});