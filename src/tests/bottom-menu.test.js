import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import Meals from '../pages/Meals';

describe.only('Verifica componente Bottom Menu', () => {
  const history = createMemoryHistory();

  test('Se existe os ícones de bebida, pesquisa e comida', () => {
    render(<Meals />);

    const iconDrink = screen.getByTestId('drinks-bottom-btn');
    expect(iconDrink).toBeInTheDocument();

    const searchIcon = screen.getByTestId('explore-bottom-btn');
    expect(searchIcon).toBeInTheDocument();

    const foodIcon = screen.getByTestId('food-bottom-btn');
    expect(foodIcon).toBeInTheDocument();
  });

  test.only('Ao clicar nos ícones, é renderizado a suas devidas rotas', () => {
    render(
      <MemoryRouter>
        <Meals />
      </MemoryRouter>,
    );

    const btnIcons = screen.getAllByRole('button');
    const drinkIcon = btnIcons[2];

    console.log(history.location.pathname);
    userEvent.click(drinkIcon);
    console.log(history.location.pathname);
  });
});
