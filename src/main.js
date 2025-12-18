// 1. Инициализация икон и плавного скролла
lucide.createIcons();
const lenis = new Lenis();
function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);

// 2. Анимация заголовка Hero
const heroTitle = new SplitType('#hero-title', { types: 'chars' });
gsap.to(heroTitle.chars, {
    y: 0, opacity: 1, stagger: 0.02, duration: 1, ease: "power4.out", delay: 0.5
});

// 3. Валидация телефона (только цифры)
const phoneInput = document.getElementById('phoneInput');
phoneInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9+]/g, '');
});

// 4. Математическая капча
const captchaLabel = document.getElementById('captchaLabel');
const num1 = Math.floor(Math.random() * 10) + 1;
const num2 = Math.floor(Math.random() * 10) + 1;
const correctAnswer = num1 + num2;
captchaLabel.textContent = `${num1} + ${num2} = ?`;

// 5. Обработка формы (AJAX имитация)
const mainForm = document.getElementById('mainForm');
const formStatus = document.getElementById('formStatus');

mainForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userAnswer = document.getElementById('captchaInput').value;

    if (parseInt(userAnswer) !== correctAnswer) {
        alert('Неверный ответ капчи!');
        return;
    }

    // Имитация отправки
    const btn = mainForm.querySelector('button');
    btn.textContent = 'Отправка...';
    btn.disabled = true;

    setTimeout(() => {
        mainForm.style.display = 'none';
        formStatus.textContent = 'Успешно! Ваша заявка принята. Платформа уже доступна в Европе, мы свяжемся с вами в течение 15 минут.';
        formStatus.classList.add('success');
    }, 1500);
});

// 6. Cookie Popup
const cookiePopup = document.getElementById('cookiePopup');
const cookieAccept = document.getElementById('cookieAccept');

if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => cookiePopup.classList.add('active'), 2000);
}

cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookiePopup.classList.remove('active');
});

// 7. Скролл-анимации для секций (GSAP)
gsap.utils.toArray('.evo-card, .tech__item, .blog-card').forEach(el => {
    gsap.from(el, {
        scrollTrigger: {
            trigger: el,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });
});