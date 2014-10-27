    /** @jsx React.DOM **/
Ninja.Views.Course = React.createClass({
  
  componentDidMount: function () {
    this.props.model.fetch().then(this.onSync);
  },

  onSync: function () { this.forceUpdate(); },

  shouldComponentUpdate: function (nextProps, nextState) {
    if (this.props[this.props.key] && nextProps[this.props.key] != this.props[this.props.key])
      this.props.model.fetch().then(this.onSync);
    else return false;
  },

  onSelect: function (model) { this.props.onNavigate(model.get('name')) },


  render: function () {
    var events = this.props.model.events.models.map(function (model) {
        return (
          <tr>
            <td>
            < a href="#" className = "btn btn-default btn-block" >
            {model.get('event_type')}
            </a>
            </td>
          </tr>
        )
    }, this)

    return <div className = "spacer"> {events} </div>
  }
});
