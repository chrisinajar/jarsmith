// Just a friendly wrapper file to keep things simpler and seperate.

var jQuery = require('./jquery.js'),
// So these are my implementations, replace these to wrap it yourself! yay!
    Document = require('./document.js'),
    Navigator = require('./navigator.js'),
    Location = require('./location.js'),
    Window = require('./window.js');

var nQuery = function(engine) {
  this.engine = engine;
  var document = new Document(this),
      navigator = new Navigator(this),
      location = new Location(this),
      window = new Window(this);
  
  this.jQuery = jQuery({
    window: window,
    document: document,
    navigator: navigator,
    location: location,
  });
  this.$ = this.jQuery;
};

nQuery.prototype.toString = function() {
  return 'test';
};


module.exports = nQuery;