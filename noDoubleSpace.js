Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

String.method('singleSpace', function() {
  var text = this.replace(/\u00a0(?!$)/g, "  "); // unicode for &nbsp not at end of line
  return text.replace(/[.|?|!]["|'|\u2019|\u201d]*\s{2,}(?!$)/g, function(a) { // unicode for curly quotes
    var lastIndex = a[1] === " " ? 2 : 3;
    return a.substring(0, lastIndex);
  });
});

function fixAllText(node){
  if (node) {
    node = node.firstChild;
    while (node) {
      if (node.nodeType == 3) {
        var el = node.parentElement;
        if (el.parentElement.hasAttribute('contenteditable')) { return false; };
        node.textContent = node.textContent.singleSpace();
      } else {
          fixAllText(node);
        };
      node = node.nextSibling;
    }
  }
};

document.addEventListener("DOMContentLoaded", function() {
  fixAllText(document.body);
});

// poll for text subsequently added to page after DOM load and fix it
window.setInterval(function() {
  fixAllText(document.body);
}, 100);
