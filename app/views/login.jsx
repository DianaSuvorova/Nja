/** @jsx React.DOM */
Ninja.Views.Login = React.createClass({

  getInitialState: function () {
    //states 0- not yet; 1-success, -1 -error;
    return {phoneSuubmitted: 0, submitted: false, submitPhoneButton: 'incative', phoneNumber: null};
  },

  onClickContainer: function () { this.props.onToggleShowLogin(false);},

  onClickLogin: function (e) { e.stopPropagation();},

  onSubmit: function (e) {this.setState({submitted: true});},

  onSubmitPhone: function (e) {
    var $el = $(this.getDOMNode());  
    var phoneInput = $el.find("input.phoneInput")[0];
    var icon = $el.find("i.fa")[0];
    $(icon).removeClass("fa fa-angle-right fa-2x").addClass("fa fa-spinner fa-spin");
    this.setState({phoneNumber: $(phoneInput).val()});

    $.ajax({
      type: 'POST',
      url: 'api/user',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({phone: $(phoneInput).val()}),
      complete: function (xhr, status) {
        var response = JSON.parse(xhr.responseText);
        if (response.error_code) {
          this.setState({phoneSubmitted: -1});
        }
        else {
          this.setState({phoneSubmitted: 1});
          $(phoneInput).attr('readonly', true);
        }
      }.bind(this)
    });
  },

  onSubmitKey: function (e) {
    //TODO before setting submitted state
    // go to server check verification code.
    //if correct set submitted to true
    //if not ask for code again 

    return false;

    this.setState({submitted: true});

  },

  onPhoneInputChange: function (e) {
    var $el = $(this.getDOMNode());
    var icon = $el.find("i.fa")[0];
    if (this.state.phoneSubmitted === -1) {
      $(icon).removeClass("fa fa-times active").addClass("fa fa-angle-right fa-2x");
      this.setState({phoneSubmitted: 0});
    }
    //TODO there are browsers that don't fire change event on autofill. Periodically check to run this fn.
    var $input = $(e.target);
    var val =  $input.val();
    var numVal = (val.match(/\d+/g)) ? val.match(/\d+/g)[0] : "";
    if (numVal.length >= 10) this.setState({submitPhoneButton: 'active'});
    else this.setState({submitPhoneButton: 'inactive'})
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
      "fa fa-check": (this.state.phoneSubmitted === 1),
      "fa fa-times": (this.state.phoneSubmitted === -1),
      "active" : this.state.submitPhoneButton === 'active',
    });

    var submitKeyClass = globals.cx({
      "fa fa-angle-right fa-2x": true,
      "active" : true
    });

    var loginClass = globals.cx({
      "login col-md-offset-4  col-sm-offset-3 col-xs-12 col-sm-6 col-md-4 col-lg-3" : true,
      "expanded-success" : (this.state.phoneSubmitted === 1),
      "expanded-error" : (this.state.phoneSubmitted === -1)

    });

    var phonePromptText = globals.cx({
      "phone-prompt-text": true,
      "expanded": !this.state.phoneSubmitted
    });

    var onPhoneSubmittedText = (this.state.phoneSubmitted === 1) ?
      "Please check your phone.We sent you a text with a login code" :
      "Invalid phone number. Please provide 10-digit number with area code";

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
                    <div className = "text">{onPhoneSubmittedText}</div>
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