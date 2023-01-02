const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

ctx.font = '10vw Georgia';
ctx.textAlign = "center";
/*ctx.textBaseline = 'middle';*/
ctx.fillText("Draw!", canvas.width/2, canvas.height/2);

ctx.strokeStyle = '#ff0000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 50;
ctx.globalCompositeOperator = 'subtract';

let isDrawing = 0; // 0 not drawing, 1 erasing, 2 drawing
let lastX = 0;
let lastY = 0;
let hue = 0;
let scale = 1;
let direction = true;

const drawSFX = document.querySelector('#draw');
const eraseSFX = document.querySelector('#erase');

function draw(x, y) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();

    [lastX, lastY] = [x, y];
}

function color(e) {
    if (isDrawing == 0) return;
    if (isDrawing == 1) {
        ctx.strokeStyle = `#ffffff`;
        ctx.lineWidth = 75*scale;
        eraseSFX.play();
    } else {
        if (ctx.lineWidth >= (80*scale) || ctx.lineWidth <= (5*scale)) {
            direction = !direction;
        }
        ctx.lineWidth = ((ctx.lineWidth/scale) + (direction ? 1 : -1))*scale;
        ctx.strokeStyle = `hsl(${hue = ++hue % 360}, 100%, 50%)`;
        drawSFX.play();
    }
    
    draw(e.offsetX, e.offsetY);
}

function zoom(e) {
    e.preventDefault();
    scale += e.deltaY * -0.001;
    scale = Math.min(Math.max(.1, scale), 5);
}

function mouseUp(e) {
    isDrawing = e.button == 0 || e.button == 2 ? 0 : isDrawing;
    drawSFX.pause();
    drawSFX.currentTime = 0;
    eraseSFX.pause();
    eraseSFX.currentTime = 0;
}
function mouseDown(e) {
    [lastX, lastY] = [e.offsetX, e.offsetY];
    isDrawing = e.button == 0 ? 2 : e.button == 2 ? 1 : isDrawing;
}

canvas.addEventListener('mousemove', color);
canvas.addEventListener('mouseup', mouseUp);
canvas.addEventListener('mouseout', mouseUp);
canvas.addEventListener('mousedown', mouseDown);
canvas.oncontextmenu = function(e) { e.preventDefault(); e.stopPropagation(); }
canvas.onwheel = zoom;