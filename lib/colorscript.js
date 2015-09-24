_log('colorscript.js is loaded successfully');

(function($) {
  var colorscript = window.colorscript || {};

  var init = function() {
    _log('init completed');
    document.execCommand('defaultParagraphSeparator', false, 'p');

    colorscript.util.setMode("javascript");
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
          //console.log(e.keyCode + 'is pressed');
          //var mode = colorscript.option.mode;
          //var codeText = $('#code-text').html();

          //colorscript.regex[mode].removeSpan(codeText);
          break;
      }
    });
    _log('_bind completed');
  }

  init();
  _bind();

  window.colorscript = colorscript;
})(jQuery)
