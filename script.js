const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var __data__ = []
var center = {x:canvas.width/2,y:canvas.height/2}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    // Method to calculate the magnitude (length) of the vector
    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Method to add another vector to this vector
    add(otherVector) {
        return new Vector(this.x + otherVector.x, this.y + otherVector.y);
    }

    // Method to subtract another vector from this vector
    subtract(otherVector) {
        return new Vector(this.x - otherVector.x, this.y - otherVector.y);
    }

    // Method to multiply the vector by a scalar
    multiply(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
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
            return new Vector(0, 0);
        }
        return new Vector(this.x / mag, this.y / mag);
    }
}

class Point {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.canvas_x = this.x + center.x
        this.canvas_y = this.y + center.y
        this.color = color;

        this.__update__ = function (self,frame) {
            return self,frame
        } 

        this.__init__ = function () {
            __data__.push(this)
          this.draw();
        };
        this.__init__();
    }

    draw() {
        this.canvas_x = center.x + this.x
        this.canvas_y = center.y + this.y
        let y = this.canvas_y
        let x = this.canvas_x
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

class Line{
    constructor(points,color) {
        this.points = points
        this.color = color;
        this.__update__ = (self,frame) => {
            return self,frame
        }
        this.__init__ = function () {
            __data__.push(this)
            this.draw();
        }
        this.__init__();
    }
    draw() {
        let last_idx = this.points.length - 1
        if (this.points[last_idx] == 'wrap') {
            this.points[last_idx] = this.points[0]
        }
        ctx.beginPath();
        ctx.fillStyle = this.color;
        this.points.forEach((point,idx) => {
            if (idx == 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y)
                ctx.stroke();
                ctx.moveTo(point.x,point.y)
            }                                                            
        });
    
        ctx.closePath();
    }

    update(func) {
        this.__update__ = func;
    }
    
}



var point_list = [
    [100, 100]/*,
    [-100, 100],
    [-100, -100],
    [100,-100]*/
];
point_list.forEach((point, idx) => {
    point_list[idx] = new Point(point[0], point[1], "red");
    point_list[idx].update((self,frame) => {
        let angle = 2 * Math.PI * frame
        
        let vec = new Vector(1, 1);
        vec = vec.normalize()

        let sin_angle = Math.asin(vec.magnitude())
        let cos_angle = Math.acos(vec.magnitude())

        console.log(`sin:${sin_angle},cos:{${cos_angle}}`)
        self.x = Math.cos(angle) * 100
        self.y = Math.sin(angle) * 100
    })
});
point_list.push("wrap");

new Line(point_list, "blue");




function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}    

var frame = 0

function update() {
    clearCanvas();
    __data__.forEach(item => {
        item.__update__(item,frame/100)
       item.draw() 
    })
    if (frame < 100) {
        frame++
    } else {
        frame = 0
    }
    
}

setInterval(update,500)



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
