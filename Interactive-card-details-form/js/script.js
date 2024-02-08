(function () {
    try {
        if (!document.documentElement.hasAttribute('data-pg-ia-disabled')) {
            window.pgia_small_mq = typeof pgia_small_mq == 'string' ? pgia_small_mq : '(max-width:767px)';
            window.pgia_large_mq = typeof pgia_large_mq == 'string' ? pgia_large_mq : '(min-width:768px)';
            var style = document.createElement('style');
            var pgcss = 'html:not(.pg-ia-no-preview) [data-pg-ia-hide=""] {opacity:0;visibility:hidden;}html:not(.pg-ia-no-preview) [data-pg-ia-show=""] {opacity:1;visibility:visible;display:block;}';
            if (document.documentElement.hasAttribute('data-pg-id') && document.documentElement.hasAttribute('data-pg-mobile')) {
                pgia_small_mq = '(min-width:0)';
                pgia_large_mq = '(min-width:99999px)'
            }
            pgcss += '@media ' + pgia_small_mq + '{ html:not(.pg-ia-no-preview) [data-pg-ia-hide="mobile"] {opacity:0;visibility:hidden;}html:not(.pg-ia-no-preview) [data-pg-ia-show="mobile"] {opacity:1;visibility:visible;display:block;}}';
            pgcss += '@media ' + pgia_large_mq + '{html:not(.pg-ia-no-preview) [data-pg-ia-hide="desktop"] {opacity:0;visibility:hidden;}html:not(.pg-ia-no-preview) [data-pg-ia-show="desktop"] {opacity:1;visibility:visible;display:block;}}';
            style.innerHTML = pgcss;
            document.querySelector('head').appendChild(style);
        }
    } catch (e) {
        console && console.log(e);
    }
})();


document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const cardNumberInput = document.getElementById('Cardnumber');
    const cardHolderInput = document.getElementById('cardholdername');
    const cardMonthInput = document.getElementById('Cardmonth');
    const cardYearInput = document.getElementById('Cardyear');
    const cardCVCInput = document.getElementById('CVC');

    const cardNumberSpan = document.getElementById('card-number');
    const cardHolderSpan = document.getElementById('card-holder-name');
    const cardDateSpan = document.getElementById('card-date');
    const cardCVC = document.getElementById('card-cvc');

    const nameErrorMsg = document.getElementById('name-error-msg');
    const numberErrorMsg = document.getElementById('number-error-msg');
    const dateErrorMsg = document.getElementById('date-error-msg');
    const cvcErrorMsg = document.getElementById('cvc-error-msg');

    const nameWarningMsg = document.getElementById('name-warning-msg');
    const numberWarningMsg = document.getElementById('number-warning-msg');
    const dateWarningMsg = document.getElementById('date-warning-msg');
    const cvcWarningMsg = document.getElementById('cvc-warning-msg');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        validateForm();
    });

    document.getElementById('continue').addEventListener('click', function (event) {
        event.preventDefault();
        resetForm();
    });

    function updateCardDetails() {
        cardNumberSpan.textContent = formatCardNumber(cardNumberInput.value);
        cardHolderSpan.textContent = cardHolderInput.value.toUpperCase();
        cardDateSpan.textContent = `${cardMonthInput.value.padStart(2, '0')}/${cardYearInput.value.slice(-2)}`;
        cardCVC.textContent = cardCVCInput.value;
    }

    function formatCardNumber(input) {
        return input.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
    }

    function validateForm() {
        resetErrorMessages();

        let isValid = true;

        if (cardHolderInput.value.trim() === '') {
            nameErrorMsg.style.display = 'none';
            nameWarningMsg.style.display = 'block';
            isValid = false;
        }

        if (cardNumberInput.value.trim() === '' || !isValidCardNumber(cardNumberInput.value)) {
            numberErrorMsg.style.display = 'none';
            numberWarningMsg.style.display = 'block';
            isValid = false;
        }

        if (cardMonthInput.value.trim() === '' || cardYearInput.value.trim() === '' || !isValidDate()) {
            dateErrorMsg.style.display = 'none';
            dateWarningMsg.style.display = 'block';
            isValid = false;
        }

        if (cardCVCInput.value.trim() === '' || !isValidCVC()) {
            cvcErrorMsg.style.display = 'none';
            cvcWarningMsg.style.display = 'block';
            isValid = false;
        }

        if (isValid) {
            showConfirmation();
        }
    }

    function isValidCardNumber(cardNumber) {
        return /^\d{16}$/.test(cardNumber);
    }

    function isValidDate() {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth() + 1;

        const enteredYear = parseInt(cardYearInput.value, 10) + 2000;
        const enteredMonth = parseInt(cardMonthInput.value, 10);

        const isYearValid = /^\d{2}$/.test(cardYearInput.value) && enteredYear >= 24 && enteredYear <= currentYear;
        const isMonthValid = /^\d{2}$/.test(cardMonthInput.value) && enteredMonth >= 1 && enteredMonth <= 12;

        if (!isYearValid && cardYearInput.value.trim() !== '') {
            dateErrorMsg.style.display = 'block';
        }

        return isMonthValid && isYearValid;
    }

    function isValidCVC() {
        return /^\d{3}$/.test(cardCVCInput.value);
    }

    function resetErrorMessages() {
        nameErrorMsg.style.display = 'none';
        numberErrorMsg.style.display = 'none';
        dateErrorMsg.style.display = 'none';
        cvcErrorMsg.style.display = 'none';

        nameWarningMsg.style.display = 'none';
        numberWarningMsg.style.display = 'none';
        dateWarningMsg.style.display = 'none';
        cvcWarningMsg.style.display = 'none';
    }

    function showConfirmation() {
        const confirmationSection = document.querySelector('.confirmation');
        const formSection = document.querySelector('form');

        formSection.style.display = 'none';
        confirmationSection.style.display = 'flex';
    }

    function resetForm() {
        form.reset();
        resetErrorMessages();
        updateCardDetails();
        const confirmationSection = document.querySelector('.confirmation');
        const formSection = document.querySelector('form');

        // Clear the date and CVC error messages
        dateErrorMsg.style.display = 'none';
        cvcErrorMsg.style.display = 'none';

        formSection.style.display = 'flex';
        confirmationSection.style.display = 'none';
    }

    form.addEventListener('input', updateCardDetails);
});

