import React from 'react';
import PropTypes from 'prop-types';

function Button({ dataTestIdButton, name, onClick }) {
  return (
    <button
      data-testid={ dataTestIdButton }
      name={ name }
      type="button"
      onClick={ onClick }
    >
      {name}
    </button>
  );
}

Button.propTypes = {
  dataTestIdButton: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
