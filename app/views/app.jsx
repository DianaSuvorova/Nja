/** @jsx React.DOM */
Ninja.Views.App = React.createClass({

  render: function () {
    var  model = this.props.model,
         view = < Ninja.Views.List
                  model = {model}
                  key = {model.cid}
                  route = {model.route} />;
    return ( <div className = "col-lg-12"> {view} </div> )
  }
});
