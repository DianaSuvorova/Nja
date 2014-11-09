    /** @jsx React.DOM **/
Ninja.Views.Section = React.createClass({
  
  render: function () {
    var model = this.props.model;

    var events = model.get('events').map( function (event,i) {
      var key = model.cid + '_event_'+ i; 
      return (<Ninja.Views.Event model = {event} key = {key} />);
    });

    var sectionHeader = model.get('section_name') + ': ' + model.get('staff_name');

    return ( <li id='section' className='list-group-item col-xs-12'>
                <div className = 'row'> {sectionHeader} </div>
                <div className = 'row'> {events} </div>
            </li>)
  }
});
