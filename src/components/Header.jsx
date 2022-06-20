import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Profile from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';

export default function Header(history) {
  const { push } = history;
  const [hideShowBar, setHideShowBar] = useState(true);

  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
        onClick={ () => push('/profile') }
      >
        <img
          src={ Profile }
          alt="Profile"
        />
      </button>
      <p data-testid="page-title">Page title</p>

      <button
        data-testid="search-top-btn"
        type="button"
        onClick={ () => setHideShowBar(!hideShowBar) }
      >
        <img
          src={ SearchIcon }
          alt="Profile"
        />
      </button>
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.object,
}.isRequired;
