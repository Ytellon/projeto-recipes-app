import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Ingredient({ ingredient, index }) {
  const [ingredientsSaved] = useState([]);
  const [ingredientChecked, setIngredientChecked] = useState(false);

  const saveIngredients = () => {
    setIngredientChecked(!ingredientChecked);

    // const ingredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredientChecked === true) {
      // ingrediente marcado, salvar no localStorage
      // ingredients.push(recipes);
      // localStorage.setItem('inProgressRecipes', JSON.stringify(ingredients));
    }
  };

  return (
    <li data-testid={ `${index}-ingredient-step` }>
      <label
        className={ ingredientChecked ? 'ingredientChecked' : '' }
        htmlFor="checkbox"
      >
        { ingredient }
        <input
          type="checkbox"
          id="checkbox"
          checked={ ingredientsSaved.includes('cenoura') ? true : ingredientChecked }
          onChange={ () => saveIngredients() }
          required
        />
      </label>
    </li>
  );
}

Ingredient.propTypes = {
  ingredient: PropTypes.string,
  index: PropTypes.number,
}.isRequired;
