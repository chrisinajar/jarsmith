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

Element.prototype.getElementsByClassName = function(name) {
	var ar = []
	
	for (var i = 0; i < childNodes; ++i) {
		if (childNodes[i].attributes.class != name)
			continue; // short circuit
		
		ar.push(childNodes[i]);
		ar = ar.concat(childNodes[i].getElementsByClassName(name));
	}
	
	return ar;
};

//TODO Implement this
Element.prototype.getElementsByTagName = function(name) {
	var ar = []
	
	for (var i = 0; i < childNodes; ++i) {
		//if (childNodes[i].attributes.class != name)
		//	continue; // short circuit
		
		ar.push(childNodes[i]);
		ar = ar.concat(childNodes[i].getElementsByClassName(name));
	}
	
	return ar;
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

// Generate getters and setters
(function(){
	var ar = [
		'Width',
		'Height',
		'Texture',
		'Color',
		'Opacity',
		'X',
		'Y',
		'Rotation'
 	];
	for (var i = 0; i < ar.length; ++i) {
		(function(setter, type) {
			VisibleElement.prototype[type] = (function() { 
				return this.renderable[type].apply(this.renderable);
			});
			VisibleElement.prototype[setter] = (function(val) {
				return this.renderable[setter].apply(this.renderable, [val]);
			});
		})('set'+ar[i], ar[i].toLowerCase());
	}
})();
// Generate alias attributes
(function(){
	var ar = {
		Left: 'X',
		Top: 'Y',
	};
	for (var i in ar) {
		(function(setterOrig, getterOrig, setterA, getterA) {
			VisibleElement.prototype[getterA] = (function() {
				return this[getterOrig]();
			});
			VisibleElement.prototype[setterA] = (function(val) {
				return this[setterOrig](val);
			});
		})('set'+ar[i], ar[i].toLowerCase(), 'set'+i, i.toLowerCase());
	}
})();

VisibleElement.prototype.setAttribute = function(name, value) {
  var specialCases = {
    width: this.setWidth,
    height: this.setHeight,
    texture: this.setTexture,
    left: this.setX,
    top: this.setY,
    opacity: this.setOpacity,
  };
  if (name in specialCases) return specialCases[name].apply(this, [value]);
  console.log('E setting ' + name + ' to ' + value);
  return this.attributes[name] = value;
};

VisibleElement.prototype.getAttribute = function(name) {
  var specialCases = {
    width: this.width,
    height: this.height,
    texture: this.texture,
    left: this.x,
    top: this.y,
    opacity: this.opacity,
  };
  if (name in specialCases) return specialCases[name].apply(this);
  return this.attributes[name];
};

module.exports = {
  Element: Element,
  VisibleElement: VisibleElement,
};

