    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  getInitialState: function() { return {selectedItem: null}; },

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate();},

  onSelect: function (model, listIndex) {
    this.setState({selectedItem : model.cid});
    this.props.onItemSelect(model, listIndex);
  },
  
  render: function () {

    var list = this.props.model.sublist;
    var listView = list.models.map(function (model) {
        var selected = model.cid === this.state.selectedItem ? true : false ;
        return (
            < Ninja.Views.Item key = {model.cid} item = {model} selected = {selected} onSelect = {this.onSelect.bind(this,model,this.props.listIndex)} />
        )
      }, this);
    
    return (<ul key = {this.props.model.cid} className= {'col-xs-12 col-md-3'}> {listView} </ul>);
  }
});
