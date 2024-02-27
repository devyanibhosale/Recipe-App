const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

// Function to get recipes
const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipes...</h2>";
    try {
        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        const response = await data.json();
        recipeContainer.innerHTML = "";

        response.meals.forEach(meal => {
            const recipeDiv = document.createElement('div');
            recipeDiv.classList.add('recipe');

            // Create an image element
            const image = document.createElement('img');
            image.src = meal.strMealThumb;
            recipeDiv.appendChild(image);

            // Add heading for the meal name
            const heading = document.createElement('h3');
            heading.textContent = meal.strMeal;
            recipeDiv.appendChild(heading);

            // Add paragraph elements for other information
            const areaParagraph = document.createElement('p');
            areaParagraph.textContent = `Area: ${meal.strArea}`;
            recipeDiv.appendChild(areaParagraph);

            const categoryParagraph = document.createElement('p');
            categoryParagraph.textContent = `Category: ${meal.strCategory}`;
            recipeDiv.appendChild(categoryParagraph);

            // Add button
            const button = document.createElement('button');
            button.textContent = "View Recipe";
            // Add event listener or any specific functionality when the button is clicked
            button.addEventListener('click', () => {
                openRecipePopup(meal);
                // Add your code here to handle the button click event
                console.log(`Button clicked for ${meal.strMeal}`);
            });
            recipeDiv.appendChild(button);

            // Add the recipeDiv to the container
            recipeContainer.appendChild(recipeDiv);
        });
    } catch (error) {
        recipeContainer.innerHTML = `<h2>Error in Fetching Recipes....</h2>`;
    }
};

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for (let i = 1; i < 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`;
        } else {
            break;
        }
    }
    return ingredientsList;
};

const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <p>Area: ${meal.strArea}</p>
        <p>Category: ${meal.strCategory}</p>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeinstructions">
            <h3>Instructions:</h3> 
            <p>${meal.strInstructions}</p>
        </div>
    `;

    recipeDetailsContent.parentElement.style.display = "block";
};

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if (!searchInput) {
        recipeContainer.innerHTML = `<h2>Type the meal in the search box</h2>`;
        return;
    }
    fetchRecipes(searchInput);
    console.log("Button Clicked");
});

document.addEventListener('DOMContentLoaded', function () {
    const recipeDetails = document.querySelector('.recipe-details');
    const recipeCloseBtn = document.querySelector('.recipe-close-btn');

    // Add event listener for close button
    recipeCloseBtn.addEventListener('click', function () {
        recipeDetails.style.display = 'none';
    });
});
