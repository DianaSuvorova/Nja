    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate(); },

  onSelect: function (model) {
      globals.router.navigate(this.props.upRoute + '/' + encodeURI(model.get('name')), {trigger: true});
  },
  
  render: function () {
    var list = this.props.model.sublist,
        subView = '',
        view = list.models.map(function (model) {
          //not nice. better done with setting router via global states.
          var selected = (model.get('name') === this.props.route[0]) ? true : false;
          return (
                < Ninja.Views.Item 
                  key = {model.cid} 
                  item = {model}
                  selected = {selected}
                  onSelect = {this.onSelect.bind(this,model)} 
                />
            )
      }, this);
    
    if (this.props.route.length) { 
      model = list.getByName(decodeURI(this.props.route[0]));
      if (model) {
        subView = < Ninja.Views.List 
            model = {model} 
            key = {model.cid} 
            upRoute = {this.props.upRoute + '/' + model.get('name')} 
            route = {this.props.route.slice(1)}
            />
      }
    }
    return (
            <div>
              <ul className = "col-xs-12 col-md-3"> {view} </ul>
              <div id = {this.props.model.cid} > {subView} </div>
            </div>)
  }
});
