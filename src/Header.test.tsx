import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  const mockOnSearch = jest.fn();
  const mockOnAddClick = jest.fn();

  beforeEach(() => {
    render(<Header onSearch={mockOnSearch} onAddClick={mockOnAddClick} />);
  });

  test('renders the search input', () => {
    const searchInput = screen.getByPlaceholderText('Search...');
    expect(searchInput).toBeInTheDocument();
  });

  test('handles search input change', () => {
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Test Query' } });
    expect(searchInput).toHaveValue('Test Query');
  });

  test('calls onSearch when search input changes', () => {
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Test Query' } });
    expect(mockOnSearch).toHaveBeenCalledWith('Test Query');
  });

  test('renders the "Agregar" button', () => {
    const addButton = screen.getByText('Agregar');
    expect(addButton).toBeInTheDocument();
  });

  test('calls onAddClick when "Agregar" button is clicked', () => {
    const addButton = screen.getByText('Agregar');
    fireEvent.click(addButton);
    expect(mockOnAddClick).toHaveBeenCalled();
  });
});
