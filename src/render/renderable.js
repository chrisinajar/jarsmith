var util = require('util');

var Renderable = function(engine) {
	this.engine = engine;
	this.attr = {
		width: 0,
		height: 0,
		x: 0,
		y: 0,
		rotation: 0,
		texture: '',
		color: {
			r: 1.0,
			g: 1.0,
			b: 1.0,
			a: 1.0,
		},
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
	return (this.attr.color.a ? this.attr.color.a : 1.0);
};

Renderable.prototype.setOpacity = function(val) {
	return this.attr.color.a = parseFloat(val);
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
	if (this.attr.color && this.engine.textures[this.attr.texture]) {
		var color = this.attr.color;
		painter.setColor(color.r, color.g, color.b, color.a);
	}
	if (this.attr.texture && this.engine.textures[this.attr.texture])
		painter.setTexture(this.engine.textures[this.attr.texture], false);
	
	painter.drawRect(this.attr.x, this.attr.y, this.attr.x + this.attr.width, this.attr.y + this.attr.height, this.attr.rotation);
	c(d);
};
// Generate getters and setters
(function(){
	var ar = {
		'Width': 'float',
		'Height': 'float',
		'Texture': 'string',
		'Color': 'object',
		'X': 'float',
		'Y': 'float',
		'Rotation': 'float',
	};
	
	// Instructions on how to properly cast variables. Yeah.... js....
	var casts = {
		'float': parseFloat,
		'int': parseInt,
		'string': function(v){return v.toString()},
	};
	
	for (var i in ar) {
		var cast = function(val){return val;}; // This is the basic caster, we use this if all else fails
		if (ar[i] in casts)
			cast = casts[ar[i]];

		(function(name, type, cast) {
			Renderable.prototype[type] = (function() { 
				return this.attr[type];
			});
			Renderable.prototype['set'+name] = (function(val) { 
				return this.attr[type] = cast(val);
			});
		})(i, i.toLowerCase(), cast);
	}
})();

module.exports = Renderable;