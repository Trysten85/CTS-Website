// =============================================
// CAROUSEL.JS - Universal Carousel Component
// Supports both services carousel and Kodiak carousel
// Save as: scripts/JS/carousel.js
// =============================================

// Detect which carousel type is on the page
let isServicesPage = false;
let isKodiakPage = false;

// Shared carousel state
let currentSlide = 0;
let totalSlides = 0;
let slides = [];
let indicators = [];
let slidesContainer = null;

// Initialize carousels when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check which type of page we're on
    isServicesPage = document.querySelector('.services-carousel') !== null;
    isKodiakPage = document.querySelector('.kodiak-carousel') !== null;
    
    if (isServicesPage) {
        initializeServicesCarousel();
    }
    
    if (isKodiakPage) {
        initializeKodiakCarousel();
    }
});

// =============================================
// SERVICES CAROUSEL (index.html)
// =============================================

function initializeServicesCarousel() {
    // Get carousel elements for services
    slides = document.querySelectorAll('.carousel__slide');
    indicators = document.querySelectorAll('.carousel__dot');
    slidesContainer = document.querySelector('.carousel__slides');
    
    // Exit if no carousel found
    if (!slidesContainer || slides.length === 0) {
        console.log('No services carousel found');
        return;
    }
    
    totalSlides = slides.length;
    
    // Set up touch/swipe support
    setupTouchSupport();
    
    // Set up keyboard navigation
    setupKeyboardNavigation();
    
    console.log(`Services carousel initialized with ${totalSlides} slides`);
}

// Update services carousel position and indicators
function updateServicesCarousel() {
    if (!slidesContainer) return;
    
    // Move slides container
    const translateX = -currentSlide * 100;
    slidesContainer.style.transform = `translateX(${translateX}%)`;
    
    // Update dot indicators
    indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Set up touch/swipe support for mobile (services carousel)
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

// Handle window resize for services carousel
window.addEventListener('resize', function() {
    if (isServicesPage) {
        updateServicesCarousel();
    }
});

// =============================================
// KODIAK CAROUSEL (kodiak.html)
// =============================================

function initializeKodiakCarousel() {
    // Get carousel elements for Kodiak
    slides = document.querySelectorAll('.kodiak-carousel .carousel-slide');
    indicators = document.querySelectorAll('.kodiak-carousel .carousel-indicator');
    totalSlides = slides.length;
    
    // Exit if no Kodiak carousel found
    if (totalSlides === 0) {
        console.log('No Kodiak carousel found');
        return;
    }
    
    // Set up keyboard navigation
    setupKeyboardNavigation();
    
    console.log(`Kodiak carousel initialized with ${totalSlides} slides`);
}

// Update Kodiak carousel (show/hide slides)
function updateKodiakCarousel() {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Show current slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// =============================================
// SHARED NAVIGATION FUNCTIONS
// These work for BOTH carousels
// =============================================

// Go to specific slide
function goToSlide(index) {
    if (index < 0 || index >= totalSlides) return;
    
    currentSlide = index;
    
    if (isServicesPage) {
        updateServicesCarousel();
    } else if (isKodiakPage) {
        updateKodiakCarousel();
    }
}

// Go to next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    
    if (isServicesPage) {
        updateServicesCarousel();
    } else if (isKodiakPage) {
        updateKodiakCarousel();
    }
}

// Go to previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    
    if (isServicesPage) {
        updateServicesCarousel();
    } else if (isKodiakPage) {
        updateKodiakCarousel();
    }
}

// Alias for Kodiak compatibility
function showSlide(index) {
    goToSlide(index);
}

// =============================================
// SHARED KEYBOARD NAVIGATION
// =============================================

function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
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

// =============================================
// OPTIONAL: AUTO-ADVANCE
// =============================================

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
    const carousel = document.querySelector('.carousel, .kodiak-carousel');
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

// Export functions for global use
window.goToSlide = goToSlide;
window.nextSlide = nextSlide;
window.prevSlide = prevSlide;
window.showSlide = showSlide;