const secHand = document.querySelector('.sec-hand');
const minHand = document.querySelector('.min-hand');
const hourHand = document.querySelector('.hour-hand');
const sfx = document.querySelector('#clock-tick');

function setDate() {
    sfx.play();
    const now = new Date();
    const seconds = now.getSeconds();
    const secDegrees = seconds * 6 + 90; // == (seconds / 60) * 360 + 90
    secHand.style.transform = `rotate(${secDegrees}deg)`;
    
    const minutes = now.getMinutes();
    const minDegrees = minutes * 6 + 90;
    minHand.style.transform = `rotate(${minDegrees}deg)`;

    const hours = now.getHours();
    const hourDegrees = hours * 6 + 90;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

setInterval(setDate, 1000);