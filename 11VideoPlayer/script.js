const player = document.querySelector('.player');
const movie = player.querySelector('.viewer');
const controls = player.querySelector('.player__controls');
const progress = player.querySelector('.progress');
const progBar = progress.querySelector('.progress__filled');

const play = controls.querySelector('.toggle');
const ranges = controls.querySelectorAll('.player__slider');
const volume = controls.querySelector('input[name="volume"]');
const speed = controls.querySelector('input[name="playbackRate"]');
const skipButtons = controls.querySelectorAll('[data-skip]');
const fullscreenButton = controls.querySelector('.fullscreen');

function togglePlay() {
    if (!isFullscreen) {
        if (movie.paused) movie.play();
        else movie.pause();
        updateButton();
    }
}

function updateButton() {
    play.textContent = this.paused ? '►' : '❚ ❚';
}

function skip() {
    movie.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
    movie[this.name] = this.value;
}

function handleProgress() {
    progBar.style.flexBasis = `${movie.currentTime / movie.duration * 100}%`;
}

function scrub(e) {
    movie.currentTime = e.offsetX / progress.clientWidth * movie.duration;
}

function fullscreen(e) {
    if (movie.requestFullscreen) 
        movie.requestFullscreen().then(() => isFullscreen = false);
    else if (movie.webkitRequestFullscreen) 
        movie.webkitRequestFullscreen();
    else if (movie.msRequestFullScreen) 
        movie.msRequestFullScreen();
}

play.addEventListener('click', togglePlay);
movie.addEventListener('click', togglePlay);
movie.addEventListener('play', updateButton);
movie.addEventListener('pause', updateButton);
movie.addEventListener('timeupdate', handleProgress);
skipButtons.forEach(b => b.addEventListener('click', skip));
ranges.forEach(r => r.addEventListener('mousemove', handleRangeUpdate));

let clicked = false;
progress.addEventListener('mousemove', (e) => clicked && scrub(e));
progress.addEventListener('mousedown', () => clicked = true);
progress.addEventListener('mouseup', () => clicked = false);

let isFullscreen = false;
fullscreenButton.addEventListener('click', fullscreen);
document.addEventListener('fullscreenchange', () => isFullscreen = !isFullscreen);