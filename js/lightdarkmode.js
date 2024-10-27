const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const darkModeStylesheet = document.getElementById('dark-mode');

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('style', 'background: #26262d'); // Dark background color
        darkModeStylesheet.disabled = false;
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('style', 'background: #ffffff'); // Light background color
        darkModeStylesheet.disabled = true;
        localStorage.setItem('theme', 'light');
    }
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    toggleSwitch.checked = savedTheme === 'dark';
    darkModeStylesheet.disabled = savedTheme !== 'dark';
    // No need to set background color here, as it's handled by the inline script in HTML
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', applySavedTheme);

toggleSwitch.addEventListener('change', switchTheme, false);

