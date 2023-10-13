import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Form from './Form';

test('renders Form component in create mode', () => {
  render(<Form mode="create" />);

  // You can add test assertions here using screen.getByText, screen.getByLabelText, etc.
  // For example:
  expect(screen.getByText('Crear Nuevo Elemento')).toBeInTheDocument();
  expect(screen.getByLabelText('ID')).toBeInTheDocument();
  expect(screen.getByLabelText('Nombres')).toBeInTheDocument();
  // Add more assertions as needed.
});

test('renders Form component in edit mode', () => {
  render(<Form mode="edit" />);

  // Add test assertions for the edit mode component.
});

test('handles form submission in create mode', () => {
  // Create a mock function for useNavigate
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  render(<Form mode="create" />);

  // Mock form input values
  const idInput = screen.getByLabelText('ID');
  const nameInput = screen.getByLabelText('Nombres');
  // Mock more inputs if needed

  fireEvent.change(idInput, { target: { value: '123' } });
  fireEvent.change(nameInput, { target: { value: 'Product Name' } });
  // Simulate changes in other input fields

  // Mock form submission
  const submitButton = screen.getByText('Crear');
  fireEvent.click(submitButton);

  // Verify that the navigate function is called after form submission
  expect(mockNavigate).toHaveBeenCalledWith('/');
});

test('handles form submission in edit mode', () => {
  // Create a mock function for useNavigate
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  // Mock initial form data (simulate an edit scenario)
  const initialData = {
    id: '123',
    name: 'Product Name',
    // Add more fields if needed
  };

  render(<Form mode="edit" />);

  // Set the initial form data for the edit mode
  const idInput = screen.getByLabelText('ID');
  const nameInput = screen.getByLabelText('Nombres');
  // Set initial values for other input fields

  fireEvent.change(idInput, { target: { value: initialData.id } });
  fireEvent.change(nameInput, { target: { value: initialData.name } });
  // Set initial values for other input fields

  // Mock form submission
  const submitButton = screen.getByText('Guardar Cambios');
  fireEvent.click(submitButton);

  // Verify that the navigate function is called after form submission
  expect(mockNavigate).toHaveBeenCalledWith('/');
});

test('resets the form in create mode', () => {
  render(<Form mode="create" />);

  // Mock form input values
  const idInput = screen.getByLabelText('ID');
  const nameInput = screen.getByLabelText('Nombres');
  // Mock more inputs if needed

  fireEvent.change(idInput, { target: { value: '123' } });
  fireEvent.change(nameInput, { target: { value: 'Product Name' } });
  // Simulate changes in other input fields

  // Mock form reset
  const resetButton = screen.getByText('Reiniciar');
  fireEvent.click(resetButton);

  // Verify that form fields are reset to their initial state
  expect(idInput).toHaveValue('');
  expect(nameInput).toHaveValue('');
  // Verify other fields as well
});

test('handles form input and submission in create mode', () => {
  // Create a mock function for useNavigate
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  render(<Form mode="create" />);

  // Mock form input values
  const idInput = screen.getByLabelText('ID');
  const nameInput = screen.getByLabelText('Nombres');
  // Mock more inputs if needed

  fireEvent.change(idInput, { target: { value: '123' } });
  fireEvent.change(nameInput, { target: { value: 'Product Name' } });
  // Simulate changes in other input fields

  // Mock form submission
  const submitButton = screen.getByText('Crear');
  fireEvent.click(submitButton);

  // Verify that the navigate function is called after form submission
  expect(mockNavigate).toHaveBeenCalledWith('/');

});


