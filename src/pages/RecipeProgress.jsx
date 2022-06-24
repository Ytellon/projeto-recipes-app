import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/FoodProgress.css';

export default function FoodProgress() {
  const [ingredientChecked, setIngredientChecked] = useState(false);
  const history = useHistory();

  const saveProgressRecipes = () => {
    setIngredientChecked(!ingredientChecked);

    const recipes = {
      cocktails: {
        id: [],
      },
      meals: {
        id: [],
      },
    };

    const saveIngredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (saveIngredients === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([recipes]));
    } else if (ingredientChecked === true) {
      // ingrediente marcado, salvar no localStorage
      saveIngredients.push(recipes);
      localStorage.setItem('inProgressRecipes', JSON.stringify(saveIngredients));
    }
  };

  const ingredientsCheckedLocalStorage = JSON
    .parse(localStorage.getItem('inProgressRecipes'));

  return (
    <form>
      {/* <img data-testid="recipe-photo" /> */}
      <h1 data-testid="recipe-title">Title</h1>
      <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button>
      <p data-testid="recipe-category">Categoria</p>
      <ul data-testid="ingredient-step">

        {/* recipes.map(({name, 'cenoura'}) => ) */}
        <li>
          <label
            className={ ingredientChecked === true && 'ingredientChecked' }
            htmlFor="checkbox"
          >
            nome do ingrediente
            <input
              type="checkbox"
              id="checkbox"
              checked={ ingredientsCheckedLocalStorage
                .includes('cenoura') ? true : ingredientChecked }
              onClick={ () => saveProgressRecipes() }
              required
            />
          </label>
        </li>
      </ul>
      <p data-testid="instructions">Preparo</p>
      <button
        type="submit"
        data-testid="finish-recipe-btn"
        onClick={ () => history.push('/done-recipes') }
        disabled={ lengthLocalStorage === lengthIngreditsAPI }
      >
        Finalizar
      </button>
    </form>
  );
}
