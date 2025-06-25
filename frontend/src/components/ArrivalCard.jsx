import React, { useEffect, useState } from "react";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import { RiHeart2Line, RiHeartFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  addProductToCart,
  fetchCartCart,
  fetchProducts,
} from "@/redux/slice/addToCartSlice";
import {
  addToWishlist,
  getUserWishlist,
  removeFromWishlist,
} from "@/redux/slice/wishSlice";
import { fetchCategories } from "@/redux/slice/CollectionSlice";
import Swal from "sweetalert2";

const ArrivalCard = ({ id, img, title, price, isCollection, iswish }) => {
  const { userId } = useSelector((state) => state.userData);
  const [hover, setHover] = useState(false);
  // const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  // useEffect(() => {
  //   const id = localStorage.getItem('userId');
  //   if(id) {
  //     setUserId(id)
  //   }
  // }, [dispatch])

  // Get data from Redux store
  const cartData = useSelector((state) => state.addToCart.Cart);
  const products = useSelector((state) => state.addToCart.products);
  const wishListData = useSelector((state) => state.wish.wishList);

  // Check if product is in cart
  const isInCart = cartData.some(
    (item) => item?.product?._id === id && item?.userId === userId
  );

  // Check if product is in wishlist
  const isInWishlist = wishListData.some(
    (item) => item?.product?._id === id && item?.userId === userId
  );

  const handleHover = () => setHover(!hover);

  const onDetail = () => {
    router.push(`/productDetails/${id}`);
  };

  // const showToast = (icon, title) => {
  //   const Toast = Swal.mixin({
  //     showConfirmButton: false,
  //     timer: 1500, // increased timer for better readability
  //     didOpen: (toast) => {
  //       toast.addEventListener('mouseenter', Swal.stopTimer);
  //       toast.addEventListener('mouseleave', Swal.resumeTimer);
  //     },
  //     customClass: {
  //       popup: `custom-toast ${icon}-toast`,
  //       icon: 'swal2-icon-custom'
  //     }
  //   });

  //   Toast.fire({
  //     icon,
  //     title,
  //     position: 'top-end'
  //   });
  // };
  const handleCart = (id) => {
    if (isInCart) {
      Swal.fire({
        icon: "info",
        text: "Product Already Added.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (userId) {
      dispatch(addProductToCart({ userId, id: id, products }));
      Swal.fire({
        icon: "success",
        text: "Product Added Successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Please Login First.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  const handleWish = async (id) => {
    if (isInWishlist) {
      await dispatch(removeFromWishlist(id));
      Swal.fire({
        icon: "success",
        text: "Product Removed Successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else if (userId) {
      await dispatch(addToWishlist({ userId, product: id }));
      Swal.fire({
        icon: "success",
        text: "Product Added Successfully.",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "error",
        text: "Please Login First.",
        timer: 2000,
        showConfirmButton: false,
      });
    }
    // Refresh the wishlist data
    dispatch(getUserWishlist());
  };

  return (
    // <div
    //   className={`arrivalCard position-relative overflow-hidden px-2 mb-4 ${
    //     iswish ? "mx-2" : ""
    //   }`}
    // >
    //   <div className="img shadow-lg" style={{ width: isCollection || iswish ? '288px' : '225px', height: isCollection || iswish ? '350px' : '280px' }} onMouseEnter={handleHover}
    //     onMouseLeave={handleHover}
    //     onClick={onDetail}
    //   >
    //     <img
    //       src={img}
    //       alt="arrival-img"
    //       // style={{ cursor: 'pointer', width: isCollection || iswish ? '280px' : '195px', height: isCollection || iswish ? '350px' : '240px' }}
    //       style={{ cursor: "pointer", width: "100%", height: "100%" }}
    //       className="img-fluid"
    //     />
    //   </div>
    //   <div
    //     className={`content text-center ${
    //       isCollection || iswish ? "mb-5 mt-3" : "mb-5 mt-3"
    //     }`}
    //   >
    //     <h6
    //       className="fw-normal text-truncate"
    //       style={{ cursor: "pointer" }}
    //       onClick={onDetail}
    //     >
    //       {title}
    //     </h6>
    //     <span style={{ display: hover && !isCollection ? "none" : "block" }}>
    //       {price}
    //     </span>
    //   </div>

    //   {!isCollection && (
    //     <button
    //       onClick={() => (iswish ? handleWish(id) : onDetail(id))}
    //       className="bg-transparent rounded-1 mx-auto w-100 py-2 mb-3 mt-5"
    //     >
    //       {iswish ? "Remove Wish" : "Quick Add"}
    //     </button>
    //   )}

    //   <div className="sideIcons">
    //     <div className="cart" onClick={() => handleCart(id)}>
    //       {isInCart ? (
    //         <HiShoppingCart size={16} color="orange" />
    //       ) : (
    //         <HiOutlineShoppingCart size={16} />
    //       )}
    //     </div>
    //     {!iswish && (
    //       <div className="star" onClick={() => handleWish(id)}>
    //         {isInWishlist ? (
    //           <RiHeartFill size={18} color="red" />
    //         ) : (
    //           <RiHeart2Line size={18} />
    //         )}
    //       </div>
    //     )}
    //   </div>
    // </div>

    <div
      className={`arrivalCard position-relative ${ iswish ? 'overflow-visible arrivalCard-hoverWish' : 'overflow-hidden arrivalCard-hoverMain' } px-2 pt-2 ${
        iswish ? "mx-2" : ""
      }`}
    >
      <div
        className="img shadow-lg"
        onMouseEnter={handleHover}
        onMouseLeave={handleHover}
        onClick={onDetail}
      >
        <img
          src={img}
          alt="arrival-img"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
          className="img-fluid"
        />
      </div>

      <div className="content text-center mb-5 mt-3">
        <h6
          className="fw-normal text-truncate"
          style={{ cursor: "pointer" }}
          onClick={onDetail}
        >
          {title}
        </h6>
        <span style={{ display: hover && !isCollection ? "none" : "block" }}>
          {price}
        </span>
      </div>

      {!isCollection && (
        <button
          onClick={() => (iswish ? handleWish(id) : onDetail(id))}
          className={`${iswish ? 'bg-white' : 'bg-transparent'} rounded-1 mx-auto w-100 py-2 mt-5`}
        >
          {iswish ? "Remove Wish" : "Quick Add"}
        </button>
      )}

      <div className="sideIcons">
        <div className="cart" onClick={() => handleCart(id)}>
          {isInCart ? (
            <HiShoppingCart size={16} color="orange" />
          ) : (
            <HiOutlineShoppingCart size={16} />
          )}
        </div>
        {!iswish && (
          <div className="star" onClick={() => handleWish(id)}>
            {isInWishlist ? (
              <RiHeartFill size={18} color="red" />
            ) : (
              <RiHeart2Line size={18} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArrivalCard;

// import React, { useEffect, useState } from 'react';
// import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
// import { RiHeart2Line, RiHeartFill } from "react-icons/ri";
// import { useDispatch, useSelector } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// import { useRouter } from 'next/navigation';
// import { addProductToCart, fetchCartCart } from "@/redux/slice/addToCartSlice";
// import { addToWishlist, getUserWishlist, removeFromWishlist } from '@/redux/slice/wishSlice';

// const ArrivalCard = ({ id, img, title, price, isCollection, iswish }) => {
//   const [hover, setHover] = useState(false);
//   const [userId, setUserId] = useState(null);
//   const [cart, setCart] = useState([]);
//   const [wishList, setWishList] = useState([]);
//   const [localIsInWishlist, setLocalIsInWishlist] = useState(false);
//   const [isWishlistLoading, setIsWishlistLoading] = useState(false);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   // Get cart and wishlist from Redux store
//   const cartData = useSelector(state => state.addToCart.Cart);
//   const products = useSelector(state => state.addToCart.products);
//   const wishListData = useSelector(state => state.wish.wishList);

//   useEffect(() => {
//     const id = localStorage.getItem('userId');
//     setUserId(id);

//     // Fetch initial data
//     dispatch(fetchCartCart());
//     // dispatch(getUserWishlist());
//   }, [dispatch]);

//   useEffect(() => {
//     if (userId) {
//       const filterCart = cartData.filter((data) => data.userId === userId);
//       const filterWish = wishListData.filter((data) => data.userId === userId);
//       setCart(filterCart);
//       setWishList(filterWish);
//     } else {
//       setCart(cartData);
//       setWishList(wishListData);
//     }
//   }, [userId, cartData, wishListData]);

//   // Sync local wishlist state with Redux
//   useEffect(() => {
//     const isInWishlist = wishList.some(item => item?.product?._id === id);
//     setLocalIsInWishlist(isInWishlist);
//   }, [wishList, id]);

//   // Check if product is in cart
//   const isInCart = cart.some(item => item?.product?._id === id);

//   const handleHover = () => setHover(!hover);

//   const onDetail = () => {
//     router.push(`/productDetails/${id}`);
//   };

//   const handleCart = (id) => {
//     if (isInCart) {
//       toast.dismiss();
//       toast.info('Product is already in cart');
//     } else {
//       dispatch(addProductToCart({ userId, id: id, products }));
//       toast.dismiss();
//       toast.success('Product Added to Cart');
//     }
//   };

//   const handleWish = async (id) => {
//     if (isWishlistLoading) return;

//     setIsWishlistLoading(true);
//     const currentWishState = localIsInWishlist;

//     try {
//       // Optimistic update
//       setLocalIsInWishlist(!currentWishState);

//       if (currentWishState) {
//         await dispatch(removeFromWishlist(id));
//         toast.success('Product Removed from WishList');
//       } else {
//         await dispatch(addToWishlist({ userId, product: id }));
//         toast.success('Product Added to WishList');
//       }

//       // Refresh the wishlist to ensure sync
//       // dispatch(getUserWishlist());
//     } catch (error) {
//       // Revert if API call fails
//       setLocalIsInWishlist(currentWishState);
//       toast.error('Operation failed. Please try again.');
//     } finally {
//       setIsWishlistLoading(false);
//     }
//   };

//   return (
//     <div
//       className="arrivalCard position-relative overflow-hidden px-2"
//       onMouseEnter={handleHover}
//       onMouseLeave={handleHover}
//     >
//       <div className="img shadow-lg" onClick={onDetail}>
//         <img
//           src={img}
//           alt="arrival-img"
//           style={{ cursor: 'pointer', width: isCollection || iswish ? '280px' : '195px', height: isCollection || iswish ? '350px' : '240px' }}
//           className="img-fluid"
//         />
//       </div>
//       <div className={`content text-center ${isCollection || iswish ? "mb-5 mt-3" : "mb-5 mt-3"}`}>
//         <h6 className="fw-normal text-truncate" style={{ cursor: 'pointer' }} onClick={onDetail}>{title}</h6>
//         <span style={{ display: hover && !isCollection ? 'none' : 'block' }}>{price}</span>
//       </div>

//       {!isCollection && (
//         <button
//           onClick={() => iswish ? dispatch(removeFromWishlist(id)) : onDetail(id)}
//           className="bg-transparent rounded-1 mx-auto w-100 py-2 mb-3 mt-5"
//           disabled={isWishlistLoading}
//         >
//           {iswish ? 'Remove Wish' : 'Quick Add'}
//         </button>
//       )}

//       <div className="sideIcons">
//         <div className="cart" onClick={() => handleCart(id)}>
//           {isInCart ? (
//             <HiShoppingCart size={16} color="orange" />
//           ) : (
//             <HiOutlineShoppingCart size={16} />
//           )}
//         </div>
//         <div className="star" onClick={() => handleWish(id)}>
//           {localIsInWishlist ? (
//             <RiHeartFill size={18} color="red" />
//           ) : (
//             <RiHeart2Line size={18} />
//           )}
//         </div>
//       </div>

//       {/* Toast Notification */}
//       {!isCollection && (
//         <ToastContainer
//           position="bottom-right"
//           autoClose={2000}
//           hideProgressBar={false}
//           newestOnTop={false}
//           closeOnClick
//           rtl={false}
//           pauseOnFocusLoss
//           draggable
//           pauseOnHover
//         />
//       )}
//     </div>
//   );
// };

// export default ArrivalCard;
