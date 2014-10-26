/** @jsx React.DOM */
  $(document).ready(function () {
    globals.app = new Ninja.Models.App();
    globals.router = new Ninja.Router();
    Backbone.history.start({pushState: true});
    React.renderComponent(<Ninja.Views.App model = {globals.app} router = {globals.router} />, document.body);

  });