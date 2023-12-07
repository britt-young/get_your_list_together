const apiKey = 'getyourlisttogether1-49d7946bc26ac76a87d11f741197d9938317939603563387897';
const apiUrl = 'https://api.kroger.com/v1/';

fetch(apiUrl, {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  },
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Fetch Error:', error);
  });

  

