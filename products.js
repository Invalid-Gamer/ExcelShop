Item1 = 0
Item2 = 0
Item3 = 0
Item4 = 0
Item5 = 0
Item6 = 0
Item7 = 0
Item8 = 0
Item9 = 0
Item10 = 0
function addToCart(itemId, itemName, itemPrice) {
    // Hole den aktuellen Warenkorb aus localStorage oder lege einen neuen an
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    let productIndex = cart.findIndex(item => item.id === itemId);

    // Überprüfe, ob das Produkt bereits im Warenkorb ist
    if (productIndex === -1) {
        // Füge das Produkt nur hinzu, wenn es noch nicht im Warenkorb ist
        cart.push({id: itemId, name: itemName, price: itemPrice, quantity: 1});

        // Speichere den aktualisierten Warenkorb zurück in localStorage
        sessionStorage.setItem('cart', JSON.stringify(cart));

    } else if (productIndex > -1) {
        cart[productIndex].quantity += 1;
        sessionStorage.setItem('cart', JSON.stringify(cart));
    };
}
// Event Listener für alle Buttons mit den IDs "Item1" bis "Item10"
document.getElementById('Item1').addEventListener('click', (event) => {
    if (Item1 == 0){
        addToCart(1, "Maker Matte", 15.75);
        Item1 = 1;
    } else if (Item1 == 1){
        Item1 = 0;
    };
});
document.getElementById('Item2').addEventListener('click', (event) => {
    if (Item2 == 0){
        addToCart(2, "Arduino Uno R3", 19.50);
        Item2 = 1;
    } else if (Item2 == 1){
        Item2 = 0;
    };
});
document.getElementById('Item3').addEventListener('click', (event) => {
    if (Item3 == 0){
        addToCart(3, "Arduino Mega R3", 25,35);
        Item3 = 1;
    } else if (Item3 == 1){
        Item3 = 0;
    }
})
document.getElementById('Item4').addEventListener('click', (event) => {
    if (Item4 == 0){
        addToCart(4, "Arduino Giga R1 WiFi", 50.00);
        Item4 = 1;
    } else if (Item4 == 1){
        Item4 = 0;
    }
})
document.getElementById('Item5').addEventListener('click', (event) => {
    if (Item5 == 0){
        addToCart(5, "Arduino Uno R4 WiFi", 35.70);
        Item5 = 1;
    } else if (Item5 == 1){
        Item5 = 0;
    }
})
document.getElementById('Item6').addEventListener('click', (event) => {
    if (Item6 == 0){
        addToCart(6, "Jumper Kabel x120", 7.50);
        Item6 = 1;
    } else if (Item6 == 1){
        Item6 = 0;
    }
})
document.getElementById('Item7').addEventListener('click', (event) => {
    if (Item7 == 0){
        addToCart(7, "Breadboard Mini", 10.20);
        Item7 = 1;
    } else if (Item7 == 1){
        Item7 = 0;
    }
})
document.getElementById('Item8').addEventListener('click', (event) => {
    if (Item8 == 0){
        addToCart(8, "Breadboard L x5", 10.25);
        Item8 = 1;
    } else if (Item8 == 1){
        Item8 = 0;
    }
})
document.getElementById('Item9').addEventListener('click', (event) => {
    if (Item9 == 0){
        addToCart(9, "ESP 32 NodeMCU", 8.70);
        Item9 = 1;
    } else if (Item9 == 1){
        Item9 = 0;
    }
})
document.getElementById('Item10').addEventListener('click', (event) => {
    if (Item10 == 0){
        addToCart(10, "ESP 8266", 6.90);
        Item10 = 1;
    } else if (Item10 == 1){
        Item10 = 0;
    }
})