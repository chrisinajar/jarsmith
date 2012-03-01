var util = require('util'),
    Renderable = require('./renderable'),
    Texture = require('./texture');

var Window = function(gl, tex, width, height) {
  Renderable.call(this, gl);
  this.width = width;
  this.height = height;
  this.tex = null;
  this.tex = tex;
};

util.inherits(Window , Renderable);

Window.prototype.render = function(painter) {
  //painter.setColor(1.0,0.8,0.5);
  painter.setTexture(this.tex, false);
  painter.drawRect(0,0,1024,768);
};


module.exports = Window;