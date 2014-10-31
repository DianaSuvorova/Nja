    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate(); },

  onSelect: function (model) {
    if (model.sublist) {
      React.renderComponent(
        < Ninja.Views.List  model = {model} key = {model.cid}/>, 
        document.getElementById(this.props.model.cid)
      );
    }
  },
  
  render: function () {
    var list = this.props.model.sublist,
        subView ='If there is some..',
        view = list.models.map(function (model) {
        return (
          < Ninja.Views.Item key = {model.cid} item = {model} onSelect = {this.onSelect.bind(this,model)} />
          )
      }, this)
        return (
            <div>
              <div className = "col-lg-3"> {view} </div>
              <div id = {this.props.model.cid} > </div> 
            </div>)
    }
});
