/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  componentWillMount : function() {
    this.callback = (function() { this.forceUpdate(); }).bind(this);
    this.props.model.on("change", this.callback);
  },

  render: function () {
    var  model = this.props.model,
         view = < Ninja.Views.List model = {model} key = {model.cid} />;
    return ( <div className = "col-lg-12"> {view} </div> )
  }
});
