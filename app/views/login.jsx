/** @jsx React.DOM */
Ninja.Views.Login = React.createClass({

  getInitialState: function () {
    return {phoneSubmitted: false, submitted: false, validPhone: false};
  },

  onClickContainer: function () { this.props.onToggleShowLogin(false);},

  onClickLogin: function (e) { e.stopPropagation();},

  onSubmit: function (e) {this.setState({submitted: true});},

  onSubmitPhone: function (e) {
    var $el = $(this.getDOMNode());  
    var phoneInput = $el.find("input.phoneInput")[0]
    $(phoneInput).attr('readonly', true);
    this.setState({phoneSubmitted: true});
  },

  onSubmitKey: function (e) {
    //TODO before setting submitted state
    // go to server check verification code.
    //if correct set submitted to true
    //if not ask for code again 

    this.setState({submitted: true});

  },

  onPhoneInputChange: function (e) {
    //TODO there are browsers that don't fire change event on autofill. Periodically check to run this fn.
    var $input = $(e.target);
    var val =  $input.val();
    var numVal = (val.match(/\d+/g)) ? val.match(/\d+/g)[0] : "";
    if (numVal.length > 10 ) numVal = numVal.slice(-10)
    if (numVal.length === 10) this.setState({validPhone: true});
    else this.setState({validPhone: false})
  },


  render: function () {
    var containerClass = globals.cx({
      'login-container': true,
      'hidden' : !this.props.loginShow
    })

    var buttonClass = globals.cx({ 
      'active': false
     });

    var flipClass = globals.cx({
    'flipper': true,
    'submitted' : this.state.submitted
    });

    var submitPhoneClass = globals.cx({
      "fa fa-angle-right fa-2x": !this.state.phoneSubmitted,
      "fa fa-check": this.state.phoneSubmitted,
      "active" : this.state.validPhone
    });

    var submitKeyClass = globals.cx({
      "fa fa-angle-right fa-2x": true,
      "active" : true
    });

    var loginClass = globals.cx({
      "login col-md-offset-4  col-sm-offset-3 col-xs-12 col-sm-6 col-md-4 col-lg-3" : true,
      "expanded" : this.state.phoneSubmitted
    });

    var phonePromptText = globals.cx({
      "phone-prompt-text": true,
      "expanded": !this.state.phoneSubmitted
    });

    return (
       <div className = {containerClass} onClick = {this.onClickContainer}>
        <div className = "flip-container">
          <div className = {loginClass} onClick = {this.onClickLogin}>
            <div className = {flipClass}>   
              <div className = "content block front"> 
                <div className = "login-header">
                  <button className = "close" onClick = {this.onClickContainer} > <span >×</span></button>
                  <h4 className= "modal-title"> Login </h4>
                </div>
                <div className= "login-body"> 
                  <div className = {phonePromptText} >Please enter your phone number.We'll send a text with a login key.</div> 
                  <div id= "phoneInput">
                    <input type="phone" className= "form-control phoneInput" onChange = {this.onPhoneInputChange}/>
                    <div className="submit-phone"><i className={submitPhoneClass} onClick = {this.onSubmitPhone}></i></div>
                  </div>
                  <div className = "login-code"> 
                    <div className = "text">Please check your phone.We sent you a text with a login code</div>
                    <div className = "key">
                      <input type="text" name="prevent_autofill" id="prevent_autofill-1" value="" className= "hidden" />
                      <input type="text" className= "form-control keyInput" autoComplete="off" id= "key_1" onKeyDown = {this.onInputKeyDown} onKeyUp= {this.onInputKeyUp}/>
                      <div className="submit-key"><i className={submitKeyClass} onClick = {this.onSubmitKey}></i></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className = "content block back">
                <div className = "login-header"> 
                  <button className = "close" onClick = {this.onClickContainer} > <span >×</span></button>
                  <h4 className= "modal-title"> Thank you! </h4>
                </div>
                <div className= "login-body"> 
                  You are now can track classes you are intersted in.
                  You have 1 free target to try out how this works.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    )
  }

});