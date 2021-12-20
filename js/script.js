
var num;

var magnitude;

var mouse;

function setup() {
    initializeFields();
    createCanvas(windowWidth, windowHeight);
    mouse = createVector(width / 2, height / 2);
    magnitude = createVector(width, height);
    frameRate(12);
    noStroke();
    smooth();
    background(255);
}

function draw() {
    makeSaturatedLine(mouse);
}

function mouseMoved() {
    mouse.set(mouseX, mouseY, 0);
}

function makeSaturatedLine(mouse) {
    fill(255);
    rect(0, 0, width, height);
    num = random(150, 255);
    var center = mouse;
    push();
    translate(center.x, center.y);
    var rad = TWO_PI / num;
    for (var i = 0; i < TWO_PI; i += random(rad - 0.02, rad + 0.02)) {
        var outside = createVector(cos(i), sin(i));
        var seed = random(100, 700);
        var inside = createVector(cos(i) * seed, sin(i) * seed);
        outside.mult(magnitude.mag());
        var outsideNoiseA = createVector(random(-5, 10), random(-5, 10));
        var outsideNoiseB = createVector(random(-10, 5), random(-10, 5));
        fill(0);
        triangle(inside.x, inside.y, outside.x + outsideNoiseA.x, outside.y + outsideNoiseA.y, outside.x + outsideNoiseB.x, outside.y + outsideNoiseB.y);
    }
    pop();
}

function initializeFields() {
    num = 0;
    magnitude = null;
    mouse = null;
}

