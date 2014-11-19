    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  getInitialState: function() { return {currentList: true}; },

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate();},

  onSelect: function (model, listIndex) {
    this.setState({currentList : !this.state.currentList});
    this.props.onItemSelect(model, listIndex);
  },
  
  render: function () {
    var cx = React.addons.classSet;
    var csst = React.addons.CSSTransitionGroup;

    var hidden = cx({
      'col-xs-12 col-md-3': true,
      'hidden-sm hidden-xs ': !this.state.currentList
    });

    var list = this.props.model.sublist;
    var listView = list.models.map(function (model) {
        //not nice. better done with setting router via global states.
        var selected = false;
        return (
            < Ninja.Views.Item key = {model.cid} item = {model} selected = {selected} onSelect = {this.onSelect.bind(this,model,this.props.listIndex)} />
        )
      }, this);
    
    return (<ul key = {'ul-'.concat(this.props.model.cid)} className= {hidden}> {listView} </ul>);
  }
});
