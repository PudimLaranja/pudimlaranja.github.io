class Vector2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  stringify() {
    return `Vector2(${this.x},${this.y})`;
  }

  abs() {
    return new Vector2(Math.abs(this.x), Math.abs(this.y));
  }
  // Method to calculate the magnitude (length) of the vector
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  // Method to add another vector to this vector
  add(otherVector) {
    return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
  }

  // Method to subtract another vector from this vector
  subtract(otherVector) {
    return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
  }

  // Method to multiply the vector by a scalar
  multiply(scalar) {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  // Method to calculate the dot product with another vector
  dot(otherVector) {
    return this.x * otherVector.x + this.y * otherVector.y;
  }

  // Method to calculate the angle between this vector and another vector in radians
  angleWith(otherVector) {
    return Math.acos(
      this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
    );
  }

  // Method to normalize the vector (make its magnitude 1)
  normalize() {
    const mag = this.magnitude();
    if (mag === 0) {
      return new Vector2(0, 0);
    }
    return new Vector2(this.x / mag, this.y / mag);
  }

  rotate(angle) {
    let sinAngle = Math.sin(angle);
    let cosAngle = Math.cos(angle);

    let a = new Vector2(cosAngle, sinAngle);
    let b = new Vector2(-sinAngle, cosAngle);

    let a_vec = 0;
    let b_vec = 0;

    a_vec = new Vector2(a.x * this.x, a.y * this.x);
    b_vec = new Vector2(b.x * this.y, b.y * this.y);

    let rotated = 0;

    rotated = new Vector2(a_vec.x + b_vec.x, a_vec.y + b_vec.y);

    print(this.stringify());
    print(a.stringify());
    print(b.stringify());
    print(a_vec.stringify());
    print(b_vec.stringify());
    print(rotated.stringify());
    print(angle);
    print("---");

    return rotated;
  }
}

class Vector3 {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  stringify() {
    return `Vector3(${this.x},${this.y},${this.z})`;
  }

  abs() {
    return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z));
  }
  // Method to calculate the magnitude (length) of the vector
  magnitude() {
    return Math.cbrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  // Method to add another vector to this vector
  add(otherVector) {
    return new Vector3(
      this.x + otherVector.x,
      this.y + otherVector.y,
      this.z + otherVector.z
    );
  }

  // Method to subtract another vector from this vector
  subtract(otherVector) {
    return new Vector3(this.x - otherVector.x, this.y - otherVector.y);
  }

  // Method to multiply the vector by a scalar
  multiply(scalar) {
    return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
  }

  // Method to calculate the dot product with another vector
  dot(otherVector) {
    return (
      this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z
    );
  }

  // Method to calculate the angle between this vector and another vector in radians
  angleWith(otherVector) {
    return Math.acos(
      this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
    );
  }

  // Method to normalize the vector (make its magnitude 1)
  normalize() {
    const mag = this.magnitude();
    if (mag === 0) {
      return new Vector3(0, 0);
    }
    return new Vector3(this.x / mag, this.y / mag, this.z / mag);
  }
}
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const center = new Vector2(canvas.width / 2, canvas.height / 2);

var __data__ = [];
var FOCO = new Vector3(0, 0, -10);

function print(content) {
  const debug = document.getElementById("debug");
  var p = document.createElement("p");
  p.innerHTML = `${content}`;
  debug.appendChild(p);
}

function refresh() {
  const debug = document.getElementById("debug");
  debug.innerHTML = "";
}

class Point {
  constructor(pos, color, parent_center) {
    this.pos = pos;
    this.canvas_pos = center.add(this.pos);
    this.color = color;
    this.parent_center = parent_center;

    this.__update__ = function (self, frame) {
      return self, frame;
    };

    this.__init__ = function () {
      __data__.push(this);
      this.draw();
    };
    this.__init__();
  }

  render(ponto, foco) {
    let d = Math.abs(foco.z);
    let ponto3D = new Vector2(
      ponto.x / (ponto.z / d + 1),
      ponto.y / (ponto.z / d + 1)
    );
    return ponto3D;
  }

  draw() {
    let position = this.pos.add(this.parent_center);
    this.canvas_pos = center.add(this.render(position, FOCO));
    let y = this.canvas_pos.y;
    let x = this.canvas_pos.x;
    let color = this.color;
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.closePath();
  }

  update(func) {
    this.__update__ = func;
  }
}

class Line {
  constructor(points, color, connectAll) {
    this.points = points;
    this.color = color;
    this.connectAll = connectAll;

    this.__update__ = (self, frame) => {
      return self, frame;
    };

    this.__init__ = function () {
      __data__.push(this);
      this.draw();
    };
    this.__init__();
  }

  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;

    if (this.connectAll) {
      for (let i = 0; i < this.points.length; i++) {
        for (let j = i + 1; j < this.points.length; j++) {
          let point1 = this.points[i];
          let point2 = this.points[j];

          let x1 = point1.canvas_pos.x;
          let y1 = point1.canvas_pos.y;
          let x2 = point2.canvas_pos.x;
          let y2 = point2.canvas_pos.y;

          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    } else {
      let last_idx = this.points.length - 1;
      if (this.points[last_idx] == "wrap") {
        this.points[last_idx] = this.points[0];
      }

      this.points.forEach((point, idx) => {
        let x = point.canvas_pos.x;
        let y = point.canvas_pos.y;
        if (idx == 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
          ctx.stroke();
          ctx.moveTo(x, y);
        }
      });
    }

    ctx.closePath();
  }

  update(func) {
    this.__update__ = func;
  }
}

class Shape {
  constructor(shape) {
    this.position = new Vector3(0, 0, 0);
    this.rotation = new Vector3(0, 0, 0);
    this.scale = new Vector3(1, 1, 1);
    this.shape = shape;
  }
}

class Cube {
  constructor(color) {
    this.position = new Vector3(0, 0, 0);
      this.rotation = new Vector3(0, 0, 0);
      this.lock_rotation = true;
    this.color = color;
    this.shape = [
      new Vector3(100, 100, 100),
      new Vector3(-100, 100, 100),
      new Vector3(-100, -100, 100),
      new Vector3(100, -100, 100),
      new Vector3(100, 100, -100),
      new Vector3(-100, 100, -100),
      new Vector3(-100, -100, -100),
      new Vector3(100, -100, -100),
    ];
    this.points = [];
    this.__init__ = () => {
      this.shape.forEach((item) => {
        this.points.push(new Point(item, this.color, this.position));
      });
    };
    this.__init__();
    this.lines = new Line(this.points, this.color, true);
  }

  __SetRotation__(rotation) {
    this.points.forEach((point, idx) => {
      let vec = point.pos;
      let rotVecX = new Vector2(vec.x, vec.y).rotate(rotation.x);
      vec = new Vector3(rotVecX.x, rotVecX.y, vec, z);
      let rotVecY = new Vector2(vec.x, vec.z).rotate(rotation.x);
      vec = new Vector3(rotVecY.x, vec.y, rotVecY.z);
      let rotVecZ = new Vector2(vec.z, vec.y).rotate(rotation.x);
      vec = new Vector3(vec.x, rotVecZ.y, rotVecZ.x);
      this.points[idx].pos = vec;
    });
  }
}
