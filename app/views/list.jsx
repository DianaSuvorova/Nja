    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  onSelect: function (model, listIndex) { this.props.onItemSelect(model, listIndex); },

  onVote: function () { this.props.onVoteDialog(); },

  transition: function (animate) {
    var margin = 15;
    var $el = $(this.getDOMNode());
    var offset = this.props.listCount - this.props.listIndex - 1;
    var left = this.props.mobile ? {'left':  -offset * ($el.width() + margin )  } : {'left':  ($el.width() + margin ) * this.props.listIndex }  
    if (this.props.animate && animate && !this.props.mobile ) { $el.animate(left, 500); }
    else { $el.css(left);}
  },


  componentDidMount: function () { 
    this.transition(true);
  },
  
  componentDidUpdate: function () {
    this.transition(true); 
  },

  componentWillLeave: function (cb) {
    var $el = $(this.getDOMNode());
    var left = {'left':'100%'};
    $el.animate(left, 500, cb);
  },

  render: function () {
    var listClasses = globals.cx({ 'list col-xs-12 col-md-3': true});
    var listView = this.props.model.models.map(function (model, i) {
      var selected = false;
      if (this.props.listIndex < (this.props.listCount - 1 ) && this.props.modelDict[this.props.listIndex+1].cid === model.cid) {
        selected = true;
      }
      return ( < Ninja.Views.Item key = {'item_'+i} item = {model} selected = {selected} onSelect = {this.onSelect.bind(this, model, this.props.listIndex)} setSpin = {this.props.setSpin}/> )
    }, this);  
    
    if (this.props.model.name === 'schools') {
      var uVoteItem = new Backbone.Model({name: 'Tell us what we\'ve missed'});
      var view = (< Ninja.Views.Item key = {'item_vote'} item = {uVoteItem} onSelect = {this.onVote} />);
      listView.push(view);
    }

    return (<ul key = {this.props.key}  className = {listClasses} > {listView} </ul>);
  }
});
