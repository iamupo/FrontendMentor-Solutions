document.addEventListener('DOMContentLoaded', function () {
    // Get all toggle elements
    const toggleElements = document.querySelectorAll('.toggle');

    toggleElements.forEach(function (toggleElement) {
        // Initialize the state of each answer
        const answer = toggleElement.nextElementSibling;
        answer.style.maxHeight = '0';

        // Event listener for click on the question
        toggleElement.addEventListener('click', function () {
            // Close all other open questions
            toggleElements.forEach(function (otherToggle) {
                if (otherToggle !== toggleElement) {
                    otherToggle.classList.remove('active');
                    const otherAnswer = otherToggle.nextElementSibling;
                    otherAnswer.style.maxHeight = '0';
                    updateIcons(otherToggle, 'icon-plus');
                }
            });

            // Toggle the 'active' class for the clicked question
            toggleElement.classList.toggle('active');

            // Toggle the visibility of the associated answer with a smooth transition
            if (answer.style.maxHeight === '0px') {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                updateIcons(toggleElement, 'icon-minus');
            } else {
                answer.style.maxHeight = '0';
                updateIcons(toggleElement, 'icon-plus');
            }
        });

        // Handle keyboard navigation
        toggleElement.addEventListener('keydown', function (event) {
            if (event.key === 'Enter' || event.key === ' ') {
                // Simulate a click when Enter or Space is pressed
                toggleElement.click();
            }
        });
    });

    // Function to update toggle icons
    function updateIcons(element, iconClass) {
        const plusIcon = element.querySelector('.icon-plus');
        const minusIcon = element.querySelector('.icon-minus');

        if (plusIcon && minusIcon) {
            plusIcon.style.display = iconClass === 'icon-plus' ? 'inline' : 'none';
            minusIcon.style.display = iconClass === 'icon-minus' ? 'inline' : 'none';
        }
    }
});
