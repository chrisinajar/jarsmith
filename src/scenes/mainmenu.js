var util = require('util'),
    BaseMenu = require('./basemenu');

var $;
var MainMenu = function(engine, events) {
  BaseMenu.apply(this, [engine, events]);
  $ = this.$;
  engine.loadResources('menu', function(s) {
    var engine = s.engine;
    
    // Set up selectors
    s.menu = [
      [360, 370],
      [360, 440],
      [360, 640],
    ];
  
    s.selected = $('<obj>',{
      width: 300,
      height: 120,
      top: 370,
      left: 360,
      texture: 'selected',
    });
    
    // show menu
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

util.inherits(MainMenu, BaseMenu);

MainMenu.prototype.activated = function() {
  switch (this.selectedIndex.y) {
    case 0: //play
      console.log("Derp derp");
      break;
    case 1: //options
      console.log("Sorry. this does nothing");
      break;
    case 2: //exit
      process.exit();
      break;
  }
};

module.exports = MainMenu;

