/** @jsx React.DOM */
Ninja.Views.Login = React.createClass({

  getInitialState: function () {
    var validDigits = Array.apply(null, Array(10)).map(function() { return 0 });
    return {submitted: false, validDigits: validDigits};
  },

  onClickContainer: function () { this.props.onToggleShowLogin(false);},

  onClickLogin: function (e) { e.stopPropagation();},

  onSubmit: function (e) {
    this.setState({submitted: true});
  },

  onInputKeyUp: function (e) {
    var $el = $(this.getDOMNode());
    var isNumericalInput =  (e.keyCode > 47 && e.keyCode < 58) ? true : false;
    var $input = $(e.target);
    var val =  $input.val(); 
    if (isNumericalInput) {
      $input.val(String.fromCharCode(e.keyCode));
      var nextId = parseInt(e.target.id) + 1 ;
      var next = $el.find('#'+ nextId)[0];
      if (next) next.focus();
      this.state.validDigits[parseInt(e.target.id) - 1 ] = 1;
    }
    else if (e.keyCode === 46 || e.keyCode === 8 ) { //delete || backspace 
      console.log('delete');
      console.log(val.length);
      if (val.length === 0) {
        $input.val(String.fromCharCode(e.keyCode));
        var prevId = parseInt(e.target.id) - 1 ;
        var prev = $el.find('#'+ prevId)[0];
        if (prev) prev.focus();
        this.state.validDigits[parseInt(e.target.id) - 1 ] = 0;
      }
    }
    else if (e.keyCode ===  37 ) { //left arrow 
      var prevId = parseInt(e.target.id) - 1 ;
      var prev = $el.find('#'+ prevId)[0];
      if (prev) prev.focus();
    }
    else if (e.keyCode ===  39 ) { //right arrow 
      var nextId = parseInt(e.target.id) + 1 ;
      var next = $el.find('#'+ nextId)[0];
      if (next) next.focus();
    }
    else if (e.keyCode != 9) { // tab
      $input.addClass('error');
      $input.val(val.substring(0, val.length - 1));
      _.delay(function () {$input.removeClass('error');}, 1000);
    }
    this.setState({validDigits: this.state.validDigits.slice()});
  },

  render: function () {
    var containerClass = globals.cx({
      'login-container': true,
      'hidden' : !this.props.loginShow
    })

    var buttonClass = globals.cx({ 
      'active': this.state.validDigits.every(function(elem){return (elem === 1);})
     });

    var flipClass = globals.cx({
    'flipper': true,
    'submitted' : this.state.submitted
    });

    return (
       <div className = {containerClass} onClick = {this.onClickContainer}>
        <div className = "login col-md-offset-4 col-xs-12 col-md-3 flip-container" onClick = {this.onClickLogin}> 
          <div className = {flipClass}>   
            <div className = "content block front"> 
              <div className = "login-header"> 
                <button className = "close" onClick = {this.onClickContainer} > <span >×</span></button>
                <h4 className= "modal-title"> Login </h4>
              </div>
              <div className= "login-body"> 
                <div> we ask for a phone number so we can send you a text message with a login key.</div> 
                <div id= "phoneInput"> 
                  <div className= "phoneInput"> ( </div> 
                  <input type="phone" className= "form-control phoneInput" id= "1" onKeyDown = {this.onInputKeyDown} onKeyUp= {this.onInputKeyUp}/>
                  <input type="phone" className= "form-control phoneInput" id= "2" onKeyDown = {this.onInputKeyDown} onKeyUp= {this.onInputKeyUp}/>
                  <input type="phone" className= "form-control phoneInput" id= "3" onKeyDown = {this.onInputKeyDown} onKeyUp= {this.onInputKeyUp}/> 
                  <div className= "phoneInput"> ) </div> 
                  <div className= "phoneInput"> </div>
                  <input type="phone" className= "form-control phoneInput" id= "4" onKeyDown = {this.onInputKeyDown} onKeyUp= {this.onInputKeyUp}/>
                  <input type="phone" className= "form-control phoneInput" id= "5" onKeyDown = {this.onInputKeyDown} onKeyUp= {this.onInputKeyUp}/>
                  <input type="phone" className= "form-control phoneInput" id= "6" onKeyDown = {this.onInputKeyDown} onKeyUp= {this.onInputKeyUp}/> 
                  <div className= "phoneInput"> - </div>  
                  <input type="phone" className= "form-control phoneInput" id= "7" onKeyDown = {this.onInputKeyDown} onKeyUp= {this.onInputKeyUp}/> 
                  <input type="phone" className= "form-control phoneInput" id= "8" onKeyDown = {this.onInputKeyDown} onKeyUp= {this.onInputKeyUp}/>
                  <div className= "phoneInput"> - </div>  
                  <input type="phone" className= "form-control phoneInput" id= "9" onKeyDown = {this.onInputKeyDown} onKeyUp= {this.onInputKeyUp}/>
                  <input type="phone" className= "form-control phoneInput" id= "10" onKeyDown = {this.onInputKeyDown} onKeyUp= {this.onInputKeyUp}/> 
                </div>
                <div className = "login-footer">
                  <button type='submit' className= {buttonClass} onClick= {this.onSubmit}> submit <i className="fa fa-angle-right"></i> </button>
                </div>
              </div>
            </div>
            <div className = "content block back">
              <div className = "login-header"> 
                <button className = "close" onClick = {this.onClickContainer} > <span >×</span></button>
                <h4 className= "modal-title"> Thank you! </h4>
              </div>
              <div className= "login-body"> 
              Please check your phone. We've sent you a text message with a login code. Please enter it below 
              </div>
            </div>
          </div>
        </div>
      </div> /*login container*/
    )
  }

});