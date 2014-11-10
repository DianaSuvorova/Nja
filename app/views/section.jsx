    /** @jsx React.DOM **/
Ninja.Views.Section = React.createClass({
  
  render: function () {
    var model = this.props.model;

    var events = model.sublist.models.map( function (event) {
      return (<Ninja.Views.Event model = {event} key = {event.cid} sectionId = {model.sectionId} sectionType = {model.sectionType}/>);
    });

    var sectionHeader = model.sectionType + ((model.get('staff_name').length > 1) ? (': ' + model.get('staff_name')) : '');

    return ( <li className='list-group-item col-xs-12 section '>
                <div className = 'row section-header'> {sectionHeader} </div>
                <div className = 'row section-detail'> {events} </div>
            </li>)
  }
});
