// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        // Check if link is to another page (contains .html)
        if (this.getAttribute('href').includes('.html')) {
            // Let the browser handle navigation to another page
            return;
        }
        
        e.preventDefault();
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Navbar Background on Scroll
// ============================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ============================================
// Active Navigation Link Highlighting
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ============================================
// Button Hover Effects Enhancement
// ============================================
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ============================================
// Service Card Interactive Effects
// ============================================
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ============================================
// Testimonial Card Interactive Effects
// ============================================
const testimonialCards = document.querySelectorAll('.testimonial-card');
testimonialCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// ============================================
// Loading Screen
// ============================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.add('loaded');
    }, 800);
});

// ============================================
// Scroll Progress Indicator
// ============================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ============================================
// Animated Counter for Statistics
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (target === 24 ? '' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (target === 24 ? '' : '+');
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const target = parseInt(statNumber.getAttribute('data-target'));
            if (!statNumber.classList.contains('counted')) {
                statNumber.classList.add('counted');
                animateCounter(statNumber, target);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        statsObserver.observe(card);
    });
});

// ============================================
// Parallax Effect for Hero Section
// ============================================
let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroShapes = document.querySelectorAll('.shape');
            
            if (hero && scrolled < 800) {
                hero.style.transform = `translateY(${scrolled * 0.3}px)`;
                hero.style.opacity = Math.max(0.3, 1 - (scrolled / 600));
            }
            
            heroShapes.forEach((shape, index) => {
                if (scrolled < 800) {
                    const speed = 0.2 + (index * 0.05);
                    shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.05}deg)`;
                }
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

// ============================================
// Scroll Animations (Fade In with Stagger)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(`
        .services-overview,
        .services-intro,
        .services-grid-section,
        .service-card,
        .about-section,
        .about-who-section,
        .mission-section,
        .why-choose-section,
        .feature-card,
        .contact-section,
        .areas-served-section,
        .contact-info-card,
        .testimonial-card,
        .step-card,
        .final-cta,
        .stats-section,
        .trust-badges
    `);
    
    elementsToAnimate.forEach((element, index) => {
        element.classList.add('fade-in');
        
        // Add stagger delay for testimonials
        if (element.classList.contains('testimonial-card')) {
            const cardIndex = Array.from(document.querySelectorAll('.testimonial-card')).indexOf(element);
            element.style.transitionDelay = `${cardIndex * 0.15}s`;
        }
        
        // Add delay for service cards
        if (element.classList.contains('service-card')) {
            const cardIndex = Array.from(document.querySelectorAll('.service-card')).indexOf(element);
            element.style.transitionDelay = `${cardIndex * 0.1}s`;
        }
        
        // Add delay for feature cards
        if (element.classList.contains('feature-card')) {
            const cardIndex = Array.from(document.querySelectorAll('.feature-card')).indexOf(element);
            element.style.transitionDelay = `${cardIndex * 0.1}s`;
        }
        
        observer.observe(element);
    });
});

// ============================================
// 3D Card Tilt Effect (Desktop only)
// ============================================
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .step-card, .feature-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ============================================
// Contact Form Submission
// ============================================
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// ============================================
// Console Welcome Message
// ============================================
console.log('%cDelco Plumbing Website', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
console.log('%cThanks for visiting!', 'color: #FF8C42; font-size: 14px;');
