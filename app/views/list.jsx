    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  componentDidMount: function () {
    this.props.model.fetch().then(this.onSync);
  },

  onSync: function () {
     if (this.props.model.onSync) this.props.model.onSync();
    this.forceUpdate(); 
  },

  shouldComponentUpdate: function (nextProps, nextState) {
    if (this.props[this.props.key] && nextProps[this.props.key] != this.props[this.props.key])
      this.props.model.fetch().then(this.onSync);
    else return false;
  },

  onSelect: function (model) { this.props.onNavigate(model.get('name')) },
  
  render: function () {
    var list = this.props.model,
        viewList = list.models.map(function (model) {
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
