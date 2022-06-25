import React, { useContext } from 'react';
import BottomMenu from '../components/BottomMenu';
import CardsRecipes from '../components/CardsRecipes';
import Header from '../components/Header';
import FoodContext from '../FoodContext/foodContext';

export default function Drinks() {
  const { drink } = useContext(FoodContext);
  const NUMBER_OF_CARDS = 12;
  return (
    <div>
      <Header
        title="Drinks"
        showSearchIcon
      />
      { drink && drink.slice(0, NUMBER_OF_CARDS).map((drinks, index) => (
        <CardsRecipes
          key={ drinks.idDrink }
          id={ drinks.idDrink }
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
