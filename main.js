FOCO.z = -1000;
const PI = Math.PI;

const point = new Point(new Vector3(0, 0, 0), 'blue', new Vector3(0, 0, 0))

const cube = new Cube('blue');



const pyramid = new Pyramid('green');

pyramid.position.x += 400
pyramid.rotation.x = PI

const sphere = new Sphere('red');

sphere.position.x -= 400

__data__.forEach((item) => {});



var angle_to_add = deg_to_rad(1)

var tick = 1

__process__.push((frame) => {
    pyramid.rotation.y += deg_to_rad(1)
    pyramid.rotation.z += deg_to_rad(0.5)
    cube.position.y = Math.sin(deg_to_rad(tick)) * 200
    cube.position.x = Math.cos(deg_to_rad(tick) * 4) * 50
    sphere.position.y = Math.sin(deg_to_rad(tick)) * -150
    sphere.rotation = sphere.rotation.add(new Vector3(angle_to_add, angle_to_add, angle_to_add));
    tick += 1
})