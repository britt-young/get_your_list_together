// Get current cart or create new cart
async function getOrCreateCart() {
    const currentCart = await getCart();
    if (currentCart) {
      return currentCart;
    }
  
    return createCart();
  }
  // Get cart
  async function getCart() {
    // Use stored access token in authorization header
    let accessToken = authentication.getAccessToken();
    // Base URL (https://api.kroger.com)
    // Version/Endpoint (/v1/carts)
    let cartUrl = `${config.apiBaseUrl}/v1/carts`;
    let cartResponse = await fetch(cartUrl, {
      method: "GET",
      cache: "no-cache",
      // mode: 'no-cors',
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  
    let carts = await cartResponse.json();
    if (carts.data.length === 0) {
      return null;
    }
  
    console.log("Returning existing fulfillable cart");
    return carts.data[0];
  }
  // Create cart
  async function createCart() {
    console.log("Creating fulfillable cart");
    let accessToken = authentication.getAccessToken();
    // Base URL (https://api.kroger.com)
    // Version/Endpoint (/v1/carts)
    let cartUrl = `${config.apiBaseUrl}/v1/carts`;
    let cartResponse = await fetch(cartUrl, {
      method: "POST",
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      // Return json object
      body: JSON.stringify({})
    });
  
    return cartResponse.json();
  }
//Updates the cart 
  async function updateCart(url, apiMethod, item) {
    let accessToken = authentication.getAccessToken();
    return await fetch(url, {
      method: apiMethod,
      cache: "no-cache",
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(item)
    });
  }

  async function addOrUpdateCartOnClick(event) {
    let upc = event.target.value;
    if (!upc) {
      alert("No identifiable UPC code was found.");
      return;
    }
  
    let quantityElement = document.getElementById(upc + "Quantity");
    if (!quantityElement || !quantityElement.value) {
      alert("No Quantity was found");
      return;
    }
  
    if (quantityElement.value < 1) {
      alert("No Quantity was added");
      return;
    }
  
    addOrUpdateCart({
      quantity: parseInt(quantityElement.value),
      allowSubstitutes: true,
      specialInstructions: "",
      upc: upc,
      modality: "PICKUP"
    });
  }
  //Add an item and update the cart
  async function addOrUpdateCart(item) {
    console.log("Adding item to cart");
  
    let cart = await getOrCreateCart();
    // If current item exists, update cart quantity
    let currentItem = checkCartForItem(item.upc, cart);
    if (currentItem) {
      console.log("Updating quantity");
      currentItem.quantity += item.quantity;
      // Update cart quantity based on existing quantity
      // Base URL (https://api.kroger.com)
      // Version/Endpoint (/v1/carts/)
      // Query String (${cart.id}/items/${currentItem.upc})
      let putUrl = `${config.apiBaseUrl}/v1/carts/${cart.id}/items/${
        currentItem.upc
      }`;
      return await updateCart(putUrl, "PUT", {
        quantity: currentItem.quantity,
        allowSubstitutes: item.allowSubstitutes,
        specialInstructions: item.specialInstructions,
        modality: item.modality
      });
    }
    // Add item to cart URL
    // Base URL (https://api.kroger.com)
    // Version/Endpoint (/v1/carts/)
    // Query parameters (${cart.id}/items)
    let postUrl = `${config.apiBaseUrl}/v1/carts/${cart.id}/items`;
    return await updateCart(postUrl, "POST", item);
  }
  // Checking for quantity
  function checkCartForItem(upcCode, cart) {
    console.log("Checking cart");
  
    return cart.items.find(function(item) {
      return item.upc === upcCode;
    });
  }

  //Removes item from the cart
  async function removeItemFromCartOnClick(event) {
    console.log("Removing Item from cart");
    let upc = event.target.value;
    if (!upc) {
      alert("No identifiable UPC code was found.");
      return;
    }
    // Get current cartId for query parameter
    let cart = await getOrCreateCart();
    // Build remove item URL
    // Base URL (https://api.kroger.com)
    // Version/Endpoint (/v1/carts/)
    // Query String (${cart.id}/items/${upc})
    let removeUrl = `${config.apiBaseUrl}/v1/carts/${cart.id}/items/${upc}`;
    // Update wrapper
    return updateCart(removeUrl, "DELETE", null);
  }