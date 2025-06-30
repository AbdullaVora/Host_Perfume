

// import Link from "next/link";
// import { HiOutlineShoppingCart } from "react-icons/hi";
// import { IoClose } from "react-icons/io5";
// import { MdOutlineRemoveShoppingCart } from "react-icons/md";
// import { useDispatch, useSelector } from "react-redux";
// import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";
// import { RiDeleteBin5Line } from "react-icons/ri";
// import { useEffect, useState } from "react";
// import { removeProductFromCart, updateProductQuantity } from "../redux/slice/CollectionSlice";
// import { usePreventScroll } from "@/hook/usePreventScroll";
// import { useRouter } from "next/navigation";
// import { toast, ToastContainer } from "react-toastify";
// import { fetchCartCart } from "@/redux/slice/addToCartSlice";

// const Cart = ({ id, img, title, price, quantity }) => {
//     const dispatch = useDispatch();

//     const handleinc = () => {
//         dispatch(updateProductQuantity({ id: id, quantity: quantity + 1 }))
//     }
//     const handledic = () => {
//         if (quantity > 1) {
//             dispatch(updateProductQuantity({ id: id, quantity: quantity - 1 }))
//         } else {
//             dispatch(removeProductFromCart(id));
//             dispatch(updateProductQuantity({ id: id, quantity: 0 }))
//         }
//     }

//     return (
//         <div className="cart p-3 border-bottom">
//             <div className="d-flex align-items-center">
//                 <img
//                     src={img}
//                     alt={title}
//                     className="img-fluid"
//                     style={{ width: '100px', maxWidth: '150px' }}
//                 />
//                 <div className="mx-3 flex-grow-1">
//                     <h6 className="fw-bold mb-2">{title}</h6>
//                     <span className="fw-bold d-block mb-2">{price * quantity}</span>
//                     <div className="quantity d-flex align-items-center">
//                         <div className="dic" onClick={handledic}>
//                             <TiMinusOutline style={{ cursor: 'pointer' }} size={20} />
//                         </div>
//                         <span className="px-3">{quantity}</span>
//                         <div className="inc" onClick={handleinc}>
//                             <TiPlusOutline style={{ cursor: 'pointer' }} size={20} />
//                         </div>
//                         <div className="delete ms-auto" onClick={() => (dispatch(removeProductFromCart(id)))}>
//                             <RiDeleteBin5Line size={20} className="cursor-pointer" />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const CartBar = ({ openSlide, closeSideBar }) => {
//     const cartData = useSelector((state) => state.addToCart.Cart);

//     const [cart, setcart] = useState([])

//     const [total, setTotal] = useState(0);
//     const [userId, setuserId] = useState('null');
//     const router = useRouter()
//     const dispatch = useDispatch()

//     // Safely parse cart data
//     const parsedCart = cart
//         ? cart.map(item => (item))
//         : [];

//     console.log(cart)

//     useEffect(() => {
//         const id = localStorage.getItem("userId");
//         setuserId(id);
//         dispatch(fetchCartCart());
//     }, [dispatch])

//     useEffect(() => {
//         if (userId !== 'null') {
//             const filterCart = cartData.filter((data) => data.userId === userId);
//             setcart(filterCart)
//         } else {
//             setcart(cartData)
//         }
//     }, [userId, cartData]);


//     useEffect(() => {
//         let newTotal = 0;
//         parsedCart.forEach(item => (newTotal += item.price * item.quantity));
//         setTotal(newTotal);
//     }, [parsedCart]);

//     usePreventScroll(openSlide);

//     const handleCheckOut = () => {
//         const userId = localStorage.getItem("userId");
//         if (userId) {
//             closeSideBar();
//             router.push("/checkout")
//         } else {
//             toast.error("Please Login First")
//         }
//     }

//     return (
//         <div className="Cartbar position-relative">
//             <div
//                 className={`
//                     slide 
//                     position-fixed 
//                     bg-white 
//                     h-100 
//                     ${openSlide ? 'show-sidebar' : 'hide-sidebar'}
//                 `}
//                 style={{
//                     zIndex: '999',
//                     top: 0,
//                     width: '100%', // Full width on mobile
//                     maxWidth: '350px', // Maximum width
//                     right: 0,
//                     transition: 'transform 0.3s ease-in-out',
//                     transform: openSlide ? 'translateX(0)' : 'translateX(100%)',
//                     overscrollBehavior: 'contain'
//                 }}
//             >
//                 <div className="topBar border-bottom p-3">
//                     <div className="d-flex align-items-center justify-content-between">
//                         <div className="cartHead d-flex align-items-center">
//                             <HiOutlineShoppingCart size={25} />
//                             <span className="ms-2 fw-bold">CART</span>
//                         </div>
//                         <IoClose
//                             size={30}
//                             style={{ cursor: "pointer" }}
//                             onClick={closeSideBar}
//                         />
//                     </div>
//                 </div>

//                 {/* Cart Items Container */}
//                 <div
//                     className="cart-items-container py-1"
//                     style={{
//                         maxHeight: "calc(100vh - 300px)",
//                         overflowY: "auto"
//                     }}
//                 >
//                     {parsedCart.length === 0 ? (
//                         <div className="emptyCart d-flex flex-column py-5 align-items-center text-center">
//                             <MdOutlineRemoveShoppingCart size={70} className="text-muted" />
//                             <h2 className="fs-4 mt-3">Your cart is empty</h2>
//                         </div>
//                     ) : (
//                         parsedCart.map((item, index) => (
//                             <Cart
//                                 key={index}
//                                 id={item._id}
//                                 img={item.thumbnail}
//                                 price={item.price}
//                                 quantity={item.quantity}
//                                 title={item.name}
//                             />
//                         ))
//                     )}
//                 </div>

//                 {/* Total and Action Buttons */}
//                 <div
//                     className="cart-summary position-absolute bottom-0 start-0 w-100 bg-white p-3 border-top"
//                     style={{
//                         boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
//                     }}
//                 >
//                     <div className="d-flex justify-content-between mb-3">
//                         <h6 className="fw-bold fs-6">TOTAL</h6>
//                         <h6 className="fw-bold fs-6">{total}</h6>
//                     </div>
//                     <Link href='/cart' className="text-decoration-none">
//                         <button
//                             className="btn btn-dark fw-bold w-100 mb-2"
//                             onClick={closeSideBar}
//                         >
//                             VIEW CART
//                         </button>
//                     </Link>
//                     <button
//                         onClick={handleCheckOut}
//                         className="btn btn-dark fw-bold w-100"
//                     >
//                         CHECK OUT
//                     </button>
//                 </div>
//             </div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default CartBar;

import Link from "next/link";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { TiMinusOutline, TiPlusOutline } from "react-icons/ti";
import { RiDeleteBin5Line } from "react-icons/ri";
import React, { useEffect, useRef, useState } from "react";
import { removeProductFromCart, updateProductQuantity } from "../redux/slice/addToCartSlice";
import { usePreventScroll } from "@/hook/usePreventScroll";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { fetchCartCart } from "@/redux/slice/addToCartSlice";
import Swal from "sweetalert2";

const Cart = ({ id, img, title, price, quantity }) => {
    const dispatch = useDispatch();

    const handleinc = async () => {
        await dispatch(updateProductQuantity({ id: id, quantity: quantity + 1 })).unwrap();
        dispatch(fetchCartCart());
    }

    const handledic = async () => {
        if (quantity > 1) {
            await dispatch(updateProductQuantity({ id: id, quantity: quantity - 1 })).unwrap();
            dispatch(fetchCartCart());
        } else {
            await dispatch(removeProductFromCart(id)).unwrap();
            dispatch(fetchCartCart());
        }
    }

    return (
        <div className="cart p-3 border-bottom">
            <div className="d-flex align-items-center">
                <img
                    src={img}
                    alt={title}
                    className="img-fluid"
                    style={{ width: '100px', maxWidth: '150px' }}
                />
                <div className="mx-3 flex-grow-1">
                    <h6 className="fw-bold mb-2">{title}</h6>
                    <span className="fw-bold d-block mb-2">₹{(price * quantity).toFixed(2)}</span>
                    <div className="quantity d-flex align-items-center">
                        <div className="dic" onClick={handledic}>
                            <TiMinusOutline style={{ cursor: 'pointer' }} size={20} />
                        </div>
                        <span className="px-3">{quantity}</span>
                        <div className="inc" onClick={handleinc}>
                            <TiPlusOutline style={{ cursor: 'pointer' }} size={20} />
                        </div>
                        <div className="delete ms-auto" onClick={() => (dispatch(removeProductFromCart(id)))}>
                            <RiDeleteBin5Line size={20} className="cursor-pointer" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CartBar = ({ openSlide, closeSideBar }) => {
    const cartData = useSelector((state) => state.addToCart?.Cart || []);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    // const [userId, setUserId] = useState();
    const router = useRouter();
    const dispatch = useDispatch();
    const [dispatchFlag, setDispatchFlag] = useState(false)

    const { userId } = useSelector((state) => state.userData)

    // console.log("cart:", cart)


    // Get userId on mount
    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         const id = localStorage.getItem('userId');
    //         setUserId(id);
    //     }
    // }, []);

    // Fetch cart only once
    const hasFetched = useRef(false);
    useEffect(() => {
        if (!hasFetched.current) {
            dispatch(fetchCartCart());
            hasFetched.current = true;
        }
    }, [dispatch]);

    useEffect(() => {
        if (userId) {
            const filterCart = cartData.filter((data) => data.userId === userId);

            setCart(filterCart);
        } else {
            setCart([]);
        }
    }, [userId, cartData]);

    useEffect(() => {
        const newTotal = cart.reduce((sum, item) => {
            return sum + (item.variant.price * item.quantity);
        }, 0);
        setTotal(newTotal);
    }, [cart]);

    usePreventScroll(openSlide);

    const handleCheckOut = () => {
        console.log(userId)
        if (userId) {
            closeSideBar();
            router.push("/checkOut");
        } else {
            // toast.error("Please Login First");
            Swal.fire({
                icon: 'error',
                text: 'Please Login',
                timer: 2000,
                showConfirmButton: false
            })

        }
    }

    return (
        <div className="Cartbar position-relative">
            <div
                className={`
                    slide 
                    position-fixed 
                    bg-white 
                    h-100 
                    ${openSlide ? 'show-sidebar' : 'hide-sidebar'}
                `}
                style={{
                    zIndex: '999',
                    top: 0,
                    width: '100%',
                    maxWidth: '350px',
                    right: 0,
                    transition: 'transform 0.3s ease-in-out',
                    transform: openSlide ? 'translateX(0)' : 'translateX(100%)',
                    overscrollBehavior: 'contain'
                }}
            >
                <div className="topBar border-bottom p-3">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="cartHead d-flex align-items-center">
                            <HiOutlineShoppingCart size={25} />
                            <span className="ms-2 fw-bold">CART ({cart.length})</span>
                        </div>
                        <IoClose
                            size={30}
                            style={{ cursor: "pointer" }}
                            onClick={closeSideBar}
                        />
                    </div>
                </div>

                <div
                    className="cart-items-container py-1"
                    style={{
                        maxHeight: "calc(100vh - 300px)",
                        overflowY: "auto"
                    }}
                >
                    {cart.length === 0 ? (
                        <div className="emptyCart d-flex flex-column py-5 align-items-center text-center">
                            <MdOutlineRemoveShoppingCart size={70} className="text-muted" />
                            <h2 className="fs-4 mt-3">Your cart is empty</h2>
                        </div>
                    ) : (
                        cart.map((item, index) => (
                            <Cart
                                key={item._id || index}
                                id={item._id}
                                img={item.product.thumbnail}
                                price={item.variant.price || item.product.price}
                                quantity={item.quantity}
                                title={item.product.name}
                            />
                        ))
                    )} 
                </div>

                {cart.length > 0 && (
                    <div
                        className="cart-summary position-absolute bottom-0 start-0 w-100 bg-white p-3 border-top"
                        style={{
                            boxShadow: '0 -2px 5px rgba(0,0,0,0.1)'
                        }}
                    >
                        <div className="d-flex justify-content-between mb-3">
                            <h6 className="fw-bold fs-6">TOTAL</h6>
                            <h6 className="fw-bold fs-6">₹{total.toFixed(2)}</h6>
                        </div>
                        <Link href='/cart' className="text-decoration-none">
                            <button
                                className="btn btn-dark fw-bold w-100 mb-2"
                                onClick={closeSideBar}
                            >
                                VIEW CART
                            </button>
                        </Link>
                        {/* <button
                            onClick={handleCheckOut}
                            className="btn btn-dark fw-bold w-100"
                        >
                            CHECK OUT
                        </button> */}
                    </div>
                )}
            </div>
            {/* <ToastContainer /> */}
        </div>
    );
};

export default CartBar;