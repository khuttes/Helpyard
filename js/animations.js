document.addEventListener('DOMContentLoaded', () => {

    /* 1. Typing Animation */
    const typingTextElement = document.querySelector('.typing-text');
    const roles = [
        "Cybersecurity Researcher",
        "Penetration Tester",
        "Bug Bounty Hunter",
        "Network Defender",
        "Security Architect"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typingTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typingTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(typeEffect, typeSpeed);
    }

    // Start typing effect
    setTimeout(typeEffect, 1000);


    /* 2. GSAP Scroll Animations (Robust & Fail-Safe) */
    // Only run if GSAP is loaded
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Helper to animate elements ensuring they are visible if animation fails
        const animateFrom = (selector, vars) => {
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) return;

            gsap.from(elements, {
                ...vars,
                clearProps: 'opacity, transform' // Ensure clean state after animation
            });
        };

        // Animate section headings
        animateFrom('section h2', {
            scrollTrigger: {
                trigger: 'section h2',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            },
            y: 30,
            opacity: 0,
            duration: 1,
            stagger: 0.2
        });

        // Animate project cards
        animateFrom('.projects-grid .card', {
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%',
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power2.out'
        });
        
        // Animate Services (New)
        animateFrom('.service-card', {
            scrollTrigger: {
                trigger: '#services',
                start: 'top 80%',
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        });

        // Animate Reports (New)
        animateFrom('.report-card', {
            scrollTrigger: {
                trigger: '#project-reports',
                start: 'top 80%',
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        });

        // Animate roadmap items
        animateFrom('.roadmap-item', {
            scrollTrigger: {
                trigger: '.roadmap-timeline',
                start: 'top 75%',
            },
            x: (index) => index % 2 === 0 ? -50 : 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out'
        });

        // Animate skill bars (progress-fill)
        gsap.utils.toArray('.skill-progress').forEach(progressContainer => {
            const progressFill = progressContainer.querySelector('.progress-fill');
            const skillPercentageSpan = progressContainer.previousElementSibling.querySelector('span:last-child'); // Assuming structure
            const targetWidth = skillPercentageSpan ? skillPercentageSpan.textContent : '0%'; // Get the percentage string

            if (progressFill && targetWidth) {
                gsap.fromTo(progressFill, { width: '0%' }, {
                    width: targetWidth, // Animate to the actual percentage
                    scrollTrigger: {
                        trigger: progressContainer,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    },
                    duration: 1.5, // Adjust duration as needed
                    ease: 'power2.out'
                });
            }
        });

        // Terminal entrance
        animateFrom('.terminal-container', {
            scrollTrigger: {
                trigger: '.terminal-container',
                start: 'top 85%',
            },
            scale: 0.95,
            opacity: 0,
            duration: 0.8,
            ease: 'back.out(1.5)'
        });

    } else {
        console.warn('GSAP not loaded. Animations disabled, content remains visible.');
    }
});
