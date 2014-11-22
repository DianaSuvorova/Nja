/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function () { 
    return {listDict: [], routeStack: this.props.router.stack}; 
  },

  getListModelNames : function (lists) {
    return lists.map(function (model) {return model.get('name');});
  },

  handleRoute : function (item, listIndex) {
    this.state.listDict[listIndex] = item; 
    var newListDict = this.state.listDict.slice(0,listIndex+1);
    var newRouteStack = this.state.routeStack.slice(1, this.state.routeStack.length);
    this.setState({listDict: newListDict, routeStack: newRouteStack });
  },

  handleSelect: function (item, listIndex) {
    this.state.listDict[listIndex] = item; 
    var newListDict = this.state.listDict.slice(0,listIndex+1);
    this.props.router.navigate(this.getListModelNames(newListDict).join('/') , {trigger: false, pushState: true});
    this.setState({listDict: newListDict});
  },

  render: function () {
    var navbar = < Ninja.Views.Navbar/>;

    var models = [this.props.model].concat(this.state.listDict);
    var routedName = (this.state.routeStack) ? this.state.routeStack[0] : null;
    var lists = models.map(function (model, i) {
      return < Ninja.Views.List listIndex = {i} model = {model} key = {model.cid} onItemRoute = {this.handleRoute} routedName = {routedName} onItemSelect = {this.handleSelect}/>;
    },this);

    return ( 
      <div className= 'container-fluid'>
        <div className= 'row'> {navbar} </div>
        <div className= 'row'> {lists} </div> 
      </div>
    )
  }
});
