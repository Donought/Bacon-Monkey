class Ball {
  constructor(x, y, d) {
    this.d = d; // Diameter
    this.r = d / 2;
    this.speed = 5;
    this.g = 0.1; // Gravity
    this.f = 0.1; // Friction

    this.pos = createVector(x, y);
    this.v = p5.Vector.random2D().mult(this.speed);
  }

  update() {
    this.v.add(createVector(0, 0.1));
    this.pos.add(this.v);
  }

  display() {
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

      // Reflect the velocities off of the distance vector
      other.v.reflect(distV).mult(1 - this.f);
      this.v.reflect(distV).mult(1 - this.f);
    }
  }
}
