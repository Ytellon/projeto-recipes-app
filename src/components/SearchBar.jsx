import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import InputRadios from './inputRadios';
import {
  getMealByIngredient,
  getMealByFirstLetter,
  getMealByName,
} from '../service/mealAPI';
import FoodContext from '../FoodContext/foodContext';
import {
  getDrinkByIngredient,
  getDrinksByName,
  getDrinksByFirstLetter,
} from '../service/drinkAPI';

function SearchBar() {
  const [typeInput, setTypeInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { setMeal, setDrink, setDrinkOrMeal } = useContext(FoodContext);
  const history = useHistory();

  const handleClick = ({ target }) => {
    setTypeInput(target.value);
  };

  const verifyDrink = (savedDrink) => {
    setDrinkOrMeal('drinks');
    if (savedDrink && savedDrink.length === 1) {
      history.push(`/drinks/${savedDrink[0].idDrink}`);
    }
  };

  const verifyFood = (savedMeal) => {
    setDrinkOrMeal('foods');
    if (savedMeal && savedMeal.length === 1) {
      history.push(`/meals/${savedMeal[0].idMeal}`);
    }
  };

  const verifyFound = (found) => {
    if (!found) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  };

  const handleSetMeal = async (event) => {
    event.preventDefault();
    switch (typeInput) {
    case 'ingredient':
      if (history.location.pathname === '/foods') {
        const mealByIngredient = await getMealByIngredient(searchInput);
        verifyFound(mealByIngredient);
        verifyFood(mealByIngredient);
        return setMeal(mealByIngredient);
      }
      if (history.location.pathname === '/drinks') {
        const ingredientDrink = await getDrinkByIngredient(searchInput);
        verifyFound(ingredientDrink);
        verifyDrink(ingredientDrink);
        return setDrink(ingredientDrink);
      }
      break;
    case 'name':
      if (history.location.pathname === '/foods') {
        const mealByName = await getMealByName(searchInput);
        verifyFound(mealByName);
        verifyFood(mealByName);
        return setMeal(mealByName);
      }
      if (history.location.pathname === '/drinks') {
        const nameDrink = await getDrinksByName(searchInput);
        verifyFound(nameDrink);
        verifyDrink(nameDrink);
        return setDrink(nameDrink);
      }
      break;
    case 'firstLetter':
      if (searchInput.length > 1) {
        return global.alert('Your search must have only 1 (one) character');
      }
      if (history.location.pathname === '/foods') {
        const mealByFirstLetter = await getMealByFirstLetter(searchInput);
        verifyFound(mealByFirstLetter);
        verifyFood(mealByFirstLetter);
        return setMeal(mealByFirstLetter);
      }
      if (history.location.pathname === '/drinks') {
        const firstLetterDrink = await getDrinksByFirstLetter(searchInput);
        verifyFound(firstLetterDrink);
        verifyDrink(firstLetterDrink);
        return setDrink(firstLetterDrink);
      }
      break;
    default:
      break;
    }
  };

  return (
    <form className="search-bar">
      <input
        data-testid="search-input"
        type="text"
        placeholder="Search Recipe"
        value={ searchInput }
        onChange={ ({ target }) => setSearchInput(target.value) }
      />
      <InputRadios
        dataTestid="ingredient-search-radio"
        id="ingredient-search-radio"
        name="search-radio"
        value="ingredient"
        onClick={ handleClick }
        labelContent="Ingredient"
      />
      <InputRadios
        dataTestid="name-search-radio"
        id="name-search-radio"
        name="search-radio"
        value="name"
        onClick={ handleClick }
        labelContent="Name"
      />
      <InputRadios
        dataTestid="first-letter-search-radio"
        id="first-letter-search-radio"
        name="search-radio"
        value="firstLetter"
        onClick={ handleClick }
        labelContent="First Letter"
      />
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ handleSetMeal }
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
