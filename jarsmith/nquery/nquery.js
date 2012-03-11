// Just a friendly wrapper file to keep things simpler and seperate.

var jQuery = require('./jquery.js'),
// So these are my implementations, replace these to wrap it yourself! yay!
    Document = require('./document.js'),
    Navigator = require('./navigator.js'),
    Location = require('./location.js'),
    Window = require('./window.js');

var nQuery = function(engine) {
  this.engine = engine;
  this.document = new Document(this);
  this.navigator = new Navigator(this);
  this.location = new Location(this);
  this.window = new Window(this);
  
  this.jQuery = jQuery({
    window: this.window,
    document: this.document,
    navigator: this.navigator,
    location: this.location,
  });
  this.$ = this.jQuery;
};

nQuery.prototype.toString = function() {
  return 'test';
};


module.exports = nQuery;