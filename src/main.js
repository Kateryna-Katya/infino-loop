document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Инициализация иконок Lucide
    lucide.createIcons();

    // 2. Lenis Smooth Scroll
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 3. Анимация Hero (SplitType + GSAP)
    if (typeof SplitType !== 'undefined') {
        const heroTitle = new SplitType('#hero-title', { types: 'chars' });
        gsap.to(heroTitle.chars, {
            y: 0,
            opacity: 1,
            stagger: 0.02,
            duration: 1,
            ease: "power4.out",
            delay: 0.5
        });
    }

    // 4. Мобильное меню (Burger Logic)
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    const toggleMenu = () => {
        burger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    };

    burger.addEventListener('click', toggleMenu);
    
    // Закрытие меню при клике на ссылку
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // 5. Валидация телефона (только цифры и +)
    const phoneInput = document.getElementById('phoneInput');
    if(phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/[^0-9+]/g, '');
        });
    }

    // 6. Математическая капча
    const captchaLabel = document.getElementById('captchaLabel');
    const captchaInput = document.getElementById('captchaInput');
    if(captchaLabel) {
        const n1 = Math.floor(Math.random() * 10) + 1;
        const n2 = Math.floor(Math.random() * 5) + 1;
        const result = n1 + n2;
        captchaLabel.textContent = `${n1} + ${n2} = ?`;

        // 7. Обработка формы
        const mainForm = document.getElementById('mainForm');
        const formStatus = document.getElementById('formStatus');

        mainForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = mainForm.querySelector('button');

            if (parseInt(captchaInput.value) !== result) {
                alert('Ошибка в капче. Попробуйте снова.');
                return;
            }

            btn.textContent = 'Отправка данных...';
            btn.disabled = true;

            setTimeout(() => {
                mainForm.style.display = 'none';
                formStatus.innerHTML = `
                    <h3>Заявка принята!</h3>
                    <p>Наш эксперт в Париже свяжется с вами в течение 15 минут. Платформа активирована.</p>
                `;
                formStatus.classList.add('success');
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 1500);
        });
    }

    // 8. Cookie Popup
    const cookiePopup = document.getElementById('cookiePopup');
    const cookieAccept = document.getElementById('cookieAccept');
    if (cookiePopup && !localStorage.getItem('cookiesAccepted')) {
        setTimeout(() => cookiePopup.classList.add('active'), 3000);
    }
    if (cookieAccept) {
        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookiesAccepted', 'true');
            cookiePopup.classList.remove('active');
        });
    }

    // 9. Анимация появления секций при скролле (GSAP ScrollTrigger)
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.evo-card, .case-card, .tech__item').forEach(card => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power2.out"
        });
    });
});