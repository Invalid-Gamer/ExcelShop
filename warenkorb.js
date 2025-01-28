itemId1 = 0;
itemId2 = 0;
itemId3 = 0;
itemId4 = 0;
itemId5 = 0;
itemId6 = 0;
itemId7 = 0;
itemId8 = 0;
itemId9 = 0;
itemId10 = 0;
function loadCart() {
    let browserLock = JSON.parse(sessionStorage.getItem('submitLock'));
    if (browserLock) {
        document.getElementById('submit').disabled = true;
        document.getElementById('submitFeedback').style.display = 'block';
    } else if (!browserLock) {
        document.getElementById('submit').disabled = false;
        document.getElementById('submitFeedback').style.display = 'none';
    }
    // Warenkorb aus localStorage abrufen
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

    // Referenz zum HTML-Element, wo der Warenkorb angezeigt werden soll
    let cartContainer = document.getElementById('cart-item1');
    let cartDescription = document.getElementById('cart-description1');
    let cartPrice = document.getElementById('cart-price1');

    // Prüfen, ob der Warenkorb leer ist
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p>Dein Warenkorb ist leer.</p>';
        return;
    }

    // Produkte mit Mengenangabe anzeigen
    if (cart.length > 0) {
        document.getElementById('rm1').style.display = 'block';
    }
    if (cart.length > 1) {
        document.getElementById('item2').style.display = 'block';
    }
    if (cart.length > 2) {
        document.getElementById('item3').style.display = 'block';
    }
    if (cart.length > 3) {
        document.getElementById('item4').style.display = 'block';
    }
    if (cart.length > 4) {
        document.getElementById('item5').style.display = 'block';
    }
    if (cart.length > 5) {
        document.getElementById('item6').style.display = 'block';
    }
    if (cart.length > 6) {
        document.getElementById('item7').style.display = 'block';
    }
    if (cart.length > 7) {
        document.getElementById('item8').style.display = 'block';
    }
    if (cart.length > 8) {
        document.getElementById('item9').style.display = 'block';
    }
    if (cart.length > 9) {
        document.getElementById('item10').style.display = 'block';
    }
    cartContainer.innerHTML = '';
    forEach = 1;
    totalPrice = 0;
    cart.forEach(item => {
        let cartContainer = document.getElementById(`cart-item${forEach}`);
        let cartDescription = document.getElementById(`cart-description${forEach}`);
        let cartPrice = document.getElementById(`cart-price${forEach}`);
        cartContainer.textContent = item.name;
        cartDescription.textContent = item.quantity;
        cartPrice.textContent = `${item.price*item.quantity} €`;
        totalPrice += (item.price*item.quantity);
        if (forEach == 1) {
            itemId1 = item.id;
        } else if (forEach == 2) {
            itemId2 = item.id;
        } else if (forEach == 3) {
            itemId3 = item.id;
        } else if (forEach == 4) {
            itemId4 = item.id;
        } else if (forEach == 5) {
            itemId5 = item.id;
        } else if (forEach == 6) {
            itemId6 = item.id;
        } else if (forEach == 7) {
            itemId7 = item.id;
        } else if (forEach == 8) {
            itemId8 = item.id;
        } else if (forEach == 9) {
            itemId9 = item.id;
        } else if (forEach == 10) {
            itemId10 = item.id;
        }
        forEach += 1;
    });
    WarenkorbItems = 0
    cart.forEach(item => {
        WarenkorbItems += item.quantity;
    });
    document.getElementById('WarenkorbItems').textContent = WarenkorbItems;
    document.getElementById('normal-price').textContent = `${totalPrice.toFixed(2)} €`;
    document.getElementById('steuern').textContent = `${(totalPrice*0.19).toFixed(2)} €`;
    document.getElementById('total-price').textContent = `${((totalPrice*0.19)+totalPrice).toFixed(2)} €`
}

// Lade den Warenkorb, wenn die Seite geladen wird
document.addEventListener('DOMContentLoaded', loadCart);
document.getElementById('rm1').addEventListener('click', (event) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === itemId1);
    cart[productIndex].quantity -= 1;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    if (cart[productIndex].quantity == 0){
        cart = cart.filter(item => item.id !== itemId1);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    location.reload(true);
});
document.getElementById('rm2').addEventListener('click', (event) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === itemId2);
    cart[productIndex].quantity -= 1;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    if (cart[productIndex].quantity == 0){
        cart = cart.filter(item => item.id !== itemId2);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    location.reload(true);
});
document.getElementById('rm3').addEventListener('click', (event) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === itemId3);
    cart[productIndex].quantity -= 1;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    if (cart[productIndex].quantity == 0){
        cart = cart.filter(item => item.id !== itemId3);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    location.reload(true);
});
document.getElementById('rm4').addEventListener('click', (event) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === itemId4);
    cart[productIndex].quantity -= 1;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    if (cart[productIndex].quantity == 0){
        cart = cart.filter(item => item.id !== itemId4);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    location.reload(true);
});
document.getElementById('rm5').addEventListener('click', (event) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === itemId5);
    cart[productIndex].quantity -= 1;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    if (cart[productIndex].quantity == 0){
        cart = cart.filter(item => item.id !== itemId5);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    location.reload(true);
});
document.getElementById('rm6').addEventListener('click', (event) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === itemId6);
    cart[productIndex].quantity -= 1;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    if (cart[productIndex].quantity == 0){
        cart = cart.filter(item => item.id !== itemId6);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    location.reload(true);
});
document.getElementById('rm7').addEventListener('click', (event) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === itemId7);
    cart[productIndex].quantity -= 1;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    if (cart[productIndex].quantity == 0){
        cart = cart.filter(item => item.id !== itemId7);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    location.reload(true);
});
document.getElementById('rm8').addEventListener('click', (event) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === itemId8);
    cart[productIndex].quantity -= 1;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    if (cart[productIndex].quantity == 0){
        cart = cart.filter(item => item.id !== itemId8);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    location.reload(true);
});
document.getElementById('rm9').addEventListener('click', (event) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === itemId9);
    cart[productIndex].quantity -= 1;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    if (cart[productIndex].quantity == 0){
        cart = cart.filter(item => item.id !== itemId9);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    location.reload(true);
});
document.getElementById('rm10').addEventListener('click', (event) => {
    let cart = JSON.parse(sessionStorage.getItem('cart')) || [];
    let productIndex = cart.findIndex(item => item.id === itemId10);
    cart[productIndex].quantity -= 1;
    sessionStorage.setItem('cart', JSON.stringify(cart));
    if (cart[productIndex].quantity == 0){
        cart = cart.filter(item => item.id !== itemId10);
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    location.reload(true);
});
document.getElementById('hideSubmitFeedback').addEventListener('click', (event) => {
    document.getElementById('submitFeedback').style.display = 'none';
})