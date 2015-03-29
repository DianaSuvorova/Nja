/** @jsx React.DOM */
  $(document).ready(function () {
    React.initializeTouchEvents(true);

    globals.cx = React.addons.classSet;
    globals.csst = React.addons.CSSTransitionGroup;
    globals.ReactTransitionGroup = React.addons.TransitionGroup;
    globals.isBreakpoint = (function (alias) {return $('.device-' + alias).css('display')!=='none';});
    globals.createCookie = (function(name, value, days) {
      if (days) {
          var date = new Date();
          date.setTime(date.getTime() + (days*24*60*60*1000));
          var expires = "; expires=" + date.toGMTString();
      }
      else var expires = "";
      document.cookie = name + "=" + value + expires + "; path=/";
    });

    globals.readCookie = (function (name) {
      var nameEQ = name + "=";
      var ca = document.cookie.split(';');
      for(var i=0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) === ' ') c = c.substring(1,c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
      }
      return null;
    });

    globals.eraseCookie = (function (name) { globals.createCookie(name,"",-1); });

    globals.app = new Ninja.Models.App();
    globals.router = new Ninja.Router();
    Backbone.history.start({pushState: true});
    React.renderComponent(<Ninja.Views.App model = {globals.app} router = {globals.router}/>, document.body);
  
});