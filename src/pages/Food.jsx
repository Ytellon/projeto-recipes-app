import React, { useContext } from 'react';
import BottomMenu from '../components/BottomMenu';
import CardsRecipes from '../components/CardsRecipes';
import Header from '../components/Header';
import FoodContext from '../FoodContext/foodContext';
import Button from '../components/Button';

export default function Food() {
  const { meal, buttonMeal } = useContext(FoodContext);
  const NUMBER_OF_CARDS = 12;
  const NUMBER_CATEGORIES = 5;
  return (
    <div>
      <Header
        title="Foods"
        showSearchIcon
      />
      {buttonMeal
        && buttonMeal
          .slice(0, NUMBER_CATEGORIES)
          .map((categories, index) => (
            <Button
              key={ index }
              dataTestIdButton={ `${categories.strCategory}-category-filter` }
              name={ categories.strCategory }
            />
          ))}
      { meal && meal.slice(0, NUMBER_OF_CARDS).map((food, index) => (
        <CardsRecipes
          key={ food.idMeal }
          name={ food.strMeal }
          image={ food.strMealThumb }
          dataTestIdCard={ `${index}-recipe-card` }
          dataTestIdImage={ `${index}-card-img` }
          dataTestIdName={ `${index}-card-name` }
        />
      ))}
      <BottomMenu />
    </div>
  );
}
