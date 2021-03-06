var assert = require('assert');

var Painter = function(gl, SDL) {
  this.SDL = SDL;
  this.gl = gl;
  this.lastType = null;
  this.r = 1.0;
  this.g = 1.0;
  this.b = 1.0;
  this.a = 1.0;
  this.x = 0;
  this.y = 0;
  this.xoffset = -0;
  this.yoffset = -0;
  this.zoom = 0.0;
  this.texture = null;
  this.isInit = false;
};
Painter.plock = null;

Painter.prototype.init = function() {
  if (this.isInit) return;
  assert.equal(Painter.plock, null, 'Only one painter may be open at a time.');
  Painter.plock = this;
  var gl = this.gl;

  gl.glClear(gl.GL_COLOR_BUFFER_BIT);
  gl.glLoadIdentity();
  //gl.glTranslatef(0, 0, 0);
  gl.glTranslatef(0.375, 0.375, 0);
  //gl.glTranslatef(this.x+this.xoffset,this.y+this.yoffset,this.zoom);
  
  this.isInit = true;
};

Painter.prototype.setColor = function(r,g,b,a) {
	var gl = this.gl;
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
	if (this.lastType != null) {
		if (!a)
			gl.glColor3f(this.r,this.g,this.b);
		else
			gl.glColor4f(this.r,this.g,this.b,this.a);
	}
};

Painter.prototype.setTexture = function(tex, pos) {
	var gl = this.gl;
	if (!pos) {
		pos = [
			[ 0, 1 ],
			[ 1, 1 ],
			[ 1, 0 ],
			[ 0, 0 ],
		];
	}
	if (this.texture && this.texture.texid == tex.texture) {
		//console.log("im already using that texture");
		return;
	}
	//if (this.texture)
		//console.log("going from texture " + this.texture.texid + " to " + tex.texture);
	this.texture = {
		pos: pos,
		texid: tex.texture,
		texfn: function() {
			gl.glBindTexture(gl.GL_TEXTURE_2D, tex.texture);
			gl.glTexEnvf(gl.GL_TEXTURE_2D,gl.GL_BLEND,gl.GL_ALPHA);
		},
	};
	if (this.lastType != null) {
		gl.glEnd();
		this.lastType = null;
		this.texture.texfn();
	}
};

Painter.prototype.removeTexture = function() {
	var gl = this.gl;
	this.texture = null;
	gl.glLoadIdentity();
}

Painter.prototype.move = function(x, y) {
	if (this.x == x && this.y == y) return;
	var gl = this.gl;
	this.x = x;
	this.y = y;
	gl.glLoadIdentity();
	// Something on the internet once told me to do it this way..
	console.log("moving to " + x + " " + y);
	gl.glTranslatef(x+0.375, y+0.375, 0);
}

Painter.prototype.groupRender = function(t,f,d) {
	this.init();
	var gl = this.gl;
	if (this.lastType != t) {
		if (this.lastType != null) {
			gl.glEnd();
			gl.glLoadIdentity();
		}
		if (this.texture)
			this.texture.texfn();
			this.lastType = t;
			gl.glBegin(t);
	}
	//else
	gl.glColor3f(this.r,this.g,this.b);
	
	f(d);
}

Painter.prototype.drawRect = function(x1,y1,x2,y2,r) {
	this.init();
	var gl = this.gl,
		rot = r?r:0, // Arrr?
		width = x2-x1,
		height = y2-y1,
		hw = (width/2),
		hh = (height/2),
		x = x1+hw,
		y = y1+hh;

	gl.glPushMatrix();
		var s = this;
		gl.glTranslatef(x, y, 0);
		gl.glRotatef(rot, 0, 0, 1);
		if (this.texture)
			this.texture.texfn();
		gl.glBegin(gl.GL_QUADS);
		//*
		//console.log("burp " + x + " " + y + " " + hh);
		if (s.texture != null) gl.glTexCoord2f(s.texture.pos[0][0], s.texture.pos[0][1]);
		gl.glVertex2f(-hw, -hh, 0.0);
		
		if (s.texture != null) gl.glTexCoord2f(s.texture.pos[1][0], s.texture.pos[1][1]);
		gl.glVertex2f(+hw, -hh, 0.0);
		
		if (s.texture != null) gl.glTexCoord2f(s.texture.pos[2][0], s.texture.pos[2][1]);
		gl.glVertex2f(+hw, +hh, 0.0);
		
		if (s.texture != null) gl.glTexCoord2f(s.texture.pos[3][0], s.texture.pos[3][1]);
		gl.glVertex2f(-hw, +hh, 0.0);
		/*/
		console.log("burp " + (x-hw) + " " + (y-hh) + " " + hh);
		if (s.texture != null) gl.glTexCoord2f(s.texture.pos[0][0], s.texture.pos[0][1]);
		gl.glVertex2f(x-hw, y-hh, 0.0);
		
		if (s.texture != null) gl.glTexCoord2f(s.texture.pos[1][0], s.texture.pos[1][1]);
		gl.glVertex2f(x+hw, y-hh, 0.0);
		
		if (s.texture != null) gl.glTexCoord2f(s.texture.pos[2][0], s.texture.pos[2][1]);
		gl.glVertex2f(x+hw, y+hh, 0.0);
		
		if (s.texture != null) gl.glTexCoord2f(s.texture.pos[3][0], s.texture.pos[3][1]);
		gl.glVertex2f(x-hw, y+hh, 0.0);
		// */
		gl.glEnd();
	gl.glPopMatrix();
};

Painter.prototype.drawTriangle = function(x1,y1,x2,y2,x3,y3) {
	this.init();
	var gl = this.gl;
	this.groupRender(gl.GL_TRIANGLES, function(gl) {
		gl.glVertex2f(x1, y1, 0.0);
		gl.glVertex2f(x2, y2, 0.0);
		gl.glVertex2f(x3, y3, 0.0);
	}, gl);
};

Painter.prototype.draw = function() {
	this.init();
	var gl = this.gl;
	var SDL = this.SDL;
	if (this.lastType != null) {
		gl.glEnd();
		this.lastType = null;
	}
	SDL.GL.swapBuffers();
	Painter.plock = null;
	this.isInit = false;
	this.texture = null;
};

module.exports = Painter;