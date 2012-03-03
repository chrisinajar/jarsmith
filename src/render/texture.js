// 98.91
// 844.68
var util = require('util'),
    fs = require('fs'),
    Buffer = require('buffer').Buffer,
    assert = require('assert');

var Texture = function(gl) {
  this.gl = gl;
  this.width= 0;
  this.height = 0;
  this.size = this.width * this.height * 3;
  this.texture = 1;
};

Texture.prototype.loadFile = function(file, c, d) {
  var gl = this.gl;
  var self = this;
  this.width= 0;
  this.height = 0;
  var textureBuffer = fs.readFile(file, function (err, data) {
    console.log(err);
    (function (err, data) {
      console.log("Loading");
      var gl = this.gl;
      var head = data.slice(14, data[10]);
      this.width += head[4] << (8*0);
      this.width += head[5] << (8*1);
      this.width += head[6] << (8*2);
      this.width += head[7] << (8*3);
      
      this.height += head[8] << (8*0);
      this.height += head[9] << (8*1);
      this.height += head[10] << (8*2);
      this.height += head[11] << (8*3);
      
      assert.equal(head.length, 40, "Wtf is this?");
      assert.equal(head[14], 32, "Wtf is this?");
      
      console.log('img is ' + this.width + 'x' + this.height);
      console.log(this.width*this.height*4 + " " + (data.length - data[10]) + " " + data.slice(data[10], data.length).length);
      //console.log("data starts at " + data[10] + " " + data.length + " " + (data.length - data[10]) + " " + data.slice(data[10], data.length).length);
      this.buffer = data.slice(data[10], data.length);

      assert.equal(this.buffer.length, this.width*this.height*4);
      // reverse all of the colors. (bgr -> rgb)
      for (var i=0,l=this.buffer.length;i<l;i+=4) {
	var temp = [this.buffer[i+3], this.buffer[i], this.buffer[i+1], this.buffer[i+2]];
	this.buffer[i] = temp[3];  //r
	this.buffer[i+1] = temp[2];//g
	this.buffer[i+2] = temp[1];//b
	this.buffer[i+3] = temp[0];//a
	//console.log(this.buffer[i] + ',' + this.buffer[i+1] + ',' + this.buffer[i+2]);
      }
      console.log("Bits reversed " + this.buffer.length);

      this.texture = gl.glGenTextures(1);
      gl.glBindTexture(gl.GL_TEXTURE_2D, this.texture);

      gl.glTexParameteri(gl.GL_TEXTURE_2D,gl.GL_TEXTURE_MIN_FILTER,gl.GL_LINEAR);

      gl.glTexImage2D(gl.GL_TEXTURE_2D,         // 2d texture
		      0,                     // level of detail 0 (normal)
		      gl.GL_RGBA,           // Isn't this just like below?
		      this.width,           // x size from image
		      this.height,          // y size from image
		      0,                     // border 0 (normal)
		      gl.GL_RGBA,             // rgba color data
		      gl.GL_UNSIGNED_BYTE,   // unsigned byte data
		      this.buffer);         // the actual data
      console.log(this.texture);
    }).apply(self, [err, data]);
    c(self, d);
  });
};

Texture.prototype.getTexture = function() {
  return this.texture;
};


module.exports = Texture;
