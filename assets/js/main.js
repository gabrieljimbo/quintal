// ─── CONFIGURAÇÃO (editar antes de publicar) ───────────────────
const WHATSAPP = '55XXXXXXXXXXX'; // Substitua pelo número real
const LINKS = {
    ifood: 'https://ifood.com.br/...', // Substitua
    yooga: 'https://...',              // Substitua
    whatsapp: WHATSAPP
};
// ──────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });

    // 2. Active link highlighting & Reveal Animations (IntersectionObserver)
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Reveal effect
            if (entry.isIntersecting && entry.target.classList.contains('reveal')) {
                entry.target.classList.add('visible');
            }

            // Active Menu Link
            if (entry.isIntersecting && entry.target.tagName === 'SECTION') {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(s => observer.observe(s));
    reveals.forEach(r => observer.observe(r));

    // 3. GLightbox Initialization
    const lightbox = GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });

    // 4. Configurar Links de Pedido
    document.getElementById('link-ifood').href = LINKS.ifood;
    document.getElementById('link-yooga').href = LINKS.yooga;
    document.getElementById('link-whatsapp').href = `https://wa.me/${LINKS.whatsapp}`;
    document.getElementById('full-menu-btn').href = `https://wa.me/${WHATSAPP}?text=Ol%C3%A1!+Gostaria+de+ver+o+card%C3%A1pio+completo+do+Quintal+do+Morumbi.`;

    const linkWaNums = document.querySelectorAll('.link-wa-num');
    linkWaNums.forEach(el => {
        el.href = `https://wa.me/${WHATSAPP}`;
        el.textContent = `wa.me/${WHATSAPP}`;
    });

    // 5. Botão de Reserva para WhatsApp
    const btnWaReserva = document.querySelector('.btn-wa-reserva');
    if (btnWaReserva) {
        btnWaReserva.addEventListener('click', (e) => {
            e.preventDefault();
            const mensagem = `Olá! Gostaria de solicitar uma reserva para um evento no Quintal do Morumbi.`;
            const encodedMsg = encodeURIComponent(mensagem);
            const waUrl = `https://wa.me/${WHATSAPP}?text=${encodedMsg}`;
            window.open(waUrl, '_blank');
        });
    }

    // 6. Smooth Scroll Fix for Fixed Header (already handled by CSS scroll-padding-top)
    // Mas garantimos que o fechamento do menu mobile ocorra ao clicar
    const navLinksList = document.querySelectorAll('.navbar-nav .nav-link');
    const menuToggle = document.getElementById('navbarContent');
    const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

    navLinksList.forEach((l) => {
        l.addEventListener('click', () => {
            if (window.innerWidth < 992) {
                bsCollapse.hide();
            }
        });
    });
});
