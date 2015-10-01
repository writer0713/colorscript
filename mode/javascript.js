(function($) {

  var colorscript = window.colorscript || {};
  colorscript.regex = {};

  colorscript.regex.javascript = {
    "removeSpan" : function() {
      var node = document.getElementById("code-text");

      colorscript.util.setCaret(node);

      node.innerHTML = node.innerHTML.replace(/<\/?span[^i|>]*>/g, "");
      node.innerHTML = node.innerHTML.replace('<span id=\"caret\">', '<span id=\"caret\"></span>');

      colorscript.util.getCaret(node);

      this.operations();
    },

    "operations" : function() {
      var node = document.getElementById("code-text");

      colorscript.util.setCaret(node);

      node.innerHTML = node.innerHTML.replace(/(\+|\-|\*|\%)/g, "<span class='cs-default-common-keyword1'>$1</span>");

      colorscript.util.getCaret(node);

      this.number();
    },

    "number" : function() {
      var node = document.getElementById("code-text");

      colorscript.util.setCaret(node);

      node.innerHTML = node.innerHTML.replace(/\b([0-9]+)\b/g, "<span class='cs-default-common-number'>$1</span>");

      colorscript.util.getCaret(node);

      this.primitive();
    },

    "primitive" : function() {
      var node = document.getElementById("code-text");

      colorscript.util.setCaret(node);

      node.innerHTML = node.innerHTML.replace(/\b(Boolean|Null|Undefined|String|Number|Object)\b/g, "<span class='cs-default-common-keyword0'>$1</span>");

      colorscript.util.getCaret(node);

      this.variable();
    },

    "variable" : function() {
      var node = document.getElementById("code-text");

      colorscript.util.setCaret(node);

      node.innerHTML = node.innerHTML.replace(/\b(var|typeof|new|function)\b/g, "<span class='cs-default-common-keyword1'>$1</span>");

      colorscript.util.getCaret(node);

      //this.operations();
    },

    "makeResult" : function(result) {
      var node = document.getElementById("code-text");
      var caretID = 'caret';
      var cc = document.createElement('span');
      cc.id = caretID;

      window.getSelection().getRangeAt(0).insertNode(cc);

      node.blur();

      $('#code-text').html(result);

      node.focus();

      var range = document.createRange();
      cc = document.getElementById(caretID);
      range.selectNode(cc);
      var selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      range.deleteContents();
    }
  }

  window.colorscript = colorscript;
})(jQuery);
