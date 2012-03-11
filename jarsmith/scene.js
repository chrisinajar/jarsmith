var keyboard = require('./keyboard');

var Scene = function(engine, events) {
  this.engine = engine;
  this.nquery = engine.nquery;
  
  var $ = this.$ = this.nquery.$;
  this.selected = null;
  this.selectedIndex = 0;
  this.menu = [];
  this.selected = null;
  
  // create the document body and 
  this.nquery.document.body = this.body = ($('<obj>',  {
    width: 1024,
    height: 768,
    texture: 'bg',
  })[0]);
  this.nquery.document.parentNode = this.body; // I did this just to confuse you.
  this.nquery.document.emit('ready');
  // show the object manually...
  
  events.on('KEYDOWN', function(evt) {
    if (evt.sym == keyboard.esc)
      process.exit(0);
  });
  this.body.renderable.show();
};

module.exports = Scene;
