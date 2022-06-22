import React from 'react';
import PropTypes from 'prop-types';
import { FoodContext } from './foodContext';
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

FoodContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FoodContextProvider;
