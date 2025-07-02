// "use client";

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { FaCheck, FaCreditCard, FaMoneyBill, FaPaypal } from "react-icons/fa";
// import {
//   SiRazorpay,
//   SiStripe,
//   SiPaytm,
//   SiGooglepay,
//   SiPhonepe,
// } from "react-icons/si";
// import { toast, ToastContainer } from "react-toastify";
// import {
//   fetchCoupons,
//   fetchPaymentsMethods,
//   fetchProducts,
// } from "@/redux/slice/CollectionSlice";
// import apiInstance from "@/api/instance";
// import OrderPlacedPopup from "@/components/OrderPlaced";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";

// const CheckoutPage = () => {
//   const dispatch = useDispatch();
//   const [cart, setCart] = useState([]);
//   const router = useRouter();

//   const [orderPlaced, setOrderPlaced] = useState(false);
//   // const [userId, setUserId] = useState(null);
//   // Form states
//   const [email, setEmail] = useState("");
//   const [newsletter, setNewsletter] = useState(true);
//   const [country, setCountry] = useState("United States");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [address, setAddress] = useState("");
//   const [apartment, setApartment] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [zipCode, setZipCode] = useState("");

//   // Payment method states
//   const [paymentMethods, setPaymentMethods] = useState([]);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
//   const [isLoadingPaymentMethods, setIsLoadingPaymentMethods] = useState(true);

//   // Credit card states (for card-based payment methods)
//   const [cardNumber, setCardNumber] = useState("");
//   const [cardName, setCardName] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [cvv, setCvv] = useState("");
//   const [savePaymentInfo, setSavePaymentInfo] = useState(false);

//   // UPI payment state
//   const [upiId, setUpiId] = useState("");

//   // Coupon states
//   const [couponCode, setCouponCode] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);

//   const cartData = useSelector((state) => state.addToCart.Cart);
//   const { coupons, loading: Loading } = useSelector(
//     (state) => state.Collection
//   );
//   const mockPaymentMethods = useSelector(
//     (state) => state.Collection.paymentMethods
//   );
//   const { userId, userEmail } = useSelector((state) => state.userData);

//   // get id and email
//   useEffect(() => {
//     // cons/t userId = localStorage.getItem('userId');
//     // const userEmail = localStorage.getItem('userEmail');
//     // setUserId(userId);
//     setEmail(userEmail);
//   }, [dispatch]);

//   console.log(userEmail);

//   useEffect(() => {
//     if (userId) {
//       const filterCart = cartData.filter((data) => data.userId === userId);
//       setCart(filterCart);
//     } else {
//       setCart(cartData);
//     }
//   }, [userId, cartData]);

//   // console.log("final cart: ",cart)

//   // Fetch coupons and payment methods on component mount
//   useEffect(() => {
//     dispatch(fetchCoupons());
//     dispatch(fetchProducts());
//     dispatch(fetchPaymentsMethods());
//   }, [dispatch]);

//   useEffect(() => {
//     setTimeout(() => {
//       setOrderPlaced(false);
//     }, 1000);
//   }, [orderPlaced]);

//   // Process payment methods whenever mockPaymentMethods changes
//   useEffect(() => {
//     // Filter only active payment methods
//     const activePaymentMethods = mockPaymentMethods.filter(
//       (method) => method.status === true
//     );

//     setPaymentMethods(activePaymentMethods);

//     // Set default payment method if available
//     if (activePaymentMethods.length > 0 && !selectedPaymentMethod) {
//       setSelectedPaymentMethod(activePaymentMethods[0]._id);
//     }

//     setIsLoadingPaymentMethods(false);
//   }, [mockPaymentMethods, selectedPaymentMethod]);

//   // Get payment method icon based on method name
//   const getPaymentIcon = (methodName) => {
//     const name = methodName.toLowerCase();
//     if (name.includes("paytm")) return <SiPaytm size={24} color="#00BAF2" />;
//     if (name.includes("cash")) return <FaMoneyBill size={24} color="#2E7D32" />;
//     if (name.includes("paypal")) return <FaPaypal size={24} color="#003087" />;
//     if (name.includes("razor")) return <SiRazorpay size={24} color="#072654" />;
//     if (name.includes("stripe")) return <SiStripe size={24} color="#635BFF" />;
//     if (name.includes("gpay") || name.includes("google pay"))
//       return <SiGooglepay size={24} color="#4285F4" />;
//     if (name.includes("phonepe"))
//       return <SiPhonepe size={24} color="#5f259f" />;
//     if (name.includes("upi") || name.includes("net banking"))
//       return <FaCreditCard size={24} color="#3366CC" />;
//     return <FaCreditCard size={24} />;
//   };

//   // Check if a payment method needs card details
//   const needsCardDetails = (methodName) => {
//     const name = methodName.toLowerCase();
//     return (
//       name.includes("stripe") ||
//       name.includes("credit") ||
//       name.includes("debit")
//     );
//   };

//   // Check if a payment method needs UPI ID
//   const needsUpiDetails = (methodName) => {
//     const name = methodName.toLowerCase();
//     return (
//       name.includes("upi") ||
//       name.includes("gpay") ||
//       name.includes("google pay") ||
//       name.includes("phonepe") ||
//       name.includes("paytm") ||
//       name.includes("net banking")
//     );
//   };

//   // Filter active coupons
//   const couponsData = coupons
//     ? coupons.filter((coupon) => coupon.status === true)
//     : [];

//   // Calculate order totals
//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.product.price * item.quantity,
//     0
//   );
//   const shippingFee = subtotal > 200 ? 0 : 15; // Free shipping over $200

//   // Format credit card number with spaces
//   const formatCardNumber = (value) => {
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
//     const matches = v.match(/\d{4,16}/g);
//     const match = (matches && matches[0]) || "";
//     const parts = [];

//     for (let i = 0, len = match.length; i < len; i += 4) {
//       parts.push(match.substring(i, i + 4));
//     }

//     if (parts.length) {
//       return parts.join(" ");
//     } else {
//       return value;
//     }
//   };

//   // Format expiry date (MM/YY)
//   const formatExpiryDate = (value) => {
//     const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

//     if (v.length <= 2) {
//       return v;
//     }

//     let month = v.substring(0, 2);
//     let year = v.substring(2, 4);

//     if (parseInt(month) > 12) {
//       month = "12";
//     }

//     return `${month}/${year}`;
//   };

//   const applyCoupon = () => {
//     dispatch(fetchCoupons());
//     if (!couponCode.trim()) {
//       Swal.fire({
//         icon: "error",
//         text: "Please Enter Coupon Code.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     const validateCoupon = (couponCode) => {
//       // First ensure couponsData exists and is an array
//       if (!couponsData || !Array.isArray(couponsData)) {
//         Swal.fire({
//           icon: "error",
//           text: "Coupon system unavailable. Please try again later.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         return null;
//       }

//       // Normalize the coupon code for comparison
//       const normalizedCode = couponCode
//         .trim()
//         .toLowerCase()
//         .replace(/\s+/g, " ");

//       // Find matching coupon with more flexible comparison
//       const coupon = couponsData.find((c) => {
//         const couponName = c.name.trim().toLowerCase().replace(/\s+/g, " ");
//         return couponName === normalizedCode;
//       });

//       console.log("Available coupons:", couponsData);
//       console.log("Searched for:", normalizedCode);
//       console.log("Found coupon:", coupon);

//       if (!coupon) {
//         Swal.fire({
//           icon: "error",
//           text: "Invalid Coupon Code.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         return null;
//       }

//       return coupon;
//     };

//     // Usage:
//     const coupon = validateCoupon(couponCode);
//     if (!coupon) return; // Stop if invalid

//     // Check if dateDetail exists before splitting
//     if (!coupon.dateDetail) {
//       Swal.fire({
//         icon: "error",
//         text: "Coupon date details are missing",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     const currentDate = new Date();
//     const dateParts = coupon.dateDetail.split(" To ");

//     // Check if we got exactly 2 parts
//     if (dateParts.length !== 2) {
//       Swal.fire({
//         icon: "error",
//         text: "Invalid coupon date format",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     const [startDateStr, endDateStr] = dateParts;
//     const startDate = new Date(startDateStr);
//     const endDate = new Date(endDateStr);

//     if (isNaN(startDate.getTime())) {
//       Swal.fire({
//         icon: "error",
//         text: "Invalid coupon start date",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     if (isNaN(endDate.getTime())) {
//       Swal.fire({
//         icon: "error",
//         text: "Invalid coupon end date",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     if (currentDate < startDate) {
//       Swal.fire({
//         icon: "error",
//         text: "Coupon Code Not valid yet",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     if (currentDate > endDate) {
//       Swal.fire({
//         icon: "error",
//         text: "Coupon Code Expired.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     // Check if timeDetail exists before splitting
//     if (!coupon.timeDetail) {
//       Swal.fire({
//         icon: "error",
//         text: "Coupon time details are missing",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     const currentTime = new Date().getTime();
//     const timeParts = coupon.timeDetail.split(" To ");

//     // Check if we got exactly 2 parts
//     if (timeParts.length !== 2) {
//       Swal.fire({
//         icon: "error",
//         text: "Invalid coupon time format",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     const [startTimeStr, endTimeStr] = timeParts.map((t) => t.trim());

//     // Helper function to parse time string (e.g., "10:00 AM") to milliseconds since midnight
//     const parseTimeToMs = (timeStr) => {
//       if (!timeStr) return NaN;

//       // Try to parse common time formats
//       const timeRegex = /^(\d{1,2}):(\d{2})\s*(AM|PM)?$/i;
//       const match = timeStr.match(timeRegex);

//       if (!match) return NaN;

//       let hours = parseInt(match[1], 10);
//       const minutes = parseInt(match[2], 10);
//       const period = match[3] ? match[3].toUpperCase() : null;

//       // Convert to 24-hour format
//       if (period === "PM" && hours < 12) hours += 12;
//       if (period === "AM" && hours === 12) hours = 0;

//       // Validate hours and minutes
//       if (hours < 0 || hours > 23 || minutes < 0 || minutes > 59) return NaN;

//       return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
//     };

//     // Get current time in milliseconds since midnight
//     const now = new Date();
//     const currentTimeInMs =
//       now.getHours() * 60 * 60 * 1000 +
//       now.getMinutes() * 60 * 1000 +
//       now.getSeconds() * 1000;

//     const startTimeInMs = parseTimeToMs(startTimeStr);
//     const endTimeInMs = parseTimeToMs(endTimeStr);

//     console.log("Parsed times:", {
//       startTimeInMs,
//       endTimeInMs,
//       currentTimeInMs,
//     });

//     if (isNaN(startTimeInMs)) {
//       Swal.fire({
//         icon: "error",
//         text: `Invalid coupon start time format. Expected format like "10:00 AM"`,
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     if (isNaN(endTimeInMs)) {
//       Swal.fire({
//         icon: "error",
//         text: `Invalid coupon end time format. Expected format like "08:00 PM"`,
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     if (currentTimeInMs < startTimeInMs) {
//       Swal.fire({
//         icon: "error",
//         text: "This coupon is not valid yet (too early)",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     if (currentTimeInMs > endTimeInMs) {
//       Swal.fire({
//         icon: "error",
//         text: "This coupon has expired for today",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }
//     // Check daysActive exists
//     if (!coupon.daysActive) {
//       Swal.fire({
//         icon: "error",
//         text: "Coupon days details are missing",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     const currentDay = new Date().getDay();
//     const daysMap = {
//       sunday: 0,
//       monday: 1,
//       tuesday: 2,
//       wednesday: 3,
//       thursday: 4,
//       friday: 5,
//       saturday: 6,
//     };

//     // Get the current day name in lowercase (e.g., "monday")
//     const currentDayName = Object.keys(daysMap).find(
//       (day) => daysMap[day] === currentDay
//     );

//     // Check if the current day is active in the coupon
//     if (!coupon.daysActive[currentDayName]) {
//       Swal.fire({
//         icon: "error",
//         text: "This coupon is not valid today",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     if (subtotal < coupon.minAmount) {
//       Swal.fire({
//         icon: "error",
//         text: `Minimum order amount of ${coupon.minAmount} required for this coupon`,
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     setAppliedCoupon(coupon);
//     Swal.fire({
//       icon: "success",
//       text: "Coupon Applied Successfully.",
//       timer: 2000,
//       showConfirmButton: false,
//     });
//   };

//   const removeCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponCode("");
//     // toast.info('Coupon removed');
//     Swal.fire({
//       icon: "success",
//       text: "Coupon Code Removed.",
//       timer: 2000,
//       showConfirmButton: false,
//     });
//   };

//   const calculateDiscount = () => {
//     if (!appliedCoupon) return 0;

//     console.log(appliedCoupon);

//     if (appliedCoupon.Type === "amount") {
//       return Math.min(appliedCoupon.Value, subtotal); // Ensure discount doesn't exceed subtotal
//     } else if (appliedCoupon.Type === "percentage") {
//       return (subtotal * appliedCoupon.Value) / 100;
//     }
//     return 0;
//   };

//   const discount = calculateDiscount();
//   const total = Math.max(0, subtotal - discount + shippingFee); // Ensure total doesn't go negative

//   // Get selected payment method details
//   const getSelectedPaymentMethod = () => {
//     return (
//       paymentMethods.find((method) => method._id === selectedPaymentMethod) ||
//       null
//     );
//   };

//   const validatePaymentDetails = () => {
//     if (!selectedPaymentMethod) {
//       // toast.error('Please select a payment method');
//       Swal.fire({
//         icon: "error",
//         text: "Please Select Payment Method.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return false;
//     }

//     const method = getSelectedPaymentMethod();
//     if (!method) return false;

//     // Validate card details for Stripe or other card-based payment methods
//     if (needsCardDetails(method.paymentMethod)) {
//       if (!cardNumber.trim() || cardNumber.replace(/\s/g, "").length < 16) {
//         // toast.error('Please enter a valid card number');
//         Swal.fire({
//           icon: "error",
//           text: "Please Enter Valid Card Number.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         return false;
//       }
//       if (!cardName.trim()) {
//         // toast.error('Please enter the name on your card');
//         Swal.fire({
//           icon: "error",
//           text: "Please Enter Name On Your Card.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         return false;
//       }
//       if (!expiryDate.trim() || expiryDate.length < 5) {
//         // toast.error('Please enter a valid expiry date');
//         Swal.fire({
//           icon: "error",
//           text: "Please Enter Valid Expiry Date.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         return false;
//       }
//       if (!cvv.trim() || cvv.length < 3) {
//         // toast.error('Please enter a valid CVV');
//         Swal.fire({
//           icon: "error",
//           text: "Please Enter Valid CVV.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         return false;
//       }
//     }

//     // Validate UPI ID for UPI payment methods
//     if (needsUpiDetails(method.paymentMethod)) {
//       if (!upiId.trim() || !upiId.includes("@")) {
//         // toast.error('Please enter a valid UPI ID (e.g. name@upi)');
//         Swal.fire({
//           icon: "error",
//           text: "Please Enter Valid UPI ID.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         return false;
//       }
//     }

//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!userId) {
//       // toast.error('Please Login First');
//       Swal.fire({
//         icon: "error",
//         text: "Please Login.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     if (!validatePaymentDetails()) {
//       return;
//     }

//     const selectedMethod = getSelectedPaymentMethod();

//     // Handle form submission and payment processing
//     const orderData = {
//       userId,
//       orderCode: `ORDER-${Date.now()}`,
//       email,
//       firstName,
//       lastName,
//       address,
//       city,
//       state,
//       zipCode,
//       paymentMethod: selectedMethod ? selectedMethod.paymentMethod : "",
//       paymentMode: selectedMethod ? selectedMethod.paymentMode : "",
//       paymentKey: selectedMethod
//         ? selectedMethod.paymentMode === "test"
//           ? selectedMethod.testKey
//           : selectedMethod.liveKey
//         : "",
//       cardDetails: needsCardDetails(selectedMethod?.paymentMethod)
//         ? {
//             cardNumber: cardNumber.replace(/\s/g, ""),
//             cardName,
//             expiryDate,
//             cvv,
//             savePaymentInfo,
//           }
//         : null,
//       upiDetails: needsUpiDetails(selectedMethod?.paymentMethod)
//         ? {
//             upiId,
//           }
//         : null,
//       cart,
//       appliedCoupon,
//       subtotal,
//       discount,
//       shippingFee,
//       total,
//     };

//     console.log(orderData);

//     if (orderData) {
//       sendOrder(orderData);
//     }

//     // toast.success('Order placed successfully!');
//     setOrderPlaced(true);
//   };

//   const sendOrder = async (orderData) => {
//     try {
//       const response = await apiInstance.post(
//         "/api/dashboard/addOrder",
//         orderData
//       );
//       if (response.status === 201) {
//         // toast.success('Order placed successfully!', { autoClose: 2000 });
//         // Swal.fire({
//         //     icon: 'success',
//         //     title: 'Order Placed Successfully.',
//         //     timer: 2000,
//         //     showConfirmButton: false
//         // });
//         router.push("/");
//       }
//     } catch (error) {
//       console.log(error.response?.data?.message);
//       Swal.fire({
//         icon: "error",
//         text: error.response?.data?.message,
//         timer: 2000,
//         showConfirmButton: false,
//       });
//     }
//   };

//   if (Loading) {
//     return (
//       <div className="loader-container">
//         <span className="loader"></span>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* <Header /> */}
//       <div className="checkout-page py-5">
//         <div className="container">
//           <div className="row">
//             {/* Left column - Contact and Delivery Info */}
//             <div className="col-md-7">
//               <div className="checkout-form mb-5">
//                 <h2 className="mb-4">Contact</h2>
//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Email or mobile phone number"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-check mb-4">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     checked={newsletter}
//                     onChange={(e) => setNewsletter(e.target.checked)}
//                     id="newsletterCheck"
//                   />
//                   <label className="form-check-label" htmlFor="newsletterCheck">
//                     Email me with news and offers
//                   </label>
//                 </div>

//                 <h2 className="mb-4">Delivery</h2>
//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="First name (optional)"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Last name"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Address"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Apartment, suite, etc. (optional)"
//                     value={apartment}
//                     onChange={(e) => setApartment(e.target.value)}
//                   />
//                 </div>
//                 <div className="row mb-3">
//                   <div className="col-md-5">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="City"
//                       value={city}
//                       onChange={(e) => setCity(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="State"
//                       value={state}
//                       onChange={(e) => setState(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="ZIP code"
//                       value={zipCode}
//                       onChange={(e) => setZipCode(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Payment Method Section */}
//                 <h2 className="mb-4 mt-5">Payment Method</h2>

//                 {isLoadingPaymentMethods ? (
//                   <div className="text-center py-4">
//                     <div className="spinner-border text-primary" role="status">
//                       <span className="visually-hidden">
//                         Loading payment methods...
//                       </span>
//                     </div>
//                     <p className="mt-2">Loading payment methods...</p>
//                   </div>
//                 ) : paymentMethods.length === 0 ? (
//                   <div className="alert alert-warning">
//                     No payment methods available. Please try again later.
//                   </div>
//                 ) : (
//                   <div className="payment-methods mb-4">
//                     <div className="row">
//                       {paymentMethods.map((method) => (
//                         <div className="col-md-6 mb-3" key={method._id}>
//                           <div
//                             className={`payment-method-card p-3 border rounded d-flex align-items-center ${
//                               selectedPaymentMethod === method._id
//                                 ? "border-primary"
//                                 : ""
//                             }`}
//                             onClick={() => setSelectedPaymentMethod(method._id)}
//                             style={{ cursor: "pointer" }}
//                           >
//                             <div className="me-3">
//                               {getPaymentIcon(method.paymentMethod)}
//                             </div>
//                             <div>
//                               <div className="fw-bold">
//                                 {method.paymentMethod}
//                               </div>
//                               <small className="text-muted">
//                                 {method.paymentMode === "test"
//                                   ? "Test Mode"
//                                   : "Live Mode"}
//                               </small>
//                             </div>
//                             {selectedPaymentMethod === method._id && (
//                               <div className="ms-auto">
//                                 <FaCheck className="text-primary" />
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Payment method specific forms */}
//                 {selectedPaymentMethod && (
//                   <div className="payment-details mb-4">
//                     {(() => {
//                       const method = getSelectedPaymentMethod();
//                       if (!method) return null;

//                       const methodName = method.paymentMethod.toLowerCase();

//                       // Stripe payment form (needs card details)
//                       if (needsCardDetails(method.paymentMethod)) {
//                         return (
//                           <div className="credit-card-details">
//                             <div className="mb-3">
//                               <label className="form-label">Card Number</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="1234 5678 9012 3456"
//                                 value={cardNumber}
//                                 onChange={(e) =>
//                                   setCardNumber(
//                                     formatCardNumber(e.target.value)
//                                   )
//                                 }
//                                 maxLength={19}
//                                 required
//                               />
//                             </div>
//                             <div className="mb-3">
//                               <label className="form-label">Name on Card</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="John Smith"
//                                 value={cardName}
//                                 onChange={(e) => setCardName(e.target.value)}
//                                 required
//                               />
//                             </div>
//                             <div className="row">
//                               <div className="col-md-6 mb-3">
//                                 <label className="form-label">
//                                   Expiry Date (MM/YY)
//                                 </label>
//                                 <input
//                                   type="text"
//                                   className="form-control"
//                                   placeholder="MM/YY"
//                                   value={expiryDate}
//                                   onChange={(e) =>
//                                     setExpiryDate(
//                                       formatExpiryDate(e.target.value)
//                                     )
//                                   }
//                                   maxLength={5}
//                                   required
//                                 />
//                               </div>
//                               <div className="col-md-6 mb-3">
//                                 <label className="form-label">CVV</label>
//                                 <input
//                                   type="password"
//                                   className="form-control"
//                                   placeholder="123"
//                                   value={cvv}
//                                   onChange={(e) =>
//                                     setCvv(
//                                       e.target.value.replace(/[^0-9]/g, "")
//                                     )
//                                   }
//                                   maxLength={4}
//                                   required
//                                 />
//                               </div>
//                             </div>
//                             <div className="form-check mb-3">
//                               <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 checked={savePaymentInfo}
//                                 onChange={(e) =>
//                                   setSavePaymentInfo(e.target.checked)
//                                 }
//                                 id="savePaymentCheck"
//                               />
//                               <label
//                                 className="form-check-label"
//                                 htmlFor="savePaymentCheck"
//                               >
//                                 Save this payment method for future purchases
//                               </label>
//                             </div>
//                           </div>
//                         );
//                       }

//                       // UPI payment methods (Google Pay, PhonePe, Paytm, etc.)
//                       else if (needsUpiDetails(method.paymentMethod)) {
//                         return (
//                           <div className="upi-details">
//                             <div className="mb-3">
//                               <label className="form-label">UPI ID</label>
//                               <input
//                                 type="text"
//                                 className="form-control"
//                                 placeholder="yourname@upi"
//                                 value={upiId}
//                                 onChange={(e) => setUpiId(e.target.value)}
//                                 required
//                               />
//                               <small className="text-muted">
//                                 Enter your UPI ID (e.g., yourname@okaxis,
//                                 yourname@ybl)
//                               </small>
//                             </div>
//                             <div className="alert alert-info">
//                               <small>
//                                 You will receive a payment request on your UPI
//                                 app. Please complete the payment within 5
//                                 minutes.
//                               </small>
//                             </div>
//                           </div>
//                         );
//                       }

//                       // Cash on delivery
//                       else if (methodName.includes("cash")) {
//                         return (
//                           <div className="alert alert-success">
//                             <strong>Cash on Delivery</strong> - Pay when your
//                             order is delivered. Please have the exact amount
//                             ready.
//                           </div>
//                         );
//                       }

//                       // Default message for other payment methods
//                       return (
//                         <div className="alert alert-info">
//                           You will be redirected to the payment gateway after
//                           clicking "Complete Order".
//                         </div>
//                       );
//                     })()}
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right column - Order Summary with Shadow Effect */}
//             <div
//               className="col-md-5 end-0 rounded"
//               style={{
//                 position: "sticky",
//                 top: "20px",
//                 maxHeight: "calc(100vh - 40px)",
//                 overflowY: "auto",
//                 boxShadow: "0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)",
//               }}
//             >
//               <div
//                 className="order-summary p-4 rounded"
//                 style={{ backgroundColor: "#fff" }}
//               >
//                 <h3 className="mb-4 fw-bold">Order Summary</h3>

//                 <div
//                   className="order-items"
//                   style={{ maxHeight: "300px", overflowY: "auto" }}
//                 >
//                   {cart.map((item, index) => (
//                     <div
//                       key={index}
//                       className="d-flex justify-content-between align-items-center mb-3 p-2 rounded"
//                       style={{ backgroundColor: "#f8f9fa" }}
//                     >
//                       <div className="d-flex align-items-center">
//                         <img
//                           src={item.product.thumbnail}
//                           alt={item.product.name}
//                           className="rounded me-3"
//                           style={{
//                             width: "80px",
//                             height: "80px",
//                             objectFit: "cover",
//                           }}
//                         />
//                         <div>
//                           <h6 className="mb-1">{item.product.name}</h6>
//                           <small className="text-muted">
//                             {item.product.size && `${item.product.size} / `}
//                             {item.product.color}
//                           </small>
//                           <div className="text-muted">Qty: {item.quantity}</div>
//                         </div>
//                       </div>
//                       <div className="text-end">
//                         <div className="fw-semibold">
//                           {(item.product.price * item.quantity).toFixed(2)}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <hr className="my-4" />

//                 {/* Coupon Section */}
//                 <div className="mb-4 rounded">
//                   <div className="d-flex justify-content-between align-items-center mb-2">
//                     <span className="fw-bold">Coupon Code</span>
//                     {appliedCoupon ? (
//                       <div className="d-flex align-items-center">
//                         <span className="text-success me-2">
//                           {appliedCoupon.name}
//                         </span>
//                         <button
//                           onClick={removeCoupon}
//                           className="btn btn-sm btn-outline-danger"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="d-flex justify-content-end">
//                         <input
//                           type="text"
//                           value={couponCode}
//                           onChange={(e) => setCouponCode(e.target.value)}
//                           className="form-control w-75 fw-semibold"
//                           placeholder="Enter coupon code"
//                         />
//                         <button
//                           onClick={applyCoupon}
//                           className="btn btn-sm btn-primary ms-2"
//                         >
//                           Apply
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Order Totals */}
//                 <div className="mb-2 d-flex justify-content-between">
//                   <span>Subtotal</span>
//                   <span className="fw-semibold">{subtotal.toFixed(2)}</span>
//                 </div>

//                 {appliedCoupon && (
//                   <div className="mb-2 d-flex justify-content-between text-danger">
//                     <span>Discount ({appliedCoupon.name})</span>
//                     <span className="fw-semibold">-{discount.toFixed(2)}</span>
//                   </div>
//                 )}

//                 <div className="mb-3 d-flex justify-content-between">
//                   <span>Shipping</span>
//                   <span>
//                     {shippingFee === 0 ? (
//                       <span className="text-success">
//                         <FaCheck className="me-1" />
//                         Free
//                       </span>
//                     ) : (
//                       `${shippingFee.toFixed(2)}`
//                     )}
//                   </span>
//                 </div>

//                 <div className="d-flex justify-content-between fw-bold fs-5 mt-3 rounded">
//                   <span>Total</span>
//                   <span>{total.toFixed(2)}</span>
//                 </div>

//                 <button
//                   onClick={handleSubmit}
//                   className="btn btn-dark w-100 mt-4 py-3 fw-bold"
//                   disabled={
//                     !address ||
//                     !city ||
//                     !state ||
//                     !zipCode ||
//                     !email ||
//                     !selectedPaymentMethod
//                   }
//                 >
//                   Complete Order
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* <ToastContainer /> */}
//       </div>
//       {/* <Footer /> */}
//       {orderPlaced && <OrderPlacedPopup />}
//     </>
//   );
// };

// export default CheckoutPage;



// "use client";

// import React, { useState, useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { FaCheck, FaCreditCard, FaMoneyBill, FaPaypal } from "react-icons/fa";
// import {
//   SiRazorpay,
//   SiStripe,
//   SiPaytm,
//   SiGooglepay,
//   SiPhonepe,
// } from "react-icons/si";
// import { toast, ToastContainer } from "react-toastify";
// import {
//   fetchCoupons,
//   fetchPaymentsMethods,
//   fetchProducts,
// } from "@/redux/slice/CollectionSlice";
// import apiInstance from "@/api/instance";
// import OrderPlacedPopup from "@/components/OrderPlaced";
// import Swal from "sweetalert2";
// import { useRouter } from "next/navigation";

// const CheckoutPage = () => {
//   const dispatch = useDispatch();
//   const [cart, setCart] = useState([]);
//   const router = useRouter();

//   const [orderPlaced, setOrderPlaced] = useState(false);
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);

//   // Form states
//   const [email, setEmail] = useState("");
//   const [newsletter, setNewsletter] = useState(true);
//   const [country, setCountry] = useState("United States");
//   const [firstName, setFirstName] = useState("");
//   const [lastName, setLastName] = useState("");
//   const [address, setAddress] = useState("");
//   const [apartment, setApartment] = useState("");
//   const [city, setCity] = useState("");
//   const [state, setState] = useState("");
//   const [zipCode, setZipCode] = useState("");

//   // Razorpay payment method (simplified)
//   const [selectedPaymentMethod] = useState("razorpay");

//   // Coupon states
//   const [couponCode, setCouponCode] = useState("");
//   const [appliedCoupon, setAppliedCoupon] = useState(null);

//   const cartData = useSelector((state) => state.addToCart.Cart);
//   const { coupons, loading: Loading } = useSelector(
//     (state) => state.Collection
//   );
//   const { userId, userEmail } = useSelector((state) => state.userData);

//   // get id and email
//   useEffect(() => {
//     setEmail(userEmail);
//   }, [userEmail]);

//   useEffect(() => {
//     if (userId) {
//       const filterCart = cartData.filter((data) => data.userId === userId);
//       setCart(filterCart);
//     } else {
//       setCart(cartData);
//     }
//   }, [userId, cartData]);

//   // Fetch coupons on component mount
//   useEffect(() => {
//     dispatch(fetchCoupons());
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   useEffect(() => {
//     setTimeout(() => {
//       setOrderPlaced(false);
//     }, 1000);
//   }, [orderPlaced]);

//   // Filter active coupons
//   const couponsData = coupons
//     ? coupons.filter((coupon) => coupon.status === true)
//     : [];

//   // Calculate order totals
//   const subtotal = cart.reduce(
//     (sum, item) => sum + item.product.price * item.quantity,
//     0
//   );
//   const shippingFee = subtotal > 200 ? 0 : 15; // Free shipping over $200

//   const applyCoupon = () => {
//     dispatch(fetchCoupons());
//     if (!couponCode.trim()) {
//       Swal.fire({
//         icon: "error",
//         text: "Please Enter Coupon Code.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     const validateCoupon = (couponCode) => {
//       if (!couponsData || !Array.isArray(couponsData)) {
//         Swal.fire({
//           icon: "error",
//           text: "Coupon system unavailable. Please try again later.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         return null;
//       }

//       const normalizedCode = couponCode
//         .trim()
//         .toLowerCase()
//         .replace(/\s+/g, " ");

//       const coupon = couponsData.find((c) => {
//         const couponName = c.name.trim().toLowerCase().replace(/\s+/g, " ");
//         return couponName === normalizedCode;
//       });

//       if (!coupon) {
//         Swal.fire({
//           icon: "error",
//           text: "Invalid Coupon Code.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         return null;
//       }

//       return coupon;
//     };

//     const coupon = validateCoupon(couponCode);
//     if (!coupon) return;

//     // Validate coupon dates and times (keeping your existing validation logic)
//     if (!coupon.dateDetail) {
//       Swal.fire({
//         icon: "error",
//         text: "Coupon date details are missing",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     const currentDate = new Date();
//     const dateParts = coupon.dateDetail.split(" To ");

//     if (dateParts.length !== 2) {
//       Swal.fire({
//         icon: "error",
//         text: "Invalid coupon date format",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     const [startDateStr, endDateStr] = dateParts;
//     const startDate = new Date(startDateStr);
//     const endDate = new Date(endDateStr);

//     if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
//       Swal.fire({
//         icon: "error",
//         text: "Invalid coupon date format",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     if (currentDate < startDate) {
//       Swal.fire({
//         icon: "error",
//         text: "Coupon Code Not valid yet",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     if (currentDate > endDate) {
//       Swal.fire({
//         icon: "error",
//         text: "Coupon Code Expired.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     if (subtotal < coupon.minAmount) {
//       Swal.fire({
//         icon: "error",
//         text: `Minimum order amount of ${coupon.minAmount} required for this coupon`,
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     setAppliedCoupon(coupon);
//     Swal.fire({
//       icon: "success",
//       text: "Coupon Applied Successfully.",
//       timer: 2000,
//       showConfirmButton: false,
//     });
//   };

//   const removeCoupon = () => {
//     setAppliedCoupon(null);
//     setCouponCode("");
//     Swal.fire({
//       icon: "success",
//       text: "Coupon Code Removed.",
//       timer: 2000,
//       showConfirmButton: false,
//     });
//   };

//   const calculateDiscount = () => {
//     if (!appliedCoupon) return 0;

//     if (appliedCoupon.Type === "amount") {
//       return Math.min(appliedCoupon.Value, subtotal);
//     } else if (appliedCoupon.Type === "percentage") {
//       return (subtotal * appliedCoupon.Value) / 100;
//     }
//     return 0;
//   };

//   const discount = calculateDiscount();
//   const total = Math.max(0, subtotal - discount + shippingFee);

//   // Load Razorpay script dynamically
//   const loadRazorpayScript = () => {
//     return new Promise((resolve) => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.onload = () => resolve(true);
//       script.onerror = () => resolve(false);
//       document.body.appendChild(script);
//     });
//   };

//   // Create Razorpay order on backend
//   const createRazorpayOrder = async (orderData) => {
//     try {
//       const response = await apiInstance.post("/api/razorpay/create-order", {
//         amount: Math.round(total * 100), // Convert to paise
//         currency: "INR",
//         orderData
//       });
//       return response.data;
//     } catch (error) {
//       console.error("Error creating Razorpay order:", error);
//       throw error;
//     }
//   };

//   // Verify payment on backend
//   const verifyPayment = async (paymentData) => {
//     try {
//       const response = await apiInstance.post("/api/razorpay/verify-payment", paymentData);
//       return response.data;
//     } catch (error) {
//       console.error("Error verifying payment:", error);
//       throw error;
//     }
//   };

//   // Handle Razorpay payment
//   const handleRazorpayPayment = async (orderData) => {
//     try {
//       setIsProcessingPayment(true);

//       // Load Razorpay script
//       const scriptLoaded = await loadRazorpayScript();
//       if (!scriptLoaded) {
//         Swal.fire({
//           icon: "error",
//           text: "Failed to load payment gateway. Please try again.",
//           timer: 2000,
//           showConfirmButton: false,
//         });
//         return;
//       }

//       // Create order on backend
//       const orderResponse = await createRazorpayOrder(orderData);

//       const options = {
//         key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Your Razorpay Key ID
//         amount: orderResponse.amount,
//         currency: orderResponse.currency,
//         name: "Your Store Name",
//         description: `Order #${orderData.orderCode}`,
//         order_id: orderResponse.id,
//         prefill: {
//           name: `${firstName} ${lastName}`,
//           email: email,
//           contact: "" // Add phone number if available
//         },
//         theme: {
//           color: "#3399cc"
//         },
//         handler: async (response) => {
//           try {
//             // Verify payment on backend
//             const verificationData = {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               orderData: {
//                 ...orderData,
//                 razorpayOrderId: response.razorpay_order_id,
//                 razorpayPaymentId: response.razorpay_payment_id
//               }
//             };

//             const verificationResponse = await verifyPayment(verificationData);

//             if (verificationResponse.success) {
//               setOrderPlaced(true);
//               Swal.fire({
//                 icon: "success",
//                 text: "Payment successful! Order placed.",
//                 timer: 2000,
//                 showConfirmButton: false,
//               });

//               // Redirect to success page or home
//               setTimeout(() => {
//                 router.push("/");
//               }, 2000);
//             } else {
//               throw new Error("Payment verification failed");
//             }
//           } catch (error) {
//             console.error("Payment verification error:", error);
//             Swal.fire({
//               icon: "error",
//               text: "Payment verification failed. Please contact support.",
//               timer: 3000,
//               showConfirmButton: false,
//             });
//           }
//         },
//         modal: {
//           ondismiss: () => {
//             setIsProcessingPayment(false);
//             Swal.fire({
//               icon: "warning",
//               text: "Payment cancelled. You can try again.",
//               timer: 2000,
//               showConfirmButton: false,
//             });
//           }
//         }
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();

//     } catch (error) {
//       console.error("Razorpay payment error:", error);
//       Swal.fire({
//         icon: "error",
//         text: error.response?.data?.message || "Payment failed. Please try again.",
//         timer: 3000,
//         showConfirmButton: false,
//       });
//     } finally {
//       setIsProcessingPayment(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!userId) {
//       Swal.fire({
//         icon: "error",
//         text: "Please Login.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     // Validate required fields
//     if (!firstName || !lastName || !address || !city || !state || !zipCode || !email) {
//       Swal.fire({
//         icon: "error",
//         text: "Please fill in all required fields.",
//         timer: 2000,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     const orderData = {
//       userId,
//       orderCode: `ORDER-${Date.now()}`,
//       email,
//       firstName,
//       lastName,
//       addressLine1: address,
//       addressLine2: apartment,
//       city,
//       state,
//       zipCode,
//       paymentMethod: "razorpay",
//       cart,
//       appliedCoupon,
//       subtotal,
//       discount,
//       shippingFee,
//       total,
//     };

//     // Handle Razorpay payment
//     await handleRazorpayPayment(orderData);
//   };

//   if (Loading) {
//     return (
//       <div className="loader-container">
//         <span className="loader"></span>
//       </div>
//     );
//   }

//   return (
//     <>
//       {/* <Header /> */}
//       <div className="checkout-page py-5">
//         <div className="container">
//           <div className="row">
//             {/* Left column - Contact and Delivery Info */}
//             <div className="col-md-7">
//               <div className="checkout-form mb-5">
//                 <h2 className="mb-4">Contact</h2>
//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Email or mobile phone number"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="form-check mb-4">
//                   <input
//                     className="form-check-input"
//                     type="checkbox"
//                     checked={newsletter}
//                     onChange={(e) => setNewsletter(e.target.checked)}
//                     id="newsletterCheck"
//                   />
//                   <label className="form-check-label" htmlFor="newsletterCheck">
//                     Email me with news and offers
//                   </label>
//                 </div>

//                 <h2 className="mb-4">Delivery</h2>
//                 <div className="row mb-3">
//                   <div className="col-md-6">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="First name"
//                       value={firstName}
//                       onChange={(e) => setFirstName(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-6">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="Last name"
//                       value={lastName}
//                       onChange={(e) => setLastName(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Address"
//                     value={address}
//                     onChange={(e) => setAddress(e.target.value)}
//                     required
//                   />
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Apartment, suite, etc. (optional)"
//                     value={apartment}
//                     onChange={(e) => setApartment(e.target.value)}
//                   />
//                 </div>
//                 <div className="row mb-3">
//                   <div className="col-md-5">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="City"
//                       value={city}
//                       onChange={(e) => setCity(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="State"
//                       value={state}
//                       onChange={(e) => setState(e.target.value)}
//                       required
//                     />
//                   </div>
//                   <div className="col-md-4">
//                     <input
//                       type="text"
//                       className="form-control"
//                       placeholder="ZIP code"
//                       value={zipCode}
//                       onChange={(e) => setZipCode(e.target.value)}
//                       required
//                     />
//                   </div>
//                 </div>

//                 {/* Payment Method Section - Fixed to Razorpay */}
//                 {/* <h2 className="mb-4 mt-5">Payment Method</h2>
//                 <div className="payment-methods mb-4">
//                   <div className="payment-method-card p-4 border rounded border-primary">
//                     <div className="d-flex align-items-center">
//                       <div className="me-3">
//                         <SiRazorpay size={32} color="#072654" />
//                       </div>
//                       <div>
//                         <div className="fw-bold fs-5">Razorpay</div>
//                         <small className="text-muted">
//                           Secure payment with Cards, UPI, Net Banking & Wallets
//                         </small>
//                       </div>
//                       <div className="ms-auto">
//                         <FaCheck className="text-primary" />
//                       </div>
//                     </div>
//                   </div>
//                 </div> */}
//                 <div className="alert alert-info mt-3">
//                   <small>
//                     <strong>Secure Payment:</strong> Your payment information is encrypted and secure.
//                     Supports all major credit cards, debit cards, UPI, net banking, and digital wallets.
//                   </small>
//                 </div>
//               </div>
//             </div>

//             {/* Right column - Order Summary with Shadow Effect */}
//             <div
//               className="col-md-5 end-0 rounded"
//               style={{
//                 position: "sticky",
//                 top: "20px",
//                 maxHeight: "calc(100vh - 40px)",
//                 overflowY: "auto",
//                 boxShadow: "0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)",
//               }}
//             >
//               <div
//                 className="order-summary p-4 rounded"
//                 style={{ backgroundColor: "#fff" }}
//               >
//                 <h3 className="mb-4 fw-bold">Order Summary</h3>

//                 <div
//                   className="order-items"
//                   style={{ maxHeight: "300px", overflowY: "auto" }}
//                 >
//                   {cart.map((item, index) => (
//                     <div
//                       key={index}
//                       className="d-flex justify-content-between align-items-center mb-3 p-2 rounded"
//                       style={{ backgroundColor: "#f8f9fa" }}
//                     >
//                       <div className="d-flex align-items-center">
//                         <img
//                           src={item.product.thumbnail}
//                           alt={item.product.name}
//                           className="rounded me-3"
//                           style={{
//                             width: "80px",
//                             height: "80px",
//                             objectFit: "cover",
//                           }}
//                         />
//                         <div>
//                           <h6 className="mb-1">{item.product.name}</h6>
//                           <small className="text-muted">
//                             {item.product.size && `${item.product.size} / `}
//                             {item.product.color}
//                           </small>
//                           <div className="text-muted">Qty: {item.quantity}</div>
//                         </div>
//                       </div>
//                       <div className="text-end">
//                         <div className="fw-semibold">
//                           ₹{(item.product.price * item.quantity).toFixed(2)}
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <hr className="my-4" />

//                 {/* Coupon Section */}
//                 <div className="mb-4 rounded">
//                   <div className="d-flex justify-content-between align-items-center mb-2">
//                     <span className="fw-bold">Coupon Code</span>
//                     {appliedCoupon ? (
//                       <div className="d-flex align-items-center">
//                         <span className="text-success me-2">
//                           {appliedCoupon.name}
//                         </span>
//                         <button
//                           onClick={removeCoupon}
//                           className="btn btn-sm btn-outline-danger"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ) : (
//                       <div className="d-flex justify-content-end">
//                         <input
//                           type="text"
//                           value={couponCode}
//                           onChange={(e) => setCouponCode(e.target.value)}
//                           className="form-control w-75 fw-semibold"
//                           placeholder="Enter coupon code"
//                         />
//                         <button
//                           onClick={applyCoupon}
//                           className="btn btn-sm btn-primary ms-2"
//                         >
//                           Apply
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Order Totals */}
//                 <div className="mb-2 d-flex justify-content-between">
//                   <span>Subtotal</span>
//                   <span className="fw-semibold">₹{subtotal.toFixed(2)}</span>
//                 </div>

//                 {appliedCoupon && (
//                   <div className="mb-2 d-flex justify-content-between text-danger">
//                     <span>Discount ({appliedCoupon.name})</span>
//                     <span className="fw-semibold">-₹{discount.toFixed(2)}</span>
//                   </div>
//                 )}

//                 <div className="mb-3 d-flex justify-content-between">
//                   <span>Shipping</span>
//                   <span>
//                     {shippingFee === 0 ? (
//                       <span className="text-success">
//                         <FaCheck className="me-1" />
//                         Free
//                       </span>
//                     ) : (
//                       `₹${shippingFee.toFixed(2)}`
//                     )}
//                   </span>
//                 </div>

//                 <div className="d-flex justify-content-between fw-bold fs-5 mt-3 rounded">
//                   <span>Total</span>
//                   <span>₹{total.toFixed(2)}</span>
//                 </div>

//                 <button
//                   onClick={handleSubmit}
//                   className="btn btn-dark w-100 mt-4 py-3 fw-bold"
//                   disabled={
//                     !address ||
//                     !city ||
//                     !state ||
//                     !zipCode ||
//                     !email ||
//                     !firstName ||
//                     !lastName ||
//                     isProcessingPayment
//                   }
//                 >
//                   {isProcessingPayment ? (
//                     <>
//                       <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
//                       Processing...
//                     </>
//                   ) : (
//                     "Place Your Order"
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* <Footer /> */}
//       {orderPlaced && <OrderPlacedPopup />}
//     </>
//   );
// };

// export default CheckoutPage;


"use client";

import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { FaCheck, FaCreditCard, FaMoneyBill, FaPaypal } from "react-icons/fa";
import {
  SiRazorpay,
  SiStripe,
  SiPaytm,
  SiGooglepay,
  SiPhonepe,
} from "react-icons/si";
import { toast, ToastContainer } from "react-toastify";
import {
  fetchCoupons,
  fetchPaymentsMethods,
  fetchProducts,
} from "@/redux/slice/CollectionSlice";
import apiInstance from "@/api/instance";
import OrderPlacedPopup from "@/components/OrderPlaced";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const router = useRouter();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [country, setCountry] = useState("United States");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");

  // Payment method state
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("razorpay");

  // Coupon states
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const cartData = useSelector((state) => state.addToCart.Cart);
  const { coupons, loading: Loading } = useSelector(
    (state) => state.Collection
  );
  const { userId, userEmail } = useSelector((state) => state.userData);


  useEffect(() => {
    loadAddressData()
  }, [])

  const loadAddressData = async () => {
    try {
      const response = await apiInstance.get(`/api/address/user/${userId}`);
      if (response.status === 200 && response.data) {
        // If address exists, set the flag and ID

        // Populate address form with existing data
        setFirstName(response.data.firstName || ''),
          setLastName(response.data.lastName || ''),
          setAddressLine1(response.data.addressLine1 || ''),
          setAddressLine2(response.data.addressLine2 || ''),
          setCity(response.data.city || ''),
          setState(response.data.state || ''),
          setZipCode(response.data.zipCode || '')

      }
    } catch (error) {
      console.error('Error loading address data:', error);
    }
  }


  // get id and email
  useEffect(() => {
    setEmail(userEmail);
  }, [userEmail]);

  useEffect(() => {
    if (userId) {
      const filterCart = cartData.filter((data) => data.userId === userId);
      setCart(filterCart);
    } else {
      setCart(cartData);
    }
  }, [userId, cartData]);

  // Fetch coupons on component mount
  useEffect(() => {
    dispatch(fetchCoupons());
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setTimeout(() => {
      setOrderPlaced(false);
    }, 1000);
  }, [orderPlaced]);

  // Filter active coupons
  const couponsData = coupons
    ? coupons.filter((coupon) => coupon.status === true)
    : [];

  // Calculate order totals
  // const subtotal = cart.reduce(
  //   (sum, item) => sum + item.product.price * item.quantity,
  //   0
  // );
  const subtotal = cart.reduce(
    (sum, item) => sum + item.variant.price * item.quantity,
    0
  );
  const shippingFee = subtotal > 200 ? 0 : 15; // Free shipping over $200

  const applyCoupon = () => {
    dispatch(fetchCoupons());
    if (!couponCode.trim()) {
      Swal.fire({
        icon: "error",
        text: "Please Enter Coupon Code.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const validateCoupon = (couponCode) => {
      if (!couponsData || !Array.isArray(couponsData)) {
        Swal.fire({
          icon: "error",
          text: "Coupon system unavailable. Please try again later.",
          timer: 2000,
          showConfirmButton: false,
        });
        return null;
      }

      const normalizedCode = couponCode
        .trim()
        .toLowerCase()
        .replace(/\s+/g, " ");

      const coupon = couponsData.find((c) => {
        const couponName = c.name.trim().toLowerCase().replace(/\s+/g, " ");
        return couponName === normalizedCode;
      });

      if (!coupon) {
        Swal.fire({
          icon: "error",
          text: "Invalid Coupon Code.",
          timer: 2000,
          showConfirmButton: false,
        });
        return null;
      }

      return coupon;
    };

    const coupon = validateCoupon(couponCode);
    if (!coupon) return;

    // Validate coupon dates and times (keeping your existing validation logic)
    if (!coupon.dateDetail) {
      Swal.fire({
        icon: "error",
        text: "Coupon date details are missing",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const currentDate = new Date();
    const dateParts = coupon.dateDetail.split(" To ");

    if (dateParts.length !== 2) {
      Swal.fire({
        icon: "error",
        text: "Invalid coupon date format",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const [startDateStr, endDateStr] = dateParts;
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);

    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
      Swal.fire({
        icon: "error",
        text: "Invalid coupon date format",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    if (currentDate < startDate) {
      Swal.fire({
        icon: "error",
        text: "Coupon Code Not valid yet",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    if (currentDate > endDate) {
      Swal.fire({
        icon: "error",
        text: "Coupon Code Expired.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    if (subtotal < coupon.minAmount) {
      Swal.fire({
        icon: "error",
        text: `Minimum order amount of ${coupon.minAmount} required for this coupon`,
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    setAppliedCoupon(coupon);
    Swal.fire({
      icon: "success",
      text: "Coupon Applied Successfully.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    Swal.fire({
      icon: "success",
      text: "Coupon Code Removed.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;

    if (appliedCoupon.Type === "amount") {
      return Math.min(appliedCoupon.Value, subtotal);
    } else if (appliedCoupon.Type === "percentage") {
      return (subtotal * appliedCoupon.Value) / 100;
    }
    return 0;
  };

  const discount = calculateDiscount();
  const total = Math.max(0, subtotal - discount + shippingFee);

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


  // Handle Razorpay payment
  // const handleRazorpayPayment = async (orderData) => {
  //   try {
  //     setIsProcessingPayment(true);

  //     // 1. Create order in backend
  //     const orderResponse = await apiInstance.post("/api/dashboard/addOrder", orderData);

  //     if (!orderResponse.data.success || !orderResponse.data.razorpay) {
  //       throw new Error("Failed to initialize payment");
  //     }

  //     // 2. Initialize Razorpay
  //     const options = {
  //       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  //       amount: orderResponse.data.razorpay.amount,
  //       currency: orderResponse.data.razorpay.currency,
  //       name: orderResponse.data.razorpay.name,
  //       description: orderResponse.data.razorpay.description,
  //       order_id: orderResponse.data.razorpay.orderId,
  //       handler: async function (response) {
  //         try {
  //           // Verify we have all required fields
  //           const requiredFields = [
  //             'razorpay_payment_id',
  //             'razorpay_order_id',
  //             'razorpay_signature'
  //           ];

  //           const missingFields = requiredFields.filter(
  //             field => !response[field]
  //           );

  //           if (missingFields.length > 0) {
  //             throw new Error(
  //               `Missing payment verification fields: ${missingFields.join(', ')}`
  //             );
  //           }

  //           // Verify payment
  //           const verification = await apiInstance.post(
  //             "/api/dashboard/verify-payment",
  //             {
  //               ...response,
  //               orderId: orderResponse.data.data._id
  //             }
  //           );

  //           if (verification.data.success) {
  //             // Success handling
  //             setOrderPlaced(true);
  //             // router.push(`/order-success/${orderResponse.data.data._id}`);
  //             Swal.fire({
  //               icon: "success",
  //               text: "Payment successful! Order placed.",
  //               timer: 2000,
  //               showConfirmButton: false,
  //             });
  //             router.push("/myOrders");
  //           } else {
  //             throw new Error(
  //               verification.data.message || "Payment verification failed"
  //             );
  //           }
  //         } catch (error) {
  //           console.error("Payment processing error:", error);
  //           // Show error to user and allow retry
  //         }
  //       },
  //       prefill: {
  //         name: `${orderData.firstName} ${orderData.lastName}`,
  //         email: orderData.email,
  //         contact: orderData.mobile || ""
  //       },
  //       theme: {
  //         color: "#3399cc"
  //       }
  //     };

  //     // Add error handlers
  //     const rzp = new window.Razorpay(options);

  //     rzp.on('payment.failed', (response) => {
  //       console.error("Payment failed:", response.error);
  //       Swal.fire({
  //         icon: "error",
  //         title: "Payment Failed",
  //         text: response.error.description || "Payment could not be completed",
  //         confirmButtonText: "Try Again"
  //       });
  //     });

  //     rzp.open();

  //   } catch (error) {
  //     console.error("Payment initialization error:", error);
  //     Swal.fire({
  //       icon: "error",
  //       title: "Payment Error",
  //       text: error.message,
  //       confirmButtonText: "OK"
  //     });
  //   } finally {
  //     setIsProcessingPayment(false);
  //   }
  // };

  const handleRazorpayPayment = async (orderData) => {
    try {
      setIsProcessingPayment(true);

      if (!window.Razorpay) {
        const scriptLoaded = await loadRazorpayScript();
        if (!scriptLoaded) {
          throw new Error("Failed to load Razorpay payment gateway");
        }
      }


      // 1. Create order on backend
      const orderResponse = await apiInstance.post("/api/dashboard/addOrder", orderData);

      if (!orderResponse.data.success || !orderResponse.data.razorpay) {
        throw new Error("Failed to initialize payment");
      }

      // 2. Initialize Razorpay payment
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderResponse.data.razorpay.amount,
        currency: orderResponse.data.razorpay.currency,
        name: orderResponse.data.razorpay.name || 'HQ PERFUME',
        description: orderResponse.data.razorpay.description,
        order_id: orderResponse.data.razorpay.orderId,
        handler: async function (response) {
          try {
            // Check required Razorpay response fields
            const requiredFields = [
              'razorpay_payment_id',
              'razorpay_order_id',
              'razorpay_signature'
            ];

            const missingFields = requiredFields.filter(
              field => !response[field]
            );

            if (missingFields.length > 0) {
              throw new Error(
                `Missing payment verification fields: ${missingFields.join(', ')}`
              );
            }

            // Show loading dialog while verifying payment
            Swal.fire({
              title: "Verifying payment...",
              text: "Please wait while we confirm your transaction.",
              allowOutsideClick: false,
              didOpen: () => {
                Swal.showLoading();
              }
            });

            // Verify payment on backend
            const verification = await apiInstance.post(
              "/api/dashboard/verify-payment",
              {
                ...response,
                orderId: orderResponse.data.data._id
              }
            );

            if (verification.data.success) {
              Swal.fire({
                icon: "success",
                text: "Payment successful! Order placed.",
                timer: 2000,
                showConfirmButton: false,
              });

              setOrderPlaced(true);
              router.push("/myOrders");
            } else {
              throw new Error(verification.data.message || "Payment verification failed");
            }
          } catch (error) {
            console.error("Payment verification error:", error);
            Swal.fire({
              icon: "error",
              title: "Verification Failed",
              text: error.message || "Could not verify payment. Please try again.",
              confirmButtonText: "Retry"
            });
          }
        },
        prefill: {
          name: `${orderData.firstName} ${orderData.lastName}`,
          email: orderData.email,
          contact: orderData.mobile || ""
        },
        theme: {
          color: "#3399cc"
        }
      };

      // Handle payment failure
      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', (response) => {
        console.error("Payment failed:", response.error);
        Swal.fire({
          icon: "error",
          title: "Payment Failed",
          text: response.error.description || "Payment could not be completed",
          confirmButtonText: "Try Again"
        });
      });

      rzp.open();

    } catch (error) {
      console.error("Payment initialization error:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: error.message || "Something went wrong while initializing the payment.",
        confirmButtonText: "OK"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };


  // Handle Cash on Delivery
  const handleCashOnDelivery = async (orderData) => {
    try {
      setIsProcessingPayment(true);

      // Here you would typically send the order to your backend
      const response = await apiInstance.post("/api/dashboard/addOrder", {
        ...orderData,
        paymentStatus: "pending",
        orderStatus: "processing"
      });

      if (response.data.success) {
        setOrderPlaced(true);
        Swal.fire({
          icon: "success",
          text: "Order placed successfully! Pay when your items arrive.",
          timer: 2000,
          showConfirmButton: false,
        });

        // Redirect to success page or home
        setTimeout(() => {
          router.push("/");
        }, 2000);
      } else {
        throw new Error("Failed to create order");
      }
    } catch (error) {
      console.error("COD order error:", error);
      Swal.fire({
        icon: "error",
        text: error.response?.data?.message || "Failed to place order. Please try again.",
        timer: 3000,
        showConfirmButton: false,
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      Swal.fire({
        icon: "error",
        text: "Please Login.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    // Validate required fields
    if (!firstName || !lastName || !addressLine1 || !city || !state || !zipCode || !email) {
      Swal.fire({
        icon: "error",
        text: "Please fill in all required fields.",
        timer: 2000,
        showConfirmButton: false,
      });
      return;
    }

    const orderData = {
      userId,
      orderCode: `ORDER-${Date.now()}`,
      email,
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      state,
      zipCode,
      paymentMethod: selectedPaymentMethod,
      cart,
      appliedCoupon,
      subtotal,
      discount,
      shippingFee,
      total,
    };

    if (selectedPaymentMethod === "razorpay") {
      // Handle Razorpay payment
      await handleRazorpayPayment(orderData);
    } else if (selectedPaymentMethod === "cod") {
      // Handle Cash on Delivery
      await handleCashOnDelivery(orderData);
    }
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
      <div className="checkout-page py-5">
        <div className="container">
          <div className="row">
            {/* Left column - Contact and Delivery Info */}
            <div className="col-md-7">
              <div className="checkout-form mb-5">
                <h2 className="mb-4">Contact</h2>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email or mobile phone number"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    id="newsletterCheck"
                  />
                  <label className="form-check-label" htmlFor="newsletterCheck">
                    Email me with news and offers
                  </label>
                </div>

                <h2 className="mb-4">Delivery</h2>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Address"
                    value={addressLine1}
                    onChange={(e) => setAddressLine1(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Apartment, suite, etc. (optional)"
                    value={addressLine2}
                    onChange={(e) => setAddressLine2(e.target.value)}
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-md-5">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-md-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="ZIP code"
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Payment Method Section */}
                <h2 className="mb-4 mt-5">Payment Method</h2>
                <div className="payment-methods mb-4">
                  {/* Razorpay Option */}
                  <div
                    className={`payment-method-card p-4 border rounded mb-3 ${selectedPaymentMethod === "razorpay" ? "border-primary" : ""}`}
                    onClick={() => setSelectedPaymentMethod("razorpay")}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <SiRazorpay size={32} color="#072654" />
                      </div>
                      <div>
                        <div className="fw-bold fs-5">Razorpay</div>
                        <small className="text-muted">
                          Secure payment with Cards, UPI, Net Banking & Wallets
                        </small>
                      </div>
                      {selectedPaymentMethod === "razorpay" && (
                        <div className="ms-auto">
                          <FaCheck className="text-primary" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Cash on Delivery Option */}
                  <div
                    className={`payment-method-card p-4 border rounded ${selectedPaymentMethod === "cod" ? "border-primary" : ""}`}
                    onClick={() => setSelectedPaymentMethod("cod")}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <FaMoneyBill size={32} color="#28a745" />
                      </div>
                      <div>
                        <div className="fw-bold fs-5">Cash on Delivery</div>
                        <small className="text-muted">
                          Pay when you receive your order
                        </small>
                      </div>
                      {selectedPaymentMethod === "cod" && (
                        <div className="ms-auto">
                          <FaCheck className="text-primary" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="alert alert-info mt-3">
                  <small>
                    {selectedPaymentMethod === "razorpay" ? (
                      <><strong>Secure Payment:</strong> Your payment information is encrypted and secure. Supports all major credit cards, debit cards, UPI, net banking, and digital wallets.</>
                    ) : (
                      <><strong>Cash on Delivery:</strong> You'll pay when you receive your order. Additional charges may apply for COD orders.</>
                    )}
                  </small>
                </div>
              </div>
            </div>

            {/* Right column - Order Summary with Shadow Effect */}
            <div
              className="col-md-5 end-0 rounded"
              style={{
                position: "sticky",
                top: "20px",
                maxHeight: "calc(100vh - 40px)",
                overflowY: "auto",
                boxShadow: "0 0.5rem 1.0rem rgba(0, 0, 0, 0.15)",
              }}
            >
              <div
                className="order-summary p-4 rounded"
                style={{ backgroundColor: "#fff" }}
              >
                <h3 className="mb-4 fw-bold">Order Summary</h3>

                <div
                  className="order-items"
                  style={{ maxHeight: "300px", overflowY: "auto" }}
                >
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      className="d-flex justify-content-between align-items-center mb-3 p-2 rounded"
                      style={{ backgroundColor: "#f8f9fa" }}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.name}
                          className="rounded me-3"
                          style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                          }}
                        />
                        <div>
                          <h6 className="mb-1">{item.product.name}</h6>
                          <small className="text-muted">
                            {item.product.size && `${item.product.size} / `}
                            {item.product.color}
                          </small>
                          <div className="text-muted">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="text-end">
                        <div className="fw-semibold">
                          {/* ₹{(item.product.price * item.quantity).toFixed(2)} */}
                          ₹{(item.variant.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                {/* Coupon Section */}
                <div className="mb-4 rounded">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="fw-bold">Coupon Code</span>
                    {appliedCoupon ? (
                      <div className="d-flex align-items-center">
                        <span className="text-success me-2">
                          {appliedCoupon.name}
                        </span>
                        <button
                          onClick={removeCoupon}
                          className="btn btn-sm btn-outline-danger"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-end">
                        <input
                          type="text"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                          className="form-control w-75 fw-semibold"
                          placeholder="Enter coupon code"
                        />
                        <button
                          onClick={applyCoupon}
                          className="btn btn-sm btn-primary ms-2"
                        >
                          Apply
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Order Totals */}
                <div className="mb-2 d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span className="fw-semibold">₹{subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="mb-2 d-flex justify-content-between text-danger">
                    <span>Discount ({appliedCoupon.name})</span>
                    <span className="fw-semibold">-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="mb-3 d-flex justify-content-between">
                  <span>Shipping</span>
                  <span>
                    {shippingFee === 0 ? (
                      <span className="text-success">
                        <FaCheck className="me-1" />
                        Free
                      </span>
                    ) : (
                      `₹${shippingFee.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="d-flex justify-content-between fw-bold fs-5 mt-3 rounded">
                  <span>Total</span>
                  <span>
                    ₹{(selectedPaymentMethod === "cod" ? total + 20 : total).toFixed(2)}
                  </span>
                </div>

                <button
                  onClick={handleSubmit}
                  className="btn btn-dark w-100 mt-4 py-3 fw-bold"
                  disabled={
                    !addressLine1 ||
                    !city ||
                    !state ||
                    !zipCode ||
                    !email ||
                    !firstName ||
                    !lastName ||
                    isProcessingPayment
                  }
                >
                  {isProcessingPayment ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Processing...
                    </>
                  ) : (
                    selectedPaymentMethod === "cod" ? "Place Order (COD)" : "Pay Now"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
      {orderPlaced && <OrderPlacedPopup />}
    </>
  );
};

export default CheckoutPage;