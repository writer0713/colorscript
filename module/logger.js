(function() {
  var _log = (typeof "console" === "undefined") ? function(str) {} : function(str) {
    console.log("log :: " + str);
  }

  window._log = _log;
})();

_log('logger.js is loaded successfully');
