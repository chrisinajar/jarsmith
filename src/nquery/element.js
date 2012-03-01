var util = require('util'),
    events = require('events');


var Element = function(id, parent) {
  events.EventEmitter.call(this);
  this.id = id;
  this.parent = parent;
  this.nodeType = '?';
  this.firstChild = this;
  this.lastChild = this;
  this.style = {};
};

util.inherits(Element, events.EventEmitter);

Element.prototype.parentNode = function() {
  return this.parent;
};
Element.prototype.id = function() {
  return this.id;
};

//TODO Implement this
Element.prototype.getElementsByClassName = function(name) {
  return [new Element()];
};

//TODO Implement this
Element.prototype.getElementsByTagName = function(name) {
  return [new Element()];
};

//TODO Implement this
Element.prototype.setAttribute = function(name) {
};

//TODO Implement this
Element.prototype.getAttribute = function(name) {
};

//TODO Implement this
Element.prototype.cloneNode = function() {
  return new Element();
};

//TODO Implement this
Element.prototype.appendChild = function(element) {
  return this;
};

//TODO Implement this
Element.prototype.removeChild = function(element) {
  return this;
};

//TODO Implement this
Element.prototype.insertBefore = function(elem, before) {
  return this;
};

Element.prototype.toString = function() {
  return 'test';
};

module.exports = Element;