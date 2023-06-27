import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('O primeiro link deve ter o texto Home', () => {
  renderWithRouter(<App />, { route: '/' });
  const homeLink = screen.getByText('Home');
  expect(homeLink).toBeInTheDocument();
});

test('O segundo link deve ter o texto About', () => {
  renderWithRouter(<App />, { route: '/' });
  const aboutLink = screen.getByText('About');
  expect(aboutLink).toBeInTheDocument();
});

test('O terceiro link deve ter o texto', () => {
  renderWithRouter(<App />, { route: '/' });
  const favoriteLink = screen.getByText('Favorite Pokémon');
  expect(favoriteLink).toBeInTheDocument();
});

test('Aplicação é redirecionada para a página inicial, na URL /, ao clicar no link Home', async () => {
  renderWithRouter(<App />, { route: '/' });
  const homeLink = screen.getByRole('link', { name: /Home/i });
  await userEvent.click(homeLink);
  expect(homeLink).toBeInTheDocument();
});

test('Aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About', async () => {
  renderWithRouter(<App />, { route: '/' });
  const aboutLink = screen.getByRole('link', { name: /About/i });
  await userEvent.click(aboutLink);
  expect(aboutLink).toBeInTheDocument();
});

test('Aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon', async () => {
  renderWithRouter(<App />, { route: '/' });
  const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémon' });
  await userEvent.click(favoriteLink);
  expect(favoriteLink).toBeInTheDocument();
});

test('Aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
  renderWithRouter(<App />, { route: '/test' });
  const notFoundMessage = screen.getByText('Page requested not found');
  expect(notFoundMessage).toBeInTheDocument();
});
