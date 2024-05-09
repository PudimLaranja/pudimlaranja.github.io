function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

var frame = 0;

function update() {
  const frames = 50000;
  clearCanvas();
  refresh();
    __data__.forEach((item) => {
    __process__(frame);
    item.__update__(item, frame / frames);
    item.draw();
  });
  if (frame < frames) {
    frame++;
  } else {
    frame = 0;
  }
}

setInterval(update, 10);
