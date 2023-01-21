const items = document.querySelector('.items');
let mouseDown = false;
let lastX = 0;
let dLastX = 0;

function mouseScroll(e) {
    if (!mouseDown) return;

    const scrollAmount = (lastX - e.clientX) * 1.5;
    items.scrollLeft += scrollAmount;
    dLastX = lastX;
    lastX = e.clientX;
}

function stopScroll(e) {
    mouseDown = false;
    const dist = (dLastX - e.clientX) * 10;
    const interval = [];
    for (let i = 0; i < 100; i++) {
        interval.push(setTimeout(() => {
            if (mouseDown) interval.forEach(i => clearTimeout(i));
            items.scrollLeft += (dist / (i+2));
        }, i * 10));
    }
}

items.addEventListener('mousedown', (e) => {
    mouseDown = true;
    lastX = e.clientX;
});
items.addEventListener('mouseup', stopScroll);
items.addEventListener('mouseleave', () => mouseDown = false);
items.addEventListener('mousemove', mouseScroll);