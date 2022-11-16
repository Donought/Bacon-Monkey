let balls = [];

let density = 100; // kg/m^3 (even though we're two dimensional, this makes it possible to choose mass of real life objects)
let meter = 10; // px

function setup() {
	createCanvas(400, 400);
	//balls.push(new Ball((width / 4) * 1, height / 2, 50));
	//balls.push(new Ball((width / 4) * 3, height / 2, 50));

	for (let i = 0; i < 20; i++) {
		balls.push(new Ball(width / 2, height / 2, random(1, 5) * meter));
	}
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
	balls.push(new Ball(width / 2, height / 4, random(1, 5) * meter));
}
