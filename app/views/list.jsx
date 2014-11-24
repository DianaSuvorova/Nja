    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { 
    if (this.props.routedName) this.props.onItemRoute(this.props.model.sublist.getByName(this.props.routedName),  this.props.listIndex, this.props.model.cid);
    else this.forceUpdate();

  },

  onSelect: function (model, listIndex) { this.props.onItemSelect(model, listIndex, this.props.model.cid); },

  componentWillEnter: function (cb) {
    console.log('componentWillEnter',this.props);
    if (this.props.isAnimate)  {
      var $el = $(this.getDOMNode());
      if (this.props.listsAhead === 0) {
        $el.offset({left: $el.width()});
        $el.animate({'left': '0'}, 1000, cb);
      }
    }
  },
  
  // componentWillLeave: function (cb) {
  //   if (this.props.isAnimate) {
  //     var $el = $(this.getDOMNode());
  //     // $el.offset({left: -$el.width()});
  //     $el.animate({'left': $el.width()}, 1000, cb);
  //   }
  // },

//   componentDidLeave: function () {
//     console.log('componentDidLeave', this.props);
// //    var $el = $(this.getDOMNode());
// //    $el.offset({left: -$el.width()});
// //    $el.animate({'left': -$el.width()}, 1000);
//   },

   // componentWillUpdate: function (cb) {

   // },

  componentDidUpdate: function () {
 //   if (this.props.routedName) this.props.onItemRoute(this.props.model.sublist.getByName(this.props.routedName),  this.props.listIndex, this.props.model.cid);
    if (this.props.isAnimate) {
      var $el = $(this.getDOMNode()); 
      $el.animate({'left':  -$el.width() * this.props.listsAhead}, 1000);
    }
  },

  // shouldComponentUpdate: function(nextProps, nextState) {
  //   var routedModel = nextProps.model.sublist.getByName(this.props.routedName);
  //   if (routedModel) {
  //     this.onSelect(routedModel, nextProps.listIndex);
  //     return false;
  //   }
  //   return true;
  // },


  render: function () {
    var listView ;
    listClasses = globals.cx({ 'list col-xs-12 col-md-3': true}); 
    if (this.props.routedName) listView = null;
    else {
      var list = this.props.model.sublist;
      var selectedModel = this.props.selectedItemDict[this.props.model.cid]; //|| (this.routedModel ? this.routedModel.cid : null);
      listView = list.models.map(function (model) {
        var selected = model.cid === selectedModel ? true : false ;
        return (
          < Ninja.Views.Item key = {model.cid} item = {model} selected = {selected} onSelect = {this.onSelect.bind(this, model, this.props.listIndex)} />
        )
      }, this);
    }
    
    return (<ul key = {this.props.model.cid}  className = {listClasses} > {listView} </ul>);
  }
});
