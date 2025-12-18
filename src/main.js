// Initialize Lucide Icons
lucide.createIcons();

// Lenis Smooth Scroll
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Header Scroll Effect
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.background = 'rgba(5, 7, 10, 0.8)';
        header.style.padding = '10px 0';
    } else {
        header.style.background = 'transparent';
        header.style.padding = '20px 0';
    }
});

// Глобальная анимация появления элементов (задел на будущее)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});