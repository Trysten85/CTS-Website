// =============================================
// CONTACT-DISPLAY.JS - Displays Contact Information
// Save as: scripts/JS/contact-display.js
// 
// This file is safe - contains no private data
// Just loads data from contact-data.js
// =============================================

document.addEventListener('DOMContentLoaded', function() {
    // Wait for contact data to be available
    if (!window.CONTACT_DATA) {
        console.error('Contact data not loaded. Make sure contact-data.js is included before contact-display.js');
        return;
    }

    const data = window.CONTACT_DATA;

    // Populate Address
    const addressElement = document.querySelector('#contact-address');
    if (addressElement && data.address) {
        addressElement.innerHTML = `
            ${data.address.street}<br>
            ${data.address.city}, ${data.address.state} ${data.address.zip}
        `;
    }

    // Populate Phone
    const phoneElement = document.querySelector('#contact-phone');
    if (phoneElement && data.phone) {
        phoneElement.textContent = data.phone;
    }

    // Populate Email
    const emailElement = document.querySelector('#contact-email');
    if (emailElement && data.email) {
        emailElement.textContent = data.email;
    }

    // Populate Business Hours
    const hoursElement = document.querySelector('#contact-hours');
    if (hoursElement && data.hours) {
        hoursElement.innerHTML = `
            ${data.hours.weekdays}<br>
            ${data.hours.saturday}<br>
            ${data.hours.sunday}
        `;
    }

    // Load Google Maps Embed
    const mapElement = document.querySelector('#google-map-embed');
    if (mapElement && data.googleMapsEmbed) {
        mapElement.innerHTML = `
            <iframe 
                src="${data.googleMapsEmbed}"
                width="100%" 
                height="300" 
                style="border:0;" 
                allowfullscreen="" 
                loading="lazy" 
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        `;
    }

    console.log('Contact information loaded successfully');
});