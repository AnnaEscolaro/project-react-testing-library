import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

test('Se a página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<App />, { route: '/NotFound' });
  const h2 = screen.getByText('Page requested not found');
  expect(h2).toBeInTheDocument();
});

test('Se a página mostra a imagem', () => {
  renderWithRouter(<App />, { route: '/NotFound' });
  const image = screen.getByAltText('Pikachu crying because the page requested was not found');
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
