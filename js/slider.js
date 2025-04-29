/**
 * Jaskirat Tour and Travels - Slider JavaScript
 * Handles the fleet showcase slider functionality
 */

document.addEventListener('DOMContentLoaded', function() {
    // Fleet showcase slider
    const fleetSlider = document.querySelector('.fleet-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    if (fleetSlider && prevBtn && nextBtn) {
        // Get all fleet cards
        const fleetCards = fleetSlider.querySelectorAll('.fleet-card');
        
        // Variables for slider
        let currentIndex = 0;
        let cardsToShow = calculateCardsToShow();
        let cardWidth = 0;
        let sliderWidth = 0;
        let maxIndex = 0;
        
        // Calculate number of cards to show based on viewport width
        function calculateCardsToShow() {
            if (window.innerWidth >= 1200) {
                return 3; // Show 3 cards on large screens
            } else if (window.innerWidth >= 768) {
                return 2; // Show 2 cards on medium screens
            } else {
                return 1; // Show 1 card on small screens
            }
        }
        
        // Initialize slider dimensions
        function initSlider() {
            // Update cards to show based on current viewport
            cardsToShow = calculateCardsToShow();
            
            // Calculate card and slider width
            if (fleetCards.length > 0) {
                // Calculate the parent container width
                const parentWidth = fleetSlider.parentElement.offsetWidth;
                
                // Set the total slider width to 100% of parent
                sliderWidth = parentWidth;
                
                // Calculate individual card width with gap
                // 3% margin between cards (1.5% on each side)
                const totalGapPercentage = (cardsToShow - 1) * 3; 
                const cardWidthPercentage = (100 - totalGapPercentage) / cardsToShow;
                
                // Apply the calculated width to each card with percentage
                fleetCards.forEach(card => {
                    card.style.width = `${cardWidthPercentage}%`;
                    card.style.marginRight = '3%';
                });
                
                // Remove margin from last visible card
                if (fleetCards[fleetCards.length - 1]) {
                    fleetCards[fleetCards.length - 1].style.marginRight = '0';
                }
                
                // Set card width for calculations (use first card's computed width)
                cardWidth = fleetCards[0].offsetWidth + (sliderWidth * 0.03); // Card width + margin
                
                // Calculate maximum index
                maxIndex = Math.max(0, fleetCards.length - cardsToShow);
                
                // Reset position to handle viewport changes
                goToSlide(currentIndex);
            }
        }
        
        // Go to specific slide
        function goToSlide(index) {
            if (index < 0) {
                index = 0;
            } else if (index > maxIndex) {
                index = maxIndex;
            }
            
            currentIndex = index;
            const translateX = -index * cardWidth;
            fleetSlider.style.transform = `translateX(${translateX}px)`;
            
            // Update button states
            updateButtonStates();
        }
        
        // Update button disabled states
        function updateButtonStates() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex === maxIndex;
            
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex === maxIndex ? '0.5' : '1';
        }
        
        // Event listeners for buttons
        prevBtn.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });
        
        // Handle touch/swipe events for mobile
        let touchStartX = 0;
        let touchEndX = 0;
        
        fleetSlider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        fleetSlider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum swipe distance (in px)
            
            if (touchStartX - touchEndX > swipeThreshold) {
                // Swipe left, go to next slide
                goToSlide(currentIndex + 1);
            } else if (touchEndX - touchStartX > swipeThreshold) {
                // Swipe right, go to previous slide
                goToSlide(currentIndex - 1);
            }
        }
        
        // Handle window resize
        window.addEventListener('resize', () => {
            initSlider();
        });
        
        // Initialize
        initSlider();
        
        // Auto-play functionality
        let autoplayInterval;
        const autoplayDelay = 5000; // 5 seconds
        
        function startAutoplay() {
            autoplayInterval = setInterval(() => {
                if (currentIndex < maxIndex) {
                    goToSlide(currentIndex + 1);
                } else {
                    goToSlide(0); // Loop back to the beginning
                }
            }, autoplayDelay);
        }
        
        function stopAutoplay() {
            clearInterval(autoplayInterval);
        }
        
        // Start autoplay on page load
        startAutoplay();
        
        // Pause autoplay on interaction
        fleetSlider.addEventListener('mouseenter', stopAutoplay);
        prevBtn.addEventListener('mouseenter', stopAutoplay);
        nextBtn.addEventListener('mouseenter', stopAutoplay);
        
        // Resume autoplay when mouse leaves
        fleetSlider.addEventListener('mouseleave', startAutoplay);
        prevBtn.addEventListener('mouseleave', startAutoplay);
        nextBtn.addEventListener('mouseleave', startAutoplay);
        
        // Pause on touch
        fleetSlider.addEventListener('touchstart', stopAutoplay);
        
        // Resume autoplay after touch interaction
        fleetSlider.addEventListener('touchend', () => {
            setTimeout(startAutoplay, 1000); // Brief delay before resuming
        });
    }
    
    // Automatically move to the next slide every few seconds
    function setupAutoSlider() {
        const testimonialCards = document.querySelectorAll('.testimonial-card');
        let currentTestimonial = 0;
        
        // Only setup auto slider on homepage testimonial
        if (window.location.pathname.endsWith('index.html') || 
            window.location.pathname === '/' || 
            window.location.pathname === '') {
            
            if (testimonialCards.length > 1) {
                setInterval(() => {
                    // Hide current testimonial with fade
                    const current = testimonialCards[currentTestimonial];
                    current.style.opacity = '0';
                    
                    // Move to next testimonial
                    setTimeout(() => {
                        current.style.display = 'none';
                        
                        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
                        
                        // Show next testimonial with fade
                        const next = testimonialCards[currentTestimonial];
                        next.style.display = 'block';
                        
                        setTimeout(() => {
                            next.style.opacity = '1';
                        }, 50);
                    }, 500);
                    
                }, 8000); // Change testimonial every 8 seconds
                
                // Initialize: hide all except first
                testimonialCards.forEach((card, index) => {
                    if (index > 0) {
                        card.style.display = 'none';
                        card.style.opacity = '0';
                    } else {
                        card.style.opacity = '1';
                    }
                    
                    // Add transition effect
                    card.style.transition = 'opacity 0.5s ease';
                });
            }
        }
    }
    
    // Initialize testimonial auto slider
    setupAutoSlider();
});
