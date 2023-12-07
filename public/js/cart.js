function displayCart() {
    var savedItems = JSON.parse(localStorage.getItem('cart'));
    var displaySaved = document.querySelector(".cart-results");

    displaySaved.innerHTML = " ";
    let sum = 0;


    if (savedItems < 1) {
        console.log("empty")

    } else {
        for (var i = 0; i < savedItems.length; i++) {
            let product_id = savedItems[i].id;
            let product_name = savedItems[i].name;
            let product_price = savedItems[i].price;
            let product_size = savedItems[i].size;

            const card = document.createElement('div');
            card.setAttribute('class', "product");

            const cardName = document.createElement('h4');
            cardName.setAttribute('id', 'name');
            cardName.innerHTML = product_name;

            const cardSize = document.createElement('h4');
            cardSize.setAttribute('id', 'size');
            cardSize.innerHTML = product_size;

            const cardPrice = document.createElement('h4');
            cardPrice.setAttribute('id', 'price');
            cardPrice.innerHTML = product_price;

            const cardId = document.createElement('h4');
            cardId.setAttribute('id', 'number');
            cardId.innerHTML = product_id;

            const cardBtn = document.createElement('button');
            cardBtn.setAttribute('id', 'removeItem');
            cardBtn.innerHTML = "-";

            displaySaved.appendChild(card);
            card.appendChild(cardId);
            card.appendChild(cardName);
            card.appendChild(cardSize);
            card.appendChild(cardPrice);
            card.appendChild(cardBtn);

            sum += parseFloat(product_price);
        };
    }


    let moneySpent = document.querySelector("#money-spent");
    // let totalAmount = sum;
    let totalAmount = Math.round(sum, 1)
    moneySpent.innerHTML = `Total Spent: $${totalAmount}`


    let removeBtns = document.querySelectorAll('#removeItem');

    for (var i = 0; i < removeBtns.length; i++) {
        removeBtns[i].addEventListener('click', function () {
            var parent = this.parentNode;
            let item_id = parent.children[0].innerHTML;
            removeItem(item_id);
        });
    }

    function removeItem(item_id) {
        var savedItems = JSON.parse(localStorage.getItem('cart'));
        savedItems.splice(savedItems.findIndex(item => item.id === item_id), 1);

        // Update local storage
        localStorage.setItem("cart", JSON.stringify(savedItems));

        displayCart();
    }

}


displayCart();