// Theme Toggle Functionality
// Works with reusable animated-toggle component

const currentTheme = localStorage.getItem('theme') || 'light-mode';
document.body.classList.add(currentTheme);

function updateToggleIcon() {
    const toggleIcon = document.querySelector('.animated-toggle-icon');
    if (document.body.classList.contains('dark-mode')) {
        toggleIcon.textContent = '☀️';
    } else {
        toggleIcon.textContent = '🌙';
    }
}

function toggleTheme() {
    const toggleBtn = document.getElementById('theme-toggle');
    
    // Start animation first
    toggleBtn.classList.add('changing');
    
    // Change theme and icon at peak of rise (50% of 0.6s = 300ms)
    setTimeout(() => {
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
    }, 300); // Icon change at peak (50% of 600ms)
    
    // Remove animation class when complete
    setTimeout(() => {
        toggleBtn.classList.remove('changing');
    }, 600); // Full animation duration
}

document.addEventListener('DOMContentLoaded', updateToggleIcon);