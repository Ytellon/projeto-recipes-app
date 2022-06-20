import React, { useState } from 'react';
import { FoodContext } from './foodContext';
import PropTypes from 'prop-types';

const FoodContextProvider = ({ children }) => {
  const contextValue = {};
  return (
    <FoodContext.Provider value={ contextValue }>
      { children }
    </FoodContext.Provider>
  );
}

export default FoodContextProvider;