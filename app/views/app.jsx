/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  // getInitialState: function () { 
  //   return {listDict: [this.props.model]}; 
  // },

  // componentWillMount: function () {
  //   this.syncAll = ( function() {
  //     var deferred = $.Deferred();

  //     this.sync = (function(listDict, name, i) {
  //       listDict[i].sublist.hydrate().then(function () {
  //         listDict[i+1] = listDict[i].sublist.getByName(name)
  //         if( this.props.router.stack.length - 1 > i) {
  //           console.log(this.props.router.stack.length - 1 , i);
  //           this.sync(listDict, this.props.router.stack[i+1],i+1)
  //         }
  //         else {deferred.resolve(listDict);}
  //       }.bind(this));
  //     }.bind(this));

  //     this.sync([this.props.model],this.props.router.stack[0],0);
  //     return deferred.promise();
  //   }.bind(this));

  //   this.callback = (function() {
  //     this.syncAll().then(function (listDict) {this.setState({listDict: listDict})}.bind(this))
  //   }.bind(this));

  //   Backbone.history.on('route', this.callback)
  // },

  // getListModelNames : function (lists) {
  //   return lists.map(function (model) {return model.get('name');});
  // },

  // handleSelect: function (item, listIndex, listCid) {
  //   this.state.selectedItemDict[listCid] = item.cid;
  //   var newSelectedItemDict = this.state.selectedItemDict.slice(0);
  //   this.state.listDict[listIndex] = item; 
  //   var newListDict = this.state.listDict.slice(0,listIndex+1);
  //   this.props.router.navigate(this.getListModelNames(newListDict).join('/') , {trigger: false, pushState: true});
  //   this.setState({listDict: newListDict, selectedNameDict: newSelectedItemDict, isAnimate: true  });
  // },


  render: function () {
     var navbar = < Ninja.Views.Navbar/>;
    
    // var isSmallScreen = globals.isBreakpoint('xs') || globals.isBreakpoint('sm') ? true : false  ;
    // var models = [this.props.model].concat(this.state.listDict);
    // var lists = models.map(function (model, i) {
    //   var listsAhead = models.length - i -1;
    //   return < Ninja.Views.List isAnimate = {this.state.isAnimate} listsAhead = {listsAhead} listIndex = {i} model = {model} key = {model.cid} onItemSelect = {this.handleSelect} selectedItemDict = {this.state.selectedItemDict}/>;
    // },this);

    // console.log('lists--->',lists);

    return ( 
      <div>
        {navbar}
        < Ninja.Views.Lists  model = {[this.props.model]} router = {this.props.router}/>
      </div>
    )
  }
});
