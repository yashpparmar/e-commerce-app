// 'use client';

// import { useState, useEffect, useCallback } from 'react';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/store';
// import ProductGrid from './ProductGrid';
// import SearchBar from './SearchBar';
// import Pagination from './Pagination';
// // import AddProductModal from './AddProductModal';
// import { Product } from '@/types';

// const Dashboard = () => {
//   const user = useSelector((state: RootState) => state.auth.user);
//   const [products, setProducts] = useState<Product[]>([]);
//   const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const ITEMS_PER_PAGE = 9;

//   const fetchProducts = useCallback(async () => {
//     try {
//       const response = await fetch('https://dummyjson.com/products');
//       const data = await response.json();
//       setProducts(data.products);
//       setFilteredProducts(data.products);
//     } catch (err) {
//       setError('Failed to fetch products');
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   const handleSearch = useCallback(
//     (query: string) => {
//       setSearchQuery(query);
//       const filtered = products.filter((product) =>
//         product.title.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredProducts(filtered);
//       setCurrentPage(1);
//     },
//     [products]
//   );

//   const handleAddProduct = async (newProduct: Omit<Product, 'id'>) => {
//     try {
//       const response = await fetch('https://dummyjson.com/products/add', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(newProduct),
//       });
//       const data = await response.json();
//       setProducts((prev) => [...prev, data]);
//       setFilteredProducts((prev) => [...prev, data]);
//       setIsAddModalOpen(false);
//     } catch (err) {
//       setError('Failed to add product');
//     }
//   };

//   const handleDeleteProduct = async (productId: number) => {
//     try {
//       await fetch(`https://dummyjson.com/products/${productId}`, {
//         method: 'DELETE',
//       });
//       setProducts((prev) => prev.filter((p) => p.id !== productId));
//       setFilteredProducts((prev) => prev.filter((p) => p.id !== productId));
//     } catch (err) {
//       setError('Failed to delete product');
//     }
//   };

//   const handleUpdateProduct = async (updatedProduct: Product) => {
//     try {
//       const response = await fetch(
//         `https://dummyjson.com/products/${updatedProduct.id}`,
//         {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(updatedProduct),
//         }
//       );
//       const data = await response.json();

//       setProducts((prev) =>
//         prev.map((p) => (p.id === updatedProduct.id ? data : p))
//       );
//       setFilteredProducts((prev) =>
//         prev.map((p) => (p.id === updatedProduct.id ? data : p))
//       );
//     } catch (err) {
//       setError('Failed to update product');
//     }
//   };

//   const paginatedProducts = filteredProducts.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow">
//         <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
//               <p className="mt-1 text-sm text-gray-500">
//                 Welcome back, {user?.fullName}
//               </p>
//             </div>
//             <button
//               onClick={() => setIsAddModalOpen(true)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
//             >
//               Add Product
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         {error && (
//           <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
//             {error}
//           </div>
//         )}

//         <div className="mb-6">
//           <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
//         </div>

//         {isLoading ? (
//           <div className="flex justify-center items-center h-64">
//             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
//           </div>
//         ) : (
//           <>
//             <ProductGrid
//               products={paginatedProducts}
//               onDelete={handleDeleteProduct}
//               onUpdate={handleUpdateProduct}
//             />

//             <div className="mt-6">
//               <Pagination
//                 currentPage={currentPage}
//                 totalItems={filteredProducts.length}
//                 itemsPerPage={ITEMS_PER_PAGE}
//                 onPageChange={setCurrentPage}
//               />
//             </div>
//           </>
//         )}

//         {/* <AddProductModal
//           isOpen={isAddModalOpen}
//           onClose={() => setIsAddModalOpen(false)}
//           onAdd={handleAddProduct}
//         /> */}
//       </main>
//     </div>
//   );
// };

// export default Dashboard;
