    /** @jsx React.DOM **/
Ninja.Views.Event = React.createClass({

  getInitialState: function() { return {expanded: false}; },

  onSelect: function () { 
    el = $(this.getDOMNode());
    if (!this.state.expanded) { this.scrollToElelement(el); }
    this.setState({expanded : !this.state.expanded}); 
  },

  scrollToElelement: function (el) {
    var list = $('html,body').find('li.section')[0].parentElement;
    var listOffset = $(list).offset().top;
    var listheight = $(list).height();
    var elOffset = $(el).offset().top
    if (elOffset > listOffset + listheight/2 ){
      $(list).animate({scrollTop: $(list).scrollTop() + elOffset - listOffset  }, 500);
    }
  },

  render: function () {
    var model = this.props.model;

    var timeAndLocation = model.get('times_and_locations').map( function (tal) {
      var tal = tal.weekdays + ' ' + tal.timeInterval;
      return (<div className = 'row'>{tal}</div>)
    });

    var timeAndLocationDetail = function () {
      if (!model.get('times_and_locations').length) return null
      else if (model.get('times_and_locations').length < 2 ) {
        return (<div> {model.get('times_and_locations')[0].location} </div>)
        }
      else {
       return model.get('times_and_locations').map( function (tal) {
          return (  <div> 
                      <div > {tal.location} </div>
                      <div className = 'detail_tal'> {tal.weekdays}  {tal.timeInterval}</div>
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
      'fa fa-angle-down fa-lg' : true,
      'fa-flip-vertical': this.state.expanded
    })

    return (
      <div className = 'event' onClick = {this.onSelect.bind(this)}>
        <div className = 'row event-header'>
          <div className = "status-marker-container col-xs-1">
            <span style = {statusColor} className = "status-marker"></span>
          </div>
          <span className = 'col-xs-4 '> {this.props.sectionType} </span> 
          <div className = 'times_and_location col-xs-6'> {timeAndLocation} </div>
          <div className = 'col-xs-1 arrow'>  <i className = {expandErrowClass} /> </div> 
        </div> 
        <div className = {eventDetailCLasses} >
          <div className = 'col-xs-offset-1 col-xs-3'> {detailHeader} </div>
          <div className = 'col-xs-6 row_info'>
            <div className = 'row' style = {statusColor} > {model.get('status')} </div>
            <div className = 'row'>  {this.props.sectionId} </div>
            <div className = 'row'> {timeAndLocationDetail()} </div>
          </div>
          <div className = 'col-xs-offset-1 col-xs-10 download-to-track'>
            <a href = 'https://itunes.apple.com/us/app/id903690805' >
              get app to track this class
            </a>
          </div>
        </div> 
      </div>
    )
  }
});
