_log('utility.js is loaded successfully');

(function($) {

  var colorscript = window.colorscript || {};
  var _editor = document.getElementById('code-text');
  colorscript.option = {
      "lineNumber": "on",
      "mode" : "text",
      "theme" : "none"
  };

  colorscript.caret = {
    "caretID" : "caret",
    "node" : _editor
  }

  colorscript.option.theme = {};

  colorscript.optionList = {
    "mode" : ["text", "javascript"],
    "theme" : ["default", "sublime-black"]
  }

  colorscript.util = {
    turnOnLineNumber: function() {
      colorscript.option.linenumber = "on";
      $('div#linenumber').show();
    },

    turnOffLineNumber: function() {
      colorscript.option.linenumber = "off";
      $('div#linenumber').hide();
    },

    // colorscript의 언어 모드를 설정 (text, javascript 등)
    setMode: function(mode) {
      if(!this.isExist(mode, colorscript.optionList.mode)) {
        throw new Error("해당하는 모드가 없습니다");
      }

      colorscript.option.mode = mode;

      this.loadMode(mode);
      // 사용할 regex 종류 설정
    },

    loadMode: function(modeName) {
      var prevMode = document.getElementById('mode_js');
      if(prevMode != null) prevMode.parentNode.removeChild(prevMode);

      if(prevMode == "text") return;

      var link = document.createElement("script");
      link.type = "text/javascript";
      link.src = "./mode/" + modeName + ".js";
      link.id = "mode_js";

      document.body.appendChild(link);
    },

    setTheme: function(themeName) {
      if(!this.isExist(themeName, colorscript.optionList.theme)) {
        throw new Error("해당하는 테마가 없습니다")
      }

      colorscript.option.theme = themeName;

      this.loadTheme(themeName);
    },

    loadTheme: function(themeName) {
      var prevTheme = document.getElementById('theme_css');
      if(prevTheme != null) prevTheme.parentNode.removeChild(prevTheme);

      if(themeName == "none") return;

      var link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "./theme/" + themeName + ".css";
      link.id = "theme_css";

      document.getElementsByTagName("head")[0].appendChild(link);
    },

    // 일반적으로 optionList에 원하는 요소가 있는지 검사
    isExist: function(elem, arr) {
      if(Object.prototype.toString.call(arr) != "[object Array]") {
        throw new Error("배열이 아닙니다.");
      }

      for(var i in arr) {
        if(arr[i] == elem) {
          return true;
        }
      }
      return false;
    },

    setCaret: function(node) {
      var caretID = 'caret';
      var cc = document.createElement('span');
      cc.id = caretID;

      window.getSelection().getRangeAt(0).insertNode(cc);

      node.blur();
    },

    getCaret: function(node) {
      var caretID = 'caret';

      node.focus();

      var range = document.createRange();
      cc = document.getElementById(caretID);
      range.selectNode(cc);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      range.deleteContents();
    },

    separateDivs: function() {
      var node = document.getElementById("code-text");
      colorscript.util.setCaret(node);

      node.innerHTML = node.innerHTML.replace(/\n/gm, "</p><p>");

      colorscript.util.getCaret(node);
    },

    getCaretPosition: function(element) {
      var element = element || _editor;
      var ie = (typeof document.selection != "undefined" && document.selection.type != "Control") && true;
      var w3 = (typeof window.getSelection != "undefined") && true;

      var caretOffset = 0;

      if (w3) {
          var range = window.getSelection().getRangeAt(0);
          var preCaretRange = range.cloneRange();
          preCaretRange.selectNodeContents(element);
          preCaretRange.setEnd(range.endContainer, range.endOffset);
          caretOffset = preCaretRange.toString().length;
      } else if (ie) {
          var textRange = document.selection.createRange();
          var preCaretTextRange = document.body.createTextRange();
          preCaretTextRange.moveToElementText(element);
          preCaretTextRange.setEndPoint("EndToEnd", textRange);
          caretOffset = preCaretTextRange.text.length;
      }
      return caretOffset;
    },

    changeLineNumber: function() {
      if(colorscript.option.lineNumber == "off") return;
      var ol = $('div#linenumber ol');
      /* div가 한개 남았을때 백스페이스로 지울경우 div가 지워지면서 갯수가 0이 된다.
      이때 div를 하나 추가해주고 div_count를 강제로 1로 변환해준다.*/
      var p_count_in_pre = ($('pre#code-text p').length == 0) ? (function() {
        $('pre#code-text').find('br').remove().end().append("<p id='first_p'>\n</p>"); // br을 p로 바꿔준다
        // 커서를 새로 만들어준 p tag에 포커싱 시켜줘야 그 다음에 엔터를 치면 p 태그로 생성됨(안그러면 br 로 생성)
        var el = document.getElementById('first_p');
            range = document.createRange();
            range.selectNodeContents(el);
            var sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);

        return 1; // p tag의 갯수가 1개라고 강제로 지정
      })() : $('pre#code-text p').length;

      var linenumber = $('div#linenumber ol li').length;
      var len = p_count_in_pre - linenumber;
      var min_linenum_to_add = linenumber + 1;
      var i = 0;

      // 라인넘버와 div 갯수가 같을때
      if(len == 0) return;

      // div 갯수가 라인넘버보다 많을때
      if(len > 0) {

        for(; i < len; i++) {
          $('<li>' + min_linenum_to_add++ + '</li>').appendTo(ol);
        }
        return;
      }

      // 라인 넘버가 div 갯수보다 많을때
      if(len < 0) {
        len = Math.abs(len);
        while(len > 0) {
          len--;
          var li_length = ol.children().length;
          var li_to_remove = ol.children()[li_length - 1];
          $(li_to_remove).remove();
        }
        return;
      }
    }

  };

  window.colorscript = colorscript;
})(jQuery);
