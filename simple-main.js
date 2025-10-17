// ===== SIMPLIFIED PORTFOLIO JAVASCRIPT =====

console.log('🚀 Portfolio JavaScript Loading...');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM Loaded - Starting initialization...');
    
    // Initialize navigation
    initNavigation();
    
    // Initialize simple theme toggle
    initThemeToggle();
    
    // Initialize scroll to top
    initScrollToTop();
    
    // Initialize contact form
    initContactForm();
    
    console.log('✅ Portfolio Initialized Successfully!');
});

// ===== NAVIGATION SYSTEM =====
function initNavigation() {
    console.log('🧭 Setting up navigation...');
    
    // Get all navigation links with multiple selectors for better coverage
    const navLinks = document.querySelectorAll('.nav-link, .nav-link[href^="#"], a[href^="#"]');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    console.log(`Found ${navLinks.length} navigation links`);
    
    // Setup smooth scrolling for navigation links
    navLinks.forEach(function(link, index) {
        console.log(`Setting up link ${index}: ${link.getAttribute('href')} - ${link.textContent.trim()}`);
        
        // Remove any existing event listeners
        link.removeEventListener('click', handleNavClick);
        
        // Add event listener
        link.addEventListener('click', handleNavClick);
        
        // Also handle touch events for mobile
        link.addEventListener('touchstart', function(e) {
            console.log('📱 Touch started on nav link');
        });
    });
    
    function handleNavClick(e) {
        console.log('🔗 Nav link clicked!', this.getAttribute('href'));
        
        const targetId = this.getAttribute('href');
        
        // Only handle internal links that start with #
        if (!targetId || !targetId.startsWith('#')) {
            console.log('Not an internal link, allowing default behavior');
            return;
        }
        
        e.preventDefault();
        e.stopPropagation();
        
        const targetSection = document.querySelector(targetId);
        console.log(`🎯 Target section found:`, !!targetSection);
        
        if (targetSection) {
            // Calculate offset for navbar
            const navbar = document.getElementById('navbar') || document.querySelector('.ultra-navbar');
            const navHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = targetSection.offsetTop - navHeight - 20;
            
            console.log(`📍 Scrolling to position: ${targetPosition}`);
            
            // Smooth scroll to target
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active link
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
            
            // Close mobile menu if open
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
                console.log('📱 Mobile menu closed');
            }
            
            console.log(`✅ Successfully navigated to: ${targetId}`);
        } else {
            console.log(`❌ Target section not found: ${targetId}`);
        }
    }
    
    // Mobile menu toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('📱 Mobile menu toggled');
            
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Update active link on scroll
    window.addEventListener('scroll', function() {
        updateActiveNavLink(navLinks);
    });
    
    // Add event delegation as backup for navigation
    document.addEventListener('click', function(e) {
        // Check if clicked element is a navigation link
        const clickedLink = e.target.closest('.nav-link');
        if (clickedLink && clickedLink.getAttribute('href') && clickedLink.getAttribute('href').startsWith('#')) {
            console.log('🎯 Event delegation caught nav click:', clickedLink.getAttribute('href'));
            handleNavClick.call(clickedLink, e);
        }
    });
    
    console.log('✅ Navigation setup complete');
}

// Update active navigation link based on scroll position
function updateActiveNavLink(navLinks) {
    const scrollPosition = window.scrollY + 100;
    
    navLinks.forEach(function(link) {
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const sectionTop = targetSection.offsetTop;
            const sectionBottom = sectionTop + targetSection.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        }
    });
}

// ===== THEME SELECTOR DROPDOWN =====
function initThemeToggle() {
    console.log('🎨 Setting up theme selector dropdown...');
    
    // Theme elements
    const themeSelector = document.getElementById('theme-selector');
    const themeTrigger = document.getElementById('theme-trigger');
    const themeDropdown = document.getElementById('theme-dropdown');
    const currentThemeName = document.getElementById('current-theme-name');
    const currentThemePreview = document.getElementById('current-theme-preview');
    const themeOptions = document.querySelectorAll('.theme-option');
    
    if (!themeSelector || !themeTrigger || !currentThemeName) {
        console.log('❌ Theme elements not found, skipping theme setup');
        return;
    }
    
    console.log('Theme elements found:', {
        themeSelector: !!themeSelector,
        themeTrigger: !!themeTrigger,
        themeDropdown: !!themeDropdown,
        currentThemeName: !!currentThemeName,
        themeOptions: themeOptions.length
    });
    
    // Get current theme from localStorage or default to light
    let currentTheme = localStorage.getItem('portfolio-theme') || 'light';
    
    // Theme data
    const themes = {
        light: { name: 'Light', icon: 'fas fa-sun', desc: 'Clean & Bright' },
        dark: { name: 'Dark', icon: 'fas fa-moon', desc: 'Sleek & Modern' },
        ocean: { name: 'Ocean', icon: 'fas fa-water', desc: 'Blue & Fresh' },
        sunset: { name: 'Sunset', icon: 'fas fa-sun', desc: 'Warm & Vibrant' },
        forest: { name: 'Forest', icon: 'fas fa-leaf', desc: 'Green & Natural' }
    };
    
    // Apply initial theme
    applyTheme(currentTheme);
    
    // Theme trigger click handler
    themeTrigger.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎨 Theme trigger clicked');
        themeSelector.classList.toggle('open');
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (themeSelector && !themeSelector.contains(e.target)) {
            themeSelector.classList.remove('open');
        }
    });
    
    // Theme option clicks
    themeOptions.forEach(function(option) {
        const theme = option.getAttribute('data-theme');
        console.log(`🎨 Setting up theme option: ${theme}`);
        
        option.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log(`🎨 Theme clicked: ${theme}`);
            
            if (theme !== currentTheme) {
                currentTheme = theme;
                applyTheme(currentTheme);
                localStorage.setItem('portfolio-theme', currentTheme);
                
                // Close dropdown
                themeSelector.classList.remove('open');
                
                console.log(`✅ Theme switched to: ${theme}`);
            }
        });
    });
    
    function applyTheme(theme) {
        console.log(`🎨 Applying theme: ${theme}`);
        
        // Apply theme to document
        document.documentElement.setAttribute('data-theme', theme);
        
        // Update current theme display
        if (currentThemeName && themes[theme]) {
            currentThemeName.textContent = themes[theme].name;
        }
        
        // Update theme preview
        if (currentThemePreview) {
            currentThemePreview.className = `theme-preview ${theme}-preview`;
        }
        
        // Update active theme option
        themeOptions.forEach(function(option) {
            option.classList.remove('active');
            if (option.getAttribute('data-theme') === theme) {
                option.classList.add('active');
            }
        });
        
        // Add smooth transition effect
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
        
        console.log(`✅ Applied theme: ${theme}`);
    }
    
    console.log('✅ Theme selector dropdown setup complete');
}

// ===== SCROLL TO TOP =====
function initScrollToTop() {
    const scrollBtn = document.getElementById('scroll-to-top');
    
    if (!scrollBtn) {
        console.log('❌ Scroll to top button not found');
        return;
    }
    
    // Show/hide scroll button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.style.display = 'block';
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.style.display = 'none';
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top click handler
    scrollBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('✅ Scroll to top initialized');
}

// ===== CONTACT FORM WITH BACKEND INTEGRATION =====
function initContactForm() {
    console.log('📬 Setting up contact form...');
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const flyingLetter = document.getElementById('flying-letter');
    const emailNotification = document.getElementById('email-notification');
    
    if (!contactForm || !submitBtn) {
        console.log('❌ Contact form elements not found');
        return;
    }
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        console.log('📬 Form submitted, sending to backend...');
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name')?.trim(),
            email: formData.get('email')?.trim(), 
            subject: formData.get('subject')?.trim(),
            message: formData.get('message')?.trim()
        };
        
        // Validate form
        if (!data.name || !data.email || !data.subject || !data.message) {
            alert('Please fill in all fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Start loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        try {
            // Send to backend API
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            const result = await response.json();
            
            if (response.ok && result.success) {
                console.log('✅ Email sent successfully!');
                
                // Start flying letter animation if element exists
                if (flyingLetter) {
                    startFlyingLetterAnimation();
                }
                
                // Show success state
                setTimeout(() => {
                    submitBtn.classList.remove('loading');
                    submitBtn.classList.add('success');
                    
                    // Show success notification
                    showSuccessNotification(result.message);
                    
                    // Reset form after delay
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.classList.remove('success');
                        submitBtn.disabled = false;
                        console.log('✅ Form reset complete');
                    }, 3000);
                    
                }, flyingLetter ? 1000 : 100);
                
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
            
        } catch (error) {
            console.error('❌ Contact form error:', error);
            
            // Show error state
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('error');
            
            showErrorNotification(error.message || 'Failed to send message. Please try again.');
            
            // Reset button after delay
            setTimeout(() => {
                submitBtn.classList.remove('error');
                submitBtn.disabled = false;
            }, 3000);
        }
    });
    
    function startFlyingLetterAnimation() {
        console.log('✨ Starting flying letter animation...');
        
        // Position the letter at the form button
        const buttonRect = submitBtn.getBoundingClientRect();
        flyingLetter.style.top = buttonRect.top + buttonRect.height / 2 + 'px';
        flyingLetter.style.left = buttonRect.left + buttonRect.width / 2 + 'px';
        flyingLetter.style.transform = 'translate(-50%, -50%)';
        
        // Start animation
        flyingLetter.classList.add('animate');
        
        // Clean up after animation
        setTimeout(() => {
            flyingLetter.classList.remove('animate');
            console.log('✅ Flying letter animation complete');
        }, 2000);
    }
    
    function showSuccessNotification(message) {
        console.log('✅ Showing success notification...');
        
        if (emailNotification) {
            // Update notification content
            const titleElement = emailNotification.querySelector('.notification-text h4');
            const messageElement = emailNotification.querySelector('.notification-text p');
            
            if (titleElement) titleElement.textContent = '🎉 Message Sent!';
            if (messageElement) messageElement.textContent = message || 'Your message has been delivered successfully!';
            
            emailNotification.classList.remove('error');
            emailNotification.classList.add('show', 'success');
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                hideEmailNotification();
            }, 5000);
        }
    }
    
    function showErrorNotification(message) {
        console.log('❌ Showing error notification...');
        
        if (emailNotification) {
            // Update notification content
            const titleElement = emailNotification.querySelector('.notification-text h4');
            const messageElement = emailNotification.querySelector('.notification-text p');
            
            if (titleElement) titleElement.textContent = '❌ Error Occurred';
            if (messageElement) messageElement.textContent = message || 'Failed to send message. Please try again.';
            
            emailNotification.classList.remove('success');
            emailNotification.classList.add('show', 'error');
            
            // Auto hide after 7 seconds for errors
            setTimeout(() => {
                hideEmailNotification();
            }, 7000);
        }
    }
    
    // Make hide function global so it can be called from HTML
    window.hideNotification = function() {
        hideEmailNotification();
    };
    
    function hideEmailNotification() {
        if (emailNotification) {
            emailNotification.classList.remove('show', 'success', 'error');
            console.log('✅ Email notification hidden');
        }
    }
    
    console.log('✅ Contact form setup complete');
}

// ===== UTILITY FUNCTIONS =====

// Smooth scroll to element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        const navbar = document.querySelector('.ultra-navbar');
        const navHeight = navbar ? navbar.offsetHeight : 80;
        const targetPosition = element.offsetTop - navHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
        
        return true;
    }
    return false;
}

// Debug info
console.log('📱 Portfolio JavaScript Loaded Successfully!');

// Debug function to check elements after page load
setTimeout(function() {
    console.log('=== DEBUG CHECK ===');
    console.log('Navigation links:', document.querySelectorAll('.nav-link').length);
    console.log('Mobile toggle:', !!document.getElementById('nav-toggle'));
    console.log('Navigation menu:', !!document.getElementById('nav-menu'));
    console.log('Theme selector:', !!document.getElementById('theme-selector'));
    console.log('Theme options:', document.querySelectorAll('.theme-option').length);
    
    // Check if all sections exist
    const sections = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
    sections.forEach(function(id) {
        const section = document.getElementById(id);
        console.log(`Section #${id}:`, !!section);
        if (section) {
            console.log(`  - Position: ${section.offsetTop}px`);
            console.log(`  - Height: ${section.offsetHeight}px`);
        }
    });
    
    // Test navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    console.log('\n=== NAVIGATION LINKS TEST ===');
    navLinks.forEach(function(link, index) {
        const href = link.getAttribute('href');
        const text = link.textContent.trim();
        const isClickable = link.style.pointerEvents !== 'none';
        console.log(`Link ${index + 1}: "${text}" -> ${href} (Clickable: ${isClickable})`);
        
        // Test if target exists
        if (href && href.startsWith('#')) {
            const target = document.querySelector(href);
            console.log(`  - Target exists: ${!!target}`);
        }
    });
    
    console.log('=== END DEBUG ===');
    
    // Add click test function
    window.testNavClick = function(sectionId) {
        console.log(`\n🧪 Testing navigation to #${sectionId}`);
        const section = document.getElementById(sectionId);
        if (section) {
            const navbar = document.querySelector('.ultra-navbar');
            const navHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = section.offsetTop - navHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            console.log(`✅ Manually scrolled to #${sectionId}`);
        } else {
            console.log(`❌ Section #${sectionId} not found`);
        }
    };
    
    console.log('\n💡 You can test navigation by running: testNavClick("about") in console');
}, 1000);
