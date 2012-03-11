var util = require('util'),
    BaseMenu = require('./basemenu');

var $;
var MainMenu = function(engine, events) {
	BaseMenu.apply(this, [engine, events]);
	$ = this.$;
    engine.loadResources('splash');
	
	var splash = $('<obj>',{
		width: 1024,
		height: 768,
		top: 0,
		left: 0,
		texture: 'splash',
	}).appendTo($(this.body));

	engine.loadResources('menu', function(s) {
    var engine = s.engine;
	
	setTimeout(function() {
		console.log('animate');
	splash.animate({opacity: 0.0}, 500, "swing", function(){
	splash.remove();
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
    }).appendTo($(s.body));
    
    // show menu
    s.mainobj = $('<obj>',  {
      width: 191,
      height: 328,
      top: 400,
      left: 416,
      texture: 'mainmenu',
    }).appendTo($(s.body));
    $('<obj>',  {
      width: 325,
      height: 164,
      top: 100,
      left: -325,
      texture: 'logo',
    }).appendTo($(s.body)).delay(200)
      .animate({left: 369.5}, 300, "swing")
      .animate({left: 349.5}, 300, "swing")
      .animate({left: 309.5, top: 80, width: 400, height: 200}, 100, "swing");
      
    var guy = $('<obj>',  {
      width: 32,
      height: 48,
      top: 768,
      left: 416,
      texture: 'guy',
    });
    var peek;
    peek = (function() {
      guy.attr({left:Math.random()*1000});
      guy.animate({top: 738}, 200, "swing")
	.delay(1000)
	.animate({top: 768}, 200, "swing");

      setTimeout(peek, (Math.random()*5000+5000));
    });
   
    setTimeout(peek, (Math.random()*2000+2000));
    
    s.activated.mainmenu = s.activated.fn = (function() {
      switch (s.selectedIndex.y) {
	case 0: //play
	  s.engine.loadScene('game');
	  break;
	case 1: //options
	  s.selectedIndex.y = 0;
	  s.menu = [
	    [360, 600],
	  ];
	  s.selected.animate({left: s.menu[0][0], top: s.menu[0][1]}, 200);
	  s.mainobj.remove();
	  this.mainobj = $('<obj>',  {
	    width: 191,
	    height: 328,
	    top: 400,
	    left: 416,
	    texture: 'options',
	  }).appendTo($(s.body));
	  s.activated.fn = s.activated.options;
	  break;
	case 2: //exit
	  process.exit();
	  break;
      }
    });
    s.activated.options = (function() {
      switch (s.selectedIndex.y) {
	case 0: //back
	  s.menu = [
	    [360, 370],
	    [360, 440],
	    [360, 640],
	  ];
	  s.selected.animate({left: s.menu[0][0], top: s.menu[0][1]}, 200);
	  s.mainobj.remove();
	  s.mainobj = $('<obj>',  {
	    width: 191,
	    height: 328,
	    top: 400,
	    left: 416,
	    texture: 'mainmenu',
	  }).appendTo($(s.body));
	  s.activated.fn = s.activated.mainmenu;
	  break;
      }
    });
	});
	}, 200);
  }, this);
};

util.inherits(MainMenu, BaseMenu);

MainMenu.prototype.activated = function() {
  return this.activated.fn.apply(this);
};

module.exports = MainMenu;

