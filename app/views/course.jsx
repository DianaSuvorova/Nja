    /** @jsx React.DOM **/
Ninja.Views.Course = React.createClass({
  
  // componentDidMount: function () {
  //   console.log(this.props.model);
  //   this.props.model.fetch().then(this.onSync);
  // },

//  onSync: function () { this.forceUpdate(); },

  render: function () {
    console.log('render it');
    var div = "Here is going to be a cours";
    return (<ul className = "list-group col-lg-3">
              <li className="list-group-item">Cras justo odio</li>
            </ul>)
  }
});
