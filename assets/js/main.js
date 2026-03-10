// ─── CONFIG ─────────────────────────────────────────────────
const WHATSAPP = '55XXXXXXXXXXX'; // Substituir pelo número real
const LINKS = {
    ifood: 'https://ifood.com.br/...', // Substituir
    yooga: 'https://...',              // Substituir
    whatsapp: WHATSAPP
};
// ─────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ─── 1. Navbar scroll ───
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('navbar-scrolled', window.scrollY > 60);
    }, { passive: true });

    // ─── 2. IntersectionObserver — Reveal Animations ───
    const reveals = document.querySelectorAll('.reveal');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!prefersReducedMotion) {
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Staggered delay for grid/row children
                    const parent = entry.target.parentElement;
                    if (parent) {
                        const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal'));
                        const idx = siblings.indexOf(entry.target);
                        if (idx > 0) {
                            entry.target.style.transitionDelay = `${idx * 0.1}s`;
                        }
                    }
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target); // animate only once
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        reveals.forEach(r => revealObserver.observe(r));
    } else {
        // Reduced motion: show everything immediately
        reveals.forEach(r => {
            r.style.opacity = '1';
            r.style.transform = 'none';
        });
    }

    // ─── 3. Active nav link ───
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.2 });

    sections.forEach(s => sectionObserver.observe(s));

    // ─── 4. GLightbox ───
    if (typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true,
            skin: 'clean',
            openEffect: 'fade',
            closeEffect: 'fade'
        });
    }

    // ─── 5. Configure links ───
    const linkIfood = document.getElementById('link-ifood');
    const linkYooga = document.getElementById('link-yooga');
    const linkWhatsapp = document.getElementById('link-whatsapp');
    const fullMenuBtn = document.getElementById('full-menu-btn');

    if (linkIfood) linkIfood.href = LINKS.ifood;
    if (linkYooga) linkYooga.href = LINKS.yooga;
    if (linkWhatsapp) linkWhatsapp.href = `https://wa.me/${LINKS.whatsapp}`;
    if (fullMenuBtn) fullMenuBtn.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Olá! Gostaria de ver o cardápio completo do Quintal do Morumbi.')}`;

    const linkWaNums = document.querySelectorAll('.link-wa-num');
    linkWaNums.forEach(el => {
        el.href = `https://wa.me/${WHATSAPP}`;
    });

    // ─── 6. WhatsApp reservation button ───
    const btnWaReserva = document.querySelector('.btn-wa-reserva');
    if (btnWaReserva) {
        btnWaReserva.addEventListener('click', (e) => {
            e.preventDefault();
            const msg = encodeURIComponent('Olá! Gostaria de solicitar uma reserva para um evento no Quintal do Morumbi.');
            window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
        });
    }

    // ─── 7. Close mobile menu on link click ───
    const menuToggle = document.getElementById('navbarContent');
    if (menuToggle) {
        const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });
        document.querySelectorAll('.navbar-nav .nav-link').forEach(l => {
            l.addEventListener('click', () => {
                if (window.innerWidth < 992) bsCollapse.hide();
            });
        });
    }
});
