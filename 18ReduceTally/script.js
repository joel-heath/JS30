const videos = [...document.querySelectorAll('[data-time]')];

let remaining = videos.reduce((acc, v) => {
    let a = v.dataset.time.split(':');
    return acc + 60 * parseInt(a[0]) + parseInt(a[1]);
}, 0);

let totalTime = Math.floor(remaining / 3600) + ':';
remaining %= 3600;
totalTime += Math.floor(remaining / 60) + ':';
remaining %= 60;
totalTime += remaining;

console.log(totalTime);
document.querySelector('h1').innerText = `Total Time: ${totalTime}.`;