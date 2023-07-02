import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Teste se a página contém um heading h2', () => {
  renderWithRouter(<App />, { route: '/' });
  const header = screen.getByText('Encountered Pokémon');
  expect(header).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', async () => {
  renderWithRouter(<App />, { route: '/' });
  const button = screen.getByRole('button', { name: 'Próximo Pokémon' });
  expect(button).toBeInTheDocument();
  await userEvent.click(button);
  const nextPokemon = screen.getByText('Charmander');
  await userEvent.click(button);
  expect(nextPokemon).toBeInTheDocument();
  const nextPokemon2 = screen.getByText('Caterpie');
  expect(nextPokemon2).toBeInTheDocument();
  await userEvent.click(button);
  const nextPokemon3 = screen.getByText('Ekans');
  expect(nextPokemon3).toBeInTheDocument();
  await userEvent.click(button);
  const nextPokemon4 = screen.getByText('Alakazam');
  expect(nextPokemon4).toBeInTheDocument();
  await userEvent.click(button);
  const nextPokemon5 = screen.getByText('Mew');
  expect(nextPokemon5).toBeInTheDocument();
  await userEvent.click(button);
  const nextPokemon6 = screen.getByText('Rapidash');
  expect(nextPokemon6).toBeInTheDocument();
  await userEvent.click(button);
  const nextPokemon7 = screen.getByText('Snorlax');
  expect(nextPokemon7).toBeInTheDocument();
  await userEvent.click(button);
  const nextPokemon8 = screen.getByText('Dragonair');
  expect(nextPokemon8).toBeInTheDocument();
  await userEvent.click(button);
  const nextPokemon9 = screen.getByText('Pikachu');
  expect(nextPokemon9).toBeInTheDocument();
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />, { route: '/' });
  const link = screen.getAllByText('More details');
  expect(link).toHaveLength(1);
});

test('Teste se a Pokédex tem os botões de filtro', async () => {
  renderWithRouter(<App />, { route: '/' });
  const buttons = screen.getAllByTestId('pokemon-type-button');
  expect(buttons).toHaveLength(7);
  const button1 = screen.getByRole('button', { name: 'All' });
  expect(button1).toBeInTheDocument();
  const button2 = screen.getByRole('button', { name: 'Electric' });
  expect(button2).toBeInTheDocument();
  const button3 = screen.getByRole('button', { name: 'Fire' });
  expect(button3).toBeInTheDocument();
  const button4 = screen.getByRole('button', { name: 'Bug' });
  expect(button4).toBeInTheDocument();
  const button5 = screen.getByRole('button', { name: 'Poison' });
  expect(button5).toBeInTheDocument();
  const button6 = screen.getByRole('button', { name: 'Psychic' });
  expect(button6).toBeInTheDocument();
  const button7 = screen.getByRole('button', { name: 'Normal' });
  expect(button7).toBeInTheDocument();
  const button8 = screen.getByRole('button', { name: 'Dragon' });
  expect(button8).toBeInTheDocument();
  await userEvent.click(button3);
  const charmander = screen.getByText('Charmander');
  const pokemonType = screen.getAllByText('Fire');
  expect(charmander).toBeInTheDocument();
  expect(pokemonType).toHaveLength(2);
  expect(button1).toBeInTheDocument();
});

test('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
  renderWithRouter(<App />, { route: '/' });
  const buttonAll = screen.getByRole('button', { name: 'All' });
  const buttonNext = screen.getByRole('button', { name: 'Próximo Pokémon' });
  const pikachu = screen.getByText('Pikachu');
  expect(pikachu).toBeInTheDocument();
  const buttonBug = screen.getByRole('button', { name: 'Bug' });
  expect(buttonAll).toBeInTheDocument();
  expect(buttonNext).not.toBeDisabled();
  await userEvent.click(buttonBug);
  const caterpie = screen.getByText('Caterpie');
  expect(buttonNext).toBeDisabled();
  expect(caterpie).toBeInTheDocument();
  await userEvent.click(buttonAll);
  const pikachu2 = screen.getByText('Pikachu');
  expect(buttonNext).not.toBeDisabled();
  expect(pikachu2).toBeInTheDocument();
});
