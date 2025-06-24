// "use client";

// import { RiStarSLine } from "react-icons/ri";
// import { FaPlay, FaRegClock } from "react-icons/fa6";
// import { FaShippingFast } from "react-icons/fa";
// import Footer from "@/components/Footer";
// import { useEffect, useState } from 'react'
// import Header from "@/components/Header";
// import { useParams, useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";

// // Import Swiper components and styles
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import 'swiper/css/thumbs';
// import { addProductToCart } from "@/redux/slice/addToCartSlice";
// import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";
// import { fetchProducts } from "@/redux/slice/HomeSlice";
// import Swal from "sweetalert2";
// import Script from "next/script";
// import Head from "next/head";

// const ProductDetail = () => {
//     const [activeTab, setActiveTab] = useState('description');
//     const [selectedVariants, setSelectedVariants] = useState({});
//     const [thumbsSwiper, setThumbsSwiper] = useState(null);
//     const [quantity, setQuantity] = useState(1);

//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const router = useRouter();

//     useEffect(() => {
//         dispatch(fetchProducts())
//     }, [dispatch]);

//     const { products, loading: Loading } = useSelector((state) => state.Home.Home);
//     const product = products.filter(item => item._id == id);
//     const cartData = useSelector(state => state.addToCart.Cart);
//     const { userId } = useSelector((state) => state.userData)

//     console.log(product[0])

//     // Update the productMedia array to include videos and images
//     const productMedia = product.length > 0 ? [
//         ...(product[0].main ? [{ url: product[0].main, type: 'image' }] : []),
//         ...(product[0].images || []).map(img => ({ url: img, type: 'image' })),
//         ...(product[0].videos || []).map(vid => ({ url: vid, type: 'video' }))
//     ] : [];

//     // Check if product is in cart
//     const isInCart = cartData.some(item =>
//         item?.product?._id === id && item?.userId === userId
//     );

//     // Process variants to include IDs in the options
//     const variantOptions = {};
//     if (product.length > 0 && product[0].variants && product[0].variants.variants) {
//         product[0].variants.variants.forEach(variant => {
//             variant.data.forEach(option => {
//                 if (!variantOptions[option.label]) {
//                     variantOptions[option.label] = [];
//                 }
//                 variantOptions[option.label].push({
//                     value: option.value,
//                     variantId: variant.id, // Include the variant ID
//                     variantData: variant // Include full variant data
//                 });
//             });
//         });
//     }


//     const handleVariantChange = (label, selectedOption) => {
//         console.log("Selected option:", selectedOption);
//         setSelectedVariants(prev => ({
//             ...prev,
//             [label]: selectedOption
//         }));
//     };

//     const tabContent = {
//         description: product[0]?.description || "No description available",
//         delivery: "Our delivery policy ensures quick and reliable shipping. We process all orders within 24 hours and provide tracking information.",
//         shipping: "Free shipping on all orders above $50. Returns accepted within 30 days of delivery.",
//         custom: "Contact our support team for personalized solutions and special requirements."
//     }

//     const handleCart = () => {
//         if (!product[0]) return;

//         // Validate all required variants are selected
//         const requiredVariantLabels = Object.keys(variantOptions);
//         const missingVariants = requiredVariantLabels.filter(
//             label => !selectedVariants[label]
//         );

//         if (missingVariants.length > 0) {
//             Swal.fire({
//                 icon: 'error',
//                 text: `Please select ${missingVariants.join(', ')}`,
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//             return;
//         }

//         const selectedVariantArray = Object.entries(selectedVariants)
//             .map(([label, value]) => ({
//                 label,
//                 value: value.value,
//                 id: value.variantId, // Use the correct variant ID
//                 variantData: value.variantData // Include full variant data if needed
//             }));

//         if (isInCart) {
//             Swal.fire({
//                 icon: 'info',
//                 text: 'Product Already Added',
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//             return;
//         }

//         dispatch(addProductToCart({
//             userId,
//             id: product[0]._id,
//             selectedVariant: selectedVariantArray,
//             product: product[0],
//             quantity: quantity
//         })).then(() => {
//             Swal.fire({
//                 icon: 'success',
//                 text: 'Product Added Successfully',
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//         }).catch((err) => {
//             Swal.fire({
//                 icon: 'error',
//                 text: err.message,
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//         });
//     }

//     const handleBuy = () => {
//         if (!userId) {
//             Swal.fire({
//                 icon: 'error',
//                 text: 'Please Login',
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//             return;
//         }
//         if (!product[0]) return;

//         // Validate all required variants are selected
//         const requiredVariantLabels = Object.keys(variantOptions);
//         const missingVariants = requiredVariantLabels.filter(
//             label => !selectedVariants[label]
//         );

//         if (missingVariants.length > 0) {
//             Swal.fire({
//                 icon: 'error',
//                 text: `Please select ${missingVariants.join(', ')}`,
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//             return;
//         }

//         const selectedVariantArray = Object.entries(selectedVariants)
//             .map(([label, value]) => ({
//                 label,
//                 value: value.value,
//                 id: value.variantId,
//                 variantData: value.variantData
//             }));

//         dispatch(addProductToCart({
//             userId,
//             id: product[0]._id,
//             selectedVariant: selectedVariantArray,
//             product: product[0],
//             quantity: quantity
//         }));
//         router.push('/checkOut');
//     }

//     if (Loading) {
//         return (
//             <div className='loader-container'>
//                 <span className="loader"></span>
//             </div>
//         );
//     }

//     const schemaData = {
//         "@context": "https://schema.org",
//         "@type": "Product",
//         "name": product[0]?.metaTitle,
//         "image": [product[0]?.main],
//         "description": product[0]?.metaDescription,
//         "sku": product[0]?.sku,
//         "brand": {
//             "@type": "Brand",
//             "name": "HQ PERFUME"
//         },
//         "offers": {
//             "@type": "Offer",
//             "priceCurrency": "INR",
//             "price": product[0]?.variants?.variants[0]?.price.toFixed(2) || product[0]?.price.toFixed(2),
//             "availability": "https://schema.org/InStock"
//         }
//     };

//     return (
//         <>
//             <Head>
//                 <Script
//                     id="product-jsonld"
//                     type="application/ld+json"
//                     strategy="afterInteractive"
//                     dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
//                 />
//             </Head>

//             <div className="productDetail py-5 border-bottom">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-6 col-md-12">
//                             <Swiper
//                                 spaceBetween={10}
//                                 pagination={{ clickable: true }}
//                                 thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
//                                 modules={[Pagination, Thumbs]}
//                                 className="product-main-swiper mb-3"
//                             >
//                                 {productMedia.map((media, index) => (
//                                     <SwiperSlide key={index}>
//                                         {media.type === 'image' ? (
//                                             <img
//                                                 src={media.url}
//                                                 alt={`Product image ${index}`}
//                                                 className="img-fluid cursor-pointer"
//                                                 style={{ objectFit: 'cover', height: '100%', width: '100%' }}
//                                             />
//                                         ) : (
//                                             <div className="relative w-full h-full flex items-center justify-center">
//                                                 <video
//                                                     autoPlay
//                                                     muted
//                                                     loop
//                                                     className="img-fluid cursor-pointer"
//                                                     style={{ objectFit: 'cover', height: '100%', width: '100%' }}
//                                                 >
//                                                     <source src={media.url} type="video/mp4" />
//                                                     Your browser does not support the video tag.
//                                                 </video>
//                                             </div>
//                                         )}
//                                     </SwiperSlide>
//                                 ))}
//                             </Swiper>

//                             <Swiper
//                                 onSwiper={setThumbsSwiper}
//                                 spaceBetween={10}
//                                 slidesPerView={4}
//                                 watchSlidesProgress={true}
//                                 modules={[Thumbs]}
//                                 className="product-thumbs-swiper"
//                             >
//                                 {productMedia.map((media, index) => (
//                                     <SwiperSlide key={index}>
//                                         {media.type === 'image' ? (
//                                             <img
//                                                 src={media.url}
//                                                 alt={`Thumbnail ${index}`}
//                                                 className="img-fluid cursor-pointer"
//                                                 style={{ objectFit: 'cover', height: '100%', width: '100%' }}
//                                             />
//                                         ) : (
//                                             <div className="relative w-full flex items-center justify-center">
//                                                 <video className="img-fluid cursor-pointer"
//                                                     style={{ objectFit: 'cover', height: '100%', width: '100%' }}>
//                                                     <source src={media.url} type="video/mp4" />
//                                                 </video>
//                                             </div>
//                                         )}
//                                     </SwiperSlide>
//                                 ))}
//                             </Swiper>
//                         </div>
//                         <div className="col-lg-6 col-md-12 px-lg-5 px-md-5 px-2">
//                             <div className="title">
//                                 <h4 className='fw-bold'>{product[0]?.name}</h4>
//                             </div>
//                             <div className="stars d-flex align-items-center">
//                                 {[0, 1, 2, 3, 4].map((_, index) => (
//                                     <RiStarSLine key={index} size={20} color='#d4d4d4' />
//                                 ))}
//                                 <span className='fw-bold ms-3 opacity-75 pr-detail-span'>View All Ratings</span>
//                             </div>
//                             <div className="priceArea py-3 d-flex align-items-center">
//                                 <span className='fw-bold fs-5 opacity-50'><del>{product[0]?.variants?.variants[0]?.mrp.toFixed(2) || product[0]?.mrp.toFixed(2)}</del></span>
//                                 <span className='fw-bold opacity-50'>&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;</span>
//                                 <span className='discount_price fw-bold fs-5'>{product[0]?.variants?.variants[0]?.price.toFixed(2) || product[0]?.price.toFixed(2)}</span>
//                                 <span className='discount_per mx-3 fw-bold text-white py-1 px-3 rounded-5' style={{ backgroundColor: '#ff6400', fontSize: '12px' }}>-- {product[0]?.mainDiscount}%</span>
//                             </div>
//                             <p className='opacity-75 fw-medium' style={{ fontSize: '16px' }}>{product[0]?.description}</p>

//                             <div className="position-relative mb-2 rounded-5" style={{ width: '100%', height: '8px', backgroundColor: '#d4d4d4' }}>
//                                 <div className="position-absolute top-0 start-0 rounded-5" style={{ width: '60%', height: '100%', backgroundColor: '#ff6400' }}></div>
//                             </div>
//                             <span className='fw-bold opacity-50' style={{ fontSize: '16px' }}>60% items are sold -- only 40% left</span>

//                             <span className="fw-bold d-block mt-4" style={{ fontSize: '16px' }}>SKU: <span className='opacity-75'>{product[0]?.skuCode}</span></span>
//                             <span className="fw-bold d-block mt-1" style={{ fontSize: '16px' }}>SLUG: <span className='opacity-75'>{product[0]?.slug}</span></span>
//                             <span className="fw-bold d-block mt-2 mb-3" style={{ fontSize: '16px' }}>CATEGORY: <span className='opacity-75'>
//                                 {product[0]?.category?.name || "N/A"}
//                             </span>
//                             </span>

//                             {/* Variant Selection */}
//                             <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//                                 {Object.keys(variantOptions).map(label => (
//                                     <div
//                                         key={label}
//                                         style={{ width: '50%', boxSizing: 'border-box' }}
//                                         className="p-2"
//                                     >
//                                         <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>
//                                             {label.toUpperCase()}:
//                                         </span>
//                                         <select
//                                             className="border-none outline-none p-2 fw-semibold opacity-75 mb-2"
//                                             style={{ width: '100%', backgroundColor: '#f1f1f1', fontSize: '13px' }}
//                                             value={selectedVariants[label] ? JSON.stringify(selectedVariants[label]) : ''}
//                                             onChange={(e) => handleVariantChange(label, JSON.parse(e.target.value))}
//                                         >
//                                             <option value="">Select {label}</option>
//                                             {variantOptions[label].map(option => (
//                                                 <option
//                                                     key={option.variantId}
//                                                     value={JSON.stringify({
//                                                         value: option.value,
//                                                         variantId: option.variantId,
//                                                         variantData: option.variantData
//                                                     })}
//                                                 >
//                                                     {option.value}
//                                                 </option>
//                                             ))}
//                                         </select>
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* Quantity Controls */}
//                             <div className="quantity-controls d-flex align-items-center mb-3">
//                                 <span className="fw-bold me-3" style={{ fontSize: '16px' }}>Quantity:</span>
//                                 <div className="d-flex align-items-center border-3 rounded-3" style={{ width: '120px' }}>
//                                     <button
//                                         className="border-0 bg-transparent px-3 py-1 fw-bold"
//                                         onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
//                                         style={{ fontSize: '18px' }}
//                                     >
//                                         <TiMinusOutline style={{ cursor: 'pointer' }} size={20} />
//                                     </button>
//                                     <span className="fw-bold pt-1" style={{ fontSize: '16px' }}>{quantity}</span>
//                                     <button
//                                         className="border-0 bg-transparent px-3 py-1 fw-bold"
//                                         onClick={() => setQuantity(prev => prev + 1)}
//                                         style={{ fontSize: '18px' }}
//                                     >
//                                         <TiPlusOutline style={{ cursor: 'pointer' }} size={20} />
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Additional Product Details */}
//                             {product[0]?.details?.details?.map((data, index) => (
//                                 <span key={index} className="fw-bold d-block mt-1" style={{ fontSize: '15px' }}>
//                                     {data.title}: <span className='opacity-75'>{data.value}</span>
//                                 </span>
//                             ))}

//                             <div className="border-bottom">
//                                 <button onClick={handleCart} className='w-100 rounded-3 fw-bold detail-btn-1 px-4 py-2 mt-3'>ADD TO CART</button>
//                                 <button onClick={handleBuy} className='w-100 rounded-3 fw-bold detail-btn-2 px-4 py-2 mt-3 mb-5'>BUY IT NOW</button>
//                             </div>

//                             <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>GUARANTED SAFE CHECKOUT: </span>
//                             <img src="/images/payment.avif" alt="payment" className='img-fluid mt-2' />

//                             <span className="d-flex align-items-center fw-bold opacity-75 mt-3" style={{ fontSize: '13px' }}><FaRegClock size={18} />&nbsp; Order ships within 4 to 6 days</span>
//                             <span className="d-flex align-items-center fw-bold opacity-75 mt-2" style={{ fontSize: '13px' }}><FaShippingFast size={18} />&nbsp; Hoorray! this item is eligible for FREE shipping</span>
//                         </div>
//                     </div>

//                     {/* Product Tabs */}
//                     <div className="other-details mt-5">
//                         <div className="tabs-container mb-4">
//                             <ul className="nav nav-tabs d-flex flex-nowrap overflow-auto pb-2" style={{ whiteSpace: 'nowrap', scrollbarWidth: 'none' }}>
//                                 {['description', 'delivery', 'shipping', 'custom'].map((tab) => (
//                                     <li className="nav-item" key={tab}>
//                                         <button
//                                             className={`nav-link fw-bold px-3 px-md-4 py-2 mx-1 mx-md-2 ${activeTab === tab ? 'active' : ''}`}
//                                             onClick={() => setActiveTab(tab)}
//                                             style={{
//                                                 border: 'none',
//                                                 backgroundColor: 'transparent',
//                                                 color: activeTab === tab ? '#0A5D5D' : '#000',
//                                                 borderBottom: activeTab === tab ? '2px solid #0A5D5D' : 'none',
//                                                 fontSize: '14px',
//                                                 borderRadius: '0'
//                                             }}
//                                         >
//                                             {tab.toUpperCase()}
//                                         </button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>

//                         <div className="tab-content p-3 p-md-4" style={{
//                             backgroundColor: '#f9f9f9',
//                             border: '1px solid #eee',
//                             borderRadius: '4px'
//                         }}>
//                             <div className="tab-pane active">
//                                 <p className="opacity-75 fw-medium mb-3" style={{ fontSize: '14px', lineHeight: '1.6' }}>
//                                     {tabContent[activeTab]}
//                                 </p>

//                                 <ul className="ps-3 mb-0" style={{ listStyleType: 'disc' }}>
//                                     <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>High-quality materials</li>
//                                     <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Premium craftsmanship</li>
//                                     <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Easy to maintain</li>
//                                     <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Long-lasting durability</li>
//                                     <li className="fw-medium opacity-75" style={{ fontSize: '13px' }}>Satisfaction guaranteed</li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <style jsx global>{`
//                 .product-main-swiper {
//                     width: 100%;
//                     height: 70%;
//                     margin-bottom: 15px;
//                 }

//                 .product-main-swiper .swiper-slide {
//                     display: flex;
//                     justify-content: center;
//                     align-items: center;
//                     background: #f8f8f8;
//                 }

//                 .product-thumbs-swiper {
//                     width: 100%;
//                     height: 120px;
//                 }

//                 .product-thumbs-swiper .swiper-slide {
//                     opacity: 0.4;
//                     cursor: pointer;
//                     border: 1px solid #ddd;
//                 }

//                 .product-thumbs-swiper .swiper-slide-thumb-active {
//                     opacity: 1;
//                     border: 1px solid #ff6400;
//                 }

//                 .cursor-pointer {
//                     cursor: pointer;
//                 }

//                 .tabs-container::-webkit-scrollbar {
//                     display: none;
//                 }

//                 .quantity-controls button {
//                     cursor: pointer;
//                     transition: all 0.3s ease;
//                 }

//                 .quantity-controls button:hover {
//                     background-color: #f1f1f1;
//                     border-radius: 4px;
//                 }

//                 @media (max-width: 768px) {
//                     .nav-tabs {
//                         padding-bottom: 8px;
//                     }

//                     .nav-link {
//                         padding: 8px 12px !important;
//                         font-size: 13px !important;
//                     }

//                     .tab-content {
//                         padding: 16px !important;
//                     }
//                 }

//                 @media (max-width: 576px) {
//                     .nav-link {
//                         padding: 6px 10px !important;
//                         margin: 0 4px !important;
//                     }

//                     .quantity-controls {
//                         margin-bottom: 15px !important;
//                     }
//                 }
//             `}</style>
//         </>
//     )
// }

// export default ProductDetail;
"use client";

import { RiStarSLine } from "react-icons/ri";
import { FaPlay, FaRegClock } from "react-icons/fa6";
import { FaShippingFast } from "react-icons/fa";
import Footer from "@/components/Footer";
import { useEffect, useState } from 'react'
import Header from "@/components/Header";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';
import { addProductToCart } from "@/redux/slice/addToCartSlice";
import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";
import { fetchProducts } from "@/redux/slice/HomeSlice";
import Swal from "sweetalert2";
import Script from "next/script";
import Head from "next/head";

const ProductDetail = () => {
    const [activeTab, setActiveTab] = useState('description');
    const [selectedVariants, setSelectedVariants] = useState({});
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [currentMrp, setCurrentMrp] = useState(0);
    const [currentStock, setCurrentStock] = useState(0);
    const [stockPercentage, setStockPercentage] = useState(0);

    const { id } = useParams();
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchProducts())
    }, [dispatch]);

    const { products, loading: Loading } = useSelector((state) => state.Home.Home);
    const product = products.filter(item => item._id == id);
    const cartData = useSelector(state => state.addToCart.Cart);
    const { userId } = useSelector((state) => state.userData)

    // console.log(product[0])

    // Update the productMedia array to include videos and images
    const productMedia = product.length > 0 ? [
        ...(product[0].main ? [{ url: product[0].main, type: 'image' }] : []),
        ...(product[0].images || []).map(img => ({ url: img, type: 'image' })),
        ...(product[0].videos || []).map(vid => ({ url: vid, type: 'video' }))
    ] : [];

    // Check if product is in cart
    // const isInCart = cartData.some(item =>
    //     item?.product?._id === id && item?.userId === userId
    // );

    // Check if product with the same variants is in cart
    const isInCart = cartData.some(item => {
        // Check if it's the same product and same user
        if (item?.product?._id !== id || item?.userId !== userId) {
            return false;
        }

        // Get current selected variants
        const currentVariants = Object.entries(selectedVariants).map(([label, value]) => ({
            label,
            value: value.value
        }));

        // Get cart item variants (handle both old and new format)
        const cartVariants = item.variant?.data || item.selectedVariant || [];

        // If no variants in either, it's the same product
        if (cartVariants.length === 0 && currentVariants.length === 0) {
            return true;
        }

        // Compare variants
        if (cartVariants.length !== currentVariants.length) {
            return false;
        }

        // Check each variant matches (case-insensitive comparison)
        return cartVariants.every(cartVariant => {
            const matchingVariant = currentVariants.find(
                v => v.label.toLowerCase() === cartVariant.label?.toLowerCase() &&
                    v.value.toLowerCase() === cartVariant.value?.toLowerCase()
            );
            return matchingVariant !== undefined;
        });
    });

    console.log(cartData)

    // Process variants to include IDs in the options
    const variantOptions = {};
    if (product.length > 0 && product[0].variants && product[0].variants.variants) {
        product[0].variants.variants.forEach(variant => {
            variant.data.forEach(option => {
                if (!variantOptions[option.label]) {
                    variantOptions[option.label] = [];
                }
                variantOptions[option.label].push({
                    value: option.value,
                    variantId: variant.id,
                    variantData: variant,
                    price: variant.price,
                    mrp: variant.mrp,
                    stock: variant.stock || 0,
                    maxStock: variant.maxStock || variant.stock || 100
                });
            });
        });
    }

    // Auto-select first variant when product loads
    useEffect(() => {
        if (product.length > 0 && product[0].variants && product[0].variants.variants && Object.keys(selectedVariants).length === 0) {
            const initialSelections = {};
            const firstVariant = product[0].variants.variants[0];
            console.log(product[0])

            // Set initial price, MRP, and stock
            setCurrentPrice(firstVariant.price || product[0].price);
            setCurrentMrp(firstVariant.mrp || product[0].mrp);
            setCurrentStock(firstVariant.stock || 0);

            // Calculate initial stock percentage
            const maxStock = firstVariant.maxStock || firstVariant.stock || 100;
            const soldStock = maxStock - (firstVariant.stock || 0);
            const soldPercentage = maxStock > 0 ? Math.round((soldStock / maxStock) * 100) : 0;
            setStockPercentage(soldPercentage);

            // Auto-select first option for each variant type
            Object.keys(variantOptions).forEach(label => {
                const firstOption = variantOptions[label][0];
                initialSelections[label] = {
                    value: firstOption.value,
                    variantId: firstOption.variantId,
                    variantData: firstOption.variantData,
                    price: firstOption.price,
                    mrp: firstOption.mrp,
                    stock: firstOption.stock,
                    maxStock: firstOption.maxStock
                };
            });

            setSelectedVariants(initialSelections);
        }
    }, [product, variantOptions]);

    // Update price and stock when variants change
    const updatePriceFromVariants = (newSelectedVariants) => {
        const variantValues = Object.values(newSelectedVariants);
        if (variantValues.length > 0) {
            // Get the variant data from the selected variant
            const selectedVariantData = variantValues[0].variantData;
            if (selectedVariantData) {
                setCurrentPrice(selectedVariantData.price || product[0]?.price || 0);
                setCurrentMrp(selectedVariantData.mrp || product[0]?.mrp || 0);
                setCurrentStock(selectedVariantData.stock || 0);

                // Calculate stock percentage
                const maxStock = selectedVariantData.maxStock || selectedVariantData.stock || 100;
                const soldStock = maxStock - (selectedVariantData.stock || 0);
                const soldPercentage = maxStock > 0 ? Math.round((soldStock / maxStock) * 100) : 0;
                setStockPercentage(Math.min(100, Math.max(0, soldPercentage))); // Ensure percentage is between 0-100
            }
        } else {
            // Fallback to product default price and stock
            setCurrentPrice(product[0]?.price || 0);
            setCurrentMrp(product[0]?.mrp || 0);
            setCurrentStock(product[0]?.stock || 0);
            setStockPercentage(60); // Default fallback percentage
        }
    };

    const handleVariantChange = (label, selectedOption) => {
        console.log("Selected option:", selectedOption);
        const newSelectedVariants = {
            ...selectedVariants,
            [label]: selectedOption
        };
        setSelectedVariants(newSelectedVariants);
        updatePriceFromVariants(newSelectedVariants);
    };

    const tabContent = {
        description: product[0]?.description || "No description available",
        delivery: "Our delivery policy ensures quick and reliable shipping. We process all orders within 24 hours and provide tracking information.",
        shipping: "Free shipping on all orders above $50. Returns accepted within 30 days of delivery.",
        custom: "Contact our support team for personalized solutions and special requirements."
    }

    const handleCart = () => {
        if (!product[0]) return;

        // Check stock availability
        if (currentStock === 0) {
            Swal.fire({
                icon: 'error',
                text: 'Product is out of stock',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        // Check if quantity exceeds available stock
        if (quantity > currentStock) {
            Swal.fire({
                icon: 'error',
                text: `Only ${currentStock} items available in stock`,
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        // Validate all required variants are selected
        const requiredVariantLabels = Object.keys(variantOptions);
        const missingVariants = requiredVariantLabels.filter(
            label => !selectedVariants[label]
        );

        if (missingVariants.length > 0) {
            Swal.fire({
                icon: 'error',
                text: `Please select ${missingVariants.join(', ')}`,
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        const selectedVariantArray = Object.entries(selectedVariants)
            .map(([label, value]) => ({
                label,
                value: value.value,
                id: value.variantId,
                variantData: value.variantData
            }));

        if (isInCart) {
            Swal.fire({
                icon: 'info',
                text: 'Product Already Added',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        dispatch(addProductToCart({
            userId,
            id: product[0]._id,
            selectedVariant: selectedVariantArray,
            product: product[0],
            quantity: quantity
        })).then(() => {
            Swal.fire({
                icon: 'success',
                text: 'Product Added Successfully',
                timer: 2000,
                showConfirmButton: false
            });
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                text: err.message,
                timer: 2000,
                showConfirmButton: false
            });
        });
    }

    const handleBuy = () => {
        if (!userId) {
            Swal.fire({
                icon: 'error',
                text: 'Please Login',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }
        if (!product[0]) return;

        // Check stock availability
        if (currentStock === 0) {
            Swal.fire({
                icon: 'error',
                text: 'Product is out of stock',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        // Check if quantity exceeds available stock
        if (quantity > currentStock) {
            Swal.fire({
                icon: 'error',
                text: `Only ${currentStock} items available in stock`,
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        // Validate all required variants are selected
        const requiredVariantLabels = Object.keys(variantOptions);
        const missingVariants = requiredVariantLabels.filter(
            label => !selectedVariants[label]
        );

        if (missingVariants.length > 0) {
            Swal.fire({
                icon: 'error',
                text: `Please select ${missingVariants.join(', ')}`,
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        const selectedVariantArray = Object.entries(selectedVariants)
            .map(([label, value]) => ({
                label,
                value: value.value,
                id: value.variantId,
                variantData: value.variantData
            }));

        dispatch(addProductToCart({
            userId,
            id: product[0]._id,
            selectedVariant: selectedVariantArray,
            product: product[0],
            quantity: quantity
        }));
        router.push('/checkOut');
    }

    if (Loading) {
        return (
            <div className='loader-container'>
                <span className="loader"></span>
            </div>
        );
    }

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "name": product[0]?.metaTitle,
        "image": [product[0]?.main],
        "description": product[0]?.metaDescription,
        "sku": product[0]?.sku,
        "brand": {
            "@type": "Brand",
            "name": "HQ PERFUME"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "INR",
            "price": currentPrice.toFixed(2),
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <>
            <Head>
                <Script
                    id="product-jsonld"
                    type="application/ld+json"
                    strategy="afterInteractive"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
                />
            </Head>

            <div className="productDetail py-5 border-bottom">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12">
                            <Swiper
                                spaceBetween={10}
                                pagination={{ clickable: true }}
                                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                modules={[Pagination, Thumbs]}
                                className="product-main-swiper mb-3"
                            >
                                {productMedia.map((media, index) => (
                                    <SwiperSlide key={index}>
                                        {media.type === 'image' ? (
                                            <img
                                                src={media.url}
                                                alt={`Product image ${index}`}
                                                className="img-fluid cursor-pointer"
                                                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                            />
                                        ) : (
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <video
                                                    autoPlay
                                                    muted
                                                    loop
                                                    className="img-fluid cursor-pointer"
                                                    style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                                >
                                                    <source src={media.url} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={4}
                                watchSlidesProgress={true}
                                modules={[Thumbs]}
                                className="product-thumbs-swiper"
                            >
                                {productMedia.map((media, index) => (
                                    <SwiperSlide key={index}>
                                        {media.type === 'image' ? (
                                            <img
                                                src={media.url}
                                                alt={`Thumbnail ${index}`}
                                                className="img-fluid cursor-pointer"
                                                style={{ objectFit: 'cover', height: '100%', width: '100%' }}
                                            />
                                        ) : (
                                            <div className="relative w-full flex items-center justify-center">
                                                <video className="img-fluid cursor-pointer"
                                                    style={{ objectFit: 'cover', height: '100%', width: '100%' }}>
                                                    <source src={media.url} type="video/mp4" />
                                                </video>
                                            </div>
                                        )}
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="col-lg-6 col-md-12 mt-5 mt-md-2 mt-lg-0 px-xl-5 px-2">
                            <div className="title">
                                <h4 className='fw-bold'>{product[0]?.name}</h4>
                            </div>
                            <div className="stars d-flex align-items-center">
                                {[0, 1, 2, 3, 4].map((_, index) => (
                                    <RiStarSLine key={index} size={20} color='#d4d4d4' />
                                ))}
                                <span className='fw-bold ms-3 opacity-75 pr-detail-span'>View All Ratings</span>
                            </div>
                            <div className="priceArea py-3 d-flex align-items-center">
                                <span className='fw-bold fs-5 opacity-50'><del>₹{currentMrp.toFixed(2)}</del></span>
                                <span className='fw-bold opacity-50'>&nbsp;&nbsp;&nbsp;||&nbsp;&nbsp;&nbsp;</span>
                                <span className='discount_price fw-bold fs-5'>₹{currentPrice.toFixed(2)}</span>
                                <span className='discount_per mx-3 fw-bold text-white py-1 px-3 rounded-5' style={{ backgroundColor: '#ff6400', fontSize: '12px' }}>
                                    {currentMrp > 0 ? Math.round(((currentMrp - currentPrice) / currentMrp) * 100) : product[0]?.mainDiscount}%
                                </span>
                            </div>
                            <p className='opacity-75 fw-medium' style={{ fontSize: '16px' }}>{product[0]?.description}</p>

                            <div className="position-relative mb-2 rounded-5" style={{ width: '100%', height: '8px', backgroundColor: '#d4d4d4' }}>
                                <div
                                    className="position-absolute top-0 start-0 rounded-5 transition-all duration-300"
                                    style={{
                                        width: `${stockPercentage}%`,
                                        height: '100%',
                                        backgroundColor: stockPercentage > 80 ? '#dc3545' : stockPercentage > 50 ? '#ffc107' : '#ff6400',
                                        transition: 'width 0.3s ease-in-out'
                                    }}
                                ></div>
                            </div>
                            <span className='fw-bold opacity-50' style={{ fontSize: '14px' }}>
                                {stockPercentage}% items are sold -- only {100 - stockPercentage}% left
                                {/* {currentStock > 0 && <span className="text-success"> ({currentStock} in stock)</span>} */}
                                {currentStock === 0 && <span className="text-danger"> (Out of stock)</span>}
                            </span>

                            <span className="fw-bold d-block mt-4" style={{ fontSize: '14px' }}>Sku Code: <span className='opacity-75'>{product[0]?.skuCode}</span></span>
                            {/* <span className="fw-bold d-block mt-1" style={{ fontSize: '14px' }}>Slug: <span className='opacity-75'>{product[0]?.slug}</span></span> */}
                            <span className="fw-bold d-block mt-1" style={{ fontSize: '14px' }}>Category: <span className='opacity-75'>
                                {product[0]?.category?.name || "N/A"}
                            </span>
                            </span>
                            <span className="fw-bold d-block mt-1 mb-3" style={{ fontSize: '14px' }}>Sub Category: <span className='opacity-75'>
                                {product[0]?.subcategory?.name || "N/A"}
                            </span>
                            </span>

                            {/* Variant Selection */}
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {Object.keys(variantOptions).map(label => (
                                    <div
                                        key={label}
                                        style={{ width: '50%', boxSizing: 'border-box' }}
                                        className="p-2"
                                    >
                                        <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>
                                            {label.toUpperCase()}:
                                        </span>
                                        <select
                                            className="border-none outline-none p-2 fw-semibold opacity-75 mb-2"
                                            style={{ width: '100%', backgroundColor: '#f1f1f1', fontSize: '13px' }}
                                            value={selectedVariants[label] ? JSON.stringify({
                                                value: selectedVariants[label].value,
                                                variantId: selectedVariants[label].variantId,
                                                variantData: selectedVariants[label].variantData,
                                                price: selectedVariants[label].price,
                                                mrp: selectedVariants[label].mrp,
                                                stock: selectedVariants[label].stock,
                                                maxStock: selectedVariants[label].maxStock
                                            }) : ''}
                                            onChange={(e) => {
                                                if (e.target.value) {
                                                    handleVariantChange(label, JSON.parse(e.target.value))
                                                }
                                            }}
                                        >
                                            <option value="">Select {label}</option>
                                            {variantOptions[label].map((option, index) => (
                                                <option
                                                    key={`${option.variantId}-${index}`}
                                                    value={JSON.stringify({
                                                        value: option.value,
                                                        variantId: option.variantId,
                                                        variantData: option.variantData,
                                                        price: option.price,
                                                        mrp: option.mrp,
                                                        stock: option.stock,
                                                        maxStock: option.maxStock
                                                    })}
                                                >
                                                    {option.value} {option.stock !== undefined && `(${option.stock} left)`}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                            </div>

                            {/* Quantity Controls */}
                            <div className="quantity-controls d-flex align-items-center mb-3">
                                <span className="fw-bold me-3" style={{ fontSize: '16px' }}>Quantity:</span>
                                <div className="d-flex align-items-center border-3 rounded-3" style={{ width: '120px' }}>
                                    <button
                                        className="border-0 bg-transparent px-3 py-1 fw-bold"
                                        onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                        style={{ fontSize: '18px' }}
                                        disabled={currentStock === 0}
                                    >
                                        <TiMinusOutline style={{ cursor: currentStock === 0 ? 'not-allowed' : 'pointer' }} size={20} />
                                    </button>
                                    <span className="fw-bold pt-1" style={{ fontSize: '16px' }}>{quantity}</span>
                                    <button
                                        className="border-0 bg-transparent px-3 py-1 fw-bold"
                                        onClick={() => setQuantity(prev => Math.min(currentStock, prev + 1))}
                                        style={{ fontSize: '18px' }}
                                        disabled={currentStock === 0 || quantity >= currentStock}
                                    >
                                        <TiPlusOutline style={{ cursor: (currentStock === 0 || quantity >= currentStock) ? 'not-allowed' : 'pointer' }} size={20} />
                                    </button>
                                </div>
                                {currentStock > 0 && (
                                    <span className="fw-bold ms-3 opacity-75" style={{ fontSize: '14px' }}>
                                        Max: {currentStock}
                                    </span>
                                )}
                            </div>

                            {/* Additional Product Details */}
                            {product[0]?.details?.details?.map((data, index) => (
                                <span key={index} className="fw-bold d-block mt-1" style={{ fontSize: '15px' }}>
                                    {data.title}: <span className='opacity-75'>{data.value}</span>
                                </span>
                            ))}

                            <div className="border-bottom">
                                <button
                                    onClick={handleCart}
                                    disabled={currentStock === 0}
                                    className={`w-100 rounded-3 fw-bold detail-btn-1 px-4 py-2 mt-3 ${currentStock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {currentStock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
                                </button>
                                <button
                                    onClick={handleBuy}
                                    disabled={currentStock === 0}
                                    className={`w-100 rounded-3 fw-bold detail-btn-2 px-4 py-2 mt-3 mb-5 ${currentStock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {currentStock === 0 ? 'OUT OF STOCK' : 'BUY IT NOW'}
                                </button>
                            </div>

                            <span className="fw-bold d-block mt-4" style={{ fontSize: '13px' }}>GUARANTED SAFE CHECKOUT: </span>
                            <img src="/images/payment.avif" alt="payment" className='img-fluid mt-2' />

                            <span className="d-flex align-items-center fw-bold opacity-75 mt-3" style={{ fontSize: '13px' }}><FaRegClock size={18} />&nbsp; Order ships within 4 to 6 days</span>
                            <span className="d-flex align-items-center fw-bold opacity-75 mt-2" style={{ fontSize: '13px' }}><FaShippingFast size={18} />&nbsp; Hoorray! this item is eligible for FREE shipping</span>
                        </div>
                    </div>

                    {/* Product Tabs */}
                    <div className="other-details mt-5">
                        <div className="tabs-container mb-4">
                            <ul className="nav nav-tabs d-flex flex-nowrap overflow-auto pb-2" style={{ whiteSpace: 'nowrap', scrollbarWidth: 'none' }}>
                                {['description', 'delivery', 'shipping', 'custom'].map((tab) => (
                                    <li className="nav-item" key={tab}>
                                        <button
                                            className={`nav-link fw-bold px-3 px-md-4 py-2 mx-1 mx-md-2 ${activeTab === tab ? 'active' : ''}`}
                                            onClick={() => setActiveTab(tab)}
                                            style={{
                                                border: 'none',
                                                backgroundColor: 'transparent',
                                                color: activeTab === tab ? '#0A5D5D' : '#000',
                                                borderBottom: activeTab === tab ? '2px solid #0A5D5D' : 'none',
                                                fontSize: '14px',
                                                borderRadius: '0'
                                            }}
                                        >
                                            {tab.toUpperCase()}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="tab-content p-3 p-md-4" style={{
                            backgroundColor: '#f9f9f9',
                            border: '1px solid #eee',
                            borderRadius: '4px'
                        }}>
                            <div className="tab-pane active">
                                <p className="opacity-75 fw-medium mb-3" style={{ fontSize: '14px', lineHeight: '1.6' }}>
                                    {tabContent[activeTab]}
                                </p>

                                <ul className="ps-3 mb-0" style={{ listStyleType: 'disc' }}>
                                    <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>High-quality materials</li>
                                    <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Premium craftsmanship</li>
                                    <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Easy to maintain</li>
                                    <li className="fw-medium opacity-75 mb-2" style={{ fontSize: '13px' }}>Long-lasting durability</li>
                                    <li className="fw-medium opacity-75" style={{ fontSize: '13px' }}>Satisfaction guaranteed</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                .product-main-swiper {
                    width: 100%;
                    height: 70%;
                    margin-bottom: 15px;
                }

                .product-main-swiper .swiper-slide {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: #f8f8f8;
                }

                .product-thumbs-swiper {
                    width: 100%;
                    height: 120px;
                }

                .product-thumbs-swiper .swiper-slide {
                    opacity: 0.4;
                    cursor: pointer;
                    border: 1px solid #ddd;
                }

                .product-thumbs-swiper .swiper-slide-thumb-active {
                    opacity: 1;
                    border: 1px solid #ff6400;
                }

                .cursor-pointer {
                    cursor: pointer;
                }
                
                .tabs-container::-webkit-scrollbar {
                    display: none;
                }
                
                .quantity-controls button {
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .quantity-controls button:hover {
                    background-color: #f1f1f1;
                    border-radius: 4px;
                }
                
                @media (max-width: 768px) {
                    .nav-tabs {
                        padding-bottom: 8px;
                    }
                    
                    .nav-link {
                        padding: 8px 12px !important;
                        font-size: 13px !important;
                    }
                    
                    .tab-content {
                        padding: 16px !important;
                    }
                }
                
                @media (max-width: 576px) {
                    .nav-link {
                        padding: 6px 10px !important;
                        margin: 0 4px !important;
                    }
                    
                    .quantity-controls {
                        margin-bottom: 15px !important;
                    }
                }
            `}</style>
        </>
    )
}

export default ProductDetail;