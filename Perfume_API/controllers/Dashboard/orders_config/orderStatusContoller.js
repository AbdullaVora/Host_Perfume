const { default: mongoose } = require("mongoose");
const { orderValidation } = require("../../../helpers/JoiValidation");
const AllOrders = require("../../../models/Dashboard/orders_config/allOrdersModel");
const orderStatus = require("../../../models/Dashboard/orders_config/orderStatusModel");
const productModel = require("../../../models/Dashboard/product/productModel");

// Create a new order status
exports.createOrderStatus = async (req, res) => {
    try {
        // console.log(req.body);
        const order = await orderStatus.create(req.body);
        // console.log(order);
        res.status(201).json({ success: true, data: order });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// Get all order statuses
exports.getAllOrderStatuses = async (req, res) => {
    try {
        const orders = await orderStatus.find();

        // console.log(orders)

        // Format the response similar to your coupon format
        const formattedOrders = orders.map((order) => ({
            _id: order._id,
            orderCode: order.orderCode,
            orderName: order.orderName,
            orderStatus: order.orderStatus,
            status: order.status, // Default status if not provided
            updatedAt: order.updatedAt,
            isAction: true,
            isOrderStatus: true, // Similar to isCoupon in your example
        }));

        res.status(200).json(formattedOrders);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get a single order status by ID
exports.getOrderStatusById = async (req, res) => {
    try {
        const order = await orderStatus.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order status not found' });
        }
        res.status(200).json({ success: true, data: order });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an order status
// exports.updateOrderStatus = async (req, res) => {
//     try {
//         const { orderId, orderName, orderStatus, isDeleted } = req.body;
//         const { id } = req.params
//         console.log(req.params);
//         console.log("Update Order Status ID:", id);


//         // Try case-insensitive search
//         const order = await AllOrders.findOne({
//             cart: {
//                 $elemMatch: { orderId: "Order-65f1216f-143e-4c9d-afd6-f92682d92f32" }
//             }
//         });
//         console.log(id)
//         console.log(order)
//         if (!order) return res.status(404).json({ message: 'Order not found' });

//         // Update only the 'name' field in cart, keeping other details intact
//         if (orderName) {
//             const namesArray = orderName.split(',').map(name => name.trim());

//             order.cart.forEach((item, index) => {
//                 if (namesArray[index]) {
//                     item.name = namesArray[index]; // Update only the name field
//                 }
//             });
//         }

//         if (typeof isDeleted !== 'undefined') {
//             // Find the index of the item with matching id
//             const itemIndex = order.cart.findIndex(item => item.orderId == id);

//             if (itemIndex !== -1) { // If item exists
//                 // Update isDeleted for only the matched item
//                 order.cart[itemIndex].isDeleted = isDeleted;

//                 // Notify Mongoose of the nested change
//                 order.markModified('cart');
//             } else {
//                 console.error("Cart item not found with id:", id);
//             }
//         }

//         // if (orderStatus) {
//         //     for (const item of order.cart) {
//         //         order.cart.forEach((item) => {
//         //             const cart = item.find((data) => data._id == id);
//         //             cart.orderStatus = orderStatus || "Cancelled";
//         //         });
//         //         // Let Mongoose know we changed nested data
//         //         order.markModified('cart');
//         //     }
//         // }


//         // if (orderStatus) {
//         //     // console.log(orderStatus)
//         //     const cartItem = order.cart.find((item) => item.orderId == id);
//         //     console.log(cartItem)
//         //     if (cartItem) {
//         //         cartItem.orderStatus = orderStatus || "Cancelled";
//         //         // Let Mongoose know we changed nested data
//         //         order.markModified('cart');
//         //     }
//         // }

//         if (orderStatus) {
//             // Find the index of the item to update
//             const itemIndex = order.cart.findIndex(item => item.orderId.toString() === id.toString());

//             if (itemIndex !== -1) {
//                 // Update the status
//                 order.cart[itemIndex].orderStatus = orderStatus || "Cancelled";

//                 // Mark the array as modified
//                 order.markModified('cart');

//                 // Save the document
//                 // await order.save();

//                 console.log("Status updated successfully");
//             } else {
//                 console.log("Cart item not found with orderId:", id);
//             }
//         }


//         // Update other fields
//         // order.orderCode = orderCode || order.orderCode;

//         // Save the updated order
//         const updatedOrder = await order.save();

//         res.status(200).json(updatedOrder);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// exports.updateOrderStatus = async (req, res) => {
//     try {
//         const { orderStatus, isDeleted } = req.body;
//         const { id } = req.params;

//         // Clean the ID by removing trailing comma if exists
//         const cleanId = id.endsWith(',') ? id.slice(0, -1) : id;

//         console.log("Updating order status for ID:", cleanId);

//         // Find the order containing the cart item with matching orderId
//         const order = await AllOrders.findOne({
//             "cart.orderId": { $regex: new RegExp(`^${cleanId},?$`) }
//         });

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         // Find the specific cart item to update
//         const cartItemIndex = order.cart.findIndex(
//             item => {
//                 const itemOrderId = item.orderId.endsWith(',')
//                     ? item.orderId.slice(0, -1)
//                     : item.orderId;
//                 return itemOrderId === cleanId;
//             }
//         );

//         if (cartItemIndex === -1) {
//             return res.status(404).json({ message: 'Cart item not found in order' });
//         }

//         // Update the cart item status if provided
//         if (orderStatus) {
//             order.cart[cartItemIndex].orderStatus = orderStatus
//             order.markModified('cart');
//         }

//         // Update isDeleted if provided
//         if (typeof isDeleted !== 'undefined') {
//             order.cart[cartItemIndex].isDeleted = isDeleted;
//             order.markModified('cart');
//         }

//         // Save the updated order
//         const updatedOrder = await order.save();

//         res.status(200).json(updatedOrder);
//     } catch (error) {
//         console.error("Error updating order status:", error);
//         res.status(500).json({ error: error.message });
//     }
// };


// exports.updateOrderStatus = async (req, res) => {
//     try {
//         const { orderStatus, isDeleted } = req.body;
//         const { id } = req.params;

//         // Clean the ID by removing trailing comma if exists
//         const cleanId = id.endsWith(',') ? id.slice(0, -1) : id;

//         // console.log("Updating order status for ID:", cleanId);

//         // Find the order containing the cart item with matching orderId
//         const order = await AllOrders.findOne({
//             "cart.orderId": { $regex: new RegExp(`^${cleanId},?$`) }
//         }).populate('cart.product');

//         if (!order) {
//             return res.status(404).json({ message: 'Order not found' });
//         }

//         // Find the specific cart item to update
//         const cartItemIndex = order.cart.findIndex(
//             item => {
//                 const itemOrderId = item.orderId.endsWith(',')
//                     ? item.orderId.slice(0, -1)
//                     : item.orderId;
//                 return itemOrderId === cleanId;
//             }
//         );

//         if (cartItemIndex === -1) {
//             return res.status(404).json({ message: 'Cart item not found in order' });
//         }

//         const cartItem = order.cart[cartItemIndex];
//         const previousStatus = cartItem.orderStatus;
//         const quantity = cartItem.quantity || 1;

//         // Update the cart item status if provided
//         if (orderStatus) {
//             order.cart[cartItemIndex].orderStatus = orderStatus;
//             order.markModified('cart');
//         }

//         // Update isDeleted if provided
//         if (typeof isDeleted !== 'undefined') {
//             order.cart[cartItemIndex].isDeleted = isDeleted;
//             order.markModified('cart');
//         }

//         // Save the updated order
//         const updatedOrder = await order.save();

//         // Handle stock updates if status changed to/from Completed/Cancelled
//         if (orderStatus) {
//             try {
//                 const product = await productModel
//                     .findById(cartItem.product._id)
//                     .populate('variants'); // variants is a separate model

//                 if (product) {
//                     const cartVariantId = cartItem.variant?.id?.endsWith(',')
//                         ? cartItem.variant.id.slice(0, -1)
//                         : cartItem.variant?.id;

//                     const variantDoc = product.variants; // This is the populated Variant document

//                     if (orderStatus.toLowerCase() === 'complete') {
//                         if (variantDoc && variantDoc.variants) {
//                             const orderedVariant = variantDoc.variants.find(v => v.id === cartVariantId);

//                             if (orderedVariant) {
//                                 orderedVariant.stock -= quantity;
//                             } else {
//                                 console.warn('Ordered variant not found in product:', cartVariantId);
//                             }
//                         } else if (product.stock !== undefined) {
//                             product.stock -= quantity;
//                         }
//                     } else if (['cancelled', 'returned'].includes(orderStatus.toLowerCase())) {
//                         if (variantDoc && variantDoc.variants) {
//                             const orderedVariant = variantDoc.variants.find(v => v.id === cartVariantId);

//                             if (orderedVariant) {
//                                 orderedVariant.stock += quantity;
//                             } else {
//                                 console.warn('Ordered variant not found in product:', cartVariantId);
//                             }
//                         } else if (product.stock !== undefined) {
//                             product.stock += quantity;
//                         }
//                     }

//                     // ✅ Save the correct document
//                     if (variantDoc && variantDoc.isModified()) {
//                         await variantDoc.save();
//                     } else {
//                         await product.save();
//                     }
//                 }
//             } catch (stockError) {
//                 console.error('Error updating product stock:', stockError);
//             }
//         }
//         // res.status(200).json(updatedOrder);
//     } catch (error) {
//         console.error("Error updating order status:", error);
//         res.status(500).json({ error: error.message });
//     }
// };

exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus, isDeleted } = req.body;
        const { id } = req.params;

        // Clean the ID by removing trailing comma if exists
        const cleanId = id.endsWith(',') ? id.slice(0, -1) : id;

        // Find the order containing the cart item with matching orderId
        const order = await AllOrders.findOne({
            "cart.orderId": { $regex: new RegExp(`^${cleanId},?$`) }
        }).populate('cart.product');

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Find the specific cart item to update
        const cartItemIndex = order.cart.findIndex(
            item => {
                const itemOrderId = item.orderId.endsWith(',')
                    ? item.orderId.slice(0, -1)
                    : item.orderId;
                return itemOrderId === cleanId;
            }
        );

        if (cartItemIndex === -1) {
            return res.status(404).json({ message: 'Cart item not found in order' });
        }

        const cartItem = order.cart[cartItemIndex];
        const previousStatus = cartItem.orderStatus;
        const quantity = cartItem.quantity || 1;

        // Update the cart item status if provided
        if (orderStatus) {
            order.cart[cartItemIndex].orderStatus = orderStatus;
            order.markModified('cart');
        }

        // Update isDeleted if provided
        if (typeof isDeleted !== 'undefined') {
            order.cart[cartItemIndex].isDeleted = isDeleted;
            order.markModified('cart');
        }

        // Save the updated order
        const updatedOrder = await order.save();

        // Handle stock updates if status changed to/from Completed/Cancelled/Returned
        if (orderStatus) {
            try {
                const product = await productModel
                    .findById(cartItem.product._id)
                    .populate('variants');

                if (!product) {
                    console.warn('Product not found:', cartItem.product._id);
                    return res.status(200).json(updatedOrder);
                }

                // Get the variant ID from the cart item
                const cartVariantId = cartItem.variant?.data?.[0]?.id;

                const variantDoc = product.variants; // Note: Make sure this matches your schema
                const status = orderStatus.toLowerCase();

                // Handle stock updates
                if (status === 'Dispatch' || status === 'dispatch') {
                    console.log("enter 1")
                    console.log("variantDoc", variantDoc)
                    console.log("cartVariantId", cartVariantId)
                    if (variantDoc && variantDoc.variants && cartVariantId) {
                        console.log("enter 2")

                        // Find the ordered variant in the product's variants
                        const orderedVariant = variantDoc.variants.find(v =>
                            v.id === cartVariantId ||
                            v._id.toString() === cartVariantId
                        );
                        console.log("orderedVariant", orderedVariant)
                        if (orderedVariant) {
                            orderedVariant.stock -= quantity;
                            await variantDoc.save();
                        } else {
                            console.warn('Ordered variant not found:', cartVariantId);
                            console.log('Available variants:', variantDoc.variants.data);
                        }
                    } else if (product.stock !== undefined) {
                        // Fallback to product stock if no variants
                        product.stock -= quantity;
                        await product.save();
                    }
                } else if (status === 'cancelled' || status === 'returned' || status === 'Cancelled') {
                    if (variantDoc && variantDoc.variants && cartVariantId) {
                        const orderedVariant = variantDoc.variants.find(v =>
                            v.id === cartVariantId ||
                            v._id.toString() === cartVariantId
                        );
                        if (orderedVariant) {
                            orderedVariant.stock += quantity;
                            await variantDoc.save();
                        } else {
                            console.warn('Ordered variant not found:', cartVariantId);
                        }
                    } else if (product.stock !== undefined) {
                        product.stock += quantity;
                        await product.save();
                    }
                }
            } catch (stockError) {
                console.error('Error updating product stock:', stockError);
                // Continue with the response even if stock update fails
            }
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ error: error.message });
    }
};

// Delete an order status
exports.deleteOrderStatus = async (req, res) => {
    try {
        // console.log(req.params.id)
        const order = await AllOrders.findByIdAndDelete(req.params.id);
        if (!order) {
            return res.status(404).json({ success: false, message: 'Order status not found' });
        }
        res.status(200).json({ success: true, message: 'Order status deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Get order by ID (matches either main order ID or cart item ID)
exports.getOrderById = async (req, res) => {
    try {
        // console.log(req.params)
        const { id } = req.params;
        // console.log("Order ID:", id);

        // Search for order where either:
        // 1. The main order _id matches
        // 2. Any cart item _id matches
        const order = await AllOrders.findOne({
            orderCode: id
            // $or: [
            //     // { _id: id },
            //     { 'orderCode': id }
            // ]
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        // If we matched by cart item ID, find the specific cart item
        let matchedItem = null;
        if (!order._id.equals(id)) {
            matchedItem = order.cart.find(item => item._id.equals(id));
        }

        // Format the response
        const response = {
            success: true,
            data: {
                order: {
                    _id: order._id,
                    orderCode: order.orderCode,
                    createdAt: order.createdAt,
                    updatedAt: order.updatedAt,
                    // Include other order fields you need
                },
                // Include the specific cart item if we matched by item ID
                ...(matchedItem && { cartItem: matchedItem })
            }
        };

        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};