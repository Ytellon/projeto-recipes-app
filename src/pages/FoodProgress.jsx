import React, { useState } from 'react';
import '../styles/FoodProgress.css';

export default function FoodProgress() {
  const [ingredientChecked, setIngredientChecked] = useState(false);

  const finishProgressRecipes = () => {
    const recipes = {
      cocktails: {
        id: [],
      },
      meals: {
        id: [],
      },
    };

    const finishedRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (finishedRecipes === null) {
      console.log('esta vazio');
      localStorage.setItem('inProgressRecipes', JSON.stringify([recipes]));
    } else {
      console.log('tem conteudo');
      finishedRecipes.push(recipes);

      localStorage.setItem('inProgressRecipes', JSON.stringify(finishedRecipes));
    }
  };

  return (
    <div>
      {/* <img data-testid="recipe-photo" /> */}
      <h1 data-testid="recipe-title">Title</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">Categoria</p>
      <ul data-testid="ingredient-step">
        <li>
          <label
            className={ ingredientChecked === true && 'ingredientChecked' }
            htmlFor="checkbox"
          >
            nome do ingrediente
            <input
              type="checkbox"
              required
              id="checkbox"
              checked={ ingredientChecked }
              onClick={ () => setIngredientChecked(!ingredientChecked) }
            />
          </label>
        </li>
      </ul>
      <p data-testid="instructions">Preparo</p>
      <button
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ () => finishProgressRecipes() }
      >
        Finalizar

      </button>
    </div>
  );
}
