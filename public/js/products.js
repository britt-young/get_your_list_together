 // Fetch data from Kroger API
 let resultsDiv = document.querySelector(".results");
 var cartArray = [];

 function findProduct() {
   var searchInput = document.querySelector(".search-bar input").value.toLowerCase();
   getProducts(searchInput);
   resultsDiv.innerHTML = "";
 }

 const apiURL = "/js/productsAPI.json";
 function getProducts(searchInput) {

   fetch(apiURL)
     .then((response) => response.json())
     .then((products) => {
       displayCart();

       products.forEach((product) => {
         if (product.name == searchInput) {
           let allItems = product.items

           allItems.forEach((item) => {
             let product_name = item.description;
             let product_size = item.size;
             let product_price = item.price;
             let product_id = item.id;
             console.log(product_name)

             const card = document.createElement('div');
             card.setAttribute('class', "product");

             const cardName = document.createElement('h4');
             cardName.setAttribute('id', 'name');
             cardName.innerHTML = product_name;

             const cardId = document.createElement('h6');
             cardId.setAttribute('id', 'number');
             cardId.innerHTML = product_id;

             const cardSize = document.createElement('p');
             cardSize.setAttribute('id', 'size');
             cardSize.innerHTML = product_size;

             const amountDiv = document.createElement('div');
             amountDiv.setAttribute('id', "amountDiv");

             const cost = document.createElement('p');
             cost.setAttribute('id', 'cost');
             cost.innerHTML = "cost: $";

             const cardPrice = document.createElement('h5');
             cardPrice.setAttribute('id', 'price');
             cardPrice.innerHTML = product_price;

             const cardBtn = document.createElement('button');
             cardBtn.setAttribute('id', 'addItem');
             cardBtn.innerHTML = "+";

             resultsDiv.appendChild(card);
             card.appendChild(cardId);
             card.appendChild(cardName);
             card.appendChild(cardSize);
             card.appendChild(amountDiv);
             amountDiv.appendChild(cost);
             amountDiv.appendChild(cardPrice);
             card.appendChild(cardBtn);
           })
         } else {
          console.log("try again")
         }

       });

       let saveBtns = document.querySelectorAll('#addItem');

       for (var i = 0; i < saveBtns.length; i++) {
         saveBtns[i].addEventListener('click', function () {
           var parent = this.parentNode;
           let item_id = parent.children[0].innerHTML;
           let item_name = parent.children[1].innerHTML;
           let item_size = parent.children[2].innerHTML;
           let item_price = parent.children[3].children[1].innerHTML;
           saveItem(item_id, item_name, item_size, item_price);
         });
         displayCart();

       };

       function saveItem(item_id, item_name, item_size, item_price) {
         var storedItems = JSON.parse(localStorage.getItem("cart"));

         if (storedItems !== null) {
           cartArray = storedItems;
         };

         localStorage.setItem("cart", JSON.stringify(cartArray));

         var cartObj = {
           "id": item_id,
           "name": item_name,
           "size": item_size,
           "price": item_price,
         };

         cartArray.push(cartObj);
         localStorage.setItem("cart", JSON.stringify(cartArray));
         displayCart();
       }

       displayCart();
     })

     .catch(error => {
       console.error('Fetch Error:', error);
     });
 }


 function displayCart() {
  var savedItems = JSON.parse(localStorage.getItem('cart'));
  var displaySaved = document.querySelector(".groceries");

  displaySaved.innerHTML = " ";

  if (savedItems < 1) {
    console.log("empty")

  } else {

    for (var i = 0; i < savedItems.length; i++) {
      let product_id = savedItems[i].id;
      let product_name = savedItems[i].name;
      let product_size = savedItems[i].size;

      const card = document.createElement('div');
      card.setAttribute('class', "product");

      const cardName = document.createElement('h4');
      cardName.setAttribute('id', 'name');
      cardName.innerHTML = product_name;

      const cardSize = document.createElement('h4');
      cardSize.setAttribute('id', 'size');
      cardSize.innerHTML = product_size;


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
      card.appendChild(cardBtn);
    }

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
}

displayCart()