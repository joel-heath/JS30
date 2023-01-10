const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
let walk = 30;

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;
    let { offsetX: x, offsetY: y } = e;

    if (this !== e.target) { // this is hero, target is where mouse is over (will change offset x and y when hovering over hero)
        x += e.target.offsetLeft;
        y += e.target.offsetTop;
    }

    if (text.innerText.toLowerCase().includes('awesome')) {
        walk = 100;
        const xWalk = (x / width * walk) - (walk / 2);
        const yWalk = (y / height * walk) - (walk / 2);
        text.style.textShadow = 
            `${-xWalk}px ${-yWalk}px 0 rgba(255, 0, 255, .5), ` + 
            `${xWalk}px ${-yWalk}px 0 rgba(0, 255, 255, .5), ` + 
            `${-xWalk}px ${yWalk}px 0 rgba(0, 255, 0, .5), ` +
            `${xWalk}px ${yWalk}px 0 rgba(0, 0, 255, .5)`;
    }
    else {
        walk = 30;
        const xWalk = (x / width * walk) - (walk / 2);
        const yWalk = (y / height * walk) - (walk / 2);
        text.style.textShadow = `${xWalk}px ${yWalk}px 0 rgba(0, 0, 0, .5)`;
    }
}

hero.addEventListener('mousemove', shadow);