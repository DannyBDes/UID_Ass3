document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const cardNumberInput = document.getElementById('card-number');

    // --- CARD NUMBER AUTO-FORMATTING ---
    if (cardNumberInput) {
        // This function runs every time the user types a character
        cardNumberInput.addEventListener('input', (event) => {
            const input = event.target;

            // 1. Get a "clean" version of the number by removing all spaces and non-digits
            let rawValue = input.value.replace(/\D/g, '');

            // 2. Limit the number to 16 digits
            rawValue = rawValue.substring(0, 16);
            
            // 3. Break the clean number into chunks of 4 digits
            const chunks = rawValue.match(/.{1,4}/g);
            
            // 4. Join the chunks back together with spaces in between
            const formattedValue = chunks ? chunks.join(' ') : '';
            
            // 5. Update the input field with the newly formatted value
            input.value = formattedValue;
        });
    }

    // --- FORM SUBMISSION LOGIC (unchanged) ---
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault(); 
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

            localStorage.removeItem('shoppingCart');
            localStorage.removeItem('cartItemCount');
            alert('Order Placed! Thank you for your purchase.\n(This is a demo - no actual payment was processed).');
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        });
    }
});