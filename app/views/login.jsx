/** @jsx React.DOM */
Ninja.Views.Login = React.createClass({

  render: function () {
    return (
      <span id="signinButton">
        <span
          className="g-signin"
          data-callback="signinCallback"
          data-clientid="CLIENT_ID"
          data-cookiepolicy="single_host_origin"
          data-requestvisibleactions="http://schema.org/AddAction"
          data-scope="https://www.googleapis.com/auth/profile">
        </span>
      </span>
    )
  }

});
