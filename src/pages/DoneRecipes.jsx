import React, { useState } from 'react';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [doneRecipes] = useState(JSON
    .parse(localStorage.getItem('doneRecipes')));

  const [filteredRecipes, setFilteredRecipes] = useState(doneRecipes);

  const filterRecipes = (type) => {
    if (type === 'meal') {
      const meals = doneRecipes.filter(({ alcoholicOrNot }) => alcoholicOrNot === '');
      setFilteredRecipes(meals);
    } else {
      const drinks = doneRecipes.filter(({ alcoholicOrNot }) => alcoholicOrNot !== '');
      setFilteredRecipes(drinks);
    }
  };

  const renderAllRecipes = () => {
    setFilteredRecipes(doneRecipes);
  };

  return (
    <div>
      <Header
        title="Done Recipes"
        showSearchIcon={ false }
      />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => renderAllRecipes() }
      >
        All

      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterRecipes('meal') }
      >
        Food

      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterRecipes('drinks') }
      >
        Drinks

      </button>

      { filteredRecipes
        .map(({ nationality, alcoholicOrNot, category, name, doneDate }, index) => (
          <div key={ index }>
            <img src="" alt="" data-testid="index-horizontal-image" />
            <p
              data-testid="${index-horizontal-top-text"
            >
              { nationality === '' ? alcoholicOrNot : `${nationality} - ${category}` }

            </p>
            <p data-testid="${index-horizontal-name">{ name }</p>
            <p data-testid="${index-horizontal-done-date">{ doneDate }</p>
            <p
              data-testid="${index-${tagName-horizontal-tag"
            >
              { nationality !== '' ? 'renderiza tags' : 'não renderiza' }

            </p>

            <button
              type="button"
              data-testid="${index-horizontal-share-btn"
            >
              <img src={ ShareIcon } alt="Ícone de compartilhar" />
            </button>
          </div>
        )) }

    </div>
  );
}
