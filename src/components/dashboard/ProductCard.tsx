'use client';

import Image from 'next/image';
import { useState } from 'react';
import { deleteProduct } from '@/lib/api';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = async () => {
    onEdit(product);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setIsDeleting(true);
      try {
        await deleteProduct(product.id);
        onDelete(product);
      } catch (error) {
        alert('Failed to delete product');
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{product.title}</h3>
        <p className="mt-1 text-gray-600">${product.price}</p>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleEdit}
            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-3 py-1 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
