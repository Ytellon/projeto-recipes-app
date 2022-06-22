import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/BottomMenu.css';

export default function BottomMenu() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img src={ drinkIcon } alt="Ícone de bebida" data-testid="drinks-bottom-btn" />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/explore') }
      >
        <img
          src={ exploreIcon }
          alt="Ícone de exploração"
          data-testid="explore-bottom-btn"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/foods') }
      >
        <img src={ mealIcon } alt="Ícone de comida" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
}
