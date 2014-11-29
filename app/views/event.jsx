    /** @jsx React.DOM **/
Ninja.Views.Event = React.createClass({

  getInitialState: function() { return {expanded: false}; },

  onSelect: function () { this.setState({expanded : !this.state.expanded}); },

  render: function () {
    var model = this.props.model;

    var timeAndLocation = model.get('times_and_locations').map( function (tal) {
      return (<div className = 'row'> {tal.weekdays}  {tal.timeInterval} </div>)
    });

    var timeAndLocationDetail = function () {
      if (model.get('times_and_locations').length < 2 ) {
        return (<div> {model.get('times_and_locations')[0].location} </div>)
        }
      else {
       return model.get('times_and_locations').map( function (tal) {
          return (  <div> 
                      <div> {tal.location} </div>
                      <div className= 'detail-header'> {tal.weekdays}  {tal.timeInterval}</div>
                    </div>
          );
        });
      }
    }

    var detailHeader = ['Status', 'Section', 'Location'].map( function (header) {
      return (  <div className = 'row detail-header'> {header} </div>);
    });

    var statusColor = {color: model.getStatusColor()}
    var eventDetailCLasses = globals.cx({
      'event-detail row' : true,
      'expanded': this.state.expanded
    });

    var expandErrowClass = globals.cx({
      'col-xs-1 fa fa-angle-down fa-lg' : true,
      'fa-flip-vertical': this.state.expanded
    })

    return (
      <div className = 'event' onClick = {this.onSelect.bind(this)}>
        <div className = 'row event-header'>
          <div className = "status-marker-container col-xs-2">
            <span style = {statusColor} className = "status-marker"></span>
          </div>
          <span className = 'col-xs-3 '> {this.props.sectionType} </span> 
          <div className = 'times_and_location col-xs-5'> {timeAndLocation} </div>
          <i className = {expandErrowClass} /> 
        </div> 
        <div className = {eventDetailCLasses} >
          <div className = 'col-xs-2'/>
          <div className = 'col-xs-3'> {detailHeader} </div>
          <div className = 'col-xs-5'>
            <div className = 'row ' style = {statusColor} > {model.get('status')} </div>
            <div className = 'row'>  {this.props.sectionId} </div>
            <div className = 'row'> {timeAndLocationDetail()} </div>
          </div>
        </div> 
      </div>
    )
  }
});
