// checkout.js
document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Stop the form from submitting the default way

            // Basic validation check
            const inputs = checkoutForm.querySelectorAll('input[required]');
            let allFieldsFilled = true;
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    allFieldsFilled = false;
                }
            });

            if (!allFieldsFilled) {
                alert('Please fill out all required fields.');
                return;
            }

            // If validation passes:
            // 1. Clear the cart from localStorage
            localStorage.removeItem('shoppingCart');
            localStorage.removeItem('cartItemCount');

            // 2. Show a confirmation message
            alert('Order Placed! Thank you for your purchase.\n(This is a demo - no actual payment was processed).');

            // 3. Redirect to the homepage after a short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000); // 1-second delay
        });
    }
});