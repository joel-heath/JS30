const konami = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'a', 'b'];
const keys = [];
const sequence = 'password'
const music = document.querySelector('.music');
const solved = document.querySelector('.solved');
const area = document.querySelector('.area');
const headers = document.querySelector('main').children;

window.addEventListener('keyup', (e) => {
    keys.push(e.key);
    keys.splice(-konami - 1, keys.length - konami.length);
    if (keys.join('').includes(sequence) || keys.length === konami.length && keys.every((v, i) => v === konami[i])) {
        solved.play();
        music.pause();
        area.classList.add('solved')
        headers[0].innerText = "What? I had NO idea!";
        headers[1].innerText = "There was a secret code!?";
        headers[2].innerText = "That's crazy, I had no clue!";
        headers[3].innerText = "I can't believe you worked that out!"
        headers[4].innerText = "You probably shouldn't tell anyone else though,";
        headers[5].innerText = "The person who put that secret there probably wanted it to stay a secret.";
    }
});