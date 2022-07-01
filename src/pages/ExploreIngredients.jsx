import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import { getAllMealIngredients } from '../service/mealAPI';
import { getAllDrinkIngredients } from '../service/drinkAPI';

export default function ExploreIngredients() {
  const [ingredients, setIngredients] = useState([]);
  const [mealOrDrink, setMealOrDrink] = useState('');
  const history = useHistory();

  const { pathname } = useLocation();

  useEffect(() => {
    const saveIngredients = async () => {
      if (pathname.includes('foods')) {
        const results = await getAllMealIngredients();
        setIngredients(results);
        setMealOrDrink('foods');
      } else {
        const results = await getAllDrinkIngredients();

        setIngredients(results);
        setMealOrDrink('drinks');
      }
    };
    saveIngredients();
  }, [pathname]);

  const handleIngredient = (ingredient) => {
    localStorage.setItem('filteredIngredient', ingredient);
    history.push(`/${mealOrDrink}`);
  };

  return (
    <div>
      <Header
        title="Explore Ingredients"
        showSearchIcon={ false }
      />
      { ingredients && ingredients.map((ingredient, index) => {
        const limit = 12;
        if (index < limit) {
          return (
            <button
              type="button"
              onClick={ () => handleIngredient(ingredient.strIngredient
                || ingredient.strIngredient1) }
              key={ ingredient.strIngredient || ingredient.strIngredient1 }
            >
              <div
                data-testid={ `${index}-ingredient-card` }
                key={ ingredient.strIngredient || ingredient.strIngredient1 }
              >
                <img data-testid={ `${index}-card-img` } src={ mealOrDrink === 'foods' ? `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` : `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` } alt={ ingredient.strIngredient || ingredient.strIngredient1 } />
                <p
                  data-testid={ `${index}-card-name` }
                >
                  { ingredient.strIngredient || ingredient.strIngredient1 }

                </p>
              </div>
            </button>
          );
        }
        return '';
      }) }
      <BottomMenu />
    </div>
  );
}
