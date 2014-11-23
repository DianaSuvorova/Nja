    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  getInitialState: function () { return {current: false}; },

  componentDidMount: function () { 
    // var $el = $(this.getDOMNode());
    // $el.addClass('next');
    this.props.model.sublist.hydrate().then(this.onSync); 
  },

  onSync: function () {
    console.log('onSync');
    this.setState({current: true}) ;
  },

  onSelect: function (model, listIndex) {
    this.props.onItemSelect(model, listIndex, this.props.model.cid);
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.routedModel) this.props.onItemRoute(this.routedModel, this.props.listIndex, this.props.model.cid);
  },

  componentDidUpdate: function (prevProps, prevState) {
    if (this.routedModel) this.props.onItemRoute(this.routedModel, this.props.listIndex, this.props.model.cid);
  },

  componentWillEnter: function(cb) {
    console.log('componentWillEnter');
    var $el = $(this.getDOMNode());
    $el.offset({left: $el.width()});
    $el.animate({'left': '0'}, 1000, cb);
  },
  
  componentDidEnter: function() {
    console.log('componentDidEnter');
    var $el = $(this.getDOMNode());
    console.log($el)
  },
  
  componentWillLeave: function(cb) {
    var $el = $(this.getDOMNode());
    $el.offset({left: -$el.width()});
    $el.animate({'left': '0'}, 1000, cb);
  },

    componentDidLeave: function(cb) {
      var $el = $(this.getDOMNode());
      $el.animate({'opacity': '0'}, 1000, cb);
  },

    render: function () {

    console.log(this.props.totalLists - this.props.listIndex, this.state.current);
    listClasses = globals.cx ({
      'list': true,
//      'current' : (this.props.totalLists - this.props.listIndex === 1) && this.state.current,
//      'next' : (this.props.totalLists - this.props.listIndex === 1) && !this.state.current,
      'previous' : (this.props.totalLists - this.props.listIndex > 1)
    }) 

    var styles = {
        position: "absolute",
        top: 70,
        left: 950 * (this.props.listIndex - this.props.totalLists + 1),
        zIndex: 100,
        transition: 'left 5s ease-in',
    };


    this.routedModel = this.props.model.sublist.getByName(this.props.routedName);

    var list = this.props.model.sublist;
    var selectedModel = this.props.selectedItemDict[this.props.model.cid] || (this.routedModel ? this.routedModel.cid : null);
    var listView = list.models.map(function (model) {
      var selected = model.cid === selectedModel ? true : false ;
      return (
        < Ninja.Views.Item key = {model.cid} item = {model} selected = {selected} onSelect = {this.onSelect.bind(this, model, this.props.listIndex)} />
      )
    }, this);
    
    return (<ul key = {this.props.model.cid}  className = {listClasses} > {listView} </ul>);
  }
});
