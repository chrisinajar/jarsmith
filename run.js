var readline = require('readline'),
    util = require('util'),
    gl = require('../node-ogl/lib/OpenGL'),
    Engine = require('./engine').Engine;
    //v8p = require('v8-profiler');
    
var width = 1024,
    height = 768;
    
var engine = new Engine(gl, width, height);

setTimeout(function() {
  engine.show();
},0);

rl = readline.createInterface(process.stdin, process.stdout);
rl.setPrompt('> ', 2);
//rl.on('line', jar.onCommand);
//rl.on('close', jar.unload);
rl.prompt();

process.on('exit', function () {
  console.log('Whatever');
});

/*
setTimeout(function render() {
  gl.glClear(gl.GL_COLOR_BUFFER_BIT | gl.GL_DEPTH_BUFFER_BIT);
  gl.glLoadIdentity();

  gl.glTranslatef(-1.5,0.0,-6.0);
  gl.glRotatef(rtri,0.0,1.0,0.0);
  gl.glBegin(gl.GL_TRIANGLES);						// Drawing Using Triangles
    gl.glColor3f(1.0,0.0,0.0);
    gl.glVertex3f( 0.0, 1.0, 0.0);				// Top
    gl.glColor3f(0.0,1.0,0.0);
    gl.glVertex3f(-1.0,-1.0, 0.0);				// Bottom Left
    gl.glColor3f(0.0,0.0,1.0);
    gl.glVertex3f( 1.0,-1.0, 0.0);				// Bottom Right
  gl.glEnd();

  gl.glLoadIdentity();
  gl.glTranslatef(1.5,0.0,-6.0);
  gl.glRotatef(rquad,1.0,0.0,0.0);
	gl.glColor3f(0.5,0.5,1.0);				// Set The Color To Blue One Time Only
	gl.glBegin(gl.GL_QUADS);					// Start Drawing Quads
		gl.glVertex3f(-1.0, 1.0, 0.0);			// Left And Up 1 Unit (Top Left)
		gl.glVertex3f( 1.0, 1.0, 0.0);			// Right And Up 1 Unit (Top Right)
		gl.glVertex3f( 1.0,-1.0, 0.0);			// Right And Down One Unit (Bottom Right)
		gl.glVertex3f(-1.0,-1.0, 0.0);			// Left And Down One Unit (Bottom Left)
	gl.glEnd();

  gl.SwapBuffers();
  rtri+=0.25;
  rquad-=0.15;
  setTimeout(render, 10);
}, 0);

*/
