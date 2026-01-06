// Haus Of Beauty - Animations and Interactions

// Initialize Lucide Icons
lucide.createIcons();

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
gsap.from("#navbar", {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
});

gsap.from(".hero-content > *", {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.3
});

gsap.from(".hero-card", {
    x: 100,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.8
});

// Product Cards Animation
gsap.from(".product-card", {
    scrollTrigger: {
        trigger: ".product-card",
        start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});

// Reviews Animation
gsap.from(".review-card", {
    scrollTrigger: {
        trigger: ".review-card",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    duration: 0.6,
    stagger: 0.1,
    ease: "power3.out"
});
