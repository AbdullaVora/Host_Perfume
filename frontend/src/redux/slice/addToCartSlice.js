import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "@/api/instance";
import Profile from "@/app/profile/page";
const API_URL = '/api/e-commerce';

// Async thunk for fetching cart Cart
export const fetchCartCart = createAsyncThunk(
    'cart/fetchCartCart',
    async (_, { rejectWithValue }) => {
        try {
            console.log("send request")
            console.trace("Trace fetchCartCart");
            const response = await apiInstance.get(`${API_URL}/getCart`);
            // console.log(response.data)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to fetch cart Cart");
        }
    }
);

// Async thunk for adding product to cart
// export const addProductToCart = createAsyncThunk(
//     'cart/addProductToCart',
//     async ({ userId, id, selectedVariant, products }, { rejectWithValue }) => {
//         console.log(userId, id, selectedVariant)
//         try {
//             const productId = id;

//             if (!products || products.length === 0) {
//                 return rejectWithValue('Products not loaded yet');
//             }

//             const product = products.find(product => product._id === productId);
//             if (!product) {
//                 return rejectWithValue(`Product with ID ${productId} not found.`);
//             }

//             const cartResponse = await apiInstance.get(
//                 userId ? `${API_URL}/cart/${userId}` : `${API_URL}/getCart`
//             );

//             console.log(cartResponse);

//             // Ensure cart data is an array
//             const cartData = Array.isArray(cartResponse.data) ? cartResponse.data : [cartResponse.data];

//             // Flatten all products from cart items
//             const allProducts = cartData.flatMap(item => item.product ? [item.product] : []);

//             // Check if product already exists in cart
//             const productExists = allProducts.some(product => product.id === productId);

//             if (productExists) {
//                 return true;
//             }

//             // Product not in cart, so add it
//             const response = await apiInstance.post(`${API_URL}/cart`, {
//                 userId,
//                 product: productId,
//                 quantity: 1,
//                 variant: selectedVariant ? { id: Date.now().toString(), data: selectedVariant } : null,
//             });

//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to add product to cart");
//         }
//     }
// );

// export const addProductToCart = createAsyncThunk(
//     'cart/addProductToCart',
//     async ({ userId, id, selectedVariant, products }, { rejectWithValue }) => {
//         console.log(userId, id, selectedVariant, products);
//         try {
//             const productId = id;

//             if (!products || products.length === 0) {
//                 return rejectWithValue('Products not loaded yet');
//             }

//             const product = products.find(product => product._id === productId);
//             if (!product) {
//                 return rejectWithValue(`Product with ID ${productId} not found.`);
//             }

//             console.log(product);

//             // const cartResponse = await apiInstance.get(
//             //     userId ? `${API_URL}/cart/${userId}` : `${API_URL}/getCart`,
//             // );
//             const cartResponse = await apiInstance.get(`${API_URL}/getCart`);


//             console.log(cartResponse);

//             const cartData = Array.isArray(cartResponse.data) ? cartResponse.data : [cartResponse.data];

//             // Flatten all products and include reference to parent cart item
//             const matchedItem = cartData.find(item => item.product?.id === productId);

//             if (matchedItem) {
//                 // If product exists, update quantity (+1)
//                 const updatedQuantity = (matchedItem.quantity || 1) + 1;

//                 const updateResponse = await apiInstance.put(`${API_URL}/updateCart/${matchedItem._id}`, {
//                     quantity: updatedQuantity,
//                 });

//                 return updateResponse.data;
//             }

//             // Product not in cart, so add it
//             const response = await apiInstance.post(`${API_URL}/cart`, {
//                 userId,
//                 product: productId,
//                 quantity: 1,
//                 variant: selectedVariant ? { id: Date.now().toString(), data: selectedVariant } : null,
//             });

//             return response.data;
//         } catch (error) {
//             return rejectWithValue(error.response?.data || "Failed to add product to cart");

//         }
//     }
// );


// export const addProductToCart = createAsyncThunk(
//     'cart/addProductToCart',
//     async ({ userId, id, selectedVariant, quantity }, { getState, rejectWithValue }) => {
//         // console.log('Starting addProductToCart with:', { userId, id, selectedVariant });

//         try {
//             const state = getState();
//             const products = state.Home?.Home?.products || [];

//             if (!products.length) {
//                 console.error('Products not loaded yet');
//                 return rejectWithValue('Products not loaded yet');
//             }

//             const product = products.find(product => product._id === id);
//             if (!product) {
//                 console.error(`Product with ID ${id} not found.`);
//                 return rejectWithValue(`Product with ID ${id} not found.`);
//             }

//             // console.log('Found product:', product);
//             // console.log('Making GET cart request...');

//             try {
//                 const cartResponse = await apiInstance.get(`${API_URL}/getCart`);
//                 console.log('Cart response:', cartResponse);

//                 const cartData = Array.isArray(cartResponse.data) ? cartResponse.data : [cartResponse.data];
//                 const matchedItem = cartData.find(item => item.product?.id === id);

//                 if (matchedItem) {
//                     const updatedQuantity = (matchedItem.quantity || 1) + 1;
//                     console.log('Making PUT request to update quantity...');

//                     const updateResponse = await apiInstance.put(
//                         `${API_URL}/updateCart/${matchedItem._id}`,
//                         { quantity: updatedQuantity }
//                     );
//                     return updateResponse.data;
//                 }

//                 console.log('Making POST request to add new item...');
//                 console.log('Selected variant:', selectedVariant);
//                 const response = await apiInstance.post(`${API_URL}/cart`, {
//                     userId,
//                     product: id,
//                     quantity: quantity || 1,
//                     variant: selectedVariant ? {
//                         id: selectedVariant.id,
//                         data: selectedVariant
//                     } : null,
//                 });

//                 return response.data;

//             } catch (apiError) {
//                 console.error('API Error:', apiError);
//                 throw apiError;
//             }

//         } catch (error) {
//             console.error('Full error:', error);
//             return rejectWithValue(
//                 error.response?.data ||
//                 error.message ||
//                 "Failed to add product to cart"
//             );
//         }
//     }
// );

export const addProductToCart = createAsyncThunk(
    'cart/addProductToCart',
    async ({ userId, id, selectedVariant, quantity }, { getState, rejectWithValue }) => {
        // console.log('Starting addProductToCart with:', { userId, id, selectedVariant });

        try {
            const state = getState();
            const products = state.Home?.Home?.products || [];

            if (!products.length) {
                console.error('Products not loaded yet');
                return rejectWithValue('Products not loaded yet');
            }

            const product = products.find(product => product._id === id);
            if (!product) {
                console.error(`Product with ID ${id} not found.`);
                return rejectWithValue(`Product with ID ${id} not found.`);
            }

            // Set default variant if no variant is selected
            let variantToUse = selectedVariant;
            console.log('Selected variant 1:', variantToUse);
            if (!variantToUse) {
                variantToUse = product.variants.variants[0];
                console.log('No variant selected, using default first variant:', variantToUse);
            }


            // console.log('Found product:', product);
            // console.log('Making GET cart request...');

            try {
                const cartResponse = await apiInstance.get(`${API_URL}/getCart`);
                console.log('Cart response:', cartResponse);

                const cartData = Array.isArray(cartResponse.data) ? cartResponse.data : [cartResponse.data];
                const matchedItem = cartData.find(item => item.product?.id === id);

                if (matchedItem) {
                    const updatedQuantity = (matchedItem.quantity || 1) + 1;
                    console.log('Making PUT request to update quantity...');

                    const updateResponse = await apiInstance.put(
                        `${API_URL}/updateCart/${matchedItem._id}`,
                        { quantity: updatedQuantity }
                    );
                    return updateResponse.data;
                }

                console.log('Making POST request to add new item...');
                console.log('Variant to use:', variantToUse);
                const response = await apiInstance.post(`${API_URL}/cart`, {
                    userId,
                    product: id,
                    quantity: quantity || 1,
                    variant: variantToUse[0] ? {
                        id: variantToUse[0].id || variantToUse[0]._id,
                        data: {
                            ...variantToUse[0].variantData.data[0],
                            id: variantToUse[0].id || variantToUse[0]._id
                        },
                        mrp: variantToUse[0].variantData.mrp,
                        price: variantToUse[0].variantData.price,
                        stock: variantToUse[0].variantData.stock
                    } : variantToUse ? {
                        id: variantToUse.id || variantToUse._id,
                        data: {
                            ...variantToUse.data[0],
                            id: variantToUse.id || variantToUse._id
                        },
                        mrp: variantToUse.mrp,
                        price: variantToUse.price,
                        stock: variantToUse.stock
                    } : null
                });

                return response.data;

            } catch (apiError) {
                console.error('API Error:', apiError);
                throw apiError;
            }

        } catch (error) {
            console.error('Full error:', error);
            return rejectWithValue(
                error.response?.data ||
                error.message ||
                "Failed to add product to cart"
            );
        }
    }
);

export const updateProductVariant = createAsyncThunk(
    'cart/updateProductVariant',
    async ({ id, variant }, { rejectWithValue }) => {
        try {
            const response = await apiInstance.put(`${API_URL}/updateCartItemVariant/${id}`, {
                variant // Changed from selectedVariant to variant
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update product variant");
        }
    }
);


// Async thunk for updating product quantity
export const updateProductQuantity = createAsyncThunk(
    'cart/updateProductQuantity',
    async ({ id, quantity }, { rejectWithValue }) => {
        console.log(id, quantity)
        try {
            if (quantity <= 0) {
                // Remove the product if quantity is 0 or less
                const response = await apiInstance.delete(`${API_URL}/${id}`);
                return { id, deleted: true, ...response.data };
            } else {
                // Update the quantity
                const response = await apiInstance.put(`${API_URL}/updateCart/${id}`, { quantity });
                return response.data;
            }
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to update product quantity");
        }
    }
);

// Async thunk for removing product from cart
export const removeProductFromCart = createAsyncThunk(
    'cart/removeProductFromCart',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await apiInstance.delete(`${API_URL}/removeCart/${productId}`);
            return { productId, ...response.data };
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to remove product from cart");
        }
    }
);

// Async thunk for clearing cart
export const clearCart = createAsyncThunk(
    'cart/clearCart',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await apiInstance.delete(`${API_URL}/clear/${userId}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || "Failed to clear cart");
        }
    }
);

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk(
    'collection/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiInstance.get(`${API_URL}/dashboard/products`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);



const initialState = {
    Cart: [],
    products: [],
    loading: false,
    error: null
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        resetCart: (state) => {
            state.Cart = []
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch Cart Cart
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
            .addCase(fetchCartCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartCart.fulfilled, (state, action) => {
                state.loading = false;
                state.Cart = action.payload;
            })
            .addCase(fetchCartCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add Product to Cart
            .addCase(addProductToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addProductToCart.fulfilled, (state, action) => {
                state.loading = false;
                console.log(action.payload)

                // The backend should return the updated cart array
                if (Array.isArray(action.payload)) {
                    state.Cart = action.payload;
                }
                // If backend returns just the added item (not recommended)
                else {
                    // Check if this item already exists in cart
                    const existingIndex = state.Cart.findIndex(
                        item => item._id === action.payload._id
                    );

                    if (existingIndex !== -1) {
                        // Update existing item
                        state.Cart[existingIndex] = action.payload;
                    } else {
                        // Add new item
                        state.Cart.push(action.payload);
                    }
                }
            })
            .addCase(addProductToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Update Product Quantity
            .addCase(updateProductQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductQuantity.fulfilled, (state, action) => {
                state.loading = false;

                if (action.payload.deleted) {
                    // Remove the product if it was deleted (quantity <= 0)
                    state.Cart = state.Cart.filter(item => item._id !== action.payload.id);
                } else {
                    // Update the quantity
                    state.Cart = state.Cart.map(item =>
                        item._id === action.payload._id ? action.payload : item);
                }
            })
            .addCase(updateProductQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Remove Product from Cart
            .addCase(removeProductFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeProductFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.Cart = state.Cart.filter(item => item._id !== action.payload.productId);
            })
            .addCase(removeProductFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Clear Cart
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false;
                state.Cart = [];
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateProductVariant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProductVariant.fulfilled, (state, action) => {
                state.loading = false;
                const updatedItem = action.payload;
                const index = state.Cart.findIndex(item => item._id === updatedItem._id);
                if (index !== -1) {
                    state.Cart[index] = updatedItem;
                }
            })
            .addCase(updateProductVariant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default cartSlice.reducer;
export const { resetCart } = cartSlice.actions