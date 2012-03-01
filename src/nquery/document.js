var util = require('util'),
    events = require('events'),
    Element = require('./element');

var Document = (function() {
  Element.call(this);
  // If this is not complete, then we must emit the "ready" event.
  this.readyState = "complete";
  this.documentElement = new Element();
  this.body = new Element();
});

util.inherits(Document, Element);

//TODO Implement this
Document.prototype.createElement = function(element) {
  return new Element();
};

//TODO Implement this
Document.prototype.getElementById = function(id) {
  return new Element();
};

//TODO Implement this
Document.prototype.createDocumentFragment = function(id) {
  return new Element();
};

Document.prototype.toString = function() {
  return 'test';
};

module.exports = Document;