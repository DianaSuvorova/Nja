    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.setState({current: true}) ;},

  onSelect: function (model, listIndex) { this.props.onItemSelect(model, listIndex, this.props.model.cid); },

  componentWillEnter: function (cb) {
    var $el = $(this.getDOMNode());
    $el.offset({left: $el.width()});
    $el.animate({'left': '0'}, 1000, cb);
  },
  
  componentWillLeave: function (cb) {
    var $el = $(this.getDOMNode());
    $el.offset({left: -$el.width()});
    $el.animate({'left': '0'}, 1000, cb);
  },

  componentDidUpdate: function () {
    var $el = $(this.getDOMNode());
    if (this.props.totalLists - this.props.listIndex > 1)
    $el.animate({'left':  -$el.width()}, 1000); 
    if (this.routedModel) this.props.onItemRoute(this.routedModel, this.props.listIndex, this.props.model.cid);
  },

  render: function () {
    listClasses = globals.cx({ 'list col-xs-12 col-md-3': true}); 
    this.routedModel = this.props.model.sublist.getByName(this.props.routedName);

    var list = this.props.model.sublist;
    var selectedModel = this.props.selectedItemDict[this.props.model.cid] || (this.routedModel ? this.routedModel.cid : null);
    var listView = list.models.map(function (model) {
      var selected = model.cid === selectedModel ? true : false ;
      return (
        < Ninja.Views.Item key = {model.cid} item = {model} selected = {selected} onSelect = {this.onSelect.bind(this, model, this.props.listIndex)} />
      )
    }, this);
    
    return (<ul key = {this.props.model.cid}  className = {listClasses} > {listView} </ul>);
  }
});
