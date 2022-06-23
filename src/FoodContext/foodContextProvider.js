import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './foodContext';
import {
  getAllDrinksInitial,
  getAllDrinksCategories,
} from '../service/drinkAPI';
import { getAllMealsInitial, getAllFoodsCategories } from '../service/mealAPI';

const FoodContextProvider = ({ children }) => {
  const [meal, setMeal] = useState([]);
  const [drink, setDrink] = useState([]);
  const [buttonDrink, setButtonDrink] = useState([]);
  const [buttonMeal, setButtonMeal] = useState([]);

  const getCategoriesDrinks = async () => {
    const categories = await getAllDrinksCategories();
    setButtonDrink(categories);
  };

  const getCategoriesMeals = async () => {
    const categories = await getAllFoodsCategories();
    setButtonMeal(categories);
  };

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
    getCategoriesDrinks();
    getCategoriesMeals();
  }, []);

  const contextValue = {
    meal,
    setMeal,
    drink,
    setDrink,
    buttonDrink,
    buttonMeal,
    setButtonDrink,
    setButtonMeal,
  };

  return (
    <FoodContext.Provider value={ contextValue }>{children}</FoodContext.Provider>
  );
};

FoodContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodContextProvider;
