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
      //console.log(e.keyCode);
      var codes = document.getElementById('code-text').innerHTML;
      switch(e.keyCode) {
        case 13: // enter
        case 8: // backspace
        case 46: // delete
          colorscript.util.changeLineNumber();
          break;
        case 91: // ctrl(mac) && window key(general window)
        case 17: // ctrl(window)
          colorscript.util.separateDivs();
          colorscript.util.changeLineNumber();
          //colorscript.regex[colorscript.option.mode].removeSpan(codes);
          break;
        default:
          colorscript.regex[colorscript.option.mode].removeSpan(codes);
          break;
      }
    });
    _log('_bind completed');
  }

  init();
  _bind();

  window.colorscript = colorscript;
})(jQuery)
