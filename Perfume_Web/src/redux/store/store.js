import { configureStore } from "@reduxjs/toolkit";
import HomeSlice from "../slice/HomeSlice";
import CollectionSlice from "../slice/CollectionSlice";
import BlogSlice from "../slice/BlogSlice";
import OrderSlice from "../slice/OrdersSlice";
import addToCart from "../slice/addToCartSlice"
import wish from "../slice/wishSlice"
import userData from "../slice/userDataSlice"

export const store = configureStore({
    reducer: {
        Home: HomeSlice,
        Collection: CollectionSlice,
        Blog: BlogSlice,
        orders: OrderSlice,
        addToCart: addToCart,
        wish: wish,
        userData: userData
    }
});
