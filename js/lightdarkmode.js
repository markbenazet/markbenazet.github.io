const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const darkModeStylesheet = document.getElementById('dark-mode');

function switchTheme(e) {
    // Add the transition class to manage all transitions
    document.body.classList.add('theme-transition');
    
    // Use setTimeout to allow the transition class to take effect
    setTimeout(() => {
        if (e.target.checked) {
            document.documentElement.setAttribute('style', 'background: #26262d'); // Dark background color
            darkModeStylesheet.disabled = false;
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.setAttribute('style', 'background: #ffffff'); // Light background color
            darkModeStylesheet.disabled = true;
            localStorage.setItem('theme', 'light');
        }
        
        // Remove the transition class after the transitions are complete
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300); // Match this to your CSS transition duration
    }, 10);
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    toggleSwitch.checked = savedTheme === 'dark';
    
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('style', 'background: #26262d'); // Dark background color
        darkModeStylesheet.disabled = false;
    } else {
        document.documentElement.setAttribute('style', 'background: #ffffff'); // Light background color
        darkModeStylesheet.disabled = true;
    }
}

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', applySavedTheme);
toggleSwitch.addEventListener('change', switchTheme, false);