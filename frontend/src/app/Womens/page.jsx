// "use client";

// import React, { useEffect, useMemo, useState } from 'react';
// import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
// import { useDispatch, useSelector } from 'react-redux';
// import ArrivalCard from '@/components/ArrivalCard';
// import Header from '@/components/Header';
// import Footer from '@/components/Footer';
// import Slider from 'rc-slider';
// import 'rc-slider/assets/index.css';
// import { useRouter, useSearchParams } from 'next/navigation';
// import { toast, ToastContainer } from 'react-toastify';
// import { fetchBrands, fetchCategories, fetchProducts } from '@/redux/slice/CollectionSlice';

// const Mens = () => {
//     // Get data from Redux store
//     const { products, loading: Loading } = useSelector((state) => state.Collection);
//     const { categories, loading: CatLoading } = useSelector((state) => state.Collection);
//     const { brands, loading: brdLoading } = useSelector((state) => state.Collection);

//     const sortedProducts = [...products].sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
//     const data = sortedProducts;


//     const [collection, setCollection] = useState(true);
//     const [product, setProductData] = useState([]);
//     const [wishProduct, setwishProductData] = useState([]);

//     const router = useRouter();
//     const dispatch = useDispatch();

//     // Filter states
//     const [showFilters, setShowFilters] = useState(false);
//     const [priceRange, setPriceRange] = useState([0, 200000]);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//     const [selectedBrands, setSelectedBrands] = useState([]);
//     const [sortBy, setSortBy] = useState('');
//     const [appliedFilters, setAppliedFilters] = useState([]);
//     const [minPrice, setMinPrice] = useState(0);
//     const [maxPrice, setMaxPrice] = useState(200000);

//     // Dropdown states
//     const [dropdownOpen, setDropdownOpen] = useState({
//         categories: true,
//         subcategories: true,
//         brands: true
//     });

//     const searchParams = useSearchParams();

//     useEffect(() => {
//         // Only fetch if data is not already loaded
//         const fetchInitialData = async () => {
//             try {
//                 if (products.length === 0) await dispatch(fetchProducts());
//                 if (categories.length === 0) await dispatch(fetchCategories());
//                 if (brands.length === 0) await dispatch(fetchBrands());
//             } catch (error) {
//                 console.error("Error fetching initial data:", error);
//             }
//         };

//         fetchInitialData();
//     }, [dispatch]); // Only run once on mount

//     // Replace your URL parameter handling useEffect with this:
//     useEffect(() => {
//         const categoryParam = searchParams.get('category');
//         const subcategoryParam = searchParams.get('subcategory');

//         // Only update if params have actually changed
//         if (categoryParam || subcategoryParam) {
//             const newCategories = categoryParam ? [categoryParam] : [];
//             const newSubcategories = subcategoryParam ? [subcategoryParam] : [];

//             // Find parent category if only subcategory is specified
//             if (subcategoryParam && !categoryParam) {
//                 const parentCategory = categories.find(cat =>
//                     cat.subcategories?.some(sub => sub.name === subcategoryParam)
//                 )?.name;
//                 if (parentCategory) {
//                     newCategories.push(parentCategory);
//                 }
//             }

//             setSelectedCategories(newCategories);
//             setSelectedSubcategories(newSubcategories);
//         }
//     }, [searchParams, categories]); // Only run when these dependencies change


//     useEffect(() => {
//         if (!data) return;

//         // First filter active products
//         const baseFilteredProducts = data.filter(product => product.status === true);

//         // Then apply all filters
//         const filtered = baseFilteredProducts.filter(product => {
//             // Category filter
//             if (selectedCategories.length > 0 &&
//                 (!product.category?.name || !selectedCategories.includes(product.category.name))) {
//                 return false;
//             }

//             // Subcategory filter
//             if (selectedSubcategories.length > 0 &&
//                 (!product.subcategory?.name || !selectedSubcategories.includes(product.subcategory.name))) {
//                 return false;
//             }

//             // Brand filter
//             if (selectedBrands.length > 0 &&
//                 (!product.brand?.name || !selectedBrands.includes(product.brand.name))) {
//                 return false;
//             }

//             // Price filter
//             if (typeof product.price !== 'number' ||
//                 product.price < priceRange[0] ||
//                 product.price > priceRange[1]) {
//                 return false;
//             }

//             return true;
//         });

//         // Apply sorting if needed
//         const sorted = [...filtered];
//         if (sortBy) {
//             sorted.sort((a, b) => {
//                 if (sortBy === 'a-z') return (a.name || '').localeCompare(b.name || '');
//                 if (sortBy === 'z-a') return (b.name || '').localeCompare(a.name || '');
//                 if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
//                 if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
//                 if (sortBy === 'newest') return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
//                 if (sortBy === 'oldest') return new Date(a.updatedAt || 0) - new Date(b.updatedAt || 0);
//                 return 0;
//             });
//         }

//         // Only update state if products changed
//         // setProductData(prev => {
//         //     if (prev.length !== sorted.length ||
//         //         prev.some((p, i) => p._id !== sorted[i]?._id)) {
//         //         return sorted;
//         //     }
//         //     return prev;
//         // });

//         setProductData(prev => {
//             if (prev.length !== sorted.length ||
//                 !prev.every((p, i) => p._id === sorted[i]?._id)) {
//                 return sorted;
//             }
//             return prev;
//         });

//         // Update applied filters
//         const newAppliedFilters = [];
//         if (selectedCategories.length > 0) newAppliedFilters.push(`Categories: ${selectedCategories.join(', ')}`);
//         if (selectedSubcategories.length > 0) newAppliedFilters.push(`Subcategories: ${selectedSubcategories.join(', ')}`);
//         if (selectedBrands.length > 0) newAppliedFilters.push(`Brands: ${selectedBrands.join(', ')}`);
//         if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
//             newAppliedFilters.push(`Price: ₹${priceRange[0]} - ₹${priceRange[1]}`);
//         }
//         if (sortBy) newAppliedFilters.push(`Sort: ${getSortLabel(sortBy)}`);


//         // setAppliedFilters(newAppliedFilters);
//         setAppliedFilters(prev => {
//             if (prev.length !== newAppliedFilters.length ||
//                 !prev.every((f, i) => f === newAppliedFilters[i])) {
//                 return newAppliedFilters;
//             }
//             return prev;
//         });

//     }, [data, selectedCategories, selectedSubcategories, selectedBrands, priceRange, sortBy, minPrice, maxPrice]);

//     const getSortLabel = (value) => {
//         switch (value) {
//             case 'a-z': return 'A-Z';
//             case 'z-a': return 'Z-A';
//             case 'price-low': return 'Price: Low to High';
//             case 'price-high': return 'Price: High to Low';
//             case 'newest': return 'Newest First';
//             case 'oldest': return 'Oldest First';
//             default: return '';
//         }
//     };

//     const toggleCategory = (category) => {
//         if (selectedCategories.includes(category)) {
//             setSelectedCategories(selectedCategories.filter(c => c !== category));
//             // Remove subcategories when parent category is deselected
//             const subcatsToRemove = categories
//                 .filter(cat => cat.parent === category)
//                 .map(cat => cat.name);
//             setSelectedSubcategories(prev =>
//                 prev.filter(sc => !subcatsToRemove.includes(sc))
//             );
//         } else {
//             setSelectedCategories([...selectedCategories, category]);
//         }
//     };

//     const toggleSubcategory = (subcategory) => {
//         if (selectedSubcategories.includes(subcategory)) {
//             setSelectedSubcategories(selectedSubcategories.filter(sc => sc !== subcategory));
//         } else {
//             setSelectedSubcategories([...selectedSubcategories, subcategory]);
//         }
//     };

//     const toggleBrand = (brand) => {
//         if (selectedBrands.includes(brand)) {
//             setSelectedBrands(selectedBrands.filter(b => b !== brand));
//         } else {
//             setSelectedBrands([...selectedBrands, brand]);
//         }
//     };

//     const toggleDropdown = (dropdown) => {
//         setDropdownOpen(prev => ({
//             ...prev,
//             [dropdown]: !prev[dropdown]
//         }));
//     };

//     const clearAllFilters = () => {
//         setSelectedCategories([]);
//         setSelectedSubcategories([]);
//         setSelectedBrands([]);
//         setPriceRange([minPrice, maxPrice]);
//         setSortBy('');
//     };

//     const removeFilter = (index) => {
//         const filterText = appliedFilters[index];

//         if (filterText.startsWith('Categories:')) {
//             setSelectedCategories([]);
//             setSelectedSubcategories([]);
//         } else if (filterText.startsWith('Subcategories:')) {
//             setSelectedSubcategories([]);
//         } else if (filterText.startsWith('Brands:')) {
//             setSelectedBrands([]);
//         } else if (filterText.startsWith('Price:')) {
//             setPriceRange([maxPrice, minPrice]);
//         } else if (filterText.startsWith('Sort:')) {
//             setSortBy('');
//         }
//     };

//     // Get parent categories (categories without parents)
//     const parentCategories = categories?.filter(cat => cat.parent == 'N/A' && cat.status === true) || [];

//     // Get subcategories for selected categories
//     const availableSubcategories = categories?.filter(cat =>
//         cat.parent && selectedCategories.includes(cat.parent) && cat.status === true
//     ) || [];

//     if (Loading) {
//         return (
//             <div className='loader-container'>
//                 <span className="loader"></span>
//             </div>
//         );
//     }

//     return (
//         <>
//             {/* <Header /> */}
//             {/* Banner Section */}
//             <div className="collection d-flex align-items-center justify-content-center">
//                 <div className="title text-center">
//                     <h1>FurStore Collections</h1>
//                     <span className='d-block'>Style your space, live in comfort. Furniture that feels like home</span>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="container my-5">
//                 <div className="row">
//                     {/* Filters Sidebar */}
//                     <div className={`col-lg-3 mb-4 ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
//                         <div className="card shadow-sm">
//                             <div className="card-header bg-light d-flex justify-content-between align-items-center">
//                                 <h5 className="mb-0">Filters</h5>
//                                 <button
//                                     className="btn btn-sm btn-outline-secondary d-lg-none"
//                                     onClick={() => setShowFilters(false)}
//                                 >
//                                     ×
//                                 </button>
//                             </div>
//                             <div className="card-body">
//                                 {/* Price Range Filter */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Price Range</span>
//                                     </h6>
//                                     <div className="px-2">
//                                         <Slider
//                                             range
//                                             min={Math.floor(minPrice)}
//                                             max={Math.ceil(maxPrice)}
//                                             value={priceRange}
//                                             onChange={setPriceRange}
//                                             step={100}
//                                         />
//                                     </div>
//                                     <div className="d-flex justify-content-between mt-2">
//                                         <span>₹{priceRange[0]}</span>
//                                         <span>₹{priceRange[1]}</span>
//                                     </div>
//                                 </div>

//                                 {/* Categories Filter */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Categories</span>
//                                         <span onClick={() => toggleDropdown('categories')}>
//                                             {dropdownOpen.categories ? <FaAngleUp /> : <FaAngleDown />}
//                                         </span>
//                                     </h6>
//                                     {dropdownOpen.categories && (
//                                         <div className="filter-group">
//                                             {parentCategories.length > 0 ? (
//                                                 parentCategories.map(category => (
//                                                     <div key={category._id} className="form-check mb-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             id={`cat-${category._id}`}
//                                                             checked={selectedCategories.includes(category.name)}
//                                                             onChange={() => toggleCategory(category.name)}
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor={`cat-${category._id}`}
//                                                             style={{ cursor: 'pointer' }} // Add pointer cursor for better UX
//                                                         >
//                                                             {category.name}
//                                                         </label>
//                                                     </div>
//                                                 ))
//                                             ) : (
//                                                 <div>Loading categories...</div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>
//                                 {/* Subcategories Filter - only show if categories are selected */}
//                                 {selectedCategories.length > 0 && (
//                                     <div className="mb-4">
//                                         <h6 className="d-flex justify-content-between align-items-center">
//                                             <span>Subcategories</span>
//                                             <span onClick={() => toggleDropdown('subcategories')}>
//                                                 {dropdownOpen.subcategories ? <FaAngleUp /> : <FaAngleDown />}
//                                             </span>
//                                         </h6>
//                                         {dropdownOpen.subcategories && (
//                                             <div className="filter-group">
//                                                 {availableSubcategories.length > 0 ? (
//                                                     availableSubcategories.map(subcategory => (
//                                                         <div key={subcategory._id} className="form-check mb-2">
//                                                             <input
//                                                                 className="form-check-input"
//                                                                 type="checkbox"
//                                                                 id={`subcat-${subcategory._id}`}
//                                                                 checked={selectedSubcategories.includes(subcategory.name)}
//                                                                 onChange={() => toggleSubcategory(subcategory.name)}
//                                                             />
//                                                             <label className="form-check-label" htmlFor={`subcat-${subcategory._id}`} style={{ cursor: 'pointer' }}>
//                                                                 {subcategory.name}
//                                                             </label>
//                                                         </div>
//                                                     ))
//                                                 ) : (
//                                                     <div>No subcategories available</div>
//                                                 )}
//                                             </div>
//                                         )}
//                                     </div>
//                                 )}

//                                 {/* Brands Filter */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Brands</span>
//                                         <span onClick={() => toggleDropdown('brands')}>
//                                             {dropdownOpen.brands ? <FaAngleUp /> : <FaAngleDown />}
//                                         </span>
//                                     </h6>
//                                     {dropdownOpen.brands && (
//                                         <div className="filter-group">
//                                             {brands && brands.length > 0 ? (
//                                                 brands.map(brand => (
//                                                     <div key={brand.id} className="form-check mb-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             id={`brand-${brand._id}`}
//                                                             checked={selectedBrands.includes(brand.name)}
//                                                             onChange={() => toggleBrand(brand.name)}
//                                                         />
//                                                         <label className="form-check-label" htmlFor={`brand-${brand._id}`} style={{ cursor: 'pointer' }}>
//                                                             {brand.name}
//                                                         </label>
//                                                     </div>
//                                                 ))
//                                             ) : (
//                                                 <div>Loading brands...</div>
//                                             )}
//                                         </div>
//                                     )}
//                                 </div>

//                                 {/* Sort By */}
//                                 <div className="mb-4">
//                                     <h6 className="d-flex justify-content-between align-items-center">
//                                         <span>Sort By</span>
//                                     </h6>
//                                     <select
//                                         className="form-select"
//                                         value={sortBy}
//                                         onChange={(e) => setSortBy(e.target.value)}
//                                     >
//                                         <option value="">Recommended</option>
//                                         <option value="a-z">Alphabetically: A-Z</option>
//                                         <option value="z-a">Alphabetically: Z-A</option>
//                                         <option value="price-low">Price: Low to High</option>
//                                         <option value="price-high">Price: High to Low</option>
//                                         <option value="newest">Newest First</option>
//                                         <option value="oldest">Oldest First</option>
//                                     </select>
//                                 </div>

//                                 {/* Clear All Button */}
//                                 <button
//                                     className="btn btn-outline-danger w-100"
//                                     onClick={clearAllFilters}
//                                 >
//                                     Clear All Filters
//                                 </button>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Products Section */}
//                     <div className="col-lg-9">
//                         {/* Filter Toggle Button (Mobile) */}
//                         <div className="d-flex justify-content-between align-items-center mb-4 d-lg-none">
//                             <button
//                                 className="btn btn-outline-primary"
//                                 onClick={() => setShowFilters(!showFilters)}
//                             >
//                                 <HiMiniAdjustmentsHorizontal className="me-2" />
//                                 {showFilters ? 'Hide Filters' : 'Show Filters'}
//                             </button>
//                             <div className="text-muted">
//                                 {product.length} Products
//                             </div>
//                         </div>

//                         {/* Applied Filters */}
//                         {appliedFilters.length > 0 && (
//                             <div className="mb-4">
//                                 <div className="d-flex flex-wrap align-items-center">
//                                     <span className="me-2 fw-bold">Applied Filters:</span>
//                                     {appliedFilters.map((filter, index) => (
//                                         <div key={index} className="badge bg-light text-dark me-2 mb-2 d-flex align-items-center">
//                                             {filter}
//                                             <button
//                                                 className="btn btn-sm p-0 ms-2"
//                                                 onClick={() => removeFilter(index)}
//                                             >
//                                                 ×
//                                             </button>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         )}

//                         {/* Products Grid */}
//                         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//                             {product.length > 0 ? (
//                                 product.map((card) => (
//                                     <div key={card._id} className="col">
//                                         <ArrivalCard
//                                             img={card.thumbnail}
//                                             id={card._id}
//                                             title={card.name}
//                                             price={card.price}
//                                             isCollection={collection}
//                                         />
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="col-12 text-center py-5">
//                                     <h4>No products match your filters</h4>
//                                     <button
//                                         className="btn btn-primary mt-3"
//                                         onClick={clearAllFilters}
//                                     >
//                                         Clear All Filters
//                                     </button>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* <Footer /> */}
//         </>
//     );
// };

// export default Mens;


"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { HiMiniAdjustmentsHorizontal } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import ArrivalCard from '@/components/ArrivalCard';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { fetchBrands, fetchCategories, fetchProducts } from '@/redux/slice/CollectionSlice';

const Womens = () => {
    // Constants
    const BASE_CATEGORY = "Women"; // The base category for this page

    // Get data from Redux store
    const { products, loading: Loading } = useSelector((state) => state.Collection);
    const { categories, loading: CatLoading } = useSelector((state) => state.Collection);
    const { brands, loading: brdLoading } = useSelector((state) => state.Collection);

    const sortedProducts = [...products].sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
    const data = sortedProducts;

    const [collection, setCollection] = useState(true);
    const [product, setProductData] = useState([]);
    const [wishProduct, setwishProductData] = useState([]);

    const router = useRouter();
    const dispatch = useDispatch();

    // Filter states
    const [showFilters, setShowFilters] = useState(false);
    const [priceRange, setPriceRange] = useState([0, 200000]);
    const [selectedCategories, setSelectedCategories] = useState([BASE_CATEGORY]); // Initialize with Men's category
    const [selectedSubcategories, setSelectedSubcategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [sortBy, setSortBy] = useState('');
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(200000);

    // Dropdown states
    const [dropdownOpen, setDropdownOpen] = useState({
        categories: true,
        subcategories: true,
        brands: true
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        // Only fetch if data is not already loaded
        const fetchInitialData = async () => {
            try {
                if (products.length === 0) await dispatch(fetchProducts());
                if (categories.length === 0) await dispatch(fetchCategories());
                if (brands.length === 0) await dispatch(fetchBrands());

                // Ensure Men's category is selected
                setSelectedCategories([BASE_CATEGORY]);
            } catch (error) {
                console.error("Error fetching initial data:", error);
            }
        };

        fetchInitialData();
    }, [dispatch]);

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        const subcategoryParam = searchParams.get('subcategory');

        // Only update if params have actually changed
        if (categoryParam || subcategoryParam) {
            const newCategories = categoryParam ? [categoryParam] : [BASE_CATEGORY];
            const newSubcategories = subcategoryParam ? [subcategoryParam] : [];

            // Find parent category if only subcategory is specified
            if (subcategoryParam && !categoryParam) {
                const parentCategory = categories.find(cat =>
                    cat.subcategories?.some(sub => sub.name === subcategoryParam)
                )?.name;
                if (parentCategory) {
                    newCategories.push(parentCategory);
                }
            }

            setSelectedCategories(newCategories);
            setSelectedSubcategories(newSubcategories);
        }
    }, [searchParams, categories]);

    useEffect(() => {
        if (!data) return;

        // First filter active products AND men's category products
        const baseFilteredProducts = data.filter(product =>
            product.status === true &&
            product.category?.name === BASE_CATEGORY
        );

        // Then apply all other filters
        const filtered = baseFilteredProducts.filter(product => {
            // Subcategory filter
            if (selectedSubcategories.length > 0 &&
                (!product.subcategory?.name || !selectedSubcategories.includes(product.subcategory.name))) {
                return false;
            }

            // Brand filter
            if (selectedBrands.length > 0 &&
                (!product.brand?.name || !selectedBrands.includes(product.brand.name))) {
                return false;
            }

            // Price filter
            // if (typeof product.price !== 'number' ||
            //     product.price < priceRange[0] ||
            //     product.price > priceRange[1]) {
            //     return false;
            // }

            if (typeof product.variants?.variants[0]?.price !== 'number' ||
                (product.variants?.variants[0]?.price || product.price) < priceRange[0] ||
                (product.variants?.variants[0]?.price || product.price) > priceRange[1]) {
                return false;
            }

            return true;
        });

        // Apply sorting if needed
        const sorted = [...filtered];
        if (sortBy) {
            sorted.sort((a, b) => {
                if (sortBy === 'a-z') return (a.name || '').localeCompare(b.name || '');
                if (sortBy === 'z-a') return (b.name || '').localeCompare(a.name || '');
                if (sortBy === 'price-low') return (a.price || 0) - (b.price || 0);
                if (sortBy === 'price-high') return (b.price || 0) - (a.price || 0);
                if (sortBy === 'newest') return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
                if (sortBy === 'oldest') return new Date(a.updatedAt || 0) - new Date(b.updatedAt || 0);
                return 0;
            });
        }

        setProductData(prev => {
            if (prev.length !== sorted.length ||
                !prev.every((p, i) => p._id === sorted[i]?._id)) {
                return sorted;
            }
            return prev;
        });

        // Update applied filters (excluding the base category)
        const newAppliedFilters = [];
        if (selectedSubcategories.length > 0) newAppliedFilters.push(`Subcategories: ${selectedSubcategories.join(', ')}`);
        if (selectedBrands.length > 0) newAppliedFilters.push(`Brands: ${selectedBrands.join(', ')}`);
        if (priceRange[0] !== minPrice || priceRange[1] !== maxPrice) {
            newAppliedFilters.push(`Price: ₹${priceRange[0]} - ₹${priceRange[1]}`);
        }
        if (sortBy) newAppliedFilters.push(`Sort: ${getSortLabel(sortBy)}`);

        setAppliedFilters(prev => {
            if (prev.length !== newAppliedFilters.length ||
                !prev.every((f, i) => f === newAppliedFilters[i])) {
                return newAppliedFilters;
            }
            return prev;
        });
    }, [data, selectedCategories, selectedSubcategories, selectedBrands, priceRange, sortBy, minPrice, maxPrice]);

    const getSortLabel = (value) => {
        switch (value) {
            case 'a-z': return 'A-Z';
            case 'z-a': return 'Z-A';
            case 'price-low': return 'Price: Low to High';
            case 'price-high': return 'Price: High to Low';
            case 'newest': return 'Newest First';
            case 'oldest': return 'Oldest First';
            default: return '';
        }
    };

    const toggleCategory = (category) => {
        // Don't allow changing the base category
        if (category === BASE_CATEGORY) return;

        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter(c => c !== category));
            // Remove subcategories when parent category is deselected
            const subcatsToRemove = categories
                .filter(cat => cat.parent === category)
                .map(cat => cat.name);
            setSelectedSubcategories(prev =>
                prev.filter(sc => !subcatsToRemove.includes(sc))
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const toggleSubcategory = (subcategory) => {
        if (selectedSubcategories.includes(subcategory)) {
            setSelectedSubcategories(selectedSubcategories.filter(sc => sc !== subcategory));
        } else {
            setSelectedSubcategories([...selectedSubcategories, subcategory]);
        }
    };

    const toggleBrand = (brand) => {
        if (selectedBrands.includes(brand)) {
            setSelectedBrands(selectedBrands.filter(b => b !== brand));
        } else {
            setSelectedBrands([...selectedBrands, brand]);
        }
    };

    const toggleDropdown = (dropdown) => {
        setDropdownOpen(prev => ({
            ...prev,
            [dropdown]: !prev[dropdown]
        }));
    };

    const clearAllFilters = () => {
        setSelectedSubcategories([]);
        setSelectedBrands([]);
        setPriceRange([minPrice, maxPrice]);
        setSortBy('');
        // Keep the base category selected
        setSelectedCategories([BASE_CATEGORY]);
    };

    const removeFilter = (index) => {
        const filterText = appliedFilters[index];

        if (filterText.startsWith('Subcategories:')) {
            setSelectedSubcategories([]);
        } else if (filterText.startsWith('Brands:')) {
            setSelectedBrands([]);
        } else if (filterText.startsWith('Price:')) {
            setPriceRange([minPrice, maxPrice]);
        } else if (filterText.startsWith('Sort:')) {
            setSortBy('');
        }
    };

    // Get parent categories (categories without parents)
    const parentCategories = categories?.filter(cat => cat.parent == 'N/A' && cat.status === true) || [];

    // Get subcategories for selected categories (including the base category)
    const availableSubcategories = categories?.filter(cat =>
        cat.parent && selectedCategories.includes(cat.parent) && cat.status === true
    ) || [];

    if (Loading) {
        return (
            <div className='loader-container'>
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <>
            {/* <Header /> */}
            {/* Banner Section */}
            <div className="collection d-flex align-items-center justify-content-center">
                <div className="title text-center">
                    <h1>Women's Collection</h1>
                    <span className='d-block'>Discover our luxurious Women's Collection – elegant, timeless scents designed to captivate and empower.</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="container my-5">
                <div className="row">
                    {/* Filters Sidebar */}
                    <div className={`col-lg-3 mb-4 ${showFilters ? 'd-block' : 'd-none d-lg-block'}`}>
                        <div className="card shadow-sm sticky-top" style={{ top: '25px', zIndex: '90' }}>
                            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">Filters</h5>
                                <button
                                    className="btn btn-sm btn-outline-secondary d-lg-none"
                                    onClick={() => setShowFilters(false)}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="card-body">
                                {/* Price Range Filter */}
                                <div className="mb-4">
                                    <h6 className="d-flex justify-content-between align-items-center">
                                        <span>Price Range</span>
                                    </h6>
                                    <div className="px-2">
                                        <Slider
                                            range
                                            min={Math.floor(minPrice)}
                                            max={Math.ceil(maxPrice)}
                                            value={priceRange}
                                            onChange={setPriceRange}
                                            step={100}
                                        />
                                    </div>
                                    <div className="d-flex justify-content-between mt-2">
                                        <span>₹{priceRange[0]}</span>
                                        <span>₹{priceRange[1]}</span>
                                    </div>
                                </div>

                                {/* Categories Filter */}
                                {/* <div className="mb-4">
                                    <h6 className="d-flex justify-content-between align-items-center">
                                        <span>Categories</span>
                                        <span onClick={() => toggleDropdown('categories')}>
                                            {dropdownOpen.categories ? <FaAngleUp /> : <FaAngleDown />}
                                        </span>
                                    </h6>
                                    {dropdownOpen.categories && (
                                        <div className="filter-group">
                                            {parentCategories.length > 0 ? (
                                                parentCategories.map(category => (
                                                    <div key={category._id} className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`cat-${category._id}`}
                                                            checked={category.name === BASE_CATEGORY || selectedCategories.includes(category.name)}
                                                            onChange={() => toggleCategory(category.name)}
                                                            disabled={category.name === BASE_CATEGORY}
                                                        />
                                                        <label
                                                            className="form-check-label"
                                                            htmlFor={`cat-${category._id}`}
                                                            style={{ cursor: category.name === BASE_CATEGORY ? 'default' : 'pointer' }}
                                                        >
                                                            {category.name}
                                                            {category.name === BASE_CATEGORY && " (Default)"}
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>Loading categories...</div>
                                            )}
                                        </div>
                                    )}
                                </div> */}

                                {/* Subcategories Filter - only show if categories are selected */}
                                {/* {selectedCategories.length > 0 && (
                                    <div className="mb-4">
                                        <h6 className="d-flex justify-content-between align-items-center">
                                            <span>Subcategories</span>
                                            <span onClick={() => toggleDropdown('subcategories')}>
                                                {dropdownOpen.subcategories ? <FaAngleUp /> : <FaAngleDown />}
                                            </span>
                                        </h6>
                                        {dropdownOpen.subcategories && (
                                            <div className="filter-group">
                                                {availableSubcategories.length > 0 ? (
                                                    availableSubcategories.map(subcategory => (
                                                        <div key={subcategory._id} className="form-check mb-2">
                                                            <input
                                                                className="form-check-input"
                                                                type="checkbox"
                                                                id={`subcat-${subcategory._id}`}
                                                                checked={selectedSubcategories.includes(subcategory.name)}
                                                                onChange={() => toggleSubcategory(subcategory.name)}
                                                            />
                                                            <label className="form-check-label" htmlFor={`subcat-${subcategory._id}`} style={{ cursor: 'pointer' }}>
                                                                {subcategory.name}
                                                            </label>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>No subcategories available</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                )} */}

                                {/* Subcategories Filter - only show Men's subcategories */}
                                <div className="mb-4">
                                    <h6 className="d-flex justify-content-between align-items-center">
                                        <span>Categories</span>
                                        <span onClick={() => toggleDropdown('subcategories')}>
                                            {dropdownOpen.subcategories ? <FaAngleUp /> : <FaAngleDown />}
                                        </span>
                                    </h6>
                                    {dropdownOpen.subcategories && (
                                        <div className="filter-group">
                                            {availableSubcategories.length > 0 ? (
                                                availableSubcategories.map(subcategory => (
                                                    <div key={subcategory._id} className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`subcat-${subcategory._id}`}
                                                            checked={selectedSubcategories.includes(subcategory.name)}
                                                            onChange={() => toggleSubcategory(subcategory.name)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`subcat-${subcategory._id}`} style={{ cursor: 'pointer' }}>
                                                            {subcategory.name}
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>No subcategories available</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Brands Filter */}
                                <div className="mb-4">
                                    <h6 className="d-flex justify-content-between align-items-center">
                                        <span>Brands</span>
                                        <span onClick={() => toggleDropdown('brands')}>
                                            {dropdownOpen.brands ? <FaAngleUp /> : <FaAngleDown />}
                                        </span>
                                    </h6>
                                    {dropdownOpen.brands && (
                                        <div className="filter-group">
                                            {brands && brands.length > 0 ? (
                                                brands.map(brand => (
                                                    <div key={brand.id} className="form-check mb-2">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            id={`brand-${brand._id}`}
                                                            checked={selectedBrands.includes(brand.name)}
                                                            onChange={() => toggleBrand(brand.name)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`brand-${brand._id}`} style={{ cursor: 'pointer' }}>
                                                            {brand.name}
                                                        </label>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>Loading brands...</div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Sort By */}
                                <div className="mb-4">
                                    <h6 className="d-flex justify-content-between align-items-center">
                                        <span>Sort By</span>
                                    </h6>
                                    <select
                                        className="form-select"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="">Recommended</option>
                                        <option value="a-z">Alphabetically: A-Z</option>
                                        <option value="z-a">Alphabetically: Z-A</option>
                                        <option value="price-low">Price: Low to High</option>
                                        <option value="price-high">Price: High to Low</option>
                                        <option value="newest">Newest First</option>
                                        <option value="oldest">Oldest First</option>
                                    </select>
                                </div>

                                {/* Clear All Button */}
                                <button
                                    className="btn btn-outline-danger w-100"
                                    onClick={clearAllFilters}
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Products Section */}
                    <div className="col-lg-9">
                        {/* Filter Toggle Button (Mobile) */}
                        <div className="d-flex justify-content-between align-items-center mb-4 d-lg-none">
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <HiMiniAdjustmentsHorizontal className="me-2" />
                                {showFilters ? 'Hide Filters' : 'Show Filters'}
                            </button>
                            <div className="text-muted">
                                {product.length} Products
                            </div>
                        </div>

                        {/* Applied Filters */}
                        {appliedFilters.length > 0 && (
                            <div className="mb-4">
                                <div className="d-flex flex-wrap align-items-center">
                                    <span className="me-2 fw-bold">Applied Filters:</span>
                                    {appliedFilters.map((filter, index) => (
                                        <div key={index} className="badge bg-light text-dark me-2 mb-2 d-flex align-items-center">
                                            {filter}
                                            <button
                                                className="btn btn-sm p-0 ms-2"
                                                onClick={() => removeFilter(index)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Products Grid */}
                        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                            {product.length > 0 ? (
                                product.map((card) => (
                                    <div key={card._id} className="col-6 col-md-4 col-lg-3 px-1">
                                        <ArrivalCard
                                            img={card.thumbnail}
                                            id={card._id}
                                            title={card.name}
                                            // price={card.price}
                                            price={card.variants?.variants[0]?.price || card.price}
                                            isCollection={collection}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <h4>No products match your filters</h4>
                                    <button
                                        className="btn btn-primary mt-3"
                                        onClick={clearAllFilters}
                                    >
                                        Clear All Filters
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
        </>
    );
};

export default Womens;