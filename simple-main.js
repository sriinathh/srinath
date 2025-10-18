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
        
        // Skip if targetId is empty or invalid
        if (!targetId || targetId === '#' || !targetId.startsWith('#') || targetId.length <= 1) {
            return;
        }
        
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
            // Determine the correct API URL
            const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
                ? '/api/contact'  // Local development
                : 'https://srinath-potharaju.onrender.com/api/contact';  // Production
            
            console.log('🌐 Using API URL:', apiUrl);
            
            // Send to backend API
            const response = await fetch(apiUrl, {
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
        console.log('✨ Starting enhanced flying letter animation...');
        
        // Create a beautiful CSS letter envelope
        const enhancedLetter = document.createElement('div');
        enhancedLetter.className = 'enhanced-flying-letter';
        enhancedLetter.innerHTML = `
            <div class="letter-envelope">
                <div class="envelope-back"></div>
                <div class="envelope-front"></div>
                <div class="envelope-flap"></div>
                <div class="letter-content">
                    <div class="letter-header">To: Srinath Potharaju</div>
                    <div class="letter-body">
                        <div class="line line-1"></div>
                        <div class="line line-2"></div>
                        <div class="line line-3"></div>
                        <div class="signature">❤️ From: ${contactForm.name?.value || 'A Friend'}</div>
                    </div>
                </div>
                <div class="stamp">💮</div>
                <div class="letter-sparkles">
                    <span class="sparkle s1">✨</span>
                    <span class="sparkle s2">✨</span>
                    <span class="sparkle s3">✨</span>
                </div>
            </div>
        `;
        
        // Position at submit button
        const buttonRect = submitBtn.getBoundingClientRect();
        enhancedLetter.style.position = 'fixed';
        enhancedLetter.style.left = (buttonRect.left + buttonRect.width / 2) + 'px';
        enhancedLetter.style.top = (buttonRect.top + buttonRect.height / 2) + 'px';
        enhancedLetter.style.zIndex = '10000';
        enhancedLetter.style.pointerEvents = 'none';
        enhancedLetter.style.transform = 'translate(-50%, -50%) scale(0)';
        
        document.body.appendChild(enhancedLetter);
        
        // Add enhanced letter styles
        addEnhancedLetterStyles();
        
        // Animation sequence
        setTimeout(() => {
            // Scale up and prepare for flight
            enhancedLetter.style.transition = 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            enhancedLetter.style.transform = 'translate(-50%, -50%) scale(1) rotate(5deg)';
        }, 100);
        
        setTimeout(() => {
            // Fly to navbar top center
            const navbar = document.querySelector('nav') || document.querySelector('.navbar') || document.querySelector('header');
            let targetX = window.innerWidth / 2; // Center of screen
            let targetY = 40; // Top of navbar
            
            if (navbar) {
                const navRect = navbar.getBoundingClientRect();
                targetX = navRect.left + navRect.width / 2;
                targetY = navRect.top + 20;
            }
            
            enhancedLetter.style.transition = 'all 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            enhancedLetter.style.left = targetX + 'px';
            enhancedLetter.style.top = targetY + 'px';
            enhancedLetter.style.transform = 'translate(-50%, -50%) scale(0.8) rotate(360deg)';
        }, 800);
        
        // Create success burst at navbar
        setTimeout(() => {
            createNavbarSuccessBurst();
        }, 2800);
        
        // Clean up after animation
        setTimeout(() => {
            if (enhancedLetter.parentNode) {
                enhancedLetter.parentNode.removeChild(enhancedLetter);
            }
        }, 4000);
    }
    
    function createNavbarSuccessBurst() {
        const navbar = document.querySelector('nav') || document.querySelector('.navbar') || document.querySelector('header');
        let targetX = window.innerWidth / 2;
        let targetY = 40;
        
        if (navbar) {
            const navRect = navbar.getBoundingClientRect();
            targetX = navRect.left + navRect.width / 2;
            targetY = navRect.top + 20;
        }
        
        const burst = document.createElement('div');
        burst.className = 'success-burst';
        burst.innerHTML = `
            <div class="burst-center">📧</div>
            <div class="burst-particles">
                <span class="particle p1">✨</span>
                <span class="particle p2">🎉</span>
                <span class="particle p3">⭐</span>
                <span class="particle p4">💫</span>
                <span class="particle p5">✨</span>
                <span class="particle p6">🌈</span>
            </div>
            <div class="success-message">📧 Message Sent to Srinath!</div>
        `;
        
        burst.style.position = 'fixed';
        burst.style.left = targetX + 'px';
        burst.style.top = targetY + 'px';
        burst.style.zIndex = '10001';
        burst.style.pointerEvents = 'none';
        burst.style.transform = 'translate(-50%, -50%)';
        
        document.body.appendChild(burst);
        
        // Add glow effect to navbar
        if (navbar) {
            navbar.style.transition = 'all 0.5s ease';
            navbar.style.boxShadow = '0 0 20px rgba(78, 205, 196, 0.6), 0 0 40px rgba(78, 205, 196, 0.3)';
            navbar.style.transform = 'scale(1.02)';
            
            setTimeout(() => {
                navbar.style.boxShadow = '';
                navbar.style.transform = '';
            }, 2000);
        }
        
        // Remove after animation
        setTimeout(() => {
            if (burst.parentNode) {
                burst.parentNode.removeChild(burst);
            }
        }, 3000);
    }
    
    function showSuccessNotification(message) {
        console.log('✅ Showing success notification...');
        
        if (emailNotification) {
            // Update notification content with animated mail effect
            const titleElement = emailNotification.querySelector('.notification-text h4');
            const messageElement = emailNotification.querySelector('.notification-text p');
            
            // Create animated success with logo
            if (titleElement) {
                titleElement.innerHTML = `
                    <div class="success-header">
                        <div class="logo-success-combo">
                            <div class="success-logo">
                                <img src="https://res.cloudinary.com/dfeyi8eom/image/upload/picture_fnjvkj.jpg" alt="Srinath Logo" class="notification-logo" />
                                <div class="success-badge">✓</div>
                            </div>
                            <div class="mail-animation">
                                <span class="mail-icon">📧</span>
                                <span class="mail-trail">✨</span>
                            </div>
                        </div>
                        <span class="success-text">🎉 LEGENDARY SUCCESS!</span>
                    </div>
                `;
            }
            
            if (messageElement) {
                messageElement.innerHTML = `
                    <div class="epic-success-message">
                        <span class="success-message">🚀 Your message just LAUNCHED into my priority inbox!</span>
                        <br>
                        <span class="thanks-text">I'm THRILLED about your project - expect an epic reply soon! ⚡</span>
                        <br>
                        <span class="signature-text">- Srinath Potharaju 💫</span>
                    </div>
                `;
            }
            
            emailNotification.classList.remove('error');
            emailNotification.classList.add('show', 'success');
            
            // Add CSS animation styles dynamically
            addSuccessAnimationStyles();
            
            // Auto hide after 6 seconds
            setTimeout(() => {
                hideEmailNotification();
            }, 6000);
        }
    }
    
    function showErrorNotification(message) {
        console.log('❌ Showing error notification...');
        
        if (emailNotification) {
            // Update notification content
            const titleElement = emailNotification.querySelector('.notification-text h4');
            const messageElement = emailNotification.querySelector('.notification-text p');
            
            if (titleElement) {
                titleElement.innerHTML = `
                    <span class="error-animation">
                        <span class="error-icon">⚠️</span>
                    </span>
                    <span class="error-text">Sending Failed</span>
                `;
            }
            
            if (messageElement) {
                messageElement.innerHTML = `
                    <span class="error-message">${message || 'Failed to send message. Please try again.'}</span>
                    <br>
                    <span class="retry-text">Please check your connection and try again 🔄</span>
                `;
            }
            
            emailNotification.classList.remove('success');
            emailNotification.classList.add('show', 'error');
            
            // Auto hide after 7 seconds for errors
            setTimeout(() => {
                hideEmailNotification();
            }, 7000);
        }
    }
    
    // Add enhanced letter animation styles
    function addEnhancedLetterStyles() {
        if (document.getElementById('enhanced-letter-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'enhanced-letter-styles';
        style.textContent = `
            /* Enhanced Flying Letter */
            .enhanced-flying-letter {
                position: fixed;
                z-index: 10000;
                pointer-events: none;
                filter: drop-shadow(0 10px 20px rgba(0,0,0,0.2));
            }
            
            .letter-envelope {
                position: relative;
                width: 120px;
                height: 80px;
                transform-style: preserve-3d;
            }
            
            .envelope-back {
                position: absolute;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, #f8f9fa, #e9ecef);
                border: 2px solid #667eea;
                border-radius: 8px;
                box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
            }
            
            .envelope-front {
                position: absolute;
                width: 100%;
                height: 60%;
                bottom: 0;
                background: linear-gradient(135deg, #ffffff, #f8f9fa);
                border: 2px solid #667eea;
                border-top: none;
                border-radius: 0 0 8px 8px;
                z-index: 2;
            }
            
            .envelope-flap {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 50%;
                background: linear-gradient(135deg, #667eea, #764ba2);
                clip-path: polygon(0 0, 100% 0, 50% 100%);
                z-index: 3;
                border-radius: 8px 8px 0 0;
            }
            
            .letter-content {
                position: absolute;
                top: 15px;
                left: 10px;
                right: 10px;
                z-index: 1;
                color: #2d3748;
            }
            
            .letter-header {
                font-size: 8px;
                font-weight: bold;
                margin-bottom: 4px;
                color: #4a5568;
            }
            
            .letter-body .line {
                height: 2px;
                background: #cbd5e0;
                margin-bottom: 2px;
                border-radius: 1px;
            }
            
            .line-1 { width: 80%; }
            .line-2 { width: 90%; }
            .line-3 { width: 60%; }
            
            .signature {
                font-size: 6px;
                color: #e53e3e;
                margin-top: 4px;
                font-weight: bold;
            }
            
            .stamp {
                position: absolute;
                top: -5px;
                right: -5px;
                font-size: 20px;
                z-index: 4;
                animation: stampRotate 1s ease-in-out infinite;
            }
            
            .letter-sparkles {
                position: absolute;
                width: 140px;
                height: 100px;
                top: -10px;
                left: -10px;
            }
            
            .sparkle {
                position: absolute;
                font-size: 12px;
                animation: sparkleFloat 2s ease-in-out infinite;
            }
            
            .s1 { top: 10px; left: -20px; animation-delay: 0s; }
            .s2 { top: -10px; right: -15px; animation-delay: 0.7s; }
            .s3 { bottom: 0px; left: 50%; animation-delay: 1.4s; }
            
            /* Success Burst */
            .success-burst {
                position: fixed;
                z-index: 10001;
                pointer-events: none;
            }
            
            .burst-center {
                font-size: 40px;
                animation: burstPulse 2s ease-out;
                text-align: center;
            }
            
            .burst-particles {
                position: absolute;
                width: 100px;
                height: 100px;
                top: -50px;
                left: -50px;
            }
            
            .particle {
                position: absolute;
                font-size: 20px;
                animation: particleBurst 2s ease-out;
            }
            
            .p1 { animation-delay: 0.1s; }
            .p2 { animation-delay: 0.2s; }
            .p3 { animation-delay: 0.3s; }
            .p4 { animation-delay: 0.4s; }
            .p5 { animation-delay: 0.5s; }
            .p6 { animation-delay: 0.6s; }
            
            .success-burst .success-message {
                position: absolute;
                top: 60px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: bold;
                white-space: nowrap;
                box-shadow: 0 4px 15px rgba(16,185,129,0.4);
                animation: messageSlideUp 1s ease-out 0.5s both;
            }
            
            /* Keyframe Animations */
            @keyframes stampRotate {
                0%, 100% { transform: rotate(0deg); }
                50% { transform: rotate(10deg); }
            }
            
            @keyframes sparkleFloat {
                0%, 100% { transform: translateY(0) scale(1); opacity: 0.7; }
                50% { transform: translateY(-8px) scale(1.2); opacity: 1; }
            }
            
            @keyframes burstPulse {
                0% { transform: scale(0); opacity: 0; }
                50% { transform: scale(1.3); opacity: 1; }
                100% { transform: scale(1); opacity: 0.8; }
            }
            
            @keyframes particleBurst {
                0% { transform: translate(0, 0) scale(1); opacity: 1; }
                100% { 
                    transform: translate(var(--x, 50px), var(--y, -50px)) scale(0.3); 
                    opacity: 0; 
                }
            }
            
            .p1 { --x: 60px; --y: -60px; }
            .p2 { --x: -40px; --y: -80px; }
            .p3 { --x: 80px; --y: 20px; }
            .p4 { --x: -60px; --y: 40px; }
            .p5 { --x: 20px; --y: -90px; }
            .p6 { --x: -30px; --y: -20px; }
            
            @keyframes messageSlideUp {
                0% { transform: translateX(-50%) translateY(20px); opacity: 0; }
                100% { transform: translateX(-50%) translateY(0); opacity: 1; }
            }
        `;
        
        document.head.appendChild(style);
        console.log('✨ Enhanced letter styles added');
    }
    
    // Add success animation styles dynamically
    function addSuccessAnimationStyles() {
        // Check if styles already exist
        if (document.getElementById('success-animation-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'success-animation-styles';
        style.textContent = `
            .mail-animation {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                margin-right: 10px;
                animation: mailSendAnimation 2s ease-in-out;
            }
            
            .mail-icon {
                font-size: 1.2em;
                animation: mailBounce 1.5s ease-in-out infinite;
                display: inline-block;
            }
            
            .mail-trail {
                font-size: 0.9em;
                animation: trailSparkle 1s ease-in-out infinite;
                display: inline-block;
            }
            
            .success-text {
                background: linear-gradient(45deg, #10b981, #059669);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                font-weight: 600;
                animation: textGlow 2s ease-in-out;
            }
            
            .success-message {
                color: #047857;
                font-weight: 500;
                animation: slideInUp 0.8s ease-out;
            }
            
            .thanks-text {
                color: #065f46;
                font-size: 0.9em;
                opacity: 0.9;
                animation: fadeInDelay 1.2s ease-out;
            }
            
            .error-animation {
                display: inline-flex;
                align-items: center;
                margin-right: 10px;
            }
            
            .error-icon {
                font-size: 1.2em;
                animation: errorShake 0.8s ease-in-out;
                display: inline-block;
            }
            
            .error-text {
                color: #dc2626;
                font-weight: 600;
            }
            
            .error-message {
                color: #b91c1c;
                font-weight: 500;
            }
            
            .retry-text {
                color: #7f1d1d;
                font-size: 0.9em;
                opacity: 0.8;
            }
            
            /* Keyframe animations */
            @keyframes mailSendAnimation {
                0% { transform: translateX(-20px); opacity: 0; }
                50% { transform: translateX(0); opacity: 1; }
                100% { transform: translateX(0); opacity: 1; }
            }
            
            @keyframes mailBounce {
                0%, 100% { transform: translateY(0) rotate(0deg); }
                25% { transform: translateY(-3px) rotate(2deg); }
                75% { transform: translateY(-1px) rotate(-1deg); }
            }
            
            @keyframes trailSparkle {
                0%, 100% { opacity: 0.3; transform: scale(0.8); }
                50% { opacity: 1; transform: scale(1.2); }
            }
            
            @keyframes textGlow {
                0% { text-shadow: 0 0 5px rgba(16, 185, 129, 0.3); }
                50% { text-shadow: 0 0 15px rgba(16, 185, 129, 0.6), 0 0 25px rgba(16, 185, 129, 0.3); }
                100% { text-shadow: 0 0 5px rgba(16, 185, 129, 0.2); }
            }
            
            @keyframes slideInUp {
                0% { transform: translateY(10px); opacity: 0; }
                100% { transform: translateY(0); opacity: 1; }
            }
            
            @keyframes fadeInDelay {
                0% { opacity: 0; }
                60% { opacity: 0; }
                100% { opacity: 0.9; }
            }
            
            @keyframes errorShake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-3px); }
                20%, 40%, 60%, 80% { transform: translateX(3px); }
            }
            
            /* Enhanced notification styles */
            #email-notification.success .notification-content {
                background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
                border-left: 4px solid #10b981;
                box-shadow: 0 4px 20px rgba(16, 185, 129, 0.15);
                position: relative;
                overflow: hidden;
            }
            
            .success-header {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 10px;
                margin-bottom: 5px;
            }
            
            .logo-success-combo {
                display: flex;
                align-items: center;
                gap: 15px;
                margin-bottom: 5px;
            }
            
            .success-logo {
                position: relative;
                width: 45px;
                height: 45px;
                animation: logoSuccess 2s ease-in-out;
            }
            
            .notification-logo {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                object-fit: cover;
                border: 3px solid #10b981;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4);
                animation: logoGlow 2s ease-in-out infinite alternate;
            }
            
            .success-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: linear-gradient(135deg, #10b981, #059669);
                color: white;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 12px;
                font-weight: bold;
                box-shadow: 0 2px 8px rgba(16, 185, 129, 0.5);
                animation: badgeBounce 1s ease-in-out infinite;
            }
            
            .epic-success-message {
                text-align: center;
            }
            
            .signature-text {
                color: #059669;
                font-size: 0.85em;
                font-weight: 600;
                font-style: italic;
                opacity: 0.9;
                animation: fadeInDelay 1.5s ease-out;
            }
            
            @keyframes logoSuccess {
                0% { transform: scale(0) rotate(-180deg); opacity: 0; }
                50% { transform: scale(1.2) rotate(0deg); opacity: 1; }
                100% { transform: scale(1) rotate(0deg); opacity: 1; }
            }
            
            @keyframes logoGlow {
                0% { box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4); }
                100% { box-shadow: 0 6px 25px rgba(16, 185, 129, 0.7); }
            }
            
            @keyframes badgeBounce {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.2); }
            }
            
            #email-notification.error .notification-content {
                background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
                border-left: 4px solid #dc2626;
                box-shadow: 0 4px 20px rgba(220, 38, 38, 0.15);
            }
        `;
        
        document.head.appendChild(style);
        console.log('✨ Success animation styles added');
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
