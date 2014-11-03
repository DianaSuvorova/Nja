/** @jsx React.DOM **/
Ninja.Views.Item = React.createClass({
  
  onSelect: function() {
    this.props.onSelect();
    this.refs.item.getDOMNode().focus();
  },

  render: function () {
    return(
            <li className="list-group-item" ref = "item" onClick = {this.onSelect}>
            {this.props.item.get('name')}
           </li>
      )
  }
});
