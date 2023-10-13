import axios from 'axios';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../api/productService';

jest.mock('axios');

describe('Product API Functions', () => {
  const mockProductData = {
    id: '1',
    name: 'Test Product',
    description: 'A test product',
  };

  it('fetches products from the API', async () => {
    const mockResponseData = [mockProductData];

    axios.get.mockResolvedValue({ data: mockResponseData });

    const products = await getProducts();

    expect(products).toEqual(mockResponseData);
  });

  it('creates a new product via the API', async () => {
    axios.post.mockResolvedValue({ data: mockProductData });

    const createdProduct = await createProduct(mockProductData);

    expect(createdProduct).toEqual(mockProductData);
  });

  it('updates an existing product via the API', async () => {
    axios.put.mockResolvedValue({ data: mockProductData });

    const updatedProduct = await updateProduct(mockProductData.id, mockProductData);

    expect(updatedProduct).toEqual(mockProductData);
  });

  it('deletes a product via the API', async () => {
    axios.delete.mockResolvedValue({}); // No data is returned for delete requests

    await deleteProduct(mockProductData.id);

    expect(axios.delete).toHaveBeenCalledWith(`/products?id=${mockProductData.id}`);
  });
});
