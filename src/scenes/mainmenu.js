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
      width: 325,
      height: 164,
      top: 100,
      left: 0,
      texture: 'logo',
    }).delay(100)
      .animate({left: 369.5}, 300, "swing")
      .animate({left: 349.5}, 300, "swing")
      .animate({left: 329.5, top: 90, width: 365, height: 184}, 100, "swing");
  }, this);

};

module.exports = MainMenu;