/** @jsx React.DOM */
Ninja.Views.Login = React.createClass({

  onClickContainer: function () {
    this.props.onToggleShowLogin(false)
  },

  render: function () {
    var loginClass = globals.cx({
      'loginContainer': true,
      'hidden': !this.props.loginShow
    });

    return (
      <div className = {loginClass} onClick= {this.onClickContainer}>
        <div id = 'login'>
          <span id="signinButton">
            <span
              className="g-signin"
              data-callback="signinCallback"
              data-clientid="CLIENT_ID"
              data-cookiepolicy="single_host_origin"
              data-requestvisibleactions="http://schema.org/AddAction"
              data-scope="https://www.googleapis.com/auth/profile"
            />
          </span>
        </div>
      </div>
    )
  }

});
