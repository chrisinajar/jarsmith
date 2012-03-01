var util = require('util');

var Renderable = function(gl) {
  this.gl = gl;
  this.width = 0;
  this.height = 0;
  this.x = 0;
  this.y = 0;
  this.ready = true;
};
// render yourself
Renderable.prototype.doRender = function(painter) {
  this.ready = false;
  this.render(painter);
  this.ready = true;
};
// rect area that you render over
Renderable.prototype.width = function() { return this.width; };
Renderable.prototype.height = function() { return this.height; };
// position, top left corner of rect
Renderable.prototype.x = function() { return this.x; };
Renderable.prototype.y = function() { return this.y; };

Renderable.prototype.begin = function(t, f, d) {
  this.gl.glBegin(t);
  f(d);
  gl.glEnd();
}

module.exports = Renderable;