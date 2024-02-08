document.addEventListener("DOMContentLoaded", function () {
    // Get elements
    const billInput = document.getElementById("bill-input");
    const tipButtons = document.querySelectorAll(".percent-btn");
    const customTipInput = document.getElementById("custom-tab");
    const numberInput = document.getElementById("number-input");
    const tipAmountResult = document.querySelector(".tip-amount-result output");
    const totalAmountResult = document.querySelector(".total-amount-result output");
    const resetButton = document.getElementById("reset");

    // Initialize default tip percentage
    let tipPercentage = 0.15;

    // Function to update the tip and total amounts
    function updateResults() {
        // Validate inputs
        const billAmount = parseFloat(billInput.value);
        const numberOfPeople = parseInt(numberInput.value);

        if (isNaN(billAmount) || isNaN(numberOfPeople) || billAmount <= 0 || numberOfPeople <= 0) {
            // Display an error or handle invalid input
            return;
        }

        // Calculate tip and total amounts
        const tipAmount = billAmount * tipPercentage / numberOfPeople;
        const totalAmount = (billAmount + billAmount * tipPercentage) / numberOfPeople;

        // Update the result elements
        tipAmountResult.textContent = `$${tipAmount.toFixed(2)}`;
        totalAmountResult.textContent = `$${totalAmount.toFixed(2)}`;
    }

    // Function to update the active tip button
    function updateActiveTipButton(button) {
        tipButtons.forEach(btn => btn.classList.remove("active-tip"));
        button.classList.add("active-tip");
        // Update the tip percentage based on the selected button
        tipPercentage = parseFloat(button.textContent.replace("%", "")) / 100;
        // Update the results when the tip percentage changes
        updateResults();
    }

    // Event listeners for tip buttons
    tipButtons.forEach(button => {
        button.addEventListener("click", function () {
            updateActiveTipButton(this);
        });
    });

    // Event listener for custom tip input
    customTipInput.addEventListener("input", function () {
        // Update the tip percentage when the custom tip is entered
        tipPercentage = parseFloat(this.value) / 100 || 0;
        // Update the results when the tip percentage changes
        updateResults();
    });

    // Event listeners for bill input and number of people input
    billInput.addEventListener("input", updateResults);
    numberInput.addEventListener("input", updateResults);

    // Event listener for reset button
    resetButton.addEventListener("click", function () {
        // Reset all input values and results
        billInput.value = "";
        tipButtons.forEach(btn => btn.classList.remove("active-tip"));
        customTipInput.value = "";
        numberInput.value = "";
        tipAmountResult.textContent = "$0.00";
        totalAmountResult.textContent = "$0.00";
    });
});
