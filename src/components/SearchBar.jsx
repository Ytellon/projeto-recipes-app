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
  const { setMeal, setDrink } = useContext(FoodContext);
  const history = useHistory();

  const handleClick = ({ target }) => {
    setTypeInput(target.value);
  };

  const verifyDrink = (savedDrink) => {
    if (savedDrink && savedDrink.length === 1) {
      history.push(`/drinks/${savedDrink[0].idDrink}`);
    }
  };

  const verifyFood = (savedMeal) => {
    if (savedMeal && savedMeal.length === 1) {
      history.push(`/meals/${savedMeal[0].idMeal}`);
    }
  };

  const handleSetMeal = async (event) => {
    event.preventDefault();
    switch (typeInput) {
    case 'ingredient':
      if (history.location.pathname === '/foods') {
        const mealByIngredient = await getMealByIngredient(searchInput);
        verifyFood(mealByIngredient);
        return setMeal(mealByIngredient);
      }
      if (history.location.pathname === '/drinks') {
        const ingredientDrink = await getDrinkByIngredient(searchInput);
        verifyDrink(ingredientDrink);
        return setDrink(ingredientDrink);
      }
      break;
    case 'name':
      if (history.location.pathname === '/foods') {
        const mealByName = await getMealByName(searchInput);
        verifyFood(mealByName);
        return setMeal(mealByName);
      }
      if (history.location.pathname === '/drinks') {
        const nameDrink = await getDrinksByName(searchInput);
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
        verifyFood(mealByFirstLetter);
        return setMeal(mealByFirstLetter);
      }
      if (history.location.pathname === '/drinks') {
        const firstLetterDrink = await getDrinksByFirstLetter(searchInput);
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
      <p>{console.log(history)}</p>
    </form>
  );
}

export default SearchBar;
