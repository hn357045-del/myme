// ==================== Theme Toggle ====================
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const isDarkMode = localStorage.getItem('dark-mode') === 'true';
if (isDarkMode) {
    body.classList.add('dark-mode');
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');
    localStorage.setItem('dark-mode', isDark);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
}

// ==================== Floating Elements Positioning ====================
function randomizeFloatingPositions() {
    const bears = document.querySelectorAll('.floating-bear');
    const icons = document.querySelectorAll('.floating-icon');
    
    bears.forEach(bear => {
        const randomTop = Math.random() * 80 + 5; // 5% to 85%
        const randomLeft = Math.random() * 90; // 0% to 90%
        bear.style.top = randomTop + '%';
        bear.style.left = randomLeft + '%';
    });
    
    icons.forEach(icon => {
        const randomTop = Math.random() * 80 + 5;
        const randomLeft = Math.random() * 90;
        icon.style.top = randomTop + '%';
        icon.style.left = randomLeft + '%';
    });
}

// Randomize on load
randomizeFloatingPositions();

// ==================== Particle Creation ====================
function createParticles(x, y, count = 5) {
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '9999';
        particle.style.fontSize = '1.5rem';
        particle.style.opacity = '1';
        
        // Random emoji
        const emojis = ['✨', '💖', '⭐', '🎀', '💝'];
        particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (Math.PI * 2 * i) / count;
        const velocity = {
            x: Math.cos(angle) * 4,
            y: Math.sin(angle) * 4 - 3 // upward bias
        };
        
        let life = 1;
        let posX = x;
        let posY = y;
        
        const animateParticle = () => {
            life -= 0.02;
            posX += velocity.x;
            posY += velocity.y;
            velocity.y += 0.1; // gravity
            
            particle.style.left = posX + 'px';
            particle.style.top = posY + 'px';
            particle.style.opacity = Math.max(0, life);
            particle.style.transform = `scale(${life})`;
            
            if (life > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        };
        
        animateParticle();
    }
}

// ==================== Interactive Particle Effects ====================
document.addEventListener('click', (e) => {
    // Only create particles on card clicks during day time
    if (!body.classList.contains('dark-mode') && Math.random() > 0.5) {
        createParticles(e.clientX, e.clientY, 8);
    }
});

// Smooth scrolling for navigation links
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

// ==================== Animated Progress Bars ====================
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillFill = entry.target.querySelector('.skill-fill');
            const percentage = skillFill.getAttribute('data-percentage');
            skillFill.style.width = percentage + '%';
            
            // Create particles on skill animation
            const rect = entry.target.getBoundingClientRect();
            createParticles(rect.left + rect.width / 2, rect.top, 3);
            
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all skill elements
document.querySelectorAll('.skill').forEach(skill => {
    skillObserver.observe(skill);
});

// ==================== Fade-In on Scroll ====================
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeInObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Add fade-in-scroll class to elements that should animate
document.querySelectorAll('.project-card, .about-card, .experience-card').forEach(element => {
    element.classList.add('fade-in-scroll');
    fadeInObserver.observe(element);
});

// ==================== Navbar Active Link ====================
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ==================== Floating Elements Animation Variation ====================
function addAnimationVariation() {
    const bears = document.querySelectorAll('.floating-bear');
    bears.forEach((bear, index) => {
        const variations = ['float', 'floatSlow', 'floatMedium'];
        const randomVariation = variations[index % variations.length];
        
        // Add random animation duration
        const duration = 5 + Math.random() * 3;
        bear.style.animationDuration = duration + 's';
    });
}

addAnimationVariation();

// ==================== Staggered Animation ====================
window.addEventListener('load', () => {
    // Add animation to hero content
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 0.8s ease-out';
    }
    
    // Animate floating orbs
    const orbs = document.querySelectorAll('.floating-orb');
    orbs.forEach((orb, index) => {
        orb.style.animationDelay = (index * 0.3) + 's';
    });
});
