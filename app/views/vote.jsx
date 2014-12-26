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
  return false;
},

onSubmitForm: function (e) {
  e.preventDefault();
  return false;
},

onInputKeyDown: function (e) { if (e.which === 13) e.preventDefault(); },

render: function () {
  var itemClass = globals.cx({
    'list-group-item item-name vote' : true,
    'active' : this.props.selected
  });

  var backClass = globals.cx({
    'block back': true,
    'hidden' : !this.state.submitted
  });

  var frontClass = globals.cx({
    'block front': true,
    'hidden' : this.state.submitted
  });


  return (
    <li className = {itemClass} onClick = {this.props.onSelect} > 
      <div className = {frontClass} >
        <div className = 'header'> Don't see your school? </div>
        <div className = 'header'>Let us know. And we'll notify you once we have it on our list</div>
        <form onSubmit = {this.onSubmitForm}> 
          <input type='text' className='form-control' id='email' placeholder='Email' onClick= {this.onInputClick} onKeyDown = {this.onInputKeyDown}/>
          <input type='text' className='form-control' id='school' placeholder='School'onClick= {this.onInputClick} onKeyDown = {this.onInputKeyDown}/>
          <button type='submit' className='btn btn-default' onClick= {this.onSubmit}> Submit </button>
        </form>
      </div>
      <div className = {backClass} >
        <div className= 'header'> Thank you!</div>
        <div className= 'header'> We'll keep you posted. Meanwhile tell your classmates about us.</div>
        <div className= 'header'> The more requests we have for the school the sooner we'll add it.</div>
      </div>
    </li>
    )
  }
});
