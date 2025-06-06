// --- DISH DATA ---
// This is where you'll add data for all your dishes.
// Make sure the 'id' matches the query parameter from menu.html (e.g., 'peking-duck')
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
    const productName = document.getElementById('product-name');
    const productPrice = document.getElementById('product-price');
    const productDescription = document.getElementById('product-description');
    const toppingsListContainer = document.getElementById('product-toppings-list');
    const addToCartButton = document.getElementById('add-to-cart-button');
    const closeButtons = document.querySelectorAll('.product-close-button');

    // Get dish ID from URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const dishId = urlParams.get('dish');

    // Find the dish data
    const currentDish = dishesData.find(dish => dish.id === dishId);

    if (currentDish) {
        document.title = `${currentDish.name} - Golden Dragon`; // Update page title
        if (productImage) productImage.src = currentDish.imageSrc;
        if (productImage) productImage.alt = currentDish.name;
        if (productName) productName.textContent = currentDish.name;
        if (productPrice) productPrice.textContent = currentDish.price;
        if (productDescription) productDescription.textContent = currentDish.description;

        // Populate toppings with checkboxes
        if (toppingsListContainer) {
            toppingsListContainer.innerHTML = ''; // Clear any existing
            const toppingsHeading = document.querySelector('.toppings-heading'); // Get heading element

            if (currentDish.toppings && currentDish.toppings.length > 0) {
                if (toppingsHeading) toppingsHeading.style.display = 'block'; // Show heading

                const ul = document.createElement('ul');
                currentDish.toppings.forEach((topping, index) => {
                    const li = document.createElement('li');

                    // Create checkbox
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = `topping-${currentDish.id}-${index}`; // Unique ID for the checkbox
                    checkbox.name = 'toppings';
                    checkbox.value = topping;
                    checkbox.checked = true; // DEFAULT TO CHECKED

                    // Create label for checkbox
                    const label = document.createElement('label');
                    label.htmlFor = checkbox.id;
                    label.textContent = topping;

                    li.appendChild(checkbox);
                    li.appendChild(label);
                    ul.appendChild(li);
                });
                toppingsListContainer.appendChild(ul);
            } else {
                if (toppingsHeading) toppingsHeading.style.display = 'none'; // Hide heading if no toppings
            }
        }


        if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
                const selectedToppings = [];
                if (toppingsListContainer) { // Check if toppingsListContainer exists
                    const checkboxes = toppingsListContainer.querySelectorAll('input[type="checkbox"]:checked');
                    checkboxes.forEach(checkbox => {
                        selectedToppings.push(checkbox.value);
                    });
                }
                // Log selected toppings or use them in an alert
                console.log("Selected toppings:", selectedToppings);
                alert(`${currentDish.name} added to cart${selectedToppings.length > 0 ? ' with toppings: ' + selectedToppings.join(', ') : ''}. (Functionality to be implemented)`);
                // Here you would add actual cart logic
            });
        }

    } else {
        // Handle case where dish is not found
        const productContainer = document.querySelector('.product-details-container');
        if (productContainer) {
            productContainer.innerHTML =
                '<p class="product-not-found">Sorry, this dish could not be found. <a href="menu.html">Return to Menu</a></p>';
        }
    }

    // Close button functionality
    if (closeButtons) {
        closeButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Go back to the menu or previous page
                if (document.referrer && document.referrer.includes('menu.html')) {
                    window.history.back();
                } else {
                    window.location.href = 'menu.html';
                }
            });
        });
    }
});