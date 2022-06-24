import React, { useContext } from 'react';
import BottomMenu from '../components/BottomMenu';
import CardsRecipes from '../components/CardsRecipes';
import Header from '../components/Header';
import FoodContext from '../FoodContext/foodContext';
import Button from '../components/Button';

export default function Drinks() {
  const { drink, buttonDrink, getDrinksByCategory } = useContext(FoodContext);
  const NUMBER_OF_CARDS = 12;
  const NUMBER_CATEGORIES = 5;
  return (
    <div>
      <Header title="Drinks" showSearchIcon />
      {buttonDrink
        && buttonDrink
          .slice(0, NUMBER_CATEGORIES)
          .map((categories, index) => (
            <Button
              key={ index }
              dataTestIdButton={ `${categories.strCategory}-category-filter` }
              name={ categories.strCategory }
              onClick={ ({ target }) => getDrinksByCategory(target.name) }
            />
          ))}
      {drink
        && drink
          .slice(0, NUMBER_OF_CARDS)
          .map((drinks, index) => (
            <CardsRecipes
              key={ drinks.idDrink }
              name={ drinks.strDrink }
              image={ drinks.strDrinkThumb }
              dataTestIdCard={ `${index}-recipe-card` }
              dataTestIdImage={ `${index}-card-img` }
              dataTestIdName={ `${index}-card-name` }
            />
          ))}
      <BottomMenu />
    </div>
  );
}
