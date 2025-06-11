// gdl.js - Linked from index.html, menupage.html, productpage.html, shoppingcart.html)

document.addEventListener('DOMContentLoaded', () => {

    // --- FUNCTION TO UPDATE CART BADGE ---
    function updateCartBadge() {
        try {
            const cartBadge = document.querySelector('.nav-item-cart .cart-badge');
            if (cartBadge) {
                const cartItemCount = parseInt(localStorage.getItem('cartItemCount')) || 0;
                if (cartItemCount > 0) {
                    cartBadge.textContent = cartItemCount;
                    cartBadge.style.display = 'flex'; // Use flex for better number centering
                } else {
                    cartBadge.style.display = 'none';
                }
            }
        } catch (e) {
            console.error("Error updating cart badge:", e);
        }
    }
    updateCartBadge(); // Call on every page load to initialize badge


    // --- FOOTER ACTIVE STATE (Runs on all pages it's linked to) ---
    try {
        const currentPath = window.location.pathname.split("/").pop() || "index.html";
        const navLinks = document.querySelectorAll('.footer-nav .nav-item');
        if (navLinks.length > 0) {
            navLinks.forEach(link => {
                const linkPath = link.getAttribute('href');
                if (linkPath) {
                    const cleanLinkPath = linkPath.startsWith('./') ? linkPath.substring(2) : linkPath;
                    const cleanCurrentPath = currentPath.startsWith('./') ? currentPath.substring(2) : currentPath;

                    // Add a check for the checkout page to also highlight the cart icon
                    if (cleanLinkPath === cleanCurrentPath || (cleanCurrentPath === 'checkout.html' && cleanLinkPath === 'shoppingcart.html')) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                }
            });
        }
    } catch (e) {
        console.error("Error setting footer active state:", e);
    }


    // --- MENU PAGE SEARCH FUNCTIONALITY (Only if search input exists) ---
    const searchInput = document.getElementById('menu-search-input');
    const foodCategoriesOnMenuPage = document.querySelectorAll('main.menu-page-main-content .food-category'); // More specific selector

    if (searchInput && foodCategoriesOnMenuPage.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.trim().toLowerCase();
            foodCategoriesOnMenuPage.forEach(category => {
                const dishItems = category.querySelectorAll('.menu-dish-item');
                let categoryHasVisibleDishes = false;
                dishItems.forEach(dishItem => {
                    const dishNameElement = dishItem.querySelector('.dish-info-overlay p');
                    if (dishNameElement) {
                        const dishName = dishNameElement.textContent.trim().toLowerCase();
                        if (dishName.includes(searchTerm)) {
                            dishItem.classList.remove('dish-item-hidden');
                            categoryHasVisibleDishes = true;
                        } else {
                            dishItem.classList.add('dish-item-hidden');
                        }
                    }
                });
                const categoryTitle = category.querySelector('h2');
                const categorySection = category;
                if (categoryHasVisibleDishes) {
                    if (categoryTitle) categoryTitle.style.display = 'block';
                    if (categorySection) categorySection.style.display = 'block';
                } else {
                    if (categoryTitle) categoryTitle.style.display = 'none';
                    if (categorySection) categorySection.style.display = 'none';
                }
            });
        });
    }


    // --- CART PAGE DYNAMIC FUNCTIONALITY ---
    const cartItemsContainer = document.getElementById('cart-items-container');
    const cartTotalPriceElement = document.getElementById('cart-total-price');
    const cartPageTabs = document.querySelectorAll('.tabs .tab-link'); // Used for cart page check
    const cartPageTabContents = document.querySelectorAll('.order-options-container .tab-content');
    const confirmPurchaseButton = document.getElementById('confirm-purchase-button');
    const cartSectionTitle = document.querySelector('main.cart-content-area .cart-section-title'); // More specific
    const pickupTimeElement = document.getElementById('pickup-time'); // Get the pickup time span

    function setEstimatedPickupTime() {
        if (pickupTimeElement) { 
            const now = new Date();
            const pickupTime = new Date(now.getTime() + 20 * 60000); // Add 20 minutes

            let hours = pickupTime.getHours();
            let minutes = pickupTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';

            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;

            const formattedTime = `${hours}:${minutes} ${ampm}`;
            pickupTimeElement.textContent = formattedTime;
        } 
    } 

    function renderCart() {
        if (!cartItemsContainer || !cartTotalPriceElement) return; // Only run if cart elements exist

        const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let currentTotal = 0;

        // Update cartItemCount in localStorage based on current cart length THEN update badge
        localStorage.setItem('cartItemCount', cart.length.toString());
        updateCartBadge();

        const totalSection = document.querySelector('.cart-total-section');
        const optionsContainer = document.querySelector('.order-options-container');
        const issuesSection = document.querySelector('.issues-call-section');

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="cart-empty-message">Your shopping cart is empty. <a href="menupage.html">Continue Shopping</a></p>';
            cartTotalPriceElement.textContent = '$0';
            if (cartSectionTitle) cartSectionTitle.textContent = "Your Cart is Empty";
            if (totalSection) totalSection.classList.add('hidden');
            if (optionsContainer) optionsContainer.classList.add('hidden');
            if (issuesSection) issuesSection.classList.add('hidden');
            if (confirmPurchaseButton) confirmPurchaseButton.classList.add('hidden');
        } else {
            if (cartSectionTitle) cartSectionTitle.textContent = "Your Items:";
            if (totalSection) totalSection.classList.remove('hidden');
            if (optionsContainer) optionsContainer.classList.remove('hidden');
            if (issuesSection) issuesSection.classList.remove('hidden');
            if (confirmPurchaseButton) confirmPurchaseButton.classList.remove('hidden');

            cart.forEach(item => {
                const itemTotalPrice = item.pricePerItem * item.quantity;
                currentTotal += itemTotalPrice;
                const cartItemDiv = document.createElement('div');
                cartItemDiv.classList.add('cart-item');
                cartItemDiv.setAttribute('data-cart-item-id', item.cartItemId);
                let toppingsHTML = '';
                if (item.selectedToppings && item.selectedToppings.length > 0) {
                    toppingsHTML = `<span class="item-toppings">Toppings: ${item.selectedToppings.join(', ')}</span>`;
                }
                cartItemDiv.innerHTML = `
                    <div class="cart-item-details">
                        <span class="item-name">${item.name}</span>
                        <span class="item-quantity">x ${item.quantity}</span>
                        ${toppingsHTML}
                    </div>
                    <div class="cart-item-visuals">
                        <span class="item-price">$${itemTotalPrice.toFixed(0)}</span>
                        <img src="${item.imageSrc}" alt="${item.name}" class="cart-item-image">
                        <button class="delete-item-btn" aria-label="Delete item">×</button>
                    </div>
                `;
                cartItemsContainer.appendChild(cartItemDiv);
            });
            cartTotalPriceElement.textContent = `$${currentTotal.toFixed(0)}`;
        }
        addDeleteButtonListeners();
    }

    function addDeleteButtonListeners() {
        if (!cartItemsContainer) return;
        const deleteButtons = cartItemsContainer.querySelectorAll('.delete-item-btn');
        deleteButtons.forEach(button => {
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);

            newButton.addEventListener('click', function() {
                const cartItemDiv = this.closest('.cart-item');
                if (cartItemDiv) {
                    const cartItemIdToDelete = cartItemDiv.getAttribute('data-cart-item-id');
                    deleteCartItem(cartItemIdToDelete);
                }
            });
        });
    }

    function deleteCartItem(cartItemIdToDelete) {
        let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
        cart = cart.filter(item => item.cartItemId !== cartItemIdToDelete);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
        renderCart(); // Re-render the cart, which will update count and badge
    }

    // Logic specific to cart page (tabs, confirm purchase)
    if (cartPageTabs.length > 0 && cartItemsContainer) { // Check if essential cart page elements exist
        setEstimatedPickupTime(); // Set the time when cart specific elements are confirmed
        renderCart(); // Initial render of the cart

        cartPageTabs.forEach(link => {
            link.addEventListener('click', () => {
                const tabId = link.getAttribute('data-tab');
                cartPageTabs.forEach(innerLink => innerLink.classList.remove('active'));
                if (cartPageTabContents.length > 0) {
                    cartPageTabContents.forEach(content => content.classList.remove('active'));
                }
                link.classList.add('active');
                const activeContent = document.getElementById(tabId);
                if (activeContent) activeContent.classList.add('active');
            });
        });

        if (confirmPurchaseButton) {
            confirmPurchaseButton.addEventListener('click', () => {
                const cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
                if (cart.length === 0) {
                    alert("Your cart is empty. Please add items before confirming purchase.");
                    return;
                }

                const activeTab = document.querySelector('.tabs .tab-link.active');
                const orderType = activeTab ? activeTab.textContent.trim() : 'Pick Up';
                
                // If delivery is selected, ensure an address is entered before proceeding
                if (orderType === 'Delivery') {
                    const addressInput = document.getElementById('delivery-address');
                    if (!addressInput || !addressInput.value.trim()) {
                        alert('Please enter your delivery address before proceeding to checkout.');
                        return;
                    }
                }
                
                // All checks passed, proceed to checkout page
                window.location.href = 'checkout.html';
            });
        }
    }
});