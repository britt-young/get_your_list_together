
function findRecipes() {
    searchInput = document.querySelector(".search-bar input").value;
    console.log("User Search:", searchInput)

    const appId = 'd22b2667';
    const appKey = '95cec18d886fd27faf20498beb81102c';
    const query = searchInput;
    const apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=';
    const fullUrl = `${apiUrl}${query}&app_id=${appId}&app_key=${appKey}`;

    recipeSearch(fullUrl);
    document.querySelector('.results').innerHTML = "";
}


let resultsDiv = document.querySelector('.results');

async function recipeSearch(fullUrl) {
    const response = await fetch(fullUrl);
    const data = await response.json();
    const recipes = data.hits;
    // console.log(recipes)

    recipes.forEach((recipe) => {
        let recipe_name = recipe.recipe.label;
        let recipe_url = recipe.recipe.url;
        let recipe_image = recipe.recipe.image;

        const card = document.createElement('div');
        card.setAttribute('class', "recipe");
        const cardImg = document.createElement('img');
        cardImg.src = recipe_image;
        cardImg.setAttribute("alt", recipe_name);
        const cardName = document.createElement('h3');
        cardName.setAttribute('id', 'name');
        cardName.innerHTML = recipe_name;
        const cardATag = document.createElement('a');
        cardATag.setAttribute('id', 'choice');
        cardATag.setAttribute('href', recipe_url);
        cardATag.setAttribute('target', "_blank");
        const cardBtn = document.createElement('button');
        cardBtn.setAttribute('id', 'choice');
        cardBtn.innerHTML = "See How To Cook";

        resultsDiv.appendChild(card);
        card.appendChild(cardImg);
        card.appendChild(cardName);
        card.appendChild(cardATag);
        cardATag.appendChild(cardBtn);
    })

    if (recipes.length == 0){
        resultsDiv.innerHTML = "No Results Found. Please Try Again."
    }
  }