// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    setTimeout(function() {
        const preloader = document.querySelector('.preloader');
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 2000);

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Active navigation link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav ul li a');

        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;

    function showSlide(n) {
        testimonialSlides.forEach(slide => slide.style.display = 'none');
        testimonialSlides[n].style.display = 'block';
    }

    if (testimonialSlides.length > 0) {
        showSlide(currentSlide);

        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                currentSlide++;
                if (currentSlide >= testimonialSlides.length) {
                    currentSlide = 0;
                }
                showSlide(currentSlide);
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                currentSlide--;
                if (currentSlide < 0) {
                    currentSlide = testimonialSlides.length - 1;
                }
                showSlide(currentSlide);
            });
        }

        // Auto slide every 5 seconds
        setInterval(function() {
            currentSlide++;
            if (currentSlide >= testimonialSlides.length) {
                currentSlide = 0;
            }
            showSlide(currentSlide);
        }, 5000);
    }

    // Form Submission Handling
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.getElementById('newsletterForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate form submission
            const formData = new FormData(this);
            const formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            // In a real application, you would send this data to a server
            console.log('Contact Form Data:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Simulate form submission
            const email = this.querySelector('input[type="email"]').value;
            
            // In a real application, you would send this data to a server
            console.log('Newsletter Subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            this.reset();
        });
    }

    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .step, .blood-type, .about-image, .about-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const elementsToAnimate = document.querySelectorAll('.service-card, .step, .blood-type, .about-image, .about-text');
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
});