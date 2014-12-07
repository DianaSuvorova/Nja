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
        <div className="col-xs-12 col-sm-6">
          <div className="phone" onClick = {this.getApp} onMouseEnter = {this.setLoaingStateTrue}  onMouseLeave = {this.setLoaingStateFalse}></div>
        </div>
        <div className="col-xs-12 col-sm-6 text-center">
          <div className ='intro'>
            <span className='text'>
              <h1>
                <strong>Class Radar </strong> keeps track of classes you want to take that are already full and notifies you when a spot opens up for registration.
              </h1>
            </span>
          </div>
        </div>
      </div>
    )
  }
});
