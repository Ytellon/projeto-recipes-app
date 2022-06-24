import React from 'react';
import Header from '../components/Header';
import ShareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const drinkOrMeal = 'meal';

  return (
    <div>
      <Header
        title="Done Recipes"
        showSearchIcon={ false }
      />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      { drinkOrMeal === 'meal' && (
        <>
          <img src="" alt="" data-testid="index-horizontal-image" />
          <p data-testid="${index-horizontal-top-text">Nacionalidade e Categoria</p>
          <p data-testid="${index-horizontal-name">Nome da receita</p>
          <p data-testid="${index-horizontal-done-date">Data</p>
          <p data-testid="${index-${tagName-horizontal-tag">Tags</p>
          <button
            type="button"
            data-testid="${index-horizontal-share-btn"
          >
            <img src={ ShareIcon } alt="Ícone de compartilhar" />
          </button>
        </>
      ) }
      {
        drinkOrMeal === 'drink' && (
          <>
            <img src="" alt="" data-testid="index-horizontal-image" />
            <p data-testid="${index-horizontal-name">Nome da receita</p>
            <p data-testid="${index-horizontal-top-text">É alcoolico ou não</p>
            <p data-testid="${index-horizontal-done-date">Data</p>
            <button
              type="button"
              data-testid="${index-horizontal-share-btn"
            >
              <img src={ ShareIcon } alt="Ícone de compartilhar" />

            </button>
          </>
        )
      }
    </div>
  );
}
