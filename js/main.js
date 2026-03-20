// Navigation Active State and Smooth Scroll
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn'); // Updated selector
    const navMenu = document.getElementById('nav-menu'); // Updated selector

    // Optimization: Debounce/Throttle scroll event using requestAnimationFrame for smoothness
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollState();
                ticking = false;
            });
            ticking = true;
        }
    });

    function updateScrollState() {
        // Sticky Navbar Scroll Effect
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 14, 39, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(10, 14, 39, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Removed unused sectionHeight to prevent unnecessary layout thrashing
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Extract the id from the href attribute
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                const targetId = href.substring(1);
                if (targetId === current) {
                    link.classList.add('active');
                }
            }
        });
    }

    // Mobile Menu Toggle
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });
    }

    // Close Mobile Menu on Link Click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('open');
        });
    });

    // Smooth Scroll for anchor links (polyfill support)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Force page to start at top on reload
    window.addEventListener("load", () => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual';
        }

        if (window.location.hash) {
            window.history.replaceState(null, null, window.location.pathname);
        }

        window.scrollTo(0, 0);
    });

    // --- Global Modal Logic (Centralized) ---
    const modal = document.getElementById('details-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModalBtn = document.querySelector('.close-modal');

    function closeModal() {
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    // Expose open function to global scope for other scripts
    window.openDetailsModal = (htmlContent) => {
        if (modal && modalBody) {
            modalBody.innerHTML = htmlContent;
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }
    };

    // Event Listeners for closing
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) {
        window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('show')) closeModal(); });
    }
});
