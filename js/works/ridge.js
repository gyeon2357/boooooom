function setup() {
  initializeFields();
  createCanvas(windowWidth, windowHeight + 30);
  smooth();
  background(0);
  drawMT();
}

function draw() {
  if (mouseIsPressed) {
    drawMT();
  }
}

function drawMT() {
  var r = int(random(0, 43));
  var g = int(random(0, 64));
  var b = 64;
  for (var i = 0; i < 10; i = i + 1) {
    var moving = int(random(1, 5));
    strokeWeight(moving);
    r = r - moving;
    g = g - moving;
    b = b - moving;
    r = constrain(r, 0, 255);
    g = constrain(g, 30, 255);
    b = constrain(b, 0, 255);
    stroke(r, g, b, moving + 5);
    var y = random(height / 4, height - 1);
    for (var x = 0; x < width; x = x + 1) {
      line(x, y, x, height);
      y = y + random(-1 * moving, moving);
      y = constrain(y, height / 4, height - 1);
    }
  }
  fill(255, random(0, 50));
  noStroke();
  rect(0, 0, width, height);
}

function initializeFields() {}
