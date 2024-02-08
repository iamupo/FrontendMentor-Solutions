document.addEventListener('DOMContentLoaded', function () {
        const themeToggle = document.getElementById('themeToggle');
        const root = document.documentElement;

        // Check if the user has a theme preference in localStorage
        const savedTheme = localStorage.getItem('theme');

        // If a theme preference is found, apply it
        if (savedTheme) {
            themeToggle.checked = savedTheme === 'dark';
            applyTheme();
        } else {
            // If no preference is found, use the default (light) theme
            themeToggle.checked = false;
            applyTheme();
        }

        themeToggle.addEventListener('change', function () {
            applyTheme();

            // Save the user's theme preference in localStorage
            localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
        });

        function applyTheme() {
            if (themeToggle.checked) {
                // Dark Theme
                root.style.setProperty('--White-BG', 'hsl(230, 17%, 14%)');
                root.style.setProperty('--Very-Pal-Blue-Top-BG-Pattern', 'hsl(232, 19%, 15%)');
                root.style.setProperty('--Light-Grayish-Blue-Card-BG', 'hsl(228, 28%, 20%)');
                root.style.setProperty('--Dark-Grayish-Blue-Text', 'hsl(228, 34%, 66%)');
                root.style.setProperty('--Very-Dark-Blue-Text', 'hsl(0, 0%, 100%)');
            } else {
                // Light Theme
                root.style.setProperty('--White-BG', 'hsl(0, 0%, 100%)');
                root.style.setProperty('--Very-Pal-Blue-Top-BG-Pattern', 'hsl(225, 100%, 98%)');
                root.style.setProperty('--Light-Grayish-Blue-Card-BG', 'hsl(227, 47%, 96%)');
                root.style.setProperty('--Dark-Grayish-Blue-Text', 'hsl(228, 12%, 44%)');
                root.style.setProperty('--Very-Dark-Blue-Text', 'hsl(230, 17%, 14%)');
            }
        }
    });