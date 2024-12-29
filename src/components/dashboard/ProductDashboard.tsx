'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductGrid from './ProductGrid';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { Product } from '@/types';
import { fetchProducts, searchProducts } from '@/lib/api';
import ProductModal, { ProductForm } from './ProductModal';

const ProductDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';
  const ITEMS_PER_PAGE = 9;

  const loadProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      const response = searchQuery
        ? await searchProducts(searchQuery, skip, ITEMS_PER_PAGE)
        : await fetchProducts(skip, ITEMS_PER_PAGE);

      setProducts(response.products);
      setTotalProducts(response.total);
    } catch (err) {
      setError('Failed to load products');
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleSearch = (query: string) => {
    router.push(`/dashboard?search=${query}&page=1`);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`/dashboard?${params.toString()}`);
  };

  const handleAddProduct = (product: ProductForm) => {
    // add new product
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (product: Product) => {
    // delete product
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600">{error}</p>
        <button
          onClick={loadProducts}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md"
          onClick={() => setIsModalOpen(true)}
        >
          Add Product
        </button>
      </div>
      <ProductGrid
        products={products}
        isLoading={isLoading}
        handleEditProduct={handleEditProduct}
        handleDeleteProduct={handleDeleteProduct}
      />
      <Pagination
        currentPage={currentPage}
        totalItems={totalProducts}
        itemsPerPage={ITEMS_PER_PAGE}
        onPageChange={handlePageChange}
      />
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleAddProduct}
      />
    </div>
  );
};

export default ProductDashboard;
