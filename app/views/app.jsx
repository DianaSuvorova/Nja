/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  getInitialState: function () { return {listDict: []}; },

  componentDidMount : function () {
    this.callback = (function() { this.setState({listDict: this.props.routerStack}) }).bind(this);
    this.props.router.on("route", this.callback);
  },

  getListModelNames : function (lists) {
    return lists.map(function (model) {return model.get('name');});
  },

  handleSelectItem : function (item, listIndex) {
    this.state.listDict[listIndex] = item; 
    var newListDict = this.state.listDict.slice(0,listIndex+1);
    this.props.router.navigate(this.getListModelNames(newListDict).join('/') , {trigger: false});    
    this.setState({listDict: newListDict});
  },

  render: function () {
    var navbar = < Ninja.Views.Navbar/>;

    var models = [this.props.model].concat(this.state.listDict);
    var lists = models.map(function (model, i) {
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
