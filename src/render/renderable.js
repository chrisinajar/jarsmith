var util = require('util');

var Renderable = function(engine) {
  this.engine = engine;
  this.width = 0;
  this.height = 0;
  this.x = 0;
  this.y = 0;
  this.ready = true;
  this.tex = null;
  this.shown = false;
};

Renderable.prototype.show = function() {
  this.shown = true;
};

Renderable.prototype.hide = function() {
  this.shown = false;
};

// render yo self
Renderable.prototype.doRender = function(painter) {
  if (!this.shown)
    return;
  if (this.width*this.height == 0)
    return;
  this.ready = false;
  this.render(painter, function(s) {
    s.ready = true;
  }, this);
};
Renderable.prototype.render = function(painter, c, d) {
  //painter.setColor(1.0,0.8,0.5);
  if (this.tex && this.engine.textures[this.tex])
    painter.setTexture(this.engine.textures[this.tex], false);
  
  painter.drawRect(this.x, this.y, this.x + this.width, this.y + this.height);
  c(d);
};
Renderable.prototype.texture = function() { return this.tex; };
Renderable.prototype.setTexture = function(tex) { return this.tex = tex; };
// rect area that you render over
Renderable.prototype.width = function() { return this.width; };
Renderable.prototype.height = function() { return this.height; };
Renderable.prototype.setWidth = function(val) { return this.width = parseFloat(val); };
Renderable.prototype.setHeight = function(val) { return this.height = parseFloat(val); };
// colors and textures
Renderable.prototype.setColor = function(r,g,b,a) {
  if (!r || !g || !b)
    return this.colors = null;
  if (!a)
    a = 1.0;
  return this.colors = {r:r,g:g,b:b,a:a};
};
Renderable.prototype.colors = function() { return this.colors; };

// position, top left corner of rect
Renderable.prototype.x = function() { return this.x; };
Renderable.prototype.y = function() { return this.y; };

Renderable.prototype.setX = function(x) { return this.x = parseFloat(x); };
Renderable.prototype.setY = function(y) { return this.y = parseFloat(y); };

module.exports = Renderable;