// Dynamic title text alternation
document.addEventListener('DOMContentLoaded', function () {
    const titleElement = document.getElementById('dynamic-title');
    const texts = [
        'Üdvözlünk a magyar MI olimpiák oldalán!',
        'Welcome to the Hungarian AI Olympiad!'
    ];
    titleElement.innerHTML = texts[0];
    let currentIndex = 0;

    function switchText() {
        titleElement.style.opacity = '0';

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % texts.length;
            titleElement.textContent = texts[currentIndex];
            titleElement.style.opacity = '1';
        }, 500);
    }

    // Change text every 4 seconds
    setInterval(switchText, 3000);
});
