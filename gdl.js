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
