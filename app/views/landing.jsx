/** @jsx React.DOM **/
Ninja.Views.Landing = React.createClass({
  render: function () {
    return (
      <div className="row landing-container" id="landing">
        <div className="col-xs-12 col-sm-6 col-md-4 col-md-offset-2 phone"></div>
        <div className="col-xs-12 col-sm-6 col-md-6 intro text-center">
          <h1>
            <strong>Class Radar </strong> keeps track of classes you want to take that are already full and notifies you when a spot opens up for registration.
          </h1>
        </div>
      </div>
    )
  }
});
