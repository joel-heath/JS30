const boxes = [...document.querySelectorAll('.item input[type="checkbox"]')];
boxes.forEach(b => {
    b.onclick = function(e) { e.preventDefault(); }
    b.addEventListener('mousedown', click)

});
let lastClicked = boxes[0];

function click(e) {
    const toggle = !this.checked;
    
    if (e.shiftKey) {
        const a = boxes.indexOf(lastClicked);
        const b = boxes.indexOf(this);
        
        for (let i = Math.min(a,b); i <= Math.max(a,b); i++) {
            boxes[i].checked = toggle;
        }
    }
    else {
        this.checked = toggle;
    }

    lastClicked = this;
}