    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  getInitialState: function () { return {sublist: this.props.model.sublist}},

  componentDidMount: function () { this.state.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate(); },

  onSelect: function (model, listIndex) { this.props.onItemSelect(model, listIndex); },

  componentWillEnter: function (cb) {
    var $el = $(this.getDOMNode());
    $el.offset({left: $el.width()});
    $el.animate({'left': '0'}, 500, cb);
  },

  componentWillLeave: function (cb) {
    var $el = $(this.getDOMNode());
    $el.animate({'left':  $el.width()}, 1500, cb);
  },
  
  componentDidUpdate: function () {
    var $el = $(this.getDOMNode()); 
    var offset = this.props.listCount - this.props.listIndex - 1
    $el.animate({'left':  -$el.width() * offset }, 500);
  },

  render: function () {
    var listClasses = globals.cx({ 'list col-xs-12 col-md-3': true}); 
    var listView = this.state.sublist.models.map(function (model, i) {
      return ( < Ninja.Views.Item key = {'item_'+i} item = {model} onSelect = {this.onSelect.bind(this, model, this.props.listIndex)}/> )
    }, this);  
    return (<ul key = {this.props.key}  className = {listClasses} > {listView} </ul>);
  }
});
