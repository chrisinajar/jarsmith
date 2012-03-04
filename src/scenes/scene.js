var nQuery = require('../nquery/nquery');

var Scene = function(engine, events) {
  this.engine = engine;
  var $ = this.$ = (new nQuery(engine)).$;
  this.selected = null;
  this.selectedIndex = 0;
  this.menu = [];
  this.selected = null;
  $('<obj>',  {
    width: 1024,
    height: 768,
    texture: 'bg',
  });
};

module.exports = Scene;