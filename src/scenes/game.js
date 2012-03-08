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
		
		var put = function() {
			var an = function() {
				$(this).animate({
					top: this.getAttribute('top') + Math.random()*50-25,
					left: this.getAttribute('left') + Math.random()*50-25
				}, Math.random()*200+50, an);
			};
			var obj = $('<obj>',  {
				width: 32,
				height: 48,
				left: Math.random()*1024,
				top: Math.random()*768,
				texture: 'guy',
			});
			obj.animate({
					width: 48,
					height: 72
				}, 100,"swing",an)
				.animate({
					width: 32,
					height: 48,
					top: obj.attr('top') + Math.random()*400-200,
					left: obj.attr('left') + Math.random()*400-200
				}, 1000)
				.appendTo($('body'));
		};
		setInterval(put, 0);
	}, this);

};

util.inherits(Game, Scene);

module.exports = Game;