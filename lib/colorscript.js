_log('colorscript.js is loaded successfully');

(function($) {
  var colorscript = window.colorscript || {};

  var init = function() {
    _log('init completed');

  }

  var _bind = function() {


    
    _log('_bind completed');
  }

  init();
  _bind();

  window.colorscript = colorscript;
})(jQuery)
