    /** @jsx React.DOM **/
Ninja.Views.Lists = React.createClass({

  getInitialState: function () { return {listDict: this.props.model}; },

  syncAll: function() {
    var deferred = $.Deferred();
    var listDict = _.clone(this.props.model);

    this.sync = (function(listDict, name, i) {
      listDict[i].sublist.hydrate().then(function () {
        listDict[i+1] = listDict[i].sublist.getByName(name)
        if( this.props.router.stack.length - 1 > i) {
          console.log(this.props.router.stack.length - 1 , i);
          this.sync(listDict, this.props.router.stack[i+1],i+1)
        }
        else {
          listDict[i+1].sublist.hydrate().then(deferred.resolve(listDict));
        }
      }.bind(this));
    }.bind(this));

     if (this.props.router.stack && this.props.router.stack.length) { 
      this.sync(listDict,this.props.router.stack[0],0);
      }
     else { deferred.resolve(this.props.model);}
    return deferred.promise();
  },

  componentWillMount: function () {
    this.updateStateToRoute = (function() {
      this.syncAll().then(function (listDict) {
        this.setState({listDict: listDict})
      }.bind(this))
    }.bind(this));

    Backbone.history.on('route', this.updateStateToRoute)

    this.updateStateToRoute();
  },

  handleSelect: function (item, listIndex) {
    var newListDict = this.state.listDict.slice(0,listIndex+1);
    newListDict[listIndex+1] = item;
    this.props.router.navigate(this.getListModelNames(newListDict).join('/') , {trigger: false, pushState: true});
    this.setState({listDict: newListDict});
  },

  getListModelNames : function (lists) { return lists.map(function (model) {return model.get('name');});},

  render: function () {
    var lists = this.state.listDict.map(function (model, i) {
      return < Ninja.Views.List key = {'list_'+i} listCount = {this.state.listDict.length} listIndex = {i} model = {model}  onItemSelect = {this.handleSelect} />;
    },this);
    
    return (
      <div id ='lists'>
        <globals.ReactTransitionGroup transitionName="list">
          {lists} 
         </globals.ReactTransitionGroup>
      </div>
    )
  }

});
