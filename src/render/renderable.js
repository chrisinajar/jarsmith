var util = require('util');

var Renderable = function(gl) {
  this.gl = gl;
  this.width = 0;
  this.height = 0;
  this.x = 0;
  this.y = 0;
  this.ready = true;
};
// render yo self
Renderable.prototype.doRender = function(painter) {
  this.ready = false;
  this.render(painter, function(s) {
    s.ready = true;
  }, this);
};
// rect area that you render over
Renderable.prototype.width = function() { return this.width; };
Renderable.prototype.height = function() { return this.height; };
Renderable.prototype.setWidth = function(val) { return this.width = val; };
Renderable.prototype.setHeight = function(val) { return this.height = val; };
// colors and textures
Renderable.prototype.setColor = function(r,g,b,a) {
  if (!r || !g || !b)
    return this.colors = null;
  if (!a)
    a = 1.0;
  return this.colors = {r:r,g:g,b:b,a:a};
};

Renderable.prototype.colors = function() {
  return this.colors;
};

// position, top left corner of rect
Renderable.prototype.x = function() { return this.x; };
Renderable.prototype.y = function() { return this.y; };

Renderable.prototype.begin = function(t, f, d) {
  this.gl.glBegin(t);
  f(d);
  gl.glEnd();
}

module.exports = Renderable;