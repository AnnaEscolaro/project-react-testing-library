import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pikachuRoute = '/pokemon/25';

test('Se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  renderWithRouter(<App />, { route: pikachuRoute });
  const title = screen.getByText('Pikachu Details');
  const summary = screen.getByText('Summary');
  const description = screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');
  expect(title).toBeInTheDocument();
  expect(summary).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

test('Se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
  renderWithRouter(<App />, { route: pikachuRoute });
  const locationTitle = screen.getByText('Game Locations of Pikachu');
  const location1 = screen.getByText('Kanto Viridian Forest');
  const location2 = screen.getByText('Kanto Power Plant');
  const imgLocations = screen.getAllByAltText('Pikachu location');
  expect(locationTitle).toBeInTheDocument();
  expect(location1).toBeInTheDocument();
  expect(location2).toBeInTheDocument();
  expect(imgLocations[0]).toBeInTheDocument();
  expect(imgLocations[1]).toBeInTheDocument();
  expect(imgLocations[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
  expect(imgLocations[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test('Se o usuário pode favoritar um Pokémon por meio da página de detalhes', async () => {
  renderWithRouter(<App />, { route: pikachuRoute });
  const isFavorite = screen.getByLabelText('Pokémon favoritado?');
  await userEvent.click(isFavorite);
  const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
  expect(favoritePokemon).toBeInTheDocument();
  expect(favoritePokemon).toHaveAttribute('src', '/star-icon.svg');
});
