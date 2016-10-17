// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {

  function elementsByClassName(name, parentElement) {
    var elements = [];

    if (parentElement.classList.contains(className)) {
      elements.push(parentElement);
    }

    for (var i = 0, length = parentElement.children.length; i < length; i++) {
      elements = elements.concat(elementsByClassName(className, parentElement.children[i]));
    }
    return elements;
  }

  return elementsByClassName(className, document.documentElement);

};
