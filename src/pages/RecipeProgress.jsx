import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ListIngredients from '../components/ListIngredients';
import ShareOrFavoriteBtns from '../components/ShareOrFavoriteBtns';
import { getDrinkById } from '../service/drinkAPI';
import { getMealById } from '../service/mealAPI';
import '../styles/FoodProgress.css';

const getTags = (tagsString) => {
  const tagsFormatted = tagsString.split(',');
  return tagsFormatted;
};

const doneRecipe = (event, recipeDetails, foodOrDrink) => {
  event.preventDefault();
  const date = new Date();
  const dateFormated = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  let recipeToSave = {};

  if (foodOrDrink === 'drinks') {
    recipeToSave = {
      id: recipeDetails.idDrink,
      type: 'drink',
      nationality: '',
      category: '',
      alcoholicOrNot: recipeDetails.strAlcoholic,
      name: recipeDetails.strDrink,
      image: recipeDetails.strDrinkThumb,
      doneDate: dateFormated,
      tags: [],
    };
  } else if (foodOrDrink === 'foods') {
    const tags = getTags(recipeDetails.strTags);
    recipeToSave = {
      id: recipeDetails.idMeal,
      type: 'food',
      nationality: recipeDetails.strArea,
      category: recipeDetails.strCategory,
      alcoholicOrNot: '',
      name: recipeDetails.strMeal,
      image: recipeDetails.strMealThumb,
      doneDate: dateFormated,
      tags,
    };
  }

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  if (doneRecipes === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([recipeToSave]));
  } else {
    doneRecipes.push(recipeToSave);
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
  }
};

export default function RecipeProgress() {
  const history = useHistory();

  const { location: { pathname } } = history;
  const [, foodOrDrink, idRecipe] = pathname.split('/');

  const [recipeDetails, setRecipeDetails] = useState([{}]);
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [isDoneBtnDiasbled, setIsDoneBtnDiasbled] = useState(true);

  const key = foodOrDrink === 'foods' ? 'meals' : 'cocktails';

  useEffect(() => {
    const recipe = Object.entries(recipeDetails);
    const ingredients = recipe.filter((array) => array[0].includes('strIngredient'));
    const ingredientsData = ingredients
      .filter((array) => array[1] !== '' && array[1] !== null);

    const onlyIngredients = ingredientsData.map((array) => array[1]);
    setRecipeIngredients(onlyIngredients);
  }, [recipeDetails]);

  useEffect(() => {
    const ingredients = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (ingredients === undefined || ingredients === null) {
      const inProgressRecipes = {
        cocktails: {},
        meals: {},
      };
      inProgressRecipes[key][idRecipe] = [];
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
    } else if (ingredients && ingredients[key][idRecipe]) {
      setIsDoneBtnDiasbled(
        recipeIngredients.length !== inProgress.length,
      );
    }
  }, [key, idRecipe, recipeIngredients, inProgress]);

  useEffect(() => {
    const controller = new AbortController();
    const fetchMealsOrDrinks = async () => {
      if (foodOrDrink === 'foods') {
        const recipe = await getMealById(idRecipe);
        setRecipeDetails(recipe[0]);
      } else {
        const recipe = await getDrinkById(idRecipe);
        setRecipeDetails(recipe[0]);
      }
    };
    fetchMealsOrDrinks();
    return () => controller?.abort();
  }, [foodOrDrink, idRecipe]);

  return (
    <form>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strDrinkThumb || recipeDetails.strMealThumb }
        alt={ recipeDetails.strDrink || recipeDetails.strMeal }
      />
      <h1
        data-testid="recipe-title"
      >
        { recipeDetails.strMeal || recipeDetails.strDrink }
      </h1>
      <ShareOrFavoriteBtns
        id={ idRecipe }
        recipe={ recipeDetails }
        isFoodOrDrink={ foodOrDrink }
      />
      <p
        data-testid="recipe-category"
      >
        { recipeDetails.strCategory || recipeDetails.strAlcoholic }

      </p>
      <ListIngredients
        foodOrDrink={ foodOrDrink }
        idRecipe={ idRecipe }
        recipeDetails={ recipeDetails }
        setInProgress={ setInProgress }
      />
      <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
      <button
        type="submit"
        data-testid="finish-recipe-btn"
        onClick={ (event) => {
          doneRecipe(event, recipeDetails, foodOrDrink);
          history.push('/done-recipes');
        } }
        disabled={ isDoneBtnDiasbled }
      >
        Finalizar
      </button>
    </form>
  );
}
