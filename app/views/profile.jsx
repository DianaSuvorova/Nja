/** @jsx React.DOM */
Ninja.Views.Profile = React.createClass({

  getInitialState: function () { return {loaded:false}; }, 

  componentWillMount: function () {
    this.model = new Ninja.Models.Profile();
    this.model.hydrate().then(function () {this.setState({loaded: true});}.bind(this));
  },

  render: function () {
    var bodyText = " You can track classes you are intersted in.\
                      You have 1 free target to try out how this works.";
    return (
      <div>
        <div className = "profile-header"> 
          <button className = "close" onClick = {this.props.onClickContainer} > <span >×</span></button>
          <h4 className= "modal-title"> Welcome to your profile </h4>
        </div>
        <div className= "profile-body"> {bodyText} </div>
      </div>
    );
  }

});
