'use client';

import ProductCard from './ProductCard';
import { Product } from '@/types';

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  handleEditProduct: (product: Product) => void;
  handleDeleteProduct: (product: Product) => void;
}

export default function ProductGrid({
  products,
  isLoading,
  handleEditProduct,
  handleDeleteProduct,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(9)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 animate-pulse h-64"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onEdit={handleEditProduct}
            onDelete={handleDeleteProduct}
          />
        ))}
      </div>
    </>
  );
}
