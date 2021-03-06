var nQuery = require('./nquery/nquery'),
    Window = require('./render/window'),
    Painter = require('./render/painter'),
    Texture = require('./render/texture'),
    SDL = require('../../node-sdl/sdl'),
    gl = require('../../node-ogl/lib/OpenGL'),
    resources = {};


var time = function() {
	return time.t;
};
time.t = (new Date()).getTime();
setInterval(function() {
	time.t++;
}, 1);
setInterval(function() {
	time.t = (new Date()).getTime();
}, 500);


var Engine = function(width, height, r) {
	var self = this;
	this.root = r+'/';
	resources = require(this.root+'resources');
	this.p = new Painter(gl, SDL);
	this.width = width;
	this.height = height;
	this.gl = gl;
	this.x = 0;
	this.y = 0;
	this.lastTick = 0;
	this.shown = false;
	this.frame = 0;
	this.frameLimit = 500;
	this.textures = {};
}

Engine.prototype.loadResources = function(r, callback, d) {
	var gl = this.gl;
	var res = resources[r];
	var c = 1;
	
	if (!this.textures[r])
		this.textures[r] = {};
	
	for (var obj in res) {
		if (this.textures[r][res])
			continue;
		c++;
		
		var k = (function(key, name) {
			console.log("Loading " + key);
			var tex = new Texture(gl);
			tex.loadFile('./img/' + name, function(tex, self) {
				self.textures[key] = tex;
				console.log("Finished " + key);
				c--;
				if (c == 0 && callback)
					callback(d);
			}, this);
		});
		
		if (typeof res[obj] == "string") {
			k.apply(this, [obj, res[obj]]);
		} else {
			c += res[obj].max-1;
			for (var i = 1; i <= res[obj].max; ++i)
			k.apply(this, [obj+i, res[obj].img.replace('#',i)]);
		}
	}
	c--;
	if (c == 0 && callback)
		callback(d);
};
Engine.prototype.loadScene = function(name) {
	if (!this.nquery) { // initlialize nquery
		this.nquery = (new nQuery(this));
	}
	var $ = this.nquery.$;
	if (this.scene) {
		console.log("Cleaning up old scene");
		this.scene.body.remove();
		this.scene = null;
	}
	var T = require(this.root+name);
	this.scene = new T(this, SDL.events);
};
Engine.prototype.show = function() {
	if (this.shown)
		return;
	else
		this.shown = true;
		
	var gl = this.gl,
	    width = this.width,
	    height = this.height,
	    self = this;
  
	console.log("Initializing SDL window");
	SDL.init( SDL.INIT.VIDEO );
	SDL.GL.setAttribute( SDL.GL.RED_SIZE, 5 );
	SDL.GL.setAttribute( SDL.GL.GREEN_SIZE, 5 );
	SDL.GL.setAttribute( SDL.GL.BLUE_SIZE, 5 );
	SDL.GL.setAttribute( SDL.GL.DEPTH_SIZE, 24 );
	SDL.GL.setAttribute( SDL.GL.DOUBLEBUFFER, 1 );
	SDL.setVideoMode( width, height, 32, SDL.SURFACE.HWSURFACE | SDL.SURFACE.ASYNCBLIT | SDL.SURFACE.DOUBLEBUF | SDL.SURFACE.OPENGL );

	console.log("Initializing GL");
	
	gl.glClearColor(0.79, 0.73, 0.68, 1.0);
	gl.glShadeModel(gl.GL_SMOOTH);
	gl.glEnable(gl.GL_TEXTURE_2D);
	gl.glEnable (gl.GL_BLEND);
	gl.glDisable(gl.GL_DEPTH_TEST);
	gl.glBlendFunc (gl.GL_SRC_ALPHA, gl.GL_ONE_MINUS_SRC_ALPHA);
	
	gl.glMatrixMode(gl.GL_PROJECTION);
	gl.glLoadIdentity();
	gl.glOrtho (0, width, height, 0, 0, 1);
	gl.glMatrixMode(gl.GL_MODELVIEW);
	
	gl.glFlush();
    
	console.log("Done");
	setInterval(function(){self.render.apply(self);},1000/self.frameLimit);
};

Engine.prototype.render = function() {
	var now = time();
	
	// gl stuff has to be synchronous
	this.p.init();
	if (this.scene)
		this.scene.body.render(this.p);
	this.p.draw();
	this.lastTick = time();
};

Engine.prototype.width = function() { return this.width; };
Engine.prototype.height = function() { return this.height; };

Engine.prototype.x = function() { return this.x; }; // wait..
Engine.prototype.y = function() { return this.y; };

module.exports = Engine;
