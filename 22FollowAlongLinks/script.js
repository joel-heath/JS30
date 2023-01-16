const links = document.querySelectorAll('a');
const highlight = document.createElement('span');
const vroom = document.querySelector('#vroom');
highlight.classList.add('highlight');
document.body.append(highlight);

function highlightLink() {
    vroom.currentTime = 0; vroom.play();
    const linkCoords = this.getBoundingClientRect();
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        top: linkCoords.top + window.scrollY,
        left: linkCoords.left + window.scrollX
    }
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
    setTimeout(() => highlight.style.transition = `all 0.2s`, 2);
}

links.forEach(l => l.addEventListener('mouseenter', highlightLink));