/** @jsx React.DOM **/
Ninja.Views.Item = React.createClass({displayName: 'Item',
  
  onSelect: function() {
    this.props.onSelect();
    this.refs.item.getDOMNode().focus();
  },

  render: function(){
    return(
          React.DOM.tr(null, 
            React.DOM.td(null, 
            React.DOM.a({href: "#", 
              className: "btn btn-default btn-block", 
              ref: "item", 
              onClick: this.onSelect
            }, 
            this.props.item.get('name')
            )
            )
          )
      )
  }
});
