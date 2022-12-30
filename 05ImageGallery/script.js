const panels = document.querySelectorAll('.panel');
const open = document.querySelector('#open');
const close = document.querySelector('#close');

function toggleOpen() {
    this.classList.toggle('open');
    if (this.classList.contains('open')) {
        open.currentTime = 0;
        open.play();
    }
    else {
        close.currentTime = 0;
        close.play();
    }
}

function toggleActive(e) { 
    if (e.propertyName.includes('flex')) {
        this.classList.toggle('open-active');
    }
}

panels.forEach(p => p.addEventListener('click', toggleOpen));
panels.forEach(p => p.addEventListener('transitionend', toggleActive));