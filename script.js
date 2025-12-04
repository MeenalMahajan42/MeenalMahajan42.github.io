// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Create Floating Molecules in Hero Section
function createMolecules() {
    const hero = document.querySelector('.hero');
    const moleculeCount = 6;

    for (let i = 0; i < moleculeCount; i++) {
        const molecule = document.createElement('div');
        molecule.classList.add('molecule');
        hero.appendChild(molecule);
    }
}

// Add parallax effect to hero molecules
window.addEventListener('scroll', () => {
    const molecules = document.querySelectorAll('.molecule');
    const scrolled = window.pageYOffset;

    molecules.forEach((molecule, index) => {
        const speed = (index + 1) * 0.1;
        molecule.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Initialize molecules when page loads
window.addEventListener('load', () => {
    createMolecules();

    // Create scroll progress bar
    const progressBar = document.createElement('div');
    progressBar.classList.add('scroll-progress');
    document.body.prepend(progressBar);
});

// Update scroll progress bar
window.addEventListener('scroll', () => {
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }
});

// Active Navigation Link on Scroll
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
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

// Smooth Scroll for all anchor links
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

// Intersection Observer for Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Animate cards with stagger effect
            const cards = entry.target.querySelectorAll('.competency-card, .education-card, .achievement-category, .contact-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe all sections for fade-in effect
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);

    // Set initial state for cards
    const cards = section.querySelectorAll('.competency-card, .education-card, .achievement-category, .contact-card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
});

// Add active class to first section on page load
window.addEventListener('load', () => {
    const firstSection = document.querySelector('section');
    if (firstSection) {
        firstSection.style.opacity = '1';
        firstSection.style.transform = 'translateY(0)';
    }

    // Animate stat numbers with counting effect
    animateStats();
});

// Counter animation for statistics
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, 16);
    });
}

// Add sparkle effect on card hover
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.competency-card, .education-card, .achievement-category');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            createSparkle(e, this);
        });
    });
});

function createSparkle(e, element) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.background = 'radial-gradient(circle, rgba(0, 217, 255, 1), transparent)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkleAnimation 0.6s ease-out forwards';

    const rect = element.getBoundingClientRect();
    sparkle.style.left = (e.clientX - rect.left) + 'px';
    sparkle.style.top = (e.clientY - rect.top) + 'px';

    element.style.position = 'relative';
    element.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 600);
}

// Add sparkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes sparkleAnimation {
        0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: scale(3) rotate(180deg);
            opacity: 0;
        }
    }
    
    .cursor-trail {
        position: fixed;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(0, 217, 255, 0.8), rgba(0, 200, 150, 0.4));
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        animation: cursorFade 0.5s ease-out forwards;
    }
    
    @keyframes cursorFade {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Custom cursor trail effect (only for desktop)
if (window.innerWidth > 768) {
    let lastTrailTime = 0;
    document.addEventListener('mousemove', (e) => {
        const currentTime = Date.now();
        if (currentTime - lastTrailTime > 50) {
            lastTrailTime = currentTime;

            const trail = document.createElement('div');
            trail.classList.add('cursor-trail');
            trail.style.left = e.clientX + 'px';
            trail.style.top = e.clientY + 'px';
            document.body.appendChild(trail);

            setTimeout(() => trail.remove(), 500);
        }
    });
}

// Add smooth reveal animation to text content
document.addEventListener('DOMContentLoaded', () => {
    const textElements = document.querySelectorAll('p, h3, h4, li');
    textElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(10px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    const textObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 50);
            }
        });
    }, { threshold: 0.1 });

    textElements.forEach(el => textObserver.observe(el));
});

