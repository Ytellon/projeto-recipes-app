import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient';

export default function ListIngredients({ foodOrDrink, idRecipe, recipeDetails }) {
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  useEffect(() => {
    const recipe = Object.entries(recipeDetails);
    const ingredients = recipe.filter((array) => array[0].includes('strIngredient'));
    const ingredientsData = ingredients
      .filter((array) => array[1] !== '' && array[1] !== null);

    const onlyIngredients = ingredientsData.map((array) => array[1]);
    setRecipeIngredients(onlyIngredients);
  }, [recipeDetails]);

  useEffect(() => {
    const getCheckedIngredients = () => {
      const ingredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
      console.log(ingredients);
      console.log(foodOrDrink, idRecipe);
      // if (foodOrDrink === 'foods') {
      //   ingredients.meals[idRecipe].push();
      // }
    };
    getCheckedIngredients();
  }, []);

  return (
    <ul data-testid="ingredient-step">
      { recipeIngredients.map((ingredient, index) => (
        <Ingredient
          data-testid={ `${index}-ingredient-step` }
          key={ ingredient }
          ingredient={ ingredient }
        />
      )) }
    </ul>
  );
}

ListIngredients.propTypes = {
  foodOrDrink: PropTypes.string,
  idRecipe: PropTypes.string,
  recipeDetails: PropTypes.object,
}.isRequired;
