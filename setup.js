const CANVAS = document.getElementById("myCanvas");
const ctx = CANVAS.getContext("2d");
const center = new Vector2(CANVAS.width / 2, CANVAS.height / 2);

var __data__ = [];
var __process__ = [];
var __shaders__ = [];
var FOCO = new Vector3(0, -30, 0)

const canvas_pixel_cords = []
const canvas_uv_cords = []

for (let y = 0; y <= CANVAS.height; y++) {
    for (let x = 0; x <= CANVAS.width; x++) {
        canvas_pixel_cords.push(new Vector2(x, y));
        canvas_uv_cords.push(new Vector2(x / CANVAS.width, y / CANVAS.height));
    }
}

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