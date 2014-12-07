    /** @jsx React.DOM **/
Ninja.Views.Lists = React.createClass({

  getInitialState: function () { return {modelDict: this.props.model ,listDict: [], animate: true}; },

  syncModel: function (deferred, modelDict, listDict, listId, i) {
    modelDict[i].sublist.hydrate().then(function (sublist) {
      listDict[i] = sublist;
      if (listId) {
        modelDict[i+1] = sublist.findWhere({id:listId});
        if( this.props.router.stack.length - 1 > i) {
          this.syncModel(deferred, modelDict, listDict,this.props.router.stack[i+1],i+1)
        }
        else {
          modelDict[i+1].sublist.hydrate().then(function (sublist) {
            listDict[i+1] = sublist;
            deferred.resolve(listDict,modelDict);
          });
        }
      }
      else deferred.resolve(listDict, modelDict);
    }.bind(this))
  },

  sync: function () {
    var deferred = $.Deferred();
    this.syncModel(deferred, _.clone(this.props.model), [], this.props.router.stack[0] , 0);
    return deferred.promise();
  },

  updateStateToRoute: function () {
    var animate = true;
    var deferred = $.Deferred();
    if (_.intersection(this.props.router.stack, this.props.router.previousStack).length < 1  ) {
      animate = false;
    }
    this.sync().then(function (listDict, modelDict) {
      this.setState({listDict: listDict, modelDict: modelDict, animate: animate})
    }.bind(this));
  },

  componentWillMount: function () {
    Backbone.history.on('route', this.updateStateToRoute)
    this.updateStateToRoute();
  },

  handleSelect: function (item, listIndex) {
    this.props.setSpin(true);
    var newListDict = this.state.listDict.slice(0,listIndex+1);
    var newModelDict = this.state.modelDict.slice(0,listIndex+1);
    newModelDict[listIndex+1] = item;
    item.sublist.hydrate().then(function (sublist) {
        newListDict[listIndex+1] = sublist;
        this.props.router.navigate('/classes' + (_.pluck(newListDict, 'id')).join('/') , {trigger: false, pushState: true});
        this.setState({listDict: newListDict, modelDict: newModelDict, animate: true}); 
        this.props.setSpin(false);
      }.bind(this))  
  },  

  render: function () {
    var lists = this.state.listDict.map(function (model, i) {
      return < Ninja.Views.List key = {'list_'+i} listCount = {this.state.listDict.length} listIndex = {i} model = {model} modelDict = {this.state.modelDict}  onItemSelect = {this.handleSelect}  animate = {this.state.animate} mobile = {this.props.mobile} setSpin = {this.props.setSpin}/>;
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
