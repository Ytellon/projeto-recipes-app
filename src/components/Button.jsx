import React from 'react';
import PropTypes from 'prop-types';

function Button({ dataTestIdButton, name }) {
  return (
    <button
      className="btn btn-outline-primary"
      data-testid={ dataTestIdButton }
      name={ name }
      type="button"
    >
      {name}
    </button>
  );
}

Button.propTypes = {
  dataTestIdButton: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Button;
