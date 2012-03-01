var resources = requires('../resources');

var MainMenu = function(engine) {
  this.engine = engine;
  engine.loadResources('menu', function(s) {
    var engine = s.engine;
  }, this);
};

