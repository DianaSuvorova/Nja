/** @jsx React.DOM */
Ninja.Views.Profile = React.createClass({

  //TODO logout 
  //close window doesn' work

  getInitialState: function () { return {model: null, error: null}; }, 

  componentWillMount: function () {
    this.model = new Ninja.Models.Profile();
    this.model.hydrate().then(function (model, error) {
      if (error) this.setState({error: error});
      else this.setState({model: model});
    }.bind(this));
  },

  render: function () {
    var bodyText;
    var targetsList;

    if (!this.state.model) bodyText = "Something went wrong. Please logout and login again";
    else if (this.state.model.get("credits")) bodyText = "You can track classes you are intersted in. You have " + this.state.model.get("credits") + " free target" + (this.state.model.get("credits") > 1 ? "s" : "");
    else bodyText = "You have no targets left. You can purchase targets to track classes you are intersted in";

    if (this.state.model) {
      console.log(this.state.model.targets);
      targetsList = _.map(this.state.model.targets.models, function (target) {
        console.log(target);
      return <a href = {target.url} > {target.get('name')} </a>
      });
    }

    return (
      <div>
        <div className = "profile-header"> 
          <button className = "close" onClick = {this.props.onClickContainer} > <span >×</span></button>
          <h4 className= "modal-title"> Welcome to your profile </h4>
        </div>
        <div className= "profile-body"> {bodyText} </div>
        <div> {targetsList} </div>
      </div>
    );
  }

});
