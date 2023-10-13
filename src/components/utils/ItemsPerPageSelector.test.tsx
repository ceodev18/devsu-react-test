import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ItemsPerPageSelector from './ItemsPerPageSelector';

test('renders ItemsPerPageSelector with default options', () => {
  const itemsPerPage = 10;
  const resultCount = 50;
  const handleChange = jest.fn();

  render(
    <ItemsPerPageSelector
      itemsPerPage={itemsPerPage}
      onChange={handleChange}
      resultCount={resultCount}
    />
  );

  // Ensure the select element and options are present
  const selectElement = screen.getByTestId('items-per-page-selector');
  expect(selectElement).toBeInTheDocument();

  // Ensure the select value matches the itemsPerPage prop
  expect(selectElement).toHaveValue(itemsPerPage.toString());

  // Ensure the result count is displayed
  const resultCountText = screen.getByText(`${resultCount} resultados`);
  expect(resultCountText).toBeInTheDocument();
});

test('calls the onChange function when a different option is selected', () => {
  const itemsPerPage = 10;
  const resultCount = 50;
  const handleChange = jest.fn();

  render(
    <ItemsPerPageSelector
      itemsPerPage={itemsPerPage}
      onChange={handleChange}
      resultCount={resultCount}
    />
  );

  // Ensure the select element and options are present
  const selectElement = screen.getByTestId('items-per-page-selector');

  // Simulate changing the select value
  const newItemsPerPage = 20;
  fireEvent.change(selectElement, { target: { value: newItemsPerPage.toString() } });

  // Ensure the onChange function was called with the new value
  expect(handleChange).toHaveBeenCalledWith(newItemsPerPage);
});
