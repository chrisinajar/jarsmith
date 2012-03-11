var Jarsmith = require('../jarsmith'),
    Engine = Jarsmith.Engine;

var width = 1024,
    height = 768;

var engine = new Engine(width, height, __dirname);

engine.show();
engine.loadScene('mainmenu');


