/** @jsx React.DOM **/
Ninja.Views.Item = React.createClass({
  
  onSelect: function() {
    this.props.onSelect();
    this.refs.item.getDOMNode().focus();
  },

  render: function () {
    var item = this.props.item;
    var view = <li className="list-group-item" ref = "item" onClick = {this.onSelect}> {item.get('name')} </li>;
    if (this.props.item.has('section_id')) view = <Ninja.Views.Section item = {item}/>
    return view;
  }
});
