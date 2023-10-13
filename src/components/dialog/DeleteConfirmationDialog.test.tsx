import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

const onCloseMock = jest.fn();
const onConfirmMock = jest.fn();

const sampleProduct = {
    id: "id1",
    name: "Test1",
    description: "descrrrrrrrr",
    logo: "logo",
    date_release: "2023-10-04T00:00:00.000+00:00",
    date_revision: "2024-10-04T00:00:00.000+00:00"
};

test('renders the confirmation dialog with product name', () => {
  render(
    <DeleteConfirmationDialog
      isOpen={true}
      onClose={onCloseMock}
      onConfirm={onConfirmMock}
      product={sampleProduct}
    />
  );

  // Check if the component renders with the product name
  expect(screen.getByText(`¿Estas seguro de eliminar el producto ? ${sampleProduct.name}`)).toBeInTheDocument();
});

test('calls onConfirm and onClose when Confirm button is clicked', () => {
  render(
    <DeleteConfirmationDialog
      isOpen={true}
      onClose={onCloseMock}
      onConfirm={onConfirmMock}
      product={sampleProduct}
    />
  );

  // Find and click the Confirm button
  const confirmButton = screen.getByText('Confirmar');
  fireEvent.click(confirmButton);

  // Check if onConfirm and onClose were called
  expect(onConfirmMock).toHaveBeenCalledTimes(1);
});
