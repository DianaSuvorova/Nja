/** @jsx React.DOM */
Ninja.Views.Account = React.createClass({

  getInitialState: function () {
    //states 0- not yet; 1-success, -1 -error, 2- typing, 3- ready to be submitted
    return {phoneSubmitted: 0, keySubmitted: 0, phoneNumber: null, keyCode: null};
  },

  onClickContainer: function () { this.props.onToggleShowAccount(false);},

  onClickLogin: function (e) { e.stopPropagation();},

  onSubmit: function (e) {this.setState({submitted: true});},

  onPhoneInputChange: function (e) {
    var $el = $(this.getDOMNode()).find("#phoneInput");
    var icon = $el.find("i.fa")[0];
    if (this.state.phoneSubmitted != 0) this.setState({phoneSubmitted: 2});
    //TODO there are browsers that don't fire change event on autofill. Periodically check to run this fn.
    var $input = $(e.target);
    var val =  $input.val();
    var numVal = (val.match(/\d+/g)) ? val.match(/\d+/g)[0] : "";
    if (numVal.length >= 10) {
      this.setState({phoneSubmitted: 3});
    }
    else this.setState({phoneSubmitted: 2})
  },

  onPhoneInputKeyDown: function (e) {
    if (e.keyCode === 13 && this.state.phoneSubmitted ===3 ) this.onSubmitPhone();
  },

  onSubmitPhone: function () {
    var $el = $(this.getDOMNode()).find("#phoneInput");  
    var input = $el.find("input")[0];
    var icon = $el.find("i.fa")[0];
    $(icon).removeClass("fa fa-angle-right fa-2x").addClass("fa fa-spinner fa-spin");
    this.setState({phoneNumber: $(input).val()});

    $.ajax({
      type: 'POST',
      url: 'api/user',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({phone: $(input).val()}), //can't use state here ...
      complete: function (xhr, status) {
        var response = JSON.parse(xhr.responseText);
        if (response.error_code) this.setState({phoneSubmitted: -1});
        else  this.setState({phoneSubmitted: 1});
      }.bind(this)
    });
  
    return false;

  },

  onKeyInputChange: function (e) {
    //great opportunity for combining onKey/PhoneInputChange into generic fnc
    var $el = $(this.getDOMNode()).find("#keyInput");
    var icon = $el.find("i.fa")[0];
    if (this.state.keySubmitted != 0) this.setState({keySubmitted: 0});
    var $input = $(e.target);
    var val =  $input.val();
    var numVal = (val.match(/\d+/g)) ? val.match(/\d+/g)[0] : "";
    if (numVal.length >= 5) this.setState({keySubmitted: 3});
    else this.setState({keySubmitted: 2})

  },

  onKeyInputKeyDown: function (e) {
    if (e.keyCode === 13 && this.state.keySubmitted ===3 ) this.onSubmitKey();
  },


  onSubmitKey: function () {
    //first part of this and phone fnc can be one and the same
    var $el = $(this.getDOMNode()).find("#keyInput");  
    var input = $el.find("input#key_1");
    var icon = $el.find("i.fa")[0];
    $(icon).removeClass("fa fa-angle-right fa-2x").addClass("fa fa-spinner fa-spin");
    this.setState({keyCode: $(input).val()});

    $.ajax({
      type: 'POST',
      url: 'api/user/' + this.state.phoneNumber,
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({confirmation_token: $(input).val()}),
      complete: function (xhr, status) {
        var response = JSON.parse(xhr.responseText);
        if (response.error_code) this.setState({keySubmitted: -1});
        else {
          this.setState({keySubmitted: 1});
          this.props.setUser(this.state.phoneNumber);
        }
      }.bind(this)
    });
   
    return false;
  },


  render: function () {

    var containerClass = globals.cx({
      'login-container': true,
      'hidden' : !this.props.accountShow
    })

    var buttonClass = globals.cx({ 
      'active': false
     });

    var flipClass = globals.cx({
    'flipper': true,
    'submitted' : (this.state.keySubmitted === 1)
    });

    var submitPhoneClass = globals.cx({
      "fa fa-angle-right fa-2x": (this.state.phoneSubmitted === 0) || (this.state.phoneSubmitted === 2),
      "fa fa-check": (this.state.phoneSubmitted === 1),
      "fa fa-times": (this.state.phoneSubmitted === -1),
      " fa fa-angle-right fa-2x active" : (this.state.phoneSubmitted === 3) 
    });

    var submitKeyClass = globals.cx({
      "fa fa-angle-right fa-2x": (this.state.keySubmitted === 0) || (this.state.keySubmitted === 2),
      "fa fa-check": (this.state.keySubmitted === 1),
      "fa fa-times": (this.state.keySubmitted === -1),
      "fa fa-angle-right fa-2x active" : (this.state.keySubmitted === 3)
    });

    var loginClass = globals.cx({
      "login col-md-offset-4  col-sm-offset-3 col-xs-12 col-sm-6 col-md-4 col-lg-3" : true,
      "expanded-phone-success" : (this.state.phoneSubmitted === 1),
      "expanded-phone-error" : (this.state.phoneSubmitted === -1),
      "expanded-key-error": (this.state.keySubmitted === -1)

    });

    var phonePromptText = globals.cx({
      "phone-prompt-text": true,
      "expanded": Math.abs(this.state.phoneSubmitted) != 1
    });

    var invalidKeyText = globals.cx({
      "invalid-key-text": true,
      "expanded": this.state.keySubmitted === -1
    });

    var onPhoneSubmittedText = (this.state.phoneSubmitted === 1) ?
      "Please check your phone. We sent you a text with a login code" :
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
                    <input type="phone" className= "form-control phoneInput" onChange = {this.onPhoneInputChange} onKeyDown = {this.onPhoneInputKeyDown}/>
                    <div className="submit-phone"><i className={submitPhoneClass} onClick = {this.onSubmitPhone}></i></div>
                  </div>
                  <div className = "login-code"> 
                    <div className = "text">{onPhoneSubmittedText}</div>
                    <div id = "keyInput">
                      <input type="text" name="prevent_autofill" id="prevent_autofill-1" value="" className= "hidden" />
                      <input type="text" className= "form-control keyInput" autoComplete="off" id= "key_1" onChange = {this.onKeyInputChange} onKeyDown = {this.onKeyInputKeyDown}/>
                      <div className="submit-key"><i className={submitKeyClass} onClick = {this.onSubmitKey}></i></div>
                    </div>
                    <div className = {invalidKeyText} >Invalid Key. Please try again. If you haven't recieved a text, please check and resubmit you phone number.</div>
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