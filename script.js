document.addEventListener('DOMContentLoaded', () => {
    // Inject Back to Top Button
    const backToTopHTML = document.createElement('div');
    backToTopHTML.id = 'back-to-top';
    backToTopHTML.innerHTML = '↑';
    document.body.appendChild(backToTopHTML);


    // Remove Preloader after load
    window.addEventListener('load', () => {
        setTimeout(() => {
            const loader = document.getElementById('preloader');
            if (loader) {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.remove();
                }, 500);
            }
        }, 500); // 0.5s arbitrary delay to show the spinner briefly
    });


    // Mobile Menu Toggle
    const nav = document.querySelector('nav');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // Sticky Navbar & Back to Top Logic
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        // Sticky Nav
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Back to Top
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    // Back to Top Click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on index if in a grid
                if (entry.target.classList.contains('stagger-item')) {
                    // This is handled by CSS nth-child usually, but simple JS delay works too for dynamism
                    // Keeping it simple: just add visible class
                }
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Elements to animate
    document.querySelectorAll('section h2, section p, .btn-gold, .product-card, .about-img, .stat, .info-group, .form-group').forEach(el => {
        el.classList.add('fade-up');
        observer.observe(el);
    });

    // Contact Form Handling (Simple Alert)
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your inquiry. Our team will contact you shortly.');
            contactForm.reset();
        });
    }
});
