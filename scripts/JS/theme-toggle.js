// Theme Toggle Functionality
// Toggles between light and dark mode

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light-mode';
document.body.classList.add(currentTheme);

// Update button icon based on current theme
function updateToggleIcon() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (document.body.classList.contains('dark-mode')) {
        toggleBtn.textContent = '☀️'; // Sun for dark mode (click to go light)
    } else {
        toggleBtn.textContent = '🌙'; // Moon for light mode (click to go dark)
    }
}

// Toggle theme function
function toggleTheme() {
    if (document.body.classList.contains('light-mode')) {
        document.body.classList.remove('light-mode');
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light-mode');
    }
    updateToggleIcon();
}

// Initialize icon on page load
document.addEventListener('DOMContentLoaded', updateToggleIcon);