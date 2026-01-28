// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== MOBILE MENU =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== TYPING EFFECT =====
const dynamicTitle = document.querySelector('.hero-title-dynamic');
const titles = ['Mobil Uygulama Geliştirici', 'Full Stack Developer', 'Problem Solver'];
let titleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeTitle() {
    const currentTitle = titles[titleIndex];
    
    if (isDeleting) {
        dynamicTitle.textContent = currentTitle.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        dynamicTitle.textContent = currentTitle.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentTitle.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        titleIndex = (titleIndex + 1) % titles.length;
        typingSpeed = 500; // Pause before typing new word
    }

    setTimeout(typeTitle, typingSpeed);
}

// Start typing effect
setTimeout(typeTitle, 1500);

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section');

function setActiveNavLink() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', setActiveNavLink);

// ===== COUNTER ANIMATION =====
const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };

    updateCounter();
}

// Intersection Observer for counter animation
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(number => {
    counterObserver.observe(number);
});

// ===== SCROLL REVEAL ANIMATION =====
const revealElements = document.querySelectorAll('.timeline-item, .project-card, .info-card, .contact-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

revealElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(element);
});

// ===== FORM HANDLING =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Create mailto link with form data
    const subject = encodeURIComponent(data.subject);
    const body = encodeURIComponent(`İsim: ${data.name}\nE-posta: ${data.email}\n\nMesaj:\n${data.message}`);
    const mailtoLink = `mailto:gokaycetin44@gmail.com?subject=${subject}&body=${body}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success feedback
    const submitBtn = this.querySelector('.btn-submit');
    const originalContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span>Mesaj Hazırlandı!</span><i class="fas fa-check"></i>';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalContent;
        submitBtn.style.background = '';
        this.reset();
    }, 3000);
});

// ===== PARALLAX EFFECT FOR GRADIENT SPHERES =====
document.addEventListener('mousemove', (e) => {
    const spheres = document.querySelectorAll('.gradient-sphere');
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    spheres.forEach((sphere, index) => {
        const speed = (index + 1) * 15;
        sphere.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
});

// ===== PROJECTS SLIDER =====
const projectsSlider = document.querySelector('.projects-slider');
const projectsTrack = document.querySelector('.projects-track');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

if (projectsSlider && projectsTrack && prevBtn && nextBtn) {
    let currentIndex = 0;
    const projectCards = projectsTrack.querySelectorAll('.project-card');
    const cardWidth = 380 + 28; // card width + gap
    
    function updateSlider() {
        const maxScroll = projectsTrack.scrollWidth - projectsSlider.offsetWidth;
        const translateX = Math.min(currentIndex * cardWidth, maxScroll);
        projectsTrack.style.transform = `translateX(-${translateX}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = translateX >= maxScroll;
    }
    
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const maxIndex = Math.ceil((projectsTrack.scrollWidth - projectsSlider.offsetWidth) / cardWidth);
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Initial state
    updateSlider();
    
    // Update on resize
    window.addEventListener('resize', () => {
        currentIndex = 0;
        updateSlider();
    });
}

// ===== PROJECT CARDS TILT EFFECT - DISABLED =====
// const projectCards = document.querySelectorAll('.project-card');

// projectCards.forEach(card => {
//     card.addEventListener('mousemove', (e) => {
//         const rect = card.getBoundingClientRect();
//         const x = e.clientX - rect.left;
//         const y = e.clientY - rect.top;
        
//         const centerX = rect.width / 2;
//         const centerY = rect.height / 2;
        
//         const rotateX = (y - centerY) / 20;
//         const rotateY = (centerX - x) / 20;
        
//         card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
//     });
    
//     card.addEventListener('mouseleave', () => {
//         card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
//     });
// });

// ===== PRELOADER (optional) =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== CONSOLE MESSAGE =====
console.log('%c Gökay Çetinakdoğan Portfolio ', 'background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; font-size: 20px; padding: 10px 20px; border-radius: 10px;');
console.log('%c Merhaba! Kaynak kodu inceliyorsunuz 👀 ', 'color: #3b82f6; font-size: 14px;');
console.log('%c İletişim: gokaycetin44@gmail.com ', 'color: #a1a1aa; font-size: 12px;');
