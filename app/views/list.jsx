    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  getInitialState: function() { return {selectedItem: null}; },

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate();},

  onSelect: function (model, listIndex) {
    this.setState({selectedItem : model.cid});
    this.props.onItemSelect(model, listIndex);
  },

  componentDidUpdate: function (prevProps, prevState) {
    var routedModel = this.props.model.sublist.getByName(this.props.routedName);
    if (routedModel) this.props.onItemRoute(routedModel, this.props.listIndex);
  },

  
  render: function () {
    var routedModel = this.props.model.sublist.getByName(this.props.routedName);

    var list = this.props.model.sublist;
    var listView = list.models.map(function (model) {
        var selected =  (model.cid === this.state.selectedItem || model.cid ===  routedModel) ? true : false ;
        return (
            < Ninja.Views.Item key = {model.cid} item = {model} selected = {selected} onSelect = {this.onSelect.bind(this, model, this.props.listIndex)} />
        )
      }, this);
    
    return (<ul key = {this.props.model.cid} className= {'col-xs-12 col-md-3'}> {listView} </ul>);
  }
});
