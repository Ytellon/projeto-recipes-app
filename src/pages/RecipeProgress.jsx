import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ListIngredients from '../components/ListIngredients';
import ShareOrFavoriteBtns from '../components/ShareOrFavoriteBtns';
import { getDrinkById } from '../service/drinkAPI';
import { getMealById } from '../service/mealAPI';
import '../styles/FoodProgress.css';

export default function FoodProgress() {
  const history = useHistory();

  const { location: { pathname } } = history;
  const [, foodOrDrink, idRecipe] = pathname.split('/');

  // guardar informacoes da receita
  const [recipeDetails, setRecipeDetails] = useState([{}]);
  console.log(recipeDetails);

  // didMount
  useEffect(() => {
    const controller = new AbortController();
    const fetchMealsOrDrinks = async () => {
      if (foodOrDrink === 'foods') {
        setRecipeDetails(await getMealById(idRecipe));
      } else {
        setRecipeDetails(await getDrinkById(idRecipe));
      }
    };
    fetchMealsOrDrinks();
    return () => controller?.abort();
  }, [foodOrDrink, idRecipe]);

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
      <ShareOrFavoriteBtns
        id={ idRecipe }
        recipe={ recipeDetails }
        isFoodOrDrink={ foodOrDrink }
      />
      {/* <button type="button" data-testid="share-btn">Compartilhar</button>
      <button type="button" data-testid="favorite-btn">Favoritar</button> */}

      {/* recipes.map(({name, 'cenoura'}) => ) */}
      <p data-testid="recipe-category">Categoria</p>
      <ListIngredients
        foodOrDrink={ foodOrDrink }
        idRecipe={ idRecipe }
        recipeDetails={ recipeDetails }
      />
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
