/**
 * Jaskirat Tour and Travels - Main JavaScript
 * Handles general functionality including:
 * - Navigation menu toggle
 * - FAQ accordion
 * - Smooth scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            document.body.classList.toggle('menu-open');
            
            // Toggle menu button appearance
            const spans = this.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (navMenu.classList.contains('active') && 
                !event.target.closest('.nav-menu') && 
                !event.target.closest('.mobile-menu-btn')) {
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Reset menu button appearance
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherToggle = otherItem.querySelector('.faq-toggle i');
                        otherToggle.className = 'fas fa-plus';
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
                
                // Change icon
                const toggle = item.querySelector('.faq-toggle i');
                if (item.classList.contains('active')) {
                    toggle.className = 'fas fa-minus';
                } else {
                    toggle.className = 'fas fa-plus';
                }
            });
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or links to tabs
            if (targetId === '#' || this.closest('.tabs-nav')) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    // Reset menu button appearance
                    const spans = mobileMenuBtn.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                // Calculate header height for offset
                const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                
                // Smooth scroll to target with header offset
                window.scrollTo({
                    top: targetElement.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Video testimonial play button
    const playButton = document.querySelector('.play-button');
    
    if (playButton) {
        playButton.addEventListener('click', function() {
            // In a real implementation, this would play a video
            alert('Video testimonial would play here. This is a placeholder functionality.');
        });
    }
    
    // Handle active navigation based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-menu li a');
    
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href');
            
            if (currentPage === linkPage || 
                (currentPage === '' && linkPage === 'index.html') ||
                (currentPage === '/' && linkPage === 'index.html')) {
                link.parentElement.classList.add('active');
            }
        });
    }
    
    // Back to top button behavior
    const createBackToTopButton = () => {
        // Create button element
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.classList.add('back-to-top-btn');
        backToTopBtn.style.position = 'fixed';
        backToTopBtn.style.bottom = '20px';
        backToTopBtn.style.right = '20px';
        backToTopBtn.style.height = '40px';
        backToTopBtn.style.width = '40px';
        backToTopBtn.style.borderRadius = '50%';
        backToTopBtn.style.backgroundColor = '#FFD700';
        backToTopBtn.style.color = '#1A1A1A';
        backToTopBtn.style.border = 'none';
        backToTopBtn.style.display = 'none';
        backToTopBtn.style.alignItems = 'center';
        backToTopBtn.style.justifyContent = 'center';
        backToTopBtn.style.cursor = 'pointer';
        backToTopBtn.style.zIndex = '99';
        backToTopBtn.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        backToTopBtn.style.transition = 'all 0.3s ease';
        
        // Add to DOM
        document.body.appendChild(backToTopBtn);
        
        // Add event listeners
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        backToTopBtn.addEventListener('mouseenter', () => {
            backToTopBtn.style.backgroundColor = '#E5C100';
        });
        
        backToTopBtn.addEventListener('mouseleave', () => {
            backToTopBtn.style.backgroundColor = '#FFD700';
        });
    };
    
    // Initialize the back to top button
    createBackToTopButton();
});
