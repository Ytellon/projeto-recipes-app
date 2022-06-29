import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Ingredient({ ingredient, index, foodOrDrink, idRecipe }) {
  const [ingredientsSaved, setIngredientsSaved] = useState([]);
  const [ingredientChecked, setIngredientChecked] = useState(false);

  const changeCheckedState = () => {
    setIngredientChecked(!ingredientChecked);
  };

  useEffect(() => {
    const saveIngredients = () => {
      const ingredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
      if (ingredientChecked === true) {
        if (foodOrDrink === 'foods') {
          ingredients.meals[idRecipe].push(ingredient);
        } else {
          ingredients.cocktails[idRecipe].push(ingredient);
        }
        localStorage.setItem('inProgressRecipes', JSON.stringify(ingredients));
      } else {
        // remover
        // if (foodOrDrink === 'drinks') {

        // } else {

        // }
      }
    };
    saveIngredients();
  }, [ingredientChecked, idRecipe, foodOrDrink, ingredient]);

  useEffect(() => {
    const recipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const getIngredients = () => {
      const recipes = Object.values(recipesInProgress);
      const ingredients = recipes.map((recipe) => Object.values(recipe));
      const ingredientsName = [];

      ingredients.forEach((ingredientValue) => {
        ingredientValue.forEach((singleIngredient) => {
          ingredientsName.push(singleIngredient);
        });
      });
      setIngredientsSaved(ingredientsName);
    };
    getIngredients();
  }, []);

  console.log(ingredientsSaved);
  console.log(ingredientsSaved.includes(ingredient.toString()));
  return (
    <li data-testid={ `${index}-ingredient-step` }>
      <label
        className={ ingredientChecked ? 'ingredientChecked' : '' }
        htmlFor={ ingredient }
      >
        { ingredient }
        <input
          type="checkbox"
          id={ ingredient }
          checked={ ingredientsSaved.includes(ingredient) }
          onChange={ () => changeCheckedState() }
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
