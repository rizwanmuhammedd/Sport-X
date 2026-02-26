
// import React, { useState, useEffect } from "react";
// import api from "../Api/Axios_Instance.jsx";

// const AdminProducts = () => {
//   // Category enum mapping
//   const categoryEnumMap = {
//     "Boots": 0,
//     "Balls": 1,
//     "Jerseys": 2,
//     "Gloves": 3,
//     "Accessories": 4
//   };

//   const categoryEnumToString = {
//     0: "Boots",
//     1: "Balls",
//     2: "Jerseys",
//     3: "Gloves",
//     4: "Accessories"
//   };

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('add');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     price: '',
//     stockQuantity: '',
//     image: null,
//     imageUrl: ''
//   });

//   const CATEGORY_OPTIONS = ["Boots", "Balls", "Jerseys", "Gloves", "Accessories"];

//   const [imagePreview, setImagePreview] = useState('');
//   const [imageInputType, setImageInputType] = useState('url');

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
//       const response = await api.get("/Products/GetAll");

//       // Convert category from enum number to string for display
//       const products = (response.data.data || []).map(p => ({
//         ...p,
//         stock: p.stockQuantity,
//         image: p.imageUrl,
//         category: categoryEnumToString[p.category] || "Boots" // Convert enum to string
//       }));

//       setProducts(products);
//       setError('');
//     } catch (err) {
//       setError("Failed to fetch products");
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Helper function to test image URL
//   const testImageUrl = (url) => {
//     return new Promise((resolve) => {
//       const img = new Image();
//       img.onload = () => resolve(true);
//       img.onerror = () => resolve(false);
//       img.src = url;
//     });
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
      
//       // Test if URL is valid
//       if (value.trim()) {
//         // Show loading state
//         setImagePreview('loading...');
        
//         testImageUrl(value).then(isValid => {
//           if (isValid) {
//             setImagePreview(value);
//           } else {
//             setImagePreview('');
//             setError('Invalid image URL. Please check the link.');
//           }
//         });
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
//       stockQuantity: '',
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
    
//     // Convert category (could be string or number) to display string
//     let categoryValue = "Boots"; // default
    
//     if (product.category !== undefined && product.category !== null) {
//       if (typeof product.category === 'number') {
//         // If it's a number (enum), convert to string
//         categoryValue = categoryEnumToString[product.category] || "Boots";
//       } else if (typeof product.category === 'string') {
//         // If it's already a string, use it
//         categoryValue = product.category;
//       }
//     }

//     setFormData({
//       name: product.name || '',
//       category: categoryValue,
//       price: product.price || '',
//       stockQuantity: product.stockQuantity || product.stock || '',
//       image: null,
//       imageUrl: product.image || product.imageUrl || ''
//     });
    
//     setImagePreview(product.image || product.imageUrl || '');
//     setImageInputType('url');
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
//     setError('');

//     try {
//       const formDataPayload = new FormData();
//       formDataPayload.append("Name", formData.name);
//       formDataPayload.append("Price", formData.price);
//       formDataPayload.append("StockQuantity", formData.stockQuantity);
      
//       // Convert category string to enum number
//       const categoryEnumValue = categoryEnumMap[formData.category] || 0;
//       formDataPayload.append("Category", categoryEnumValue.toString());

//       if (formData.image) {
//         // If image file is provided
//         formDataPayload.append("image", formData.image);
        
//         const response = await api.post(
//           "/Products/Admin/Create",
//           formDataPayload
//         );

//         const newProduct = {
//           ...response.data.data,
//           stock: response.data.data.stockQuantity,
//           image: response.data.data.imageUrl,
//           category: formData.category // Keep string for display
//         };

//         setProducts(prev => [...prev, newProduct]);
//         setShowModal(false);
//         setSuccessMessage("Product added successfully!");
//         resetForm();
        
//       } else if (formData.imageUrl) {
//         // If image URL is provided, create a temporary file from URL
//         console.log("Using image URL:", formData.imageUrl);
        
//         try {
//           // Fetch the image from URL
//           const imageResponse = await fetch(formData.imageUrl);
//           const blob = await imageResponse.blob();
//           const file = new File([blob], 'product-image.jpg', { type: blob.type });
          
//           formDataPayload.append("image", file);
          
//           const response = await api.post(
//             "/Products/Admin/Create",
//             formDataPayload
//           );

//           const newProduct = {
//             ...response.data.data,
//             stock: response.data.data.stockQuantity,
//             image: response.data.data.imageUrl,
//             category: formData.category
//           };

//           setProducts(prev => [...prev, newProduct]);
//           setShowModal(false);
//           setSuccessMessage("Product added successfully!");
//           resetForm();
          
//         } catch (urlError) {
//           console.error("Failed to fetch image from URL:", urlError);
//           setError("Could not fetch image from the provided URL. Please check the link.");
//         }
//       } else {
//         throw new Error("Please provide either an image file or URL");
//       }
//     } catch (error) {
//       console.error("Add product error:", error);
//       setError(error.response?.data?.message || error.message || "Failed to add product");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();
//     setActionLoading(true);
//     setError('');

//     try {
//       // 1. Update product details
//       const categoryEnumValue = categoryEnumMap[formData.category] || 0;
//       const payload = {
//         name: formData.name.trim(),
//         price: parseFloat(formData.price),
//         stockQuantity: parseInt(formData.stockQuantity),
//         category: categoryEnumValue
//       };

//       await api.put(`/Products/Admin/Update/${selectedProduct.id}`, payload);

//       // 2. Update image if provided - FIXED: Use query parameter instead of route parameter
//       if (formData.image) {
//         const imageFormData = new FormData();
//         imageFormData.append("image", formData.image);
        
//         // Correct endpoint: /Products/Admin/AddImages?id={productId}
//         await api.post(`/Products/Admin/AddImages?id=${selectedProduct.id}`, imageFormData);
//       } else if (formData.imageUrl && formData.imageUrl !== selectedProduct.imageUrl) {
//         // Update image from URL if changed
//         try {
//           const imageResponse = await fetch(formData.imageUrl);
//           const blob = await imageResponse.blob();
//           const file = new File([blob], 'product-image.jpg', { type: blob.type });
          
//           const imageFormData = new FormData();
//           imageFormData.append("image", file);
          
//           await api.post(`/Products/Admin/AddImages?id=${selectedProduct.id}`, imageFormData);
//         } catch (urlError) {
//           console.error("Failed to update image from URL:", urlError);
//           // Don't fail the whole update if image URL fails
//         }
//       }

//       // 3. Fetch updated product
//       const updatedResponse = await api.get(`/Products/GetBy_${selectedProduct.id}`);
//       const updatedProduct = {
//         ...updatedResponse.data.data,
//         stock: updatedResponse.data.data.stockQuantity,
//         image: updatedResponse.data.data.imageUrl,
//         category: formData.category
//       };

//       // 4. Update UI
//       setProducts(prev => prev.map(p => 
//         p.id === selectedProduct.id ? updatedProduct : p
//       ));
      
//       setShowModal(false);
//       setSuccessMessage("Product updated successfully!");

//     } catch (error) {
//       console.error("Update error:", error);
//       setError(error.response?.data?.message || error.message || "Failed to update product");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Handle image-only update
//   const handleUpdateImage = async (productId) => {
//     if (!formData.image && !formData.imageUrl) {
//       setError("Please provide an image file or URL");
//       return;
//     }

//     setActionLoading(true);
//     try {
//       if (formData.image) {
//         // Upload file
//         const imageFormData = new FormData();
//         imageFormData.append("image", formData.image);
        
//         // Correct endpoint: /Products/Admin/AddImages?id={productId}
//         await api.post(`/Products/Admin/AddImages?id=${productId}`, imageFormData);
//         setSuccessMessage("Image updated successfully!");
        
//       } else if (formData.imageUrl) {
//         // For URL, we need to download and upload
//         const imageResponse = await fetch(formData.imageUrl);
//         const blob = await imageResponse.blob();
//         const file = new File([blob], 'product-image.jpg', { type: blob.type });
        
//         const imageFormData = new FormData();
//         imageFormData.append("image", file);
        
//         await api.post(`/Products/Admin/AddImages?id=${productId}`, imageFormData);
//         setSuccessMessage("Image updated successfully!");
//       }
      
//       // Refresh products
//       fetchProducts();
      
//     } catch (error) {
//       console.error("Update image error:", error);
//       setError("Failed to update image: " + error.message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleDeleteProduct = async (productId) => {
//     if (!window.confirm("Are you sure?")) return;

//     setActionLoading(true);
//     try {
//       await api.delete(`/Products/Admin/Delete/${productId}`);

//       setProducts(prev =>
//         prev.filter(p => p.id !== productId)
//       );

//       setSuccessMessage("Product deleted successfully");
//     } catch (error) {
//       console.error(error);
//       setError("Failed to delete product");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (selectedProducts.length === 0) return;
    
//     if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products? This action cannot be undone.`)) {
//       setActionLoading(true);
//       try {
//         await Promise.all(
//           selectedProducts.map(id =>
//             api.delete(`/Products/Admin/Delete/${id}`)
//           )
//         );
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
//     <div className="min-h-screen bg-gray-900 py-4 xs:py-6 sm:py-8">
//       <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
//         {/* Success/Error Messages */}
//         {successMessage && (
//           <div className="mb-3 xs:mb-4 p-3 xs:p-4 rounded-lg bg-green-900/50 border border-green-500/30 text-green-400 text-sm xs:text-base">
//             {successMessage}
//           </div>
//         )}
//         {error && (
//           <div className="mb-3 xs:mb-4 p-3 xs:p-4 rounded-lg bg-red-900/50 border border-red-500/30 text-red-400 text-sm xs:text-base">
//             {typeof error === "string" ? error : JSON.stringify(error)}
//           </div>
//         )}

//         {/* Header Section */}
//         <div className="mb-6 xs:mb-8">
//           <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-0">
//             <div>
//               <h1 className="text-2xl xs:text-3xl font-bold text-white">Products Management</h1>
//               <p className="mt-1 xs:mt-2 text-gray-400 text-sm xs:text-base">Manage your product inventory</p>
//             </div>
//             <div className="flex items-center space-x-2 xs:space-x-4">
//               <div className="bg-gray-800 border border-gray-700 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg shadow-sm">
//                 <span className="text-xs xs:text-sm text-gray-400">Total Products:</span>
//                 <span className="ml-1 xs:ml-2 text-base xs:text-lg font-semibold text-blue-400">{products.length}</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Controls Section */}
//         <div className="bg-gray-800 border border-gray-700 rounded-lg xs:rounded-lg shadow-sm mb-4 xs:mb-5 sm:mb-6">
//           <div className="p-4 xs:p-5 sm:p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 xs:space-y-4 sm:space-y-0">
//               {/* Search Bar */}
//               <div className="relative flex-1 max-w-md">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-4 w-4 xs:h-5 xs:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search products by name, category, or ID..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="block w-full pl-9 xs:pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm xs:text-base"
//                 />
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col xs:flex-row xs:items-center space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-3">
//                 {selectedProducts.length > 0 && (
//                   <button
//                     onClick={handleBulkDelete}
//                     disabled={actionLoading}
//                     className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-xs xs:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed w-full xs:w-auto"
//                   >
//                     Delete Selected ({selectedProducts.length})
//                   </button>
//                 )}
//                 <button
//                   onClick={openAddModal}
//                   className="bg-blue-600 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs xs:text-sm font-medium w-full xs:w-auto"
//                 >
//                   Add New Product
//                 </button>
                
//                 <button
//                   onClick={fetchProducts}
//                   className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs xs:text-sm font-medium w-full xs:w-auto"
//                 >
//                   Refresh
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Products Table */}
//         <div className="bg-gray-800 border border-gray-700 rounded-lg xs:rounded-lg shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-700">
//               <thead className="bg-gray-750">
//                 <tr>
//                   <th className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.length === currentProducts.length && currentProducts.length > 0}
//                       onChange={handleSelectAll}
//                       className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 w-3 h-3 xs:w-4 xs:h-4"
//                     />
//                   </th>
//                   <th 
//                     className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
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
//                   <th className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Image
//                   </th>
//                   <th 
//                     className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
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
//                     className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
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
//                     className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
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
//                     className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
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
//                   <th className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
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
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap">
//                       <input
//                         type="checkbox"
//                         checked={selectedProducts.includes(product?.id)}
//                         onChange={() => handleSelectProduct(product?.id)}
//                         className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 w-3 h-3 xs:w-4 xs:h-4"
//                       />
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm font-medium text-gray-300">
//                       #{product?.id || 'N/A'}
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap">
//                       {product?.image ? (
//                         <img 
//                           src={product.image || product.imageUrl} 
//                           alt={product.name || 'Product'} 
//                           className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 object-cover rounded-lg border border-gray-600"
//                         />
//                       ) : (
//                         <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
//                           <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm text-white">
//                       <span className="truncate max-w-[80px] xs:max-w-[120px] sm:max-w-none block">
//                         {product?.name || 'Unknown Product'}
//                       </span>
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm text-gray-300">
//                       <span className="truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none block">
//                         {product?.category || 'No category'}
//                       </span>
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm text-gray-300">
//                       ${product?.price || '0.00'}
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap">
//                       {getStockBadge(product?.stock)}
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm font-medium">
//                       <div className="flex flex-col xs:flex-row xs:items-center space-y-1 xs:space-y-0 xs:space-x-1 sm:space-x-2">
//                         <button
//                           onClick={() => openViewModal(product)}
//                           className="text-blue-400 hover:text-blue-300 transition-colors text-xs xs:text-sm"
//                         >
//                           View
//                         </button>
//                         <button
//                           onClick={() => openEditModal(product)}
//                           className="text-indigo-400 hover:text-indigo-300 transition-colors text-xs xs:text-sm"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDeleteProduct(product?.id)}
//                           disabled={actionLoading}
//                           className="text-red-400 hover:text-red-300 transition-colors text-xs xs:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan="8" className="px-3 xs:px-4 sm:px-6 py-6 xs:py-8 text-center text-gray-400 text-sm xs:text-base">
//                       No products found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="bg-gray-800 px-3 xs:px-4 sm:px-6 py-2 xs:py-3 border-t border-gray-700">
//             <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-0">
//               <div className="flex items-center text-xs xs:text-sm text-gray-400">
//                 <span>
//                   Showing <span className="font-medium text-white">{indexOfFirstProduct + 1}</span> to{' '}
//                   <span className="font-medium text-white">
//                     {Math.min(indexOfLastProduct, filteredProducts.length)}
//                   </span> of{' '}
//                   <span className="font-medium text-white">{filteredProducts.length}</span> results
//                 </span>
//               </div>
//               <div className="flex items-center space-x-1 xs:space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="px-2 xs:px-3 py-1 text-xs xs:text-sm border border-gray-600 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Previous
//                 </button>
                
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`px-2 xs:px-3 py-1 text-xs xs:text-sm border rounded transition-colors ${
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
//                   className="px-2 xs:px-3 py-1 text-xs xs:text-sm border border-gray-600 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Modal */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 backdrop-blur-sm p-2 xs:p-4">
//             <div className="relative top-4 xs:top-8 sm:top-20 mx-auto p-4 xs:p-5 border border-gray-600 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg shadow-2xl rounded-lg bg-gray-800">
//               <div className="mt-3">
//                 <div className="flex items-center justify-between mb-3 xs:mb-4">
//                   <h3 className="text-base xs:text-lg font-semibold text-white">
//                     {modalMode === 'add' ? 'Add New Product' : 
//                      modalMode === 'edit' ? 'Edit Product' : 'Product Details'}
//                   </h3>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="text-gray-400 hover:text-gray-200 transition-colors"
//                   >
//                     <svg className="h-5 w-5 xs:h-6 xs:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>

//                 {modalMode === 'view' ? (
//                   // View Mode
//                   <div className="space-y-3 xs:space-y-4">
//                     {selectedProduct?.image && (
//                       <div className="flex justify-center">
//                         <img 
//                           src={selectedProduct.image} 
//                           alt={selectedProduct.name}
//                           className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-600"
//                         />
//                       </div>
//                     )}
//                     <div>
//                       <label className="block text-xs xs:text-sm font-medium text-gray-400">Name</label>
//                       <p className="mt-1 text-xs xs:text-sm text-white">{selectedProduct?.name || 'N/A'}</p>
//                     </div>
//                     <div>
//                       <label className="block text-xs xs:text-sm font-medium text-gray-400">Category</label>
//                       <p className="mt-1 text-xs xs:text-sm text-white">{selectedProduct?.category || 'N/A'}</p>
//                     </div>
//                     <div className="grid grid-cols-2 gap-3 xs:gap-4">
//                       <div>
//                         <label className="block text-xs xs:text-sm font-medium text-gray-400">Price</label>
//                         <p className="mt-1 text-xs xs:text-sm text-white">${selectedProduct?.price || '0.00'}</p>
//                       </div>
//                       <div>
//                         <label className="block text-xs xs:text-sm font-medium text-gray-400">Stock</label>
//                         <p className="mt-1 text-xs xs:text-sm text-white">{selectedProduct?.stock || '0'}</p>
//                       </div>
//                     </div>
//                     <div className="flex justify-end space-x-2 xs:space-x-3 mt-4 xs:mt-6">
//                       <button
//                         onClick={() => setShowModal(false)}
//                         className="px-3 xs:px-4 py-1.5 xs:py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors text-xs xs:text-sm"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   // Add/Edit Form
//                   <form onSubmit={modalMode === 'add' ? handleAddProduct : handleUpdateProduct} className="space-y-3 xs:space-y-4">
//                     <div>
//                       <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1 xs:mb-2">Product Name</label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={formData.name}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-xs xs:text-sm"
//                         placeholder="Enter product name"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1 xs:mb-2">Category</label>
//                       <select
//                         name="category"
//                         value={formData.category}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-2 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
//                       >
//                         <option value="">Select Category</option>
//                         {CATEGORY_OPTIONS.map(cat => (
//                           <option key={cat} value={cat}>{cat}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="grid grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
//                       <div>
//                         <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1 xs:mb-2">Price</label>
//                         <input
//                           type="number"
//                           name="price"
//                           value={formData.price ?? ""}
//                           onChange={handleInputChange}
//                           step="0.01"
//                           min="0"
//                           required
//                           className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-xs xs:text-sm"
//                           placeholder="0.00"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1 xs:mb-2">Stock</label>
//                         <input
//                           type="number"
//                           name="stockQuantity"
//                           value={formData.stockQuantity}
//                           onChange={handleInputChange}
//                           min="0"
//                           required
//                           className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-xs xs:text-sm"
//                           placeholder="0"
//                         />
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1 xs:mb-2">Product Image</label>
                      
//                       {/* Image Input Type Toggle */}
//                       <div className="flex space-x-2 xs:space-x-3 sm:space-x-4 mb-2 xs:mb-3">
//                         <button
//                           type="button"
//                           onClick={() => handleImageTypeChange('url')}
//                           className={`px-2 xs:px-3 py-1 rounded-lg text-xs xs:text-sm font-medium transition-colors ${
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
//                           className={`px-2 xs:px-3 py-1 rounded-lg text-xs xs:text-sm font-medium transition-colors ${
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
//                           className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-xs xs:text-sm"
//                         />
//                       ) : (
//                         <input
//                           type="file"
//                           name="image"
//                           onChange={handleInputChange}
//                           accept="image/*"
//                           className="w-full px-2 xs:px-3 py-1.5 xs:py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white file:mr-2 xs:file:mr-4 file:py-1 xs:file:py-2 file:px-2 xs:file:px-4 file:rounded-full file:border-0 file:text-xs xs:file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 text-xs xs:text-sm"
//                         />
//                       )}

//                       {/* Image Preview */}
//                       {imagePreview && (
//                         <div className="mt-2 xs:mt-3 flex justify-center">
//                           <div className="relative">
//                             <img 
//                               src={imagePreview} 
//                               alt="Preview"
//                               className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-600"
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
//                               className="absolute -top-1 -right-1 xs:-top-2 xs:-right-2 bg-red-600 text-white rounded-full w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex items-center justify-center text-xs hover:bg-red-700 transition-colors"
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

//                     {/* Update Image Only button for edit mode */}
//                     {modalMode === 'edit' && (
//                       <div className="pt-4">
//                         <button
//                           type="button"
//                           onClick={() => handleUpdateImage(selectedProduct.id)}
//                           disabled={actionLoading || (!formData.image && !formData.imageUrl)}
//                           className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm transition-colors"
//                         >
//                           Update Image Only
//                         </button>
//                       </div>
//                     )}

//                     <div className="flex justify-end space-x-2 xs:space-x-3 mt-4 xs:mt-6">
//                       <button
//                         type="button"
//                         onClick={() => setShowModal(false)}
//                         className="px-3 xs:px-4 py-1.5 xs:py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors text-xs xs:text-sm"
//                       >
//                         Cancel
//                       </button>
//                       <button
//                         type="submit"
//                         disabled={actionLoading}
//                         className="px-3 xs:px-4 py-1.5 xs:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs xs:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 xs:p-5 sm:p-6 shadow-2xl">
//               <div className="flex items-center space-x-2 xs:space-x-3">
//                 <div className="animate-spin rounded-full h-4 w-4 xs:h-5 xs:h-5 sm:h-6 sm:w-6 border-b-2 border-blue-500"></div>
//                 <span className="text-white text-sm xs:text-base">Processing action...</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AdminProducts;












// import React, { useState, useEffect } from "react";
// import api from "../Api/Axios_Instance.jsx";

// const AdminProducts = () => {
//   // Category enum mapping
//   const categoryEnumMap = {
//     "Boots": 0,
//     "Balls": 1,
//     "Jerseys": 2,
//     "Gloves": 3,
//     "Accessories": 4
//   };

//   const categoryEnumToString = {
//     0: "Boots",
//     1: "Balls",
//     2: "Jerseys",
//     3: "Gloves",
//     4: "Accessories"
//   };

//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedProducts, setSelectedProducts] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalMode, setModalMode] = useState('add');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [actionLoading, setActionLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     category: '',
//     price: '',
//     stockQuantity: '',
//     image: null,
//     imageUrl: ''
//   });

//   const CATEGORY_OPTIONS = ["Boots", "Balls", "Jerseys", "Gloves", "Accessories"];
//   const [imagePreview, setImagePreview] = useState('');
//   const [imageInputType, setImageInputType] = useState('url');
  
//   // New state for soft delete
//   const [showDeleted, setShowDeleted] = useState(false); // Toggle to show/hide deleted products
//   const [deletedFilter, setDeletedFilter] = useState('active'); // 'active', 'deleted', or 'all'

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
//   try {
//     setLoading(true);
//     const response = await api.get("/Products/GetAll");

//     // Convert category from enum number to string for display
//     const products = (response.data.data || []).map(p => {
//       // Handle category conversion - it might be string or number
//       let categoryStr = "";
//       if (typeof p.category === 'number') {
//         categoryStr = categoryEnumToString[p.category] || "Boots";
//       } else {
//         categoryStr = p.category || "Boots";
//       }
      
//       return {
//         ...p,
//         stock: p.stockQuantity,
//         image: p.imageUrl,
//         category: categoryStr,
//         isActive: p.isActive !== false // Default to true if undefined
//       };
//     });

//     setProducts(products);
//     setError('');
//   } catch (err) {
//     setError("Failed to fetch products");
//     console.error(err);
//   } finally {
//     setLoading(false);
//   }
// };

//   // Helper function to test image URL
//   const testImageUrl = (url) => {
//     return new Promise((resolve) => {
//       const img = new Image();
//       img.onload = () => resolve(true);
//       img.onerror = () => resolve(false);
//       img.src = url;
//     });
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
      
//       // Test if URL is valid
//       if (value.trim()) {
//         // Show loading state
//         setImagePreview('loading...');
        
//         testImageUrl(value).then(isValid => {
//           if (isValid) {
//             setImagePreview(value);
//           } else {
//             setImagePreview('');
//             setError('Invalid image URL. Please check the link.');
//           }
//         });
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
//       stockQuantity: '',
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
    
//     // Convert category (could be string or number) to display string
//     let categoryValue = "Boots"; // default
    
//     if (product.category !== undefined && product.category !== null) {
//       if (typeof product.category === 'number') {
//         // If it's a number (enum), convert to string
//         categoryValue = categoryEnumToString[product.category] || "Boots";
//       } else if (typeof product.category === 'string') {
//         // If it's already a string, use it
//         categoryValue = product.category;
//       }
//     }

//     setFormData({
//       name: product.name || '',
//       category: categoryValue,
//       price: product.price || '',
//       stockQuantity: product.stockQuantity || product.stock || '',
//       image: null,
//       imageUrl: product.image || product.imageUrl || ''
//     });
    
//     setImagePreview(product.image || product.imageUrl || '');
//     setImageInputType('url');
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
//     setError('');

//     try {
//       const formDataPayload = new FormData();
//       formDataPayload.append("Name", formData.name);
//       formDataPayload.append("Price", formData.price);
//       formDataPayload.append("StockQuantity", formData.stockQuantity);
      
//       // Convert category string to enum number
//       const categoryEnumValue = categoryEnumMap[formData.category] || 0;
//       formDataPayload.append("Category", categoryEnumValue.toString());

//       if (formData.image) {
//         // If image file is provided
//         formDataPayload.append("image", formData.image);
        
//         const response = await api.post(
//           "/Products/Admin/Create",
//           formDataPayload
//         );

//         const newProduct = {
//           ...response.data.data,
//           stock: response.data.data.stockQuantity,
//           image: response.data.data.imageUrl,
//           category: formData.category, // Keep string for display
//           isDeleted: false // New product is not deleted
//         };

//         setProducts(prev => [...prev, newProduct]);
//         setShowModal(false);
//         setSuccessMessage("Product added successfully!");
//         resetForm();
        
//       } else if (formData.imageUrl) {
//         // If image URL is provided, create a temporary file from URL
//         console.log("Using image URL:", formData.imageUrl);
        
//         try {
//           // Fetch the image from URL
//           const imageResponse = await fetch(formData.imageUrl);
//           const blob = await imageResponse.blob();
//           const file = new File([blob], 'product-image.jpg', { type: blob.type });
          
//           formDataPayload.append("image", file);
          
//           const response = await api.post(
//             "/Products/Admin/Create",
//             formDataPayload
//           );

//           const newProduct = {
//             ...response.data.data,
//             stock: response.data.data.stockQuantity,
//             image: response.data.data.imageUrl,
//             category: formData.category,
//             isDeleted: false
//           };

//           setProducts(prev => [...prev, newProduct]);
//         setShowModal(false);
//         setSuccessMessage("Product added successfully!");
//         resetForm();
        
//         } catch (urlError) {
//           console.error("Failed to fetch image from URL:", urlError);
//           setError("Could not fetch image from the provided URL. Please check the link.");
//         }
//       } else {
//         throw new Error("Please provide either an image file or URL");
//       }
//     } catch (error) {
//       console.error("Add product error:", error);
//       setError(error.response?.data?.message || error.message || "Failed to add product");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleUpdateProduct = async (e) => {
//     e.preventDefault();
//     setActionLoading(true);
//     setError('');

//     try {
//       // 1. Update product details
//       const categoryEnumValue = categoryEnumMap[formData.category] || 0;
//       const payload = {
//         name: formData.name.trim(),
//         price: parseFloat(formData.price),
//         stockQuantity: parseInt(formData.stockQuantity),
//         category: categoryEnumValue
//       };

//       await api.put(`/Products/Admin/Update/${selectedProduct.id}`, payload);

//       // 2. Update image if provided - FIXED: Use query parameter instead of route parameter
//       if (formData.image) {
//         const imageFormData = new FormData();
//         imageFormData.append("image", formData.image);
        
//         // Correct endpoint: /Products/Admin/AddImages?id={productId}
//         await api.post(`/Products/Admin/AddImages?id=${selectedProduct.id}`, imageFormData);
//       } else if (formData.imageUrl && formData.imageUrl !== selectedProduct.imageUrl) {
//         // Update image from URL if changed
//         try {
//           const imageResponse = await fetch(formData.imageUrl);
//           const blob = await imageResponse.blob();
//           const file = new File([blob], 'product-image.jpg', { type: blob.type });
          
//           const imageFormData = new FormData();
//           imageFormData.append("image", file);
          
//           await api.post(`/Products/Admin/AddImages?id=${selectedProduct.id}`, imageFormData);
//         } catch (urlError) {
//           console.error("Failed to update image from URL:", urlError);
//           // Don't fail the whole update if image URL fails
//         }
//       }

//       // 3. Fetch updated product
//       const updatedResponse = await api.get(`/Products/GetBy_${selectedProduct.id}`);
//       const updatedProduct = {
//         ...updatedResponse.data.data,
//         stock: updatedResponse.data.data.stockQuantity,
//         image: updatedResponse.data.data.imageUrl,
//         category: formData.category,
//         isDeleted: selectedProduct.isDeleted || false // Preserve delete status
//       };

//       // 4. Update UI
//       setProducts(prev => prev.map(p => 
//         p.id === selectedProduct.id ? updatedProduct : p
//       ));
      
//       setShowModal(false);
//       setSuccessMessage("Product updated successfully!");

//     } catch (error) {
//       console.error("Update error:", error);
//       setError(error.response?.data?.message || error.message || "Failed to update product");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // Handle image-only update
//   const handleUpdateImage = async (productId) => {
//     if (!formData.image && !formData.imageUrl) {
//       setError("Please provide an image file or URL");
//       return;
//     }

//     setActionLoading(true);
//     try {
//       if (formData.image) {
//         // Upload file
//         const imageFormData = new FormData();
//         imageFormData.append("image", formData.image);
        
//         // Correct endpoint: /Products/Admin/AddImages?id={productId}
//         await api.post(`/Products/Admin/AddImages?id=${productId}`, imageFormData);
//         setSuccessMessage("Image updated successfully!");
        
//       } else if (formData.imageUrl) {
//         // For URL, we need to download and upload
//         const imageResponse = await fetch(formData.imageUrl);
//         const blob = await imageResponse.blob();
//         const file = new File([blob], 'product-image.jpg', { type: blob.type });
        
//         const imageFormData = new FormData();
//         imageFormData.append("image", file);
        
//         await api.post(`/Products/Admin/AddImages?id=${productId}`, imageFormData);
//         setSuccessMessage("Image updated successfully!");
//       }
      
//       // Refresh products
//       fetchProducts();
      
//     } catch (error) {
//       console.error("Update image error:", error);
//       setError("Failed to update image: " + error.message);
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // SOFT DELETE: Mark product as deleted instead of removing
//  // SOFT DELETE: Mark product as inactive
// const handleDeleteProduct = async (productId) => {
//   if (!window.confirm("Are you sure you want to delete this product?")) return;

//   setActionLoading(true);
//   try {
//     // Call soft delete endpoint
//     await api.patch(`/Products/Admin/SoftDelete/${productId}`);
    
//     // Update UI: Mark product as inactive
//     setProducts(prev => prev.map(product =>
//       product.id === productId 
//         ? { ...product, isActive: false } 
//         : product
//     ));

//     setSuccessMessage("Product deleted successfully");
//   } catch (error) {
//     console.error(error);
//     setError("Failed to delete product");
//   } finally {
//     setActionLoading(false);
//   }
// };

// // RESTORE: Mark product as active again
// const handleRestoreProduct = async (productId) => {
//   setActionLoading(true);
//   try {
//     // Call restore endpoint
//     await api.patch(`/Products/Admin/Restore/${productId}`);
    
//     // Update UI: Mark product as active
//     setProducts(prev => prev.map(product =>
//       product.id === productId 
//         ? { ...product, isActive: true } 
//         : product
//     ));

//     setSuccessMessage("Product restored successfully");
//   } catch (error) {
//     console.error(error);
//     setError("Failed to restore product");
//   } finally {
//     setActionLoading(false);
//   }
// };

//   // HARD DELETE: Permanently remove product (optional)
//   const handleHardDeleteProduct = async (productId) => {
//     if (!window.confirm("WARNING: This will permanently delete the product. Are you sure?")) return;

//     setActionLoading(true);
//     try {
//       await api.delete(`/Products/Admin/HardDelete/${productId}`);
      
//       // Remove from state
//       setProducts(prev => prev.filter(product => product.id !== productId));
      
//       setSuccessMessage("Product permanently deleted");
//     } catch (error) {
//       console.error(error);
//       setError("Failed to permanently delete product");
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   const handleBulkDelete = async () => {
//     if (selectedProducts.length === 0) return;
    
//     if (window.confirm(`Are you sure you want to soft delete ${selectedProducts.length} products?`)) {
//       setActionLoading(true);
//       try {
//         // Soft delete each selected product
//         await Promise.all(
//           selectedProducts.map(id =>
//             api.patch(`/Products/Admin/SoftDelete/${id}`)
//           )
//         );
        
//         // Update UI
//         setProducts(prev => prev.map(product =>
//           selectedProducts.includes(product.id) 
//             ? { ...product, isDeleted: true } 
//             : product
//         ));
        
//         setSelectedProducts([]);
//         setSuccessMessage(`${selectedProducts.length} products soft deleted successfully`);
//       } catch (error) {
//         console.error('Failed to delete products:', error);
        
//         // Fallback: Simulate soft delete
//         setProducts(prev => prev.map(product =>
//           selectedProducts.includes(product.id) 
//             ? { ...product, isDeleted: true } 
//             : product
//         ));
//         setSelectedProducts([]);
//         setSuccessMessage(`${selectedProducts.length} products marked as deleted`);
//       } finally {
//         setActionLoading(false);
//       }
//     }
//   };

//   // Handle bulk restore
//   const handleBulkRestore = async () => {
//     if (selectedProducts.length === 0) return;
    
//     setActionLoading(true);
//     try {
//       await Promise.all(
//         selectedProducts.map(id =>
//           api.patch(`/Products/Admin/Restore/${id}`)
//         )
//       );
      
//       // Update UI
//       setProducts(prev => prev.map(product =>
//         selectedProducts.includes(product.id) 
//           ? { ...product, isDeleted: false } 
//           : product
//       ));
      
//       setSelectedProducts([]);
//       setSuccessMessage(`${selectedProducts.length} products restored successfully`);
//     } catch (error) {
//       console.error('Failed to restore products:', error);
      
//       // Fallback: Simulate restore
//       setProducts(prev => prev.map(product =>
//         selectedProducts.includes(product.id) 
//           ? { ...product, isDeleted: false } 
//           : product
//       ));
//       setSelectedProducts([]);
//       setSuccessMessage(`${selectedProducts.length} products restored`);
//     } finally {
//       setActionLoading(false);
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
//  // Filter and sort products
// const getFilteredAndSortedProducts = () => {
//   let filtered = products.filter(product => {
//     if (!product) return false;
    
//     // Filter by search term
//     const matchesSearch = (
//       (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (product.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
//       (product.id?.toString() || '').includes(searchTerm)
//     );
    
//     // Filter by active status (NOT isDeleted)
//     const matchesStatusFilter = 
//       deletedFilter === 'all' || 
//       (deletedFilter === 'active' && product.isActive) ||
//       (deletedFilter === 'deleted' && !product.isActive);
    
//     return matchesSearch && matchesStatusFilter;
//   });

//   if (sortConfig.key) {
//     filtered.sort((a, b) => {
//       const aValue = a[sortConfig.key] || '';
//       const bValue = b[sortConfig.key] || '';
      
//       if (aValue < bValue) {
//         return sortConfig.direction === 'asc' ? -1 : 1;
//       }
//       if (aValue > bValue) {
//         return sortConfig.direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });
//   }

//   return filtered;
// };

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

//   // Get deleted badge
//   const getDeletedBadge = (isDeleted) => {
//     return isDeleted ? (
//       <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-900/50 text-gray-400 border border-gray-500/30">Deleted</span>
//     ) : null;
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
//     <div className="min-h-screen bg-gray-900 py-4 xs:py-6 sm:py-8">
//       <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
//         {/* Success/Error Messages */}
//         {successMessage && (
//           <div className="mb-3 xs:mb-4 p-3 xs:p-4 rounded-lg bg-green-900/50 border border-green-500/30 text-green-400 text-sm xs:text-base">
//             {successMessage}
//           </div>
//         )}
//         {error && (
//           <div className="mb-3 xs:mb-4 p-3 xs:p-4 rounded-lg bg-red-900/50 border border-red-500/30 text-red-400 text-sm xs:text-base">
//             {typeof error === "string" ? error : JSON.stringify(error)}
//           </div>
//         )}

//         {/* Header Section */}
//         <div className="mb-6 xs:mb-8">
//           <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-0">
//             <div>
//               <h1 className="text-2xl xs:text-3xl font-bold text-white">Products Management</h1>
//               <p className="mt-1 xs:mt-2 text-gray-400 text-sm xs:text-base">Manage your product inventory</p>
//             </div>
//             <div className="flex items-center space-x-2 xs:space-x-4">
//               <div className="bg-gray-800 border border-gray-700 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg shadow-sm">
//                 <span className="text-xs xs:text-sm text-gray-400">Total Products:</span>
//                 <span className="ml-1 xs:ml-2 text-base xs:text-lg font-semibold text-blue-400">{products.length}</span>
//               </div>
//               <div className="bg-gray-800 border border-gray-700 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg shadow-sm">
//                 <span className="text-xs xs:text-sm text-gray-400">Active:</span>
//                 <span className="ml-1 xs:ml-2 text-base xs:text-lg font-semibold text-green-400">
//                   {products.filter(p => !p.isDeleted).length}
//                 </span>
//               </div>
//               <div className="bg-gray-800 border border-gray-700 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg shadow-sm">
//                 <span className="text-xs xs:text-sm text-gray-400">Deleted:</span>
//                 <span className="ml-1 xs:ml-2 text-base xs:text-lg font-semibold text-red-400">
//                   {products.filter(p => p.isDeleted).length}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Controls Section */}
//         <div className="bg-gray-800 border border-gray-700 rounded-lg xs:rounded-lg shadow-sm mb-4 xs:mb-5 sm:mb-6">
//           <div className="p-4 xs:p-5 sm:p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 xs:space-y-4 sm:space-y-0">
//               {/* Search Bar */}
//               <div className="relative flex-1 max-w-md">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-4 w-4 xs:h-5 xs:w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                   </svg>
//                 </div>
//                 <input
//                   type="text"
//                   placeholder="Search products by name, category, or ID..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="block w-full pl-9 xs:pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 text-sm xs:text-base"
//                 />
//               </div>

//               {/* Delete Filter */}
//               <div className="flex items-center space-x-2">
//                 <select
//                   value={deletedFilter}
//                   onChange={(e) => setDeletedFilter(e.target.value)}
//                   className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-2"
//                 >
//                   <option value="active">Active Products</option>
//                   <option value="deleted">Deleted Products</option>
//                   <option value="all">All Products</option>
//                 </select>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col xs:flex-row xs:items-center space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-3">
//                 {selectedProducts.length > 0 && (
//                   <>
//                     {deletedFilter === 'deleted' ? (
//                       <button
//                         onClick={handleBulkRestore}
//                         disabled={actionLoading}
//                         className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs xs:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed w-full xs:w-auto"
//                       >
//                         Restore Selected ({selectedProducts.length})
//                       </button>
//                     ) : (
//                       <button
//                         onClick={handleBulkDelete}
//                         disabled={actionLoading}
//                         className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-xs xs:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed w-full xs:w-auto"
//                       >
//                         Delete Selected ({selectedProducts.length})
//                       </button>
//                     )}
//                   </>
//                 )}
//                 <button
//                   onClick={openAddModal}
//                   className="bg-blue-600 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs xs:text-sm font-medium w-full xs:w-auto"
//                 >
//                   Add New Product
//                 </button>
                
//                 <button
//                   onClick={fetchProducts}
//                   className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs xs:text-sm font-medium w-full xs:w-auto"
//                 >
//                   Refresh
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Products Table */}
//         <div className="bg-gray-800 border border-gray-700 rounded-lg xs:rounded-lg shadow-sm overflow-hidden">
//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-700">
//               <thead className="bg-gray-750">
//                 <tr>
//                   <th className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left">
//                     <input
//                       type="checkbox"
//                       checked={selectedProducts.length === currentProducts.length && currentProducts.length > 0}
//                       onChange={handleSelectAll}
//                       className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 w-3 h-3 xs:w-4 xs:h-4"
//                     />
//                   </th>
//                   <th 
//                     className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
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
//                   <th className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Image
//                   </th>
//                   <th 
//                     className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
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
//                     className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
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
//                     className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
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
//                     className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition-colors"
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
//                   <th className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="px-3 xs:px-4 sm:px-6 py-2 xs:py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
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
//                     } ${product?.isDeleted ? 'bg-gray-900/30' : ''}`}
//                   >
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap">
//                       <input
//                         type="checkbox"
//                         checked={selectedProducts.includes(product?.id)}
//                         onChange={() => handleSelectProduct(product?.id)}
//                         className="rounded border-gray-600 bg-gray-700 text-blue-600 focus:ring-blue-500 focus:ring-offset-gray-800 w-3 h-3 xs:w-4 xs:h-4"
//                       />
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm font-medium text-gray-300">
//                       #{product?.id || 'N/A'}
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap">
//                       {product?.image ? (
//                         <img 
//                           src={product.image || product.imageUrl} 
//                           alt={product.name || 'Product'} 
//                           className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 object-cover rounded-lg border border-gray-600"
//                         />
//                       ) : (
//                         <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
//                           <svg className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                           </svg>
//                         </div>
//                       )}
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm text-white">
//                       <span className="truncate max-w-[80px] xs:max-w-[120px] sm:max-w-none block">
//                         {product?.name || 'Unknown Product'}
//                       </span>
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm text-gray-300">
//                       <span className="truncate max-w-[60px] xs:max-w-[80px] sm:max-w-none block">
//                         {product?.category || 'No category'}
//                       </span>
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm text-gray-300">
//                       ${product?.price || '0.00'}
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap">
//                       {getStockBadge(product?.stock)}
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap">
//                       {getDeletedBadge(product?.isDeleted)}
//                     </td>
//                     <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm font-medium">
//                       <div className="flex flex-col xs:flex-row xs:items-center space-y-1 xs:space-y-0 xs:space-x-1 sm:space-x-2">
//                         <button
//                           onClick={() => openViewModal(product)}
//                           className="text-blue-400 hover:text-blue-300 transition-colors text-xs xs:text-sm"
//                         >
//                           View
//                         </button>
                        
//                         {product?.isDeleted ? (
//                           <>
//                             <button
//                               onClick={() => handleRestoreProduct(product?.id)}
//                               disabled={actionLoading}
//                               className="text-green-400 hover:text-green-300 transition-colors text-xs xs:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                               Restore
//                             </button>
//                             <button
//                               onClick={() => handleHardDeleteProduct(product?.id)}
//                               disabled={actionLoading}
//                               className="text-red-400 hover:text-red-300 transition-colors text-xs xs:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                               Delete Permanently
//                             </button>
//                           </>
//                         ) : (
//                           <>
//                             <button
//                               onClick={() => openEditModal(product)}
//                               className="text-indigo-400 hover:text-indigo-300 transition-colors text-xs xs:text-sm"
//                             >
//                               Edit
//                             </button>
//                             <button
//                               onClick={() => handleDeleteProduct(product?.id)}
//                               disabled={actionLoading}
//                               className="text-red-400 hover:text-red-300 transition-colors text-xs xs:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                               Delete
//                             </button>
//                           </>
//                         )}
//                       </div>
//                     </td>
//                   </tr>
//                 )) : (
//                   <tr>
//                     <td colSpan="9" className="px-3 xs:px-4 sm:px-6 py-6 xs:py-8 text-center text-gray-400 text-sm xs:text-base">
//                       No products found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           <div className="bg-gray-800 px-3 xs:px-4 sm:px-6 py-2 xs:py-3 border-t border-gray-700">
//             <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2 xs:gap-0">
//               <div className="flex items-center text-xs xs:text-sm text-gray-400">
//                 <span>
//                   Showing <span className="font-medium text-white">{indexOfFirstProduct + 1}</span> to{' '}
//                   <span className="font-medium text-white">
//                     {Math.min(indexOfLastProduct, filteredProducts.length)}
//                   </span> of{' '}
//                   <span className="font-medium text-white">{filteredProducts.length}</span> results
//                 </span>
//               </div>
//               <div className="flex items-center space-x-1 xs:space-x-2">
//                 <button
//                   onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   className="px-2 xs:px-3 py-1 text-xs xs:text-sm border border-gray-600 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Previous
//                 </button>
                
//                 {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
//                   <button
//                     key={page}
//                     onClick={() => setCurrentPage(page)}
//                     className={`px-2 xs:px-3 py-1 text-xs xs:text-sm border rounded transition-colors ${
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
//                   className="px-2 xs:px-3 py-1 text-xs xs:text-sm border border-gray-600 rounded bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                 >
//                   Next
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Modal (keep the same) */}
//         {showModal && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full z-50 backdrop-blur-sm p-2 xs:p-4">
//             <div className="relative top-4 xs:top-8 sm:top-20 mx-auto p-4 xs:p-5 border border-gray-600 w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg shadow-2xl rounded-lg bg-gray-800">
//               <div className="mt-3">
//                 <div className="flex items-center justify-between mb-3 xs:mb-4">
//                   <h3 className="text-base xs:text-lg font-semibold text-white">
//                     {modalMode === 'add' ? 'Add New Product' : 
//                      modalMode === 'edit' ? 'Edit Product' : 'Product Details'}
//                   </h3>
//                   <button
//                     onClick={() => setShowModal(false)}
//                     className="text-gray-400 hover:text-gray-200 transition-colors"
//                   >
//                     <svg className="h-5 w-5 xs:h-6 xs:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                     </svg>
//                   </button>
//                 </div>

//                 {modalMode === 'view' ? (
//                   // View Mode
//                   <div className="space-y-3 xs:space-y-4">
//                     {selectedProduct?.image && (
//                       <div className="flex justify-center">
//                         <img 
//                           src={selectedProduct.image} 
//                           alt={selectedProduct.name}
//                           className="w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-600"
//                         />
//                       </div>
//                     )}
//                     <div>
//                       <label className="block text-xs xs:text-sm font-medium text-gray-400">Name</label>
//                       <p className="mt-1 text-xs xs:text-sm text-white">{selectedProduct?.name || 'N/A'}</p>
//                     </div>
//                     <div>
//                       <label className="block text-xs xs:text-sm font-medium text-gray-400">Category</label>
//                       <p className="mt-1 text-xs xs:text-sm text-white">{selectedProduct?.category || 'N/A'}</p>
//                     </div>
//                     <div className="grid grid-cols-2 gap-3 xs:gap-4">
//                       <div>
//                         <label className="block text-xs xs:text-sm font-medium text-gray-400">Price</label>
//                         <p className="mt-1 text-xs xs:text-sm text-white">${selectedProduct?.price || '0.00'}</p>
//                       </div>
//                       <div>
//                         <label className="block text-xs xs:text-sm font-medium text-gray-400">Stock</label>
//                         <p className="mt-1 text-xs xs:text-sm text-white">{selectedProduct?.stock || '0'}</p>
//                       </div>
//                     </div>
//                     <div className="flex justify-end space-x-2 xs:space-x-3 mt-4 xs:mt-6">
//                       <button
//                         onClick={() => setShowModal(false)}
//                         className="px-3 xs:px-4 py-1.5 xs:py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors text-xs xs:text-sm"
//                       >
//                         Close
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   // Add/Edit Form (keep the same)
//                   <form onSubmit={modalMode === 'add' ? handleAddProduct : handleUpdateProduct} className="space-y-3 xs:space-y-4">
//                     {/* ... Keep the existing form fields exactly as they are ... */}
//                     {/* Form fields remain unchanged */}
//                   </form>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Loading Overlay */}
//         {actionLoading && (
//           <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 backdrop-blur-sm">
//             <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 xs:p-5 sm:p-6 shadow-2xl">
//               <div className="flex items-center space-x-2 xs:space-x-3">
//                 <div className="animate-spin rounded-full h-4 w-4 xs:h-5 xs:h-5 sm:h-6 sm:w-6 border-b-2 border-blue-500"></div>
//                 <span className="text-white text-sm xs:text-base">Processing action...</span>
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
  // Category enum mapping
  const categoryEnumMap = {
    "Boots": 0,
    "Balls": 1,
    "Jerseys": 2,
    "Gloves": 3,
    "Accessories": 4
  };

  const categoryEnumToString = {
    0: "Boots",
    1: "Balls",
    2: "Jerseys",
    3: "Gloves",
    4: "Accessories"
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stockQuantity: '',
    image: null,
    imageUrl: ''
  });

  const CATEGORY_OPTIONS = ["Boots", "Balls", "Jerseys", "Gloves", "Accessories"];
  const [imagePreview, setImagePreview] = useState('');
  const [imageInputType, setImageInputType] = useState('url');
  
  // Updated state for active/inactive filter
  const [deletedFilter, setDeletedFilter] = useState('active'); // 'active', 'inactive', or 'all'

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
      const response = await api.get("/Products/GetAll");

      // Convert category from enum number to string for display
      const products = (response.data.data || []).map(p => {
        // Handle category conversion - it might be string or number
        let categoryStr = "";
        if (typeof p.category === 'number') {
          categoryStr = categoryEnumToString[p.category] || "Boots";
        } else {
          categoryStr = p.category || "Boots";
        }
        
        return {
          ...p,
          stock: p.stockQuantity,
          image: p.imageUrl,
          category: categoryStr,
          isActive: p.isActive !== false // Default to true if undefined
        };
      });

      setProducts(products);
      setError('');
    } catch (err) {
      setError("Failed to fetch products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper function to test image URL
  const testImageUrl = (url) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
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
      
      // Test if URL is valid
      if (value.trim()) {
        // Show loading state
        setImagePreview('loading...');
        
        testImageUrl(value).then(isValid => {
          if (isValid) {
            setImagePreview(value);
          } else {
            setImagePreview('');
            setError('Invalid image URL. Please check the link.');
          }
        });
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
      stockQuantity: '',
      image: null,
      imageUrl: ''
    });
    setImagePreview('');
    setImageInputType('url');
    setError(''); // Clear any errors
  };

  // Handle modal operations
  const openAddModal = () => {
    resetForm();
    setModalMode('add');
    setShowModal(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    
    // Convert category (could be string or number) to display string
    let categoryValue = "Boots"; // default
    
    if (product.category !== undefined && product.category !== null) {
      if (typeof product.category === 'number') {
        // If it's a number (enum), convert to string
        categoryValue = categoryEnumToString[product.category] || "Boots";
      } else if (typeof product.category === 'string') {
        // If it's already a string, use it
        categoryValue = product.category;
      }
    }

    setFormData({
      name: product.name || '',
      category: categoryValue,
      price: product.price || '',
      stockQuantity: product.stockQuantity || product.stock || '',
      image: null,
      imageUrl: product.image || product.imageUrl || ''
    });
    
    setImagePreview(product.image || product.imageUrl || '');
    setImageInputType('url');
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
    setError('');

    try {
      const formDataPayload = new FormData();
      formDataPayload.append("Name", formData.name);
      formDataPayload.append("Price", formData.price);
      formDataPayload.append("StockQuantity", formData.stockQuantity);
      
      // Convert category string to enum number
      const categoryEnumValue = categoryEnumMap[formData.category] || 0;
      formDataPayload.append("Category", categoryEnumValue.toString());

      if (formData.image) {
        // If image file is provided
        formDataPayload.append("image", formData.image);
        
        const response = await api.post(
          "/Products/Admin/Create",
          formDataPayload
        );

        const newProduct = {
          ...response.data.data,
          stock: response.data.data.stockQuantity,
          image: response.data.data.imageUrl,
          category: formData.category,
          isActive: true // New product is active
        };

        setProducts(prev => [...prev, newProduct]);
        setShowModal(false);
        setSuccessMessage("Product added successfully!");
        resetForm();
        
      } else if (formData.imageUrl) {
        // If image URL is provided, create a temporary file from URL
        console.log("Using image URL:", formData.imageUrl);
        
        try {
          // Fetch the image from URL
          const imageResponse = await fetch(formData.imageUrl);
          const blob = await imageResponse.blob();
          const file = new File([blob], 'product-image.jpg', { type: blob.type });
          
          formDataPayload.append("image", file);
          
          const response = await api.post(
            "/Products/Admin/Create",
            formDataPayload
          );

          const newProduct = {
            ...response.data.data,
            stock: response.data.data.stockQuantity,
            image: response.data.data.imageUrl,
            category: formData.category,
            isActive: true
          };

          setProducts(prev => [...prev, newProduct]);
          setShowModal(false);
          setSuccessMessage("Product added successfully!");
          resetForm();
          
        } catch (urlError) {
          console.error("Failed to fetch image from URL:", urlError);
          setError("Could not fetch image from the provided URL. Please check the link.");
        }
      } else {
        throw new Error("Please provide either an image file or URL");
      }
    } catch (error) {
      console.error("Add product error:", error);
      setError(error.response?.data?.message || error.message || "Failed to add product");
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    setError('');

    try {
      // 1. Update product details
      const categoryEnumValue = categoryEnumMap[formData.category] || 0;
      const payload = {
        name: formData.name.trim(),
        price: parseFloat(formData.price),
        stockQuantity: parseInt(formData.stockQuantity),
        category: categoryEnumValue
      };

      await api.put(`/Products/Admin/Update/${selectedProduct.id}`, payload);

      // 2. Update image if provided
      if (formData.image) {
        const imageFormData = new FormData();
        imageFormData.append("image", formData.image);
        
        await api.post(`/Products/Admin/AddImages?id=${selectedProduct.id}`, imageFormData);
      } else if (formData.imageUrl && formData.imageUrl !== selectedProduct.imageUrl) {
        try {
          const imageResponse = await fetch(formData.imageUrl);
          const blob = await imageResponse.blob();
          const file = new File([blob], 'product-image.jpg', { type: blob.type });
          
          const imageFormData = new FormData();
          imageFormData.append("image", file);
          
          await api.post(`/Products/Admin/AddImages?id=${selectedProduct.id}`, imageFormData);
        } catch (urlError) {
          console.error("Failed to update image from URL:", urlError);
        }
      }

      // 3. Fetch all products again to get updated data
      await fetchProducts();
      
      setShowModal(false);
      setSuccessMessage("Product updated successfully!");
      resetForm();

    } catch (error) {
      console.error("Update error:", error);
      setError(error.response?.data?.message || error.message || "Failed to update product");
    } finally {
      setActionLoading(false);
    }
  };

  // Handle image-only update
  const handleUpdateImage = async (productId) => {
    if (!formData.image && !formData.imageUrl) {
      setError("Please provide an image file or URL");
      return;
    }

    setActionLoading(true);
    setError(''); // Clear previous errors
    
    try {
      if (formData.image) {
        // Upload file
        const imageFormData = new FormData();
        imageFormData.append("image", formData.image);
        
        await api.post(`/Products/Admin/AddImages?id=${productId}`, imageFormData);
        setSuccessMessage("Image updated successfully!");
        
      } else if (formData.imageUrl) {
        // For URL, we need to download and upload
        const imageResponse = await fetch(formData.imageUrl);
        const blob = await imageResponse.blob();
        const file = new File([blob], 'product-image.jpg', { type: blob.type });
        
        const imageFormData = new FormData();
        imageFormData.append("image", file);
        
        await api.post(`/Products/Admin/AddImages?id=${productId}`, imageFormData);
        setSuccessMessage("Image updated successfully!");
      }
      
      // Refresh products to get updated image
      await fetchProducts();
      
      // Close modal if open
      if (showModal && modalMode === 'edit') {
        setShowModal(false);
      }
      
    } catch (error) {
      console.error("Update image error:", error);
      setError("Failed to update image: " + (error.response?.data?.message || error.message));
    } finally {
      setActionLoading(false);
    }
  };

  // SOFT DELETE: Mark product as inactive
  const handleDeleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setActionLoading(true);
    try {
      // Call soft delete endpoint
      await api.patch(`/Products/Admin/SoftDelete/${productId}`);
      
      // Update UI: Mark product as inactive
      setProducts(prev => prev.map(product =>
        product.id === productId 
          ? { ...product, isActive: false } 
          : product
      ));

      setSuccessMessage("Product deleted successfully");
    } catch (error) {
      console.error(error);
      setError("Failed to delete product");
    } finally {
      setActionLoading(false);
    }
  };

  // RESTORE: Mark product as active again
  const handleRestoreProduct = async (productId) => {
    setActionLoading(true);
    try {
      // Call restore endpoint
      await api.patch(`/Products/Admin/Restore/${productId}`);
      
      // Update UI: Mark product as active
      setProducts(prev => prev.map(product =>
        product.id === productId 
          ? { ...product, isActive: true } 
          : product
      ));

      setSuccessMessage("Product restored successfully");
    } catch (error) {
      console.error(error);
      setError("Failed to restore product");
    } finally {
      setActionLoading(false);
    }
  };

  // HARD DELETE: Permanently remove product (optional)


  // Bulk delete function
  const handleBulkDelete = async () => {
    if (selectedProducts.length === 0) return;
    
    if (window.confirm(`Are you sure you want to soft delete ${selectedProducts.length} products?`)) {
      setActionLoading(true);
      try {
        // Soft delete each selected product
        await Promise.all(
          selectedProducts.map(id =>
            api.patch(`/Products/Admin/SoftDelete/${id}`)
          )
        );
        
        // Update UI
        setProducts(prev => prev.map(product =>
          selectedProducts.includes(product.id) 
            ? { ...product, isActive: false } 
            : product
        ));
        
        setSelectedProducts([]);
        setSuccessMessage(`${selectedProducts.length} products soft deleted successfully`);
      } catch (error) {
        console.error('Failed to delete products:', error);
        
        // Fallback: Simulate soft delete
        setProducts(prev => prev.map(product =>
          selectedProducts.includes(product.id) 
            ? { ...product, isActive: false } 
            : product
        ));
        setSelectedProducts([]);
        setSuccessMessage(`${selectedProducts.length} products marked as inactive`);
      } finally {
        setActionLoading(false);
      }
    }
  };

  // Handle bulk restore
  const handleBulkRestore = async () => {
    if (selectedProducts.length === 0) return;
    
    setActionLoading(true);
    try {
      await Promise.all(
        selectedProducts.map(id =>
          api.patch(`/Products/Admin/Restore/${id}`)
        )
      );
      
      // Update UI
      setProducts(prev => prev.map(product =>
        selectedProducts.includes(product.id) 
          ? { ...product, isActive: true } 
          : product
      ));
      
      setSelectedProducts([]);
      setSuccessMessage(`${selectedProducts.length} products restored successfully`);
    } catch (error) {
      console.error('Failed to restore products:', error);
      
      // Fallback: Simulate restore
      setProducts(prev => prev.map(product =>
        selectedProducts.includes(product.id) 
          ? { ...product, isActive: true } 
          : product
      ));
      setSelectedProducts([]);
      setSuccessMessage(`${selectedProducts.length} products restored`);
    } finally {
      setActionLoading(false);
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
      
      // Filter by search term
      const matchesSearch = (
        (product.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (product.category?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (product.id?.toString() || '').includes(searchTerm)
      );
      
      // Filter by active status (isActive)
      const matchesStatusFilter = 
        deletedFilter === 'all' || 
        (deletedFilter === 'active' && product.isActive) ||
        (deletedFilter === 'inactive' && !product.isActive);
      
      return matchesSearch && matchesStatusFilter;
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

  // Get status badge
  const getStatusBadge = (isActive) => {
    return isActive ? (
      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-green-900/50 text-green-400 border border-green-500/30">Active</span>
    ) : (
      <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-900/50 text-gray-400 border border-gray-500/30">Inactive</span>
    );
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
            {typeof error === "string" ? error : JSON.stringify(error)}
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
              <div className="bg-gray-800 border border-gray-700 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg shadow-sm">
                <span className="text-xs xs:text-sm text-gray-400">Active:</span>
                <span className="ml-1 xs:ml-2 text-base xs:text-lg font-semibold text-green-400">
                  {products.filter(p => p.isActive).length}
                </span>
              </div>
              <div className="bg-gray-800 border border-gray-700 px-3 xs:px-4 py-1.5 xs:py-2 rounded-lg shadow-sm">
                <span className="text-xs xs:text-sm text-gray-400">Inactive:</span>
                <span className="ml-1 xs:ml-2 text-base xs:text-lg font-semibold text-red-400">
                  {products.filter(p => !p.isActive).length}
                </span>
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

              {/* Active/Inactive Filter */}
              <div className="flex items-center space-x-2">
                <select
                  value={deletedFilter}
                  onChange={(e) => setDeletedFilter(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-2"
                >
                  <option value="active">Active Products</option>
                  <option value="inactive">Inactive Products</option>
                  <option value="all">All Products</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col xs:flex-row xs:items-center space-y-2 xs:space-y-0 xs:space-x-2 sm:space-x-3">
                {selectedProducts.length > 0 && (
                  <>
                    {deletedFilter === 'inactive' ? (
                      <button
                        onClick={handleBulkRestore}
                        disabled={actionLoading}
                        className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs xs:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed w-full xs:w-auto"
                      >
                        Restore Selected ({selectedProducts.length})
                      </button>
                    ) : (
                      <button
                        onClick={handleBulkDelete}
                        disabled={actionLoading}
                        className="bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-xs xs:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed w-full xs:w-auto"
                      >
                        Delete Selected ({selectedProducts.length})
                      </button>
                    )}
                  </>
                )}
                <button
                  onClick={openAddModal}
                  className="bg-blue-600 text-white px-3 xs:px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs xs:text-sm font-medium w-full xs:w-auto"
                >
                  Add New Product
                </button>
                
                <button
                  onClick={fetchProducts}
                  className="bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors text-xs xs:text-sm font-medium w-full xs:w-auto"
                >
                  Refresh
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
                    Status
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
                    } ${!product?.isActive ? 'bg-gray-900/30' : ''}`}
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
                          src={product.image || product.imageUrl} 
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
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap">
                      {getStatusBadge(product?.isActive)}
                    </td>
                    <td className="px-3 xs:px-4 sm:px-6 py-3 xs:py-4 whitespace-nowrap text-xs xs:text-sm font-medium">
                      <div className="flex flex-col xs:flex-row xs:items-center space-y-1 xs:space-y-0 xs:space-x-1 sm:space-x-2">
                        <button
                          onClick={() => openViewModal(product)}
                          className="text-blue-400 hover:text-blue-300 transition-colors text-xs xs:text-sm"
                        >
                          View
                        </button>
                        
                        {!product?.isActive ? (
                          <>
                            <button
                              onClick={() => handleRestoreProduct(product?.id)}
                              disabled={actionLoading}
                              className="text-green-400 hover:text-green-300 transition-colors text-xs xs:text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              Restore
                            </button>
                           
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="9" className="px-3 xs:px-4 sm:px-6 py-6 xs:py-8 text-center text-gray-400 text-sm xs:text-base">
                      No products found
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
                  // Add/Edit Form (COMPLETE FORM)
                  <form onSubmit={modalMode === 'add' ? handleAddProduct : handleUpdateProduct} className="space-y-3 xs:space-y-4">
                    {/* Name */}
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1">Product Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm xs:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter product name"
                      />
                    </div>

                    {/* Category */}
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1">Category</label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm xs:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        {CATEGORY_OPTIONS.map((category) => (
                          <option key={category} value={category}>
                            {category}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Price and Stock */}
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                      <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1">Price ($)</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          min="0"
                          step="0.01"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm xs:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0.00"
                        />
                      </div>
                      <div>
                        <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-1">Stock Quantity</label>
                        <input
                          type="number"
                          name="stockQuantity"
                          value={formData.stockQuantity}
                          onChange={handleInputChange}
                          required
                          min="0"
                          className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm xs:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Image Upload Section */}
                    <div>
                      <label className="block text-xs xs:text-sm font-medium text-gray-400 mb-2">Product Image</label>
                      
                      {/* Image Type Toggle */}
                      <div className="flex space-x-2 mb-3">
                        <button
                          type="button"
                          onClick={() => handleImageTypeChange('url')}
                          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${imageInputType === 'url' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                          Image URL
                        </button>
                        <button
                          type="button"
                          onClick={() => handleImageTypeChange('file')}
                          className={`px-3 py-1.5 text-xs rounded-lg transition-colors ${imageInputType === 'file' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                        >
                          Upload File
                        </button>
                      </div>

                      {/* Image URL Input */}
                      {imageInputType === 'url' && (
                        <div>
                          <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm xs:text-base focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="https://example.com/image.jpg"
                          />
                          <p className="mt-1 text-xs text-gray-400">Enter a direct image URL</p>
                        </div>
                      )}

                      {/* File Upload Input */}
                      {imageInputType === 'file' && (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm xs:text-base file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                          />
                          <p className="mt-1 text-xs text-gray-400">Upload an image file (JPG, PNG, etc.)</p>
                        </div>
                      )}

                      {/* Image Preview */}
                      {imagePreview && (
                        <div className="mt-3">
                          <p className="text-xs xs:text-sm font-medium text-gray-400 mb-2">Preview:</p>
                          {imagePreview === 'loading...' ? (
                            <div className="flex items-center justify-center p-4 bg-gray-700 rounded-lg border border-gray-600">
                              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
                              <span className="ml-2 text-gray-300 text-xs">Loading image...</span>
                            </div>
                          ) : imagePreview.startsWith('data:') || imagePreview.startsWith('http') ? (
                            <img 
                              src={imagePreview} 
                              alt="Preview" 
                              className="w-full h-32 object-cover rounded-lg border border-gray-600"
                            />
                          ) : (
                            <div className="p-3 bg-gray-700 rounded-lg border border-gray-600 text-gray-300 text-xs">
                              {imagePreview}
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Error Message */}
                    {error && (
                      <div className="p-3 rounded-lg bg-red-900/50 border border-red-500/30 text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-2 xs:space-x-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-3 xs:px-4 py-1.5 xs:py-2 bg-gray-600 text-gray-200 rounded hover:bg-gray-500 transition-colors text-xs xs:text-sm"
                        disabled={actionLoading}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={actionLoading}
                        className="px-3 xs:px-4 py-1.5 xs:py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs xs:text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {actionLoading ? (
                          <span className="flex items-center">
                            <div className="animate-spin rounded-full h-3 w-3 xs:h-4 xs:w-4 border-b-2 border-white mr-2"></div>
                            {modalMode === 'add' ? 'Adding...' : 'Updating...'}
                          </span>
                        ) : (
                          modalMode === 'add' ? 'Add Product' : 'Update Product'
                        )}
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