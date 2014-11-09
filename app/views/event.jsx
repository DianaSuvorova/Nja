    /** @jsx React.DOM **/
Ninja.Views.Event = React.createClass({

  getStatusColor: function () {
    var model = this.props.model;
    if (model.status === 'Open') return 'green';
    if (model.status === 'Cancelled') return 'gray';
    if (model.status === 'Cancelled' || model.status === 'Closed') return 'red';
    if (model.status === 'W-List') return 'yellow';
  },


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
                      <div> {tal.weekdays}  {tal.timeInterval}</div>
                    </div>
          );
        });
      }
    }

    var detailHeader = ['Status', 'Section', 'Location'].map( function (header) {
      return (  <div className = 'row'> {header} </div>);
    });

    var statusColor = {color: model.getStatusColor()}

    return (
      <div>
        <div className = 'row'>
          <span  style = {statusColor} className = "col-xs-1 glyphicon glyphicon-play"/>
          <input className = 'col-xs-2' type = "checkbox"/>
          <span className = 'col-xs-3'>{model.get('event_type')}</span> 
          <div className = 'times_and_location col-xs-4'> {timeAndLocation} </div>
          <i className= "col-xs-1 glyphicon glyphicon-chevron-down"/> 
        </div> 
        <div className = 'row'>
          <div className = 'col-xs-2'/>
          <div className = 'col-xs-5'> {detailHeader} </div>
          <div className = 'col-xs-5'>
            <div className = 'row'> {model.get('status')} </div>
            <div className = 'row'>  id? </div>
            <div className = 'row'> {timeAndLocationDetail()} </div>
          </div>
        </div> 
      </div>
    )
  }
});
