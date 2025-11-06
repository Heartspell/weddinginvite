document.addEventListener('DOMContentLoaded', () => {
    /* ---------- Audio controls ---------- */
    const music = document.getElementById('music');
    const playBtn = document.getElementById('playBtn');
    const playPause = document.getElementById('playPause');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');

    function togglePlay() {
        if (!music) return;
        if (music.paused) {
            music.play().catch(()=>{}); // подавляем возможную ошибку autoplay
            if (playBtn) playBtn.textContent = '⏸';
            if (playPause) playPause.textContent = '⏸';
        } else {
            music.pause();
            if (playBtn) playBtn.textContent = '▶';
            if (playPause) playPause.textContent = '▶';
        }
    }

    if (playBtn) playBtn.addEventListener('click', togglePlay);
    if (playPause) playPause.addEventListener('click', togglePlay);

    if (prev) prev.addEventListener('click', () => {
        if (!music) return;
        music.currentTime = Math.max(0, (music.currentTime || 0) - 10);
    });

    if (next) next.addEventListener('click', () => {
        if (!music) return;
        // учитываем, что duration может быть NaN до загрузки метаданных
        const dur = isFinite(music.duration) ? music.duration : Infinity;
        music.currentTime = Math.min(dur, (music.currentTime || 0) + 10);
    });

    /* ---------- Scroll-triggered animations (IntersectionObserver) ---------- */
    const elements = document.querySelectorAll('.fade-in, .fade-left, .fade-right');
    if (elements.length) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.18,           // запуск когда ~18% видно
            rootMargin: '0px 0px -8% 0px' // чуть раньше — элемент считается в зоне видимости
        });

        elements.forEach(el => observer.observe(el));
    }
});

const title = document.querySelector('.title');

if (title) {
    const variants = [
        { text: "Адилет ♥ Гулзат", font: "'Marck Script', cursive" },
        { text: "Adilet ♡ Gulzat", font: "'Great Vibes', cursive" },
        { text: "Адилет & Гулзат", font: "'Bad Script', cursive" },
        { text: "Adilet ♡ Gulzat", font: "'Alex Brush', cursive" },
        { text: "Адилет и Гулзат", font: "'Caveat', cursive" },
        { text: "A+G", font: "'Tangerine', cursive" },
        { text: "Adilet ♥ Gulzat", font: "'Pacifico', cursive" },
        { text: "Адилет ♡ Гулзат", font: "'Comforter', cursive" },
        { text: "Adilet + Gulzat", font: "'Poiret One', cursive" },
        { text: "A ♡ G", font: "'Amatic SC', cursive" }
    ];

    let index = 0;

    function startFontCycle() {
        index = 0;
        title.textContent = variants[0].text;
        title.style.fontFamily = variants[0].font;

        const interval = setInterval(() => {
            index++;

            if (index >= variants.length) {
                clearInterval(interval);

                // ⏳ Возврат и пауза 5 сек
                title.textContent = variants[0].text;
                title.style.fontFamily = variants[0].font;
                setTimeout(startFontCycle, 5000);
                return;
            }

            title.classList.add('change');
            title.textContent = variants[index].text;
            title.style.fontFamily = variants[index].font;
            setTimeout(() => title.classList.remove('change'), 300);
        }, 1000);
    }

    startFontCycle();
}