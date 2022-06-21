export const getCocktailsByName = async (drinkName) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const getDrinksByFirstLetter = async (firstLetter) => {
  const URL = `www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const getIngredientsByName = async (ingredientName) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.ingredients;
  } catch (error) {
    console.log(error);
  }
};
