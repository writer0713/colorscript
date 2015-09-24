_log('utility.js is loaded successfully');

(function($) {

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
    },

    changeLineNumber: function() {
      if(colorscript.option.lineNumber == "off") return;
      var ol = $('div#linenumber ol');
      /* div가 한개 남았을때 백스페이스로 지울경우 div가 지워지면서 갯수가 0이 된다.
      이때 div를 하나 추가해주고 div_count를 강제로 1로 변환해준다.*/
      var p_count_in_pre = ($('pre#code-text p').length == 0) ? (function() {
        $('pre#code-text').find('br').remove().end().append("<p id='first_p'></p>"); // br을 p로 바꿔준다
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
          ol.children()[li_length - 1].remove();
        }
        return;
      }
    }

  };

  window.colorscript = colorscript;
})(jQuery);
