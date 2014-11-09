/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  componentWillMount : function() {
    this.callback = (function() { this.forceUpdate(); }).bind(this);
    this.props.router.on("route", this.callback);
  },

  render: function () {

    var  model = this.props.model,
         view = < Ninja.Views.List
                  model = {model}
                  key = {model.cid}
                  upRoute = {''}
                  route = {this.props.router.route.slice(0)} />;
    var navbar = < Ninja.Views.Navbar />
    return ( 
            <div className= 'container-fluid'>
              <div className= 'row'>
                <div className = "col-xs-12"> {navbar} </div>
              </div>
              <div className= 'row'>
                <div className = "col-xs-12"> {view} </div> 
              </div>
            </div>
            )
  }
});
