// 'use client';

// import apiInstance from '@/api/instance';
// import Footer from '@/components/Footer'
// import Header from '@/components/Header'
// import { deleteOrder, fetchOrders } from '@/redux/slice/OrdersSlice';
// import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { toast, ToastContainer } from 'react-toastify';
// import Swal from 'sweetalert2';

// const page = () => {
//     // const [userId, setUserId] = useState(null);
//     const dispatch = useDispatch()
//     const { orders, loading: Loading } = useSelector((state) => state.orders);
//     const { userId, userEmail } = useSelector((state) => state.userData)

//     // useEffect(() => {
//     //     const userId = localStorage.getItem('userId');
//     //     setUserId(userId);
//     // }, [dispatch])

//     useEffect(() => {
//         dispatch(fetchOrders());
//     }, [dispatch])

//     console.log(orders)
//     const filterOrder = orders.filter((order) => order.userId == userId);
//     console.log("filterOrder: ", filterOrder);
//     const handleDelete = (orderId) => {
//         dispatch(deleteOrder(orderId))
//             .then(() => {
//                 // toast.success('Order deleted successfully!');
//                 Swal.fire({
//                     icon: 'success',
//                     text: 'Order Deleted Successfully!',
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//                 dispatch(fetchOrders());
//             })
//             .catch((error) => {
//                 // toast.error(error.message);
//                 Swal.fire({
//                     icon: 'success',
//                     text: error.message,
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//                 console.error('Failed to delete order:', error);
//             });
//     }

//     const getStatusClasses = (orderStatus) => {
//         switch (orderStatus.toLowerCase()) {
//             case "pending":
//                 return "#dddd00";
//             case "cancelled":
//                 return "#dc3545";
//             case "complete":
//                 return "#02c402";
//             case "process":
//                 return "#4343ff";
//             default:
//                 return "bg-gray-300 text-gray-700";
//         }
//     }

//     if (Loading) {
//         return (
//             <div className='loader-container'>
//                 <span className="loader"></span>
//             </div>
//         );
//     }

//     return (
//         <>
//             {/* <Header /> */}
//             <div className="container px-3 px-md-4 px-lg-5">
//                 <div className="my-orders">
//                     <h2 className='text-center fw-bolder display-5 mt-5 mb-5'>MY ORDERS</h2>
//                     {filterOrder.length === 0 ?
//                         <h4 className='fw-bold text-center'>Your Order List Is Empty</h4>
//                         :
//                         <div className="border rounded-xl position-relative overflow-hidden" style={{ height: 'auto', boxShadow: '0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)' }}>
//                             <div className="cartTable rounded-xl">
//                                 {/* Headers - Hide on mobile */}
//                                 <div className="row py-2 rounded-xl border-bottom d-none d-md-flex" style={{ backgroundColor: '#f2f2f2', color: '#6b7280' }}>
//                                     <div className="col-md-4 fw-bold ps-md-5">Product</div>
//                                     <div className="col-md-1 fw-bold ps-md-4">Price</div>
//                                     <div className="col-md-1 fw-bold">Quantity</div>
//                                     <div className="col-md-1 fw-bold">Billing</div>
//                                     <div className="col-md-2 fw-bold">Address</div>
//                                     <div className="col-md-1 fw-bold">Status</div>
//                                     <div className="col-md-2 fw-bold text-center">Cancel Order</div>
//                                 </div>

//                                 {filterOrder.map((order, orderIndex) => (
//                                     order.products.map((product, productIndex) => (
//                                         <div key={`${orderIndex}-${productIndex}`} className="row align-items-center border-bottom p-3">
//                                             {/* Product image and name - full width on mobile */}
//                                             <div className="col-12 col-md-4 mb-3 mb-md-0 d-flex align-items-center">
//                                                 <img
//                                                     src={product.product.thumbnail}
//                                                     alt={product.product.name}
//                                                     className='img-fluid rounded'
//                                                     style={{
//                                                         width: '120px',
//                                                         height: '120px',
//                                                         objectFit: 'cover'
//                                                     }}
//                                                 />
//                                                 <span
//                                                     className='ms-3 d-block'
//                                                     style={{
//                                                         maxWidth: 'calc(100% - 95px)',
//                                                         fontSize: '0.9rem'
//                                                     }}
//                                                 >
//                                                     {product.product.name}
//                                                 </span>
//                                             </div>

//                                             {/* Price - grid layout on mobile */}
//                                             <div className="col-6 col-md-1 mb-2 mb-md-0">
//                                                 <span className="d-md-none fw-bold me-2">Price:</span>
//                                                 {product.product.price}
//                                             </div>

//                                             {/* Quantity - grid layout on mobile */}
//                                             <div className="col-6 col-md-1 mb-2 mb-md-0 ">
//                                                 <span className="d-md-none fw-bold me-2">Qty:</span>
//                                                 {product.quantity}
//                                             </div>

//                                             {/* Billing Details - full width on mobile */}
//                                             <div className="col-6 col-md-1 mb-2 mb-md-0">
//                                                 <span className="d-md-none fw-bold me-2">Billing:</span>
//                                                 <span className=" d-inline-block" style={{ maxWidth: '100px' }}>
//                                                     {order.billingDetail}
//                                                 </span>
//                                             </div>

//                                             {/* Address - full width on mobile */}
//                                             <div className="col-6 col-md-2 mb-2 mb-md-0">
//                                                 <span className="d-md-none fw-bold me-2">Address:</span>
//                                                 <span className=" d-inline-block" style={{ maxWidth: '150px' }}>
//                                                     {order.shippingDetail}
//                                                 </span>
//                                             </div>

//                                             {/* status - centered on mobile */}
//                                             <div className="col-6 col-md-1 mb-2 mb-md-0">
//                                                 <span
//                                                     className='px-2 py-1 rounded d-inline-block text-center'
//                                                     style={{
//                                                         backgroundColor: getStatusClasses(order.orderStatus),
//                                                         minWidth: '80px',
//                                                         fontSize: '0.8rem'
//                                                     }}
//                                                 >
//                                                     {order.orderStatus}
//                                                 </span>
//                                             </div>

//                                             {/* Cancel Order - full width on mobile */}
//                                             <div className="col-12 col-md-2 mt-2 mt-md-0 text-center text-md-start">
//                                                 <button
//                                                     className="btn btn-danger btn-sm w-100 w-md-auto"
//                                                     onClick={() => handleDelete(product._id)}
//                                                     style={{ padding: '0.25rem 0.5rem' }}
//                                                 >
//                                                     Cancel Order
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     ))
//                                 ))}
//                             </div>
//                         </div>
//                     }
//                 </div>
//                 {/* <ToastContainer /> */}
//             </div>
//             {/* <Footer /> */}
//         </>
//     )
// }

// export default page

"use client";

import apiInstance from "@/api/instance";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { deleteOrder, fetchOrders } from "@/redux/slice/OrdersSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";

const page = () => {
  const dispatch = useDispatch();
  const { orders, loading: Loading } = useSelector((state) => state.orders);
  const { userId, userEmail } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filterOrder = orders.filter((order) => order.userId == userId);


  console.log(filterOrder)
  const handleDelete = async (orderId) => {
    const response = await apiInstance
      .put(`api/dashboard/updateOrderstatus/${orderId}`, { isDeleted: true })
      .then(() => {
        Swal.fire({
          icon: "success",
          text: "Order Deleted Successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        dispatch(fetchOrders());
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          text: error.message,
          timer: 2000,
          showConfirmButton: false,
        });
        console.error("Failed to delete order:", error);
      });
  };

  const handleCancel = (orderId) => {
    // This is a placeholder for cancel functionality
    // You'll need to implement the API call to cancel the order
    const response = apiInstance
      .put(`api/dashboard/updateOrderstatus/${orderId}`, {
        orderStatus: "Cancelled",
      })
      .then(() => {
        console.log("Order cancelled successfully:");
        Swal.fire({
          icon: "success",
          text: "Order Cancelled Successfully!",
          timer: 2000,
          showConfirmButton: false,
        });
        dispatch(fetchOrders());
      })
      .catch((error) => {
        console.error("Failed to cancel order:", error);
        Swal.fire({
          icon: "error",
          text: error.message,
          timer: 2000,
          showConfirmButton: false,
        });
      });
  };

  const getStatusClasses = (orderStatus) => {
    switch (orderStatus.toLowerCase()) {
      case "pending":
        return "#dddd00";
      case "cancelled":
        return "#dc3545";
      case "complete":
      case "delivered":
        return "#00C950";
      case "dispatch":
      case "Dispatch":
        return "#016630";
      case "process":
        return "#2B7FFF";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  const renderActionButtons = (orderStatus, orderId) => {
    const lowerStatus = orderStatus.toLowerCase();

    if (lowerStatus === "pending") {
      return (
        <>
          <button
            className="btn btn-danger btn-sm mb-2"
            onClick={() => handleCancel(orderId)}
            style={{ padding: "0.25rem 0.5rem" }}
          >
            Cancel Order
          </button>
          {/* <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => handleDelete(orderId)}
            style={{ padding: "0.25rem 0.5rem" }}
          >
            Delete Order
          </button> */}
        </>
      );
    } else if (lowerStatus === "complete" || "cancelled") {
      return (
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => handleDelete(orderId)}
          style={{ padding: "0.25rem 0.5rem" }}
        >
          Delete Order
        </button>
      );
    } else if (lowerStatus === "process") {
      return null; // No buttons for processing orders
    }

    return null;
  };

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
      <div className="container px-3 px-md-4 px-lg-5">
        <div className="my-orders">
          <h2 className="text-center fw-bolder display-5 mt-5 mb-5">
            MY ORDERS
          </h2>
          {filterOrder.length === 0 ? (
            <h4 className="fw-bold text-center">Your Order List Is Empty</h4>
          ) : (
            <div
              className="border rounded-xl position-relative overflow-hidden"
              style={{
                height: "auto",
                boxShadow: "0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)",
              }}
            >
              <div className="cartTable rounded-xl">
                {/* Headers - Hide on mobile */}
                <div
                  className="row py-2 rounded-xl border-bottom d-none d-md-flex"
                  style={{ backgroundColor: "#f2f2f2", color: "#6b7280" }}
                >
                  <div className="col-md-4 fw-bold ps-md-5">Product</div>
                  <div className="col-md-1 fw-bold ps-md-4">Price</div>
                  <div className="col-md-1 fw-bold">Quantity</div>
                  <div className="col-md-1 fw-bold">Billing</div>
                  <div className="col-md-2 fw-bold">Address</div>
                  <div className="col-md-1 fw-bold">Status</div>
                  <div className="col-md-2 fw-bold text-center">Actions</div>
                </div>

                {filterOrder.map((order, orderIndex) =>
                  order.products
                    .filter((product) => product.isDeleted === false) // ⬅️ Only show non-deleted products
                    .map((product, productIndex) => (
                      <div
                        key={`${orderIndex}-${productIndex}`}
                        className="row align-items-center border-bottom p-3"
                      >
                        {/* Product image and name - full width on mobile */}
                        <div className="col-12 col-md-4 mb-3 mb-md-0 d-flex align-items-center">
                          <img
                            src={product.product.thumbnail}
                            alt={product.product.name}
                            className="img-fluid rounded"
                            style={{
                              width: "120px",
                              height: "120px",
                              objectFit: "cover",
                            }}
                          />
                          <span
                            className="ms-3 d-block"
                            style={{
                              maxWidth: "calc(100% - 95px)",
                              fontSize: "0.9rem",
                            }}
                          >
                            {product.product.name}
                          </span>
                        </div>

                        {/* Price - grid layout on mobile */}
                        <div className="col-6 col-md-1 mb-2 mb-md-0">
                          <span className="d-md-none fw-bold me-2">Price:</span>
                          {product.product.price}
                        </div>

                        {/* Quantity - grid layout on mobile */}
                        <div className="col-6 col-md-1 mb-2 mb-md-0 ">
                          <span className="d-md-none fw-bold me-2">Qty:</span>
                          {product.quantity}
                        </div>

                        {/* Billing Details - full width on mobile */}
                        <div className="col-6 col-md-1 mb-2 mb-md-0">
                          <span className="d-md-none fw-bold me-2">Billing:</span>
                          <span
                            className=" d-inline-block"
                            style={{ maxWidth: "100px" }}
                          >
                            {order.billingDetail}
                          </span>
                        </div>

                        {/* Address - full width on mobile */}
                        <div className="col-6 col-md-2 mb-2 mb-md-0">
                          <span className="d-md-none fw-bold me-2">Address:</span>
                          <span
                            className=" d-inline-block"
                            style={{ maxWidth: "150px" }}
                          >
                            {order.shippingDetail}
                          </span>
                        </div>

                        {/* status - centered on mobile */}
                        <div className="col-6 col-md-1 mb-2 mb-md-0">
                          <span
                            className="px-2 py-1 rounded fw-medium text-white d-inline-block text-center"
                            style={{
                              backgroundColor: getStatusClasses(
                                product.orderStatus
                              ),
                              minWidth: "80px",
                              fontSize: "0.8rem",
                            }}
                          >
                            {product.orderStatus}
                          </span>
                        </div>

                        {/* Action Buttons - full width on mobile */}
                        <div className="col-12 col-md-2 mt-2 mt-md-0 text-center md:text-start">
                          <div className="flex flex-wrap justify-center md:justify-start">
                            {renderActionButtons(product.orderStatus, product.orderId)}
                          </div>
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
        {/* <ToastContainer /> */}
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default page;