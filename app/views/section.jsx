    /** @jsx React.DOM **/
Ninja.Views.Section = React.createClass({
  
  render: function () {
    var model = this.props.model;

    var events = model.sublist.models.map( function (event) {
      return (<Ninja.Views.Event model = {event} key = {event.cid} />);
    });

    var sectionHeader = model.get('section_name') + ': ' + model.get('staff_name');

    return ( <li id='section' className='list-group-item col-xs-12'>
                <div className = 'row'> {sectionHeader} </div>
                <div className = 'row'> {events} </div>
            </li>)
  }
});
