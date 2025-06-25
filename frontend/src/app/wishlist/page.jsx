"use client";

import React, { useEffect, useState } from "react";
import Footer from "@/components/Footer";
import { useDispatch, useSelector } from "react-redux";
import ArrivalCard from "@/components/ArrivalCard";
import Header from "@/components/Header";
import { getUserWishlist } from "@/redux/slice/wishSlice";

const WishListComp = () => {
  const [wishData, setWish] = useState([]);

  const { wishList = [], loading: Loading } = useSelector(
    (state) => state.wish
  );

  const { userId } = useSelector((state) => state.userData);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserWishlist());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      const filterWish = wishList.filter((data) => data.userId === userId);

      setWish(filterWish);
    } else {
      setWish([]);
    }
  }, [userId, wishList]);

  if (Loading) {
    return (
      <div className="loader-container">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <>
      {/* <Header /> */}
      <div className="wishlist py-5 border-bottom">
        <div className="container">
          <h2 className="text-center fw-bolder display-5 mt-5 mb-5">
            PAGE WISHLIST
          </h2>
          {!wishData || wishData.length === 0 ? (
            <h4 className="fw-bold" style={{ textAlign: "center" }}>
              Your WishList Is Empty
            </h4>
          ) : (
            <div
              className={`cards d-flex flex-wrap ${wishData.length >= 4
                ? "justify-content-between"
                : "justify-content-start"
                }`}
            >
              {wishData.map((card, index) => (
                <div key={card._id} className="col-6 col-md-4 col-lg-3">
                  <ArrivalCard
                    key={index}
                    img={card.product.thumbnail}
                    id={card.product._id}
                    title={card.product.name}
                    price={card.product.price}
                    iswish={true}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default WishListComp;
