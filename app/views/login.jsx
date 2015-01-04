/** @jsx React.DOM */
Ninja.Views.Login = React.createClass({

  componentDidUpdate: function () {
    var $el = $(this.getDOMNode());
    $el.modal(this.props.modal);
  },


  render: function () {
    return (
      <div className="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="login" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Login</h4>
            </div>
            <div className="modal-body">
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
            </div>
          </div>
        </div>
      </div>
    )
  }

});
