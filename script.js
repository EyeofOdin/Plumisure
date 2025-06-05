// Navigation functionality
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Close menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// Active link functionality
function scrollActive() {
    const scrollY = window.pageYOffset;

    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

// Header background on scroll
function scrollHeader() {
    const header = document.getElementById('header');
    if (this.scrollY >= 80) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
}
window.addEventListener('scroll', scrollHeader);

// Back to top button
const backToTop = document.getElementById('backToTop');

function scrollTop() {
    if (this.scrollY >= 560) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
}
window.addEventListener('scroll', scrollTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
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

// Contact form functionality
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !phone || !service || !message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        if (!validateEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Thank you! Your message has been sent. We will contact you soon.', 'success');
        this.reset();
        
        // In a real implementation, you would send the data to your server
        console.log('Form submitted:', { name, email, phone, service, message });
    });
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        max-width: 400px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#2563eb'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        transform: translateX(100%);
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        removeNotification(notification);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.addEventListener('click', () => {
        removeNotification(notification);
    });
}

function removeNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    .notification__content {
        display: flex;
        align-items: center;
        gap: 10px;
    }
    
    .notification__close {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 1.2rem;
        opacity: 0.7;
        transition: opacity 0.3s ease;
    }
    
    .notification__close:hover {
        opacity: 1;
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.service__card, .contact__card, .about__feature');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize animations
window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Set initial state for animated elements
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service__card, .contact__card, .about__feature');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
});

// Phone number formatting
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.startsWith('27')) {
                value = '+' + value;
            } else if (!value.startsWith('+27')) {
                value = '+27' + value;
            }
        }
        e.target.value = value;
    });
}

// Emergency call button functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('a[href^="tel:"]')) {
        // Track emergency calls (you can add analytics here)
        console.log('Emergency call initiated');
    }
});

// Service selection enhancement
const serviceSelect = document.getElementById('service');
if (serviceSelect) {
    serviceSelect.addEventListener('change', function() {
        const messageTextarea = document.getElementById('message');
        const serviceText = this.options[this.selectedIndex].text;
        
        if (this.value && !messageTextarea.value) {
            messageTextarea.placeholder = `Please describe your ${serviceText.toLowerCase()} requirements...`;
        }
    });
}

// Loading state for form submission
function setFormLoading(form, isLoading) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const inputs = form.querySelectorAll('input, textarea, select');
    
    if (isLoading) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        inputs.forEach(input => input.disabled = true);
    } else {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
        inputs.forEach(input => input.disabled = false);
    }
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add loading class to body initially
    document.body.classList.add('loading');
    
    // Remove loading class after page loads
    window.addEventListener('load', function() {
        document.body.classList.remove('loading');
    });
    
    // Initialize scroll animations
    animateOnScroll();
});

// Performance optimization - throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(scrollActive, 100));
window.addEventListener('scroll', throttle(scrollHeader, 100));
window.addEventListener('scroll', throttle(scrollTop, 100));
window.addEventListener('scroll', throttle(animateOnScroll, 100));