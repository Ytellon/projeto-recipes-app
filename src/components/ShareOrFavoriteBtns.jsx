import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import FoodContext from '../FoodContext/foodContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function ShareOrFavoriteBtns({
  id, recipe: currentRecipe, isFoodOrDrink,
}) {
  const { shareRecipe } = useContext(FoodContext);
  const [link, setLink] = useState('');
  const [favoriteRecipes, setFavoriteRecipes] = useState(
    JSON.parse(localStorage.getItem('favoriteRecipes')),
  );
  const [isThisRecipeFavorited, setIsThisRecipeFavorited] = useState(false);
  const [newRecipe, setNewRecipe] = useState({});

  const favoriteRecipe = () => {
    if (favoriteRecipes) {
      const isTheRecipeAlreadyFavorited = favoriteRecipes
        .some((recipe) => recipe.id === id);
      if (isTheRecipeAlreadyFavorited) {
        const newFavoriteRecipes = favoriteRecipes.filter((recipe) => recipe.id !== id);
        localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
        setFavoriteRecipes(newFavoriteRecipes);
        setIsThisRecipeFavorited(false);
      } else {
        favoriteRecipes.push(newRecipe);
        localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
        setFavoriteRecipes(favoriteRecipes);
        setIsThisRecipeFavorited(true);
      }
    } else {
      const newFavoriteRecipes = localStorage
        .setItem('favoriteRecipes', JSON.stringify([newRecipe]));
      setFavoriteRecipes(newFavoriteRecipes);
      setIsThisRecipeFavorited(true);
    }
  };

  useEffect(() => {
    setFavoriteRecipes(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, [isThisRecipeFavorited]);

  useEffect(() => {
    if (favoriteRecipes) {
      setIsThisRecipeFavorited(favoriteRecipes
        .some((recipe) => recipe.id === id));
    }
    if (isFoodOrDrink === 'foods') {
      const newFavoiteRecipe = {
        id: currentRecipe.idMeal,
        type: 'food',
        nationality: currentRecipe.strArea,
        category: currentRecipe.strCategory,
        alcoholicOrNot: '',
        name: currentRecipe.strMeal,
        image: currentRecipe.strMealThumb,
      };
      setNewRecipe(newFavoiteRecipe);
    } else {
      const newFavoiteRecipe = {
        id: currentRecipe.idDrink,
        type: 'drink',
        nationality: '',
        category: currentRecipe.strCategory,
        alcoholicOrNot: currentRecipe.strAlcoholic,
        name: currentRecipe.strDrink,
        image: currentRecipe.strDrinkThumb,
      };
      setNewRecipe(newFavoiteRecipe);
    }
  }, [id, favoriteRecipes, isFoodOrDrink, currentRecipe]);

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
        src={ isThisRecipeFavorited ? blackHeartIcon : whiteHeartIcon }
        onClick={ favoriteRecipe }
      >
        <img
          src={ isThisRecipeFavorited ? blackHeartIcon : whiteHeartIcon }
          alt={ isThisRecipeFavorited ? 'blackHeartIcon' : 'whiteHeartIcon' }
        />
      </button>
    </div>
  );
}

ShareOrFavoriteBtns.propTypes = {
  id: PropTypes.string,
  currentRecipe: PropTypes.shape({}),
  isFoodOrDrink: PropTypes.string,
}.isRequired;
