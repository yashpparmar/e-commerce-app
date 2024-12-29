import { Product } from '@/types';

const API_URL = 'https://dummyjson.com';

export async function fetchProducts(skip: number = 0, limit: number = 9) {
  const response = await fetch(
    `${API_URL}/products?skip=${skip}&limit=${limit}`
  );
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
}

export async function searchProducts(
  query: string,
  skip: number = 0,
  limit: number = 9
) {
  const response = await fetch(
    `${API_URL}/products/search?q=${query}&skip=${skip}&limit=${limit}`
  );
  if (!response.ok) throw new Error('Failed to search products');
  return response.json();
}

export async function updateProduct(id: number, data: Partial<Product>) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
}

export async function deleteProduct(id: number) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete product');
  return response.json();
}
