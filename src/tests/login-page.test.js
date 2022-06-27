import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Verifica tela de login', () => {
  const history = createMemoryHistory();
  const email = 'email@email.com';

  test('Se existe inputs', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const inputEmail = screen.getByPlaceholderText('email');

    expect(inputEmail).toBeInTheDocument();

    const inputPassword = screen.getByRole('textbox');
    expect(inputPassword).toBeInTheDocument();
  });

  test('Se existe um button', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const btn = screen.getByRole('button', { name: /enter/i });
    expect(btn).toBeInTheDocument();

    userEvent.click(btn);
  });

  test('Input email e password INVÁLIDOS', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, 'email.email.com');
    const inputPassword = screen.getByPlaceholderText('password');

    userEvent.type(inputPassword, '123456');
    const btn = screen.getByRole('button', { name: /enter/i });
    expect(btn).toBeDisabled();
  });

  test('Input email e password VÁLIDOS', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const inputEmail = screen.getByPlaceholderText('email');
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByPlaceholderText('password');

    userEvent.type(inputPassword, '1234567');
    const btn = screen.getByRole('button', { name: /enter/i });
    expect(btn).toBeEnabled();
  });

  test('Testa chaves salvas no localStorage', () => {
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const inputEmail = screen.getByPlaceholderText('email');
    expect(inputEmail).toBeInTheDocument();

    userEvent.type(inputEmail, email);
    const inputPassword = screen.getByPlaceholderText('password');

    userEvent.type(inputPassword, '1234567');
    const btn = screen.getByRole('button', { name: /enter/i });
    userEvent.click(btn);

    const mealsToken = localStorage.getItem('mealsToken');
    expect(mealsToken).toBe('1');

    const cocktailsToken = localStorage.getItem('cocktailsToken');
    expect(cocktailsToken).toBe('1');

    const user = localStorage.getItem('user');
    expect(JSON.parse(user)).toEqual({ email });

    expect(history.location.pathname).toEqual('/foods');
  });
});
