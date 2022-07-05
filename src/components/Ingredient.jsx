import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Ingredient({
  ingredient,
  index,
  foodOrDrink,
  idRecipe,
  setInProgress,
}) {
  const [isIngredientChecked, setIsIngredientChecked] = useState(true);

  const key = foodOrDrink === 'foods' ? 'meals' : 'cocktails';

  const handleCheck = () => {
    setIsIngredientChecked(!isIngredientChecked);
    const ingredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredients && ingredients[key][idRecipe].includes(ingredient)) {
      const newIngredients = ingredients[key][idRecipe]
        .filter((recipeIngredients) => recipeIngredients !== ingredient);
      ingredients[key][idRecipe] = newIngredients;
    } else {
      ingredients[key][idRecipe].push(ingredient);
    } localStorage.setItem('inProgressRecipes', JSON.stringify(ingredients));
    setInProgress(ingredients[key][idRecipe]);
  };

  useEffect(() => {
    const ingredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredients === undefined || ingredients === null) {
      const inProgressRecipes = {
        cocktails: {},
        meals: {},
      };
      inProgressRecipes[key][idRecipe] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } if (ingredients && !ingredients[key][idRecipe].includes(ingredient)) {
      setIsIngredientChecked(false);
    }
  }, [key, ingredient, idRecipe]);

  return (
    <li data-testid={ `${index}-ingredient-step` }>
      <label
        className={ isIngredientChecked ? 'ingredientChecked' : '' }
        htmlFor={ ingredient }
      >
        { ingredient }
        <input
          type="checkbox"
          id={ ingredient }
          checked={ isIngredientChecked }
          onChange={ () => handleCheck() }
          required
        />
      </label>
    </li>
  );
}

Ingredient.propTypes = {
  ingredient: PropTypes.string,
  index: PropTypes.number,
  foodOrDrink: PropTypes.string,
  idRecipe: PropTypes.string,
}.isRequired;
