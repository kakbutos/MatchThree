import App from '.';
import { render, screen } from '@testing-library/react';

const appContent = 'Вот тут будет жить ваше приложение :)';

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
);

test.skip('Example test', async () => {
  render(<App />);
  expect(screen.getByText(appContent)).toBeDefined();
});
