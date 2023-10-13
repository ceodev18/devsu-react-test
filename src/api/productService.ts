import axios from 'axios';
import { Product } from '../models/Product';

const BASE_URL = 'https://tribu-ti-staffing-desarrollo-afangwbmcrhucqfh.z01.azurefd.net/ipf-msa-productosfinancieros/bp';


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'authorId': '1',
  },
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get<Product[]>('/products');
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching products: ${error}`);
  }
};

export const createProduct = async (productData: Product): Promise<Product> => {
  try {
    const response = await api.post<Product>('/products', productData);
    return response.data;
  } catch (error) {
    throw new Error(`Error creating product: ${error}`);
  }
};

export const updateProduct = async (productId: string, productData: Product): Promise<Product> => {
  try {
    console.log(productData);
    const response = await api.put<Product>('/products', productData);
    return response.data;
  } catch (error) {
    throw new Error(`Error updating product: ${error}`);
  }
};

export const deleteProduct = async (productId: string): Promise<void> => {
  try {
    await api.delete(`/products?id=${productId}`);
  } catch (error) {
    throw new Error(`Error deleting product: ${error}`);
  }
};
