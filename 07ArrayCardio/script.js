const people = [
    { name: 'Wes', year: 1988 },
    { name: 'Kait', year: 1986 },
    { name: 'Irv', year: 1970 },
    { name: 'Lux', year: 2015 }
];

const comments = [
    { text: 'Love this!', id: 523423 },
    { text: 'Super good', id: 823423 },
    { text: 'You are the best', id: 2039842 },
    { text: 'Ramen is my fav food ever', id: 123523 },
    { text: 'Nice Nice Nice!', id: 542328 }
];

const currentYear = new Date().getFullYear();

console.log("Array.prototype.some()" + "\n" +
            "1. Is at least one person 19 or older?");
const some = people.some(p => currentYear - p.year >= 19);
console.log(some);

console.log("Array.prototype.every()" + "\n" +
            "2. Is everyone 19 or older?");
const every = people.every(p => currentYear - p.year >= 19);
console.log(every);

// Find is like filter, but instead returns just the one you are looking for
console.log("Array.prototype.find()" + "\n" +
            "3. Find the comment with the ID of 823423.");
const find = comments.find(p => p.id === 823423);
console.log(find);

console.log("Array.prototype.findIndex()" + "\n" +
            "4. Delete the comment with the ID of 823423.");
const index = comments.findIndex(p => p.id === 823423);
console.log(`Removing comments[${index}]: ${comments[index].text}`);
comments.splice(index, 1);
console.table(comments);