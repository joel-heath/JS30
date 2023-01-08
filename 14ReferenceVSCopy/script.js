console.groupCollapsed('Primitive data types: numbers, booleans, strings, all copy the data.');
    let age1 = 100;
    let age2 = age1;
    console.log({age1}, {age2});
    age1 = 200;
    console.log({age1}, {age2});

    let name1 = 'Joel';
    let name2 = name1;
    console.log({name1}, {name2});
    name1 = 'Wes';
    console.log({name1}, {name2});
console.groupEnd('Primitive data types: numbers, booleans, all copy the data.');


console.groupCollapsed('However, arrays create a reference to the first array, meaning changing one changes the other.');
    let players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
    let team = players;
    console.log({players}, {team});
    team[3] = 'Lux';
    console.log({players}, {team});
console.groupEnd('However, arrays create a reference to the first array, meaning changing one changes the other.');

console.groupCollapsed('Instead, explicitly copy the array with array.slice(), or [...array].');
    players = ['Wes', 'Sarah', 'Ryan', 'Poppy'];
    team = [...players];
    console.log({players}, {team});
    team[3] = 'Lux';
    console.log({players}, {team});
console.groupEnd('Instead, explicitly copy the array with array.slice(), or [...array].');

console.groupCollapsed('The same thing goes for objects.');
    let person = { name: 'Wes Bos', age: 80 };
    let captain = person;
    console.log(person, captain);
    captain.age = 99;
    console.log(person, captain);
console.groupEnd('The same thing goes for objects.');

console.groupCollapsed('Copy an object with Object.assign({}, oldObject, {propertyToOverwrite: newValue}), or {...object}.');
    person = { name: 'Wes Bos', age: 80 };
    captain = {...person};
    console.log(person, captain);
    captain.age = 99;
    console.log(person, captain);
console.groupEnd('The same thing goes for objects.');

console.info('This is only one layer deep, to do a deep copy, use const clone = structuredClone(original);');