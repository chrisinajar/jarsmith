var Element = function(id, parent) {
  this.id = id;
  this.parent = parent;
  this.nodeType = '?';
};

Element.prototype.parentNode = function() {
  return this.parent;
};
Element.prototype.id = function() {
  return this.id;
};

//TODO Implement this
Element.prototype.getElementsByClassName = function(name) {
};

module.export = Element;