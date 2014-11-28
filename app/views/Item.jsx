/** @jsx React.DOM **/
Ninja.Views.Item = React.createClass({
  
  onSelect: function () {
    this.props.onSelect();
  },

  render: function () {
    var itemClass = globals.cx({
      'list-group-item item-name' : true,
      'selected' : this.props.selected
    });
    var item = this.props.item;
    var view = <li key = {this.props.key} className = {itemClass} ref = "item" onClick = {this.onSelect} onTouchStart = {this.onSelect}> {item.get('name')} </li>;
    if (this.props.item.has('section_id')) view = <Ninja.Views.Section model = {item} key = {item.cid} />
    return view;
  }
});
