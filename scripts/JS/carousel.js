// =============================================
// CAROUSEL.JS - Reusable Carousel Component
// Save as: scripts/JS/carousel.js
// =============================================

// Carousel state
let currentSlide = 0;
let totalSlides = 0;
let slides = [];
let dots = [];
let slidesContainer = null;

// Initialize carousel when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeCarousel();
});

// Initialize carousel functionality
function initializeCarousel() {
    // Get carousel elements
    slides = document.querySelectorAll('.carousel__slide');
    dots = document.querySelectorAll('.carousel__dot');
    slidesContainer = document.querySelector('.carousel__slides');
    
    // Exit if no carousel found
    if (!slidesContainer || slides.length === 0) {
        return;
    }
    
    totalSlides = slides.length;
    
    // Set up touch/swipe support
    setupTouchSupport();
    
    // Set up keyboard navigation
    setupKeyboardNavigation();
    
    // Optional: Set up auto-advance
    // setupAutoAdvance(8000); // Auto-advance every 8 seconds
    
    console.log(`Carousel initialized with ${totalSlides} slides`);
}

// Update carousel position and indicators
function updateCarousel() {
    if (!slidesContainer) return;
    
    // Move slides container
    const translateX = -currentSlide * 100;
    slidesContainer.style.transform = `translateX(${translateX}%)`;
    
    // Update dot indicators
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Add slide change event for analytics/tracking if needed
    // console.log(`Carousel moved to slide ${currentSlide + 1}`);
}

// Go to specific slide
function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    currentSlide = index;
    updateCarousel();
}

// Go to next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// Go to previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Set up touch/swipe support for mobile
function setupTouchSupport() {
    const carousel = document.querySelector('.carousel__wrapper');
    if (!carousel) return;
    
    let startX = 0;
    let isDragging = false;
    let startTime = 0;
    
    carousel.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startTime = Date.now();
        isDragging = true;
    }, { passive: true });
    
    carousel.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        
        // Prevent page scrolling during horizontal swipe
        const currentX = e.touches[0].clientX;
        const diffX = Math.abs(startX - currentX);
        
        if (diffX > 10) {
            e.preventDefault();
        }
    }, { passive: false });
    
    carousel.addEventListener('touchend', function(e) {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        const diffTime = Date.now() - startTime;
        
        // Minimum swipe distance and maximum time for swipe gesture
        if (Math.abs(diffX) > 50 && diffTime < 300) {
            if (diffX > 0) {
                nextSlide(); // Swipe left = next slide
            } else {
                prevSlide(); // Swipe right = previous slide
            }
        }
        
        isDragging = false;
    }, { passive: true });
}

// Set up keyboard navigation
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // Only activate when carousel is in view or focused
        const carousel = document.querySelector('.carousel');
        if (!carousel) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                prevSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                break;
            case 'Home':
                e.preventDefault();
                goToSlide(0);
                break;
            case 'End':
                e.preventDefault();
                goToSlide(totalSlides - 1);
                break;
        }
    });
}

// Optional: Set up auto-advance functionality
function setupAutoAdvance(interval = 8000) {
    let autoAdvanceTimer;
    
    function startAutoAdvance() {
        autoAdvanceTimer = setInterval(nextSlide, interval);
    }
    
    function stopAutoAdvance() {
        if (autoAdvanceTimer) {
            clearInterval(autoAdvanceTimer);
        }
    }
    
    // Start auto-advance
    startAutoAdvance();
    
    // Pause on hover (desktop)
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoAdvance);
        carousel.addEventListener('mouseleave', startAutoAdvance);
    }
    
    // Pause when user interacts
    const interactionEvents = ['touchstart', 'click'];
    interactionEvents.forEach(event => {
        document.addEventListener(event, function() {
            stopAutoAdvance();
            // Restart after 10 seconds of no interaction
            setTimeout(startAutoAdvance, 10000);
        }, { once: true });
    });
}

// Utility function to check if carousel is in viewport
function isCarouselInView() {
    const carousel = document.querySelector('.carousel');
    if (!carousel) return false;
    
    const rect = carousel.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Handle window resize
window.addEventListener('resize', function() {
    // Recalculate carousel position on resize
    updateCarousel();
});

// Export functions for global use (if needed)
window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;