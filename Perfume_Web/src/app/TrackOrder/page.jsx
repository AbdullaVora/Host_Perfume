// 'use client';
// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import Link from 'next/link';
// import apiInstance from '@/api/instance';
// import { IoIosMail } from "react-icons/io";

// const TrackOrder = () => {
//   const [orderId, setOrderId] = useState('');
//   const [orderData, setOrderData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searched, setSearched] = useState(false);

//   const statusSteps = [
//     { id: 'pending', label: 'Pending', description: 'Order received' },
//     { id: 'processing', label: 'Processing', description: 'Preparing your order' },
//     { id: 'shipped', label: 'Shipped', description: 'On the way' },
//     { id: 'delivered', label: 'Delivered', description: 'Order completed' },
//     { id: 'cancelled', label: 'Cancelled', description: 'Order cancelled' },
//   ];

//   const fetchOrder = async () => {
//     if (!orderId.trim()) {
//       setError('Please enter an order number');
//       return;
//     }

//     setLoading(true);
//     setError(null);
//     setSearched(true);

//     try {
//       const response = await apiInstance.get(`/api/dashboard/orderStatusById/${orderId}`);
//       setOrderData(response.data);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to fetch order details');
//       setOrderData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     fetchOrder();
//   };

//   const getStatusIndex = (status) => {
//     if (!status) return -1; // Handle undefined/null status
//     return statusSteps.findIndex(step => step.id === status.toLowerCase());
//   };

//   const getHighestStatus = () => {
//     // Handle cases where orderData or cart is missing
//     if (!orderData?.cart?.length) return 'pending';

//     const statusIndices = orderData.cart.map(item =>
//       getStatusIndex(item.orderStatus)
//     ).filter(index => index !== -1); // Filter out invalid statuses

//     // If no valid statuses found, return pending
//     if (statusIndices.length === 0) return 'pending';

//     return statusSteps[Math.max(...statusIndices)]?.id || 'pending';
//   };

//   const getStatusCounts = () => {
//     const counts = {};
//     statusSteps.forEach(step => {
//       counts[step.id] = 0;
//     });

//     orderData?.cart?.forEach(item => {
//       const status = item.orderStatus?.toLowerCase() || 'pending';
//       counts[status] = (counts[status] || 0) + 1;
//     });

//     return counts;
//   };


//   return (
//     <>
//       <div className="container-fluid px-3">
//         <h2 className='text-center fw-bolder display-5 mt-4 mt-md-5 mb-3 mb-md-5'>TRACK ORDER</h2>

//         <div className="d-flex flex-column align-items-center justify-content-center py-3 py-md-5">
//           {!orderData && (
//             <div className="login w-100" style={{ maxWidth: "500px" }}>
//               <h4 className='fw-bold mb-2'>Enter your order number</h4>
//               <span className='d-block mb-3' style={{ fontSize: '13px' }}>Track your order status:</span>

//               {loading ? (
//                 <div className='loader-container'>
//                   <span className="loader"></span>
//                 </div>
//               ) : (
//                 <form onSubmit={handleSubmit}>
//                   <div className="mt-3 mb-3">
//                     <input
//                       type="text"
//                       className="form-control p-3"
//                       value={orderId}
//                       onChange={(e) => setOrderId(e.target.value)}
//                       placeholder="ENTER YOUR ORDER NUMBER"
//                     />
//                   </div>

//                   {error && <div className="text-danger mb-3">{error}</div>}

//                   <button
//                     className='d-block w-100 mb-2 mt-4 py-3 border-0 fw-semibold text-white rounded-1'
//                     type='submit'
//                     disabled={loading}
//                     style={{ backgroundColor: '#0A5D5D' }}
//                   >
//                     Track Order
//                   </button>

//                   <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2">
//                     <span style={{ fontSize: '13px', opacity: '80%' }}>
//                       Can't find your order number? <Link href="/contact" className='greenHover text-decoration-none text-black fw-bold cursor-pointer hover:text-[#0A5D5D]'>Contact Support</Link>
//                     </span>
//                     <span style={{ fontSize: '13px', opacity: '80%', marginTop: '8px' }} className="mt-sm-0">
//                       <Link href="/" className='text-decoration-none text-black'>
//                         <span className='greenHover fw-bold'>Back to Home</span>
//                       </Link>
//                     </span>
//                   </div>
//                 </form>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Order Details Section */}
//       {searched && !loading && orderData && (
//         <div className="container-fluid px-3 mt-4">
//           <div className="d-flex flex-column align-items-center">
//             <div className="w-100" style={{ maxWidth: "800px" }}>

//               {/* Order Summary Card */}
//               <div className="login mb-4">
//                 <h4 className='fw-bold mb-3'>Order Summary</h4>
//                 <div className="row">
//                   <div className="col-md-6 mb-3">
//                     <span style={{ fontSize: '13px', opacity: '80%' }}>Order Number</span>
//                     <p className="fw-semibold mb-2">{orderData.orderCode}</p>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <span style={{ fontSize: '13px', opacity: '80%' }}>Date Placed</span>
//                     <p className="fw-semibold mb-2">{new Date(orderData.createdAt).toLocaleDateString()}</p>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <span style={{ fontSize: '13px', opacity: '80%' }}>Total Amount</span>
//                     <p className="fw-semibold mb-2">${orderData.total.toFixed(2)}</p>
//                   </div>
//                   <div className="col-md-6 mb-3">
//                     <span style={{ fontSize: '13px', opacity: '80%' }}>Payment Method</span>
//                     <p className="fw-semibold mb-2">{orderData.paymentMethod}</p>
//                   </div>
//                 </div>

//                 <div className="mt-4">
//                   <span style={{ fontSize: '13px', opacity: '80%' }}>Shipping Address</span>
//                   <p className="fw-semibold mb-0">
//                     {orderData.firstName} {orderData.lastName}<br />
//                     {orderData.address}, {orderData.city}<br />
//                     {orderData.state}, {orderData.zipCode}
//                   </p>
//                 </div>
//               </div>

//               {/* Order Status Timeline */}
//               <div className="login mb-4">
//                 <h4 className='fw-bold mb-4'>Order Status</h4>

//                 <div className="timeline-container">
//                   {statusSteps.map((step, index) => {
//                     const isCompleted = index <= getStatusIndex(getHighestStatus());
//                     const isCurrent = index === getStatusIndex(getHighestStatus());
//                     const statusCounts = getStatusCounts();
//                     const itemCount = statusCounts[step.id] || 0;
//                     const isLastStep = index === statusSteps.length - 1;

//                     return (
//                       <div key={step.id} className={`timeline-step ${isLastStep ? 'last-step' : ''}`}>
//                         <div className="timeline-marker-container">
//                           <div className={`timeline-marker ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
//                             {isCompleted && (
//                               <svg className="checkmark" viewBox="0 0 24 24">
//                                 <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
//                               </svg>
//                             )}
//                           </div>
//                           {!isLastStep && (
//                             <div className={`timeline-connector ${isCompleted ? 'completed' : ''}`}></div>
//                           )}
//                         </div>

//                         <div className="timeline-content">
//                           <div className="d-flex align-items-center mb-1">
//                             <h5 className={`status-label ${isCompleted ? 'completed' : ''}`}>
//                               {step.label}
//                             </h5>
//                             {isCurrent && (
//                               <span className="current-badge">Current</span>
//                             )}
//                           </div>
//                           <p className={`status-description ${isCompleted ? 'completed' : ''}`}>
//                             {step.description}
//                           </p>

//                           {itemCount > 0 && (
//                             <span className="item-count">
//                               {itemCount} of {orderData.cart.length} items
//                             </span>
//                           )}

//                           {isCurrent && (
//                             <div className="status-info">
//                               {getHighestStatus() === 'pending' && (
//                                 <p>We've received your order and will begin processing soon.</p>
//                               )}
//                               {getHighestStatus() === 'processing' && (
//                                 <p>Your order is being prepared and will be shipped shortly.</p>
//                               )}
//                               {getHighestStatus() === 'shipped' && (
//                                 <>
//                                   <p>Your order is on the way to your delivery address.</p>
//                                   {orderData.trackingNumber && (
//                                     <a href="#" className="tracking-link">
//                                       Track Package
//                                     </a>
//                                   )}
//                                 </>
//                               )}
//                               {getHighestStatus() === 'delivered' && (
//                                 <>
//                                   <p>Your order has been delivered successfully.</p>
//                                   <button className="review-btn">
//                                     Leave a Review
//                                   </button>
//                                 </>
//                               )}
//                               {getHighestStatus() === 'cancelled' && (
//                                 <>
//                                   <p>This order has been canceled as per your request.</p>
//                                   <button className="support-btn">
//                                     Contact Support
//                                   </button>
//                                 </>
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Items List */}
//               <div className="login mb-4">
//                 <h4 className='fw-bold mb-3'>Order Items</h4>
//                 {orderData.cart.map((item) => (
//                   <div key={item._id} className="d-flex align-items-center py-3 border-bottom" style={{ borderColor: '#e9ecef !important' }}>
//                     <img
//                       src={item.product.thumbnail}
//                       alt={item.product.name}
//                       className="me-3 rounded-1"
//                       style={{ width: '60px', height: '60px', objectFit: 'cover' }}
//                     />
//                     <div className="flex-grow-1">
//                       <h6 className="fw-bold mb-1">{item.product.name}</h6>
//                       <span style={{ fontSize: '12px', opacity: '70%' }}>SKU: {item.product.skuCode}</span>
//                       <div className="d-flex justify-content-between align-items-center mt-2">
//                         <span style={{ fontSize: '14px', opacity: '80%' }}>Qty: {item.quantity}</span>
//                         <span className="fw-semibold">${(item.product.price * item.quantity).toFixed(2)}</span>
//                       </div>
//                     </div>
//                     <div className="ms-3">
//                       <span
//                         className="px-2 py-1 rounded-1 text-white fw-semibold"
//                         style={{
//                           fontSize: '11px',
//                           backgroundColor:
//                             item.orderStatus === 'pending' ? '#6c757d' :
//                               item.orderStatus === 'processing' ? '#17a2b8' :
//                                 item.orderStatus === 'shipped' ? '#007bff' :
//                                   item.orderStatus === 'delivered' ? '#28a745' : '#dc3545'
//                         }}
//                       >
//                         {item.orderStatus}
//                       </span>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Help Section */}
//               <div className="login mb-4">
//                 <h4 className='fw-bold mb-2'>Need Help?</h4>
//                 <p style={{ fontSize: '14px', opacity: '80%' }} className="mb-3">
//                   If you have any questions about your order, please contact our customer service.
//                 </p>
//                 <button
//                   className='py-3 px-4 border-0 fw-semibold text-white rounded-1'
//                   style={{ backgroundColor: '#0A5D5D' }}
//                 >
//                   Contact Support
//                 </button>
//               </div>

//               {/* Track Another Order */}
//               <div className="text-center">
//                 <button
//                   onClick={() => {
//                     setOrderId('');
//                     setOrderData(null);
//                     setSearched(false);
//                     setError(null);
//                   }}
//                   className='py-3 px-4 border-2 fw-semibold rounded-1 bg-white'
//                   style={{ borderColor: '#0A5D5D', color: '#0A5D5D' }}
//                 >
//                   Track Another Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* No results found */}
//       {searched && !loading && !orderData && error && (
//         <div className="container-fluid px-3 mt-4">
//           <div className="d-flex flex-column align-items-center">
//             <div className="login text-center" style={{ maxWidth: "500px" }}>
//               <div className="mb-4" style={{ fontSize: '48px', opacity: '30%' }}>📦</div>
//               <h4 className='fw-bold mb-2'>No order found</h4>
//               <p style={{ fontSize: '14px', opacity: '80%' }} className="mb-4">
//                 We couldn't find an order with that number. Please check and try again.
//               </p>
//               <button
//                 onClick={() => {
//                   setOrderId('');
//                   setSearched(false);
//                   setError(null);
//                 }}
//                 className="border-0 bg-transparent p-0 greenHover fw-bold"
//                 style={{ fontSize: '14px' }}
//               >
//                 Try a different order number
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default TrackOrder;

'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import apiInstance from '@/api/instance';
import { IoIosMail } from "react-icons/io";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);

  const statusSteps = [
    { id: 'pending', label: 'Pending', description: 'Order received and confirmed' },
    { id: 'processing', label: 'Processing', description: 'Preparing your order' },
    { id: 'dispatch', label: 'Dispatch', description: 'Order dispatched and on the way' },
    { id: 'delivered', label: 'Delivered', description: 'Order successfully delivered' },
    { id: 'cancelled', label: 'Cancelled', description: 'Order has been cancelled' },
  ];

  // Status mapping to handle different status formats
  const normalizeStatus = (status) => {
    if (!status) return 'pending';
    const statusLower = status.toLowerCase();

    // Map various status formats to our standard statuses
    if (statusLower === 'complete' || statusLower === 'completed' || statusLower === 'delivered') {
      return 'delivered';
    }
    if (statusLower === 'dispatch' || statusLower === 'dispatched' || statusLower === 'in_transit') {
      return 'dispatch';
    }
    if (statusLower === 'process' || statusLower === 'preparing' || statusLower === 'confirmed') {
      return 'processing';
    }
    if (statusLower === 'cancelled' || statusLower === 'canceled') {
      return 'cancelled';
    }

    return 'pending'; // default fallback
  };

  const fetchOrder = async () => {
    if (!orderId.trim()) {
      setError('Please enter an order number');
      return;
    }

    setLoading(true);
    setError(null);
    setSearched(true);

    try {
      const response = await apiInstance.get(`/api/dashboard/orderStatusById/${orderId}`);
      setOrderData(response.data);
      console.log(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch order details');
      setOrderData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchOrder();
  };

  const getStatusIndex = (status) => {
    const normalizedStatus = normalizeStatus(status);
    return statusSteps.findIndex(step => step.id === normalizedStatus);
  };

  const getStatusBreakdown = () => {
    const breakdown = {
      pending: 0,
      processing: 0,
      dispatch: 0,
      delivered: 0,
      cancelled: 0
    };

    orderData?.cart?.forEach(item => {
      const normalizedStatus = normalizeStatus(item.orderStatus);
      if (breakdown.hasOwnProperty(normalizedStatus)) {
        breakdown[normalizedStatus]++;
      }
    });

    return breakdown;
  };

  const getDominantStatus = () => {
    const breakdown = getStatusBreakdown();
    // Find the highest status that has at least one item
    for (let i = statusSteps.length - 1; i >= 0; i--) {
      if (breakdown[statusSteps[i].id] > 0) {
        return statusSteps[i].id;
      }
    }
    return 'pending';
  };


  const hasMultipleStatuses = () => {
    const breakdown = getStatusBreakdown();
    let count = 0;
    for (const status in breakdown) {
      if (breakdown[status] > 0) count++;
      if (count > 1) return true;
    }
    return false;
  };

  const getOverallProgress = () => {
    const breakdown = getStatusBreakdown();
    let totalWeight = 0;
    let weightedSum = 0;

    statusSteps.forEach((step, index) => {
      const count = breakdown[step.id];
      if (count > 0) {
        totalWeight += count;
        weightedSum += count * index;
      }
    });

    return totalWeight > 0 ? (weightedSum / totalWeight) / (statusSteps.length - 1) * 100 : 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <style jsx>{`
        .timeline-container {
          position: relative;
          padding: 20px 0;
        }

        .timeline-step {
          display: flex;
          margin-bottom: 40px;
          position: relative;
        }

        .timeline-step.last-step {
          margin-bottom: 0;
        }

        .timeline-marker-container {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-right: 20px;
          z-index: 2;
        }

        .timeline-marker {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #e9ecef;
          border: 3px solid #dee2e6;
          transition: all 0.3s ease;
          position: relative;
        }

        .timeline-marker.delivered {
          background: #28a745;
          border-color: #28a745;
          color: white;
        }

        .timeline-marker.current {
          background: #0A5D5D;
          border-color: #0A5D5D;
          color: white;
          box-shadow: 0 0 15px rgba(10, 93, 93, 0.4);
        }

        .timeline-marker.partial {
          background: linear-gradient(45deg, #28a745 50%, #0A5D5D 50%);
          border-color: #0A5D5D;
          color: white;
        }

        .checkmark {
          width: 18px;
          height: 18px;
          fill: currentColor;
        }

        .timeline-connector {
          width: 3px;
          height: 50px;
          background: #dee2e6;
          margin-top: 10px;
          transition: all 0.3s ease;
        }

        .timeline-connector.delivered {
          background: #28a745;
        }

        .timeline-content {
          flex: 1;
          padding-top: 5px;
        }

        .status-label {
          font-size: 18px;
          font-weight: 600;
          color: #495057;
          margin: 0;
          transition: color 0.3s ease;
        }

        .status-label.delivered {
          color: #28a745;
        }

        .status-label.current {
          color: #0A5D5D;
        }

        .status-description {
          color: #6c757d;
          margin: 5px 0 15px 0;
          font-size: 14px;
        }

        .status-description.delivered {
          color: #28a745;
        }

        .status-info {
          background: #f8f9fa;
          padding: 15px;
          border-radius: 8px;
          border-left: 4px solid #0A5D5D;
          margin-top: 10px;
        }

        .status-info p {
          margin: 0 0 10px 0;
          font-size: 14px;
          color: #495057;
        }

        .item-count-box {
          background: rgba(10, 93, 93, 0.1);
          padding: 8px 12px;
          border-radius: 6px;
          margin-top: 10px;
        }

        .item-count {
          font-size: 12px;
          font-weight: 600;
          color: #0A5D5D;
          display: block;
        }

        .status-note {
          font-size: 11px;
          color: #6c757d;
          display: block;
          margin-top: 2px;
        }

        .status-breakdown-box {
          background: #f8f9fa;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .status-badge {
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .status-badge.pending {
          background: #6c757d;
          color: white;
        }

        .status-badge.processing {
          background: #17a2b8;
          color: white;
        }

        .status-badge.dispatch {
          background: #007bff;
          color: white;
        }

        .status-badge.delivered {
          background: #28a745;
          color: white;
        }

        .status-badge.cancelled {
          background: #dc3545;
          color: white;
        }

        .mixed-status-badge {
          background: linear-gradient(45deg, #17a2b8, #007bff);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .current-badge {
          background: #0A5D5D;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          margin-left: 10px;
        }

        .status-bars {
          margin-top: 15px;
        }

        .status-bar-item {
          margin-bottom: 10px;
        }

        .status-bar-item:last-child {
          margin-bottom: 0;
        }

        .progress {
          height: 6px;
          background: #e9ecef;
          border-radius: 3px;
          margin-top: 5px;
        }

        .progress-bar {
          height: 100%;
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .progress-bar.pending {
          background: #6c757d;
        }

        .progress-bar.processing {
          background: #17a2b8;
        }

        .progress-bar.dispatch {
          background: #007bff;
        }

        .progress-bar.delivered {
          background: #28a745;
        }

        .progress-bar.cancelled {
          background: #dc3545;
        }

        .summary-label {
          font-size: 12px;
          color: #6c757d;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
          display: block;
          margin-bottom: 5px;
        }

        .summary-value {
          font-size: 16px;
          font-weight: 600;
          color: #495057;
          margin: 0;
        }

        .tracking-link {
          color: #0A5D5D;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
        }

        .tracking-link:hover {
          text-decoration: underline;
        }

        .review-btn, .support-btn {
          background: #0A5D5D;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        .review-btn:hover, .support-btn:hover {
          background: #085050;
        }

        .login {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          border: 1px solid #e9ecef;
        }

        .loader-container {
          display: flex;
          justify-content: center;
          padding: 40px 0;
        }

        .loader {
          width: 40px;
          height: 40px;
          border: 4px solid #f3f3f3;
          border-top: 4px solid #0A5D5D;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .greenHover:hover {
          color: #0A5D5D !important;
          transition: color 0.3s ease;
        }

        .overall-progress {
          background: #e9ecef;
          height: 8px;
          border-radius: 4px;
          margin: 15px 0;
          overflow: hidden;
        }

        .overall-progress-bar {
          height: 100%;
          background: linear-gradient(90deg, #28a745, #0A5D5D);
          border-radius: 4px;
          transition: width 0.5s ease;
        }

        @media (max-width: 768px) {
          .timeline-marker {
            width: 30px;
            height: 30px;
          }
          
          .checkmark {
            width: 14px;
            height: 14px;
          }
          
          .timeline-marker-container {
            margin-right: 15px;
          }
          
          .login {
            padding: 20px;
          }
        }
      `}</style>

      <div className="container-fluid px-3">
        <h2 className='text-center fw-bolder display-5 mt-4 mt-md-5 mb-3 mb-md-0'>TRACK ORDER</h2>

        <div className="d-flex flex-column align-items-center justify-content-center py-3 py-md-5">
          {!orderData && (
            <div className="login w-100" style={{ maxWidth: "500px" }}>
              <h4 className='fw-bold mb-2'>Enter your order number</h4>
              <span className='d-block mb-3' style={{ fontSize: '13px' }}>Track your order status:</span>

              {loading ? (
                <div className='loader-container'>
                  <span className="loader"></span>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mt-3 mb-3">
                    <input
                      type="text"
                      className="form-control p-3"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
                      placeholder="ENTER YOUR ORDER NUMBER"
                    />
                  </div>

                  {error && <div className="text-danger mb-3">{error}</div>}

                  <button
                    className='d-block w-100 mb-2 mt-4 py-3 border-0 fw-semibold text-white rounded-1'
                    type='submit'
                    disabled={loading}
                    style={{ backgroundColor: '#0A5D5D' }}
                  >
                    Track Order
                  </button>

                  <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2">
                    <span style={{ fontSize: '13px', opacity: '80%' }}>
                      Can't find your order number? <Link href="/contact" className='greenHover text-decoration-none text-black fw-bold cursor-pointer hover:text-[#0A5D5D]'>Contact Support</Link>
                    </span>
                    <span style={{ fontSize: '13px', opacity: '80%', marginTop: '8px' }} className="mt-sm-0">
                      <Link href="/" className='text-decoration-none text-black'>
                        <span className='greenHover fw-bold'>Back to Home</span>
                      </Link>
                    </span>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Order Details Section */}
      {searched && !loading && orderData && (
        <div className="container-fluid px-3">
          <div className="d-flex flex-column align-items-center">
            <div className="w-100" style={{ maxWidth: "800px" }}>

              {/* Order Summary Card */}
              <div className="login mb-4">
                <h4 className='fw-bold mb-3'>Order Summary</h4>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <span className="summary-label">Order Number</span>
                    <p className="summary-value">{orderData.orderCode}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <span className="summary-label">Date Placed</span>
                    <p className="summary-value">{formatDate(orderData.createdAt)}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <span className="summary-label">Total Amount</span>
                    <p className="summary-value">{orderData.total.toFixed(2)}</p>
                  </div>
                  <div className="col-md-6 mb-3">
                    <span className="summary-label">Payment Method</span>
                    <p className="summary-value">{orderData.paymentMethod}</p>
                  </div>
                </div>

                {/* Status Breakdown Box */}
                <div className="status-breakdown-box mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold">Order Status:</span>
                    {hasMultipleStatuses() ? (
                      <span className="mixed-status-badge">Mixed Status</span>
                    ) : (
                      <span className={`status-badge ${getDominantStatus()}`}>
                        {statusSteps.find(s => s.id === getDominantStatus())?.label}
                      </span>
                    )}
                  </div>

                  {/* Overall Progress Bar */}
                  <div className="overall-progress">
                    <div
                      className="overall-progress-bar"
                      style={{ width: `${getOverallProgress()}%` }}
                    ></div>
                  </div>

                  {hasMultipleStatuses() && (
                    <div className="status-bars">
                      {statusSteps.map(step => {
                        const count = getStatusBreakdown()[step.id];
                        if (count === 0) return null;

                        return (
                          <div key={step.id} className="status-bar-item">
                            <div className="d-flex justify-content-between">
                              <span style={{ fontSize: '14px', fontWeight: '600' }}>{step.label}</span>
                              <span style={{ fontSize: '12px', color: '#6c757d' }}>{count} item{count !== 1 ? 's' : ''}</span>
                            </div>
                            <div className="progress">
                              <div
                                className={`progress-bar ${step.id}`}
                                style={{
                                  width: `${(count / orderData.cart.length) * 100}%`
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <span className="summary-label">Shipping Address</span>
                  <p className="summary-value mb-0">
                    {orderData.firstName} {orderData.lastName}<br />
                    {orderData.address}, {orderData.city}<br />
                    {orderData.state}, {orderData.zipCode}
                  </p>
                </div>
              </div>

              {/* Order Status Timeline */}
              {/* <div className="login mb-4">
                <h4 className='fw-bold mb-4'>Order Progress</h4>

                <div className="timeline-container">
                  {statusSteps.map((step, index) => {
                    const breakdown = getStatusBreakdown();
                    const itemCount = breakdown[step.id] || 0;
                    const dominantStatusIndex = statusSteps.findIndex(s => s.id === getDominantStatus());
                    const isCompleted = index < dominantStatusIndex;
                    const isCurrent = index === dominantStatusIndex;
                    const isLastStep = index === statusSteps.length - 1;
                    
                    // Show all steps for better visual flow
                    const shouldShow = itemCount > 0 || isCompleted || isCurrent;

                    return (
                      <div key={step.id} className={`timeline-step ${isLastStep ? 'last-step' : ''}`}>
                        <div className="timeline-marker-container">
                          <div className={`timeline-marker ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''} ${itemCount > 0 && itemCount < orderData.cart.length && isCurrent ? 'partial' : ''}`}>
                            {isCompleted && (
                              <svg className="checkmark" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                              </svg>
                            )}
                            {isCurrent && !isCompleted && (
                              <div style={{ 
                                width: '8px', 
                                height: '8px', 
                                background: 'currentColor', 
                                borderRadius: '50%' 
                              }}></div>
                            )}
                          </div>
                          {!isLastStep && (
                            <div className={`timeline-connector ${isCompleted ? 'completed' : ''}`}></div>
                          )}
                        </div>

                        <div className="timeline-content">
                          <div className="d-flex align-items-center mb-1">
                            <h5 className={`status-label ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}`}>
                              {step.label}
                            </h5>
                            {isCurrent && hasMultipleStatuses() && itemCount > 0 && itemCount < orderData.cart.length && (
                              <span className="mixed-status-badge ms-2" style={{ fontSize: '10px', padding: '2px 8px' }}>
                                Partial
                              </span>
                            )}
                            {isCurrent && !hasMultipleStatuses() && (
                              <span className="current-badge">Current</span>
                            )}
                          </div>
                          <p className={`status-description ${isCompleted ? 'completed' : ''}`}>
                            {step.description}
                          </p>

                          {itemCount > 0 && (
                            <div className="item-count-box">
                              <span className="item-count">
                                {itemCount} of {orderData.cart.length} item{itemCount !== 1 ? 's' : ''}
                                {isCurrent ? ' in this status' : ''}
                              </span>
                              {isCurrent && hasMultipleStatuses() && (
                                <span className="status-note">
                                  Other items may have different statuses
                                </span>
                              )}
                            </div>
                          )}

                          {isCurrent && itemCount > 0 && (
                            <div className="status-info">
                              {step.id === 'pending' && (
                                <p>
                                  <strong>What's happening:</strong> {itemCount} item{itemCount !== 1 ? 's are' : ' is'} pending confirmation. 
                                  We've received your order and will begin processing within 24 hours.
                                </p>
                              )}
                              {step.id === 'processing' && (
                                <p>
                                  <strong>What's happening:</strong> {itemCount} item{itemCount !== 1 ? 's are' : ' is'} being prepared for shipment. 
                                  This typically takes 1-3 business days.
                                </p>
                              )}
                              {step.id === 'dispatch' && (
                                <>
                                  <p>
                                    <strong>What's happening:</strong> {itemCount} item{itemCount !== 1 ? 's have' : ' has'} been dispatched 
                                    and {itemCount === 1 ? 'is' : 'are'} on the way to your delivery address.
                                  </p>
                                  {orderData.trackingNumber && (
                                    <a href="#" className="tracking-link">
                                      📦 Track Package: {orderData.trackingNumber}
                                    </a>
                                  )}
                                </>
                              )}
                              {step.id === 'delivered' && (
                                <>
                                  <p>
                                    <strong>Great news!</strong> {itemCount} item{itemCount !== 1 ? 's have' : ' has'} been delivered successfully.
                                    {itemCount !== orderData.cart.length && ' Other items are still being processed.'}
                                  </p>
                                  <button className="review-btn">
                                    ⭐ Leave a Review
                                  </button>
                                </>
                              )}
                              {step.id === 'cancelled' && (
                                <>
                                  <p>
                                    {itemCount} item{itemCount !== 1 ? 's have' : ' has'} been cancelled.
                                    {itemCount !== orderData.cart.length && ' Other items are still being processed.'}
                                  </p>
                                  <button className="support-btn">
                                    💬 Contact Support
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div> */}

              {/* Order Status Timeline */}
              <div className="login mb-4">
                <h4 className='fw-bold mb-4'>Order Progress</h4>

                <div className="timeline-container">
                  {statusSteps.map((step, index) => {
                    const breakdown = getStatusBreakdown();
                    const itemCount = breakdown[step.id] || 0;
                    const hasMixedStatuses = hasMultipleStatuses();

                    // New logic for mixed statuses
                    let isCompleted, isCurrent, shouldShow;

                    if (hasMixedStatuses) {
                      // For mixed statuses, only show completed if step has items AND no higher status exists
                      isCompleted = itemCount > 0 && step.id !== 'cancelled';
                      isCurrent = itemCount > 0;
                      shouldShow = itemCount > 0;
                    } else {
                      // Original logic for single status
                      const dominantStatusIndex = statusSteps.findIndex(s => s.id === getDominantStatus());
                      isCompleted = index < dominantStatusIndex;
                      isCurrent = index === dominantStatusIndex;
                      shouldShow = isCompleted || isCurrent;
                    }

                    const isLastStep = index === statusSteps.length - 1;

                    // Don't show steps with no items in mixed status scenarios
                    if (!shouldShow) return null;

                    return (
                      <div key={step.id} className={`timeline-step ${isLastStep ? 'last-step' : ''}`}>
                        <div className="timeline-marker-container">
                          <div className={`timeline-marker ${isCompleted && !hasMixedStatuses ? 'delivered' : ''} ${isCurrent ? 'current' : ''}`}>
                            {isCompleted && !hasMixedStatuses && (
                              <svg className="checkmark" viewBox="0 0 24 24">
                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                              </svg>
                            )}
                            {(isCurrent || (hasMixedStatuses && itemCount > 0)) && (
                              <div style={{
                                width: '8px',
                                height: '8px',
                                background: 'currentColor',
                                borderRadius: '50%'
                              }}></div>
                            )}
                          </div>
                          {!isLastStep && (
                            <div className={`timeline-connector ${isCompleted && !hasMixedStatuses ? 'delivered' : ''}`}></div>
                          )}
                        </div>

                        <div className="timeline-content">
                          <div className="d-flex align-items-center mb-1">
                            <h5 className={`status-label ${isCompleted && !hasMixedStatuses ? 'delivered' : ''} ${isCurrent ? 'current' : ''}`}>
                              {step.label}
                            </h5>
                            {hasMixedStatuses && (
                              <span className="current-badge">
                                {itemCount} item{itemCount !== 1 ? 's' : ''}
                              </span>
                            )}
                          </div>
                          <p className={`status-description ${isCompleted && !hasMixedStatuses ? 'delivered' : ''}`}>
                            {step.description}
                          </p>

                          {itemCount > 0 && (
                            <div className="item-count-box">
                              <span className="item-count">
                                {itemCount} of {orderData.cart.length} item{itemCount !== 1 ? 's' : ''}
                                {hasMixedStatuses ? ` ${step.label.toLowerCase()}` : ''}
                              </span>
                              {hasMixedStatuses && (
                                <span className="status-note">
                                  Items have different statuses - see individual items below
                                </span>
                              )}
                            </div>
                          )}

                          {itemCount > 0 && (
                            <div className="status-info">
                              {step.id === 'pending' && (
                                <p>
                                  <strong>What's happening:</strong> {itemCount} item{itemCount !== 1 ? 's are' : ' is'} pending confirmation.
                                  We've received your order and will begin processing within 24 hours.
                                </p>
                              )}
                              {step.id === 'process' || 'Process' && (
                                <p>
                                  <strong>What's happening:</strong> {itemCount} item{itemCount !== 1 ? 's are' : ' is'} being prepared for shipment.
                                  This typically takes 1-3 business days.
                                </p>
                              )}
                              {step.id === 'dispatch' && (
                                <>
                                  <p>
                                    <strong>What's happening:</strong> {itemCount} item{itemCount !== 1 ? 's have' : ' has'} been dispatched
                                    and {itemCount === 1 ? 'is' : 'are'} on the way to your delivery address.
                                  </p>
                                  {orderData.trackingNumber && (
                                    <a href="#" className="tracking-link">
                                      📦 Track Package: {orderData.trackingNumber}
                                    </a>
                                  )}
                                </>
                              )}
                              {step.id === 'delivered' && (
                                <>
                                  <p>
                                    <strong>Great news!</strong> {itemCount} item{itemCount !== 1 ? 's have' : ' has'} been delivered successfully.
                                    {hasMixedStatuses && ' Check other items\' status below.'}
                                  </p>
                                  <button className="review-btn">
                                    ⭐ Leave a Review
                                  </button>
                                </>
                              )}
                              {step.id === 'cancelled' && (
                                <>
                                  <p>
                                    <strong>Notice:</strong> {itemCount} item{itemCount !== 1 ? 's have' : ' has'} been cancelled.
                                    {hasMixedStatuses && ' Other items are still active - check their status below.'}
                                  </p>
                                  <button className="support-btn">
                                    💬 Contact Support
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mixed Status Warning */}
                {hasMultipleStatuses() && (
                  <div className="alert alert-info mt-4" style={{
                    background: '#e7f3ff',
                    border: '1px solid #b8daff',
                    borderRadius: '8px',
                    padding: '15px'
                  }}>
                    <div className="d-flex align-items-start">
                      <span style={{ fontSize: '20px', marginRight: '10px' }}>ℹ️</span>
                      <div>
                        <strong>Mixed Order Status</strong>
                        <p className="mb-0 mt-1" style={{ fontSize: '14px' }}>
                          Your order contains items with different statuses. Each item is processed independently.
                          Check the individual item statuses below for complete details.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="login mb-4">
                <h4 className='fw-bold mb-3'>Order Items ({orderData.cart.length})</h4>
                {orderData.cart.map((item, index) => (
                  <div key={item._id} className={`d-flex align-items-center py-3 ${index < orderData.cart.length - 1 ? 'border-bottom' : ''}`} style={{ borderColor: '#e9ecef !important' }}>
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      className="me-3 rounded-1"
                      style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <h6 className="fw-bold mb-1">{item.product.name}</h6>
                      <span style={{ fontSize: '12px', color: '#6c757d' }}>SKU: {item.product.skuCode}</span>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span style={{ fontSize: '14px', color: '#6c757d' }}>Quantity: {item.quantity}</span>
                        <span className="fw-bold" style={{ color: '#0A5D5D' }}>
                          {(item.variant.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="ms-3">
                      <span
                        className="px-3 py-2 rounded-pill text-white fw-semibold"
                        style={{
                          fontSize: '11px',
                          backgroundColor:
                            normalizeStatus(item.orderStatus) === 'pending' ? '#6c757d' :
                              normalizeStatus(item.orderStatus) === 'process' ? '#17a2b8' :
                                normalizeStatus(item.orderStatus) === 'dispatch' ? '#007bff' :
                                  normalizeStatus(item.orderStatus) === 'delivered' ? '#28a745' : '#dc3545',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {item.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Help Section */}
              <div className="login mb-4">
                <h4 className='fw-bold mb-2'>Need Help?</h4>
                <p style={{ fontSize: '14px', color: '#6c757d' }} className="mb-3">
                  Have questions about your order? Our customer service team is here to help you.
                </p>
                <div className="d-flex flex-column flex-sm-row gap-3">
                  <button
                    className='py-3 px-4 border-0 fw-semibold text-white rounded-1'
                    style={{ backgroundColor: '#0A5D5D' }}
                  >
                    💬 Contact Support
                  </button>
                  <button
                    className='py-3 px-4 border-2 fw-semibold rounded-1 bg-white'
                    style={{ borderColor: '#0A5D5D', color: '#0A5D5D' }}
                  >
                    📞 Call Us
                  </button>
                </div>
              </div>

              {/* Track Another Order */}
              <div className="text-center">
                <button
                  onClick={() => {
                    setOrderId('');
                    setOrderData(null);
                    setSearched(false);
                    setError(null);
                  }}
                  className='py-3 px-4 border-2 fw-semibold rounded-1 bg-white'
                  style={{ borderColor: '#0A5D5D', color: '#0A5D5D' }}
                >
                  🔍 Track Another Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No results found */}
      {searched && !loading && !orderData && error && (
        <div className="container-fluid px-3 mt-4">
          <div className="d-flex flex-column align-items-center">
            <div className="login text-center" style={{ maxWidth: "500px" }}>
              <div className="mb-4" style={{ fontSize: '64px', opacity: '30%' }}>📦</div>
              <h4 className='fw-bold mb-2'>Order Not Found</h4>
              <p style={{ fontSize: '14px', color: '#6c757d' }} className="mb-4">
                We couldn't find an order with that number. Please double-check your order number and try again.
              </p>
              <div className="mb-3">
                <small style={{ fontSize: '12px', color: '#6c757d' }}>
                  Order numbers are usually 8-12 characters long and may contain letters and numbers.
                </small>
              </div>
              <button
                onClick={() => {
                  setOrderId('');
                  setSearched(false);
                  setError(null);
                }}
                className="border-0 bg-transparent p-0 greenHover fw-bold"
                style={{ fontSize: '14px', color: '#0A5D5D' }}
              >
                🔄 Try a Different Order Number
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TrackOrder;