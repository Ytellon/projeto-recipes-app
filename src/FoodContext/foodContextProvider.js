import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FoodContext from './foodContext';

const FoodContextProvider = ({ children }) => {
  const [meal, setMeal] = useState([]);
  const [drink, setDrink] = useState([]);
  const contextValue = { meal, setMeal, drink, setDrink };
  return (
    <FoodContext.Provider value={ contextValue }>
      { children }
    </FoodContext.Provider>
  );
};

FoodContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodContextProvider;
