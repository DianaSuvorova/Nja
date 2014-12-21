/** @jsx React.DOM **/
Ninja.Views.Landing = React.createClass({

  setLoaingStateTrue: function () {
    this.props.setSpin(true);
  },

  setLoaingStateFalse: function () {
    this.props.setSpin(false);
  },

  getApp: function () {
    window.location = 'https://itunes.apple.com/us/app/id903690805#';
  },

  render: function () {
    return (
      <div className="row landing-container" id="landing">

        <div className="col-xs-12 col-md-4 col-md-push-6">
          <div className ='intro'>
            <strong>Class Radar </strong> keeps track of classes you want to take that are already full and notifies you when a spot opens up for registration.
          </div>
        </div>
              
        <div className = "col-xs-12 hidden-md hidden-lg see-classes" onClick = {this.onClickClasses}>
          <a href="/classes">
            <span> See Classes <i className="fa fa-arrow-right"> </i> </span>
          </a>
        </div>         

        <div className="col-xs-12 col-md-6 col-md-pull-3">
          <div className="phone" onClick = {this.getApp} onMouseEnter = {this.setLoaingStateTrue}  onMouseLeave = {this.setLoaingStateFalse}></div>
        </div>

      </div>
    )
  }
});
