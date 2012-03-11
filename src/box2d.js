var util = require('util'),
    Scene = require('./scene'),
    b2d = require('box2d');

var $;

var Box2d = function(engine, events) {
	Scene.apply(this, [engine, events]);
	
	engine.loadResources('game', function(s) {
		// Define world
		var worldAABB = new b2d.b2AABB();
		worldAABB.lowerBound.Set(-100.0, -100.0);
		worldAABB.upperBound.Set(100.0, 100.0);

		var gravity = new b2d.b2Vec2(0.0, -10.0);
		var doSleep = true;

		var world = new b2d.b2World(worldAABB, gravity, doSleep);

		// Ground Box
		var groundBodyDef = new b2d.b2BodyDef();
		groundBodyDef.position.Set(0.0, -10.0);

		var groundBody = world.CreateBody(groundBodyDef);

		var groundShapeDef = new b2d.b2PolygonDef();
		groundShapeDef.SetAsBox(50.0, 10.0);

		groundBody.CreateShape(groundShapeDef);

		// Dynamic Body
		var bodyDef = new b2d.b2BodyDef();
		bodyDef.position.Set(0.0, 4.0);

		var body = world.CreateBody(bodyDef);

		var shapeDef = new b2d.b2PolygonDef();
		shapeDef.SetAsBox(1.0, 1.0);
		shapeDef.density = 1.0;
		shapeDef.friction = 0.3;
		body.CreateShape(shapeDef);
		body.SetMassFromShapes();

		// Run Simulation!
		var iterations = 10,
		    interval = 10,
			i = 0;

		setInterval(function() {
			world.Step(interval, iterations);
			var position = body.GetPosition();
			var angle = body.GetAngle();
			util.puts((++i)+": <"+position.x+", "+position.y+"> @"+angle);
		}, interval);
	}, this);

};

util.inherits(Box2d, Scene);

module.exports = Box2d;

