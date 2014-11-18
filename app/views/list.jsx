    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  getInitialState: function() { return {currentList: true}; },

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate(); },

  onSelect: function (model) {
      this.setState({currentList : !this.state.currentList});
      globals.router.navigate(this.props.upRoute + '/' + encodeURI(model.get('name')), {trigger: true});
  },
  
  render: function () {
    var cx = React.addons.classSet;
    var csst = React.addons.CSSTransitionGroup;

    var hidden = cx({
      'col-xs-12 col-md-3': true,
      'hidden-sm hidden-xs ': !this.state.currentList
    });

    var list = this.props.model.sublist,
        subView,
        view;

    var listView = list.models.map(function (model) {
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

    if (list.length) {
      view = <ul key = {'ul-'.concat(this.props.model.cid)} className= {hidden}> {listView} </ul> ;
    }
    
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
              <div key = {'current-div-'.concat(this.props.model.cid)} >
                 <csst transitionName = "next"> {view} </csst>
                   <div  key = {this.props.model.cid} id = {this.props.model.cid} > {subView} </div>
              </div>
            )
  }
});
