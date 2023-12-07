// Product request
async function getProducts(term) {
    // Use access stored access token for product request
    let accessToken = authentication.getAccessToken();
    // Use stored locationId
    let locationId = localStorage.getItem("locationId");
  
    // Use locationId as filter (if) selected by user
    let searchByLocation = "";
    if (locationId) {
      searchByLocation = `filter.locationId=${locationId}&`;
    }
    // Building product URL
    // Base URL (https://api.kroger.com)
    // Version/Endpoint (/v1/products)
    // Query String (?filter.locationId=${locationId}&filter.term=${term})
    let productsUrl = `${
      config.apiBaseUrl
    }/v1/products?${searchByLocation}filter.term=${term}`;
  
    // Product request body
    let productsResponse = await fetch(productsUrl, {
      method: "GET",
      cache: "no-cache",
      // mode: 'no-cors',
      headers: {
        Authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json; charset=utf-8"
      }
    });
  
    // Return json object
    return productsResponse.json();
  }