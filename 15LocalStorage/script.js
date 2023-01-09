const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];
addItems.addEventListener('submit', addItem);

const clear = document.querySelector('.clear');
const check = document.querySelector('.check');
const uncheck = document.querySelector('.uncheck');
clear.addEventListener('click', clearItems);
check.addEventListener('click', (e) => checkItems(e, true));
uncheck.addEventListener('click', (e) => checkItems(e, false));

const SFXsubmit = document.querySelector('#submit');
const SFXcheck = document.querySelector('#checkAll');
const SFXuncheck = document.querySelector('#uncheckAll');
const SFXclear = document.querySelector('#clearAll');
const SFXtick = document.querySelector('#tick');

function addItem(e) {
    e.preventDefault();
    SFXsubmit.play();
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
    this.reset();
}

function populateList(plates = [], platesList) {
    platesList.innerHTML = plates.map((p, i) =>  `<li>
        <input type="checkbox" data-index=${i} id="item${i}" ${p.done ? 'checked' : ''}>
        <label for="item${i}">${p.text}</label>
    </li>`).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return;
    SFXtick.play();
    const index = e.target.dataset.index;
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

function clearItems(e) {
    e.preventDefault();
    SFXclear.play();
    items.length = 0;
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
}

function checkItems(e, value) {
    e.preventDefault();
    if (value) SFXcheck.play();
    else SFXuncheck.play();
    items.forEach(item => item.done = value);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));
}

populateList(items, itemsList);
itemsList.addEventListener('click', toggleDone);