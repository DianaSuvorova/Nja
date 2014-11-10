/** @jsx React.DOM **/
Ninja.Views.Item = React.createClass({
  
  onSelect: function() {
    this.props.onSelect();
    this.refs.item.getDOMNode().focus();
  },

  render: function () {
    var itemClass = 'list-group-item item-name'
    if (this.props.selected)  itemClass = itemClass + ' selected';

    var item = this.props.item;
    var view = <li className = {itemClass} ref = "item" onClick = {this.onSelect}> {item.get('name')} </li>;
    if (this.props.item.has('section_id')) view = <Ninja.Views.Section model = {item} key = {item.cid} />
    return view;
  }
});
