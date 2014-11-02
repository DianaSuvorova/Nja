    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate(); },

  onSelect: function (model) {
    if (model.sublist) {
      globals.router.navigate(this.props.upRoute + '/' + model.get('name'), {trigger: true});
    }
  },
  
  render: function () {
    var list = this.props.model.sublist,
        subView = '',
        view = list.models.map(function (model) {
        return (
          < Ninja.Views.Item 
            key = {model.cid} 
            item = {model}
            onSelect = {this.onSelect.bind(this,model)} 
          />
          )
    }, this);
    
    if (this.props.route[0]) { 
      model = list.getByName(this.props.route[0]);
      if (model) {
        subView = < Ninja.Views.List 
        model = {model} 
        key = {model.cid} 
        upRoute = {this.props.upRoute + '/' + model.get('name')} 
        route = {this.props.route.slice(1)}/> 
      }
    }

    return (
            <div>
              <div className = "col-lg-3"> {view} </div>
              <div id = {this.props.model.cid} > {subView} </div> 
            </div>)
  }
});
