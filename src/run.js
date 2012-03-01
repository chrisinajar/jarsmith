var readline = require('readline'),
    util = require('util'),
    gl = require('../node-ogl/lib/OpenGL'),
    Engine = require('./engine').Engine,
    nQuery = require('./nquery/nquery');
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

var $ = (new nQuery()).$;

$(function() {
  console.log('it worked');
});

$('<obj>', {
  width: '10px',
  height: '40px',
  id: 'something',
});