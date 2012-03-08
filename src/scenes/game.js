var util = require('util'),
    Scene = require('./scene');

var $;

var Game = function(engine, events) {
	Scene.apply(this, [engine, events]);
	$ = this.$;
	this.s = null;
	engine.loadResources('game', function(s) {
		var engine = s.engine;
		
		$(s.body).attr('texture', 'gamebg');
		
		s.guy = $('<obj>',  {
			width: 32,
			height: 48,
			top: 768,
			left: 416,
			texture: 'guy',
		});
	}, this);

};

util.inherits(Game, Scene);

module.exports = Game;