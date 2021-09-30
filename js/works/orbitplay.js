let sensitivityZoom = 0.5;
var luv = Math.floor(9 * Math.random() + 2);

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(255);
  let radius = width * 1.5;

  orbitControl();

  normalMaterial();
  translate(0, 0, -100);
  for (let i = 0; i <= 12; i++) {
    for (let j = 0; j <= 12; j++) {
      push();
      let a = (j / 12) * PI;
      let b = (i / 12) * PI;
      translate(
        sin(2 * a) * radius * sin(b),
        (cos(b) * radius) / 6,
        cos(2 * a) * radius * sin(b)
      );
      
      if (j % 2 === 0) {
        
        sphere(3);
      } else {
        rotateX(frameCount * 0.06);
        rotateY(frameCount * 0.03);
        sphere(10, luv, luv);
      }
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}