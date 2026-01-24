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

    // EmailJS Configuration
    const EMAILJS_CONFIG = {
        serviceId: 'service_tgzpfms',
        templateId: 'template_k9yhqxs',
        publicKey: 'WzpOviiFeguCep-FL'
    };

    // Initialize EmailJS
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
    }

    // Contact Form Handling with EmailJS
    const contactForms = document.querySelectorAll('form.contact-form');
    contactForms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Get form data
            const formData = {
                from_name: form.querySelector('#name').value,
                from_email: form.querySelector('#email').value,
                subject: form.querySelector('#subject').value,
                message: form.querySelector('#message').value
            };

            try {
                // Send email via EmailJS
                await emailjs.send(
                    EMAILJS_CONFIG.serviceId,
                    EMAILJS_CONFIG.templateId,
                    formData
                );

                // Success
                submitBtn.textContent = 'Sent Successfully! ✓';
                submitBtn.style.background = '#28a745';
                form.reset();

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                }, 3000);

            } catch (error) {
                console.error('EmailJS Error:', error);
                submitBtn.textContent = 'Failed to send. Try again.';
                submitBtn.style.background = '#dc3545';

                // Reset button after 3 seconds
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    });
});
