var krogerTokenUrl = 'https://api.kroger.com/v1/connect/oauth2/token';
var krogerAuthorizationUrl = 'https://api.kroger.com/v1/connect/oauth2/authorize';
var krogerClientID = 'https://api.kroger.com/v1/connect/oauth2/authorize';
var krogerClientSecret = 'getyoulisttogether-400a8559164c00e45aec22b6f1c085a93991240100495179599';
var krogerScopes = 'product.compact';
var krogerToken = 'eyJhbGciOiJSUzI1NiIsImprdSI6Imh0dHBzOi8vYXBpLmtyb2dlci5jb20vdjEvLndlbGwta25vd24vandrcy5qc29uIiwia2lkIjoiWjRGZDNtc2tJSDg4aXJ0N0xCNWM2Zz09IiwidHlwIjoiSldUIn0.eyJhdWQiOiJnZXR5b3VsaXN0dG9nZXRoZXItNDAwYTg1NTkxNjRjMDBlNDVhZWMyMmI2ZjFjMDg1YTkzOTkxMjQwMTAwNDk1MTc5NTk5IiwiZXhwIjoxNzAxOTI4NDI0LCJpYXQiOjE3MDE5MjY2MTksImlzcyI6ImFwaS5rcm9nZXIuY29tIiwic3ViIjoiMWQwNTEwNGEtZGQyYi01NGMwLWIxZTgtYjcxM2YxNTNlNzA4Iiwic2NvcGUiOiJwcm9kdWN0LmNvbXBhY3QiLCJhdXRoQXQiOjE3MDE5MjY2MjQ4NDk3MTM5MzYsImF6cCI6ImdldHlvdWxpc3R0b2dldGhlci00MDBhODU1OTE2NGMwMGU0NWFlYzIyYjZmMWMwODVhOTM5OTEyNDAxMDA0OTUxNzk1OTkifQ.EtyeFcsr0XNB2Di7-Q3nRXyDEdpQPtcIRkT58xe_L4YsthPWm-5CjFjLjUxTd3rxpul2FZkofPwenJzCVo081cgwlGM1kr0P3xYcNV8la86MPKVi1rhxqtGOVlPQ6e9j4RO05qVtlSzpjFuUwpDdPFZcV00XSglUvDlCjjbVSTOYdDDg9FgNWRZMH699AQNKtKONMkqo0aySbXtbtjLU5SCToHa_APYGbXmm00xSrfSsVyerXxaM6z8OhKCSaP-OB9U3oyBcsp243S33TvsXCYzWk8b5GzC44-F73Lj9_pszPgLp03IXtMlpcupkT4vkT01bU9QcarmXImmOS1BDWQ';

fetch('https://api.kroger.com/v1/', {
    method: 'GET',
    // mode: 'no-cors',
    headers: {
      'Authorization': `Bearer ${krogerToken}`,
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify()
  })
    .then(response => response.json())
    .then(data => {
      const source = document.getElementById("kroger-template").innerHTML;
      const template = Handlebars.compile(source);
      const html = template({ items: data }); // Assuming the data structure has an 'items' property

      document.getElementById("kroger-data").innerHTML = html;
      console.log("happen")
    })
    .catch(error => {
      console.error('Fetch Error:', error);
    });