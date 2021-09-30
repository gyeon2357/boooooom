// var s = "쉬어가는 닻    The  Resting  Anchor";
// let topleft;
// let topright;
// let bottomright;
// let bottomleft;
// let n;
// let over;
// let percent;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   over = 0;
//   percent = 7 / 9;
//   topleft = over + width * percent;
//   topright = over + topleft + height * percent;
//   bottomright = over + topright + width * percent;
//   bottomleft = over + bottomright + height * percent;
//  yy = 0;
//   n = 0;
// }
// let mover = 0;
// let yy = 200;
// let xx = 20;

// function draw() {
//   background(255);
//   smooth();
//   textSize(24);
//   beginShape();
//   vertex(width / 9, height / 9);
//   vertex(width / 9, (height * 8) / 9);
//   vertex((width * 8) / 9, (height * 8) / 9);
//   vertex((width * 8) / 9, height / 9);
//   endShape(CLOSE);
//   let x = 0;
//   let targetX = mouseY;
//   let dx = targetX - x;
//   x += dx * 0.7;

//   let m = mover + x;
//   textAlign(CENTER, BOTTOM);
//   translate(width / 9 - over, height / 9);
//   for (i = 0; i < s.length; i++) {
//     var c = s.charAt(i);
//     m = m % bottomleft;

//     if (m < topleft) {
//       xx = m;
//       yy = n;
//       push();
//       translate(xx, yy);
//       if (xx < 10) {
//         rotate(map(xx, 0, 10, TAU * 0.75, TAU));
//       } else {
//         rotate(0);
//       }
//       text(c, 0, 0);
//       pop();
//       m = m + textWidth(c * 1.2);
//     } else if (m <= topright) {
//       xx = topleft;
//       yy = m - topleft;
//       push();
//       translate(xx, yy - over);
//       if (yy < 10) {
//         rotate(map(yy, 0, 10, 0, PI / 2));
//       } else {
//         rotate(PI / 2);
//       }
//       text(c, 0, 0);
//       m = m + textWidth(c * 1.2);
//       pop();
//     } else if (m <= bottomright) {
//       yy = height * percent;
//       let bottom = width * percent - (m - topright);
//       xx = bottom;
//       push();
//       translate(xx + 2 * over, yy);
//       if (xx < 10) {
//         rotate(map(xx, 0, 10, (TWO_PI * 3) / 4, PI));
//       } else if (xx > width * percent - 10) {
//         rotate(map(xx, width * percent - 10, width * percent, PI, PI / 2));
//       } else {
//         rotate(PI);
//       }
//       text(c, 0, 0);
//       m = m + textWidth(c * 1.2);
//       pop();
//     } else if (m <= bottomleft) {
//       xx = 0;
//       yy = height * percent - (m - bottomright);
//       push();
//       translate(xx + over, yy + over);
//       rotate((TWO_PI * 3) / 4);
//       text(c, 0, 0);
//       m = m + textWidth(c * 1.2);
//       pop();
//     }

//     //yy=n;
//   }

//   mover++;
//   mover = mover % bottomleft;
// }



var lvi = Math.floor(5 * Math.random() + 1);
var luv = Math.floor(150 * Math.random() + 100);
var lve = Math.floor(250 * Math.random() + 150);
const nbEllipses = 11;
(smallestDiameter = 150),
  (diameterIncrement = 25),
  (controlPointOffset = 10);
var x = 0,
  y = 0,
  angleMeter = [],
  positionHistory = [];

function setup() {
  for (
    createCanvas(windowWidth, windowHeight + 128), noStroke(), smooth();
    positionHistory.length < 2 * nbEllipses;

  )
    positionHistory.push([0, 0, 0]);
  (angleMeter = new AngleMeter(smallestDiameter / 30)),
    (x = positionHistory[0][0]),
    (y = positionHistory[0][1]);
}
function draw() {
  positionHistory.pop(),
    (x = 0.6 * x + 0.4 * mouseX),
    (y = 0.6 * y + 0.4 * mouseY),
    angleMeter.drag(x, y),
    positionHistory.unshift([x, y, angleMeter.angle]),
    drawEllipses();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function drawEllipses() {
  for (var e = 0; e < nbEllipses; e++) {
    var t = 2 * (nbEllipses - 1 - e);
    drawEllipse(
      positionHistory[t],
      smallestDiameter + diameterIncrement * (nbEllipses - 1 - e),
      e % 6 == 3 ? 255 : 75
    );
  }
}
function drawEllipse(e, t, fillcolor) {
  fill(250, 250, t - 30),
    push(),
    translate(e[0], e[1]),
    rotate(e[2]),
    stroke(255, 80, 0),
    strokeWeight(0.03),
    ellipse(-controlPointOffset, 0, t, 0.75 * t),
    pop();
}
class AngleMeter {
  constructor(distance) {
    this.angle = 0;
    this.draggedPoint = [0, 0];
    this.distance = distance;
  }
  drag(x, y) {
    const dx = x - this.draggedPoint[0];
    const dy = y - this.draggedPoint[1];
    this.angle = Math.atan2(dy, dx);
    this.draggedPoint[0] = x - Math.sin(this.angle) * this.distance;
    this.draggedPoint[1] = y - Math.sin(this.angle) * this.distance;
  }
}
