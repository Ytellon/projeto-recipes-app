import React from 'react';
import InputRadios from './inputRadios';

function SearchBar() {
  return (
    <form className="search-bar">
      <input type="text" placeholder="Search Recipe" />
      <InputRadios
        dataTestid="ingredient-search-radio"
        id="ingredient-search-radio"
        name="search-radio"
        value="ingredient"
        onClick={ () => console.log('mds derick') }
        labelContent="Ingredient"
      />
      <InputRadios
        dataTestid="name-search-radio"
        id="name-search-radio"
        name="search-radio"
        value="name"
        onClick={ () => console.log('mds mor') }
        labelContent="Name"
      />
      <InputRadios
        dataTestid="first-letter-search-radio"
        id="first-letter-search-radio"
        name="search-radio"
        value="first-letter"
        onClick={ () => console.log('mds desfavorecido') }
        labelContent="First Letter"
      />
      <button
        type="submit"
        data-testid="exec-search-btn"
      >
        Search
      </button>
    </form>

  );
}

export default SearchBar;
