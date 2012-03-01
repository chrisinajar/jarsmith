var util = require('util');

var Document = (function() {
  events.EventEmitter.call(this);
  // If this is not complete, then we must emit the "ready" event.
  this.readyState = "complete";
});

//TODO Implement this
Document.prototype.createElement = function(element) {
};

//TODO Implement this
Document.prototype.getElementById = function(id) {
};

util.inherits(Document, events.EventEmitter);

module.exports = Document;