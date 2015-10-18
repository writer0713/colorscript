(function($) {

  var colorscript = window.colorscript || {};
  colorscript.regex = window.colorscript.regex || {};

  colorscript.regex.text = {
    "color" : function(node) {
      node.innerHTML = node.innerHTML.replace(/<\/?span[^i|>]*>/gm, "");
      //var result = node.innerHTML.replace(/<\/?span[^i|>]*>/g, "");
      //console.log(result);
    }
  }

  window.colorscript = colorscript;
})(jQuery);
