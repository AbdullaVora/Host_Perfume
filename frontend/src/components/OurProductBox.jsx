import React, { useState } from 'react';
import { HiOutlineShoppingCart } from "react-icons/hi";
import { RiHeart2Line, RiHeartFill, RiStarSmileLine } from "react-icons/ri";
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart, fetchProducts } from '../redux/slice/addToCartSlice';
import { useRouter } from 'next/navigation';
import { HiShoppingCart } from 'react-icons/hi2';



const OurProductBox = ({ id, img, title, Cwidth, price }) => {
    const [hover, setHover] = useState(false);
    const dispatch = useDispatch()

    const { userId } = useSelector((state) => state.userData)

    const router = useRouter()

    const handleHover = () => setHover(!hover);

    // useEffect(() => {
    //     dispatch(fetchProducts());
    //     const id = localStorage.getItem('userId');
    //     setUserId(id)
    // }, [dispatch])

    const cartData = useSelector(state => state.addToCart.Cart);
    const products = useSelector(state => state.addToCart.products);
    const wishListData = useSelector(state => state.wish.wishList);

    // Check if product is in cart
    const isInCart = cartData.some(item =>
        item?.product?._id === id && item?.userId === userId
    );

    // Check if product is in wishlist
    const isInWishlist = wishListData.some(item =>
        item?.product?._id === id && item?.userId === userId
    );


    const onDetail = (id) => {
        router.push(`/productDetails/${id}`)
    }

    const handleCart = (id) => {
        dispatch(addProductToCart({ userId, id, products: products[0] }));
    };

    const handleWish = (id) => {
        dispatch(addToWishList(id));
    };

    return (
        <div
            className="arrivalCard position-relative overflow-hidden mt-5"
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
            style={{ height: '300px' }}
            data-aos="zoom-in" data-aos-delay="150"

        >
            <div className="img" onClick={() => onDetail(id)}>
                <img
                    src={img}
                    alt="arrival-img"
                    className="img-fluid"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </div>
            <div className="content mt-3 mb-3 text-center">
                <h6 className="fw-normal">{title}</h6>
                <span>{price}</span>
            </div>
            <div className="sideIcons">
                <div className="cart" onClick={() => handleCart(id)}>
                    {isInCart ? (
                        <HiShoppingCart size={16} color="orange" />
                    ) : (
                        <HiOutlineShoppingCart size={16} />
                    )}
                </div>
                <div className="star" onClick={() => handleWish(id)}>
                    {isInWishlist ? (
                        <RiHeartFill size={18} color="red" />
                    ) : (
                        <RiHeart2Line size={18} />
                    )}
                </div>

            </div>
        </div>
    );
};

export default OurProductBox;
