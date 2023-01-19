const divs = document.querySelectorAll('div');
const onceButton = document.querySelector('#once');

let propagate = true, capture = false;

function logText(e) {
    if (!propagate) e.stopPropagation(); // stop bubbling
    console.log(this.classList.value);
}

function toggleCapture() {
    capture = !capture;
    divs.forEach(d => d.removeEventListener('click', logText));
    divs.forEach(d => d.addEventListener('click', logText, { capture: capture }));
}

divs.forEach(d => d.addEventListener('click', logText));
once.addEventListener('click', () => console.log('You clicked the button! Away goes the event listener!'), { once: true });


console.log("When clicking an element, that element is clicked, but as is the parent, it's parent, it's parent and so on.");
console.log('e.stopPropagation() stops this bubbling of the event immediately.');
console.log('When adding an event listener, you can pass an options object.');
console.log('These options include capture & once.');
console.log('Capture causes the events to fire on capturing the element (so they will go in the order html -> body -> container -> container -> item).');
console.log('Once causes the first event to unbind the event listener.');

/* 
===============
run on the way down

divs.forEach(d => d.addEventListener('click', logText, {
    capture: true
}))
==================

===============================
remove event listener after firing

divs.forEach(d => d.addEventListener('click', logText, {
    once: true
}))
===============================
*/