var util = require('util');

var Renderable = function(engine) {
	this.engine = engine;
	this.attr = {
		width: 0,
		height: 0,
		x: 0,
		y: 0,
		texture: '',
	};
	this.ready = true;
	this.shown = false;
};

Renderable.prototype.show = function() {
  this.shown = true;
};

Renderable.prototype.hide = function() {
  this.shown = false;
};

Renderable.prototype.opacity = function() {
	
};

Renderable.prototype.setOpacity = function(val) {
	
};

// render yo self
Renderable.prototype.doRender = function(painter) {
  if (!this.shown)
    return;
  if (this.attr.width*this.attr.height == 0)
    return;
  this.ready = false;
  this.render(painter, function(s) {
    s.ready = true;
  }, this);
};
Renderable.prototype.render = function(painter, c, d) {
  //painter.setColor(1.0,0.8,0.5);
  if (this.attr.color && this.engine.textures[this.attr.texture])
    painter.setColor();
  if (this.attr.texture && this.engine.textures[this.attr.texture])
    painter.setTexture(this.engine.textures[this.attr.texture], false);
  
  painter.drawRect(this.attr.x, this.attr.y, this.attr.x + this.attr.width, this.attr.y + this.attr.height);
  c(d);
};
// Generate getters and setters
(function(){
	var ar = [
		'Width',
		'Height',
		'Texture',
		'Color',
		'X',
		'Y',
 	];
	var casts = {
		'number': parseFloat,
		'string': function toString(v){return v.toString()},
	};
	for (var i = 0; i < ar.length; ++i) {
		var cast = function(val){return val;},
		    v = {width: 0,height: 0,x: 0,y: 0,texture: '',color:{}}[ar[i].toLowerCase()];
		if ((typeof v) in casts)
			cast = casts[(typeof v)];

		(function(name, type, cast) {
			Renderable.prototype[type] = (function() { 
				return this.attr[type];
			});
			Renderable.prototype['set'+name] = (function(val) { 
				return this.attr[type] = cast(val);
			});
		})(ar[i], ar[i].toLowerCase(), cast);
	}
})();

module.exports = Renderable;