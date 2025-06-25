// // import { useState } from "react";
// // import productsData from '../../../../data/product.json'
// // import { Link } from "react-router-dom";

// // const Products = () => {
// //     // const [products, setProducts] = useState(productsData);
// //     const products = productsData
// //     const [searchTerm, setSearchTerm] = useState('');
// //     const [itemsPerPage, setItemsPerPage] = useState(12);
// //     const [sortBy, setSortBy] = useState('latest');
// //     const [filters, setFilters] = useState({
// //         categories: [],
// //         brands: [],
// //         packing: []
// //     });
// //     // Add new state for expanded filters and product status
// //     const [expandedFilters, setExpandedFilters] = useState({
// //         category: true,
// //         brand: true,
// //         packing: true
// //     });
// //     const [productStatus, setProductStatus] = useState({});

// //     // Filter products based on all criteria
// //     const filteredProducts = products.filter(product => {
// //         const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
// //         const matchesCategory = filters.categories.length === 0 ||
// //             filters.categories.includes(product.category);
// //         const matchesBrand = filters.brands.length === 0 ||
// //             filters.brands.includes(product.brand);
// //         const matchesPacking = filters.packing.length === 0 ||
// //             filters.packing.includes(product.packing);

// //         return matchesSearch && matchesCategory && matchesBrand && matchesPacking;
// //     });

// //     // Sort products
// //     const sortedProducts = [...filteredProducts].sort((a, b) => {
// //         switch (sortBy) {
// //             case 'latest':
// //                 return new Date(b.createdAt) - new Date(a.createdAt);
// //             case 'oldest':
// //                 return new Date(a.createdAt) - new Date(b.createdAt);
// //             case 'price-high':
// //                 return b.price - a.price;
// //             case 'price-low':
// //                 return a.price - b.price;
// //             default:
// //                 return 0;
// //         }
// //     });

// //     // Handle filter changes
// //     const handleFilterChange = (type, value) => {
// //         setFilters(prev => ({
// //             ...prev,
// //             [type]: prev[type].includes(value)
// //                 ? prev[type].filter(item => item !== value)
// //                 : [...prev[type], value]
// //         }));
// //     };

// //     // Handle items per page change
// //     const handleItemsPerPageChange = (e) => {
// //         setItemsPerPage(Number(e.target.value));
// //     };

// //     // Handle sort change
// //     const handleSortChange = (e) => {
// //         setSortBy(e.target.value);
// //     };

// //     // Add toggle functions
// //     const toggleFilter = (filterName) => {
// //         setExpandedFilters(prev => ({
// //             ...prev,
// //             [filterName]: !prev[filterName]
// //         }));
// //     };

// //     const toggleStatus = (productId) => {
// //         setProductStatus(prev => ({
// //             ...prev,
// //             [productId]: !prev[productId]
// //         }));
// //     };

// //     return (
// //         <div className="flex bg-gray-100 custom-container">
// //             <div className="flex flex-col bg-gray-100">
// //                 {/* Header */}
// //                 <header className="bg-orange-500 text-white px-6 py-4">
// //                     <h1 className="text-2xl font-bold">Products</h1>
// //                 </header>

// //                 {/* Main Content */}
// //                 <div className="container mx-auto p-4">
// //                     {/* Action Buttons */}
// //                     <div className="flex justify-between items-center mb-6">
// //                         <div className="flex space-x-4">
// //                             <Link to="/products/add-product"><button
// //                                 className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
// //                             >
// //                                 + Add Products
// //                             </button></Link>
// //                             {/* <button
// //                             className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
// //                         >
// //                             ☰ Sort Category
// //                         </button> */}
// //                         </div>

// //                         <div className="flex gap-4">
// //                             <select
// //                                 className="block w-32 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
// //                                 value={itemsPerPage}
// //                                 onChange={handleItemsPerPageChange}
// //                             >
// //                                 <option value="4">4</option>
// //                                 <option value="8">8</option>
// //                                 <option value="24">12</option>
// //                                 <option value="24">24</option>
// //                                 <option value="36">36</option>
// //                             </select>

// //                             <select
// //                                 className="block w-42 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
// //                                 value={sortBy}
// //                                 onChange={handleSortChange}
// //                             >
// //                                 <option value="latest">Latest</option>
// //                                 <option value="oldest">Oldest</option>
// //                                 <option value="price-high">Price High to Low</option>
// //                                 <option value="price-low">Price Low to High</option>
// //                             </select>

// //                             <div className="relative">
// //                                 <input
// //                                     type="text"
// //                                     placeholder="Search Product"
// //                                     className="block w-full font-medium pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
// //                                     value={searchTerm}
// //                                     onChange={(e) => setSearchTerm(e.target.value)}
// //                                 />
// //                                 <button className="absolute right-2 top-2">
// //                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
// //                                     </svg>
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>

// //                     {/* Content Grid with Sidebar and Products */}
// //                     <div className="flex gap-6">
// //                         {/* Filters Sidebar */}
// //                         <div className="w-1/5">
// //                             {/* Category Filter */}
// //                             <div className="bg-white rounded shadow mb-4">
// //                                 <div
// //                                     className="p-3 border-b flex justify-between items-center cursor-pointer"
// //                                     onClick={() => toggleFilter('category')}
// //                                 >
// //                                     <h3 className="font-semibold text-gray-700">Category</h3>
// //                                     <svg
// //                                         xmlns="http://www.w3.org/2000/svg"
// //                                         className={`h-5 w-5 text-gray-500 transform transition-transform ${expandedFilters.category ? 'rotate-180' : ''}`}
// //                                         viewBox="0 0 20 20"
// //                                         fill="currentColor"
// //                                     >
// //                                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
// //                                     </svg>
// //                                 </div>
// //                                 {expandedFilters.category && (
// //                                     <div className="p-3">
// //                                         <div className="space-y-2">
// //                                             <label className="flex items-center">
// //                                                 <input
// //                                                     type="checkbox"
// //                                                     className="mr-2"
// //                                                     checked={filters.categories.includes('Laser Welding Spares')}
// //                                                     onChange={() => handleFilterChange('categories', 'Laser Welding Spares')}
// //                                                 />
// //                                                 <span>Laser Welding Spares</span>
// //                                             </label>
// //                                             <label className="flex items-center">
// //                                                 <input
// //                                                     type="checkbox"
// //                                                     className="mr-2"
// //                                                     checked={filters.categories.includes('Laser Source Spares')}
// //                                                     onChange={() => handleFilterChange('categories', 'Laser Source Spares')}
// //                                                 />
// //                                                 <span>Laser Source Spares</span>
// //                                             </label>
// //                                             <label className="flex items-center">
// //                                                 <input
// //                                                     type="checkbox"
// //                                                     className="mr-2"
// //                                                     checked={filters.categories.includes('Air Plasma Cutting Spares')}
// //                                                     onChange={() => handleFilterChange('categories', 'Air Plasma Cutting Spares')}
// //                                                 />
// //                                                 <span>Air Plasma Cutting Spares</span>
// //                                             </label>
// //                                             <label className="flex items-center">
// //                                                 <input
// //                                                     type="checkbox"
// //                                                     className="mr-2"
// //                                                     checked={filters.categories.includes('Tig Welding Spares')}
// //                                                     onChange={() => handleFilterChange('categories', 'Tig Welding Spares')}
// //                                                 />
// //                                                 <span>Tig Welding Spares</span>
// //                                             </label>
// //                                         </div>
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             {/* Brand Filter */}
// //                             <div className="bg-white rounded shadow mb-4">
// //                                 <div
// //                                     className="p-3 border-b flex justify-between items-center cursor-pointer"
// //                                     onClick={() => toggleFilter('brand')}
// //                                 >
// //                                     <h3 className="font-semibold text-gray-700">Brand</h3>
// //                                     <svg
// //                                         xmlns="http://www.w3.org/2000/svg"
// //                                         className={`h-5 w-5 text-gray-500 transform transition-transform ${expandedFilters.brand ? 'rotate-180' : ''}`}
// //                                         viewBox="0 0 20 20"
// //                                         fill="currentColor"
// //                                     >
// //                                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
// //                                     </svg>
// //                                 </div>
// //                                 {expandedFilters.brand && (
// //                                     <div className="p-3">
// //                                         <label className="flex items-center">
// //                                             <input
// //                                                 type="checkbox"
// //                                                 className="mr-2"
// //                                                 checked={filters.brands.includes('Newtech')}
// //                                                 onChange={() => handleFilterChange('brands', 'Newtech')}
// //                                             />
// //                                             <span>Newtech</span>
// //                                         </label>
// //                                     </div>
// //                                 )}
// //                             </div>

// //                             {/* Packing Filter */}
// //                             <div className="bg-white rounded shadow">
// //                                 <div
// //                                     className="p-3 border-b flex justify-between items-center cursor-pointer"
// //                                     onClick={() => toggleFilter('packing')}
// //                                 >
// //                                     <h3 className="font-semibold text-gray-700">Packing</h3>
// //                                     <svg
// //                                         xmlns="http://www.w3.org/2000/svg"
// //                                         className={`h-5 w-5 text-gray-500 transform transition-transform ${expandedFilters.packing ? 'rotate-180' : ''}`}
// //                                         viewBox="0 0 20 20"
// //                                         fill="currentColor"
// //                                     >
// //                                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
// //                                     </svg>
// //                                 </div>
// //                                 {expandedFilters.packing && (
// //                                     <div className="p-3">
// //                                         <div className="space-y-2">
// //                                             <label className="flex items-center">
// //                                                 <input
// //                                                     type="checkbox"
// //                                                     className="mr-2"
// //                                                     checked={filters.packing.includes('5 Pcs')}
// //                                                     onChange={() => handleFilterChange('packing', '5 Pcs')}
// //                                                 />
// //                                                 <span>5 Pcs</span>
// //                                             </label>
// //                                             <label className="flex items-center">
// //                                                 <input
// //                                                     type="checkbox"
// //                                                     className="mr-2"
// //                                                     checked={filters.packing.includes('1 Pcs')}
// //                                                     onChange={() => handleFilterChange('packing', '1 Pcs')}
// //                                                 />
// //                                                 <span>1 Pcs</span>
// //                                             </label>
// //                                             <label className="flex items-center">
// //                                                 <input
// //                                                     type="checkbox"
// //                                                     className="mr-2"
// //                                                     checked={filters.packing.includes('10 Pcs')}
// //                                                     onChange={() => handleFilterChange('packing', '10 Pcs')}
// //                                                 />
// //                                                 <span>10 Pcs</span>
// //                                             </label>
// //                                         </div>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                         </div>

// //                         {/* Products Grid */}
// //                         <div className="w-4/5">
// //                             <div className="grid grid-cols-4 gap-4">
// //                                 {sortedProducts
// //                                     .slice(0, itemsPerPage)
// //                                     .map(product => (
// //                                         <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col h-full">
// //                                             <div className="relative group h-48 bg-gray-50 flex items-center justify-center p-4">
// //                                                 {product.discount !== "0% OFF" && (
// //                                                     <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
// //                                                         {product.discount}
// //                                                     </span>
// //                                                 )}
// //                                                 <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
// //                                                 <img
// //                                                     src={product.image}
// //                                                     alt={product.name}
// //                                                     className="max-h-full max-w-full object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out"
// //                                                 />
// //                                             </div>
// //                                             <div className="p-4 border-t flex-grow flex flex-col">
// //                                                 <h3 className="text-center text-blue-600 font-medium mb-3 hover:text-blue-700 transition-colors duration-200 truncate">
// //                                                     {product.name}
// //                                                 </h3>
// //                                                 <div className="flex justify-between items-center mt-auto">
// //                                                     <div>
// //                                                         <p className="text-gray-500 line-through text-sm">₹{product.originalPrice}</p>
// //                                                         <p className="text-gray-900 font-bold text-lg">₹{product.price}</p>
// //                                                     </div>
// //                                                     <div className="flex space-x-3 items-center">
// //                                                         <button className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-1 rounded-full hover:bg-blue-50">
// //                                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
// //                                                             </svg>
// //                                                         </button>
// //                                                         <button className="text-gray-600 hover:text-red-600 transition-colors duration-200 p-1 rounded-full hover:bg-red-50">
// //                                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
// //                                                             </svg>
// //                                                         </button>
// //                                                         <button
// //                                                             onClick={() => toggleStatus(product.id)}
// //                                                             className="relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none"
// //                                                         >
// //                                                             <div className={`w-11 h-6 rounded-full transition-colors duration-300 ease-in-out ${productStatus[product.id] ? 'bg-green-500' : 'bg-gray-200'}`}>
// //                                                                 <div className={`w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ease-in-out ${productStatus[product.id] ? 'translate-x-6' : 'translate-x-1'} mt-1`} />
// //                                                             </div>
// //                                                         </button>
// //                                                     </div>
// //                                                 </div>
// //                                             </div>
// //                                         </div>
// //                                     ))}
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Products;

// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import { fetchCategories } from '../../../redux/slices/Dashboard/Product_Config/categorySlice';
// // import productsData from '../../../../data/product.json'
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { deleteProduct, fetchProducts, updateProduct } from '../../../redux/slices/Dashboard/product/productSlice';
// import { fetchBrands } from '../../../redux/slices/Dashboard/Product_Config/brandSlice';

// const Products = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     // Fetch initial data
//     useEffect(() => {
//         dispatch(fetchCategories());
//         dispatch(fetchProducts());
//         dispatch(fetchBrands());
//     }, [dispatch]);

//     // State from Redux store
//     const { products, loading: productsLoading } = useSelector(state => state.products);
//     const { categories, loading: categoriesLoading } = useSelector(state => state.categories);
//     const { brands, loading: brandLoading } = useSelector(state => state.brand);
//     // Local state
//     const [searchTerm, setSearchTerm] = useState('');
//     const [itemsPerPage, setItemsPerPage] = useState(12);
//     const [sortBy, setSortBy] = useState('latest');
//     const [filters, setFilters] = useState({
//         categories: [],
//         subcategories: [],
//         brands: [],
//     });
//     console.log(filters)
//     const [expandedFilters, setExpandedFilters] = useState({
//         category: true,
//         subcategory: false,
//         brand: true,
//     });
//     const [productStatus, setProductStatus] = useState({});

//     // Initialize product status when products load
//     useEffect(() => {
//         if (products.length > 0) {
//             const statusMap = {};
//             products.forEach(product => {
//                 statusMap[product._id] = product.status || false;
//             });
//             setProductStatus(statusMap);
//         }
//     }, [products]);

//     // Filter helpers
//     const mainCategories = categories.filter(
//         cat => cat.parent === "N/A" && cat.status === true
//     );

//     const getSubcategories = () => {
//         if (filters.categories.length === 0) return [];
//         return categories.filter(
//             cat => cat.parent === filters.categories[0] && cat.status === true
//         );
//     };

//     const getBrands = () => {
//         if (filters.categories.length === 0) return [];
//         return brands.filter(
//             brand => brand && brand.parent === filters.categories[0] && brand.status === true
//         );
//     };

//     const filteredProducts = products.filter(product => {
//         const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
//         const matchesCategory = filters.categories.length === 0 ||
//             (product.category && filters.categories.includes(product.category.name));
//         const matchesSubcategory = filters.subcategories.length === 0 ||
//             (product.subcategory && filters.subcategories.includes(product.subcategory.name));
//         const matchesBrand = filters.brands.length === 0 ||
//             (product.brand && filters.brands.includes(product.brand.name));
//         return matchesSearch && matchesCategory && matchesSubcategory && matchesBrand;
//     });

//     const sortedProducts = [...filteredProducts].sort((a, b) => {
//         switch (sortBy) {
//             case 'latest':
//                 return new Date(b.createdAt) - new Date(a.createdAt);
//             case 'oldest':
//                 return new Date(a.createdAt) - new Date(b.createdAt);
//             case 'price-high':
//                 return b.price - a.price;
//             case 'price-low':
//                 return a.price - b.price;
//             case 'A-Z':
//                 return a.name - b.name;
//             case 'Z-A':
//                 return b.name - a.name;
//             default:
//                 return 0;
//         }
//     });

//     // Handlers
//     const handleEdit = (id) => {
//         navigate(`/products/edit-product/${id}`);
//     };

//     const handleDelete = async (id) => {
//         try {
//             await dispatch(deleteProduct(id)).then(() => {
//                 toast.success("Product Deleted Success")
//             }).catch((err) => {
//                 toast.error(err.message)
//             })
//             dispatch(fetchProducts());
//         } catch (error) {
//             console.error('Error deleting product:', error);
//             toast.error(error.message)
//         }
//     };

//     const handleCategoryChange = (category) => {
//         setFilters(prev => ({
//             ...prev,
//             categories: prev.categories.includes(category) ? [] : [category],
//             subcategories: []
//         }));

//         if (!filters.categories.includes(category)) {
//             setExpandedFilters(prev => ({
//                 ...prev,
//                 subcategory: true
//             }));
//         }
//     };

//     const handleSubcategoryChange = (subcategory) => {
//         setFilters(prev => ({
//             ...prev,
//             subcategories: prev.subcategories.includes(subcategory)
//                 ? prev.subcategories.filter(item => item !== subcategory)
//                 : [...prev.subcategories, subcategory]
//         }));
//     };

//     const handleFilterChange = (type, value) => {
//         setFilters(prev => ({
//             ...prev,
//             [type]: prev[type].includes(value)
//                 ? prev[type].filter(item => item !== value)
//                 : [...prev[type], value]
//         }));
//     };

//     const handleItemsPerPageChange = (e) => {
//         setItemsPerPage(Number(e.target.value));
//     };

//     const handleSortChange = (e) => {
//         setSortBy(e.target.value);
//     };

//     const toggleFilter = (filterName) => {
//         setExpandedFilters(prev => ({
//             ...prev,
//             [filterName]: !prev[filterName]
//         }));
//     };

//     const toggleStatus = async (productId) => {
//         try {
//             const newStatus = !productStatus[productId];
//             // Optimistic UI update
//             setProductStatus(prev => ({
//                 ...prev,
//                 [productId]: newStatus
//             }));

//             const updatedStatus = products.find((cat) => cat._id === productId);
//             const updateData = { ...updatedStatus, status: newStatus }
//             console.log(updateData)
//             // Update in database
//             await dispatch(updateProduct({ id: productId, updatedData: updateData })).then(() => {
//                 toast.success("Status Updated Success");
//             }).catch((err) => {
//                 toast.error(err.message)
//             })

//         } catch (error) {
//             console.error('Failed to update product status:', error);
//             // Revert UI if update fails
//             setProductStatus(prev => ({
//                 ...prev,
//                 [productId]: !prev[productId]
//             }));
//             toast.error(error.message);
//         }
//     };

//     if (productsLoading || categoriesLoading || brandLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <span class="loader"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="flex bg-gray-100 custom-container">
//             <div className="flex flex-col bg-gray-100 w-full">
//                 {/* Header */}
//                 <header className="bg-orange-500 text-white px-6 py-4">
//                     <h1 className="text-2xl font-bold">Products</h1>
//                 </header>

//                 {/* Main Content */}
//                 <div className="container mx-auto p-4">
//                     {/* Action Buttons */}
//                     <div className="flex justify-between items-center mb-6">
//                         <div className="flex space-x-4">
//                             <Link to="/products/add-product">
//                                 <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
//                                     + Add Products
//                                 </button>
//                             </Link>
//                         </div>

//                         <div className="flex gap-4">
//                             <select
//                                 className="block w-32 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                                 value={itemsPerPage}
//                                 onChange={handleItemsPerPageChange}
//                             >
//                                 <option value="3">3</option>
//                                 <option value="6">6</option>
//                                 <option value="9">9</option>
//                                 <option value="12">12</option>
//                                 <option value="24">24</option>
//                                 <option value="36">36</option>
//                             </select>

//                             <select
//                                 className="block w-42 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                                 value={sortBy}
//                                 onChange={handleSortChange}
//                             >
//                                 <option value="latest">Latest</option>
//                                 <option value="oldest">Oldest</option>
//                                 <option value="price-high">Price High to Low</option>
//                                 <option value="price-low">Price Low to High</option>
//                                 <option value="A-Z">Name A to Z</option>
//                                 <option value="Z-A">Name Z to A</option>
//                             </select>

//                             <div className="relative">
//                                 <input
//                                     type="text"
//                                     placeholder="Search Product"
//                                     className="block w-full font-medium pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                                     value={searchTerm}
//                                     onChange={(e) => setSearchTerm(e.target.value)}
//                                 />
//                                 <button className="absolute right-2 top-2">
//                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                                     </svg>
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Content Grid with Sidebar and Products */}
//                     <div className="flex gap-6">
//                         {/* Filters Sidebar */}
//                         <div className="w-1/5">
//                             {/* Category Filter */}
//                             <div className="bg-white rounded shadow mb-4">
//                                 <div
//                                     className="p-3 border-b flex justify-between items-center cursor-pointer"
//                                     onClick={() => toggleFilter('category')}
//                                 >
//                                     <h3 className="font-semibold text-gray-700">Category</h3>
//                                     <svg
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         className={`h-5 w-5 text-gray-500 transform transition-transform ${expandedFilters.category ? 'rotate-180' : ''}`}
//                                         viewBox="0 0 20 20"
//                                         fill="currentColor"
//                                     >
//                                         <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                                     </svg>
//                                 </div>
//                                 {expandedFilters.category && (
//                                     <div className="p-3">
//                                         <div className="space-y-2">
//                                             {mainCategories.map(category => (
//                                                 <label key={category._id} className="flex items-center">
//                                                     <input
//                                                         type="checkbox"
//                                                         name="category"
//                                                         className="mr-2"
//                                                         checked={filters.categories.includes(category.name)}
//                                                         onChange={() => handleCategoryChange(category.name)}
//                                                     />
//                                                     <span>{category.name}</span>
//                                                 </label>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>

//                             {/* Subcategory Filter */}
//                             {filters.categories.length > 0 && (
//                                 <div className="bg-white rounded shadow mb-4">
//                                     <div
//                                         className="p-3 border-b flex justify-between items-center cursor-pointer"
//                                         onClick={() => toggleFilter('subcategory')}
//                                     >
//                                         <h3 className="font-semibold text-gray-700">Subcategory</h3>
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className={`h-5 w-5 text-gray-500 transform transition-transform ${expandedFilters.subcategory ? 'rotate-180' : ''}`}
//                                             viewBox="0 0 20 20"
//                                             fill="currentColor"
//                                         >
//                                             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                                         </svg>
//                                     </div>
//                                     {expandedFilters.subcategory && (
//                                         <div className="p-3">
//                                             <div className="space-y-2">
//                                                 {getSubcategories().map(subcategory => (
//                                                     <label key={subcategory._id} className="flex items-center">
//                                                         <input
//                                                             type="checkbox"
//                                                             className="mr-2"
//                                                             checked={filters.subcategories.includes(subcategory.name)}
//                                                             onChange={() => handleSubcategoryChange(subcategory.name)}
//                                                         />
//                                                         <span>{subcategory.name}</span>
//                                                     </label>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}

//                             {/* Brand Filter */}
//                             {filters.categories.length > 0 && (
//                                 <div className="bg-white rounded shadow mb-4">
//                                     <div
//                                         className="p-3 border-b flex justify-between items-center cursor-pointer"
//                                         onClick={() => toggleFilter('brand')}
//                                     >
//                                         <h3 className="font-semibold text-gray-700">Brands</h3>
//                                         <svg
//                                             xmlns="http://www.w3.org/2000/svg"
//                                             className={`h-5 w-5 text-gray-500 transform transition-transform ${expandedFilters.brand ? 'rotate-180' : ''}`}
//                                             viewBox="0 0 20 20"
//                                             fill="currentColor"
//                                         >
//                                             <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                                         </svg>
//                                     </div>
//                                     {expandedFilters.brand && (
//                                         <div className="p-3">
//                                             <div className="space-y-2">
//                                                 {getBrands().map(brand => (
//                                                     <label key={brand._id} className="flex items-center">
//                                                         <input
//                                                             type="checkbox"
//                                                             className="mr-2"
//                                                             checked={filters.brands.includes(brand.name)}
//                                                             onChange={() => handleFilterChange('brands', brand.name)}
//                                                         />
//                                                         <span>{brand.name}</span>
//                                                     </label>
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>

//                         {/* Products Grid */}
//                         <div className="w-full">
//                             {sortedProducts.length === 0 ? (
//                                 <div className="bg-white rounded-lg shadow p-8 text-center">
//                                     <h3 className="text-xl font-semibold text-gray-700 mb-2">No products found</h3>
//                                     <p className="text-gray-500">Try adjusting your search or filters</p>
//                                 </div>
//                             ) : (
//                                 <div className="flex flex-wrap justify-start gap-6 overflow-hidden">
//                                     {sortedProducts.slice(0, itemsPerPage).map((product) => (
//                                         <div
//                                             key={product._id}
//                                             className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col w-[300px] h-[520px]"
//                                         >
//                                             <div className="relative group h-90 bg-gray-50 flex items-center justify-center overflow-hidden">
//                                                 {product.discount !== "0% OFF" && (
//                                                     <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
//                                                         {product.discount}% OFF
//                                                     </span>
//                                                 )}
//                                                 <img
//                                                     src={product.thumbnail}
//                                                     alt={product.name}
//                                                     className=" w-full h-full object-contain p-5 overflow-hidden transform group-hover:scale-110 transition-transform duration-500 ease-out"
//                                                 />
//                                             </div>
//                                             <div className="p-4 border-t flex-grow flex flex-col">
//                                                 <h3 className="text-center text-blue-600 font-semibold mb-1 hover:text-blue-700 transition-colors duration-200 truncate">
//                                                     {product.name}
//                                                 </h3>
//                                                 <h4 className="text-center text-gray-500 font-medium mb-1">
//                                                     <span className='font-bold text-gray-700'>Brand:</span> {product.name}
//                                                 </h4>

//                                                 <div className="flex justify-between items-center mt-auto">
//                                                     <div>
//                                                         <p className="text-gray-500 line-through text-sm">₹{product.mrp}</p>
//                                                         <p className="text-gray-900 font-bold text-xl">₹{product.price}</p>
//                                                     </div>
//                                                     <div className="flex space-x-3 items-center">
//                                                         <button
//                                                             onClick={() => handleEdit(product._id)}
//                                                             className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
//                                                             aria-label="Edit product"
//                                                         >
//                                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                                                             </svg>
//                                                         </button>
//                                                         <button
//                                                             onClick={() => handleDelete(product._id)}
//                                                             className="text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
//                                                             aria-label="Delete product"
//                                                         >
//                                                             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                                                             </svg>
//                                                         </button>
//                                                         <div className="flex items-center">
//                                                             {/* <span className={`mr-2 text-xs font-medium ${productStatus[product._id] ? 'text-green-600' : 'text-gray-500'
//                                                                 }`}>
//                                                                 {productStatus[product._id] ? 'Active' : 'Inactive'}
//                                                             </span> */}
//                                                             <button
//                                                                 onClick={() => toggleStatus(product._id)}
//                                                                 className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none ${productStatus[product._id] ? 'bg-green-500' : 'bg-gray-200'}`}
//                                                                 aria-label="Toggle product status"
//                                                             >
//                                                                 <span
//                                                                     className={`${productStatus[product._id] ? 'translate-x-6' : 'translate-x-1'
//                                                                         } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
//                                                                 />
//                                                             </button>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Products;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchCategories } from "../../../redux/slices/Dashboard/Product_Config/categorySlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../../redux/slices/Dashboard/product/productSlice";
import { fetchBrands } from "../../../redux/slices/Dashboard/Product_Config/brandSlice";
import { fetchSubAdmins } from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { getUsers } from "../../../redux/slices/auth/userSlice";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [canEdit, setCanEdit] = useState(true);
  const [canDelete, setCanDelete] = useState(true);
  const [canCreate, setCanCreate] = useState(true);
  const [canActive, setCanActive] = useState(true);
  const [userId, setUserId] = useState();

  // Fetch initial data
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchBrands());
    dispatch(fetchSubAdmins());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem("AdminId");
    setUserId(userId);
  }, []);

  const { list } = useSelector((state) => state.subAdmins);
  const { users } = useSelector((state) => state.user);

  const cleanUserId = String(userId).replace(/[^a-zA-Z0-9]/g, ""); // removes ;, spaces, etc.

  const findUser = users.find((user) => String(user._id) === cleanUserId);
  //   console.log(findUser);

  useEffect(() => {
    if (
      list &&
      list.length > 0 &&
      findUser &&
      findUser.role !== "super-admin"
    ) {
      const currentSubAdmin = list.find((sub) => sub.email === findUser.email);
      console.log(currentSubAdmin);
      if (currentSubAdmin) {
        const permissions = currentSubAdmin.permissions?.product_config;
        setCanCreate(permissions?.create ?? false);
        setCanEdit(permissions?.edit ?? false);
        setCanDelete(permissions?.delete ?? false);
        setCanActive(permissions?.active ?? false);
      }
    } else if (findUser) {
      // fallback for super-admin or if currentSubAdmin not found
      setCanCreate(true);
      setCanEdit(true);
      setCanDelete(true);
      setCanActive(true);
    }
  }, [list, findUser]);

  // State from Redux store
  const { products, loading: productsLoading } = useSelector(
    (state) => state.products
  );
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );
  const { brands, loading: brandLoading } = useSelector((state) => state.brand);

  // Local state
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState("latest");

  const [filters, setFilters] = useState({
    categories: [],
    subcategories: [],
    brands: [],
  });

  const [expandedFilters, setExpandedFilters] = useState({
    category: true,
    subcategory: false,
    brand: true,
  });
  const [productStatus, setProductStatus] = useState({});

  // Reset to page 1 when filters/sorting changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage, sortBy, filters]);

  // Initialize product status when products load
  useEffect(() => {
    if (products.length > 0) {
      const statusMap = {};
      products.forEach((product) => {
        statusMap[product._id] = product.status || false;
      });
      setProductStatus(statusMap);
    }
  }, [products]);

  // Filter helpers
  const mainCategories = categories.filter(
    (cat) => cat.parent === "N/A" && cat.status === true
  );

  const getSubcategories = () => {
    if (filters.categories.length === 0) return [];
    return categories.filter(
      (cat) => cat.parent === filters.categories[0] && cat.status === true
    );
  };

  const getBrands = () => {
    if (filters.categories.length === 0) return [];
    return brands.filter(
      (brand) =>
        brand && brand.parent === filters.categories[0] && brand.status === true
    );
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filters.categories.length === 0 ||
      (product.category && filters.categories.includes(product.category.name));
    const matchesSubcategory =
      filters.subcategories.length === 0 ||
      (product.subcategory &&
        filters.subcategories.includes(product.subcategory.name));
    const matchesBrand =
      filters.brands.length === 0 ||
      (product.brand && filters.brands.includes(product.brand.name));
    return (
      matchesSearch && matchesCategory && matchesSubcategory && matchesBrand
    );
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "latest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "oldest":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "price-high":
        return b.price - a.price;
      case "price-low":
        return a.price - b.price;
      case "A-Z":
        return a.name.localeCompare(b.name);
      case "Z-A":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Pagination calculations
  const totalItems = sortedProducts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Pagination component
  const Pagination = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Maximum number of visible page buttons

    let startPage, endPage;
    if (totalPages <= maxVisiblePages) {
      startPage = 1;
      endPage = totalPages;
    } else {
      const maxPagesBeforeCurrent = Math.floor(maxVisiblePages / 2);
      const maxPagesAfterCurrent = Math.ceil(maxVisiblePages / 2) - 1;

      if (currentPage <= maxPagesBeforeCurrent) {
        startPage = 1;
        endPage = maxVisiblePages;
      } else if (currentPage + maxPagesAfterCurrent >= totalPages) {
        startPage = totalPages - maxVisiblePages + 1;
        endPage = totalPages;
      } else {
        startPage = currentPage - maxPagesBeforeCurrent;
        endPage = currentPage + maxPagesAfterCurrent;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <div className="flex justify-center mt-8">
        <nav className="inline-flex rounded-md shadow">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded-l-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => setCurrentPage(1)}
                className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="px-3 py-1 border-t border-b border-gray-300 bg-white">
                  ...
                </span>
              )}
            </>
          )}

          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`px-3 py-1 border-t border-b border-gray-300 ${
                currentPage === number
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-500 hover:bg-gray-50"
              }`}
            >
              {number}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-3 py-1 border-t border-b border-gray-300 bg-white">
                  ...
                </span>
              )}
              <button
                onClick={() => setCurrentPage(totalPages)}
                className="px-3 py-1 border-t border-b border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded-r-md border border-gray-300 bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </nav>

        <div className="ml-4 flex items-center text-sm text-gray-500">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)}{" "}
          of {totalItems} products
        </div>
      </div>
    );
  };

  // Handlers
  const handleEdit = (id) => {
    navigate(`/products/edit-product/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await dispatch(deleteProduct(id))
        .then(() => {
          toast.success("Product Deleted Success");
        })
        .catch((err) => {
          toast.error(err.message);
        });
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(error.message);
    }
  };

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category) ? [] : [category],
      subcategories: [],
    }));

    if (!filters.categories.includes(category)) {
      setExpandedFilters((prev) => ({
        ...prev,
        subcategory: true,
      }));
    }
  };

  const handleSubcategoryChange = (subcategory) => {
    setFilters((prev) => ({
      ...prev,
      subcategories: prev.subcategories.includes(subcategory)
        ? prev.subcategories.filter((item) => item !== subcategory)
        : [...prev.subcategories, subcategory],
    }));
  };

  const handleFilterChange = (type, value) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const toggleFilter = (filterName) => {
    setExpandedFilters((prev) => ({
      ...prev,
      [filterName]: !prev[filterName],
    }));
  };

  const toggleStatus = async (productId) => {
    try {
      const newStatus = !productStatus[productId];
      // Optimistic UI update
      setProductStatus((prev) => ({
        ...prev,
        [productId]: newStatus,
      }));

      const updatedStatus = products.find((cat) => cat._id === productId);
      const updateData = { ...updatedStatus, status: newStatus };
      console.log(updateData);
      // Update in database
      await dispatch(updateProduct({ id: productId, updatedData: updateData }))
        .then(() => {
          toast.success("Status Updated Success");
        })
        .catch((err) => {
          toast.error(err.message);
        });
    } catch (error) {
      console.error("Failed to update product status:", error);
      // Revert UI if update fails
      setProductStatus((prev) => ({
        ...prev,
        [productId]: !prev[productId],
      }));
      toast.error(error.message);
    }
  };

  if (productsLoading || categoriesLoading || brandLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 custom-container">
      <div className="flex flex-col bg-gray-100 w-full">
        {/* Header */}
        <header className="bg-orange-500 text-white px-6 py-4">
          <h1 className="text-2xl font-bold">Products</h1>
        </header>

        {/* Main Content */}
        <div className="container p-4">
          {/* Action Buttons */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              {canCreate && (
                <Link to="/products/add-product">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                    + Add Products
                  </button>
                </Link>
              )}
            </div>

            <div className="flex gap-4">
              <select
                className="block w-32 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
                <option value="12">12</option>
                <option value="24">24</option>
                <option value="36">36</option>
              </select>

              <select
                className="block w-42 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                value={sortBy}
                onChange={handleSortChange}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="price-high">Price High to Low</option>
                <option value="price-low">Price Low to High</option>
                <option value="A-Z">Name A to Z</option>
                <option value="Z-A">Name Z to A</option>
              </select>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Product"
                  className="block w-full font-medium pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="absolute right-2 top-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Content Grid with Sidebar and Products */}
          <div className="flex gap-6">
            {/* Filters Sidebar */}
            <div className="w-1/5">
              {/* Category Filter */}
              <div className="bg-white rounded shadow mb-4">
                <div
                  className="p-3 border-b flex justify-between items-center cursor-pointer"
                  onClick={() => toggleFilter("category")}
                >
                  <h3 className="font-semibold text-gray-700">Category</h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 text-gray-500 transform transition-transform ${
                      expandedFilters.category ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {expandedFilters.category && (
                  <div className="p-3">
                    <div className="space-y-2">
                      {mainCategories.map((category) => (
                        <label key={category._id} className="flex items-center">
                          <input
                            type="checkbox"
                            name="category"
                            className="mr-2"
                            checked={filters.categories.includes(category.name)}
                            onChange={() => handleCategoryChange(category.name)}
                          />
                          <span>{category.name}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Subcategory Filter */}
              {filters.categories.length > 0 && (
                <div className="bg-white rounded shadow mb-4">
                  <div
                    className="p-3 border-b flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFilter("subcategory")}
                  >
                    <h3 className="font-semibold text-gray-700">Subcategory</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${
                        expandedFilters.subcategory ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {expandedFilters.subcategory && (
                    <div className="p-3">
                      <div className="space-y-2">
                        {getSubcategories().map((subcategory) => (
                          <label
                            key={subcategory._id}
                            className="flex items-center"
                          >
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={filters.subcategories.includes(
                                subcategory.name
                              )}
                              onChange={() =>
                                handleSubcategoryChange(subcategory.name)
                              }
                            />
                            <span>{subcategory.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Brand Filter */}
              {filters.categories.length > 0 && (
                <div className="bg-white rounded shadow mb-4">
                  <div
                    className="p-3 border-b flex justify-between items-center cursor-pointer"
                    onClick={() => toggleFilter("brand")}
                  >
                    <h3 className="font-semibold text-gray-700">Brands</h3>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${
                        expandedFilters.brand ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  {expandedFilters.brand && (
                    <div className="p-3">
                      <div className="space-y-2">
                        {getBrands().map((brand) => (
                          <label key={brand._id} className="flex items-center">
                            <input
                              type="checkbox"
                              className="mr-2"
                              checked={filters.brands.includes(brand.name)}
                              onChange={() =>
                                handleFilterChange("brands", brand.name)
                              }
                            />
                            <span>{brand.name}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="w-full">
              {currentItems.length === 0 ? (
                <div className="bg-white rounded-lg shadow p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filters
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-wrap justify-start gap-6 overflow-hidden">
                    {currentItems.map((product) => (
                      <div
                        key={product._id}
                        className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col w-[282px] w-xl-[300px] h-[520px]"
                      >
                        <div className="relative group h-90 bg-gray-50 flex items-center justify-center overflow-hidden">
                          {product.discount !== "0% OFF" && (
                            <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                              {product.discount}% OFF
                            </span>
                          )}
                          <img
                            src={product.thumbnail}
                            alt={product.name}
                            className="w-full h-full object-contain p-5 overflow-hidden transform group-hover:scale-110 transition-transform duration-500 ease-out"
                          />
                        </div>
                        <div className="p-4 border-t flex-grow flex flex-col">
                          <h3 className="text-center text-blue-600 font-semibold mb-1 hover:text-blue-700 transition-colors duration-200 truncate">
                            {product.name}
                          </h3>
                          <h4 className="text-center text-gray-500 font-medium mb-1">
                            <span className="font-bold text-gray-700">
                              Brand:
                            </span>{" "}
                            {product.brand?.name || "N/A"}
                          </h4>

                          <div className="flex justify-between items-center mt-auto">
                            <div>
                              <p className="text-gray-500 line-through text-sm">
                                ₹{product.mrp}
                              </p>
                              <p className="text-gray-900 font-bold text-xl">
                                ₹{product.price}
                              </p>
                            </div>
                            <div className="flex space-x-3 items-center">
                              {canEdit && (
                                <button
                                  onClick={() => handleEdit(product._id)}
                                  className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-50"
                                  aria-label="Edit product"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                    />
                                  </svg>
                                </button>
                              )}
                              {canDelete && (
                                <button
                                  onClick={() => handleDelete(product._id)}
                                  className="text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-red-50"
                                  aria-label="Delete product"
                                >
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                  </svg>
                                </button>
                              )}
                              {canActive && (
                                <div className="flex items-center">
                                  <button
                                    onClick={() => toggleStatus(product._id)}
                                    className={`relative inline-flex items-center h-6 rounded-full w-11 focus:outline-none ${
                                      productStatus[product._id]
                                        ? "bg-green-500"
                                        : "bg-gray-200"
                                    }`}
                                    aria-label="Toggle product status"
                                  >
                                    <span
                                      className={`${
                                        productStatus[product._id]
                                          ? "translate-x-6"
                                          : "translate-x-1"
                                      } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
                                    />
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {totalPages > 1 && <Pagination />}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Products;
