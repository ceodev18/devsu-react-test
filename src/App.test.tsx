import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import App from './App';

test('renders the Navbar', () => {
  render(
    <Router>
      <App />
    </Router>
  );

  // Check if the Navbar is rendered
  const navbarElement = screen.getByText(/Navbar Title/); // Replace with your Navbar title
  expect(navbarElement).toBeInTheDocument();
});

test('navigates to SimpleTable when the root path is visited', () => {
  render(
    <Router >
      <App />
    </Router>
  );

  // Check if the SimpleTable component is rendered
  const simpleTableElement = screen.getByText(/SimpleTable Component/); // Replace with text from your SimpleTable
  expect(simpleTableElement).toBeInTheDocument();
});
