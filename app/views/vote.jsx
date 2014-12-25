/** @jsx React.DOM */
Ninja.Views.Vote = React.createClass({

componentDidUpdate: function () {
  var $el = $(this.getDOMNode());
  $el.modal(this.props.modal);
},

render: function () {
  console.log('renderVote');
  return (
    <div className="modal fade bs-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 className="modal-title">Modal title</h4>
          </div>
          <div className="modal-body">
            <p>One fine body&hellip;</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    )
  }
});
