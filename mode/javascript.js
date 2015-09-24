(function($) {

  var colorscript = window.colorscript || {};
  colorscript.regex = {};

  colorscript.regex.javascript = {
    "removeSpan" : function(str) {
      var result = '';
      result = str.replace(/<\/?span[^>]*>/g,"");
      this.number(result);
    },
    "number" : function(str) {
      var result = str.replace(/\b([0-9]+)\b/, "<span class='cs-default-common-number'>$1</span>")
      //console.log(result);
      this.makeResult(result);
    },
    "makeResult" : function(result) {
      $('#code-text').html(result);
    }
  }

  window.colorscript = colorscript;
})(jQuery);
