/** @jsx React.DOM */
  $(document).ready(function () {
    var cx = React.addons.classSet;
    var csst = React.addons.CSSTransitionGroup;

    globals.app = new Ninja.Models.App();
    globals.router = new Ninja.Router();
    Backbone.history.start({pushState: true});
    React.renderComponent(<Ninja.Views.App model = {globals.app} router = {globals.router} />, document.body);
  });