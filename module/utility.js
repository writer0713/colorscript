_log('utility.js is loaded successfully');

(function() {

  var colorscript = window.colorscript || {};
  colorscript.option = {
      "lineNumber": "on"
  };
  colorscript.util = {
    turnOnLineNumber: function() {
      colorscript.option.linenumber = "on";
      $('div#linenumber').show();
    },

    turnOffLineNumber: function() {
      colorscript.option.linenumber = "off";
      $('div#linenumber').hide();
    }
  };

  window.colorscript = colorscript;
})();
