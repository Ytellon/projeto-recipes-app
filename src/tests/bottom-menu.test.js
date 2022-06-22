import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../service/renderWithRouter';

describe('Verifica componente Bottom Menu', () => {
  test('Se existe os ícones de bebida, pesquisa e comida', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/foods');
    const iconDrink = screen.getByTestId('drinks-bottom-btn');
    expect(iconDrink).toBeInTheDocument();

    const searchIcon = screen.getByTestId('explore-bottom-btn');
    expect(searchIcon).toBeInTheDocument();

    const foodIcon = screen.getByTestId('food-bottom-btn');
    expect(foodIcon).toBeInTheDocument();
  });

  test.only('Ao clicar nos ícones, é renderizado a suas devidas rotas', () => {
    // render(
    //   <Router history={ history }>
    //     <App />
    //   </Router>,
    // );
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    expect(history.location.pathname).toBe('/foods');

    const iconDrink = screen.getByTestId('drinks-bottom-btn');
    expect(iconDrink).toBeInTheDocument();

    userEvent.click(drinkIcon);
    expect(history.location.pathname).toBe('drinks');
    history.goBack();

    const searchIcon = screen.getByTestId('explore-bottom-btn');
    expect(searchIcon).toBeInTheDocument();

    userEvent.click(searchIcon);
    expect(history.location.pathname).toBe('explore');
    history.goBack();

    const foodIcon = screen.getByTestId('food-bottom-btn');

    userEvent.click(foodIcon);
    expect(history.location.pathname).toBe('foods');
  });
});
