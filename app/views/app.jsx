/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function() { return {listDict: [this.props.model]}; },

  componentWillMount : function() {
    this.callback = (function() { this.forceUpdate(); }).bind(this);
    this.props.router.on("route", this.callback);
  },

  handleSelectItem : function (item, listIndex) {
    this.state.listDict[listIndex+1] = item;
    this.setState({listDict: this.state.listDict.slice(0)});
  },

  render: function () {
    var navbar = < Ninja.Views.Navbar/>;

    var lists = this.state.listDict.map(function (model, i) {
      return < Ninja.Views.List listIndex = {i} model = {model} key = {model.cid} onItemSelect = {this.handleSelectItem}/>;
    },this);

    
    return ( 
            <div className= 'container-fluid'>
              <div className= 'row'> {navbar} </div>
              <div className= 'row'> {lists} </div> 
            </div>
            )
  }
});
