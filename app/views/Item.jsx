/** @jsx React.DOM **/
Ninja.Views.Item = React.createClass({
  
  onSelect: function() {
    this.props.onSelect();
    this.refs.item.getDOMNode().focus();
  },

  render: function () {
    var style = {cursor: 'pointer' }
    return(
            <li style = {style} className="list-group-item" ref = "item" onClick = {this.onSelect}>
            {this.props.item.get('name')}
           </li>
      )
  }
});
