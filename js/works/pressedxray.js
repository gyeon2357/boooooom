var squareSize = 3;
var noiseScale = 1.2;
var z = 0;
var canvasSize = 0;
var x = 0;
var y = 0;
var blockMode = false;

function setup() {
  background(255);
  canvasSize = windowHeight + windowWidth;
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 1.5);
  //colorMode(RGB, 1)
  frameRate(50);
  noiseDetail(32, 0.36);
  // noLoop()
  var seed = 524123.0251370653;
  noiseSeed(seed);
  print(seed);
}

function draw() {
  for (var n = 0; n < canvasSize; n++) {
    var a = noise((y * noiseScale) / 100, ((x + n) * noiseScale) / 100);
    // a = 1-a
    //print(a)
    if (blockMode) {
      if (a <= 0.7) {
        stroke(0);
        fill(0);
      } else {
        stroke(1);
        fill(1);
      }
    } else {
      stroke(a, 100, 1);
      fill(a, 1, 1);
    }
    rect(x + n, y, 30, squareSize);
  }
  y += squareSize;
  if (y > canvasSize) y = 0;
}

function touchStarted() {
  clear();
  x = 0;
  y = 0;
  var seed = random(0, 5000);
  noiseSeed(seed);
  print(seed);
  return false;
}
