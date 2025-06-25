// "use client";

// import React, { useEffect, useState } from 'react'
// import Footer from '@/components/Footer'
// import { useDispatch, useSelector } from 'react-redux';
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { TiMinusOutline, TiPlusOutline } from 'react-icons/ti';
// import { fetchCoupons } from '@/redux/slice/CollectionSlice';
// import { FaTruckFast } from "react-icons/fa6";
// import OrderPlacedPopup from '@/components/OrderPlaced';
// import Header from '@/components/Header';
// // import { toast, ToastContainer } from 'react-toastify';
// import Link from 'next/link';
// import Swal from 'sweetalert2';
// import { removeProductFromCart, updateProductQuantity } from '@/redux/slice/addToCartSlice';
// import { useRouter } from 'next/navigation';

// const CartPage = () => {
//     // const [userId, setUserId] = useState();
//     const [cart, setCart] = useState([]);
//     const { coupons, loading: Loading } = useSelector((state) => state.Collection);
//     const { Cart, loading: CartLoading } = useSelector((state) => state.addToCart);
//     const { userId } = useSelector((state) => state.userData)
//     const dispatch = useDispatch()
//     const router = useRouter()

//     useEffect(() => {
//         dispatch(fetchCoupons());
//     }, [dispatch])

//     const couponsData = coupons ? coupons.filter((coupon) => coupon.status === true) : [];

//     useEffect(() => {
//         // console.log(cartData)
//         // const id = localStorage.getItem("userId");
//         // setUserId(id)

//         if (userId) {
//             const filterCart = Cart.filter((data) => data.userId === userId);
//             // console.log(filterCart)
//             setCart(filterCart);
//         } else {
//             setCart(Cart);
//         }
//     }, [userId, Cart]);

//     const handleinc = (id, quantity) => {
//         dispatch(updateProductQuantity({ id: id, quantity: quantity + 1 }))
//     }

//     const handledic = (id, quantity) => {
//         if (quantity > 1) {
//             dispatch(updateProductQuantity({ id: id, quantity: quantity - 1 }))
//         } else {
//             dispatch(removeProductFromCart(id));
//             dispatch(updateProductQuantity({ id: id, quantity: 0 }))
//         }
//     }

//     const orderPlace = () => {
//         setOrderDone(true);
//         setTimeout(() => setOrderDone(false), 1000);
//     }

//     const handleCheckOut = () => {
//         if (userId) {
//             // closeSideBar();
//             router.push("/checkOut")
//         } else {
//             // toast.error("Please Login First")
//             Swal.fire({
//                 icon: 'error',
//                 text: 'Please Login After Shopping.',
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//         }
//     }

//     const handleRemoveCart = (id) => {
//         dispatch(removeProductFromCart(id))
//         Swal.fire({
//             icon: 'success',
//             text: 'Product Removed From Cart.',
//             timer: 2000,
//             showConfirmButton: false
//         });
//     }


//     // Calculate subtotal before any discounts
//     const total = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);

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

//             <div className='wishlist py-5 border-bottom'>
//                 <div className="container">
//                     <h4 className='text-center fw-bolder display-5 mt-5 mb-5'>YOUR SHOPPING CART</h4>

//                     {cart.length <= 0 ? <h2 className='fw-bold' style={{ textAlign: 'center' }}>YOUR CART IS EMPTY</h2>
//                         :
//                         <div className="row">
//                             <div className="col-lg-8 col-md-12 mb-4">
//                                 <div className="border position-relative overflow-hidden" style={{ height: 'auto', boxShadow: '0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)' }}>
//                                     <div className="cartTable" >
//                                         {/* Headers - Hide on mobile */}
//                                         <div className="row py-2 border-bottom d-none d-md-flex" style={{ backgroundColor: '#f2f2f2', color: '#6b7280' }}>
//                                             <div className="col-md-5 fw-bold ps-md-5">Product</div>
//                                             <div className="col-md-2 fw-bold ps-md-4" >Price</div>
//                                             <div className="col-md-2 fw-bold ps-md-2">Quantity</div>
//                                             <div className="col-md-2 fw-bold ps-md-2">Subtotal</div>
//                                             <div className="col-md-1 fw-bold" style={{ marginLeft: '-4%' }}>Remove</div>
//                                         </div>

//                                         {/* Cart items */}
//                                         {cart.map((item, index) => (
//                                             <div key={index} className="row align-items-center border-bottom p-3 mt-2">
//                                                 {/* Product image and name */}
//                                                 <div className="col-12 col-md-5 mb-3 mb-md-0 d-flex align-items-center">
//                                                     <img src={item.product.thumbnail} alt={item.product.name} className='img-fluid' style={{ width: '100px', height: 'auto' }} />
//                                                     <span className='ms-3 text-truncate' style={{ maxWidth: '200px' }}>{item.product.name}</span>
//                                                 </div>

//                                                 {/* Price - Stack on mobile */}
//                                                 <div className="col-6 col-md-2 mb-2 mb-md-0">
//                                                     <div className="d-md-none fw-bold">Price:</div>
//                                                     <span>{item.product.price}</span>
//                                                 </div>

//                                                 {/* Quantity controls - Stack on mobile */}
//                                                 <div className="col-6 col-md-2 mb-2 mb-md-0">
//                                                     <div className="d-md-none fw-bold">Quantity:</div>
//                                                     <div className="d-flex align-items-center">
//                                                         <div className="dic" onClick={() => handledic(item._id, item.quantity)}>
//                                                             <TiMinusOutline style={{ cursor: 'pointer' }} size={20} />
//                                                         </div>
//                                                         <span className='mx-2'>{item.quantity}</span>
//                                                         <div className="inc" onClick={() => handleinc(item._id, item.quantity)}>
//                                                             <TiPlusOutline style={{ cursor: 'pointer' }} size={20} />
//                                                         </div>
//                                                     </div>
//                                                 </div>

//                                                 {/* Subtotal - Stack on mobile */}
//                                                 <div className="col-6 col-md-2 mb-2 mb-md-0">
//                                                     <div className="d-md-none fw-bold">Subtotal:</div>
//                                                     <span>{(item.product.price * item.quantity).toFixed(2)}</span>
//                                                 </div>

//                                                 {/* Remove button - Stack on mobile */}
//                                                 <div className="col-6 col-md-1 text-end d-flex align-items-center gap-2 text-md-center">
//                                                     <div className="d-md-none fw-bold">Remove:</div>
//                                                     <span onClick={() => handleRemoveCart(item._id)} style={{ cursor: 'pointer' }}>
//                                                         <RiDeleteBin5Line size={20} />
//                                                     </span>
//                                                 </div>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>

//                             {/* Order summary section */}
//                             <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
//                                 <div className="border p-0 h-100" style={{
//                                     position: 'sticky',
//                                     top: '20px',
//                                     maxHeight: 'calc(100vh - 40px)',
//                                     overflowY: 'auto',
//                                     boxShadow: '0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)'
//                                 }}>
//                                     <div className="cartItems border-bottom" style={{ padding: '10px 0' }}>
//                                         <span style={{ fontSize: '12px', color: '#6b7280' }} className='fw-bold d-block px-3'>THERE ARE {cart.length} ITEMS IN YOUR CART</span>
//                                     </div>
//                                     <div className="total p-3" style={{ backgroundColor: '#f2f2f2' }}>
//                                         <div className="d-flex align-items-center justify-content-between mb-2">
//                                             <span className='fw-bold' style={{ fontSize: '14px' }}>TOTAL:</span>
//                                             <span className='fs-4 fw-bold'>{total.toFixed(2)}</span>
//                                         </div>
//                                         <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-2">
//                                             <span className='fw-bold mb-1 mb-md-0' style={{ fontSize: '14px' }}>SHIPPING:</span>
//                                             <span className='fw-bold' style={{ fontSize: '10px', color: '#6b7280' }}>Shipping & taxes calculated at checkout</span>
//                                         </div>
//                                         <div className="d-flex justify-content-between align-items-center mb-2">
//                                             <span className='fw-bold' style={{ color: 'green', fontSize: '14px' }}>Congratulations! You've got free shipping!</span>
//                                             <FaTruckFast size={26} style={{ marginLeft: '10px', color: 'green' }} />
//                                         </div>
//                                         <span style={{ fontSize: '12px', color: '#6b7280' }}>Free shipping for any orders above <span className='fw-bold' style={{ color: 'green' }}>200.00</span></span>
//                                         <span className='fw-bold d-block my-2' style={{ fontSize: '14px' }}>Add a note to your order :</span>
//                                         <textarea
//                                             name="note"
//                                             id="note"
//                                             className='border-0 p-2 fw-bold w-100'
//                                             style={{ fontSize: '10px', minHeight: '100px' }}
//                                             placeholder='ADD YOUR NOTE HERE'
//                                         ></textarea>
//                                     </div>
//                                     <button onClick={handleCheckOut} className='py-3 border-0 text-white fw-bold orderbtn w-100'>CHECK OUT ORDER</button>
//                                 </div>
//                             </div>
//                         </div>
//                     }
//                 </div>
//             </div>
//             {/* <Footer /> */}
//         </>
//     )
// }

// export default CartPage


"use client";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RiDeleteBin5Line } from "react-icons/ri";
import { TiMinusOutline, TiPlusOutline } from 'react-icons/ti';
import { fetchCoupons } from '@/redux/slice/CollectionSlice';
import { FaTruckFast } from "react-icons/fa6";
import { fetchProducts, removeProductFromCart, updateProductQuantity, updateProductVariant } from '../../redux/slice/addToCartSlice';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [selectedVariants, setSelectedVariants] = useState({});
    const { coupons, loading: Loading } = useSelector((state) => state.Collection);
    const { Cart, loading: CartLoading } = useSelector((state) => state.addToCart);
    const { products } = useSelector((state) => state.Home.Home);
    const { userId } = useSelector((state) => state.userData);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchCoupons());
        dispatch(fetchProducts())
    }, [dispatch]);

    // console.log("products:", products);
    console.log("cart", Cart);

    // Get available variants for a product
    const getAvailableVariants = (product) => {
        console.log(product)
        if (!product?.variants?.variants) return {};

        const variants = {};

        product.variants.variants.forEach(variant => {
            variant.data.forEach(variantOption => {
                if (!variants[variantOption.label]) {
                    variants[variantOption.label] = [];
                }

                // Check if this value is already added for this label
                const exists = variants[variantOption.label].some(
                    item => item.value === variantOption.value
                );
                console.log(variantOption)


                if (!exists) {
                    variants[variantOption.label].push({
                        value: variantOption.value,
                        variantId: variant.id,
                        variantData: variant
                    });
                }
            });
        });

        return variants;
    };

    useEffect(() => {
        if (userId) {
            const filterCart = Cart.filter((data) => data.userId === userId);
            setCart(filterCart);

            // Initialize selected variants from cart data
            const initialVariants = {};
            filterCart.forEach(item => {
                initialVariants[item._id] = {};
                if (item.variant && item.variant.data) {
                    item.variant.data.forEach(variant => {
                        initialVariants[item._id][variant.label] = {
                            value: variant.value,
                            variantId: variant.id,
                            variantData: variant
                        };
                    });
                }
            });
            setSelectedVariants(initialVariants);
        } else {
            setCart(Cart);
        }
    }, [userId, Cart, products]);


    const handleVariantChange = (cartItemId, productId, label, selectedOption) => {
        const newSelectedVariants = {
            ...selectedVariants,
            [cartItemId]: {
                ...selectedVariants[cartItemId],
                [label]: selectedOption
            }
        };
        setSelectedVariants(newSelectedVariants);

        // Find all selected variants for this item
        const selectedVariantData = [];
        Object.keys(newSelectedVariants[cartItemId]).forEach(label => {
            const option = newSelectedVariants[cartItemId][label];
            console.log("options:", option)
            selectedVariantData.push({
                id: option.variantId,
                label: label,
                value: option.value,
                mrp: option.variantData.mrp,
                price: option.variantData.price,
                stock: option.variantData.stock,
            });
        });

        // Get the main variant ID (use the first one if multiple exist)
        const mainVariantId = selectedVariantData.length > 0
            ? selectedVariantData[0].id
            : null;

        // Prepare payload for backend
        const variantPayload = {
            id: mainVariantId,
            data: selectedVariantData
        };

        console.log("variant payload:",selectedVariantData)

        dispatch(updateProductVariant({
            id: cartItemId,
            variant: variantPayload
        }));
    };

    const handleinc = (id, quantity) => {
        dispatch(updateProductQuantity({ id: id, quantity: quantity + 1 }))
    }

    const handledic = (id, quantity) => {
        if (quantity > 1) {
            dispatch(updateProductQuantity({ id: id, quantity: quantity - 1 }))
        } else {
            dispatch(removeProductFromCart(id));
            dispatch(updateProductQuantity({ id: id, quantity: 0 }))
        }
    }

    const orderPlace = () => {
        setOrderDone(true);
        setTimeout(() => setOrderDone(false), 1000);
    }

    const handleCheckOut = () => {
        if (userId) {
            // closeSideBar();
            router.push("/checkOut")
        } else {
            // toast.error("Please Login First")
            Swal.fire({
                icon: 'error',
                text: 'Please Login After Shopping.',
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    const handleRemoveCart = (id) => {
        dispatch(removeProductFromCart(id))
        Swal.fire({
            icon: 'success',
            text: 'Product Removed From Cart.',
            timer: 2000,
            showConfirmButton: false
        });
    }


    // Calculate subtotal before any discounts
    // const total = cart.reduce((acc, curr) => acc + curr.product.price * curr.quantity, 0);
    const total = cart.reduce((acc, curr) => acc + curr.variant.price * curr.quantity, 0);

    if (Loading) {
        return (
            <div className='loader-container'>
                <span className="loader"></span>
            </div>
        );
    }


    return (
        <div className='wishlist py-5 border-bottom'>
            <div className="container">
                <h4 className='text-center fw-bolder display-5 mt-5 mb-5'>YOUR SHOPPING CART</h4>

                {cart.length <= 0 ? <h2 className='fw-bold' style={{ textAlign: 'center' }}>YOUR CART IS EMPTY</h2>
                    :
                    <div className="row">
                        <div className="col-lg-8 col-md-12 mb-4">
                            <div className="border position-relative overflow-hidden" style={{ height: 'auto', boxShadow: '0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)' }}>
                                <div className="cartTable">
                                    {/* Headers remain unchanged */}
                                    <div className="row py-2 border-bottom d-none d-md-flex" style={{ backgroundColor: '#f2f2f2', color: '#6b7280' }}>
                                        <div className="col-md-4 fw-bold ps-md-5">Product</div>
                                        {/* <div className="col-md-4 fw-bold ps-md-5">Size</div> */}
                                        <div className="col-md-2 fw-bold ps-md-4">Price</div>
                                        <div className="col-md-2 fw-bold ps-md-2">Quantity</div>
                                        <div className="col-md-2 fw-bold ps-md-2">Subtotal</div>
                                        <div className="col-md-1 fw-bold" style={{ marginLeft: '-4%' }}>Remove</div>
                                    </div>

                                    {/* Cart items */}
                                    {cart.map((item, index) => {
                                        console.log("Cart item:", item);
                                        const availableVariants = getAvailableVariants(products.find(product => product._id === item.product._id));
                                        const currentVariants = selectedVariants[item._id] || {};
                                        console.log("available variants:", availableVariants)
                                        console.log(" variants:", item.variant.data)

                                        return (
                                            <div key={index} className="border-bottom p-3 mt-2">
                                                <div className="row align-items-center">
                                                    {/* Product image and name - unchanged */}
                                                    <div className="col-12 col-md-4 mb-3 mb-md-0 d-flex align-items-center">
                                                        <img src={item.product.thumbnail} alt={item.product.name} className='img-fluid' style={{ width: '80px', height: 'auto' }} />
                                                        <div className='ms-3'>
                                                            <span className='d-block text-truncate fw-bold' style={{ maxWidth: '200px', fontSize: '14px' }}>
                                                                {item.product.name}
                                                            </span>
                                                            {item.variant && item.variant.data && (
                                                                <div className="mt-1">
                                                                    {item.variant.data.map((variant, vIndex) => (
                                                                        <small key={vIndex} className="text-muted d-block" style={{ fontSize: '11px' }}>
                                                                            {variant.label}: {variant.value}
                                                                        </small>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Price with variant dropdowns added */}
                                                    <div className="col-6 col-md-2 mb-2 mb-md-0">
                                                        <div className="d-md-none fw-bold">Price:</div>
                                                        <span>{item.variant.price}</span>

                                                        {/* Variant dropdowns - added next to price */}
                                                        {Object.keys(availableVariants).length > 0 && (
                                                            <div className="mt-2 flex gap-2 justify-start items-center">
                                                                <span>Size </span>
                                                                {Object.keys(availableVariants).map(label => (

                                                                    <select
                                                                        key={label}
                                                                        className="form-select form-select-sm mt-1"
                                                                        value={
                                                                            JSON.stringify(
                                                                                availableVariants[label].find(
                                                                                    (opt) => opt.value === item.variant?.data.find(v => v.label === label)?.value
                                                                                ) || {}
                                                                            )
                                                                        }
                                                                        onChange={(e) => {
                                                                            if (e.target.value) {
                                                                                handleVariantChange(
                                                                                    item._id,
                                                                                    item.product._id,
                                                                                    label,
                                                                                    JSON.parse(e.target.value)
                                                                                );
                                                                            }
                                                                        }}
                                                                    >
                                                                        <option value="">Select {label}</option>
                                                                        {availableVariants[label].map((option, idx) => (
                                                                            <option
                                                                                key={idx}
                                                                                value={JSON.stringify({
                                                                                    value: option.value,
                                                                                    variantId: option.variantId,
                                                                                    variantData: option.variantData
                                                                                })}
                                                                            >
                                                                                {option.value}
                                                                            </option>
                                                                        ))}
                                                                    </select>

                                                                    // <select
                                                                    //     key={label}
                                                                    //     className="form-select form-select-sm mt-1"
                                                                    //     value={
                                                                    //         currentVariants[label]
                                                                    //             ? JSON.stringify({
                                                                    //                 value: currentVariants[label].value,
                                                                    //                 variantId: currentVariants[label].variantId,
                                                                    //                 variantData: currentVariants[label].variantData
                                                                    //             })
                                                                    //             : ""
                                                                    //     }
                                                                    //     onChange={(e) => {
                                                                    //         if (e.target.value) {
                                                                    //             handleVariantChange(
                                                                    //                 item._id,
                                                                    //                 item.product._id,
                                                                    //                 label,
                                                                    //                 JSON.parse(e.target.value)
                                                                    //             );
                                                                    //         }
                                                                    //     }}
                                                                    // >
                                                                    //     <option value="">Select {label}</option>
                                                                    //     {availableVariants[label].map((option, idx) => (
                                                                    //         <option
                                                                    //             key={idx}
                                                                    //             value={JSON.stringify({
                                                                    //                 value: option.value,
                                                                    //                 variantId: option.variantId,
                                                                    //                 variantData: option.variantData
                                                                    //             })}
                                                                    //         >
                                                                    //             {option.value}
                                                                    //         </option>
                                                                    //     ))}
                                                                    // </select>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Rest of the columns remain unchanged */}
                                                    <div className="col-6 col-md-2 mb-2 mb-md-0">
                                                        <div className="d-md-none fw-bold">Quantity:</div>
                                                        <div className="d-flex align-items-center">
                                                            <div className="dic" onClick={() => handledic(item._id, item.quantity)}>
                                                                <TiMinusOutline style={{ cursor: 'pointer' }} size={20} />
                                                            </div>
                                                            <span className='mx-2'>{item.quantity}</span>
                                                            <div className="inc" onClick={() => handleinc(item._id, item.quantity)}>
                                                                <TiPlusOutline style={{ cursor: 'pointer' }} size={20} />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-6 col-md-2 mb-2 mb-md-0">
                                                        <div className="d-md-none fw-bold">Subtotal:</div>
                                                        <span>{(item.variant.price * item.quantity).toFixed(2)}</span>
                                                    </div>

                                                    <div className="col-6 col-md-1 text-end d-flex align-items-center gap-2 text-md-center">
                                                        <div className="d-md-none fw-bold">Remove:</div>
                                                        <span onClick={() => handleRemoveCart(item._id)} style={{ cursor: 'pointer' }}>
                                                            <RiDeleteBin5Line size={20} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Order summary section remains unchanged */}
                        <div className="col-lg-4 col-md-12 mt-4 mt-lg-0">
                            <div className="border p-0 h-100" style={{
                                position: 'sticky',
                                top: '20px',
                                maxHeight: 'calc(100vh - 40px)',
                                overflowY: 'auto',
                                boxShadow: '0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)'
                            }}>
                                <div className="cartItems border-bottom" style={{ padding: '10px 0' }}>
                                    <span style={{ fontSize: '12px', color: '#6b7280' }} className='fw-bold d-block px-3'>THERE ARE {cart.length} ITEMS IN YOUR CART</span>
                                </div>
                                <div className="total p-3" style={{ backgroundColor: '#f2f2f2' }}>
                                    <div className="d-flex align-items-center justify-content-between mb-2">
                                        <span className='fw-bold' style={{ fontSize: '14px' }}>TOTAL:</span>
                                        <span className='fs-4 fw-bold'>{total.toFixed(2)}</span>
                                    </div>
                                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between mb-2">
                                        <span className='fw-bold mb-1 mb-md-0' style={{ fontSize: '14px' }}>SHIPPING:</span>
                                        <span className='fw-bold' style={{ fontSize: '10px', color: '#6b7280' }}>Shipping & taxes calculated at checkout</span>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span className='fw-bold' style={{ color: 'green', fontSize: '14px' }}>Congratulations! You've got free shipping!</span>
                                        <FaTruckFast size={26} style={{ marginLeft: '10px', color: 'green' }} />
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#6b7280' }}>Free shipping for any orders above <span className='fw-bold' style={{ color: 'green' }}>200.00</span></span>
                                    <span className='fw-bold d-block my-2' style={{ fontSize: '14px' }}>Add a note to your order :</span>
                                    <textarea
                                        name="note"
                                        id="note"
                                        className='border-0 p-2 fw-bold w-100'
                                        style={{ fontSize: '10px', minHeight: '100px' }}
                                        placeholder='ADD YOUR NOTE HERE'
                                    ></textarea>
                                </div>
                                <button onClick={handleCheckOut} className='py-3 border-0 text-white fw-bold orderbtn w-100'>CHECK OUT ORDER</button>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
};

export default CartPage;