    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  componentDidMount: function () {
    this.props.list.fetch().then(this.onSync);
  },

  onSync: function () {
      this.props.synced = true;
      this.forceUpdate();
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    var listIdentifier = this.props.key;
    return (nextProps[listIdentifier] != this.props[listIdentifier]);
  },

  onSelect: function(model) {
    var router = '/' + (this.props.school ? (this.props.school + '/' + ( this.props.department ? this.props.department : model.get('name'))) : model.get('name'));
    globals.router.navigate(router,{pushState: true});
  },
  
  render : function () {
    var list = this.props.list,
        viewList = list.models.map(function(model) {
        return (
          <Ninja.Views.Item
            key = {model.cid}
            item = {model}
            onSelect = {this.onSelect.bind(this,model)}
          />
          )
      }, this)

    return (
      <div className = "spacer">
          {viewList}
      </div>
      )
    }
});
