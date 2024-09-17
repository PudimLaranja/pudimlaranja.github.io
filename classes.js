class Point {
    constructor(position, color, parent_center) {
        this.type = 'point';
        this.position = position;
        this.canvas_pos = center.add(this.position);
        this.color = color;
        this.parent_center = parent_center;
        this.global_position = this.position.add(this.parent_center)

        this.__update__ = function(self, frame) {
            return self, frame;
        };

        this.__init__ = function() {
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
        let position = this.position.add(this.parent_center);
        this.global_position = position;
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
        this.type = 'line';
        this.points = points;
        this.color = color;
        this.connectAll = connectAll;

        this.__update__ = (self, frame) => {
            return self, frame;
        };

        this.__init__ = function() {
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

// class Shape {
//     constructor(shape) {
//         this.type = 'shape';
//         this.position = new Vector3(0, 0, 0);
//         this.rotation = new Vector3(0, 0, 0);
//         this.scale = new Vector3(1, 1, 1);
//         this.shape = shape;
//     }
// }

// class Shape {
//     constructor(color, size) {

//     }
// }

class Primitive {
    constructor(color, shape) {
        this.type = 'Primitive';
        this.position = new Vector3(0, 0, 0);
        this.rotated_position = this.position;
        this.rotation = new Vector3(0, 0, 0);
        this.global_rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1)
        this.lock_rotation = true;
        this.color = color;
        this.shape = shape
        this.scaled_shape = this.shape
        this.points = [];
        this.__init__ = () => {
            this.shape.forEach((item) => {
                this.points.push(new Point(item, this.color, this.rotated_position));
            });
            __data__.push(this)
        };
        this.__init__();
    }

    __SetPosition__(position) {
        this.points.forEach((point, idx) => {
            this.points[idx].parent_center = this.rotated_position
        })
    }

    __SetScale__(scale) {
        this.shape.forEach((item, idx) => {
            this.scaled_shape[idx] = new Vector3(
                item.x * scale.x,
                item.y * scale.y,
                item.z * scale.z
            );
        })
    }

    __SetRotation__(rotation) {
        this.points.forEach((item, idx) => {
            let vec = this.scaled_shape[idx];
            let rotVecX = new Vector2(vec.x, vec.y).rotate(rotation.x + this.global_rotation.x); // Convert degrees to radians
            vec = new Vector3(rotVecX.x, rotVecX.y, vec.z);
            let rotVecY = new Vector2(vec.x, vec.z).rotate(rotation.y + this.global_rotation.y); // Corrected typo and conversion
            vec = new Vector3(rotVecY.x, vec.y, rotVecY.y);
            let rotVecZ = new Vector2(vec.z, vec.y).rotate(rotation.z + this.global_rotation.z); // Ensure Z rotation is also in radians
            vec = new Vector3(vec.x, rotVecZ.y, rotVecZ.x);
            this.points[idx].position = vec;
        })

    }

    __SetRotatedPosition__(rotation) {
        let vec = this.position;
        let rotVecX = new Vector2(vec.x, vec.y).rotate(rotation.x); // Convert degrees to radians
        vec = new Vector3(rotVecX.x, rotVecX.y, vec.z);
        let rotVecY = new Vector2(vec.x, vec.z).rotate(rotation.y); // Corrected typo and conversion
        vec = new Vector3(rotVecY.x, vec.y, rotVecY.y);
        let rotVecZ = new Vector2(vec.z, vec.y).rotate(rotation.z); // Ensure Z rotation is also in radians
        vec = new Vector3(vec.x, rotVecZ.y, rotVecZ.x);
        this.rotated_position = vec;
    }

}

function deg_to_rad(deg) {
    return deg / 180 * Math.PI
}

function vecDeg_to_rad(vec) {
    if (vec.type == 'vector2') {
        return new Vector2(deg_to_rad(vec.x), deg_to_rad(vec.y));
    } else if (vec.type == 'vector3') {
        return new Vector3(deg_to_rad(vec.x), deg_to_rad(vec.y), deg_to_rad(vec.z));
    }
}

class Cube extends Primitive {
    constructor(color) {
        super(
            color, [ //the vertices of the shape
                new Vector3(100, 100, 100),
                new Vector3(-100, 100, 100),
                new Vector3(-100, -100, 100),
                new Vector3(100, -100, 100),
                new Vector3(100, 100, -100),
                new Vector3(-100, 100, -100),
                new Vector3(-100, -100, -100),
                new Vector3(100, -100, -100),
            ]
        );
        this.lines = new Line([ //the order that the vertices will connect to form edged
            this.points[0],
            this.points[1],
            this.points[2],
            this.points[3],
            this.points[0],
            this.points[4],
            this.points[5],
            this.points[6],
            this.points[7],
            this.points[4],
            this.points[7],
            this.points[3],
            this.points[2],
            this.points[6],
            this.points[5],
            this.points[1]
        ], this.color);
    }
}

class Plane extends Primitive {
    constructor(color) {
        super(
            color, [
                new Vector3(-100, 0, 100),
                new Vector3(100, 0, 100),
                new Vector3(100, 0, -100),
                new Vector3(-100, 0, -100),
            ]
        );
        this.lines = new Line([
            this.points[0],
            this.points[1],
            this.points[2],
            this.points[3],
            this.points[0]
        ], this.color);
    }
}

class Pyramid extends Primitive {
    constructor(color) {
        super(
            color, [
                new Vector3(-100, -100, 100),
                new Vector3(100, -100, 100),
                new Vector3(100, -100, -100),
                new Vector3(-100, -100, -100),
                new Vector3(0, 100, 0)
            ]
        );
        this.lines = new Line([
            this.points[0],
            this.points[1],
            this.points[2],
            this.points[3],
            this.points[0],
            this.points[4],
            this.points[1],
            this.points[2],
            this.points[4],
            this.points[3]
        ], this.color);
    }
}

class Triangle extends Primitive {
    constructor(color) {
        super(
            color, [
                new Vector3(100, 0, 0),
                new Vector3(-100, 0, 0),
                new Vector3(0, -200, 0)
            ]
        );
        this.lines = new Line([
            this.points[0],
            this.points[1],
            this.points[2],
            this.points[0]
        ], this.color);
    }
}

class Sphere extends Primitive {
    constructor(color, radius = 100, resolution = 6) {
        const points = [];
        // Generate vertices using spherical coordinates
        for (let i = 0; i <= resolution; i++) {
            let theta = i * Math.PI / resolution; // polar angle
            for (let j = 0; j <= resolution; j++) {
                let phi = j * 2 * Math.PI / resolution; // azimuthal angle
                let x = radius * Math.sin(theta) * Math.cos(phi);
                let y = radius * Math.sin(theta) * Math.sin(phi);
                let z = radius * Math.cos(theta);
                points.push(new Vector3(x, y, z));
            }
        }

        super(color, points); // Pass the generated vertices to the parent constructor

        // Connect vertices to form the edges (in this case, lines connecting nearby points)
        let edges = [];
        for (let i = 0; i < resolution; i++) {
            for (let j = 0; j < resolution; j++) {
                let index = i * (resolution + 1) + j;
                let nextRow = (i + 1) * (resolution + 1) + j;
                let nextCol = i * (resolution + 1) + (j + 1);

                // Connect the current point to the next row and next column point to form grid-like lines
                if (i < resolution) edges.push(this.points[index], this.points[nextRow]);
                if (j < resolution) edges.push(this.points[index], this.points[nextCol]);
            }
        }

        this.lines = new Line(edges, this.color);
    }
}