import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const history = useHistory();

  const [doneRecipes, setDoneRecipes] = useState(JSON
    .parse(localStorage.getItem('doneRecipes')));

  const [filteredRecipes, setFilteredRecipes] = useState([]);

  useEffect(() => {
    const recipesDone = localStorage.getItem('doneRecipes');
    if (recipesDone) {
      setDoneRecipes(recipesDone);
    }
  }, []);

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
        .map((recipe, index) => {
          const { id, nationality, alcoholicOrNot,
            category, name, doneDate, image } = recipe;

          return (
            <div key={ index }>
              <button
                type="button"
                onClick={ () => history.push(`/foods/${id}/details`) }
              >
                <img src={ image } alt="Receita" data-testid="index-horizontal-image" />
              </button>
              <p
                data-testid="${index-horizontal-top-text"
              >
                { nationality === '' ? alcoholicOrNot : `${nationality} - ${category}` }
              </p>
              <button
                type="button"
                onClick={ () => history.push(`/foods/${id}/details`) }
              >
                <p
                  data-testid="${index-horizontal-name"
                >
                  { name }
                </p>
              </button>
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
          );
        }) }

    </div>
  );
}
