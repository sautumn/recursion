// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className) {
  //function to call to accept extra parent argument
  function elementsByClassName(name, parentElement) {
    var elements = [];

    if (parentElement.classList.contains(className)) {
      //if we find the class in the parent, add it to the element
      elements.push(parentElement);
    }

    //recursive call for children of parent element
    //loop over parents children and check for classname
    for (var i = 0, length = parentElement.children.length; i < length; i++) {
      //cant use push here or it will be nested
      //conact the elements we find with the classname to the current item in the return array
      elements = elements.concat(elementsByClassName(className, parentElement.children[i]));
    }
    //finally return the elements after all operations are finished
    return elements;
  }
  //return elementsByClassName that returns the elements
  //staring with documentElement as the first parent
  return elementsByClassName(className, document.documentElement);

};
