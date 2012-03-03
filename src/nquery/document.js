var util = require('util'),
    events = require('events'),
    element = require('./element');

var Document = (function(nQuery) {
  element.Element.call(this);
  
  this.engine = nQuery.engine;
  // If this is not complete, then we must emit the "ready" event.
  this.readyState = "complete";
  this.documentElement = new element.VisibleElement(this.engine);
  this.body = new element.VisibleElement(this.engine);
});

util.inherits(Document, element.Element);

//TODO Implement this
Document.prototype.createElement = function(el) {
  console.log('creating new element ' + el);
  return new element.VisibleElement(this.engine);
};

//TODO Implement this
Document.prototype.getElementById = function(id) {
  return new element.VisibleElement(this.engine);
};

//TODO Implement this
Document.prototype.createDocumentFragment = function(id) {
  return new element.VisibleElement(this.engine);
};

Document.prototype.toString = function() {
  return 'test';
};

module.exports = Document;

