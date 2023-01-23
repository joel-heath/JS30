let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const tick = document.querySelector('#clock-tick');
const timesup = document.querySelector('#timer-expire');

function timer(seconds) {
    const now = Date.now();
    const then = now + seconds * 1000;
    const displayHours = seconds >= 3600;
    displayTimeLeft(seconds, displayHours);
    displayEndTime(then);
    tick.currentTime = 0; tick.play();
    countdown = setInterval(() => {
        const secondsRemaining = Math.round((then - Date.now()) / 1000);
        if (secondsRemaining < 0) {
            timesup.play();
            clearInterval(countdown);
            return;
        }
        tick.currentTime = 0; tick.play();
        displayTimeLeft(secondsRemaining, displayHours);
    }, 1000);
}

function displayTimeLeft(totalSeconds, displayHours) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(totalSeconds % 3600 / 60);
    const seconds = totalSeconds % 60;
    const display = `${displayHours ? (hours < 10 ? '0' : '') + hours + ':' : ''}${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    timerDisplay.textContent = display;
    document.title = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();
    //const seconds = end.getSeconds();
    endDisplay.textContent = `Be back at ${hour < 10 ? '0' : ''}${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function buttonClick(e) {
    const seconds = parseInt(this.dataset.time);
    clearInterval(countdown);
    timer(seconds);

    const button = e.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
  
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.offsetLeft - radius}px`;
    circle.style.top = `${e.clientY - button.offsetTop - radius}px`;
    circle.classList.add('ripple');
  
    const ripple = button.getElementsByClassName('ripple')[0];
  
    if (ripple) {
      ripple.remove();
    }
  
    button.appendChild(circle);
}



buttons.forEach(b => b.addEventListener('click', buttonClick));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    clearInterval(countdown);
    timer(this.minutes.value * 60);
    this.reset();
});