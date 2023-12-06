
function findRecipes() {
    searchInput = document.querySelector(".search-bar input").value;
    console.log(">>", searchInput)

    const appId = 'd22b2667';
    const appKey = '95cec18d886fd27faf20498beb81102c';
    const query = searchInput;
    const apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=';
    const fullUrl = `${apiUrl}${query}&app_id=${appId}&app_key=${appKey}`;

    recipeSearch(fullUrl);
}


async function recipeSearch(fullUrl) {
    const response = await fetch(fullUrl);
    const data = await response.json();
    const recipes = data.hits;
    console.log(recipes)

    recipes.forEach((recipe) => {
        recipe_name = recipe.recipe.label;
        recipe_url = recipe.recipe.url;
    })
  }


// axios.get(fullUrl)
//     .then(response => {
//         console.log('Response:', response.data);

//         const recipes = response.data.hits;

//         recipes.forEach((recipe) => {
//             // recipe_name = recipe.recipe.label;
//             // recipe_url = recipe.recipe.url;
//             console.log(recipe.recipe.label)
//         })

//     })
//     .catch(error => {
//         console.error('Error:', error.message);
// });