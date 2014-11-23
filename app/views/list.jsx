    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate();},

  onSelect: function (model, listIndex) {
    this.props.onItemSelect(model, listIndex, this.props.model.cid);
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.routedModel) this.props.onItemRoute(this.routedModel, this.props.listIndex, this.props.model.cid);
  },

    render: function () {
    this.routedModel = this.props.model.sublist.getByName(this.props.routedName);

    var list = this.props.model.sublist;
    var selectedModel = this.props.selectedItemDict[this.props.model.cid] || (this.routedModel ? this.routedModel.cid : null);
    var listView = list.models.map(function (model) {
      var selected = model.cid === selectedModel ? true : false ;
      return (
        < Ninja.Views.Item key = {model.cid} item = {model} selected = {selected} onSelect = {this.onSelect.bind(this, model, this.props.listIndex)} />
      )
    }, this);
    
    return (<ul key = {this.props.model.cid} className= {'col-xs-12 col-md-3'}> {listView} </ul>);
  }
});
