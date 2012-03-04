var util = require('util'),
    Scene = require('./scene'),
    keyboard = require('../keyboard');

var BaseMenu = function(engine, events) {
  Scene.apply(this, [engine, events]);
  this.selectedIndex = {x:0,y:0};
  this.options = {
    wrap: true,
  };
  
  var self = this;
  events.on('KEYDOWN', function(evt){self.keydown.apply(self, [evt]);});
  events.on('KEYUP', function(evt){self.keyup.apply(self, [evt]);});
};

util.inherits(BaseMenu, Scene);



BaseMenu.prototype.keydown = function (evt) {
  switch (evt.sym) {
    case keyboard.up:
      this.moveUp();
      break;
    case keyboard.down:
      this.moveDown();
      break;
    case keyboard.left:
      this.moveLeft();
      break;
    case keyboard.right:
      this.moveRight();
      break;
    case keyboard.enter:
      this.activated();
      break;
  }
};

BaseMenu.prototype.keyup = function (evt) {
  var ascii = evt.sym;
  
  if( ( ascii < 123 ) && ( ascii > 96 ) ) {
    if( 0 != ( evt.mod && 0x2003 ) ) {
      ascii -= 32;
    }
  }
  
  console.log('keyup');
  console.log(ascii);
};

// move directions
(function() {
  var directions = {
    Up: ['y',-1],
    Down: ['y',1],
    Left: ['x',-1],
    Right: ['x',1],
  };
  
  for (var dir in directions) {
    (function(d, dir, directions) {
      BaseMenu.prototype['move'+dir] = function() {
	if (!this.selected || this.menu.length < 1)
	  return;
	
	var dest = this.selectedIndex[d[0]] + d[1];
	// get the difference below zero
	var diff = 0-Math.min(0, dest);
	diff += Math.max(0, dest - this.menu.length + 1);
	
	// we've over a boundary
	if (diff) {
	  // we have word wrap enabled
	  if (this.options.wrap) {
	    // we wrapped over
	    if (Math.min(0, dest)) {
	      dest = this.menu.length-diff;
	    } else {
	      dest = diff-1;
	    }
	  } else {
	    // we didn't wrap.. over
	    if (Math.min(0, dest)) {
	      dest = this.menu.length-1;
	    } else {
	      dest = 0;
	    }
	  }
	}
	
	this.selectedIndex[d[0]] = dest;
	
	var an = {};
	if (this.menu[this.selectedIndex.y]) {
	  // [
	  //   row:
	  //      [x,y],
	  //      [[x,y],[x,y]],
	  // ]
	  var row = this.menu[this.selectedIndex.y];
	  // horizonal row!
	  if (typeof row[0] == "object") {
	    an.left = row[this.selectedIndex.x][0];
	    an.top = row[this.selectedIndex.x][1];
	  } else {
	    an.left = row[0];
	    an.top = row[1];
	  }
	}
	
	this.selected.stop().animate(an, 200);
      };
    })(directions[dir], dir, directions);
  }
})();

BaseMenu.prototype.activated = function(){
};

module.exports = BaseMenu;