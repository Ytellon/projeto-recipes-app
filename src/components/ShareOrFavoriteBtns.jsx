import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../FoodContext/foodContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function ShareOrFavoriteBtns({ id, recipe: currentRecipe }) {
  const { shareRecipe } = useContext(FoodContext);
  const [isThisRecipeFavorited, setIsThisRecipeFavorited] = useState(false);
  const [link, setLink] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  );

  const favoriteRecipe = () => {
    if (favoriteRecipes) {
      const isTheRecipeAlreadyFavorited = favoriteRecipes
        .some(({ idMeal }) => idMeal === id);
      if (isTheRecipeAlreadyFavorited) {
        const newFavoriteRecipes = favoriteRecipes.filter(({ idMeal }) => idMeal !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
        setFavoriteRecipes(newFavoriteRecipes);
        setIsThisRecipeFavorited(false);
      } else {
        favoriteRecipes.push(currentRecipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        setFavoriteRecipes(favoriteRecipes);
        setIsThisRecipeFavorited(true);
      }
    } else {
      const newFavoriteRecipes = localStorage
        .setItem('favoriteRecipes', JSON.stringify([currentRecipe]));
      setFavoriteRecipes(newFavoriteRecipes);
      setIsThisRecipeFavorited(true);
    }
  };

  useEffect(() => {}, [id, favoriteRecipes]);

  return (
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ () => {
          setLink('Link copied!');
          shareRecipe();
        } }
      >
        <img
          src={ shareIcon }
          alt="Share Recipe"
        />
        {link}
      </button>

      <button
        data-testid="favorite-btn"
        type="button"
        src={ isThisRecipeFavorited ? 'blackHeartIcon' : 'whiteHeartIcon' }
        onClick={ favoriteRecipe }
      >
        <img
          src={ isThisRecipeFavorited ? blackHeartIcon : whiteHeartIcon }
          alt="Favorite Recipe"
        />
      </button>
    </div>
  );
}

ShareOrFavoriteBtns.propTypes = {
  id: PropTypes.string,
  currentRecipe: PropTypes.shape({}),
}.isRequired;
