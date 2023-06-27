import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

test('Se a página contém as informações sobre a Pokédex', () => {
  renderWithRouter(<About />, { route: '/about' });
  const pokedexInfo = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
  const pokedexInfo2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
  expect(pokedexInfo).toBeInTheDocument();
  expect(pokedexInfo2).toBeInTheDocument();
});

test('Se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<About />, { route: '/about' });
  const heading = screen.getByRole('heading', { name: 'About Pokédex' });
  expect(heading).toBeInTheDocument();
});

test('Se a página contém a seguinte imagem de uma Pokédex', () => {
  renderWithRouter(<About />, { route: '/about' });
  const image = screen.getByAltText('Pokédex');
  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
