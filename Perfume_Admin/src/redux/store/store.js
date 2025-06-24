import { configureStore } from '@reduxjs/toolkit';
import userSlice from "../slices/auth/userSlice";
import sliderSlice from "../slices/Dashboard/Banner_Config/sliderSlice";
import couponsSlice from "../slices/Dashboard/Banner_Config/couponSlice";
import bannerSlice from "../slices/Dashboard/Banner_Config/bannerSlice";
import categorySlice from "../slices/Dashboard/Product_Config/categorySlice";
import variantsSlice from "../slices/Dashboard/Product_Config/variantsSlice";
import brandSlice from "../slices/Dashboard/Product_Config/brandSlice";
import orderStatusSlice from "../slices/Dashboard/Order_Config/orderStatusSlice";
import paymentMethods from "../slices/Dashboard/Website_Config/paymentMethodSlice";
import shippingPartners from "../slices/Dashboard/Website_Config/shippingPartnerSlice";
import socialLinks from "../slices/Dashboard/Website_Config/socialLinksSlice";
import productSlice from "../slices/Dashboard/product/productSlice";
import subAdminSlice from "../slices/Dashboard/SubAdmin/subAdminSlice"

export const store = configureStore({
  reducer: {
    user: userSlice,
    sliders: sliderSlice,
    categories: categorySlice,
    variants: variantsSlice,
    banners: bannerSlice,
    coupons: couponsSlice,
    orderStatus: orderStatusSlice,
    paymentMethods: paymentMethods,
    shippingPartners: shippingPartners,
    socialLinks: socialLinks,
    products: productSlice,
    brand: brandSlice,
    subAdmins: subAdminSlice,
  },

});

