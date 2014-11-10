    /** @jsx React.DOM **/
Ninja.Views.Event = React.createClass({

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

    return (
      <div className = 'event'>
        <div className = 'row event-header'>
          <span  style = {statusColor} className = "col-xs-1"/>
          <span className = 'col-xs-3 '> {this.props.sectionType} </span> 
          <div className = 'times_and_location col-xs-6'> {timeAndLocation} </div>
          <i className= "col-xs-1 glyphicon glyphicon-chevron-down" /> 
        </div> 
        <div className = 'row event-detail'>
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
