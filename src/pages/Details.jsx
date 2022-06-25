import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getMealById, getSuggestedMeals } from '../service/mealAPI';
import { getDrinkById, getSuggestedDrinks } from '../service/drinkAPI';
import Carousel from '../components/Carousel';

const SIX = 6;

export default function Details() {
  const location = useLocation().pathname;

  const path = useRef('');
  const [recipe, setRecipe] = useState({});
  const [suggestions, setSuggestions] = useState([{}]);
  const [isRecipeStarted, setIsRecipeStarted] = useState(false);
  const [ingredientsAndMeasures, setIngredientsAndMeasures] = useState({
    ingredients: [],
    measures: [],
  });

  path.current = location.split('/');
  const [, isFoodOrDrink, id] = path.current;

  const doneRecipesAtLocalStorage = localStorage.getItem('doneRecipes');
  const doneRecipes = JSON.parse(doneRecipesAtLocalStorage);

  useEffect(() => {
    const anyDoneRecipe = () => {
      const checkLocalStorageKey = () => {
        setIsRecipeStarted(doneRecipes
          .some((doneRecipe) => Number(doneRecipe.id) === Number(id)));
      };
      if (doneRecipes) {
        checkLocalStorageKey();
      }
    };
    anyDoneRecipe();
  });

  useEffect(() => {
    const controller = new AbortController();
    const getId = async () => {
      if (isFoodOrDrink === 'foods') {
        const result = await getMealById(id);
        const suggestionsResult = await getSuggestedDrinks();
        setRecipe(result[0]);
        setSuggestions(suggestionsResult.slice(0, SIX));
      } else {
        const result = await getDrinkById(id);
        const suggestionsResult = await getSuggestedMeals();
        setRecipe(result[0]);
        setSuggestions(suggestionsResult.slice(0, SIX));
      }
    };
    getId();

    return () => controller?.abort();
  }, [location, id, isFoodOrDrink]);

  useEffect(() => {
    const array = Object.entries(recipe);
    const ingridients = array
      .filter((twoItemArray) => twoItemArray[0].includes('strIngredient'));
    const measures = array
      .filter((twoItemArray) => twoItemArray[0].includes('strMeasure'));
    const ingredientsData = ingridients
      .filter((twoItemArray) => twoItemArray[1] !== '' && twoItemArray[1] !== null);
    const measuresData = measures
      .filter((twoItemArray) => twoItemArray[1] !== '' && twoItemArray[1] !== null);
    const onlyIngredients = ingredientsData.map((twoItemArray) => twoItemArray[1]);
    const onlyMeasures = measuresData.map((twoItemArray) => twoItemArray[1]);
    setIngredientsAndMeasures({
      ingredients: onlyIngredients,
      measures: onlyMeasures,
    });
  }, [recipe]);

  const startRecipe = () => {
    setIsRecipeStarted((prev) => !prev);
  };

  return (
    <section>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
        data-testid="recipe-photo"
      />

      <h2
        data-testid="recipe-title"
      >
        { recipe.strMeal || recipe.strDrink }
      </h2>

      <button
        data-testid="share-btn"
        type="button"
      >
        Compartilhar
      </button>

      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favoritar
      </button>

      <div
        style={ { display: 'flex' } }
      >
        <h3
          style={ { marginRight: '5px' } }
        >
          Categoria:
        </h3>
        {' '}
        <h4
          data-testid="recipe-category"
        >
          { path.current[1] === 'foods' ? recipe.strCategory : recipe.strAlcoholic }
        </h4>
      </div>

      <div>
        <h3>
          Ingredientes
        </h3>
        <ul>
          {
            ingredientsAndMeasures.ingredients
              .map((ingredient, index) => (
                <li
                  key={ Math.random() }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { `${ingredient}` }
                  {' '}
                  <b>
                    {`${ingredientsAndMeasures.measures[index]}`}
                  </b>
                </li>
              ))
          }
        </ul>
      </div>

      <div>
        <h3>
          Instruções
        </h3>
        <p
          data-testid="instructions"
          style={ { lineHeight: '50px' } }
        >
          { recipe.strInstructions }
        </p>
      </div>

      <iframe
        title="video"
        data-testid="video"
        src={ recipe.strYoutube }
      />

      <div>
        <h3>
          Receitas recomendadas
        </h3>
        <Carousel
          suggestions={ suggestions }
        />
      </div>

      {!isRecipeStarted && (
        <button
          data-testid="start-recipe-btn"
          type="button"
          onClick={ startRecipe }
          style={ {
            position: 'fixed',
            bottom: '0',
          } }
        >
          Start Recipe
        </button>
      )}
    </section>
  );
}
