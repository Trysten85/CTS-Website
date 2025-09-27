document.addEventListener('DOMContentLoaded', () => {
    // NAVBAR NAVIGATION - Handles main site navigation
    const navLinks = document.querySelectorAll('.navbar a[data-section]');

    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();

            const sectionId = event.target.getAttribute('data-section') || 
                             event.target.closest('a').getAttribute('data-section');

            // Exit service page mode and return to normal navigation
            exitServicePageMode();
            
            // Scroll to the requested section
            setTimeout(() => {
                scrollToSection(sectionId);
            }, 50);
        });
    });

    // Handle URL hash on page load
    const hash = window.location.hash;
    if (hash) {
        const sectionId = hash.replace('#', '');
        setTimeout(() => {
            scrollToSection(sectionId);
        }, 100);
    }
});

// SERVICE BOX NAVIGATION - Handles clicking on service boxes
function showSection(sectionId) {
    console.log('Navigating to:', sectionId);
    
    const mainSections = ['home', 'services', 'about', 'contact'];
    
    if (mainSections.includes(sectionId)) {
        // Returning to main navigation
        exitServicePageMode();
        setTimeout(() => {
            scrollToSection(sectionId);
        }, 50);
    } else {
        // Entering service page mode
        enterServicePageMode(sectionId);
    }
}

// Enter service page mode - shows only the selected service page
function enterServicePageMode(sectionId) {
    // Add class to body to trigger CSS changes
    document.body.classList.add('service-page-active');
    
    // Hide all service pages first
    const servicePages = document.querySelectorAll('#kodiak-services, #testing, #maintenance, #inspection, #refurbishment');
    servicePages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the target service page
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        // Scroll to top when showing service page
        window.scrollTo({ top: 0, behavior: 'smooth' });
        console.log('Service page shown:', sectionId);
    } else {
        console.error(`Section with ID "${sectionId}" not found.`);
    }
}

// Exit service page mode - returns to normal scrollable navigation
function exitServicePageMode() {
    // Remove class from body
    document.body.classList.remove('service-page-active');
    
    // Remove active class from all service pages
    const servicePages = document.querySelectorAll('#kodiak-services, #testing, #maintenance, #inspection, #refurbishment');
    servicePages.forEach(page => {
        page.classList.remove('active');
    });
    
    console.log('Returned to normal navigation mode');
}

// Smooth scroll to section
function scrollToSection(sectionId) {
    console.log('Scrolling to:', sectionId);
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    } else {
        console.error(`Section with ID "${sectionId}" not found.`);
    }
}