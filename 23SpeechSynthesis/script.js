const msg = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
msg.text = document.querySelector('[name="text"]').value;

function setVoice() {
    msg.voice = voices.find(v => v.name === this.value);
    toggle();
}

function toggle(startOver = true) {
    speechSynthesis.cancel();
    if (startOver) 
        speechSynthesis.speak(msg);
}

function setOption() {
    msg[this.name] = this.value;
    toggle();
}

function populateVoices() {
    voices = this.getVoices();
    voicesDropdown.innerHTML = voices
        .filter(a => a.lang.includes('en'))
        .sort(a => a.lang.includes('GB') || a.lang.includes('US') ? -1 : 1)
        .map(v => `<option value="${v.name}">${v.name} (${v.lang})</option>`)
        .join('');
}
speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(o => o.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', () => toggle(false))