importScripts('vectors.js');

self.addEventListener('message', (e) => {
    const event = e.data;
    const data = new Uint8Array(event.data);
    const length = data.length;
    const new_data = [];

    // Dynamically import the shader script
    importScripts(event.shader);

    // Ensure the fragment function is available
    if (typeof self.fragment !== 'function') {
        console.error('Fragment function not found in imported script.');
        return;
    }

    for (let idx = 0; idx < length; idx += 4) {
        const COLOR = new Vector4(data[idx], data[idx + 1], data[idx + 2], data[idx + 3]);

        const pixel = self.fragment({
            COLOR: COLOR,
            UV: event.uv_array[idx / 4],
            CORD: event.cord_array[idx / 4],
            PARAMS: event.params
        });

        new_data.push(pixel.x, pixel.y, pixel.z, pixel.w);
    }

    self.postMessage(new_data);
});