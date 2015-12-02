Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

String.method('singleSpace', function() {
  return this.replace(/[.|?|!]["|'|\u2019|\u201d]*\s{2,}/g, function(a, b) {
    var lastIndex = a[1] === " " ? 2 : 3;
    return a.substring(0, lastIndex);
  });
});

function fixAllText(node){
  if (node) {
    node = node.firstChild;
    while (node) {
      if (node.nodeType == 3) {
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