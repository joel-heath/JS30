const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
const cities = [];
fetch(endpoint).then(response => response.json()).then(data => cities.push(...data));

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
const suggestionsINIT = `<li>Filter for a city</li><li>Or a state</li>`;

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
        const regex = RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}

function displayMatches() {
    const matches = findMatches(this.value, cities).sort((a, b) => b.population - a.population);
    const html = matches.map(place => {
        const regex = new RegExp(this.value, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
        return `<li onclick="handleClick(this)">
                <span class="name">${cityName}, ${stateName}</span>
                <span class="population">${numberWithCommas(place.population)}</span>
            </li>`;
    }).join('');

    suggestions.innerHTML = (this.value === '' || matches.length === 0) ? suggestionsINIT : html;
}

function handleClick(el) {
    searchInput.value = el.querySelector('.name').innerHTML
        .replaceAll('<span class="hl">', '').replaceAll('</span>', '') // remove highlight span html
        .split(' ').map(w => w[0].toUpperCase() + w.substring(1).toLowerCase()).join(' '); // convert to title case
}

//searchInput.addEventListener('change', findMatches);
searchInput.addEventListener('keyup', displayMatches);