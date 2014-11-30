    /** @jsx React.DOM **/
Ninja.Views.Lists = React.createClass({

  getInitialState: function () { return {modelDict: this.props.model ,listDict: [], animate: true}; },


  sync: function (modelDict, listId, i) {
    var deferred = $.Deferred();
    var listDict = _.clone(this.state.listDict);

    modelDict[i].sublist.hydrate().then(function (sublist) {
      listDict[i] = sublist;
      if (listId) {
        modelDict[i+1] = sublist.get(listId);
        if( this.props.router.stack.length - 1 > i) {
          this.sync(modelDict,this.props.router.stack[i+1],i+1)
        }
        else {
          modelDict[i+1].sublist.hydrate().then(function (sublist) {
            listDict[i+1] = sublist;
            deferred.resolve(listDict);
          })
        }
      }
      else {
        deferred.resolve(listDict);
      }
    }.bind(this))
    return deferred.promise();
  },

  updateStateToRoute: function () {
    var animate = true;
    if (_.intersection(this.props.router.stack, this.props.router.previousStack).length < 1  ) {
      animate = false;
    }
    this.sync(this.state.modelDict, this.props.router.stack[0] , 0).then(function (listDict) {
      this.setState({listDict: listDict, animate: animate})
    }.bind(this));
  },

  componentWillMount: function () {
    Backbone.history.on('route', this.updateStateToRoute)
    this.updateStateToRoute();
  },

  handleSelect: function (item, listIndex) {
    var newListDict = this.state.listDict.slice(0,listIndex+1);
    item.sublist.hydrate().then(function (sublist) {
        newListDict[listIndex+1] = sublist;
        this.props.router.navigate((_.pluck(newListDict, 'id')).join('/') , {trigger: false, pushState: true});
        this.setState({listDict: newListDict, animate: true});
      }.bind(this))    
  },  

  getListModelIds : function (lists) { return lists.map(function (model) {return model.id;});},

  render: function () {
    console.log(this.state.listDict);
    var lists = this.state.listDict.map(function (model, i) {
      return < Ninja.Views.List key = {'list_'+i} listCount = {this.state.listDict.length} listIndex = {i} model = {model}  onItemSelect = {this.handleSelect}  animate = {this.state.animate} mobile = {this.props.mobile}/>;
    },this);

    return (
      <div id ='lists'> {lists} </div>
    )
  }

});
