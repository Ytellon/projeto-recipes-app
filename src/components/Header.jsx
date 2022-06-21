import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Profile from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import BottomMenu from './BottomMenu';

export default function Header(props) {
  const history = useHistory();
  const { title } = props;
  const [hideShowBar, setHideShowBar] = useState(true);
  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
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
      <input
        placeholder="Barra de busca"
        data-testid="search-input"
        hidden={ hideShowBar }
      />

      <BottomMenu />
    </div>
  );
}

Header.propTypes = {
  history: PropTypes.object,
}.isRequired;
