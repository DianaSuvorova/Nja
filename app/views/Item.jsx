/** @jsx React.DOM **/
Ninja.Views.Item = React.createClass({

  getInitialState: function () { return {onTouchMove: false}; },

  onMouseEnter: function () {
    var $el = $(this.getDOMNode());
//    this.props.setSpin(true);
    $el.addClass('hover');
  },

  onMouseLeave: function () {
    var $el = $(this.getDOMNode());
//    this.props.setSpin(false);
    $el.removeClass('hover');
  },

  onSelect: function () {
    if (!this.state.onTouchMove) {
      this.props.onSelect();
    }
  },

  onTouchStart: function () {
    this.setState({onTouchMove: false});
  },

  onTouchMove: function () {
    this.setState({onTouchMove: true});
  },

  onTouchEnd: function () {
    this.onSelect();
  },

  render: function () {
    var itemClass = globals.cx({
      'list-group-item item-name' : true,
      'selected' : this.props.selected
    });
    var item = this.props.item;
    var view = <li key = {this.props.key} className = {itemClass} ref = "item" onMouseEnter = {this.onMouseEnter}  onMouseLeave = {this.onMouseLeave} onClick = {this.onSelect} onTouchEnd = {this.onTouchEnd} onTouchMove= {this.onTouchMove} onTouchStart= {this.onTouchStart} > {item.get('name')} </li>;
    if (this.props.item.has('section_id')) view = <Ninja.Views.Section model = {item} key = {item.cid} />
    return view;
  }
});
