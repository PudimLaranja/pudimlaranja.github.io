function lerp(value, goal, weight) {
    let fvalue = parseFloat(value);
    let fgoal = parseFloat(goal);
    let fweight = parseFloat(weight);
    let val = (fvalue + ((fgoal - fvalue) * fweight));

    val = val.toFixed(6);
    val = parseFloat(val);
    return val;
}

function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

class Vector2 {
    constructor(x, y) {
        this.type = 'vector2';
        this.x = x;
        this.y = y;
    }

    stringify() {
        return `Vector2(${this.x},${this.y})`;
    }

    abs() {
        return new Vector2(Math.abs(this.x), Math.abs(this.y));
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    add(otherVector) {
        return new Vector2(this.x + otherVector.x, this.y + otherVector.y);
    }

    subtract(otherVector) {
        return new Vector2(this.x - otherVector.x, this.y - otherVector.y);
    }

    multiply(scalar) {
        return new Vector2(this.x * scalar, this.y * scalar);
    }

    dot(otherVector) {
        return this.x * otherVector.x + this.y * otherVector.y;
    }

    angleWith(otherVector) {
        return Math.acos(this.dot(otherVector) / (this.magnitude() * otherVector.magnitude()));
    }

    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Vector2(0, 0);
        }
        return new Vector2(this.x / mag, this.y / mag);
    }

    rotate(angle) {
        let sinAngle = parseFloat((Math.sin(angle)).toFixed(4));
        let cosAngle = parseFloat((Math.cos(angle)).toFixed(4));

        let a = new Vector2(cosAngle, sinAngle);
        let b = new Vector2(-sinAngle, cosAngle);

        let a_vec = new Vector2(a.x * this.x, a.y * this.x);
        let b_vec = new Vector2(b.x * this.y, b.y * this.y);

        return new Vector2(a_vec.x + b_vec.x, a_vec.y + b_vec.y);
    }

    lerp(vec, weight) {
        return new Vector2(
            lerp(this.x, vec.x, weight),
            lerp(this.y, vec.y, weight)
        );
    }

    clamp(center_vec, max) {
        let return_vec = this.subtract(center_vec);
        let mag = return_vec.magnitude();
        return_vec = return_vec.normalize();
        mag = clamp(mag, 0, max);
        return_vec = return_vec.multiply(mag);
        return return_vec;
    }
}

class Vector3 {
    constructor(x, y, z) {
        this.type = 'vector3';
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

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    add(otherVector) {
        return new Vector3(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z);
    }

    subtract(otherVector) {
        return new Vector3(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z);
    }

    multiply(scalar) {
        return new Vector3(this.x * scalar, this.y * scalar, this.z * scalar);
    }

    divide(divider) {
        return new Vector3(this.x / divider, this.y / divider, this.z / divider);
    }

    dot(otherVector) {
        return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z;
    }

    angleWith(otherVector) {
        return Math.acos(this.dot(otherVector) / (this.magnitude() * otherVector.magnitude()));
    }

    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Vector3(0, 0, 0);
        }
        return new Vector3(this.x / mag, this.y / mag, this.z / mag);
    }

    lerp(vec, weight) {
        return new Vector3(
            lerp(this.x, vec.x, weight),
            lerp(this.y, vec.y, weight),
            lerp(this.z, vec.z, weight)
        );
    }

    clamp(center_vec, max) {
        let return_vec = this.subtract(center_vec);
        let mag = return_vec.magnitude();
        return_vec = return_vec.normalize();
        mag = clamp(mag, 0, max);
        return_vec = return_vec.multiply(mag);
        return return_vec;
    }
}

class Vector4 {
    constructor(x, y, z, w) {
        this.type = 'vector4';
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    stringify() {
        return `Vector4(${this.x},${this.y},${this.z},${this.w})`;
    }

    abs() {
        return new Vector4(Math.abs(this.x), Math.abs(this.y), Math.abs(this.z), Math.abs(this.w));
    }

    magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
    }

    add(otherVector) {
        return new Vector4(this.x + otherVector.x, this.y + otherVector.y, this.z + otherVector.z, this.w + otherVector.w);
    }

    subtract(otherVector) {
        return new Vector4(this.x - otherVector.x, this.y - otherVector.y, this.z - otherVector.z, this.w - otherVector.w);
    }

    multiply(scalar) {
        return new Vector4(this.x * scalar, this.y * scalar, this.z * scalar, this.w * scalar);
    }

    divide(divider) {
        return new Vector4(this.x / divider, this.y / divider, this.z / divider, this.w / divider);
    }

    dot(otherVector) {
        return this.x * otherVector.x + this.y * otherVector.y + this.z * otherVector.z + this.w * otherVector.w;
    }

    angleWith(otherVector) {
        return Math.acos(this.dot(otherVector) / (this.magnitude() * otherVector.magnitude()));
    }

    normalize() {
        const mag = this.magnitude();
        if (mag === 0) {
            return new Vector4(0, 0, 0, 0);
        }
        return new Vector4(this.x / mag, this.y / mag, this.z / mag, this.w / mag);
    }

    lerp(vec, weight) {
        return new Vector4(
            lerp(this.x, vec.x, weight),
            lerp(this.y, vec.y, weight),
            lerp(this.z, vec.z, weight),
            lerp(this.w, vec.w, weight)
        );
    }

    clamp(center_vec, max) {
        let return_vec = this.subtract(center_vec);
        let mag = return_vec.magnitude();
        return_vec = return_vec.normalize();
        mag = clamp(mag, 0, max);
        return_vec = return_vec.multiply(mag);
        return return_vec;
    }
}