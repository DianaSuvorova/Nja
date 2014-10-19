/** @jsx React.DOM **/
Ninja.Views.Item = React.createClass({
  
  onSelect: function() {
    this.props.onSelect();
    this.refs.item.getDOMNode().focus();
  },

  render: function(){
    return(
          <tr>
            <td>
            <a href='#'
              className = "btn btn-default btn-block"
              ref = "item"
              onClick = {this.onSelect}
            >
            {this.props.item.get('name')}
            </a>
            </td>
          </tr>
      )
  }
});
