export const getMealByName = async (mealName) => {
  const URL = `www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const getMealByFirstLetter = async (firstLetter) => {
  const URL = `www.themealdb.com/api/json/v1/1/search.php?f=${firstLetter}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};

export const getMealById = async (mealId) => {
  const URL = `www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data.meals;
  } catch (error) {
    console.log(error);
  }
};