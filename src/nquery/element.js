var util = require('util'),
    events = require('events'),
    Renderable = require('../render/renderable');


var Element = function(engine, parent) {
  events.EventEmitter.call(this);
  this.engine = engine;
  this.parent = parent;
  this.nodeType = '?';
  this.children = [];
  this.firstChild = null;
  this.lastChild = null;
  this.style = {};
  this.attributes = {};
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

var VisibleElement = function(engine, parent) {
  Element.apply(this, [engine, parent]);
  this.renderable = new Renderable(engine);
};

util.inherits(VisibleElement, Element);

VisibleElement.prototype.width = function() {
  return this.renderable.width();
};

VisibleElement.prototype.setWidth = function(val) {
  return this.renderable.setWidth(val);
};

VisibleElement.prototype.height = function() {
  return this.renderable.height();
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

VisibleElement.prototype.x = function() {
  return this.renderable.x();
};

VisibleElement.prototype.setX = function(val) {
  return this.renderable.setX(val);
};

VisibleElement.prototype.y = function() {
  return this.renderable.y();
};

VisibleElement.prototype.setY = function(val) {
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