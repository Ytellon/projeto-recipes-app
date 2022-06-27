import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Carousel.css';

const TWO_THOUSAND = 2000;

export default function Carousel({ suggestions }) {
  const [pairPhotosIndex, setPairPhotosIndex] = useState(0);

  const nextSuggestion = () => {
    if (pairPhotosIndex >= (suggestions.length / 2) - 1) {
      setPairPhotosIndex(0);
    } else {
      setPairPhotosIndex(pairPhotosIndex + 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => nextSuggestion(), TWO_THOUSAND);
    return () => clearInterval(timer);
  });

  return (
    <div className="carousel">
      <div
        className="inner"
        style={ { transform: `translateX(-${pairPhotosIndex * 100}%)` } }
      >
        {
          suggestions.map((suggestion, index) => (
            <div
              className="carousel-item"
              data-testid={ `${index}-recomendation-card` }
              key={ Math.random() }
              style={ {
                width: '50%',
                backgroundImage: `url(${
                  suggestion.strMealThumb
                  || suggestion.strDrinkThumb
                })`,
              } }
            >
              <h5
                data-testid={ `${index}-recomendation-title` }
              >
                {suggestion.strMeal || suggestion.strDrink}
              </h5>
            </div>
          ))
        }
      </div>
    </div>
  );
}

Carousel.propTypes = {
  children: PropTypes.node,
}.isRequired;
