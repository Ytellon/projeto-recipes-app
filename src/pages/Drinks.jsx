import React, { useContext, useState, useEffect } from 'react';
import BottomMenu from '../components/BottomMenu';
import CardsRecipes from '../components/CardsRecipes';
import Header from '../components/Header';
import FoodContext from '../FoodContext/foodContext';
import Button from '../components/Button';

export default function Drinks() {
  const [filter, setFilter] = useState('All');
  const [preview, setPreview] = useState('');
  const {
    drink, buttonDrink, getDrinksByCategory, fetchDrinks } = useContext(FoodContext);
  const NUMBER_OF_CARDS = 12;
  const NUMBER_CATEGORIES = 5;

  const handleFilter = (filterName) => {
    if (filterName !== filter) {
      setFilter(filterName);
    }
    if (filterName === filter) {
      setPreview(filterName);
      setFilter('All');
    }
  };

  useEffect(() => {
    const handleDrinksCategorys = () => {
      if (filter !== 'All') {
        getDrinksByCategory(filter);
      }
      if (filter === 'All' || filter === preview) {
        fetchDrinks();
      }
    };

    handleDrinksCategorys();
  }, [filter]);

  return (
    <div>
      <Header title="Drinks" showSearchIcon />
      <Button
        dataTestIdButton="All-category-filter"
        name="All"
        onClick={ fetchDrinks }
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

      {buttonDrink
        && buttonDrink
          .slice(0, NUMBER_CATEGORIES)
          .map((categories, index) => (
            <Button
              key={ index }
              dataTestIdButton={ `${categories.strCategory}-category-filter` }
              name={ categories.strCategory }
              onClick={ ({ target }) => handleFilter(target.name) }
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
              id={ drinks.idDrink }
              route="drinks"
            />
          ))}
      <BottomMenu />
    </div>
  );
}
