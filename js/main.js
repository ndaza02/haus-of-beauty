// Haus Of Beauty - Enhanced Animations and Interactions

// Initialize Lucide Icons
lucide.createIcons();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// ===== HERO SECTION ANIMATIONS =====

// Navbar slide down
gsap.from("#navbar", {
    y: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

// Hero content stagger animation
gsap.from(".hero-content > *", {
    y: 60,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out",
    delay: 0.3
});

// Hero cards slide in from right
gsap.from(".hero-card", {
    x: 120,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.8
});

// ===== PARALLAX EFFECTS =====

// Hero image parallax
gsap.to("header img", {
    yPercent: 30,
    ease: "none",
    scrollTrigger: {
        trigger: "header",
        start: "top top",
        end: "bottom top",
        scrub: 1
    }
});

// ===== TRENDING SECTION ANIMATIONS =====

// Circular rotating text speed up on scroll
gsap.to(".circular-text", {
    rotation: 360,
    ease: "none",
    scrollTrigger: {
        trigger: ".circular-text",
        start: "top bottom",
        end: "bottom top",
        scrub: 2
    }
});

// Trending section title reveal
gsap.from("#trending-text h2", {
    scrollTrigger: {
        trigger: "#trending-text",
        start: "top 80%",
    },
    x: -50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// ===== SERVICE MENU ANIMATIONS =====

// Product cards stagger animation
gsap.from(".product-card", {
    scrollTrigger: {
        trigger: ".product-card",
        start: "top 85%",
    },
    y: 80,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
});

// ===== ABOUT SECTION ANIMATIONS =====

// About section stats counter animation
gsap.utils.toArray(".text-5xl.font-bold").forEach((stat) => {
    const target = stat.innerText;
    const isNumber = target.match(/\d+/);

    if (isNumber) {
        ScrollTrigger.create({
            trigger: stat,
            start: "top 80%",
            onEnter: () => {
                gsap.from(stat, {
                    textContent: 0,
                    duration: 2,
                    ease: "power1.out",
                    snap: { textContent: 1 },
                    onUpdate: function () {
                        stat.textContent = Math.ceil(this.targets()[0].textContent) + (target.includes('+') ? '+' : '');
                    }
                });
            },
            once: true
        });
    }
});

// About section text reveal
gsap.from("#about h2", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
    },
    x: -100,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out"
});

gsap.from("#about p", {
    scrollTrigger: {
        trigger: "#about",
        start: "top 75%",
    },
    y: 30,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    delay: 0.3,
    ease: "power3.out"
});

// ===== HOW IT WORKS SECTION =====

// Step circles scale in
gsap.from(".w-20.h-20.rounded-full", {
    scrollTrigger: {
        trigger: ".w-20.h-20.rounded-full",
        start: "top 85%",
    },
    scale: 0,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.7)"
});

// ===== GALLERY SECTION =====

// Gallery images stagger reveal
gsap.from(".aspect-square", {
    scrollTrigger: {
        trigger: ".aspect-square",
        start: "top 85%",
    },
    scale: 0.8,
    opacity: 0,
    duration: 0.8,
    stagger: {
        amount: 0.8,
        from: "start"
    },
    ease: "power2.out"
});

// ===== REVIEWS SECTION =====


// ===== CTA SECTION =====

// CTA section zoom in
gsap.from("#cta h2", {
    scrollTrigger: {
        trigger: "#cta",
        start: "top 80%",
    },
    scale: 0.9,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// CTA buttons pop in
gsap.set("#cta button", { opacity: 0, y: 30 }); // Set initial state explicitly

ScrollTrigger.create({
    trigger: "#cta",
    start: "top 85%",
    onEnter: () => {
        gsap.to("#cta button", {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            delay: 0.2,
            ease: "back.out(1.7)",
            overwrite: true
        });
    },
    once: true
});

// ===== INTERACTIVE HOVER EFFECTS =====

// Add smooth scale effect to all buttons on hover
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(button, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: target,
                ease: "power3.inOut"
            });
        }
    });
});

// ===== FOOTER ANIMATION =====

gsap.from("footer", {
    scrollTrigger: {
        trigger: "footer",
        start: "top 90%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

// ===== STICKY CTA LOGIC =====

const stickyCta = document.getElementById('stickyCta');
if (stickyCta) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500 && window.innerWidth < 769) {
            stickyCta.classList.add('show');
        } else {
            stickyCta.classList.remove('show');
        }
    });
}

// ===== REVIEWS SECTION ANIMATIONS =====

// Set initial state to avoid flash (optional, but cleaner if JS loads fast)
// Note: We use a batch trigger to ensure elements are animated as they come into view
ScrollTrigger.batch(".review-card", {
    onEnter: batch => gsap.from(batch, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        overwrite: true
    }),
    start: "top 90%",
    once: true
});
