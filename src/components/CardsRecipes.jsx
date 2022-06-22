import React from 'react';
import PropTypes from 'prop-types';

function CardsRecipes({ dataTestIdCard, dataTestIdImage, dataTestIdName, name, image }) {
  return (
    <div data-testid={ dataTestIdCard }>
      <p data-testid={ dataTestIdName }>{ name }</p>
      <img
        data-testid={ dataTestIdImage }
        src={ image }
        alt={ name }
      />

    </div>
  );
}

CardsRecipes.propTypes = {
  dataTestIdCard: PropTypes.string.isRequired,
  dataTestIdImage: PropTypes.string.isRequired,
  dataTestIdName: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default CardsRecipes;
