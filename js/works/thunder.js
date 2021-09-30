// let img;
// function preload() {
//   img = loadImage(
//     "https://source.unsplash.com/" +
//       windowWidth +
//       "x" +
//       windowHeight +
//       "/?cloud"
//   );
// }

function setup() {
  createCanvas(windowWidth, windowHeight);
  noLoop();
}

function draw() {
  background(255);
  stroke(255, 255, 0);
  strokeWeight(6);
  translate(width / 2 + random(-300, 300), -20);
  thunder(0);
}

function thunder(depth) {
  if (depth < 10) {
    line(0, 0, 0, height / 10); // draw a line going up
    {
      translate(0, height / 10); // move the space upwards
      rotate(random(-1, 1)); // random wiggle

      if (random(1.0) < 0.1) {
        // branching
        rotate(0.3); // rotate to the right
        scale(0.5); // scale down

        push(); // now save the transform state
        thunder(depth + 1); // start a new branch!
        pop(); // go back to saved state

        rotate(-0.6); // rotate back to the left

        push(); // save state
        thunder(depth + 2); // start a second new branch
        pop(); // back to saved state
      } else {
        // no branch - continue at the same depth
        thunder(depth);
      }
    }
  }
}

function touchStarted() {
  redraw();
}
