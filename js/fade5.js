function setup() {
  createCanvas(windowWidth, windowHeight);
	frameRate(24);
}

window.onload = function () {
  var clock = document.getElementById("clock");
  function pad(num, size) {
    num = String(num);

    return new Array(size + 1 - num.length).join("0") + num;
  }

  function displayTime() {
    var now = new Date();

    clock.innerText = "2021." + "12" + "." + pad(now.getDate(), 2) + " " +
      pad(now.getHours(), 2) +
      ":" +
      pad(now.getMinutes(), 2) +
      ":" +
      pad(now.getSeconds(), 2);
  }
  setInterval(displayTime, 10);
};


//

var balls = [];

function draw() {
  background(255, 0);
  for (var i = 0; i < balls.length; i++) {
    balls[i].update();
    balls[i].render();
  }
  for (var j = balls.length - 1; j >= 0; j--) {
    if(balls[j].alive == false) {
      balls.splice(j,1);
    }
  }
}

function mouseMoved() {
  for (var i = 0; i < 20; i++) {
    var ball = new Ball(mouseX, mouseY, 10);
    balls.push(ball);
  }
}

function Ball(xpos, ypos, ballSize) {
  this.pos = createVector(xpos, ypos);
  this.vel = p5.Vector.random2D();
  this.vel.setMag(random(1, 100));
  this.size = ballSize;
  this.alive = true;
  this.c = color(random(0));
  this.update = function() {
    this.pos.add(this.vel);
    if (this.pos.x <= 15) {
      this.c = color(random(0));
      this.alive = false;
    }
    if (this.pos.x >= width - this.size * 0.5) {
      this.c = color(random(0));
      this.alive = false;
    }
    if (this.pos.y <= 15) {
      this.c = color(random(0));
      this.alive = false;
    }
    if (this.pos.y >= height - this.size * 0.5) {
      this.c = color(random(255));
      this.alive = false;
    }
  }
  
  this.render = function() {
    fill(this.c);
    noStroke();
    rect(this.pos.x, this.pos.y, this.size);
  }
}
