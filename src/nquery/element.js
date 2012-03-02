var util = require('util'),
    events = require('events'),
    Renderable = require('../render/renderable');


var Element = function(parent) {
  events.EventEmitter.call(this);
  this.parent = parent;
  this.nodeType = '?';
  this.children = [];
  this.firstChild = null;
  this.lastChild = null;
  this.style = {};
  this.attributes = {};
  this.renderable = new Renderable();
};

util.inherits(Element, events.EventEmitter);

Element.prototype.parentNode = function() {
  return this.parent;
};

//TODO Implement this
Element.prototype.getElementsByClassName = function(name) {
  return [new Element()];
};

//TODO Implement this
Element.prototype.getElementsByTagName = function(name) {
  return [new Element()];
};

Element.prototype.width = function() {
  return this.renderable.width();
};

Element.prototype.setWidth = function(val) {
  return this.renderable.setWidth(val);
};

Element.prototype.height = function() {
  return this.renderable.height();
};

Element.prototype.setHeight = function(val) {
  return this.renderable.setHeight(val);
};

Element.prototype.setAttribute = function(name, value) {
  console.log('setting '+name);
  var specialCases = {
    width: this.setWidth,
    height: this.setHeight,
  };
  if (name in specialCases) return specialCases[name].apply(this, value);
  return this.attributes[name] = value;
};

Element.prototype.getAttribute = function(name) {
  console.log('getting '+name);
  var specialCases = {
    width: this.width,
    height: this.height,
  };
  if (name in specialCases) return specialCases[name].apply(this);
  return this.attributes[name];
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