    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate(); },

  onSelect: function (model, listIndex) { this.props.onItemSelect(model, listIndex, this.props.model.cid); },

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
  
  componentWillUnmount: function () {
    console.log('will unmount');
  },

  componentWillLeave: function (cb) {
    console.log('componentWillLeave', this.props);
    // if (this.props.isAnimate) {
    //   var $el = $(this.getDOMNode());
    //   // $el.offset({left: -$el.width()});
    //   $el.animate({'left': $el.width()}, 1000, cb);
    // }
  },

  componentDidLeave: function () {
    console.log('componentDidLeave', this.props);
//    var $el = $(this.getDOMNode());
//    $el.offset({left: -$el.width()});
//    $el.animate({'left': -$el.width()}, 1000);
  },

  componentDidUpdate: function () {
    console.log('componentDidUpdate', this.props);
      var $el = $(this.getDOMNode()); 
      $el.css({left: 0});
      console.log(this.props.listsAhead);
      $el.animate({'left':  -$el.width() * (this.props.listsAhead)}, 1000);
  },


  render: function () {
    var listClasses = globals.cx({ 'list col-xs-12 col-md-3': true}); 
    var list = this.props.model.sublist;
    var selectedModel = this.props.selectedItemDict[this.props.model.cid]; //|| (this.routedModel ? this.routedModel.cid : null);
    var listView = list.models.map(function (model) {
      var selected = model.cid === selectedModel ? true : false ;
      return (
        < Ninja.Views.Item key = {model.cid} item = {model} selected = {selected} onSelect = {this.onSelect.bind(this, model, this.props.listIndex)} />
      )
    }, this);    
    return (<ul key = {this.props.model.cid}  className = {listClasses} > {listView} </ul>);
  }
});
