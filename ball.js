class Ball {
	constructor(x, y, d, c) {
		this.d = d; // Diameter
		this.r = d / 2;
		this.s = 5; // Speed
		this.g = 0.1; // Gravity
		this.f = 0.1; // Friction
		this.c = c;

		this.pos = createVector(x, y);
		this.v = p5.Vector.random2D().mult(this.s);
	}

	update() {
		this.v.add(createVector(0, 0.1));
		this.pos.add(this.v);
	}

	display() {
		stroke(this.c[1] - 100, this.c[1] - 100, this.c[0] - 100, 50);
		fill(this.c[1], this.c[1], this.c[0], 50);
		circle(this.pos.x, this.pos.y, this.d);
	}

	wallCheck() {
		let p = this.pos;
		let r = this.r;

		if (p.x < r) {
			this.pos.x = r;
			this.v.x *= -1 * (1 - this.f);
		} else if (width - r < p.x) {
			this.pos.x = width - r;
			this.v.x *= -1 * (1 - this.f);
		} else if (p.y < r) {
			this.pos.y = r;
			this.v.y *= -1 * (1 - this.f);
		} else if (height - r < p.y) {
			this.pos.y = height - r;
			this.v.y *= -1 * (1 - this.f);
		}
	}

	ballCheck(other) {
		let distV = p5.Vector.sub(other.pos, this.pos); // Vector between the two balls (distance vector)
		let dist = distV.mag();
		let minDist = this.r + other.r;

		if (dist < minDist) {
			// Fix the distance between them, so that they aren't overlapping
			let fixV = distV
				.copy()
				.normalize()
				.mult((minDist - dist) / 2.0);
			other.pos.add(fixV);
			this.pos.sub(fixV);

			let uV = distV.copy().normalize(); // Unit distance vector
			let rV = p5.Vector.sub(this.v, other.v); // Relative velocity vector

			let cS = p5.Vector.dot(uV, rV); // Collision speed (you can find the speed as rV's projection on uV, which apparently can be found with the help of dot product magic)
			let cV = uV.copy().mult(cS); // Collision velocity

			if (0 < cS) {
				// Add and subtract the collision velocity accordingly
				other.v.add(cV);
				this.v.sub(cV);
			}
		}
	}
}
