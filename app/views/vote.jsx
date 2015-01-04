/** @jsx React.DOM */
Ninja.Views.Vote = React.createClass({

getInitialState: function () { return {submitted: false, emailValid: false, emailEmpty: true, schoolEmpty: true, schoolValid: false}; },

onFormClick: function (e) { e.stopPropagation();},

onSubmit: function (e) {
  var $el = $(this.getDOMNode())
  var email = $el.find('input#email')[0];
  var school = $el.find('input#school')[0];
  var data = {email: email.value, school: school.value};
  this.setState({submitted: true});
  if (window._gat) _gaq.push(['_trackEvent','voteForm', email.value + ' : '+ school.value]);
  return false;
},

onSubmitForm: function (e) {
  e.preventDefault();
  return false;
},

shareTwitter: function () {
  window.open('https://twitter.com/ClassRadar', '_blank');
},

shareFacebook: function () {
  window.open('https://www.facebook.com/pages/Class-Radar/1545837785632805', '_blank');
},

onInputKeyDown: function (e) { if (e.which === 13) e.preventDefault(); },

onInputKeyUpSchool: function (e) {
  this.onInputKeyDown(e);
  $el = $(this.getDOMNode());
  var school = $el.find('input#school')[0];
  if (school.value.length > 0) this.setState({schoolEmpty: false});
  else this.setState({schoolEmpty: true});
  this.validateSchool(school.value);
},

validateSchool: function (value) {
  if (value.length > 1)  this.setState({schoolValid: true});
  else this.setState({schoolValid: false});
},

onInputKeyUpEmail: function (e) {
  this.onInputKeyDown(e);
  $el = $(this.getDOMNode());
  var email = $el.find('input#email')[0];
  if (email.value.length > 0) this.setState({emailEmpty: false});
  else this.setState({emailEmpty: true});
  this.validateEmail(email.value);
},


validateEmail: function (value) {
  var re = /\S+@\S+\.\S+/;
  if (re.test(value))  this.setState({emailValid: true});
  else this.setState({emailValid: false});
},

render: function () {
  var itemClass = globals.cx({
    'list-group-item item-name vote flip-container' : true,
    'expanded' : this.props.selected
  });

  var backClass = globals.cx({
    'block back': true
  });

  var frontClass = globals.cx({
    'block front': true
  });

  var flipClass = globals.cx({
    'flipper': true,
    'submitted' : this.state.submitted
  });

  var buttonClass = globals.cx({ 
    'btn btn-default': true,
    'active': this.state.emailValid && this.state.schoolValid
  });

  var buttonLabel = 'submit';
  if (!this.state.emailEmpty && !this.state.emailValid ) buttonLabel = 'please provide correct email';
  else if (!this.state.schoolEmpty && !this.state.schoolValid) buttonLabel = 'please provide valid school name';

  return (
    <li className = {itemClass} onClick = {this.props.onSelect} >
      <div className = {flipClass} > 
        <div className = {frontClass} >
          <div className = 'header first'> Don't see your school? </div>
          <div className = 'header'>Let us know. <br></br> We'll notify you once we add it.</div>
          <form onSubmit = {this.onSubmitForm} onClick= {this.onFormClick}> 
            <input type='text' className='form-control' id='email' placeholder='email' onKeyDown = {this.onInputKeyDown} onKeyUp = {this.onInputKeyUpEmail}/>
            <input type='text' className='form-control' id='school' placeholder='school' onKeyDown = {this.onInputKeyDown} onKeyUp = {this.onInputKeyUpSchool} onFocus = {this.onInputKeyUpEmail} />
            <button type='submit' className= {buttonClass} onClick= {this.onSubmit}> {buttonLabel} </button>
          </form>
        </div>
        <div className = {backClass} >
          <div className= 'header first'> Thank you!</div>
          <div className= 'header'> We'll keep you posted. Meanwhile <br></br> tell your classmates about us.</div>
          <div className= 'header'> The more requests we have <br></br> the sooner we add the school.</div>
          <div className= 'header share'>
            <i className="fa fa-facebook" onClick = {this.shareFacebook} ></i>
            <i className="fa fa-twitter" onClick = {this.shareTwitter}></i>
          </div>
        </div>
      </div>
    </li>
    )
  }
});
