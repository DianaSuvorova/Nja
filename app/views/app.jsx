/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  componentWillMount : function() {
    this.callback = (function() { console.log('forceUpdate'); this.forceUpdate(); }).bind(this);
    this.props.router.on("route", this.callback);
  },
  
  render: function () {

    var  model = this.props.model,
         view = < Ninja.Views.List
                  model = {model}
                  key = {model.cid}
                  upRoute = {''}
                  route = {this.props.router.route.slice(0)} />;
    return ( <div className = "col-lg-12"> {view} </div> )
  }
});
