    /** @jsx React.DOM **/
Ninja.Views.List = React.createClass({

  componentDidMount: function () { this.props.model.sublist.hydrate().then(this.onSync); },

  onSync: function () { this.forceUpdate(); },

  onSelect: function (model) {
      globals.router.navigate(this.props.upRoute + '/' + encodeURI(model.get('name')), {trigger: true});
  },
  
  render: function () {

    var ListIndx = this.props.upRoute.split(/[//]+/).length -1 ;
    var totalLists = this.props.upRoute.split(/[//]+/).length + this.props.route.length ;
    var pullPushMatrix = [];
      pullPushMatrix[0] = [];
      pullPushMatrix[0][1] = [0,0]
      pullPushMatrix[0][2] = [1,0]
      pullPushMatrix[0][3] = [2,0]
      pullPushMatrix[0][4] = [3,0]
      pullPushMatrix[1] = [];
      pullPushMatrix[1][1] = [0,0]
      pullPushMatrix[1][2] = [0,1]
      pullPushMatrix[1][3] = [0,0]
      pullPushMatrix[1][4] = [1,0]
      pullPushMatrix[2] = [];
      pullPushMatrix[2][1] = [0,0]
      pullPushMatrix[2][2] = [0,0]
      pullPushMatrix[2][3] = [0,2]
      pullPushMatrix[2][4] = [0,1]
      pullPushMatrix[3] = [];
      pullPushMatrix[3][1] = [0,0]
      pullPushMatrix[3][2] = [0,0]
      pullPushMatrix[3][3] = [0,0]
      pullPushMatrix[3][4] = [0,3]
    var classPull = ' col-md-pull-'.concat((pullPushMatrix[ListIndx][totalLists][0]*3).toString());
    var classPush = ' col-md-push-'.concat((pullPushMatrix[ListIndx][totalLists][1]*3).toString());

    var listClasses = ' col-xs-12 col-md-3'.concat(classPush, classPull)
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
              <div id = {this.props.model.cid} > {subView} </div>
              <ul className = {listClasses} > {view} </ul>
            </div>)
  }
});
