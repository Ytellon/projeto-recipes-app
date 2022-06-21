import React from 'react';
import PropTypes from 'prop-types';
import FoodContext from './foodContext';

const FoodContextProvider = ({ children }) => {
  const contextValue = {};
  return (
    <FoodContext.Provider value={ contextValue }>
      { children }
    </FoodContext.Provider>
  );
};

export default FoodContextProvider;

FoodContextProvider.propTypes = {
  children: PropTypes.shape({}),
}.isRequired;
