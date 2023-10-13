import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import DropdownMenu from './DropdownMenu';

test('renders the DropdownMenu component with closed menu', () => {
  render(
    <DropdownMenu
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );

  // Ensure the menu is closed
  const dropdown = screen.getByTestId('dropdown-menu');
  expect(dropdown).toHaveClass('dropdown');

  // Ensure the edit and delete options are not visible
  expect(screen.queryByText('Edit')).toBeNull();
  expect(screen.queryByText('Delete')).toBeNull();
});

test('toggles the DropdownMenu menu when clicked', () => {
  render(
    <DropdownMenu
      onEdit={() => {}}
      onDelete={() => {}}
    />
  );

  // Ensure the menu starts closed
  const dropdown = screen.getByTestId('dropdown-menu');
  expect(dropdown).toHaveClass('dropdown');

  // Click to open the menu
  fireEvent.click(dropdown);

  // Ensure the menu is open
  expect(dropdown).toHaveClass('dropdown open');

  // Click to close the menu
  fireEvent.click(dropdown);

  // Ensure the menu is closed again
  expect(dropdown).toHaveClass('dropdown');
});

test('calls the onEdit function when Edit is clicked', () => {
  const mockEdit = jest.fn();

  render(
    <DropdownMenu
      onEdit={mockEdit}
      onDelete={() => {}}
    />
  );

  const dropdown = screen.getByTestId('dropdown-menu');
  fireEvent.click(dropdown);

  const editOption = screen.getByText('Edit');
  fireEvent.click(editOption);

  // Ensure the onEdit function was called
  expect(mockEdit).toHaveBeenCalled();
});

test('calls the onDelete function when Delete is clicked', () => {
  const mockDelete = jest.fn();

  render(
    <DropdownMenu
      onEdit={() => {}}
      onDelete={mockDelete}
    />
  );

  const dropdown = screen.getByTestId('dropdown-menu');
  fireEvent.click(dropdown);

  const deleteOption = screen.getByText('Delete');
  fireEvent.click(deleteOption);

  // Ensure the onDelete function was called
  expect(mockDelete).toHaveBeenCalled();
});
