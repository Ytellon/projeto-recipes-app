import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Profile from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header(props) {
  const history = useHistory();
  const { title, showSearchIcon } = props;
  const [showBar, setShowBar] = useState(false);
  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
        src="profileIcon"
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ Profile }
          alt="Profile"
        />
      </button>
      <p data-testid="page-title">
        { title }
      </p>
      {showSearchIcon && (
        <button
          type="button"
          data-testid="search-top-btn"
          src="searchIcon"
          onClick={ () => setShowBar(!showBar) }
        >
          <img
            src={ SearchIcon }
            alt="Profile"
          />
        </button>)}
      {showBar && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
}.isRequired;
