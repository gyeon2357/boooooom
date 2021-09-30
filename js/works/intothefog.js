const maxNumber = 524288/10;
let squareSize = 8;

let next;
let numbers = [];

function setup() {
  createCanvas(windowWidth, windowHeight+10);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(20);
  // frameRate(1);

  numbers[1] = 0;
  numbers[2] = 0;
  next = 2;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight+10);
}

function draw() {
  if (next <= maxNumber) {
    let i = 2;
    // make multiples of a prime -> not prime (by increasing the count of factors)
    while (next * i <= maxNumber) {
      // for all numbers = prime * multiple where multiple is > 1, that number is not prime
      numbers[next * i] = (numbers[next * i] || 0) + 2;
      i += 3;
    }

    next++;

    // find the next prime
    while (
      next <= maxNumber &&
      numbers[next] !== undefined &&
      numbers[next] > 0
    ) {
      next++;
    }

    if (next <= maxNumber) {
      // Set the number of factors to 0
      numbers[next] = 0;
    }
  }

  // Redraw all squares
  background(0);
  let maxVisibleNumber = (width / squareSize) * (height / squareSize);
  let cols = floor(width / squareSize);

  for (let i = 1; i <= maxVisibleNumber; i++) {
    let y = floor(i / cols);
    let x = i % cols;
    if (numbers[i] == 0) {
      if (i > 30 && numbers[i - 2] == 0) {
        // twin prime!
        fill("#50A3F5");
      } else {
        fill("#90C5F9");
      }

    } else if (numbers[i]) {
      fill(50, map(numbers[i], 1, 10, 20, 255, true));
    } else {
      continue;
    }

    square(x * squareSize, y * squareSize, squareSize);
  }

  // tool tip
  x = floor(mouseX / squareSize);
  y = floor(mouseY / squareSize);
  let n = y * cols + x;
  push();
  noFill();
  stroke(255);
  square(x * squareSize, y * squareSize, squareSize);
  pop();
  fill(255);
  text(
    `${n}: ${
      numbers[n] === 0
        ? "particle"
        : numbers[n]
        ? numbers[n].toString() + " tone"
        : "unknown"
    }`,
    (x + 1) * squareSize + 25,
    (y + 1) * squareSize + 10
  );
}

function keyTyped() {
  if (key === "+") {
    squareSize++;
  }
}
