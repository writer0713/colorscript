_log('colorscript.js is loaded successfully');

(function($) {
  var colorscript = window.colorscript || {};

  var init = function() {
    _log('init completed');
    document.execCommand('defaultParagraphSeparator', false, 'p');
  }

  var _bind = function() {

    $('#code-text').on('keyup', function(e) {
      switch(e.keyCode) {
        case 13: // enter
        case 8: // backspace
        case 46: // delete
        case 91: // ctrl
          colorscript.util.changeLineNumber();
          break;
        default:
          console.log(e.keyCode + 'is pressed');
          break;
      }
    });
    _log('_bind completed');
  }

  init();
  _bind();

  window.colorscript = colorscript;
})(jQuery)
