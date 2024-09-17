<<<<<<< Updated upstream
FOCO.z = -500;

let PI2 = 2 * Math.PI;

let ube = new Cube("blue");

ube.rotation.y = PI2 * 0.2;

__data__.forEach((item) => {
  print(item);
});

function __process__(frame) {}
=======
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    stringify() {
        return `Vector2(${this.x},${this.y})`;
    }

    abs() {
            return new Vector2(Math.abs(this.x), Math.abs(this.y))
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
        return new Vector2(this.x * scalar, this.y * scalar)
    }

    // Method to calculate the dot product with another vector
    dot(otherVector) {
        return this.x * otherVector.x + this.y * otherVector.y;
    }

    // Method to calculate the angle between this vector and another vector in radians
    angleWith(otherVector) {
        return Math.acos(this.dot(otherVector) / (this.magnitude() * otherVector.magnitude()));
    }

    // Method to normalize the vector (make its magnitude 1)
    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Vector2(0, 0);
        }
        return new Vector2(this.x / mag, this.y / mag);
    }

    rotate(angle = 2 * Math.PI * 0.001) {
        let sinAngle = Math.sin(angle);
        let cosAngle = Math.cos(angle);

        let a = new Vector2(cosAngle, sinAngle);
        let b = new Vector2(-sinAngle, cosAngle);

        let a_vec = { x: a.x * this.x, y: a.y * this.pos.x };
        let b_vec = { x: b.x * this.y, y: b.y * this.pos.y };
        let rotVec = new Vector2(a_vec.x + b_vec.y, a_vec.y + b_vec.y)

        print(angle)
        print(rotVec.stringify())
        print(a.stringify());
        print(b.stringify())
        print('---')

        return rotVec;

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
            return new Vector3(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z))
        }
        // Method to calculate the magnitude (length) of the vector
    magnitude() {
        return Math.cbrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    // Method to add another vector to this vector
    add(otherVector) {
        return new Vector3(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z);
    }

    // Method to subtract another vector from this vector
    subtract(otherVector) {
        return new Vector3(this.x - otherVector.x, this.y - otherVector.y);
    }

    // Method to multiply the vector by a scalar
    multiply(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar)
    }

    // Method to calculate the dot product with another vector
    dot(otherVector) {
        return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z;
    }

    // Method to calculate the angle between this vector and another vector in radians
    angleWith(otherVector) {
        return Math.acos(this.dot(otherVector) / (this.magnitude() * otherVector.magnitude()));
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
const center = new Vector2(canvas.width / 2, canvas.height / 2)

var __data__ = []
var FOCO = new Vector3(0, 0, -10);

function print(content) {
    const debug = document.getElementById('debug')
    var p = document.createElement('p');
    p.innerHTML = `${content}`
    debug.appendChild(p)
}

function refresh() {
    const debug = document.getElementById('debug');
    debug.innerHTML = '';
}



class Point {
    constructor(pos, color) {
        this.pos = pos;
        this.canvas_pos = center.add(this.pos)
        this.color = color;

        this.__update__ = function(self, frame) {
            return self, frame
        }

        this.__init__ = function() {
            __data__.push(this)
            this.draw();
        };
        this.__init__();
    }

    render(ponto, foco) {
        let d = Math.abs(foco.z);
        let ponto3D = new Vector2(
            ponto.x / ((ponto.z / d) + 1),
            ponto.y / ((ponto.z / d) + 1)
        );
        return ponto3D;
    }

    draw() {
        this.canvas_pos = center.add(this.render(this.pos, FOCO))
        let y = this.canvas_pos.y
        let x = this.canvas_pos.x
        let color = this.color;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    update(func) {
        this.__update__ = func
    }
}

class Line {
    constructor(points, color, connectAll) {
        this.points = points;
        this.color = color;
        this.connectAll = connectAll;

        this.__update__ = (self, frame) => {
            return self, frame
        }

        this.__init__ = function() {
            __data__.push(this)
            this.draw();
        }
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
            let last_idx = this.points.length - 1
            if (this.points[last_idx] == 'wrap') {
                this.points[last_idx] = this.points[0]
            }

            this.points.forEach((point, idx) => {
                let x = point.canvas_pos.x;
                let y = point.canvas_pos.y;
                if (idx == 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y)
                    ctx.stroke();
                    ctx.moveTo(x, y)
                }
            });
        }

        ctx.closePath();
    }

    update(func) {
        this.__update__ = func;
    }

}


FOCO.z = -500

var point_list = [
    [-100, -100, -100],
    [100, -100, -100],
    [100, -100, 100],
    [-100, -100, 100],
    [0, 100, 0]
];
point_list.forEach((point, idx) => {
    point_list[idx] = new Point(new Vector3(point[0], point[1], point[2]), idx == 0 ? "red" : 'blue');
    point_list[idx].update((self, frame) => {
            if (true) {

                let vec = new Vector2(self.pos.x, self.pos.z)
                let rotated = vec.rotate()

                self.pos = new Vector3(rotated.x, self.y, rotated.y);
            }
        })
        //*/
});


new Line(point_list, "blue", true);




function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var frame = 0

function update() {
    const frames = 50000
    clearCanvas();
    refresh()
    __data__.forEach(item => {
        item.__update__(item, frame / frames)
        item.draw()
    })
    if (frame < frames) {
        frame++
    } else {
        frame = 0
    }


}

setInterval(update, 10)



/*
// Variables

const points = [];

// Function to draw a point
function drawPoint(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, 3, 0, Math.PI * 2);
  ctx.fillStyle = "red";
  ctx.fill();
  ctx.closePath();
}

// Function to draw a line between two points
function drawLine(startX, startY, endX, endY) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = "blue";
  ctx.stroke();
  ctx.closePath();
}

// Function to add a point
function addPoint() {
  const x = parseInt(document.getElementById("xCoord").value);
  const y = parseInt(document.getElementById("yCoord").value);
  points.push({ x, y });
  drawPoint(x, y);
  if (points.length > 1) {
    const lastPoint = points[points.length - 2];
    drawLine(lastPoint.x, lastPoint.y, x, y);
  }
}

// Function to clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  points.length = 0;
}

// Event listener for mouse click to add point
canvas.addEventListener("click", function (event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  points.push({ x, y });
  drawPoint(x, y);
  if (points.length > 1) {
    const lastPoint = points[points.length - 2];
    drawLine(lastPoint.x, lastPoint.y, x, y);
  }
});
*/
>>>>>>> Stashed changes
