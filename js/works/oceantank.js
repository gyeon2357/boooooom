var colsFish;
var counter = 0;

var shoals;
var mouseRipples;


// This function is where you define all your setup stuff (screen size etc). (part of p5.js)
function setup() {
	size = min(windowWidth, windowHeight);
	frameRate(60);
	createCanvas(windowWidth, size);
	InitialiseVariables();

}

function InitialiseVariables() {

	//Colours
	colsFish = [];
	colsFish.push(0);
	colsFish.push(20);
	colsFish.push(40);
	colsFish.push(60);

	// Arrays of objects

	shoals = [];
	BirthFish(50);

	sharks = [];
	for (let i = 0; i < 3; i++) {
		sharks.push(new Shark());
	}
	
	mouseRipples = new MouseRipples();

}

// Creates n new fish, (in new, randomly sized, shoals)
function BirthFish(n) {
	let toBirth = n;
	while (toBirth > 0) {
		let newShoalPopulation = floor(random(15, 20));
		newShoalPopulation = min(newShoalPopulation, toBirth);
		shoals.push(new Shoal(newShoalPopulation));
		toBirth -= newShoalPopulation;
	}
}

// This function is called once per frame (part of p5.js).
function draw() {
	counter++;
	render();
}

function render() {
	//Updating and drawing objects
	
	noStroke();
	background(160, 200, 255);
	SandTexture();
	
	UpdateFish();
	UpdateSharks();
	UpdateSurface();
	mouseRipples.update();
	
	// frame
	noFill();
	rect(0, 0, width, height);
}

function SandTexture() {
	// Stroke settings
	strokeWeight(30);
	stroke(255, 0);
	strokeWeight(1);
	
	let origin = createVector(0, 0);
	
	for (let i = 0; i < 7; i++) {
		origin.add(createVector(0, 200));
		DrawSinusoid(-PI / 5, origin, width / 3 + sin((counter + i * 34) / 50) * 5, width / 20);
	}
}

function DrawSinusoid(theta, origin, period, amplitude) {
	let step = createVector(cos(theta), sin(theta));
	
	let offset = step.copy();
	offset.rotate(PI / 2);
	let pos;
	
	beginShape();
	for (let i = 0; i < 20; i++) {
		pos = origin.copy();
		
		thisStep = step.copy();
		thisStep.mult((i-1) * period / 2);
		
		thisOffset = offset.copy();
		thisOffset.mult(cos(i  * PI) * amplitude);
		
		pos.add(thisStep);
		pos.add(thisOffset);
		
		curveVertex(pos.x, pos.y);
	}
	endShape();
}

function UpdateFish() {
	for (let shoal of shoals) {
		shoal.update();
	}
}

function UpdateSurface() {
	fill(160, 220, 255, 100);
	rect(0, 0, width, height);
}

function UpdateSharks() {
	for (let shark of sharks) {
		shark.update();
		shark.draw();
	}
}

function randomChoice(arr) {
	let i = Math.round(random(arr.length));
	return arr[i]
}



// ---------------------------------------------------------------------------------
// 																				ENTITIES
// ---------------------------------------------------------------------------------

// Written by Paulo
class Shark {
	constructor() {

		this.scale = 0.2;

		let x = random(windowWidth);
		let y = random(windowHeight);
		this.position = createVector(x, y);

		this.target = random(TWO_PI);
		this.direction = this.target;

		this.theta = random(TWO_PI);

		this.speed = 1;

	}
	
	edges() {
		let leeway = 40;
		if (this.position.x > width + leeway) {
			this.position.x = 0 - leeway;
		} else if (this.position.x < 0 - leeway) {
			this.position.x = width + leeway;
		}
		if (this.position.y > height + leeway) {
			this.position.y = 0 - leeway;
		} else if (this.position.y < 0 - leeway) {
			this.position.y = height + leeway;
		}
	}

	update() {

		// follow a sine wiggle while aiming for the target direction
		this.theta += 0.05 % TWO_PI;
		let offset = sin(this.theta) * (PI / 16);
		this.direction = this.target + offset;

		// move forwards
		let velocity = p5.Vector.fromAngle(this.direction, this.speed);
		this.position.add(velocity)
		
		this.edges();
	}

	draw() {
		push(); // pushes a new graphics object onto the stack
		translate(this.position.x, this.position.y);
		rotate(this.direction);

		noStroke();
		fill(0);
		ellipse(0, 0, this.scale * 250, this.scale * 80); //body
		triangle(this.scale * -250, 0, this.scale * -20, this.scale * 40, this.scale * -20, this.scale * -40); //tail
		triangle(this.scale * -250, this.scale * -15, this.scale * -270, this.scale * -25, this.scale * -250, this.scale * 0) //left tail fin 1
		triangle(this.scale * -250, this.scale * -15, this.scale * -240, this.scale * 0, this.scale * -250, this.scale * 0) //left tail fin 2
		triangle(this.scale * 50, this.scale * -30, this.scale * -40, this.scale * -70, this.scale * -20, this.scale * -30); //left fin
		triangle(this.scale * -100, this.scale * -10, this.scale * -150, this.scale * -35, this.scale * -140, this.scale * -10); //left fin back

		triangle(this.scale * -250, this.scale * 15, this.scale * -270, this.scale * 25, this.scale * -250, this.scale * 0) //right tail fin 1
		triangle(this.scale * -250, this.scale * 15, this.scale * -240, this.scale * 0, this.scale * -250, this.scale * 0) //right tail fin 2
		triangle(this.scale * 50, this.scale * 30, this.scale * -40, this.scale * 70, this.scale * -20, this.scale * 30); //right fin
		triangle(this.scale * -100, this.scale * 10, this.scale * -150, this.scale * 35, this.scale * -140, this.scale * 10); //right fin back

		pop();
	}
}


class Shoal {
	constructor(count) {

		// Shoal characteristics
		this.size = random(0.07, 0.2);
		this.imgsFishIndex = Math.round(random(1));
		this.color = random(colsFish);
		this.maxForce = 0.03;
		this.maxSpeed = random(0.5, 2);
		this.coefAlignment = random(0.8, 1.5);
		this.coefSeperation = random(0.8, 1.5);
		this.coefCohesion = random(0.8, 1.5);
		this.radAlignment = random(100, 200);
		this.radSeperation = 100;
		this.radCohesion = random(100, 200);

		// populate fishes
		this.fishes = [];
		for (let i = 0; i < count; i += 1) {
			this.fishes.push(new Boid(this.size,
				this.imgsFishIndex,
				this.maxForce,
				this.maxSpeed,
				this.coefAlignment,
				this.coefSeperation,
				this.coefCohesion,
				this.radAlignment,
				this.radSeperation,
				this.radCohesion));
		}

		this.age = 0;
	}

	update() {
		for (let boid of this.fishes) {
			boid.edges();
			boid.flock(this.fishes);
			boid.update();
			
			fill(this.color);
			noStroke();
			boid.show();
		}
	}
}


// Flocking
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/124-flocking-boids.html
// https://youtu.be/mhjuuHl6qHM
class Boid {
	constructor(size, imgsFishIndex, maxForce, maxSpeed, coefAlignment, coefSeperation, coefCohesion, radAlignment, radSeperation, radCohesion) {
		this.position = createVector(random(width), random(height));
		this.velocity = p5.Vector.random2D();
		this.velocity.setMag(random(2, 4));
		this.acceleration = createVector();

		this.imgsFishIndex = imgsFishIndex;
		this.size = size;
		this.maxForce = maxForce;
		this.maxSpeed = maxSpeed;

		this.coefAlignment = coefAlignment;
		this.coefSeperation = coefSeperation;
		this.coefCohesion = coefCohesion;

		this.radAlignment = radAlignment;
		this.radSeperation = radSeperation;
		this.radCohesion = radCohesion;
	}

	edges() {
		let leeway = 20;
		if (this.position.x > width + leeway) {
			this.position.x = 0 - leeway;
		} else if (this.position.x < 0 - leeway) {
			this.position.x = width + leeway;
		}
		if (this.position.y > height + leeway) {
			this.position.y = 0 - leeway;
		} else if (this.position.y < 0 - leeway) {
			this.position.y = height + leeway;
		}
	}

	align(boids) {
		let perceptionRadius = this.radAlignment;
		let steering = createVector();
		let total = 0;
		for (let other of boids) {
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			if (other != this && d < perceptionRadius) {
				steering.add(other.velocity);
				total++;
			}
		}
		if (total > 0) {
			steering.div(total);
			steering.setMag(this.maxSpeed);
			steering.sub(this.velocity);
			steering.limit(this.maxForce);
		}
		return steering;
	}

	separation(boids) {
		let perceptionRadius = this.radSeperation;
		let steering = createVector();
		let total = 0;
		for (let other of boids) {
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			if (other != this && d < perceptionRadius) {
				let diff = p5.Vector.sub(this.position, other.position);
				diff.div(d * d);
				steering.add(diff);
				total++;
			}
		}
		if (total > 0) {
			steering.div(total);
			steering.setMag(this.maxSpeed);
			steering.sub(this.velocity);
			steering.limit(this.maxForce);
		}
		return steering;
	}

	cohesion(boids) {
		let perceptionRadius = this.radCohesion;
		let steering = createVector();
		let total = 0;
		for (let other of boids) {
			let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
			if (other != this && d < perceptionRadius) {
				steering.add(other.position);
				total++;
			}
		}
		if (total > 0) {
			steering.div(total);
			steering.sub(this.position);
			steering.setMag(this.maxSpeed);
			steering.sub(this.velocity);
			steering.limit(this.maxForce);
		}
		return steering;
	}

	avoidMouse() {
		let perceptionRadius = 100
		let steering = createVector(this.position.x, this.position.y);
		steering.sub(createVector(mouseX, mouseY));
		let magnitude = steering.mag();
		if (magnitude < perceptionRadius) {
			steering.normalize();
			steering.mult(4 / magnitude);
			return steering;
		} else {
			return createVector(0, 0);
		}
	}

	flock(boids) {
		let alignment = this.align(boids);
		let cohesion = this.cohesion(boids);
		let separation = this.separation(boids);
		let avoidMouse = this.avoidMouse();

		alignment.mult(this.coefAlignment);
		cohesion.mult(this.coefCohesion);
		separation.mult(this.coefSeperation);

		this.acceleration.add(alignment);
		this.acceleration.add(cohesion);
		this.acceleration.add(separation);
		this.acceleration.add(avoidMouse);
	}

	update() {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxSpeed);
		this.acceleration.mult(0);
	}

	show() {
		//this.showDirection();
		let direction = this.velocity.heading();

		push(); // pushes a new graphics object onto the stack
		
		translate(this.position.x, this.position.y);
		rotate(direction);
		
		ellipse(0, 0, 100 * this.size, 50 * this.size); // draw the boid
		triangle(0, 0, -80 * this.size, -30 * this.size, -80 * this.size, 30 * this.size);
		
		pop();
	}

	showDirection() {
		let ahead = p5.Vector.fromAngle(this.velocity.heading());
		ahead.mult(100);
		ahead.add(this.position);
		stroke(0);
		strokeWeight(2);
		line(this.position.x, this.position.y, ahead.x, ahead.y);
	}
}

class MouseRipples {
	constructor() {
		this.ripples = [];
		this.mousePos = createVector(mouseX, mouseY);
	}
	
	update() {
		let deltaMousePos = createVector(mouseX, mouseY);
		deltaMousePos.sub(this.mousePos);
		let strength = deltaMousePos.mag();
		if(strength > 3 && random(1) > 0.7){
			this.ripples.push(new Ripple(createVector(mouseX, mouseY), strength));
		}
		
		for (let ripple of this.ripples) {
			ripple.update();
			ripple.show();
		}
		
		// Remove finished ripples from array for garbage collection.
		for (let i = this.ripples.length - 1; i >= 0; i--) {
			if (this.ripples[i].finished) {
				this.ripples.splice(i, 1);
			}
		}
		
		this.mousePos = createVector(mouseX, mouseY);
		
	}
}

class Ripple {
	constructor(pos, strength) {
		this.position = pos;
		this.age = 0;
		this.lifespan = random(50, 300);
		this.finished = false;
		this.maxRadius = random(50, 300);
	}
	
	update() {
		this.age++;
		if(this.age >= this.lifespan) {
			this.finished = true;
		}
	}
	
	show() {
		if (!this.finished) {
			let alpha = map(this.age, 0, this.lifespan, 150, 0);
			let radius = map(this.age, 0, this.lifespan, 0, this.maxRadius);
			stroke(255, alpha);
			fill(255, 0);
			strokeWeight(map(this.age, 0, this.lifespan, 5, 10));
			ellipse(this.position.x, this.position.y, radius);
		}
	}
}