/** @jsx React.DOM */
Ninja.Views.Vote = React.createClass({

getInitialState: function () { return {submitted: false}; },

onInputClick: function (e) {
  e.stopPropagation();
},

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
  window.location = 'https://twitter.com/ClassRadar';
},

shareFacebook: function () {
  window.location = 'https://www.facebook.com/pages/Class-Radar/1545837785632805';
},

onInputKeyDown: function (e) { if (e.which === 13) e.preventDefault(); },

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


  return (
    <li className = {itemClass} onClick = {this.props.onSelect} >
      <div className = {flipClass} > 
        <div className = {frontClass} >
          <div className = 'header first'> Don't see your school? </div>
          <div className = 'header'>Let us know. <br></br> We'll notify you once we add it.</div>
          <form onSubmit = {this.onSubmitForm}> 
            <input type='text' className='form-control' id='email' placeholder='Email' onClick= {this.onInputClick} onKeyDown = {this.onInputKeyDown}/>
            <input type='text' className='form-control' id='school' placeholder='School'onClick= {this.onInputClick} onKeyDown = {this.onInputKeyDown}/>
            <button type='submit' className='btn btn-default' onClick= {this.onSubmit}> Submit </button>
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
