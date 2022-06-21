import React, { useState, useEffect } from 'react';

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

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        data-testid="email-input"
        value={ email }
        onChange={ ({ target: { value } }) => setEmail(value) }
      />
      <input
        type="password"
        placeholder="password"
        data-testid="password-input"
        value={ password }
        onChange={ ({ target: { value } }) => setPassword(value) }
      />
      <button
        type="button"
        data-testid="login-submit-btn"
        disabled={ isButtonDisabled }
      >
        Enter
      </button>
    </div>
  );
}
