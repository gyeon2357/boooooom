var s = "쉬어가는 닻    The  Resting  Anchor";
let topleft;
let topright;
let bottomright;
let bottomleft;
let n;
let over;
let percent;

function setup() {
  createCanvas(windowWidth, windowHeight);
  over = 0;
  percent = 7 / 9;
  topleft = over + width * percent;
  topright = over + topleft + height * percent;
  bottomright = over + topright + width * percent;
  bottomleft = over + bottomright + height * percent;
 yy = 0;
  n = 0;
}
let mover = 0;
let yy = 200;
let xx = 20;

function draw() {
  background(255);
  smooth();
  textSize(24);
  beginShape();
  vertex(width / 9, height / 9);
  vertex(width / 9, (height * 8) / 9);
  vertex((width * 8) / 9, (height * 8) / 9);
  vertex((width * 8) / 9, height / 9);
  endShape(CLOSE);
  let x = 0;
  let targetX = mouseY;
  let dx = targetX - x;
  x += dx * 0.7;

  let m = mover + x;
  textAlign(CENTER, BOTTOM);
  translate(width / 9 - over, height / 9);
  for (i = 0; i < s.length; i++) {
    var c = s.charAt(i);
    m = m % bottomleft;

    if (m < topleft) {
      xx = m;
      yy = n;
      push();
      translate(xx, yy);
      if (xx < 10) {
        rotate(map(xx, 0, 10, TAU * 0.75, TAU));
      } else {
        rotate(0);
      }
      text(c, 0, 0);
      pop();
      m = m + textWidth(c * 1.2);
    } else if (m <= topright) {
      xx = topleft;
      yy = m - topleft;
      push();
      translate(xx, yy - over);
      if (yy < 10) {
        rotate(map(yy, 0, 10, 0, PI / 2));
      } else {
        rotate(PI / 2);
      }
      text(c, 0, 0);
      m = m + textWidth(c * 1.2);
      pop();
    } else if (m <= bottomright) {
      yy = height * percent;
      let bottom = width * percent - (m - topright);
      xx = bottom;
      push();
      translate(xx + 2 * over, yy);
      if (xx < 10) {
        rotate(map(xx, 0, 10, (TWO_PI * 3) / 4, PI));
      } else if (xx > width * percent - 10) {
        rotate(map(xx, width * percent - 10, width * percent, PI, PI / 2));
      } else {
        rotate(PI);
      }
      text(c, 0, 0);
      m = m + textWidth(c * 1.2);
      pop();
    } else if (m <= bottomleft) {
      xx = 0;
      yy = height * percent - (m - bottomright);
      push();
      translate(xx + over, yy + over);
      rotate((TWO_PI * 3) / 4);
      text(c, 0, 0);
      m = m + textWidth(c * 1.2);
      pop();
    }

    //yy=n;
  }

  mover++;
  mover = mover % bottomleft;
}