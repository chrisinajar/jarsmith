var resources = require('../resources'),
    nQuery = require('../nquery/nquery');

var $;
var MainMenu = function(engine) {
  this.engine = engine;
  $ = (new nQuery(engine)).$;
  engine.loadResources('menu', function(s) {
    var engine = s.engine;
    $('<obj>',  {
      width: 1024,
      height: 768,
      texture: 'bg',
    });
    $('<obj>',  {
      width: 191,
      height: 328,
      top: 400,
      left: 416,
      texture: 'mainmenu',
    });
    $('<obj>',  {
      width: 365,
      height: 184,
      top: 0,
      left: 329.5,
      texture: 'logo',
    });
  }, this);

};

module.exports = MainMenu;