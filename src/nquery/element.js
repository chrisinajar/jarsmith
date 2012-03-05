var util = require('util'),
    events = require('events'),
    Renderable = require('../render/renderable');


var Element = function(engine, parent) {
  events.EventEmitter.call(this);
  this.engine = engine;
  this.parentNode = parent;
  this.nodeType = '?';
  this.childNodes = [];
  this.firstChild = null;
  this.lastChild = null;
  this.style = {};
  this.attributes = {};
};

util.inherits(Element, events.EventEmitter);

//TODO Implement this
Element.prototype.getElementsByClassName = function(name) {
  return [];
};

//TODO Implement this
Element.prototype.getElementsByTagName = function(name) {
  return [];
};

Element.prototype.setAttribute = function(name, value) {
  console.log('setting '+name);
  return this.attributes[name] = value;
};

Element.prototype.getAttribute = function(name) {
  return this.attributes[name];
};

//TODO Implement this
Element.prototype.cloneNode = function() {
  return new Element();
};

//TODO Implement this
Element.prototype.appendChild = function(element) {
  this.childNodes.push(element);
  this.firstChild = this.childNodes[0];
  this.lastChild = this.childNodes[this.childNodes.length-1];
  element.parentNode = this;
  return element;
};

//TODO Implement this
Element.prototype.removeChild = function(element) {
  var index = this.childNodes.indexOf(element);
  this.childNodes.splice(this.childNodes.indexOf(element), 1);
  this.firstChild = this.childNodes[0];
  this.lastChild = this.childNodes[this.childNodes.length-1];
  while (element.childNodes.length > 0) {
    element.removeChild(element.firstChild);
  }
    
  return this;
};

//TODO Implement this
Element.prototype.insertBefore = function(elem, before) {
  return this;
};

Element.prototype.toString = function() {
  return 'test';
};

var VisibleElement = function(engine, parent) {
  Element.apply(this, [engine, parent]);
  this.renderable = new Renderable(engine);
};

util.inherits(VisibleElement, Element);

VisibleElement.prototype.appendChild = function(element) {
  Element.prototype.appendChild.apply(this, [element]);
  element.renderable.show();
  return element;
};

VisibleElement.prototype.removeChild = function(element) {
  Element.prototype.removeChild.apply(this, [element]);
  element.renderable.hide();
  return element;
};

VisibleElement.prototype.width = function() {
  return this.renderable.width;
};

VisibleElement.prototype.setWidth = function(val) {
  return this.renderable.setWidth(val);
};

VisibleElement.prototype.height = function() {
  return this.renderable.height;
};

VisibleElement.prototype.setHeight = function(val) {
  return this.renderable.setHeight(val);
};

VisibleElement.prototype.texture = function() {
  return this.renderable.texture();
};

VisibleElement.prototype.setTexture = function(val) {
  return this.renderable.setTexture(val);
};

VisibleElement.prototype.x = VisibleElement.prototype.left = function() {
  return this.renderable.x;
};

VisibleElement.prototype.setX = VisibleElement.prototype.setLeft = function(val) {
  return this.renderable.setX(val);
};

VisibleElement.prototype.y = VisibleElement.prototype.top = function() {
  return this.renderable.y;
};

VisibleElement.prototype.setY = VisibleElement.prototype.setTop = function(val) {
  return this.renderable.setY(val);
};

VisibleElement.prototype.setAttribute = function(name, value) {
  console.log('setting '+name);
  var specialCases = {
    width: this.setWidth,
    height: this.setHeight,
    texture: this.setTexture,
    left: this.setX,
    top: this.setY,
  };
  if (name in specialCases) return specialCases[name].apply(this, [value]);
  return this.attributes[name] = value;
};

VisibleElement.prototype.getAttribute = function(name) {
  console.log('getting '+name);
  var specialCases = {
    width: this.width,
    height: this.height,
    texture: this.texture,
    left: this.x,
    top: this.y,
  };
  if (name in specialCases) return specialCases[name].apply(this);
  return this.attributes[name];
};

module.exports = {
  Element: Element,
  VisibleElement: VisibleElement,
};