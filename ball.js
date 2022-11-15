class Ball {
  constructor(x, y, d) {
    this.d = d;
    this.r = d / 2;
    this.speed = 5;

    this.pos = createVector(x, y);
    this.v = p5.Vector.random2D().mult(this.speed);
  }

  update() {
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
      this.v.x *= -1;
    } else if (width - r < p.x) {
      this.pos.x = width - r;
      this.v.x *= -1;
    } else if (p.y < r) {
      this.pos.y = r;
      this.v.y *= -1;
    } else if (height - r < p.y) {
      this.pos.y = height - r;
      this.v.y *= -1;
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
      other.v.reflect(distV);
      this.v.reflect(distV);
    }
  }
}
