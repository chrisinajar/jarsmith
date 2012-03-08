var util = require('util'),
    events = require('events'),
    Renderable = require('../render/renderable');

	/* 
	 * TODO:
	 * I'm pretty sure I'm leaking jQuery shit really badly here. I think I need to figure
	 * out how to disable all the jquery events and timers and stuff, I want this object to be
	 * GC-able if the user .remove(); on it and removes any references to it...
	 * 
	 */

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

Element.prototype.appendChild = function(element) {
	if (""+this === "null") {
		return this;
	}
	console.log('I got a child!' + this);
	console.log(""+this);
	this.childNodes.push(element);
	this.firstChild = this.childNodes[0];
	this.lastChild = this.childNodes[this.childNodes.length-1];
	element.parentNode = this;
	return this;
};

// noRemove optional, if true doesn't call remove
Element.prototype.removeChild = function(element) {
	// clarity
	var index = this.childNodes.indexOf(element);
	if (index < 0)
		return this;
	this.childNodes.splice(this.childNodes.indexOf(element), 1);
	if (this.childNodes.length > 0) {
		this.firstChild = this.childNodes[0];
		this.lastChild = this.childNodes[this.childNodes.length-1];
	} else {
		console.log("I'm all out of kids..."+this);
		this.firstChild = null;
		this.lastChild = null;
	}
	
	element.remove();
	
	return this;
};

Element.prototype.remove = function() {
	if (this.parentNode === null && this.childNodes.length == 0)
		return;
	
	for (var i=0,l=this.childNodes.length; i<l; ++i) {
		console.log('Removing my child!');
		(function(self, node) {
			self.removeChild(node);
		})(this, this.childNodes[0]);
	}
	if (this.parentNode)
		this.parentNode.removeChild(this);
	this.parentNode = null;
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

VisibleElement.prototype.render = function(p) {
	if (this.renderable) {
		this.renderable.show();
		this.renderable.doRender(p);
	}
	for (var i=0,l=this.childNodes.length; i<l; ++i) {
		this.childNodes[i].render(p);
	}
	return this;
};

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

VisibleElement.prototype.remove = function() {
	Element.prototype.remove.apply(this);
	this.renderable.hide();
	return this;
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

VisibleElement.prototype.toString = function(val) {
	return ""+this.renderable.texture();
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

