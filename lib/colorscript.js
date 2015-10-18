_log('colorscript.js is loaded successfully');

(function($) {
  var colorscript = window.colorscript || {};

  var init = function() {
    _log('init completed');
    document.execCommand('defaultParagraphSeparator', false, 'p');

    colorscript.util.setTheme("default");
    colorscript.util.setMode("javascript")

  }

  var _bind = function() {
    // keyboard event
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
          colorscript.util.changeLineNumber('editor');
          //colorscript.regex[colorscript.option.mode].removeSpan(codes);
          break;
        default:
          //colorscript.regex[colorscript.option.mode].removeSpan(codes);
          break;
      }
    });

    $('.theme-options').on('click', function() {
      var newTheme = $(this).text();
      $('#themeButton').html(newTheme + "<span class=\"caret\"></span>");
      colorscript.util.setTheme(newTheme);

      var node = document.getElementById('code-text-result');
      colorscript.regex[colorscript.option.mode].color(node);
    });

    $('.mode-options').on('click', function() {
      var newMode = $(this).text();
      $('#modeButton').html(newMode + "<span class=\"caret\"></span>");
      colorscript.util.setMode(newMode);

      var node = document.getElementById('code-text-result');

    });

    $('#clearBtn').on('click', function() {
      $('.code-text').html("<p></p>");
      colorscript.util.changeLineNumber('editor');
      colorscript.util.changeLineNumber('editor2');
    });

    $('#beautifyBtn').on('click', function() {
      var node = document.getElementById('code-text-result');
      var contentToChange = $('#code-text').html();
      $('#code-text-result').html(contentToChange);

      colorscript.util.changeLineNumber('editor2');
      colorscript.regex[colorscript.option.mode].color(node);
    });

    $('#lineNumberOnBtn').on('click', function() {
      colorscript.util.turnOnLineNumber();
      $('#lineNumberOffBtn').show();
      $(this).hide();
    });

    $('#lineNumberOffBtn').on('click', function() {
      colorscript.util.turnOffLineNumber()
      $('#lineNumberOnBtn').show();
      $(this).hide();
    });

    _log('_bind completed');
  }

  init();
  _bind();

  window.colorscript = colorscript;
})(jQuery)
