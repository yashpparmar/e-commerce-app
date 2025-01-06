'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductModal, { ProductForm } from './ProductModal';
import ProductGrid from './ProductGrid';
import SearchBar from './SearchBar';
import Pagination from './Pagination';
import { Product } from '@/types';
import { RootState } from '@/store';
import {
  updateProduct as updateProductAction,
  addProduct as addNewProduct,
  removeProduct,
  setProduct,
} from '@/store/slices/productSlice';
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  searchProducts,
  updateProduct,
} from '@/lib/api';

const ProductDashboard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const totalProducts = useSelector((state: RootState) => state.product.total);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentPage = Number(searchParams.get('page')) || 1;
  const searchQuery = searchParams.get('search') || '';
  const ITEMS_PER_PAGE = 9;

  const loadProducts = useCallback(async () => {
    try {
      const skip = (currentPage - 1) * ITEMS_PER_PAGE;
      setIsLoading(true);
      setError('');
      const response = searchQuery
        ? await searchProducts(searchQuery, skip, ITEMS_PER_PAGE)
        : await fetchProducts(skip, ITEMS_PER_PAGE);

      dispatch(setProduct(response));
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

  const handleAddAndUpdateProduct = async (product: ProductForm) => {
    try {
      setIsLoading(true);
      let response: Product;
      if (selectedProduct && selectedProduct.id !== undefined) {
        response = await updateProduct(selectedProduct.id, product);
        dispatch(updateProductAction(response));
      } else {
        response = await addProduct(product);
        dispatch(addNewProduct(response));
      }
    } catch (err) {
      setError('Failed to add or update product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (product: Product) => {
    try {
      setIsLoading(true);
      if (product?.id !== undefined) {
        const response = await deleteProduct(product.id);
        if (response.isDeleted) {
          dispatch(removeProduct(response.id));
        }
      }
    } catch (err) {
      setError('Failed to delete product');
    } finally {
      setIsLoading(false);
    }
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
    <>
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
      </div>
      <ProductModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleAddAndUpdateProduct}
      />
    </>
  );
};

export default ProductDashboard;
