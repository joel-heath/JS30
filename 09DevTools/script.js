function makeGreen(element) {
    element.style.color = '#008800';
}

const dogs = [{ name: 'Snickers', age: 2 }, { name: 'Hugo', age: 8 }];

// Regular
console.log('Hello, world!');

// Interpolated
console.log('Hello, %s %s %s %s', 'these','words', 'were', 'inserted!');

// Styled
console.log('%cHello, these words look %ccool!', 'color: #ff0000; font-size: large', 'font-weight: bold; color: #aa0000; font-size: large; text-decoration: underline;');

// warning!
if (dogs.length < 3) {
    console.warn('There are less than 3 dogs!');
}

// Error :|
if (!dogs.every(d => d.name && d.age && d.color)) {
    console.error("The dogs don't have names, ages, and favourite colors!");
}

// Info
console.info(`There are ${dogs.length} dogs`);

// Testing
const p = document.querySelector('p');
console.assert(p.classList.contains('cool'), "The paragraph does not contain the 'cool' class.");

// Clearing
console.info("Enter 'clear()' to clear the console")
const clear = () => console.clear();

// Viewing DOM Elements
console.dir(p);

// Grouping together
dogs.forEach(d => {
    console.groupCollapsed(d.name);
    console.log(`Name: ${d.name}`);
    console.log(`Age: ${d.age} years`);
    console.log(`Age: ${d.age*7} dog years`);
    console.groupEnd(d.name);
})


// counting
console.groupCollapsed('console.count()');
console.count('Hello.');
console.count('Goodbye.');
console.count('Goodbye.');
console.count('Goodbye.');
console.count('Hello.');
console.count('Hello.');
console.count('Goodbye.');
console.count('Goodbye.');
console.count('Goodbye.');
console.count('Hello.');
console.groupEnd('console.count()');

// timing
console.time('Fetching Data');
fetch('https://api.github.com/users/joel-heath')
    .then(data => data.json())
    .then(data => {
        console.timeEnd('Fetching Data');
        console.table(data);
    })