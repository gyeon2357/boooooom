
function setup() {
  frameRate(1);
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



var p = [];

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
}

function mouseMoved() {
	for (i = 0; i < 50; i++) {
		p.push(new Particle);
	}
}

function draw() {

	for (i = 0; i < p.length; i++) {
		p[i].show();
		p[i].move();
	}
}

class Particle {
	constructor() {
		this.x = mouseX;
		this.xSpeed = random(-5, 5);
		this.y = mouseY;
		this.ySpeed = random(-10);
		this.invis = 255;

	}

	show() {
		fill(0, this.invis);
		rect(this.x, this.y, 10, 10);
	}
	move() {
		if (this.y >= windowHeight - 2.5) {
			this.y = windowHeight - 2.5;
			this.ySpeed = 0;
			this.invis = this.invis - 2;

		} else {
			this.ySpeed = this.ySpeed + 0.1;
		}
		this.x = this.x + this.xSpeed;
		this.y = this.y + this.ySpeed;
	}
}