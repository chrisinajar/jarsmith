var util = require('util'),
    Renderable = require('./renderable'),
    Texture = require('./texture');

var Square = (function(gl, tex, width, height) {
  Renderable.call(this, gl);
  this.width = width;
  this.height = height;
  this.tex = tex;
});

util.inherits(Square , Renderable);



module.exports = Square;