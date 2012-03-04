var resources = require('../resources'),
    nQuery = require('../nquery/nquery'),
    keyboard = require('../keyboard');

var $;
var MainMenu = function(engine, events) {
  this.engine = engine;
  $ = (new nQuery(engine)).$;
  this.selected = null;
  this.selectedIndex = 0;
  this.menu = [
    [370, 360],
    [440, 360],
    [640, 360],
  ];
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
  
    s.selected = $('<obj>',  {
      width: 300,
      height: 120,
      top: 370,
      left: 360,
      texture: 'selected',
    });
  }, this);
  
  var self = this;
  events.on('KEYDOWN', function(evt){self.keydown.apply(self, [evt]);});
  events.on('KEYUP', function(evt){self.keyup.apply(self, [evt]);});
};

MainMenu.prototype.keydown = function (evt) {
  switch (evt.sym) {
    case keyboard.up:
      this.moveUp();
      break;
    case keyboard.down:
      this.moveDown();
      break;
  }
};

MainMenu.prototype.keyup = function (evt) {
  var ascii = evt.sym;
  
  if( ( ascii < 123 ) && ( ascii > 96 ) ) {
    if( 0 != ( evt.mod && 0x2003 ) ) {
      ascii -= 32;
    }
  }
  
  console.log('keyup');
  console.log(ascii);
};

MainMenu.prototype.moveUp = function() {
  if (!this.selected)
    return;
  if (this.selectedIndex == 0)
    this.selectedIndex = this.menu.length;
  this.selectedIndex--;
  this.selected.stop().animate({top: this.menu[this.selectedIndex][0], left: this.menu[this.selectedIndex][1]}, 200);
};

MainMenu.prototype.moveDown = function() {
  if (!this.selected)
    return;
  this.selectedIndex++;
  if (this.selectedIndex == this.menu.length)
    this.selectedIndex = 0;
  this.selected.stop().animate({top: this.menu[this.selectedIndex][0], left: this.menu[this.selectedIndex][1]}, 200);
};

module.exports = MainMenu;