// to stop hundreds of scroll events;
function debounce(func, wait = 10, immediate = true) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        var later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function checkSlide(e) {
    images.forEach(image => {
        const slideInAt = (window.scrollY + window.innerHeight) - image.height / 2;
        const imageBottom = image.offsetTop + image.height;
        const isHalfShown = slideInAt > image.offsetTop;
        const scrolledPast = window.scrollY > imageBottom;
        
        if (isHalfShown && !scrolledPast) {
            if (!image.classList.contains('active')) {
                audio.currentTime = 0;
                audio.play();
            }
            image.classList.add('active');
            
        }
        else {
            image.classList.remove('active');
        }
    });
}

const images = document.querySelectorAll('.slide-in');
const audio = document.querySelector('#slide');
window.addEventListener('scroll', debounce(checkSlide));