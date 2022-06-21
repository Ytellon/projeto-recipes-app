import React, { useContext, useState } from 'react';
import InputRadios from './inputRadios';
import {
  getMealByIngredient,
  getMealByFirstLetter,
  getMealByName,
} from '../service/mealAPI';
import FoodContext from '../FoodContext/foodContext';

function SearchBar() {
  const [typeInput, setTypeInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const { setMeal } = useContext(FoodContext);

  const handleClick = ({ target }) => {
    setTypeInput(target.value);
  };

  const handleSetDrink = async (event) => {
    event.preventDefault();
    switch (typeInput) {
    case 'ingredient':
      setMeal(await getMealByIngredient(searchInput));
      break;
    case 'name':
      setMeal(await getMealByName(searchInput));
      break;
    case 'firstLetter':
      setMeal(await getMealByFirstLetter(searchInput));
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
        onClick={ handleSetDrink }
      >
        Search
      </button>
    </form>

  );
}

export default SearchBar;
