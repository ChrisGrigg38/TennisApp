import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders UI', () => {
  render(<App />);
  const textElement = screen.getAllByTestId("dataQuery");
  expect(textElement[0]).toBeInTheDocument();
});
