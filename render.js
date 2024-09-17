//render.js
function clearCanvas() {
    ctx.clearRect(0, 0, CANVAS.width, CANVAS.height);
}

var frame = 0;

var is_update = true

//

function update() {
    if (is_update) {

        const frames = 50000;
        clearCanvas();
        refresh();
        process_mouse();
        __process__.forEach((item) => {
            item(frame);
        })
        __data__.forEach((item) => {

            if (item.type == 'Primitive') {
                let mouse_velocity = __calculate_mouse_rotation__()
                item.global_rotation = item.global_rotation.add(new Vector3(
                    0,
                    mouse_velocity.x, -mouse_velocity.y
                ));
                item.__SetRotatedPosition__(item.global_rotation);
                item.__SetScale__(item.scale);
                item.__SetRotation__(item.rotation);
                item.__SetPosition__(item.position);

            }
            if (item.type == 'point' || item.type == 'line') {
                item.__update__(item, frame / frames);
                item.draw();
            }

        });
        if (frame < frames) {
            frame++;
        } else {
            frame = 0;
        }
    }
}

function toggle_update() {
    var button = document.getElementById('controll_button');
    if (is_update) {
        button.innerHTML = 'Stop'
    } else {
        button.innerHTML = 'Start'
    }
    is_update = !is_update;
}


setInterval(update, 30);