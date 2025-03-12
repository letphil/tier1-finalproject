document.addEventListener("DOMContentLoaded", () => {
  loadFavorites();
});

async function searchRecipes() {
  const query = document.getElementById("search-input").value;
  if (!query) return;

  const response = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
  );
  const data = await response.json();
  displayRecipes(data.meals);
}

function displayRecipes(recipes) {
  const resultsContainer = document.getElementById("recipe-results");
  resultsContainer.innerHTML = "";

  if (!recipes) {
    resultsContainer.innerHTML = "<p>No recipes found.</p>";
    return;
  }

  recipes.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
          <img src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
          <h3>${recipe.strMeal}</h3>
          <a href="${recipe.strSource}" target="_blank">View Recipe</a>
          <button onclick="addToFavorites('${recipe.strMeal}', '${recipe.strMealThumb}', '${recipe.strSource}')">⭐ Add to Favorites</button>
        `;
    resultsContainer.appendChild(recipeCard);
  });
}

function addToFavorites(name, image, source) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (!favorites.some((fav) => fav.name === name)) {
    favorites.push({ name, image, source });
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
  }
}

function loadFavorites() {
  const favoritesContainer = document.getElementById("favorite-recipes");
  favoritesContainer.innerHTML = "";
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  favorites.forEach((recipe) => {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add("recipe-card");
    recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.name}">
          <h3>${recipe.name}</h3>
          <a href="${recipe.source}" target="_blank">View Recipe</a>
          <button onclick="removeFromFavorites('${recipe.name}')">❌ Remove</button>
        `;
    favoritesContainer.appendChild(recipeCard);
  });
}

function removeFromFavorites(name) {
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
  favorites = favorites.filter((recipe) => recipe.name !== name);
  localStorage.setItem("favorites", JSON.stringify(favorites));
  loadFavorites();
}
