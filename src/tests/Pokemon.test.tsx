import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Se é renderizado um card com as informações de determinado Pokémon', async () => {
  renderWithRouter(<App />, { route: '/' });
  const bugButton = screen.getByRole('button', { name: 'Bug' });
  await userEvent.click(bugButton);
  const caterpieName = screen.getByText('Caterpie');
  const caterpieType = screen.getAllByText('Bug');
  const caterpieWeight = screen.getByText('Average weight: 2.9 kg');
  const caterpieImage = screen.getByAltText('Caterpie sprite');
  expect(caterpieName).toBeInTheDocument();
  expect(caterpieType).toHaveLength(2);
  expect(caterpieType[0]).toBeInTheDocument();
  expect(caterpieWeight).toBeInTheDocument();
  expect(caterpieImage).toBeInTheDocument();
  expect(caterpieImage).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/8/83/Spr_5b_010.png');
});

test('Se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes', async () => {
  renderWithRouter(<App />, { route: '/' });
  const link = screen.getByText('More details');
  expect(link).toHaveAttribute('href', '/pokemon/25');
  await userEvent.click(link);
  const title = screen.getByText('Pikachu Details');
  const gameLocations = screen.getByText('Game Locations of Pikachu');
  expect(title).toBeInTheDocument();
  expect(gameLocations).toBeInTheDocument();
});

test('Se a URL exibida no navegador muda para /pokemon/<id>', async () => {
  renderWithRouter(<App />, { route: '/' });
  const link = screen.getByText('More details');
  await userEvent.click(link);
  const url = window.location.href.split('/');
  expect(`${url[3]}/${url[4]}`).toBe('pokemon/25');
});

test('Se existe um ícone de estrela nos Pokémon favoritados', async () => {
  renderWithRouter(<App />, { route: '/pokemon/25' });
  const isFavorite = screen.getByLabelText('Pokémon favoritado?');
  await userEvent.click(isFavorite);
  const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
  expect(favoritePokemon).toBeInTheDocument();
  expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
});
