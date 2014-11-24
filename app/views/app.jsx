/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function () { 
    return {listDict: [], routeStack: this.props.router.stack, selectedItemDict: [], isAnimate: false}; 
  },

  componentWillMount: function () {
    this.callback = (function() {
      console.log('--------------------Route----------------------')
      console.log(this.state);

      this.setState({listDict: [], routeStack: this.props.router.stack, isAnimate: false});
    }).bind(this);

    Backbone.history.on('route', this.callback)
  },

  getListModelNames : function (lists) {
    return lists.map(function (model) {return model.get('name');});
  },

  handleRoute : function (item, listIndex, listCid) {
    console.log('--------------------handleRoute----------------------')

    this.state.selectedItemDict[listCid] = item.cid;
    var newSelectedItemDict = this.state.selectedItemDict.slice(0);
    var newrouteStack = this.state.routeStack.slice(1,this.state.routeStack.length);
    this.state.listDict[listIndex] = item; 
    var newListDict = this.state.listDict.slice(0);
    this.setState({listDict: newListDict, selectedNameDict: newSelectedItemDict, routeStack: newrouteStack});
  },

  handleSelect: function (item, listIndex, listCid) {
    console.log('--------------------click----------------------')
    console.log(this.state);
    this.state.selectedItemDict[listCid] = item.cid;
    var newSelectedItemDict = this.state.selectedItemDict.slice(0);
    this.state.listDict[listIndex] = item; 
    var newListDict = this.state.listDict.slice(0,listIndex+1);
    this.props.router.navigate(this.getListModelNames(newListDict).join('/') , {trigger: false, pushState: true});
    this.setState({listDict: newListDict, selectedNameDict: newSelectedItemDict, isAnimate: true  });
  },

  render: function () {
    var navbar = < Ninja.Views.Navbar/>;
    var lists;
    
    var isSmallScreen = globals.isBreakpoint('xs') || globals.isBreakpoint('sm') ? true : false  ;
    var models = [this.props.model].concat(this.state.listDict); 
    if (!this.state.routeStack || this.state.routeStack.length === 0 ) { 
       lists = models.map(function (model, i) {
          var listsAhead = models.length - i - 1;
          return < Ninja.Views.List isAnimate = {this.state.isAnimate} listsAhead = {listsAhead} listIndex = {i} model = {model} key = {model.cid} onItemSelect = {this.handleSelect} selectedItemDict = {this.state.selectedItemDict}/>;
        },this);
    }
    if (this.state.routeStack && this.state.routeStack.length > 0 ) {
      var model = this.state.listDict.length > 0 ? this.state.listDict[this.state.listDict.length - 1 ] : this.props.model ;
      console.log('model.cid',model.cid)
      var routedName = this.state.routeStack[0];
      lists = < Ninja.Views.List isAnimate = {this.state.isAnimate} listIndex = {this.state.listDict.length} model = {model} key = {model.cid} onItemRoute = {this.handleRoute} routedName = {routedName} />  
    }

    return ( 
      <div>
        <div> {navbar} </div>
        <div id ='lists'> 
          <globals.ReactTransitionGroup transitionName="list">
            {lists} 
          </globals.ReactTransitionGroup>
        </div> 
      </div>
    )
  }
});
