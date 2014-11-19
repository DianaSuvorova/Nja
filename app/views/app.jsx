/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function() { return {listStack: [this.props.model]}; },

  componentWillMount : function() {
    this.callback = (function() { this.forceUpdate(); }).bind(this);
    this.props.router.on("route", this.callback);
  },

  handleSelectItem : function (item) {
    //should handle push and pop
     this.setState({ listStack: this.state.listStack.concat(item) })
  },

  render: function () {
    var navbar = < Ninja.Views.Navbar/>;

    var lists = this.state.listStack.map(function (model) {
      return < Ninja.Views.List model = {model} key = {model.cid} onItemSelect = {this.handleSelectItem}/>;
    },this);

    
    return ( 
            <div className= 'container-fluid'>
              <div className= 'row'> {navbar} </div>
              <div className= 'row'> {lists} </div> 
            </div>
            )
  }
});
