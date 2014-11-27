    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  getInitialState: function () { 
    console.log('getInitialState',this.props.model);
    return {sublist: this.props.model.sublist}
  },

  componentDidMount: function () { 
    this.state.sublist.hydrate().then(this.onSync); 
  },

    onSync: function () { this.forceUpdate(); },

  // onSync: function (model) { 
  // //  if (this.isMounted()) {
  //     console.log('hydrated--',model);
  //     this.setState({sublist: model})
  // //  } 
  // },

  onSelect: function (model, listIndex) { this.props.onItemSelect(model, listIndex); },

  componentWillEnter: function (cb) {
    console.log('componentWillEnter',this.props);
    if (this.props.isAnimate)  {
      var $el = $(this.getDOMNode());
      if (this.props.listsAhead === 1) {
        $el.offset({left: $el.width()});
        $el.animate({'left': '0'}, 1000, cb);
      }
    }
  },
  
//   componentWillUnmount: function () {
//     console.log('will unmount');
//   },

//   componentWillLeave: function (cb) {
//     console.log('componentWillLeave', this.props);
//     // if (this.props.isAnimate) {
//     //   var $el = $(this.getDOMNode());
//     //   // $el.offset({left: -$el.width()});
//     //   $el.animate({'left': $el.width()}, 1000, cb);
//     // }
//   },

//   componentDidLeave: function () {
//     console.log('componentDidLeave', this.props);
// //    var $el = $(this.getDOMNode());
// //    $el.offset({left: -$el.width()});
// //    $el.animate({'left': -$el.width()}, 1000);
//   },

//   componentDidUpdate: function () {
//     console.log('componentDidUpdate', this.props);
//       var $el = $(this.getDOMNode()); 
//       $el.css({left: 0});
//       console.log(this.props.listsAhead);
//       $el.animate({'left':  -$el.width() * (this.props.listsAhead)}, 1000);
//   },


  render: function () {

    var listClasses = globals.cx({ 'list col-xs-12 col-md-3': true}); 
//    var list = this.props.model.sublist;
//    var selectedModel = this.props.selectedItemDict[this.props.model.cid]; //|| (this.routedModel ? this.routedModel.cid : null);
     var listView = this.state.sublist.models.map(function (model, i) {
      return (
        < Ninja.Views.Item key = {'item_'+i} item = {model} onSelect = {this.onSelect.bind(this, model, this.props.listIndex)}/> //selected = {selected} onSelect = {this.onSelect.bind(this, model, this.props.listIndex)} />
      )
    }, this);  
    listView.push[null];  
    return (<ul key = {this.props.key}  className = {listClasses} > {listView} </ul>);
  }
});
