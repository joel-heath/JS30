const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-filled');
const video = document.querySelector('video');
let clicked = false;

function scrub(e) {
    const y = e.pageY - speed.offsetTop;
    const amount = y / speed.offsetHeight;
    const min = 0.5, max = 4;
    const playbackRate = amount * (max - min) + min;
    bar.style.height = `${Math.round(amount * 100)}%`;
    bar.textContent = playbackRate.toFixed(1) + 'x';
    video.playbackRate = playbackRate;
}

speed.addEventListener('mousemove', (e) => clicked && scrub(e));
speed.addEventListener('mousedown', () => clicked = true);
document.addEventListener('mouseup', () => clicked = false);
document.addEventListener('mouseleave', () => clicked = false);