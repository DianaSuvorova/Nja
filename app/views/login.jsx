/** @jsx React.DOM */
Ninja.Views.Login = React.createClass({displayName: 'Login',

  componentWillReceiveProps: function (nextProps) {
    console.log(nextProps);
    if (nextProps.loginShow) {
      var $el = $(this.getDOMNode());
      $el.modal(this.props.modal);
      $el.css({'z-index': 1500})
    }
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
    }
    else if (e.keyCode === 46 || e.keyCode === 8) { //delete || backspace
      if (val.length === 0) {
        $input.val(String.fromCharCode(e.keyCode));
        var prevId = parseInt(e.target.id) - 1 ;
        var prev = $el.find('#'+ prevId)[0];
        if (prev) prev.focus();
      }
    }
    else if (e.keyCode != 9) { // tab 
      $input.addClass('error');
      $input.val(val.substring(0, val.length - 1));
      _.delay(function () {$input.removeClass('error');}, 1000);
    }
//    $input.toggleClass('complete', ($input.val()) ? true : false);
  },

  render: function () {
    return (
       <div className = "modal fade  bs-example-modal-md" tabIndex= "-1"  role= "dialog" aria-labelledby= "login" aria-hidden= "true">
        <div className = "modal-dialog modal-sm"> 
          <div className = "modal-content"> 
            <div className = "modal-header"> 
              <button type = "button" className = "close" data-dismiss= "modal" aria-label= "Close"> <span aria-hidden= "true">×</span></button>
              <h4 className= "modal-title"> Login </h4>
            </div>
            <div className= "modal-body"> 
              <div>
                we ask for a phone number so we can send you a text message as class spot opens up.
                It's proven to be more reliable than email.
              </div> 
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
              <div> We'll send text with a confirmation code.</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

});