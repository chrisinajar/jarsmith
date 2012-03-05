var util = require('util'),
    Scene = require('./scene');

var $;

var Game = function(engine, events) {
  Scene.apply(this, [engine, events]);
  $ = this.$;
  engine.loadResources('game', function(s) {
    var engine = s.engine;
    
    $(s.body).attr('texture', 'gamebg');
  }, this);
  
};

util.inherits(Game, Scene);

module.exports = Game;