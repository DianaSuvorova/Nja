/** @jsx React.DOM */
  $(document).ready(function () {
    globals.router = new Ninja.Router();
    globals.app = new Ninja.Models.App();
    Backbone.history.start({pushState: true});
    React.renderComponent(Ninja.Views.App({model: globals.app}), document.body);

  });