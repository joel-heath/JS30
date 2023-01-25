const button = document.querySelector('button');
const game = document.querySelector('.game');
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const SFXbonk = document.querySelector('#SFX-bonk');
const SFXmusic = document.querySelector('#SFX-game-loop');
const SFXstart = document.querySelector('#SFX-start-game');
const highscoreLabel = document.querySelector('h2');
let highscore = parseInt(localStorage.getItem('highscore')) || 0;
highscoreLabel.textContent = `Highscore: ${highscore}`;
let lastHole, timeUp, score;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add('up');
    const mole = hole.querySelector('.mole');
    mole.addEventListener('click', bonk, { once: true });
    setTimeout(() => {
        hole.classList.remove('up');
        setTimeout(() => mole.removeEventListener('click', bonk), 400); // let them click it while mole is animated away then stop
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    SFXstart.currentTime = 0; SFXstart.play();
    SFXmusic.pause();
    game.style.display = 'flex';
    button.style.display = 'none';
    timeUp = true;
    scoreBoard.textContent = 0;
    score = 0;
    setTimeout(() => {
        SFXmusic.volume = 1; SFXmusic.currentTime = 0; SFXmusic.play();
        timeUp = false;
        peep();
        setTimeout(() => {
            timeUp = true;
            var fadeAudio = setInterval(() => {
                if ((SFXmusic.currentTime >= 2) && (SFXmusic.volume != 0.0)) SFXmusic.volume -= 0.1;
                if (SFXmusic.volume === 0.0) {
                    clearInterval(fadeAudio);
                    
                }
            }, 200);
        }, 10000);
    }, 1000);
}

function bonk(e) {
    if (!e.isTrusted) return;
    SFXbonk.currentTime = 0; SFXbonk.play();
    score++;
    if (score > highscore) {
        highscore = score;
        localStorage.setItem('highscore', highscore);
        highscoreLabel.textContent = `Highscore: ${highscore}`;
    }
    this.offsetParent.classList.remove('up');
    scoreBoard.textContent = score;
}

moles.forEach(m => m.addEventListener('click', bonk));