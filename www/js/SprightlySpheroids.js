/* Sprightly Spheroids main JS file. Author: Alex Keeling
    alex@keeling.me
 */

"use strict";

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

// create a Matter.js engine
var engine = Engine.create(document.body);

// create some balls & things
var tennisBall = Bodies.circle(400, 200, 24, {
            density: 0.0005,
            frictionAir: 0.002,
            restitution: 0.9,
            friction: 0.001,
            render: {
                sprite: {
                    texture: 'assets/img/tennis-ball.png',
                    xScale: 0.04,
                    yScale: 0.04
                }
            }
        });
var baseball = Bodies.circle(400, 150, 25, {
            density: 0.001,
            frictionAir: 0.002,
            restitution: 0.8,
            friction: 0.0005,
            render: {
                sprite: {
                    texture: 'assets/img/baseball.png',
                    xScale: 0.039,
      				yScale: 0.039
                }
            }
        });
var heFlask = Bodies.polygon(425, 500, 3, 50, {
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
                    texture: 'assets/img/erlenmeyer-flask-Rotated30.png',
                    xScale: 0.08,
                    yScale: 0.09
                }
            }
    });
var arrow = Vertices.fromPath('40 0 40 20 100 20 100 80 40 80 40 100 0 50'),
    chevron = Vertices.fromPath('100 0 75 50 100 100 25 100 0 50 25 0'),
    star = Vertices.fromPath('50 0 63 38 100 38 69 59 82 100 50 75 18 100 31 59 0 38 37 38'),
    horseShoe = Vertices.fromPath('35 7 19 17 14 38 14 58 25 79 45 85 65 84 65 66 46 67 34 59 30 44 33 29 45 23 66 23 66 7 53 7');

var footballVertices = Vertices.fromPath('0 38 0 52 40 70 55 75 65 75 80 70 120 52 120 38 80 20 65 15 55 15 40 20');
var football = Bodies.fromVertices(425, 200, footballVertices, {
    density: 0.01,
    //frictionAir: 0.001,
    //friction: 0.1,
    restitution: 0.9,
    render: {
        sprite: {
            texture: 'assets/img/football.png',
            xScale: 0.1,
            yScale: 0.078
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
var ground    = Bodies.rectangle(400, 600, 1000,  20, { isStatic: true });
var ceiling   = Bodies.rectangle(400,   0, 1000,  20, { isStatic: true });
var leftWall  = Bodies.rectangle(  0, 300,   20, 800, { isStatic: true });
var rightWall = Bodies.rectangle(800, 300,   20, 800, { isStatic: true });

// add all of the bodies to the world
World.add(engine.world, [tennisBall, baseball, heFlask, football, boxA, boxB, ground, ceiling, leftWall, rightWall]);

var renderOptions = engine.render.options;
renderOptions.background = 'assets/img/bg/brickWall3.jpg';
renderOptions.showAngleIndicator = false;
renderOptions.wireframes = false;
renderOptions.hasBounds = true;
//renderOptions.height = 330; //height;
//renderOptions.width = 440; //width;


// run the engine
Engine.run(engine);