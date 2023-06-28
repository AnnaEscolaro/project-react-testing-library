import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('É exibida na tela a mensagem No favorite pokemon found caso a pessoa não tenha Pokémon favorito', () => {
  renderWithRouter(<App />, { route: '/favorites' });
  const noFavText = screen.getByText('No favorite Pokémon found');
  expect(noFavText).toBeInTheDocument();
});

test('Apenas são exibidos os Pokémon favoritados', async () => {
  renderWithRouter(<App />, { route: '/pokemon/25' });
  const favoriteBox = screen.getByText('Pokémon favoritado?');
  await userEvent.click(favoriteBox);
  const favoritePage = screen.getByRole('link', { name: 'Favorite Pokémon' });
  await userEvent.click(favoritePage);
  const pokemonName = screen.getByRole('img', { name: 'Pikachu sprite' });
  expect(pokemonName).toBeInTheDocument();
});
