import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState();
  useEffect(() => {
    const habilitarBotao = () => {
      const caracter = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
      const minimoCarac = 7;
      const validation = !(caracter.test(email)) || password.length < minimoCarac;
      setIsButtonDisabled(validation);
    };
    habilitarBotao();
  }, [email, password]);

  const RedirectToRecipes = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
  };

  return (
    <div>
      <input
        type="email"
        placeholder="email"
        data-testid="email-input"
        value={ email }
        name="email"
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <input
        type="password"
        placeholder="password"
        data-testid="password-input"
        value={ password }
        name="password"
        onChange={ ({ target: { value } }) => setPassword(value) }
      />
      <Link to="/foods">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isButtonDisabled }
          onClick={ RedirectToRecipes }
        >
          Enter
        </button>
      </Link>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;
