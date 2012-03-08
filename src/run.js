var Engine = require('./engine');
    
var width = 1024,
    height = 768;

var engine = new Engine(width, height);

engine.show();
engine.loadScene('mainmenu');


