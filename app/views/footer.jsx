/** @jsx React.DOM **/
Ninja.Views.Footer = React.createClass({

  getInitialState: function () {return {active: false}},

  onIconClick : function () { this.setState({active: !this.state.active})},
  clickToSelect : function() {
    window.getSelection().empty();
    var el = document.getElementById('contactemail');
    if (document.selection) {
          var range = document.body.createTextRange();
          range.moveToElementText(el);
          range.select();
      } else if (window.getSelection) {
          var range = document.createRange();
          range.selectNode(el);
          window.getSelection().addRange(range);
      }
  },

   render: function () {

    var footerClass = globals.cx({
      'navbar navbar-default' : true, 
      'active' : this.state.active
    });

  var email =  this.props.mobile ?  <a href="mailto:classradar@gmail.com">classradar@gmail.com</a> : "classradar@gmail.com";

    return (<nav id = "footer" className = {footerClass} >
            <address>
              <span className = "icon" onClick = {this.onIconClick}>
                <i className="fa fa-envelope"></i>
              </span>
              <span onClick = {this.clickToSelect} onTouchStart = {this.clickToSelect} id = "contactemail" >{email}</span>
            </address>        
     </nav>)
   }

});