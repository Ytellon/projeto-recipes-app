import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/FoodProgress.css';

export default function FoodProgress() {
  const [ingredientChecked, setIngredientChecked] = useState(false);
  const history = useHistory();

  const saveIngredients = () => {
    setIngredientChecked(!ingredientChecked);

    const recipes = {
      cocktails: {
        id: [],
      },
      meals: {
        id: [],
      },
    };

    const ingredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredients === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify([recipes]));
    } else if (ingredientChecked === true) {
      // ingrediente marcado, salvar no localStorage
      ingredients.push(recipes);
      localStorage.setItem('inProgressRecipes', JSON.stringify(ingredients));
    }
  };

  const ingredientsCheckedLocalStorage = JSON
    .parse(localStorage.getItem('inProgressRecipes'));

  const doneRecipe = (event) => {
    event.preventDefault();

    // salvar id e data
    const date = new Date();
    const dateFormated = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

    const vaiReceber = 'vai receber';
    const drinkOrMeal = 'drink';

    let recipeToSave = {};

    if (drinkOrMeal === 'drink') {
      recipeToSave = {
        id: vaiReceber,
        type: vaiReceber,
        nationality: '',
        category: '',
        alcoholicOrNot: vaiReceber,
        name: vaiReceber,
        image: vaiReceber,
        doneDate: dateFormated,
        tags: vaiReceber,
      };
    } else if (drinkOrMeal === 'meal') {
      recipeToSave = {
        id: vaiReceber,
        type: vaiReceber,
        nationality: vaiReceber,
        category: vaiReceber,
        alcoholicOrNot: '',
        name: vaiReceber,
        image: vaiReceber,
        doneDate: dateFormated,
        tags: vaiReceber,
      };
    }

    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipes === null) {
      localStorage.setItem('doneRecipes', JSON.stringify([recipeToSave]));
    } else {
      doneRecipes.push(recipeToSave);
      localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    }

    history.push('/done-recipes');
  };

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
              onClick={ () => saveIngredients() }
              required
            />
          </label>
        </li>
      </ul>
      <p data-testid="instructions">Preparo</p>
      <button
        type="submit"
        data-testid="finish-recipe-btn"
        onClick={ (event) => doneRecipe(event) }
        // disabled={ lengthLocalStorage === lengthIngreditsAPI }
      >
        Finalizar
      </button>
    </form>
  );
}
