var t;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  t = 0;
}

function draw() {
  // fade the background by giving it a low opacity
  background(5, 5);

  var x = width * noise(t);
  var y = height * noise(t + 5);
  var r = 255 * noise(t + 50);
  var g = 255 * noise(t + 25);
  var b = 255 * noise(t + 20);

  noStroke();
  fill(r + 50, g + 50, b + 50);
  circle(x, y, x - 100);
  noSmooth();
  t = t + 0.01;
}
