const bands = ['The Plot in You', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

function strip (s) {
    return s.replace(/^(a +|the +|an +)/i, '');
}

const sorted = bands.sort((a, b) => strip(a).localeCompare(strip(b)));
document.querySelector('#bands').innerHTML = sorted.map(b => `<li>${b}</li>`).join('');