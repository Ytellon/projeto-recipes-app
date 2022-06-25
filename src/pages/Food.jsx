import React, { useContext } from 'react';
import BottomMenu from '../components/BottomMenu';
import CardsRecipes from '../components/CardsRecipes';
import Header from '../components/Header';
import FoodContext from '../FoodContext/foodContext';

export default function Food() {
  const { meal } = useContext(FoodContext);
  const NUMBER_OF_CARDS = 12;
  return (
    <div>
      <Header
        title="Foods"
        showSearchIcon
      />
      { meal && meal.slice(0, NUMBER_OF_CARDS).map((food, index) => (
        <CardsRecipes
          key={ food.idMeal }
          name={ food.strMeal }
          id={ food.idMeal }
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
