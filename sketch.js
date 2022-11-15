let balls = [];

function setup() {
  createCanvas(400, 400);
  balls.push(new Ball((width / 4) * 1, height / 2, 50));
  balls.push(new Ball((width / 4) * 3, height / 2, 50));
}

function draw() {
  background(220);

  // Before running all these, set a variable to the current amount of balls in the array, so that it doesn't increase while they're running
  let currentBalls = balls.length;

  balls.forEach((b, i) => {
    b.update();
    b.wallCheck();
    for (let j = i + 1; j < currentBalls; j++) {
      b.ballCheck(balls[j]);
    }
    b.display();
  });
}

function keyPressed() {
  balls.push(new Ball(width / 2, 25, 50));
}
