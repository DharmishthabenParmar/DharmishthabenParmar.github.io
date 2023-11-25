// setup canvas
const para = document.querySelector('p'); // Paragraph element for displaying ball count
let count = 0; // Variable to keep track of the number of balls

const canvas = document.querySelector('canvas'); // Canvas element for drawing
const ctx = canvas.getContext('2d'); // 2D rendering context

const width = canvas.width = window.innerWidth; // Set canvas width to window width
const height = canvas.height = window.innerHeight; // Set canvas height to window height

// Function to generate a random number in a given range
function random(min, max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
}

// Function to generate a random RGB color value
function randomRGB() {
  return `rgb(${random(0, 255)},${random(0, 255)},${random(0, 255)})`;
}

// Base class for shapes
class Shape {
  constructor(x, y, velX, velY) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }
}

// Class for creating balls, inheriting from the Shape class
class Ball extends Shape {
  constructor(x, y, velX, velY, color, size) {
    super(x, y, velX, velY);
    this.color = color;
    this.size = size;
    this.exists = true; // Indicates whether the ball exists on the canvas
  }

  // Method to draw the ball on the canvas
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  // Method to update the position of the ball
  update() {
    // Bounce off the edges of the canvas
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
    this.x += this.velX;
    this.y += this.velY;
  }

  // Method to detect collisions with other balls and change colors
  collisionDetect() {
    for (const ball of balls) {
      if (!(this === ball) && ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }
}

// Class for creating an "Evil Circle" that the user can control
class EvilCircle extends Shape {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.color = "white";
    this.size = 10;

    // Event listener to handle keyboard input for moving the circle
    window.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'a':
          this.x -= this.velX;
          break;
        case 'd':
          this.x += this.velX;
          break;
        case 'w':
          this.y -= this.velY;
          break;
        case 's':
          this.y += this.velY;
          break;
      }
    });
  }

  // Method to draw the "Evil Circle" on the canvas
  draw() {
    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
  }

  // Method to check if the "Evil Circle" is going out of bounds and adjust its position
  checkBounds() {
    if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
      this.x -= this.size;
    }
    if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
      this.y -= this.size;
    }
  }

  // Method to detect collisions between the "Evil Circle" and balls, removing balls on collision
  collisionDetect() {
    for (const ball of balls) {
      if (ball.exists) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.exists = false; // Mark the ball as not existing
          count--; // Decrease the ball count
          para.textContent = 'Ball count: ' + count; // Update the display
        }
      }
    }
  }
}

// Create an array to store balls and populate it
const balls = [];
while (balls.length < 25) {
  const size = random(10, 20);
  const ball = new Ball(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    randomRGB(),
    size
  );
  balls.push(ball);
  count++;
  para.textContent = 'Ball count: ' + count;
}

// Create an "Evil Circle" at a random position
const evilBall = new EvilCircle(random(0, width), random(0, height));

// Main animation loop
function loop() {
  // Draw a semi-transparent black background to create trails
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  // Update and draw each ball
  for (const ball of balls) {
    if (ball.exists) {
      ball.draw();
      ball.update();
      ball.collisionDetect();
    }
  }

  // Update and draw the "Evil Circle"
  evilBall.draw();
  evilBall.checkBounds();
  evilBall.collisionDetect();

  // Request the next animation frame
  requestAnimationFrame(loop);
}

// Start the animation loop
loop();