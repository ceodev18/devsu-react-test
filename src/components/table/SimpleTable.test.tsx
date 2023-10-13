import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SimpleTable from './SimpleTable';
import * as ProductService from '../../api/productService'; // Import your API methods

describe('SimpleTable', () => {
  const mockProducts: Product[] = [
    // Replace with your mock product data
    // Example: { id: 1, name: 'Product 1', description: 'Description 1', date_release: '2022-01-01', date_revision: '2022-02-01' },
  ];

  beforeEach(() => {
    // Mock your API calls or data fetching functions
    jest.spyOn(ProductService, 'getProducts').mockResolvedValue(mockProducts);
  });

  test('renders table headers', async () => {
    render(<SimpleTable />);
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(6); // Modify the count based on your columns
  });

  test('renders product data', async () => {
    render(<SimpleTable />);
    const products = await screen.findAllByRole('row');
    expect(products).toHaveLength(mockProducts.length);
  });

  test('opens the delete confirmation dialog', async () => {
    render(<SimpleTable />);
    const deleteButtons = await screen.findAllByText('Delete');
    
    if (deleteButtons.length > 0) {
      const firstDeleteButton = deleteButtons[0];
      fireEvent.click(firstDeleteButton);

      // Assert that the delete confirmation dialog is visible
      const confirmationDialog = screen.getByText('¿Estas seguro de eliminar el producto ?');
      expect(confirmationDialog).toBeInTheDocument();
    } else {
      // Handle the case where no delete buttons are found.
    }
  });

  test('closes the delete confirmation dialog when canceled', async () => {
    render(<SimpleTable />);
    const deleteButtons = await screen.findAllByText('Delete');
    
    if (deleteButtons.length > 0) {
      const firstDeleteButton = deleteButtons[0];
      fireEvent.click(firstDeleteButton);

      // Assert that the delete confirmation dialog is visible
      let confirmationDialog:any = screen.getByText('¿Estas seguro de eliminar el producto ?');
      expect(confirmationDialog).toBeInTheDocument();

      // Click the cancel button
      const cancelButton = screen.getByText('Cancelar');
      fireEvent.click(cancelButton);

      // Assert that the delete confirmation dialog is no longer visible
      confirmationDialog = screen.queryByText('¿Estas seguro de eliminar el producto ?');
      expect(confirmationDialog).toBeNull();
    } else {
      // Handle the case where no delete buttons are found.
    }
  });

  // Add more tests for other functionality as needed

  // Don't forget to clean up any mocking you've done.
  afterEach(() => {
    jest.restoreAllMocks();
  });
});
