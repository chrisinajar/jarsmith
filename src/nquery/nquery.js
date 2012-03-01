// Just a friendly wrapper file to keep things simpler and seperate.

var jQuery = require('./jquery.js'),
// So these are my implementations, replace these to wrap it yourself! yay!
    Document = require('./document.js'),
    Navigator = require('./navigator.js'),
    Location = require('./location.js');

var nQuery = function() {
  var document = new Document(this),
      navigator = new Navigator(this),
      location = new Location(this);
  
  this.jQuery = jQuery({document, navigator, location});
  this.$ = this.jQuery;
};


module.exports = nQuery;