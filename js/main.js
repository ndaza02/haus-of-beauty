// Haus Of Beauty - Dark Luxury Theme Interactions

// Initialize Lucide Icons
lucide.createIcons();

// GSAP
gsap.registerPlugin(ScrollTrigger);

// ===== LOADER =====
const loader = document.getElementById('loader');
if (loader) {
    const loaderImage = document.querySelector('.loader-image');
    if (loaderImage) {
        // Fade in the splash image
        gsap.to(loaderImage, {
            opacity: 1, scale: 1, duration: 0.8, ease: "power2.out", delay: 0.2,
            onComplete: () => {
                // Hold the image visible, then fade out the loader
                setTimeout(() => {
                    gsap.to(loader, {
                        opacity: 0, duration: 0.6, ease: "power2.out",
                        onComplete: () => { loader.style.display = 'none'; }
                    });
                }, 1200);
            }
        });
    } else {
        // Fallback: just hide loader after a short delay
        setTimeout(() => {
            gsap.to(loader, {
                opacity: 0, duration: 0.6, ease: "power2.out",
                onComplete: () => { loader.style.display = 'none'; }
            });
        }, 1000);
    }
}

// ===== MOBILE MENU =====
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function closeMobileMenu() {
    if (mobileMenu) mobileMenu.classList.add('hidden');
}

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
}
if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
}

// ===== NAVBAR GLASS EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('py-2', 'bg-white/95', 'shadow-md');
        navbar.classList.remove('py-4', 'bg-white/90', 'shadow-sm');
    } else {
        navbar.classList.remove('py-2', 'bg-white/95', 'shadow-md');
        navbar.classList.add('py-4', 'bg-white/90', 'shadow-sm');
    }
});

// ===== HERO ANIMATIONS =====
const heroTl = gsap.timeline({ delay: 1.5 });
heroTl
    .fromTo("#hero-bg", { scale: 1.1 }, { scale: 1, duration: 2, ease: "power2.out" })
    .fromTo(".hero-content > span", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=1.5")
    .fromTo(".hero-content > h1", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, "-=1.2")
    .fromTo(".hero-content > p", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, "-=0.9")
    .fromTo(".hero-content > div", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }, "-=0.7");

// Navbar slide down — use fromTo to guarantee final visible state
gsap.set("#navbar", { y: 0, opacity: 1 }); // ensure visible immediately
gsap.fromTo("#navbar",
    { y: -80, opacity: 0 },
    {
        y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.3,
        onComplete: () => { // remove inline styles so CSS takes over
            const nb = document.getElementById('navbar');
            if (nb) { nb.style.transform = ''; nb.style.opacity = ''; }
        }
    }
);

// ===== SCROLL REVEAL =====
gsap.utils.toArray('.gs-reveal').forEach(elem => {
    ScrollTrigger.create({
        trigger: elem,
        start: "top 85%",
        onEnter: () => {
            gsap.fromTo(elem,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
            );
        },
        once: true
    });
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const btn = item.querySelector('.faq-btn');
    btn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(faq => faq.classList.remove('active'));
        if (!isActive) item.classList.add('active');
    });
});

// ===== REVIEW SLIDER =====
const slider = document.getElementById('review-slider');
function scrollSlider(direction) {
    if (!slider) return;
    const cardWidth = slider.querySelector('.review-card').offsetWidth + 20;
    slider.scrollBy({ left: direction * cardWidth, behavior: 'smooth' });
}

// Draggable slider
if (slider) {
    let isDown = false, startX, scrollLeft;
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener('mouseleave', () => isDown = false);
    slider.addEventListener('mouseup', () => isDown = false);
    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        slider.scrollLeft = scrollLeft - (x - startX) * 2;
    });
}

// ===== SERVICE ACCORDION =====
const svcCategories = document.querySelectorAll('.svc-category');
svcCategories.forEach(cat => {
    const btn = cat.querySelector('.svc-category-btn');
    btn.addEventListener('click', () => {
        const isActive = cat.classList.contains('active');
        svcCategories.forEach(c => c.classList.remove('active'));
        if (!isActive) cat.classList.add('active');
        // Re-init Lucide icons for newly visible content
        lucide.createIcons();
    });
});

// ===== SERVICE SEARCH =====
const serviceSearch = document.getElementById('serviceSearch');
if (serviceSearch) {
    serviceSearch.addEventListener('input', (e) => {
        const q = e.target.value.toLowerCase().trim();
        svcCategories.forEach(cat => {
            const cards = cat.querySelectorAll('.svc-card');
            let hasMatch = false;
            cards.forEach(card => {
                const name = card.querySelector('h4').textContent.toLowerCase();
                const match = !q || name.includes(q);
                card.style.display = match ? '' : 'none';
                if (match) hasMatch = true;
            });
            cat.style.display = hasMatch ? '' : 'none';
            if (q && hasMatch) {
                cat.classList.add('active');
            } else if (!q) {
                cat.classList.remove('active');
                cat.style.display = '';
            }
        });
        lucide.createIcons();
    });
}

// ===== PARALLAX =====
gsap.to("header img", {
    yPercent: 20,
    ease: "none",
    scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

// ===== PORTFOLIO ANIMATIONS =====
gsap.utils.toArray('.portfolio-item').forEach((item, i) => {
    gsap.from(item, {
        scrollTrigger: { trigger: item, start: "top 85%" },
        y: 60,
        opacity: 0,
        duration: 0.8,
        delay: i * 0.15,
        ease: "power3.out"
    });
});

// ===== HOVER EFFECTS =====
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('mouseenter', () => gsap.to(button, { scale: 1.03, duration: 0.3, ease: "power2.out" }));
    button.addEventListener('mouseleave', () => gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" }));
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMobileMenu();
        }
    });
});

// ===== FOOTER ANIMATION =====
gsap.from("footer", {
    scrollTrigger: { trigger: "footer", start: "top 90%" },
    y: 50, opacity: 0, duration: 1, ease: "power3.out"
});

// ===== STICKY CTA (MOBILE) =====
const stickyCta = document.getElementById('stickyCta');
const floatingIg = document.getElementById('floatingIg');
if (stickyCta) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500 && window.innerWidth < 769) {
            stickyCta.classList.add('show');
            if (floatingIg) floatingIg.style.bottom = '80px';
        } else {
            stickyCta.classList.remove('show');
            if (floatingIg) floatingIg.style.bottom = '24px';
        }
    });
}

// ===== REVIEW CARDS BATCH ANIMATION =====
gsap.set(".review-card", { opacity: 0, y: 40 });
ScrollTrigger.batch(".review-card", {
    onEnter: batch => gsap.to(batch, {
        opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "power3.out", overwrite: true
    }),
    start: "top 90%",
    once: true
});
