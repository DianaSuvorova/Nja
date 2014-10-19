    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({displayName: 'List',

  componentDidMount: function () {
    this.props.list.fetch().then(this.onSync);
  },

  onSync: function () {
      this.props.synced = true;
      this.forceUpdate();
  },

  onSelect: function(model) {
    var router = '/' + (this.props.school ? (this.props.school + '/' + ( this.props.department ? this.props.department : model.get('name'))) : model.get('name'));
    globals.router.navigate(router,{pushState: true});
  },
  
  render : function () {
    var list = this.props.list,
        viewList = list.models.map(function(model) {
        return (
          Ninja.Views.Item({
            key: model.cid, 
            item: model, 
            onSelect: this.onSelect.bind(this,model)}
          )
          )
      }, this)

    return (
      React.DOM.div({className: "spacer"}, 
          viewList
      )
      )
    }
});
