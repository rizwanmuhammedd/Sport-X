



// import React, { useState, useEffect } from "react";
// import api from "../Api/Axios_Instance.jsx";

// const AdminProducts = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     price: '',
//     stock: '',
//     description: '',
//     image: null,
//     imageUrl: ''
//   });
//   const [imagePreview, setImagePreview] = useState('');
//   const [imageInputType, setImageInputType] = useState('url'); // 'url' or 'file'

//   const productsPerPage = 10;

//   // Fetch products data
//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // Auto-hide success message
//   useEffect(() => {
//     if (successMessage) {
//       const timer = setTimeout(() => setSuccessMessage(''), 3000);
//       return () => clearTimeout(timer);
//     }
//   }, [successMessage]);

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const response = await api.get("/products");
//       setProducts(response.data);
//       setError('');
//     } catch (err) {
//       setError("Failed to fetch products");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form data changes
//   const handleInputChange = (e) => {
//     const { name, value, type, files } = e.target;
//     if (type === 'file') {
//       const file = files[0];
//       setFormData(prev => ({ ...prev, image: file, imageUrl: '' }));
      
//       // Create image preview
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => setImagePreview(reader.result);
//         reader.readAsDataURL(file);
//       } else {
//         setImagePreview('');
//       }
//     } else if (name === 'imageUrl') {
//       setFormData(prev => ({ ...prev, imageUrl: value, image: null }));
//       // Set preview for URL
//       if (value.trim()) {
//         setImagePreview(value);
//       } else {
//         setImagePreview('');
//       }
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };

//   // Handle image input type toggle
//   const handleImageTypeChange = (type) => {
//     setImageInputType(type);
//     setFormData(prev => ({ ...prev, image: null, imageUrl: '' }));
//     setImagePreview('');
//   };

//   // Reset form
//   const resetForm = () => {
//     setFormData({
//       name: '',
//       category: '',
//       price: '',
//       stock: '',
//       description: '',
//       image: null,
//       imageUrl: ''
//     });
//     setImagePreview('');
//     setImageInputType('url');
//   };

//   // Handle modal operations
//   const openAddModal = () => {
//     resetForm();
//     setModalMode('add');
//     setShowModal(true);
//   };

//   const openEditModal = (product) => {
//     setSelectedProduct(product);
//     setFormData({
//       name: product.name || '',
//       category: product.category || '',
//       price: product.price || '',
//       stock: product.stock || '',
//       description: product.description || '',
//       image: null,
//       imageUrl: product.image || ''
//     });
//     setImagePreview(product.image || '');
//     setImageInputType('url'); // Default to URL for editing
//     setModalMode('edit');
//     setShowModal(true);
//   };

//   const openViewModal = (product) => {
//     setSelectedProduct(product);
//     setModalMode('view');
//     setShowModal(true);
//   };

//   // Handle product operations
//   const handleAddProduct = async (e) => {
//     e.preventDefault();
//     setActionLoading(true);
//     setError(''); // Clear previous errors
    
//     try {
//       // Validate required fields
//       if (!formData.name.trim()) {
//         setError('Product name is required');
//         return;
//       }
//       if (!formData.category.trim()) {
//         setError('Category is required');
//         return;
//       }
//       if (!formData.price || parseFloat(formData.price) < 0) {
//         setError('Valid price is required');
//         return;
//       }
//       if (!formData.stock || parseInt(formData.stock) < 0) {
//         setError('Valid stock quantity is required');
//         return;
//       }

//       console.log('=== ADDING PRODUCT ===');
//       console.log('Form data:', formData);

//       // Try the most basic approach first
//       const basicProductData = {
//         name: formData.name.trim(),
//         category: formData.category.trim(),
//         price: parseFloat(formData.price),
//         stock: parseInt(formData.stock),
//         description: formData.description.trim() || ''
//       };

//       // Add image data based on input type
//       if (imageInputType === 'url' && formData.imageUrl.trim()) {
//         basicProductData.image = formData.imageUrl.trim();
//       }

//       console.log('Sending basic product data:', basicProductData);
//       console.log('Has file to upload:', !!formData.image);

//       let response;
      
//       try {
//         // If we have a file upload, use FormData
//         if (formData.image) {
//           const formDataPayload = new FormData();
//           formDataPayload.append('name', basicProductData.name);
//           formDataPayload.append('category', basicProductData.category);
//           formDataPayload.append('price', basicProductData.price.toString());
//           formDataPayload.append('stock', basicProductData.stock.toString());
//           formDataPayload.append('description', basicProductData.description);
//           formDataPayload.append('image', formData.image);

//           response = await api.post('/products', formDataPayload);
//           console.log('✅ FormData POST successful:', response.data);
//         } else {
//           // Method 1: Simple POST with JSON (for URL or no image)
//           response = await api.post('/products', basicProductData);
//           console.log('✅ Basic POST successful:', response.data);
//         }
//       } catch (basicError) {
//         console.log('❌ Primary method failed:', basicError.response?.status, basicError.response?.data);
        
//         // Method 2: Try with explicit headers
//         try {
//           if (formData.image) {
//             const formDataPayload = new FormData();
//             formDataPayload.append('name', basicProductData.name);
//             formDataPayload.append('category', basicProductData.category);
//             formDataPayload.append('price', basicProductData.price.toString());
//             formDataPayload.append('stock', basicProductData.stock.toString());
//             formDataPayload.append('description', basicProductData.description);
//             formDataPayload.append('image', formData.image);

//             response = await api.post('/products', formDataPayload, {
//               headers: { 'Content-Type': 'multipart/form-data' }
//             });
//           } else {
//             response = await api.post('/products', basicProductData, {
//               headers: { 'Content-Type': 'application/json' }
//             });
//           }
//           console.log('✅ POST with headers successful:', response.data);
//         } catch (headerError) {
//           console.log('❌ POST with headers failed:', headerError.response?.status, headerError.response?.data);
//           throw headerError; // Re-throw the last error
//         }
//       }

//       // Handle successful response
//       if (response && response.data) {
//         console.log('✅ Product added successfully:', response.data);
        
//         // Add to local state
//         setProducts(prev => [...prev, response.data]);
        
//         // Close modal and show success
//         setShowModal(false);
//         setSuccessMessage('Product added successfully!');
//         resetForm();
//       } else {
//         throw new Error('No response data received');
//       }
      
//     } catch (error) {
//       console.log('=== ADD PRODUCT ERROR ===');
//       console.error('Full error:', error);
      
//       let errorMessage = 'Failed to add product';
      
//       if (error.response) {
//         console.log('Response error details:', {
//           status: error.response.status,
//           statusText: error.response.statusText,
//           data: error.response.data
//         });
        
//         // Extract meaningful error message
//         if (error.response.data) {
//           if (typeof error.response.data === 'string') {
//             errorMessage = error.response.data;
//           } else if (error.response.data.message) {
//             errorMessage = error.response.data.message;
//           } else if (error.response.data.error) {
//             errorMessage = error.response.data.error;
//           } else {
//             errorMessage = `Server error: ${error.response.status} ${error.response.statusText}`;
//           }
//         }
//       } else if (error.request) {
//         console.log('Network error - no response received');
//         errorMessage = 'Network error: Could not reach server';
//       } else {
//         console.log('Request setup error:', error.message);
//         errorMessage = error.message;
//       }
      
//       setError(`Add Product Failed: ${errorMessage}`);
      
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();
//     setActionLoading(true);
    
//     try {
//       console.log('Starting product update for ID:', selectedProduct.id);
//       console.log('Update data:', {
//         name: formData.name,
//         category: formData.category,
//         price: formData.price,
//         stock: formData.stock,
//         description: formData.description,
//         hasNewImage: !!formData.image
//       });

//       let response;
      
//       // Try different update approaches
//       if (formData.image) {
//         // Method 1: FormData with new image
//         const productData = new FormData();
//         productData.append('name', formData.name);
//         productData.append('category', formData.category);
//         productData.append('price', formData.price);
//         productData.append('stock', formData.stock);
//         productData.append('description', formData.description);
//         productData.append('image', formData.image);

//         console.log('Updating with FormData (new image)...');
        
//         // Try PATCH first, then PUT as fallback
//         try {
//           response = await api.patch(`/products/${selectedProduct.id}`, productData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//           });
//         } catch (patchError) {
//           console.log('PATCH failed, trying PUT...', patchError.response?.status);
//           response = await api.put(`/products/${selectedProduct.id}`, productData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//           });
//         }
//       } else {
//         // Method 2: JSON data without new image
//         const productData = {
//           name: formData.name,
//           category: formData.category,
//           price: parseFloat(formData.price) || 0,
//           stock: parseInt(formData.stock) || 0,
//           description: formData.description
//         };

//         console.log('Updating with JSON data:', productData);
        
//         // Try PATCH first, then PUT as fallback
//         try {
//           response = await api.patch(`/products/${selectedProduct.id}`, productData, {
//             headers: { 'Content-Type': 'application/json' }
//           });
//         } catch (patchError) {
//           console.log('PATCH failed, trying PUT...', patchError.response?.status);
//           response = await api.put(`/products/${selectedProduct.id}`, productData, {
//             headers: { 'Content-Type': 'application/json' }
//           });
//         }
//       }

//       console.log('Update product successful:', response.data);

//       // Update the products list
//       const updatedProduct = response.data;
//       setProducts(prev => prev.map(product => 
//         product.id === selectedProduct.id ? updatedProduct : product
//       ));
      
//       setShowModal(false);
//       setSuccessMessage('Product updated successfully');
//       resetForm();
      
//     } catch (error) {
//       console.error('Update product error:', error);
      
//       // Detailed error logging and handling
//       if (error.response) {
//         console.error('Response error:', {
//           status: error.response.status,
//           data: error.response.data,
//           headers: error.response.headers
//         });
        
//         const errorMessage = error.response.data?.message || 
//                            error.response.data?.error || 
//                            error.response.data || 
//                            `Server error (Status: ${error.response.status})`;
        
//         setError(`Failed to update product: ${errorMessage}`);
//       } else if (error.request) {
//         console.error('Request error:', error.request);
//         setError('Failed to update product: No response from server. Please check your connection.');
//       } else {
//         console.error('General error:', error.message);
//         setError(`Failed to update product: ${error.message}`);
//       }
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
//       setActionLoading(true);
//       try {
//         await api.delete(`/products/${productId}`);
//         setProducts(prev => prev.filter(product => product.id !== productId));
//         setSelectedProducts(prev => prev.filter(id => id !== productId));
//         setSuccessMessage('Product deleted successfully');
//       } catch (error) {
//         console.error('Failed to delete product:', error);
//         setError('Failed to delete product. Please try again.');
//       } finally {
//         setActionLoading(false);
//       }
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (selectedProducts.length === 0) return;
    
//     if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products? This action cannot be undone.`)) {
//       setActionLoading(true);
//       try {
//         await Promise.all(selectedProducts.map(id => api.delete(`/products/${id}`)));
//         setProducts(prev => prev.filter(product => !selectedProducts.includes(product.id)));
//         setSelectedProducts([]);
//         setSuccessMessage(`${selectedProducts.length} products deleted successfully`);
//       } catch (error) {
//         console.error('Failed to delete products:', error);
//         setError('Failed to delete products. Please try again.');
//       } finally {
//         setActionLoading(false);
//       }
//     }
//   };

//   // Handle sorting
//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   // Handle product selection
//   const handleSelectProduct = (productId) => {
//     setSelectedProducts(prev => 
//       prev.includes(productId) 
//         ? prev.filter(id => id !== productId)
//         : [...prev, productId]
//     );
//   };

//   const handleSelectAll = () => {
//     const currentProducts = getFilteredAndSortedProducts().slice(
//       (currentPage - 1) * productsPerPage,
//       currentPage * productsPerPage
//     );
    
//     setSelectedProducts(
//       selectedProducts.length === currentProducts.length 
//         ? [] 
//         : currentProducts.map(product => product.id)
//     );
//   };

//   // Filter and sort products
//   const getFilteredAndSortedProducts = () => {
//     let filtered = products.filter(product => {
//       if (!product) return false;
//       return (
//         (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//         (product.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//         (product.id?.toString() || '').includes(searchTerm)
//       );
//     });

//     if (sortConfig.key) {
//       filtered.sort((a, b) => {
//         const aValue = a[sortConfig.key] || '';
//         const bValue = b[sortConfig.key] || '';
        
//         if (aValue < bValue) {
//           return sortConfig.direction === 'asc' ? -1 : 1;
//         }
//         if (aValue > bValue) {
//           return sortConfig.direction === 'asc' ? 1 : -1;
//         }
//         return 0;
//       });
//     }

//     return filtered;
//   };

//   const getStockBadge = (stock) => {
//     const stockNum = parseInt(stock) || 0;
//     if (stockNum === 0) {
//       return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-red-900/50 text-red-400 border border-red-500/30">Out of Stock</span>;
//     } else if (stockNum < 10) {
//       return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-900/50 text-yellow-400 border border-yellow-500/30">Low Stock ({stockNum})</span>;
//     } else {
//       return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-400 border border-green-500/30">In Stock ({stockNum})</span>;
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gray-900">
//         <div className="flex flex-col items-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
//           <p className="mt-4 text-gray-400">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   const filteredProducts = getFilteredAndSortedProducts();
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

//   return (
//     <div className="min-h-screen bg-gray-900 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Success/Error Messages */}
//         {successMessage && (
//           <div className="mb-4 p-4 rounded-lg bg-green-900/50 border border-green-500/30 text-green-400">
//             {successMessage}
//           </div>
//         )}
//         {error && (
//           <div className="mb-4 p-4 rounded-lg bg-red-900/50 border border-red-500/30 text-red-400">
//             {error}
//           </div>
//         )}

//         {/* Header Section */}
//         <div className="mb-8">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-white">Products Management</h1>
//               <p className="mt-2 text-gray-400">Manage your product inventory</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="bg-gray-800 border border-gray-700 px-4 py-2 rounded-lg shadow-sm">
//                 <span className="text-sm text-gray-400">Total Products:</span>
//                 <span className="ml-2 text-lg font-semibold text-blue-400">{products.length}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Controls Section */}
//         <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm mb-6">
//           <div className="p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
//               {/* Search Bar */}
//               <div className="relative flex-1 max-w-md">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search products by name, category, or ID..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="block w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="flex items-center space-x-3">
//                 {selectedProducts.length > 0 && (
//                   <button
//                     onClick={handleBulkDelete}
//                     disabled={actionLoading}
//                     className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     Delete Selected ({selectedProducts.length})
//                   </button>
//                 )}
//                 <button
//                   onClick={openAddModal}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
//                 >
//                   Add New Product
//                 </button>
                
//                 {/* Debug Test Button */}
//                 <button
//                   onClick={async () => {
//                     console.log('Testing API connection...');
//                     try {
//                       const testResponse = await api.get('/products');
//                       console.log('✅ API connection working:', testResponse.status);
//                       setSuccessMessage('API connection test successful!');
//                     } catch (testError) {
//                       console.log('❌ API connection failed:', testError.response?.status, testError.response?.data);
//                       setError(`API test failed: ${testError.message}`);
//                     }
//                   }}
//                   className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
//                 >
//                   Test API
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Products Table */}
//         <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-700">
//               <thead className="bg-gray-750">
//                 <tr>
//                   <th className="px-6 py-3 text-left">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.length === currentProducts.length && currentProducts.length > 0}
//                       onChange={handleSelectAll}
//                       className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
//                     />
//                   </th>
//                   <th 
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
//                     onClick={() => handleSort('id')}
//                   >
//                     <div className="flex items-center space-x-1">
//                       <span>ID</span>
//                       {sortConfig.key === 'id' && (
//                         <span className="text-blue-400">
//                           {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Image
//                   </th>
//                   <th 
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
//                     onClick={() => handleSort('name')}
//                   >
//                     <div className="flex items-center space-x-1">
//                       <span>Name</span>
//                       {sortConfig.key === 'name' && (
//                         <span className="text-blue-400">
//                           {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th 
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
//                     onClick={() => handleSort('category')}
//                   >
//                     <div className="flex items-center space-x-1">
//                       <span>Category</span>
//                       {sortConfig.key === 'category' && (
//                         <span className="text-blue-400">
//                           {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th 
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
//                     onClick={() => handleSort('price')}
//                   >
//                     <div className="flex items-center space-x-1">
//                       <span>Price</span>
//                       {sortConfig.key === 'price' && (
//                         <span className="text-blue-400">
//                           {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th 
//                     className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
//                     onClick={() => handleSort('stock')}
//                   >
//                     <div className="flex items-center space-x-1">
//                       <span>Stock</span>
//                       {sortConfig.key === 'stock' && (
//                         <span className="text-blue-400">
//                           {sortConfig.direction === 'asc' ? '↑' : '↓'}
//                         </span>
//                       )}
//                     </div>
//                   </th>
//                   <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="bg-gray-800 divide-y divide-gray-700">
//                 {currentProducts.length > 0 ? currentProducts.map((product, index) => (
//                   <tr 
//                     key={product?.id || index} 
//                     className={`hover:bg-gray-750 transition-colors ${
//                       selectedProducts.includes(product?.id) ? 'bg-blue-900/20' : ''
//                     }`}
//                   >
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       <input
//                         type="checkbox"
//                         checked={selectedProducts.includes(product?.id)}
//                         onChange={() => handleSelectProduct(product?.id)}
//                         className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800"
//                       />
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-300">
//                       #{product?.id || 'N/A'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {product?.image ? (
//                         <img 
//                           src={product.image} 
//                           alt={product.name || 'Product'} 
//                           className="w-12 h-12 object-cover rounded-lg border border-gray-600"
//                         />
//                       ) : (
//                         <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
//                           <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
//                       {product?.name || 'Unknown Product'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                       {product?.category || 'No category'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
//                       ${product?.price || '0.00'}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap">
//                       {getStockBadge(product?.stock)}
//                     </td>
//                     <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                       <div className="flex items-center space-x-2">
//                         <button
//                           onClick={() => openViewModal(product)}
//                           className="text-blue-400 hover:text-blue-300 transition-colors"
//                         >
//                           View
//                         </button>
//                         <button
//                           onClick={() => openEditModal(product)}
//                           className="text-indigo-400 hover:text-indigo-300 transition-colors"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteProduct(product?.id)}
//                           disabled={actionLoading}
//                           className="text-red-400 hover:text-red-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan="8" className="px-6 py-8 text-center text-gray-400">
//                       {loading ? 'Loading products...' : 'No products found'}
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="bg-gray-800 px-4 py-3 border-t border-gray-700 sm:px-6">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center text-sm text-gray-400">
//                 <span>
//                   Showing <span className="font-medium text-white">{indexOfFirstProduct + 1}</span> to{' '}
//                   <span className="font-medium text-white">
//                     {Math.min(indexOfLastProduct, filteredProducts.length)}
//                   </span> of{' '}
//                   <span className="font-medium text-white">{filteredProducts.length}</span> results
//                 </span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="px-3 py-1 text-sm border border-gray-600 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Previous
//                 </button>
                
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`px-3 py-1 text-sm border rounded transition-colors ${
//                       currentPage === page
//                         ? 'bg-blue-600 text-white border-blue-600'
//                         : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
//                     }`}
//                   >
//                     {page}
//                   </button>
//                 ))}
                
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   className="px-3 py-1 text-sm border border-gray-600 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 backdrop-blur-sm">
//             <div className="relative top-20 mx-auto p-5 border border-gray-600 w-full max-w-lg shadow-2xl rounded-lg bg-gray-800">
//               <div className="mt-3">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold text-white">
//                     {modalMode === 'add' ? 'Add New Product' : 
//                      modalMode === 'edit' ? 'Edit Product' : 'Product Details'}
//                   </h3>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="text-gray-400 hover:text-gray-200 transition-colors"
//                   >
//                     <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>

//                 {modalMode === 'view' ? (
//                   // View Mode
//                   <div className="space-y-4">
//                     {selectedProduct?.image && (
//                       <div className="flex justify-center">
//                         <img 
//                           src={selectedProduct.image} 
//                           alt={selectedProduct.name}
//                           className="w-32 h-32 object-cover rounded-lg border border-gray-600"
//                         />
//                       </div>
//                     )}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-400">Name</label>
//                       <p className="mt-1 text-sm text-white">{selectedProduct?.name || 'N/A'}</p>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-400">Category</label>
//                       <p className="mt-1 text-sm text-white">{selectedProduct?.category || 'N/A'}</p>
//                     </div>
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-400">Price</label>
//                         <p className="mt-1 text-sm text-white">${selectedProduct?.price || '0.00'}</p>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-400">Stock</label>
//                         <p className="mt-1 text-sm text-white">{selectedProduct?.stock || '0'}</p>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-400">Description</label>
//                       <p className="mt-1 text-sm text-white">{selectedProduct?.description || 'No description available'}</p>
//                     </div>
//                     <div className="flex justify-end space-x-3 mt-6">
//                       <button
//                         onClick={() => setShowModal(false)}
//                         className="px-4 py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   // Add/Edit Form
//                   <form onSubmit={modalMode === 'add' ? handleAddProduct : handleUpdateProduct} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-2">Product Name</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
//                         placeholder="Enter product name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-2">Category</label>
//                       <input
//                         type="text"
//                         name="category"
//                         value={formData.category}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
//                         placeholder="Enter category"
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
//                         <input
//                           type="number"
//                           name="price"
//                           value={formData.price}
//                           onChange={handleInputChange}
//                           step="0.01"
//                           min="0"
//                           required
//                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
//                           placeholder="0.00"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium text-gray-400 mb-2">Stock</label>
//                         <input
//                           type="number"
//                           name="stock"
//                           value={formData.stock}
//                           onChange={handleInputChange}
//                           min="0"
//                           required
//                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
//                           placeholder="0"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
//                       <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         rows="3"
//                         className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
//                         placeholder="Enter product description"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-400 mb-2">Product Image</label>
                      
//                       {/* Image Input Type Toggle */}
//                       <div className="flex space-x-4 mb-3">
//                         <button
//                           type="button"
//                           onClick={() => handleImageTypeChange('url')}
//                           className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
//                             imageInputType === 'url'
//                               ? 'bg-blue-600 text-white'
//                               : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                           }`}
//                         >
//                           Image URL
//                         </button>
//                         <button
//                           type="button"
//                           onClick={() => handleImageTypeChange('file')}
//                           className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
//                             imageInputType === 'file'
//                               ? 'bg-blue-600 text-white'
//                               : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                           }`}
//                         >
//                           Upload File
//                         </button>
//                       </div>

//                       {/* Conditional Input Based on Type */}
//                       {imageInputType === 'url' ? (
//                         <input
//                           type="url"
//                           name="imageUrl"
//                           value={formData.imageUrl}
//                           onChange={handleInputChange}
//                           placeholder="https://example.com/image.jpg"
//                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
//                         />
//                       ) : (
//                         <input
//                           type="file"
//                           name="image"
//                           onChange={handleInputChange}
//                           accept="image/*"
//                           className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
//                         />
//                       )}

//                       {/* Image Preview */}
//                       {imagePreview && (
//                         <div className="mt-3 flex justify-center">
//                           <div className="relative">
//                             <img 
//                               src={imagePreview} 
//                               alt="Preview"
//                               className="w-24 h-24 object-cover rounded-lg border border-gray-600"
//                               onError={() => {
//                                 setImagePreview('');
//                                 if (imageInputType === 'url') {
//                                   setError('Invalid image URL. Please check the link.');
//                                 }
//                               }}
//                             />
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setImagePreview('');
//                                 setFormData(prev => ({ ...prev, image: null, imageUrl: '' }));
//                               }}
//                               className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700 transition-colors"
//                             >
//                               ×
//                             </button>
//                           </div>
//                         </div>
//                       )}
                      
//                       <p className="mt-1 text-xs text-gray-500">
//                         {imageInputType === 'url' 
//                           ? 'Enter a direct link to an image (jpg, png, gif)'
//                           : 'Choose an image file from your device'
//                         }
//                       </p>
//                     </div>

//                     <div className="flex justify-end space-x-3 mt-6">
//                       <button
//                         type="button"
//                         onClick={() => setShowModal(false)}
//                         className="px-4 py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={actionLoading}
//                         className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         {actionLoading ? 'Saving...' : modalMode === 'add' ? 'Add Product' : 'Update Product'}
//                       </button>
//                     </div>
//                   </form>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Loading Overlay */}
//         {actionLoading && (
//           <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-2xl">
//               <div className="flex items-center space-x-3">
//                 <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
//                 <span className="text-white">Processing action...</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProducts;














import React, { useState, useEffect } from "react";
import api from "../Api/Axios_Instance.jsx";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add', 'edit', 'view'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    image: null,
    imageUrl: ''
  });
  const [imagePreview, setImagePreview] = useState('');
  const [imageInputType, setImageInputType] = useState('url'); // 'url' or 'file'

  const productsPerPage = 10;

  // Fetch products data
  useEffect(() => {
    fetchProducts();
  }, []);

  // Auto-hide success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      setProducts(response.data);
      setError('');
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle form data changes
  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      const file = files[0];
      setFormData(prev => ({ ...prev, image: file, imageUrl: '' }));
      
      // Create image preview
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview('');
      }
    } else if (name === 'imageUrl') {
      setFormData(prev => ({ ...prev, imageUrl: value, image: null }));
      // Set preview for URL
      if (value.trim()) {
        setImagePreview(value);
      } else {
        setImagePreview('');
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle image input type toggle
  const handleImageTypeChange = (type) => {
    setImageInputType(type);
    setFormData(prev => ({ ...prev, image: null, imageUrl: '' }));
    setImagePreview('');
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
    category: '',
      price: '',
      stock: '',
      description: '',
      image: null,
      imageUrl: ''
    });
    setImagePreview('');
    setImageInputType('url');
  };

  // Handle modal operations
  const openAddModal = () => {
    resetForm();
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name || '',
      category: product.category || '',
      price: product.price || '',
      stock: product.stock || '',
      description: product.description || '',
      image: null,
      imageUrl: product.image || ''
    });
    setImagePreview(product.image || '');
    setImageInputType('url'); // Default to URL for editing
    setModalMode('edit');
    setShowModal(true);
  };

  const openViewModal = (product) => {
    setSelectedProduct(product);
    setModalMode('view');
    setShowModal(true);
  };

  // Handle product operations
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError(''); // Clear previous errors
    
    try {
      // Validate required fields
      if (!formData.name.trim()) {
        setError('Product name is required');
        return;
      }
      if (!formData.category.trim()) {
        setError('Category is required');
        return;
      }
      if (!formData.price || parseFloat(formData.price) < 0) {
        setError('Valid price is required');
        return;
      }
      if (!formData.stock || parseInt(formData.stock) < 0) {
        setError('Valid stock quantity is required');
        return;
      }

      console.log('=== ADDING PRODUCT ===');
      console.log('Form data:', formData);

      // Try the most basic approach first
      const basicProductData = {
        name: formData.name.trim(),
        category: formData.category.trim(),
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
        description: formData.description.trim() || ''
      };

      // Add image data based on input type
      if (imageInputType === 'url' && formData.imageUrl.trim()) {
        basicProductData.image = formData.imageUrl.trim();
      }

      console.log('Sending basic product data:', basicProductData);
      console.log('Has file to upload:', !!formData.image);

      let response;
      
      try {
        // If we have a file upload, use FormData
        if (formData.image) {
          const formDataPayload = new FormData();
          formDataPayload.append('name', basicProductData.name);
          formDataPayload.append('category', basicProductData.category);
          formDataPayload.append('price', basicProductData.price.toString());
          formDataPayload.append('stock', basicProductData.stock.toString());
          formDataPayload.append('description', basicProductData.description);
          formDataPayload.append('image', formData.image);

          response = await api.post('/products', formDataPayload);
          console.log('✅ FormData POST successful:', response.data);
        } else {
          // Method 1: Simple POST with JSON (for URL or no image)
          response = await api.post('/products', basicProductData);
          console.log('✅ Basic POST successful:', response.data);
        }
      } catch (basicError) {
        console.log('❌ Primary method failed:', basicError.response?.status, basicError.response?.data);
        
        // Method 2: Try with explicit headers
        try {
          if (formData.image) {
            const formDataPayload = new FormData();
            formDataPayload.append('name', basicProductData.name);
            formDataPayload.append('category', basicProductData.category);
            formDataPayload.append('price', basicProductData.price.toString());
            formDataPayload.append('stock', basicProductData.stock.toString());
            formDataPayload.append('description', basicProductData.description);
            formDataPayload.append('image', formData.image);

            response = await api.post('/products', formDataPayload, {
              headers: { 'Content-Type': 'multipart/form-data' }
            });
          } else {
            response = await api.post('/products', basicProductData, {
              headers: { 'Content-Type': 'application/json' }
            });
          }
          console.log('✅ POST with headers successful:', response.data);
        } catch (headerError) {
          console.log('❌ POST with headers failed:', headerError.response?.status, headerError.response?.data);
          throw headerError; // Re-throw the last error
        }
      }

      // Handle successful response
      if (response && response.data) {
        console.log('✅ Product added successfully:', response.data);
        
        // Add to local state
        setProducts(prev => [...prev, response.data]);
        
        // Close modal and show success
        setShowModal(false);
        setSuccessMessage('Product added successfully!');
        resetForm();
      } else {
        throw new Error('No response data received');
      }
      
    } catch (error) {
      console.log('=== ADD PRODUCT ERROR ===');
      console.error('Full error:', error);
      
      let errorMessage = 'Failed to add product';
      
      if (error.response) {
        console.log('Response error details:', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: error.response.data
        });
        
        // Extract meaningful error message
        if (error.response.data) {
          if (typeof error.response.data === 'string') {
            errorMessage = error.response.data;
          } else if (error.response.data.message) {
            errorMessage = error.response.data.message;
          } else if (error.response.data.error) {
            errorMessage = error.response.data.error;
          } else {
            errorMessage = `Server error: ${error.response.status} ${error.response.statusText}`;
          }
        }
      } else if (error.request) {
        console.log('Network error - no response received');
        errorMessage = 'Network error: Could not reach server';
      } else {
        console.log('Request setup error:', error.message);
        errorMessage = error.message;
      }
      
      setError(`Add Product Failed: ${errorMessage}`);
      
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    
    try {
      console.log('Starting product update for ID:', selectedProduct.id);
      console.log('Update data:', {
        name: formData.name,
        category: formData.category,
        price: formData.price,
        stock: formData.stock,
        description: formData.description,
        hasNewImage: !!formData.image
      });

      let response;
      
      // Try different update approaches
      if (formData.image) {
        // Method 1: FormData with new image
        const productData = new FormData();
        productData.append('name', formData.name);
        productData.append('category', formData.category);
        productData.append('price', formData.price);
        productData.append('stock', formData.stock);
        productData.append('description', formData.description);
        productData.append('image', formData.image);

        console.log('Updating with FormData (new image)...');
        
        // Try PATCH first, then PUT as fallback
        try {
          response = await api.patch(`/products/${selectedProduct.id}`, productData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        } catch (patchError) {
          console.log('PATCH failed, trying PUT...', patchError.response?.status);
          response = await api.put(`/products/${selectedProduct.id}`, productData, {
            headers: { 'Content-Type': 'multipart/form-data' }
          });
        }
      } else {
        // Method 2: JSON data without new image
        const productData = {
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price) || 0,
          stock: parseInt(formData.stock) || 0,
          description: formData.description
        };

        console.log('Updating with JSON data:', productData);
        
        // Try PATCH first, then PUT as fallback
        try {
          response = await api.patch(`/products/${selectedProduct.id}`, productData, {
            headers: { 'Content-Type': 'application/json' }
          });
        } catch (patchError) {
          console.log('PATCH failed, trying PUT...', patchError.response?.status);
          response = await api.put(`/products/${selectedProduct.id}`, productData, {
            headers: { 'Content-Type': 'application/json' }
          });
        }
      }

      console.log('Update product successful:', response.data);

      // Update the products list
      const updatedProduct = response.data;
      setProducts(prev => prev.map(product => 
        product.id === selectedProduct.id ? updatedProduct : product
      ));
      
      setShowModal(false);
      setSuccessMessage('Product updated successfully');
      resetForm();
      
    } catch (error) {
      console.error('Update product error:', error);
      
      // Detailed error logging and handling
      if (error.response) {
        console.error('Response error:', {
          status: error.response.status,
          data: error.response.data,
          headers: error.response.headers
        });
        
        const errorMessage = error.response.data?.message || 
                           error.response.data?.error || 
                           error.response.data || 
                           `Server error (Status: ${error.response.status})`;
        
        setError(`Failed to update product: ${errorMessage}`);
      } else if (error.request) {
        console.error('Request error:', error.request);
        setError('Failed to update product: No response from server. Please check your connection.');
      } else {
        console.error('General error:', error.message);
        setError(`Failed to update product: ${error.message}`);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      setActionLoading(true);
      try {
        await api.delete(`/products/${productId}`);
        setProducts(prev => prev.filter(product => product.id !== productId));
        setSelectedProducts(prev => prev.filter(id => id !== productId));
        setSuccessMessage('Product deleted successfully');
      } catch (error) {
        console.error('Failed to delete product:', error);
        setError('Failed to delete product. Please try again.');
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products? This action cannot be undone.`)) {
      setActionLoading(true);
      try {
        await Promise.all(selectedProducts.map(id => api.delete(`/products/${id}`)));
        setProducts(prev => prev.filter(product => !selectedProducts.includes(product.id)));
        setSelectedProducts([]);
        setSuccessMessage(`${selectedProducts.length} products deleted successfully`);
      } catch (error) {
        console.error('Failed to delete products:', error);
        setError('Failed to delete products. Please try again.');
      } finally {
        setActionLoading(false);
      }
    }
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Handle product selection
  const handleSelectProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    const currentProducts = getFilteredAndSortedProducts().slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );
    
    setSelectedProducts(
      selectedProducts.length === currentProducts.length 
        ? [] 
        : currentProducts.map(product => product.id)
    );
  };

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filtered = products.filter(product => {
      if (!product) return false;
      return (
        (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (product.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (product.id?.toString() || '').includes(searchTerm)
      );
    });

    if (sortConfig.key) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key] || '';
        const bValue = b[sortConfig.key] || '';
        
        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  };

  const getStockBadge = (stock) => {
    const stockNum = parseInt(stock) || 0;
    if (stockNum === 0) {
      return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-red-900/50 text-red-400 border border-red-500/30">Out of Stock</span>;
    } else if (stockNum < 10) {
      return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-900/50 text-yellow-400 border border-yellow-500/30">Low Stock ({stockNum})</span>;
    } else {
      return <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-400 border border-green-500/30">In Stock ({stockNum})</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-400">Loading products...</p>
        </div>
      </div>
    );
  }

  const filteredProducts = getFilteredAndSortedProducts();
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gray-900 py-4 xs:py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Success/Error Messages */}
        {successMessage && (
          <div className="mb-3 xs:mb-4 p-3 xs:p-4 rounded-lg bg-green-900/50 border border-green-500/30 text-green-400 text-sm xs:text-base">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="mb-3 xs:mb-4 p-3 xs:p-4 rounded-lg bg-red-900/50 border border-red-500/30 text-red-400 text-sm xs:text-base">
            {error}
          </div>
        )}

        {/* Header Section */}
        <div className="mb-6 xs:mb-8">
          <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-0">
            <div>
              <h1 className="text-2xl xs:text-3xl font-bold text-white">Products Management</h1>
              <p className="mt-1 xs:mt-2 text-gray-400 text-sm xs:text-base">Manage your product inventory</p>
            </div>
            <div className="flex items-center space-x-2 xs:space-x-4">
              <div className="bg-gray-800 border border-gray-700 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg shadow-sm">
                <span className="text-xs xs:text-sm text-gray-400">Total Products:</span>
                <span className="ml-1 xs:ml-2 text-base xs:text-lg font-semibold text-blue-400">{products.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg xs:rounded-lg shadow-sm mb-4 xs:mb-5 sm:mb-6">
          <div className="p-4 xs:p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 xs:space-y-4 sm:space-y-0">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-4 w-4 xs:h-5 xs:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  placeholder="Search products by name, category, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-9 xs:pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm xs:text-base"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row xs:items-center space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-3">
                {selectedProducts.length > 0 && (
                  <button
                    onClick={handleBulkDelete}
                    disabled={actionLoading}
                    className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-xs xs:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed w-full xs:w-auto"
                  >
                    Delete Selected ({selectedProducts.length})
                  </button>
                )}
                <button
                  onClick={openAddModal}
                  className="bg-blue-600 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs xs:text-sm font-medium w-full xs:w-auto"
                >
                  Add New Product
                </button>
                
                {/* Debug Test Button */}
                <button
                  onClick={async () => {
                    console.log('Testing API connection...');
                    try {
                      const testResponse = await api.get('/products');
                      console.log('✅ API connection working:', testResponse.status);
                      setSuccessMessage('API connection test successful!');
                    } catch (testError) {
                      console.log('❌ API connection failed:', testError.response?.status, testError.response?.data);
                      setError(`API test failed: ${testError.message}`);
                    }
                  }}
                  className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs xs:text-sm font-medium w-full xs:w-auto"
                >
                  Test API
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg xs:rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-750">
                <tr>
                  <th className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedProducts.length === currentProducts.length && currentProducts.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 w-3 h-3 xs:w-4 xs:h-4"
                    />
                  </th>
                  <th 
                    className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort('id')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>ID</span>
                      {sortConfig.key === 'id' && (
                        <span className="text-blue-400">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Image
                  </th>
                  <th 
                    className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      {sortConfig.key === 'name' && (
                        <span className="text-blue-400">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort('category')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Category</span>
                      {sortConfig.key === 'category' && (
                        <span className="text-blue-400">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Price</span>
                      {sortConfig.key === 'price' && (
                        <span className="text-blue-400">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th 
                    className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
                    onClick={() => handleSort('stock')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Stock</span>
                      {sortConfig.key === 'stock' && (
                        <span className="text-blue-400">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {currentProducts.length > 0 ? currentProducts.map((product, index) => (
                  <tr 
                    key={product?.id || index} 
                    className={`hover:bg-gray-750 transition-colors ${
                      selectedProducts.includes(product?.id) ? 'bg-blue-900/20' : ''
                    }`}
                  >
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product?.id)}
                        onChange={() => handleSelectProduct(product?.id)}
                        className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 w-3 h-3 xs:w-4 xs:h-4"
                      />
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm font-medium text-gray-300">
                      #{product?.id || 'N/A'}
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap">
                      {product?.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name || 'Product'} 
                          className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 object-cover rounded-lg border border-gray-600"
                        />
                      ) : (
                        <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                          <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm text-white">
                      <span className="truncate max-w-[80px] xs:max-w-[120px] sm:max-w-none block">
                        {product?.name || 'Unknown Product'}
                      </span>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm text-gray-300">
                      <span className="truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none block">
                        {product?.category || 'No category'}
                      </span>
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm text-gray-300">
                      ${product?.price || '0.00'}
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap">
                      {getStockBadge(product?.stock)}
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm font-medium">
                      <div className="flex flex-col xs:flex-row xs:items-center space-y-1 xs:space-y-0 xs:space-x-1 sm:space-x-2">
                        <button
                          onClick={() => openViewModal(product)}
                          className="text-blue-400 hover:text-blue-300 transition-colors text-xs xs:text-sm"
                        >
                          View
                        </button>
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-indigo-400 hover:text-indigo-300 transition-colors text-xs xs:text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product?.id)}
                          disabled={actionLoading}
                          className="text-red-400 hover:text-red-300 transition-colors text-xs xs:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" className="px-3 xs:px-4 sm:px-6 py-6 xs:py-8 text-center text-gray-400 text-sm xs:text-base">
                      {loading ? 'Loading products...' : 'No products found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="bg-gray-800 px-3 xs:px-4 sm:px-6 py-2 xs:py-3 border-t border-gray-700">
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-0">
              <div className="flex items-center text-xs xs:text-sm text-gray-400">
                <span>
                  Showing <span className="font-medium text-white">{indexOfFirstProduct + 1}</span> to{' '}
                  <span className="font-medium text-white">
                    {Math.min(indexOfLastProduct, filteredProducts.length)}
                  </span> of{' '}
                  <span className="font-medium text-white">{filteredProducts.length}</span> results
                </span>
              </div>
              <div className="flex items-center space-x-1 xs:space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-2 xs:px-3 py-1 text-xs xs:text-sm border border-gray-600 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-2 xs:px-3 py-1 text-xs xs:text-sm border rounded transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-600 bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-2 xs:px-3 py-1 text-xs xs:text-sm border border-gray-600 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 backdrop-blur-sm p-2 xs:p-4">
            <div className="relative top-4 xs:top-8 sm:top-20 mx-auto p-4 xs:p-5 border border-gray-600 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg shadow-2xl rounded-lg bg-gray-800">
              <div className="mt-3">
                <div className="flex items-center justify-between mb-3 xs:mb-4">
                  <h3 className="text-base xs:text-lg font-semibold text-white">
                    {modalMode === 'add' ? 'Add New Product' : 
                     modalMode === 'edit' ? 'Edit Product' : 'Product Details'}
                  </h3>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-gray-400 hover:text-gray-200 transition-colors"
                  >
                    <svg className="h-5 w-5 xs:h-6 xs:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {modalMode === 'view' ? (
                  // View Mode
                  <div className="space-y-3 xs:space-y-4">
                    {selectedProduct?.image && (
                      <div className="flex justify-center">
                        <img 
                          src={selectedProduct.image} 
                          alt={selectedProduct.name}
                          className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-600"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-400">Name</label>
                      <p className="mt-1 text-xs xs:text-sm text-white">{selectedProduct?.name || 'N/A'}</p>
                    </div>
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-400">Category</label>
                      <p className="mt-1 text-xs xs:text-sm text-white">{selectedProduct?.category || 'N/A'}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-3 xs:gap-4">
                      <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-400">Price</label>
                        <p className="mt-1 text-xs xs:text-sm text-white">${selectedProduct?.price || '0.00'}</p>
                      </div>
                      <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-400">Stock</label>
                        <p className="mt-1 text-xs xs:text-sm text-white">{selectedProduct?.stock || '0'}</p>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-400">Description</label>
                      <p className="mt-1 text-xs xs:text-sm text-white">{selectedProduct?.description || 'No description available'}</p>
                    </div>
                    <div className="flex justify-end space-x-2 xs:space-x-3 mt-4 xs:mt-6">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-3 xs:px-4 py-1.5 xs:py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors text-xs xs:text-sm"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  // Add/Edit Form
                  <form onSubmit={modalMode === 'add' ? handleAddProduct : handleUpdateProduct} className="space-y-3 xs:space-y-4">
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1 xs:mb-2">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-xs xs:text-sm"
                        placeholder="Enter product name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1 xs:mb-2">Category</label>
                      <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-xs xs:text-sm"
                        placeholder="Enter category"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                      <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1 xs:mb-2">Price</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          step="0.01"
                          min="0"
                          required
                          className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-xs xs:text-sm"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1 xs:mb-2">Stock</label>
                        <input
                          type="number"
                          name="stock"
                          value={formData.stock}
                          onChange={handleInputChange}
                          min="0"
                          required
                          className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-xs xs:text-sm"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1 xs:mb-2">Description</label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-xs xs:text-sm"
                        placeholder="Enter product description"
                      />
                    </div>

                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1 xs:mb-2">Product Image</label>
                      
                      {/* Image Input Type Toggle */}
                      <div className="flex space-x-2 xs:space-x-3 sm:space-x-4 mb-2 xs:mb-3">
                        <button
                          type="button"
                          onClick={() => handleImageTypeChange('url')}
                          className={`px-2 xs:px-3 py-1 rounded-lg text-xs xs:text-sm font-medium transition-colors ${
                            imageInputType === 'url'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          Image URL
                        </button>
                        <button
                          type="button"
                          onClick={() => handleImageTypeChange('file')}
                          className={`px-2 xs:px-3 py-1 rounded-lg text-xs xs:text-sm font-medium transition-colors ${
                            imageInputType === 'file'
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          Upload File
                        </button>
                      </div>

                      {/* Conditional Input Based on Type */}
                      {imageInputType === 'url' ? (
                        <input
                          type="url"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                          placeholder="https://example.com/image.jpg"
                          className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-xs xs:text-sm"
                        />
                      ) : (
                        <input
                          type="file"
                          name="image"
                          onChange={handleInputChange}
                          accept="image/*"
                          className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white file:mr-2 xs:file:mr-4 file:py-1 xs:file:py-2 file:px-2 xs:file:px-4 file:rounded-full file:border-0 file:text-xs xs:file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 text-xs xs:text-sm"
                        />
                      )}

                      {/* Image Preview */}
                      {imagePreview && (
                        <div className="mt-2 xs:mt-3 flex justify-center">
                          <div className="relative">
                            <img 
                              src={imagePreview} 
                              alt="Preview"
                              className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-600"
                              onError={() => {
                                setImagePreview('');
                                if (imageInputType === 'url') {
                                  setError('Invalid image URL. Please check the link.');
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setImagePreview('');
                                setFormData(prev => ({ ...prev, image: null, imageUrl: '' }));
                              }}
                              className="absolute -top-1 -right-1 xs:-top-2 xs:-right-2 bg-red-600 text-white rounded-full w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs hover:bg-red-700 transition-colors"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <p className="mt-1 text-xs text-gray-500">
                        {imageInputType === 'url' 
                          ? 'Enter a direct link to an image (jpg, png, gif)'
                          : 'Choose an image file from your device'
                        }
                      </p>
                    </div>

                    <div className="flex justify-end space-x-2 xs:space-x-3 mt-4 xs:mt-6">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-3 xs:px-4 py-1.5 xs:py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors text-xs xs:text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={actionLoading}
                        className="px-3 xs:px-4 py-1.5 xs:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs xs:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading ? 'Saving...' : modalMode === 'add' ? 'Add Product' : 'Update Product'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {actionLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 xs:p-5 sm:p-6 shadow-2xl">
              <div className="flex items-center space-x-2 xs:space-x-3">
                <div className="animate-spin rounded-full h-4 w-4 xs:h-5 xs:h-5 sm:h-6 sm:w-6 border-b-2 border-blue-500"></div>
                <span className="text-white text-sm xs:text-base">Processing action...</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;