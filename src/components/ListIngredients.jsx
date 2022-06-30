import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Ingredient from './Ingredient';

export default function ListIngredients({
  foodOrDrink,
  idRecipe,
  recipeDetails,
  setInProgress,
}) {
  const [recipeIngredients, setRecipeIngredients] = useState([]);

  useEffect(() => {
    const recipe = Object.entries(recipeDetails);
    const ingredients = recipe.filter((array) => array[0].includes('strIngredient'));
    const ingredientsData = ingredients
      .filter((array) => array[1] !== '' && array[1] !== null);

    const onlyIngredients = ingredientsData.map((array) => array[1]);
    setRecipeIngredients(onlyIngredients);
  }, [recipeDetails]);

  return (
    <ul>
      { recipeIngredients.map((ingredient, index) => (
        <Ingredient
          key={ ingredient }
          ingredient={ ingredient }
          index={ index }
          foodOrDrink={ foodOrDrink }
          idRecipe={ idRecipe }
          setInProgress={ setInProgress }
        />
      )) }
    </ul>
  );
}

ListIngredients.propTypes = {
  foodOrDrink: PropTypes.string,
  idRecipe: PropTypes.string,
  recipeDetails: PropTypes.object,
  setInProgress: PropTypes.func,
}.isRequired;
