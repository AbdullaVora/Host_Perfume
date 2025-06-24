"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaRegUser, FaChevronDown } from "react-icons/fa";
import { RiHeart2Line } from "react-icons/ri";
import { MdMenuOpen } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { MdOutlineQrCodeScanner } from "react-icons/md";
import SideBar from "./SideBar";
import CartBar from "./CartBar";
import { useDispatch, useSelector } from "react-redux";
import SideNav from "./SideNav";
import { fetchCategories } from "@/redux/slice/CollectionSlice";
import { fetchCartCart } from "@/redux/slice/addToCartSlice";
import { getUserWishlist } from "@/redux/slice/wishSlice";

const Header = () => {
  const [sideBar, setSideBar] = useState(false);
  const [sideNav, setNavBar] = useState(false);
  const [cartBar, setCartBar] = useState(false);
  const [Cartcount, setCartCount] = useState(0);
  const [Wishcount, setWishCount] = useState(0);
  const [collectionDropdown, setCollectionDropdown] = useState(false);
  const [categories, setCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [wish, setWish] = useState([]);
  //   const [filterCart, setfilterCart] = useState([]);
  //   const [filterWish, setfilterWish] = useState([]);
  // const [userId, setUserId] = useState('null')

  const dispatch = useDispatch();

  const { userId } = useSelector((state) => state.userData);
  console.log(userId);

  // Replace your useEffect with this:
  useEffect(() => {
    // const id = localStorage.getItem('userId');
    // setUserId(id);

    // Using a ref to track initialization
    const initRef = { current: false };

    if (!initRef.current) {
      dispatch(fetchCartCart());
      dispatch(fetchCategories());
      dispatch(getUserWishlist());
      initRef.current = true;
    }
  }, [dispatch]); // Empty dependency array to run only once

  const cartData = useSelector((state) => state.addToCart.Cart);
  const wishData = useSelector((state) => state.wish.wishList);
  const allCategories = useSelector((state) => state.Collection.categories);

  // Update local state when Redux state changes
  // Fixed dependency array - changed 'wish' to 'wishData'
  useEffect(() => {
    if (userId) {
      const filterCart = cartData.filter((data) => data.userId === userId);
      const filterWish = wishData.filter((data) => data.userId === userId);

      //   setfilterCart(filterCartData);
      //   setfilterWish(filterWishData);

      setCart(filterCart);
      setWish(filterWish);
      setCartCount(filterCart.length);
      setWishCount(filterWish.length);
    } else {
      setCart([]);
      setWish([]);
      setCartCount(0);
      setWishCount(0);
    }
  }, [userId, cartData, wishData]); // Fixed 'wish' to 'wishData'


  useEffect(() => {
    // Organize categories and subcategories
    if (allCategories) {
      const parentCategories = allCategories.filter(
        (cat) => cat.parent === "N/A" && cat.status === true
      );
      const categoriesWithSubs = parentCategories.map((parent) => ({
        ...parent,
        subcategories: allCategories.filter(
          (cat) => cat.parent === parent.name && cat.status === true
        ),
      }));
      setCategories(categoriesWithSubs);
    }
  }, [cart, wish, allCategories]);

  const closeSideBar = () => {
    setSideBar(false);
    setCartBar(false);
    setNavBar(false);
  };

  return (
    <>
      <SideBar openSlide={sideBar} closeSideBar={closeSideBar} />
      <CartBar openSlide={cartBar} closeSideBar={closeSideBar} />
      <SideNav openSlide={sideNav} closeSideBar={closeSideBar} />
      <div
        className={`trans-bg vh-100 w-100 position-fixed top-0 start-0 ${sideBar || sideNav || cartBar ? "d-block" : "d-none"
          }`}
        onClick={() => {
          setSideBar(false);
          setCartBar(false);
          setNavBar(false);
        }}
        style={{ background: "rgba(0, 0, 0, 0.5)", zIndex: "1000" }}
      ></div>
      <div className="shadow-sm">
        <div className="container-lg">
          <header className="px-3 d-flex align-items-center justify-content-between">
            <Link href="/">
              <div className="logo d-flex align-items-center">
                <img src="/images/logo.png" alt="logo" className="img-fluid" />
              </div>
            </Link>

            <nav className="d-md-flex d-none align-items-center">
              <Link href="/" className="px-2 py-2 px-lg-4 text-decoration-none">
                Home
              </Link>
              <Link
                href="/collection"
                className="px-2 py-2 px-lg-4 text-decoration-none"
              >
                Collection
              </Link>

              <Link
                href="/Mens"
                className="px-2 py-2 px-lg-4 text-decoration-none"
              >
                Mens
              </Link>
              <Link
                href="/Womens"
                className="px-2 py-2 px-lg-4 text-decoration-none"
              >
                Womens
              </Link>
              <Link
                href="/Unisex"
                className="px-2 py-2 px-lg-4 text-decoration-none"
              >
                Unisex
              </Link>
              {/* Collection Dropdown */}
              <div
                className="position-relative"
                onMouseEnter={() => setCollectionDropdown(true)}
                onMouseLeave={() => setCollectionDropdown(false)}
              >
                <Link
                  href="/Fragnance"
                  className="text-decoration-none px-2 py-2 px-lg-4"
                >
                  Fragnance
                </Link>
                {/* <div className="d-flex align-items-center cursor-pointer">
                                    <FaChevronDown className="ms-1" size={12} />
                                </div> */}

                {collectionDropdown && (
                  <div
                    className="position-absolute start-0 mt-2 py-2 bg-white shadow rounded"
                    style={{ minWidth: "200px", zIndex: 1000 }}
                  >
                    {categories.map((category) => (
                      <div key={category._id} className="dropdown-item-parent">
                        <Link
                          href={`/Fragnance?category=${encodeURIComponent(
                            category.name
                          )}`}
                          className="d-block px-3 py-2 text-decoration-none hover-bg-light"
                        >
                          {category.name}
                        </Link>

                        {category.subcategories.length > 0 && (
                          <div className="dropdown-item-children ms-3">
                            {category.subcategories.map((subcategory) => (
                              <Link
                                key={subcategory._id}
                                href={`/Fragnance?category=${encodeURIComponent(
                                  category.name
                                )}&subcategory=${encodeURIComponent(
                                  subcategory.name
                                )}`}
                                className="d-block px-3 py-2 text-decoration-none hover-bg-light"
                              >
                                {subcategory.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Link
                href="/blog"
                className="px-2 py-2 px-lg-4 text-decoration-none"
              >
                Blog
              </Link>
              <Link
                href="/about"
                className="px-2 py-2 px-lg-4 text-decoration-none"
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="px-2 py-2 px-lg-4 text-decoration-none"
              >
                Contact Us
              </Link>
            </nav>
            <div className="icons d-flex align-items-center">
              {/* <Link href="/QrScanner" className="text-decoration-none text-black">
                <MdOutlineQrCodeScanner size={44}
                  className="me-sm-2 me-1 rounded-3 px-2 iconHover"
                />
              </Link> */}
              <FaRegUser
                size={38}
                className="me-sm-2 me-1 rounded-3 px-2 iconHover"
                onClick={() => setSideBar(true)}
              />
              <div className="wish position-relative">
                <Link
                  href="/wishlist"
                  className="text-decoration-none text-black"
                >
                  <RiHeart2Line
                    size={40}
                    className="me-sm-2 me-1 rounded-3 px-2 pt-1 iconHover"
                  />
                </Link>
                <sup
                  className="position-absolute end-0 translate-middle rounded-circle text-white"
                  style={{
                    backgroundColor: "#0a5d5d",
                    padding: "8px 6px",
                    top: "28%",
                  }}
                >
                  {Wishcount}
                </sup>
              </div>
              <div className="cart position-relative">
                <HiOutlineShoppingCart
                  size={38}
                  className="me-sm-2 me-1 rounded-3 px-2 iconHover"
                  onClick={() => setCartBar(true)}
                />
                <sup
                  className="position-absolute end-0 translate-middle rounded-circle text-white"
                  style={{
                    backgroundColor: "#0a5d5d",
                    padding: "8px 6px",
                    top: "22%",
                  }}
                >
                  {Cartcount}
                </sup>
              </div>
              <div className="navIcon d-md-none">
                <MdMenuOpen
                  size={40}
                  className="rounded-3 p-1 iconHover"
                  onClick={() => setNavBar(true)}
                />
              </div>
            </div>
          </header>
        </div>
      </div>
    </>
  );
};

export default Header;
