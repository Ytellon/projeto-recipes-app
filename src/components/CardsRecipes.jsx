import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CardsRecipes({
  dataTestIdCard,
  dataTestIdImage,
  dataTestIdName,
  name,
  image,
  id,
  route,
}) {
  const handleChangePage = () => {
    if (route === 'foods') {
      return (`/foods/${id}`);
    }
    if (route === 'drinks') {
      return (`/drinks/${id}`);
    }
  };

  return (
    <Link to={ handleChangePage }>
      <div data-testid={ dataTestIdCard }>
        <p data-testid={ dataTestIdName }>{name}</p>
        <img data-testid={ dataTestIdImage } src={ image } alt={ name } />
      </div>
    </Link>
  );
}

CardsRecipes.propTypes = {
  dataTestIdCard: PropTypes.string.isRequired,
  dataTestIdImage: PropTypes.string.isRequired,
  dataTestIdName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired,
};

export default CardsRecipes;
