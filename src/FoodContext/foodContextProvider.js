import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './foodContext';
import {
  getAllDrinksCategories,
} from '../service/drinkAPI';
import {
  getAllFoodsCategories,
} from '../service/mealAPI';

const FoodContextProvider = ({ children }) => {
  const [currentRecipeId, setCurrentRecipeId] = useState('');
  const [drinkOrMeal, setDrinkOrMeal] = useState('');
  const [meal, setMeal] = useState([]);
  const [drink, setDrink] = useState([]);
  const shareRecipe = () => {
    const link = window.location.href;
    const linkArray = link.split('/');
    if (linkArray.includes('in-progress')) {
      const filterdArray = linkArray.filter((word) => word !== 'in-progress');
      const newArray = filterdArray.join('/');
      navigator.clipboard.writeText(newArray);
    } else {
      navigator.clipboard.writeText(link);
    }
  };

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

  useEffect(() => {
    getCategoriesDrinks();
    getCategoriesMeals();
  }, []);

  const contextValue = {
    currentRecipeId,
    setCurrentRecipeId,
    drinkOrMeal,
    setDrinkOrMeal,
    shareRecipe,
    buttonDrink,
    buttonMeal,
    setButtonDrink,
    setButtonMeal,
    drink,
    setDrink,
    meal,
    setMeal,
  };

  return (
    <FoodContext.Provider value={ contextValue }>{children}</FoodContext.Provider>
  );
};

FoodContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodContextProvider;
