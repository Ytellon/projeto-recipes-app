import React, { useContext, useEffect, useState } from 'react';
import BottomMenu from '../components/BottomMenu';
import CardsRecipes from '../components/CardsRecipes';
import Header from '../components/Header';
import FoodContext from '../FoodContext/foodContext';
import Button from '../components/Button';
import { getAllMealsInitial,
  getMealByCategory, getMealByIngredient } from '../service/mealAPI';

export default function Food() {
  const [filter, setFilter] = useState('All');

  const [preview, setPreview] = useState('');
  const { buttonMeal, meal, setMeal } = useContext(FoodContext);
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
    const ingredient = localStorage.getItem('filteredIngredient');

    const handleIngredient = () => {
      if (ingredient === null || ingredient === '') {
        const fetchMeals = async () => {
          const meals = await getAllMealsInitial();
          setMeal(meals);
        };
        const getMealsByCategory = async (category) => {
          const meals = await getMealByCategory(category);
          setMeal(meals);
        };
        const handleMealsCategorys = () => {
          if (filter !== 'All') {
            getMealsByCategory(filter);
          }
          if (filter === 'All' || filter === preview) {
            fetchMeals();
          }
        };
        handleMealsCategorys();
      }
    };
    handleIngredient();
  }, [filter, setMeal, preview]);

  useEffect(() => {
    const getIngredients = async () => {
      const ingredient = localStorage.getItem('filteredIngredient');
      if (ingredient !== null) {
        // comidas filtradas por ingrediente
        const mealsFilterByIngredient = await getMealByIngredient(ingredient);
        setMeal(mealsFilterByIngredient);
      }
    };
    getIngredients();
  }, [setMeal]);

  return (
    <div>
      <Header
        title="Foods"
        showSearchIcon
      />
      <Button
        dataTestIdButton="All-category-filter"
        name="All"
        onClick={ ({ target }) => handleFilter(target.name) }
      />
      {buttonMeal
        && buttonMeal
          .slice(0, NUMBER_CATEGORIES)
          .map((categories, index) => (
            <Button
              key={ index }
              dataTestIdButton={ `${categories.strCategory}-category-filter` }
              name={ categories.strCategory }
              onClick={ ({ target }) => handleFilter(target.name) }
            />
          ))}
      { meal && meal.slice(0, NUMBER_OF_CARDS).map((food, index) => (
        <CardsRecipes
          key={ food.idMeal }
          name={ food.strMeal }
          id={ food.idMeal }
          image={ food.strMealThumb }
          dataTestIdCard={ `${index}-recipe-card` }
          dataTestIdImage={ `${index}-card-img` }
          dataTestIdName={ `${index}-card-name` }
          route="foods"
        />
      ))}

      <BottomMenu />
    </div>
  );
}
