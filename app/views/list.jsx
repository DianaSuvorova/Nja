    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  getInitialState: function () { return {sublist: this.props.model.sublist}},

  componentDidMount: function () { this.state.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate(); },

  onSelect: function (model, listIndex) { this.props.onItemSelect(model, listIndex); },

  componentWillEnter: function (cb) {
    var $el = $(this.getDOMNode());
    if(this.props.animate && this.props.mobile) {
      $el.offset({left: $el.width()});
      $el.animate({'left': '0'}, 500, cb);
    }
    else if (!this.props.mobile) {
      $el.offset({left: $el.width() * (this.props.listIndex-1)});
      $el.animate({'left': $el.width() * this.props.listIndex}, 500, cb);
    }
    else {cb};
  },
  

  componentDidUpdate: function () {
    var $el = $(this.getDOMNode()); 
    var offset = this.props.listCount - this.props.listIndex - 1
    var left = this.props.mobile ? {'left':  -$el.width() * offset } : {'left':  $el.width() * this.props.listIndex }  
    if (this.props.animate) {
      $el.animate(left, 500)
    }
    else {
      $el.offset(left)
    }
  },

  render: function () {
    var listClasses = globals.cx({ 'list col-xs-12 col-md-3': true}); 
    var listView = this.state.sublist.models.map(function (model, i) {
      return ( < Ninja.Views.Item key = {'item_'+i} item = {model} onSelect = {this.onSelect.bind(this, model, this.props.listIndex)}/> )
    }, this);  
    return (<ul key = {this.props.key}  className = {listClasses} > {listView} </ul>);
  }
});
