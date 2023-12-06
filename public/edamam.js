const axios = require('axios');

const appId = 'd22b2667';
const appKey = '95cec18d886fd27faf20498beb81102c';
const query = 'chicken';

const apiUrl = 'https://api.edamam.com/search';
const encodedQuery = encodeURIComponent(query);
const fullUrl = `${apiUrl}?q=${encodedQuery}&app_id=${appId}&app_key=${appKey}`;

axios.get(fullUrl)
    .then(response => {
        console.log('Response:', response.data);
    })
    .catch(error => {
        console.error('Error:', error.message);
    });