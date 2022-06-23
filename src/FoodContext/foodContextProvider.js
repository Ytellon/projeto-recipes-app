import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './foodContext';
import { getAllDrinksInitial } from '../service/drinkAPI';
import { getAllMealsInitial } from '../service/mealAPI';

const FoodContextProvider = ({ children }) => {
  const [meal, setMeal] = useState([]);
  const [drink, setDrink] = useState([]);
  const contextValue = { meal, setMeal, drink, setDrink };

  const fetchDrinks = async () => {
    const drinks = await getAllDrinksInitial();
    setDrink(drinks);
  };

  const fetchMeals = async () => {
    const meals = await getAllMealsInitial();
    setMeal(meals);
  };

  useEffect(() => {
    fetchDrinks();
    fetchMeals();
  }, []);

  return (
    <FoodContext.Provider value={ contextValue }>
      { children }
    </FoodContext.Provider>
  );
};

FoodContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodContextProvider;
