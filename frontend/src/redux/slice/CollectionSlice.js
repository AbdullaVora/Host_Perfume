






// import { createSlice } from "@reduxjs/toolkit";
// import Collection from "../../data/Collection";

// const initialState = {
//     Collection: Collection,
//     Cart: []
// };

// const CollectionSlice = createSlice({
//     name: "Collection",
//     initialState,
//     reducers: {
//         addProductToCart(state, action) {
//             // Find the product by ID
//             const product = Collection.product.filter(product => product.id === action.payload);

//             // Check if product already exists in cart
//             const existingItemIndex = state.Cart.findIndex(item => {
//                 const parsedItem = JSON.parse(item);
//                 return parsedItem[0].id === action.payload;
//             });

//             if (existingItemIndex !== -1) {
//                 // If product exists, increment its quantity
//                 const existingItem = JSON.parse(state.Cart[existingItemIndex]);
//                 existingItem[0].quantity = (existingItem[0].quantity || 1) + 1;
//                 state.Cart[existingItemIndex] = JSON.stringify(existingItem);
//             } else {
//                 // If product doesn't exist, add it with quantity 1
//                 const newProduct = product.map(item => ({
//                     ...item,
//                     quantity: 1
//                 }));
//                 console.log(newProduct);

//                 state.Cart.push(JSON.stringify(newProduct));
//             }
//         },
//         removeProductFromCart(state, action) {
//             console.log("home: "+ action.payload);

//             state.Cart = state.Cart.filter(product => {
//                 const parsedProduct = JSON.parse(product)[0]; // Parse and access the first object in the array
//                 return parsedProduct.id !== action.payload;
//             });
//         },
//         updateProductQuantity(state, action) {
//             const { id, quantity } = action.payload;

//             // Find the product by parsing the stored JSON strings
//             const productIndex = state.Cart.findIndex(item => {
//                 const parsedItem = JSON.parse(item);  // Parse the JSON string

//                 return parsedItem[0].id === id;  // Assuming the item is an array, access the first element
//             });

//             if (productIndex !== -1) {
//                 // Parse the product, update its quantity, and re-stringify it
//                 const product = JSON.parse(state.Cart[productIndex]);
//                 product[0].quantity = quantity;

//                 // If the quantity is 0, remove the product from the cart
//                 if (quantity === 0) {
//                     state.Cart.splice(productIndex, 1); // Remove from the array
//                 } else {
//                     // Update the cart with the modified product
//                     state.Cart[productIndex] = JSON.stringify(product);  // Re-stringify it
//                 }
//             }
//         }
//     }
// });

// export const { addProductToCart, removeProductFromCart, updateProductQuantity } = CollectionSlice.actions;
// export default CollectionSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";
// import Collection from "../../data/Collection";
// import Home from "../../data/Home"

// const initialState = {
//     Cart: [],
//     WishList: []
// };

// const fetchProducts = createAsyncThunk(
//     'banners/fetchProducts',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await apiInstance.get(`${API_URL}/products`);
//             console.log(response.data)
//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response.data);
//         }
//     }
// );


// const CollectionSlice = createSlice({
//     name: "Collection",
//     initialState,
//     reducers: {
//         addProductToCart(state, action) {


//             // Find the product
//             const product = fetchProducts();

//             const filterProduct = product.filter((data) => (data._id === action.paylod))

//             if (!product) {
//                 console.error(`Product with ID ${action.payload} not found.`);
//                 return;
//             }

//             // Check if product already exists in cart
//             const existingItemIndex = state.Cart.findIndex(item => {
//                 const parsedItem = JSON.parse(item); // Parse the JSON string
//                 return parsedItem.id === action.payload; // Check if the IDs match
//             });

//             if (existingItemIndex !== -1) {
//                 // If product exists, increment its quantity
//                 const existingItem = JSON.parse(state.Cart[existingItemIndex]);
//                 existingItem.quantity = (existingItem.quantity || 1) + 1; // Increment quantity
//                 state.Cart[existingItemIndex] = JSON.stringify(existingItem); // Update in cart
//             } else {
//                 // If product doesn't exist, add it with quantity 1
//                 const newProduct = { ...product, quantity: 1 }; // Add quantity property
//                 state.Cart.push(JSON.stringify(newProduct)); // Add to cart
//             }
//         },
//         removeProductFromCart(state, action) {
//             console.log("Removing product with ID: " + action.payload);

//             state.Cart = state.Cart.filter(product => {
//                 const parsedProduct = JSON.parse(product); // Parse the JSON string
//                 return parsedProduct.id !== action.payload; // Remove product if IDs match
//             });
//         },
//         updateProductQuantity(state, action) {
//             const { id, quantity } = action.payload;

//             // Find the product by parsing the stored JSON strings
//             const productIndex = state.Cart.findIndex(item => {
//                 const parsedItem = JSON.parse(item); // Parse the JSON string
//                 return parsedItem.id === id; // Compare IDs
//             });

//             if (productIndex !== -1) {
//                 // Parse the product, update its quantity, and re-stringify it
//                 const product = JSON.parse(state.Cart[productIndex]);
//                 product.quantity = quantity;

//                 // If the quantity is 0, remove the product from the cart
//                 if (quantity === 0) {
//                     state.Cart.splice(productIndex, 1); // Remove from the array
//                 } else {
//                     // Update the cart with the modified product
//                     state.Cart[productIndex] = JSON.stringify(product); // Re-stringify it
//                 }
//             }
//         },
//         addToWishList(state, action) {
//             // Find the product by ID
//             const product = findProduct(action.payload);

//             if (!product) {
//                 console.error(`Product with ID ${action.payload} not found.`);
//                 return;
//             }

//             // Check if product already exists in the WishList
//             const existingItemIndex = state.WishList.findIndex(item => {
//                 const parsedItem = JSON.parse(item); // Parse the JSON string
//                 return parsedItem.id === action.payload; // Check if the IDs match
//             });

//             if (existingItemIndex === -1) {
//                 console.log(product);
//                 // If product doesn't exist in the WishList, add it
//                 state.WishList.push(JSON.stringify(product)); // Add the product as a JSON string
//                 console.log(state.WishList);
//             } else {
//                 console.log(`Product with ID ${action.payload} is already in the WishList.`);
//             }

//         },
//         removeFromWishList(state, action) {
//             state.WishList = state.WishList.filter(product => {
//                 const parsedProduct = JSON.parse(product); // Parse the JSON string
//                 return parsedProduct.id !== action.payload; // Remove product if IDs match
//             });

//         }

//     }
// });

// export const { addProductToCart, removeProductFromCart, updateProductQuantity, addToWishList, removeFromWishList } = CollectionSlice.actions;
// export default CollectionSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "@/api/instance";
const API_URL = '/api/dashboard';


// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
    'collection/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiInstance.get(`${API_URL}/products`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for fetching coupons
export const fetchCoupons = createAsyncThunk(
    'collection/fetchCoupons',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiInstance.get(`${API_URL}/coupons`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Async thunk for fetching payments methods
export const fetchPaymentsMethods = createAsyncThunk(
    'collection/fetchPaymentsMethods',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiInstance.get(`${API_URL}/paymentMethods`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Fetch All Categories
export const fetchCategories = createAsyncThunk("collection/fetchCategories", async (_, { rejectWithValue }) => {
    try {
        const response = await apiInstance.get(`${API_URL}/getCategories`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch categories");
    }
});

// Fetch All Brands
export const fetchBrands = createAsyncThunk("collection/fetchBrands", async (_, { rejectWithValue }) => {
    try {
        const response = await apiInstance.get(`${API_URL}/brands`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Failed to fetch brands");
    }
});


const initialState = {
    Cart: [],
    WishList: [],
    products: [],
    coupons: [],
    paymentMethods: [],
    categories: [],
    brands: [],
    loading: false,
    error: null
};

const CollectionSlice = createSlice({
    name: "Collection",
    initialState,
    reducers: {
      
    //   addProductToCart(state, action) {
    //         const { id, selectedVariant } = action.payload;
    //         const productId = id;

    //         if (state.products.length === 0) {
    //             console.error('Products not loaded yet');
    //             return;
    //         }

    //         const product = state.products.find(product => product._id === productId);
    //         if (!product) {
    //             console.error(`Product with ID ${productId} not found.`);
    //             return;
    //         }

    //         // Create a unique key for this product+variant combination
    //         const variantKey = selectedVariant
    //             ? selectedVariant.map(v => `${v.label}:${v.value}`).sort().join('|')
    //             : 'no-variants';

    //         // Check if this exact product+variant combination already exists in cart
    //         const existingItemIndex = state.Cart.findIndex(item => {
    //             if (item._id !== productId) return false;

    //             // If no variants in cart item and no selection, it's the same
    //             if (!item.variant && !selectedVariant) return true;

    //             // Compare variants - now using item.variant.data instead of item.selectedVariant
    //             const itemVariantKey = item.variant && item.variant.data
    //                 ? item.variant.data.map(v => `${v.label}:${v.value}`).sort().join('|')
    //                 : 'no-variants';

    //             return itemVariantKey === variantKey;
    //         });

    //         if (existingItemIndex !== -1) {
    //             // If exists, increment quantity
    //             state.Cart[existingItemIndex].quantity += 1;
    //         } else {
    //             // If new, add to cart with selected variants
    //             state.Cart.push({
    //                 ...product,
    //                 quantity: 1,
    //                 variant: selectedVariant ? {
    //                     id: Date.now().toString(), // Using timestamp as ID
    //                     data: selectedVariant
    //                 } : null
    //             });
    //             console.log("Added item with variants:", selectedVariant);
    //         }
    //     },
    //     removeProductFromCart(state, action) {
    //         const productId = action.payload;
    //         state.Cart = state.Cart.filter(product => product._id !== productId);
    //     },

    //     updateProductQuantity(state, action) {
    //         const { id, quantity } = action.payload;

    //         // Find the product
    //         const productIndex = state.Cart.findIndex(item => item._id === id);

    //         if (productIndex !== -1) {
    //             if (quantity <= 0) {
    //                 // Remove the product if quantity is 0 or less
    //                 state.Cart.splice(productIndex, 1);
    //             } else {
    //                 // Update the quantity
    //                 state.Cart[productIndex].quantity = quantity;
    //             }
    //         }
    //     },

    //     addToWishList(state, action) {
    //         const productId = action.payload;

    //         // Find the product in our products list
    //         const product = state.products.find(product => product._id === productId);

    //         if (!product) {
    //             console.error(`Product with ID ${productId} not found.`);
    //             return;
    //         }

    //         // Check if product already exists in wishlist
    //         const existingItemIndex = state.WishList.findIndex(item => item._id === productId);

    //         if (existingItemIndex === -1) {
    //             // If product doesn't exist in the WishList, add it
    //             state.WishList.push(product);
    //         }
    //     },

    //     removeFromWishList(state, action) {
    //         const productId = action.payload;
    //         state.WishList = state.WishList.filter(product => product._id !== productId);
    //     },

    //     clearCart(state) {
    //         state.Cart = [];
    //     }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                // console.log(action.payload)
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCoupons.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCoupons.fulfilled, (state, action) => {
                state.loading = false;
                state.coupons = action.payload;
            })
            .addCase(fetchCoupons.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchPaymentsMethods.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPaymentsMethods.fulfilled, (state, action) => {
                state.loading = false;
                state.paymentMethods = action.payload;
            })
            .addCase(fetchPaymentsMethods.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchCategories.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchBrands.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBrands.fulfilled, (state, action) => {
                state.loading = false;
                state.brands = action.payload;
            })
            .addCase(fetchBrands.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export const {
    addProductToCart,
    removeProductFromCart,
    updateProductQuantity,
    addToWishList,
    removeFromWishList,
    clearCart
} = CollectionSlice.actions;

export default CollectionSlice.reducer;