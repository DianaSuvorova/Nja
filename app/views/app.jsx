/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function () { 
    return {listDict: [], routeStack: this.props.router.stack, selectedItemDict: []}; 
  },

  componentWillMount: function () {
    this.callback = (function() {
      this.setState({routeStack: this.props.router.stack});
    }).bind(this);

    Backbone.history.on('route', this.callback)
  },

  getListModelNames : function (lists) {
    return lists.map(function (model) {return model.get('name');});
  },

  handleRoute : function (item, listIndex, listCid) {
    this.state.selectedItemDict[listCid] = item.cid;
    var newSelectedItemDict = this.state.selectedItemDict.slice(0);
    var newrouteStack = this.state.routeStack.slice(1,this.state.routeStack.length);
    this.state.listDict[listIndex] = item; 
    var newListDict = this.state.listDict.slice(0,listIndex+1);
    this.setState({listDict: newListDict, selectedNameDict: newSelectedItemDict, routeStack: newrouteStack});
  },

  handleSelect: function (item, listIndex, listCid) {
    this.state.selectedItemDict[listCid] = item.cid;
    var newSelectedItemDict = this.state.selectedItemDict.slice(0);
    this.state.listDict[listIndex] = item; 
    var newListDict = this.state.listDict.slice(0,listIndex+1);
    this.props.router.navigate(this.getListModelNames(newListDict).join('/') , {trigger: false, pushState: true});
    this.setState({listDict: newListDict, selectedNameDict: newSelectedItemDict});
  },

  render: function () {
    var navbar = < Ninja.Views.Navbar/>;
    
    var isSmallScreen = globals.isBreakpoint('xs') || globals.isBreakpoint('sm') ? true : false  ;
    var models = [this.props.model].concat(this.state.listDict);
      var lists = models.map(function (model, i) {
        var routedName = (this.state.routeStack ) ? this.state.routeStack[0] : null;
        return < Ninja.Views.List  totalLists = {models.length} listIndex = {i} model = {model} key = {model.cid} onItemRoute = {this.handleRoute} routedName = {routedName} onItemSelect = {this.handleSelect} selectedItemDict = {this.state.selectedItemDict}/>;
      },this);

    return ( 
      <div className= 'containert'>
        <div className= 'rowt'> {navbar} </div>
        <div className= 'rowt lists'> 
          <globals.ReactTransitionGroup transitionName="list">
            {lists} 
          </globals.ReactTransitionGroup>
        </div> 
      </div>
    )
  }
});
