var Cursor = {
    velocity: new Vector2(0, 0),
    is_pressed: false,
    on_screen: true,
    position: new Vector2(0, 0),
    real_time_velocity: new Vector2(0, 0)
}

var screen_tag = document.getElementById('myCanvas');

screen_tag.addEventListener('mouseleave', (event) => {
    Cursor.on_screen = false
})

screen_tag.addEventListener('mouseenter', (event) => {
    Cursor.on_screen = true
})

window.addEventListener('mousedown', (event) => {
    Cursor.is_pressed = true
})

window.addEventListener('mouseup', (event) => {
    Cursor.is_pressed = false
})

var old_pos = new Vector2(0, 0);
var max_velocity = 300;
var max_angle_per_frame = deg_to_rad(360 + 90);

screen_tag.addEventListener('mousemove', (event) => {
    old_pos = Cursor.position
    Cursor.position = new Vector2(event.pageX, event.pageY).subtract(new Vector2(8, 8)).subtract(center)

})
var abs = (num) => { return Math.abs(num) };

function __handle_velocity_mouse__() {
    Cursor.real_time_velocity = Cursor.position.subtract(old_pos);
    if (Cursor.is_pressed && Cursor.on_screen) {
        Cursor.velocity = Cursor.position.subtract(old_pos);
    }
    Cursor.real_time_velocity = Cursor.real_time_velocity.clamp(new Vector2(0, 0), max_velocity)
    Cursor.velocity = Cursor.velocity.clamp(new Vector2(0, 0), max_velocity)
    let mag = Cursor.real_time_velocity.magnitude()
    let friction = (Math.pow(1 - (mag / max_velocity), 2)).toFixed(6)
    Cursor.velocity = Cursor.velocity.lerp(new Vector2(0, 0), friction)

}


function __calculate_mouse_rotation__() {
    let velocity = Cursor.velocity;
    var vel = new Vector2(
        velocity.x / max_velocity * max_angle_per_frame,
        velocity.y / max_velocity * max_angle_per_frame
    )
    return vel
}

function process_mouse() {
    __handle_velocity_mouse__()
}