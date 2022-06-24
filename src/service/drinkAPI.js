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

export const getAllDrinksInitial = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const getAllDrinksCategories = async () => {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};

export const getDrinkByCategory = async (category) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.drinks;
  } catch (error) {
    console.log(error);
  }
};
