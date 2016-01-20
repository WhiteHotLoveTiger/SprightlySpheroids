/* Sprightly Spheroids main JS file. Author: Alex Keeling
    alex@keeling.me
 */

"use strict";

var DEBUG = false;

var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

// Matter.js module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies,
    Composites = Matter.Composites,
    Common = Matter.Common,
    Vertices = Matter.Vertices;

var SS = {};

var _engine,
    _sceneName = 'mixed',
    _sceneWidth,
    _sceneHeight,
    _deviceOrientationEvent;

SS.init = function() {
	window.addEventListener('deviceorientation', function(event) {
	  _deviceOrientationEvent = event;
	  SS.updateGravity(event);
	}, true);
};

SS.updateGravity = function(event) {
  if (!_engine)
    return;
  
  var orientation = window.orientation,
    gravity = _engine.world.gravity;

  if (orientation === 0) {
    gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
    gravity.y = Common.clamp(event.beta, -90, 90) / 90;
  } else if (orientation === 180) {
    gravity.x = Common.clamp(event.gamma, -90, 90) / 90;
    gravity.y = Common.clamp(-event.beta, -90, 90) / 90;
  } else if (orientation === 90) {
    gravity.x = Common.clamp(event.beta, -90, 90) / 90;
    gravity.y = Common.clamp(-event.gamma, -90, 90) / 90;
  } else if (orientation === -90) {
    gravity.x = Common.clamp(-event.beta, -90, 90) / 90;
    gravity.y = Common.clamp(event.gamma, -90, 90) / 90;
  }
};

SS.fullscreen = function(){
  var _fullscreenElement = _engine.render.canvas;
  
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) {
    if (_fullscreenElement.requestFullscreen) {
      _fullscreenElement.requestFullscreen();
    } else if (_fullscreenElement.mozRequestFullScreen) {
      _fullscreenElement.mozRequestFullScreen();
    } else if (_fullscreenElement.webkitRequestFullscreen) {
      _fullscreenElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  }
};


// create a Matter.js engine
var engine = Engine.create(document.body);

// create some balls & things
var tennisBall = Bodies.circle(500, 200, 60, {
            density: 0.0005,
            frictionAir: 0.002,
            restitution: 0.9,
            friction: 0.001,
            render: {
                sprite: {
                    texture: 'assets/img/tennis-ball_128.png',
                    //xScale: 0.1,
                    //yScale: 0.1
                }
            }
        });
var baseball = Bodies.circle(800, 200, 62, {
            density: 0.001,
            frictionAir: 0.002,
            restitution: 0.8,
            friction: 0.0005,
            render: {
                sprite: {
                    texture: 'assets/img/baseball_128.png',
                    //xScale: 0.09,
      				      //yScale: 0.09
                }
            }
        });
var heFlask = Bodies.polygon(500, 900, 3, 125, {
            density: 0.01,
            frictionAir: 0.001,
            friction: 0.1,
            restitution: 0.25,
            lighterThanAir: true,
            chamfer: {
                radius: 10
            },
            //angle: 0.52,
            render: {
                sprite: {
                    texture: 'assets/img/erlenmeyer-flask-Rotated30_225.png',
                    //xScale: 0.2,
                    //yScale: 0.22
                }
            }
    });
var arrow = Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50'),
    chevron = Vertices.fromPath('100 0 75 50 100 100 25 100 0 50 25 0'),
    star = Vertices.fromPath('50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38'),
    horseShoe = Vertices.fromPath('35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7');

var footballVertices = Vertices.fromPath('0 95 0 130 100 175 138 188 163 188 200 175 300 130 300 95 200 50 163 38 138 38 100 50');
var football = Bodies.fromVertices(200, 200, footballVertices, {
    density: 0.01,
    //frictionAir: 0.001,
    //friction: 0.1,
    restitution: 0.9,
    render: {
        sprite: {
            texture: 'assets/img/football_320.png',
            //xScale: 0.25,
            //yScale: 0.195
        }
    }
});

var boxA = Bodies.rectangle(250, 400, 40, 160, {
    isStatic: true,
    angle: d2r(-45), //-0.7853, //-45 degrees
    chamfer: {
        radius: 10
    }
});

var boxB = Bodies.rectangle(450, 400, 40, 160, {
    isStatic: true,
    angle: d2r(45), //0.7853, //45 degrees
    chamfer: {
        radius: 10
    }
});

// create the edges of our world
var ground, ceiling, leftWall, rightWall;
//if (DEBUG) {
	ground    = Bodies.rectangle( 540, 1920, 1080,   20, { isStatic: true });
	ceiling   = Bodies.rectangle( 540,    0, 1080,   20, { isStatic: true });
	leftWall  = Bodies.rectangle(   0,  960,   20, 1920, { isStatic: true });
	rightWall = Bodies.rectangle(1080,  960,   20, 1920, { isStatic: true });
/* } else {
	var halfH = height/2;
	var halfW = width/2;
	ground    = Bodies.rectangle(halfW, height, width,     20, { isStatic: true });
	ceiling   = Bodies.rectangle(halfW,      0, width,     20, { isStatic: true });
	leftWall  = Bodies.rectangle(    0,  halfH,    20, height, { isStatic: true });
	rightWall = Bodies.rectangle(width,  halfH,    20, height, { isStatic: true });
} */

// add all of the bodies to the world
World.add(engine.world, [tennisBall, baseball, heFlask, football, boxA, boxB, ground, ceiling, leftWall, rightWall]);

var renderOptions = engine.render.options;
renderOptions.background = 'assets/img/bg/brickWall3.jpg';
renderOptions.showAngleIndicator = false;
renderOptions.wireframes = false;
renderOptions.hasBounds = true;

// keep these values for testing, but switch to device height/width for release
if (DEBUG) {
	engine.render.canvas.height = 1920; 
	engine.render.canvas.width = 1080;  
	renderOptions.height = 1920;
	renderOptions.width = 1080;
} else {
	engine.render.canvas.height = height; 
	engine.render.canvas.width = width; 
	renderOptions.height = height;
	renderOptions.width = width;
}

//engine.world.bounds.max.x = 1080;
//engine.world.bounds.max.y = 1920;


engine.positionIterations = 10;
engine.velocityIterations = 10;


// run the engine
Engine.run(engine);



SS.updateScene = function() {
  //if (!_engine)
  //  return;
    
  _sceneWidth = document.documentElement.clientWidth;
  _sceneHeight = document.documentElement.clientHeight;

  var boundsMax = _engine.world.bounds.max,
      renderOptions = _engine.render.options,
      canvas = _engine.render.canvas;

  boundsMax.x = _sceneWidth;
  boundsMax.y = _sceneHeight;

  canvas.width = renderOptions.width = _sceneWidth;
  canvas.height = renderOptions.height = _sceneHeight;

  //Demo[_sceneName]();
};