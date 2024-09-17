// Assuming you have a CANVAS element in your HTML

// Custom shader function using raw pixel data

/** @type {HTMLCanvasElement} */
const shader_canvas = document.getElementById('Canvas2');
const shader_ctx = shader_canvas.getContext('2d');


// Number of workers in the pool
const WORKER_POOL_SIZE = 4;
const workers = [];

// Initialize Web Worker pool
for (let i = 0; i < WORKER_POOL_SIZE; i++) {
    workers.push(new Worker('shaderWorker.js'));
}

// Function to apply the shader to the CANVAS
function applyShader() {
    let imageData = ctx.getImageData(0, 0, shader_canvas.width, shader_canvas.height);
    let data = new Uint8ClampedArray(imageData.data.buffer);
    let segmentLength = Math.ceil(data.length / WORKER_POOL_SIZE);
    let completedWorkers = 0;

    return new Promise((resolve) => {
        workers.forEach((worker, index) => {
            // Calculate start and end indices for each segment
            let start = index * segmentLength;
            let end = Math.min(start + segmentLength, data.length);

            // Create a segment of the data for this worker
            let segment = data.slice(start, end);

            worker.onmessage = function(e) {
                let newData = new Uint8ClampedArray(e.data);

                // Copy the processed data back to the main data array
                data.set(newData, start);

                completedWorkers++;
                if (completedWorkers === WORKER_POOL_SIZE) {
                    imageData.data.set(data);
                    shader_ctx.putImageData(imageData, 0, 0);
                    resolve();
                }
            };

            // Send the pixel data segment to the Web Worker
            worker.postMessage(segment.buffer, [segment.buffer]);
        });
    });
}
// Apply the custom shader
__shaders__.push(frame => {
    applyShader();
});