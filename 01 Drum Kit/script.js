function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audio) return;
    // stop playing open hat if closed hat is played
    if (e.keyCode === 82) document.querySelector(`audio[data-key="84"]`).pause();
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}
function playMidi(note) {
    const audio = document.querySelector(`audio[data-midi="${note}"]`);
    const key = document.querySelector(`.key[data-midi="${note}"]`);
    if (!audio) return;
    // stop playing open hat if closed hat is played
    if (note === 42) document.querySelector(`audio[data-key="84"]`).pause();
    audio.currentTime = 0;
    audio.play();
    key.classList.add('playing');
}


function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound)


if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess().then(success, failure);
}

function success(midiAccess) {
    //midiAccess.onstatechange = updateDevices(); alternative syntax
    //midiAccess.addEventListener('statechange', updateDevices);
    //console.log(midiAccess);
    const inputs = midiAccess.inputs;
    //console.log(inputs);

    inputs.forEach((input) => {
        input.addEventListener('midimessage', handleInput);
    });
}

function handleInput(e) {
    const command = e.data[0];
    const note = e.data[1];
    const velocity = e.data[2];
    if (command === 144 && velocity > 0) {
        playMidi(note);
    }
}

function failure() {
    console.error(`Failed to get MIDI access - ${msg}`);
}