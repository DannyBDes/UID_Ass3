// --- DISH DATA ---
// This is where you'll add data for all your dishes.
// Make sure the 'id' matches the query parameter from menupage.html (e.g., 'peking-duck')
const dishesData = [
    {
        id: "peking-duck",
        name: "Peking Duck",
        price: "$17",
        imageSrc: "top-view-traditional-asian-food-peking-duck-with-cucumbers-sauce-plate.jpg",
        description: "Succulent roasted duck, provided with Chinese pancakes, cucumbers and scallions.",
        toppings: ["Chilli", "Cucumber", "Pancake","Scallions", "Hoisin Sauce"]
    },
    {
        id: "taro-duck",
        name: "Deep Fried Taro Duck",
        price: "$28",
        imageSrc: "duckduck-Photoroom.png", // Replace with actual image
        description: "Crispy deep-fried duck with a layer of savory taro paste. A unique and flavourful specialty.",
        toppings: ["Chilli", "Taro Sauce", "Lettuce Cups"]
    },
    {
        id: "sweet-sour-pork",
        name: "Sweet and Sour Pork",
        price: "$21",
        imageSrc: "sasp.jpg",
        description: "Juicy pork served in sweet and sour sauce. Servcd with mixed vegetables and rice",
        toppings: ["Carrots", "Peppers", "Sauce", "Rice"]
    },
    {
        id: "crispy-roast-pork",
        name: "Crispy Roast Pork",
        price: "$23",
        imageSrc: "crispypork.jpg",
        description: "Cantonese-style siu yuk with incredibly crispy skin and tender juicy meat beneath.",
        toppings: ["Hoisin Dip", "Mustard Dip", "Rice"]
    },
    {
        id: "stir-fried-pork",
        name: "Stir Fried Pork",
        price: "$20",
        imageSrc: "sfpork.jpg",
        description: "Tender slices of pork stir-fried with fresh vegetables in a savory sauce.",
        toppings: ["Chilli", "Mixed Vegetables", "Peppers", "Soy Sauce", "Rice"]
    }
    // Add more dish objects here following the same structure
    // {
    //     id: "new-dish-id",
    //     name: "New Dish Name",
    //     price: "$XX",
    //     imageSrc: "new-dish-image.jpg",
    //     description: "Description for the new dish.",
    //     toppings: ["Topping1", "Topping2"]
    // }
];

// --- JAVASCRIPT LOGIC ---
document.addEventListener('DOMContentLoaded', () => {
    const productImage = document.getElementById('product-image');
    const productNameEl = document.getElementById('product-name');
    const productPriceEl = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');
    const toppingsListContainer = document.getElementById('product-toppings-list');
    const addToCartButton = document.getElementById('add-to-cart-button');
    const closeButtons = document.querySelectorAll('.product-close-button');

    const urlParams = new URLSearchParams(window.location.search);
    const dishId = urlParams.get('dish');
    const currentDish = dishesData.find(dish => dish.id === dishId);

    if (currentDish) {
        document.title = `${currentDish.name} - Golden Dragon`;
        if (productImage) { productImage.src = currentDish.imageSrc; productImage.alt = currentDish.name; }
        if (productNameEl) productNameEl.textContent = currentDish.name;
        if (productPriceEl) productPriceEl.textContent = `$${currentDish.price}`;
        if (productDescription) productDescription.textContent = currentDish.description;

        if (toppingsListContainer) {
            toppingsListContainer.innerHTML = '';
            const toppingsHeading = document.querySelector('.toppings-heading');
            if (currentDish.toppings && currentDish.toppings.length > 0) {
                if (toppingsHeading) toppingsHeading.style.display = 'block';
                const ul = document.createElement('ul');
                currentDish.toppings.forEach((topping, index) => {
                    const li = document.createElement('li');
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `topping-${currentDish.id}-${index}`;
                    checkbox.name = 'toppings';
                    checkbox.value = topping;
                    checkbox.checked = true; // Default to checked
                    const label = document.createElement('label');
                    label.htmlFor = checkbox.id;
                    label.textContent = topping;
                    li.appendChild(checkbox);
                    li.appendChild(label);
                    ul.appendChild(li);
                });
                toppingsListContainer.appendChild(ul);
            } else {
                if (toppingsHeading) toppingsHeading.style.display = 'none';
            }
        }

        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                const selectedToppings = [];
                if (toppingsListContainer) {
                    const checkboxes = toppingsListContainer.querySelectorAll('input[type="checkbox"]:checked');
                    checkboxes.forEach(checkbox => {
                        selectedToppings.push(checkbox.value);
                    });
                }

                const cartItemId = `${currentDish.id}-${Date.now()}-${selectedToppings.join('-').replace(/\s+/g, '').substring(0,10)}`;

                const cartItem = {
                    cartItemId: cartItemId,
                    productId: currentDish.id,
                    name: currentDish.name,
                    pricePerItem: currentDish.price,
                    quantity: 1, // Each add creates a new distinct item for simplicity here
                    imageSrc: currentDish.imageSrc,
                    selectedToppings: selectedToppings
                };

                let cart = JSON.parse(localStorage.getItem('shoppingCart')) || [];
                cart.push(cartItem);
                localStorage.setItem('shoppingCart', JSON.stringify(cart));

                // Update cart item count for the badge
                localStorage.setItem('cartItemCount', cart.length.toString());

                alert(`${currentDish.name} added to cart${selectedToppings.length > 0 ? ' with toppings: ' + selectedToppings.join(', ') : ''}.`);
                
                // Redirect back to menu page
                window.location.href = 'menupage.html';
            });
        }

    } else {
        const productContainer = document.querySelector('.product-details-container');
        if (productContainer) {
            productContainer.innerHTML = '<p class="product-not-found">Sorry, this dish could not be found. <a href="menupage.html">Return to Menu</a></p>';
        }
    }

    if (closeButtons) {
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                if (document.referrer && document.referrer.includes('menupage.html')) {
                    window.history.back();
                } else {
                    window.location.href = 'menupage.html';
                }
            });
        });
    }
});