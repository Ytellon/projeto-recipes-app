export const getDrinksByName = async (drinkName) => {
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
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const getDrinkByIngredient = async (ingredientName) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const getDrinkById = async (drinkId) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const getSuggestedDrinks = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};
