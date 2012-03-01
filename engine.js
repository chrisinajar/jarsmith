var Window = require('./render/window'),
    Painter = require('./render/painter'),
    Texture = require('./render/texture').
    resources = require('./resources');


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


var Engine = function(gl, width, height) {
  var self = this;
  this.p = new Painter(gl);
  this.width = width;
  this.height = height;
  this.gl = gl;
  this.x = 0;
  this.y = 0;
  this.lastTick = 0;
  this.shown = false;
  this.frameLimit = 3;
  this.renderable = [];
  this.textures = {};
}

Engine.prototype.loadResources = function(r, c, d) {
  var res = resources[r];
  var c = 1;
  
  if (!this.textures[r])
    this.textures[r] = {};
  
  for (var obj in res) {
    if (this.textures[r][res])
      continue;
    c++;
    console.log("Loading " + obj);
    
    var tex = new Texture(gl);
    tex.loadFile('./img/' + res[obj], function(tex, self) {
      c--;
      if (c == 0)
	c(d);
    }, this);
  }
  c--;
  if (c == 0)
    c(d);
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
  
  console.log("Initializing GL window");
      
  gl.OpenWindow(width,height,0,0,0,0,0,0,0);

  
    
    gl.glShadeModel(gl.GL_SMOOTH);
    gl.glClearColor(0.0, 1.0, 0.0, 0.0);
    //gl.glClearDepth(1.0);
    //gl.glEnable(gl.GL_DEPTH_TEST);
    gl.glEnable(gl.GL_TEXTURE_2D);
    //gl.glDepthFunc(gl.GL_LEQUAL);
    //gl.glViewport(0,0,width,height);
    //gl.glHint(gl.GL_PERSPECTIVE_CORRECTION_HINT, gl.GL_NICEST);
    gl.glMatrixMode(gl.GL_PROJECTION);
    gl.glLoadIdentity();
    //gl.gluPerspective(45.0, width / height, 0.1, 100.0);
    gl.glOrtho (0, width, height, 0, 0, 1);
    gl.glDisable(gl.GL_DEPTH_TEST);
    gl.glMatrixMode(gl.GL_MODELVIEW);
    gl.glFlush();
    
    console.log("Done");
    self.render();
    setInterval(function(){self.render.apply(self);},1000/self.frameLimit);
  }, this);
};

Engine.prototype.render = function() {
  var now = time();
  for (var i=0,l=this.renderable.length;i<l;++i) {
    this.renderable[i].doRender(this.p);
  }
  this.p.draw();
  this.lastTick = time();
};

Engine.prototype.width = function() { return this.width; };
Engine.prototype.height = function() { return this.height; };

Engine.prototype.x = function() { return this.x; };
Engine.prototype.y = function() { return this.y; };


module.exports = {
  Engine: Engine,
};