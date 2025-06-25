// import React, { useEffect, useState } from "react";
// import Table from "../../../components/Table";
// import todayOrdersData from "../../../../data/allOrders.json";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrders } from "../../../redux/slices/Dashboard/Order_Config/orderStatusSlice";

// // const AllOrders = () => {
// //     const [orders, setOrders] = useState(todayOrdersData);
// //     const [searchTerm, setSearchTerm] = useState("");
// //     const [limit, setLimit] = useState(10);
// //     const [fromDate, setFromDate] = useState("");
// //     const [toDate, setToDate] = useState("");

// //     const isOrderScroll = true;

// //     const dispatch = useDispatch();

// //     const { allOrders, loading: orderLoading, error } = useSelector((state) => state.orderStatus);

// //     // console.log(allOrders)

// //     // Handle search functionality
// //     const filteredOrders = allOrders
// //         .filter(order =>
// //             order.orderCode.toLowerCase().includes(searchTerm.toLowerCase())
// //         )
// //         .filter(order => {
// //             const orderDate = new Date(order.createdAt);
// //             if (fromDate && toDate) {
// //                 return orderDate >= new Date(fromDate) && orderDate <= new Date(toDate);
// //             }
// //             return true; // Show all orders if no date is selected
// //         })
// //         .map(order => ({
// //             ...order,
// //             amount: parseFloat(order.amount).toFixed(2) // Ensures only 2 decimal places
// //         }))
// //         .slice(0, limit);

// //     useEffect(() => {
// //         dispatch(fetchOrders())
// //     }, [dispatch])

// //     if (orderLoading) {
// //         return (
// //             <div className="flex justify-center items-center h-screen">
// //                 <span class="loader"></span>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="flex bg-gray-100 custom-container">
// //             <div className="flex-1 flex flex-col">
// //                 {/* Header */}
// //                 <header className="bg-orange-500 text-white px-6 py-3 shadow-md flex justify-between items-center">
// //                     <h1 className="text-2xl font-bold">Total Orders</h1>
// //                 </header>

// //                 {/* Filters Section */}
// //                 <div className="bg-white shadow-md rounded-lg p-4 mt-4">
// //                     <div className="grid grid-cols-4 gap-4">
// //                         <div>
// //                             <label className="block text-sm font-medium">From Date</label>
// //                             <input
// //                                 type="date"
// //                                 className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
// //                                 value={fromDate}
// //                                 onChange={(e) => setFromDate(e.target.value)}
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium">To Date</label>
// //                             <input
// //                                 type="date"
// //                                 className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
// //                                 value={toDate}
// //                                 onChange={(e) => setToDate(e.target.value)}
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium">Status Types</label>
// //                             <input
// //                                 type="text"
// //                                 className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
// //                                 placeholder="Enter status"
// //                             />
// //                         </div>
// //                         <div>
// //                             <label className="block text-sm font-medium">Customer Email or Mobile</label>
// //                             <input
// //                                 type="text"
// //                                 className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
// //                                 placeholder="email or mobile"
// //                             />
// //                         </div>
// //                     </div>

// //                     {/* Filter Button */}
// //                     {/* <div className="flex justify-end mt-4">
// //                         <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
// //                             Filter
// //                         </button>
// //                     </div> */}
// //                 </div>

// //                 {/* Orders Table */}
// //                 <div className="bg-white shadow-md rounded-lg p-4 mt-4">
// //                     <div className="flex justify-between items-center mb-4">
// //                         <h2 className="text-lg font-semibold">Today's Orders</h2>

// //                         <div className="flex space-x-4">
// //                             {/* Search Bar on the Right */}
// //                             <input
// //                                 type="search"
// //                                 className="border px-2 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
// //                                 placeholder="Search..."
// //                                 value={searchTerm}
// //                                 onChange={(e) => setSearchTerm(e.target.value)}
// //                             />

// //                             {/* Limit Dropdown */}
// //                             <select
// //                                 className="border px-3 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
// //                                 value={limit}
// //                                 onChange={(e) => setLimit(Number(e.target.value))}
// //                             >
// //                                 <option value={5}>5</option>
// //                                 <option value={10}>10</option>
// //                                 <option value={20}>20</option>
// //                                 <option value={50}>50</option>
// //                             </select>

// //                             {/* <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
// //                                 Export to Excel
// //                             </button> */}
// //                         </div>
// //                     </div>

// //                     {/* Table Component */}
// //                     <div>
// //                         <Table isOrderScroll={isOrderScroll} data={filteredOrders} />
// //                     </div>
// //                 </div>
// //             </div>
// //         </div>
// //     );
// // };

// const AllOrders = () => {
//     const [orders, setOrders] = useState(todayOrdersData);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [limit, setLimit] = useState(10);
//     const [fromDate, setFromDate] = useState("");
//     const [toDate, setToDate] = useState("");
//     const [statusFilter, setStatusFilter] = useState("");
//     const [customerFilter, setCustomerFilter] = useState("");

//     const isOrderScroll = true;

//     const dispatch = useDispatch();

//     const { allOrders, loading: orderLoading, error } = useSelector((state) => state.orderStatus);

//     // Handle search functionality
//     const filteredOrders = allOrders
//         .filter(order =>
//             order.orderCode.toLowerCase().includes(searchTerm.toLowerCase())
//         )
//         .filter(order => {
//             const orderDate = new Date(order.createdAt);
//             if (fromDate && toDate) {
//                 return orderDate >= new Date(fromDate) && orderDate <= new Date(toDate);
//             }
//             return true; // Show all orders if no date is selected
//         })
//         .filter(order => {
//             if (statusFilter) {
//                 console.log(statusFilter)
//                 console.log(order.orderStatus)
//                 return order.orderStatus.toLowerCase() === statusFilter.toLowerCase();
//             }
//             return true;
//         })
//         .filter(order => {
//             if (customerFilter) {
//                 return (
//                     (order.userEmail && order.userEmail.toLowerCase().includes(customerFilter.toLowerCase())) ||
//                     (order.userMobile && order.userMobile.includes(customerFilter))
//                 );
//             }
//             return true;
//         })
//         .map(order => ({
//             ...order,
//             amount: parseFloat(order.amount).toFixed(2) // Ensures only 2 decimal places
//         }))
//         .slice(0, limit);

//     useEffect(() => {
//         dispatch(fetchOrders())
//     }, [dispatch])

//     if (orderLoading) {
//         return (
//             <div className="flex justify-center items-center h-screen">
//                 <span className="loader"></span>
//             </div>
//         );
//     }

//     return (
//         <div className="flex bg-gray-100 custom-container">
//             <div className="flex-1 flex flex-col">
//                 {/* Header */}
//                 <header className="bg-orange-500 text-white px-6 py-3 shadow-md flex justify-between items-center">
//                     <h1 className="text-2xl font-bold">Total Orders</h1>
//                 </header>

//                 {/* Filters Section */}
//                 <div className="bg-white shadow-md rounded-lg p-4 mt-4">
//                     <div className="grid grid-cols-4 gap-4">
//                         <div>
//                             <label className="block text-sm font-medium">From Date</label>
//                             <input
//                                 type="date"
//                                 className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                                 value={fromDate}
//                                 onChange={(e) => setFromDate(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium">To Date</label>
//                             <input
//                                 type="date"
//                                 className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                                 value={toDate}
//                                 onChange={(e) => setToDate(e.target.value)}
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium">Status Types</label>
//                             <select
//                                 className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                                 value={statusFilter}
//                                 onChange={(e) => setStatusFilter(e.target.value)}
//                             >
//                                 <option value="">All Status</option>
//                                 <option value="Pending">Pending</option>
//                                 <option value="Complete">Complete</option>
//                                 <option value="In Progress">In Progress</option>
//                                 <option value="Cancelled">Cancelled</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium">Customer Email</label>
//                             <input
//                                 type="text"
//                                 className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                                 placeholder="Email"
//                                 value={customerFilter}
//                                 onChange={(e) => setCustomerFilter(e.target.value)}
//                             />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Orders Table */}
//                 <div className="bg-white shadow-md rounded-lg p-4 mt-4">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-lg font-semibold">Today's Orders</h2>

//                         <div className="flex space-x-4">
//                             {/* Search Bar on the Right */}
//                             <input
//                                 type="search"
//                                 className="border px-2 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                                 placeholder="Search..."
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />

//                             {/* Limit Dropdown */}
//                             <select
//                                 className="border px-3 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                                 value={limit}
//                                 onChange={(e) => setLimit(Number(e.target.value))}
//                             >
//                                 <option value={5}>5</option>
//                                 <option value={10}>10</option>
//                                 <option value={20}>20</option>
//                                 <option value={50}>50</option>
//                             </select>
//                         </div>
//                     </div>

//                     {/* Table Component */}
//                     <div>
//                         <Table isOrderScroll={isOrderScroll} data={filteredOrders} />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AllOrders;

import React, { useEffect, useMemo, useState } from "react";
import Table from "../../../components/Table";
// import todayOrdersData from "../../../../data/allOrders.json";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../../redux/slices/Dashboard/Order_Config/orderStatusSlice";
import { all } from "axios";

const AllOrders = () => {
  // const [orders, setOrders] = useState(todayOrdersData);
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(10);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [customerFilter, setCustomerFilter] = useState("");
  const [finalData, setFinalData] = useState([])

  const isOrderScroll = true;

  const dispatch = useDispatch();

  const { allOrders, loading: orderLoading, error } = useSelector((state) => state.orderStatus);

  const flattenOrders = (orders) => {
    const result = [];

    orders.forEach((order) => {
      order.products.forEach((item) => {
        result.push({
          id: order._id,
          orderCode: order.orderCode,
          userEmail: order.userEmail,
          billingDetail: order.billingDetail,
          shippingDetail: order.shippingDetail,
          paymentMethod: order.paymentMethod,
          orderStatus: item.orderStatus, // use product-specific status
          amount: order.amount,
          shippingFees: order.shippingFees,
          productName: item.product.name,
          skuCode: item.product.skuCode,
          image: item.product.thumbnail,
          quantity: item.quantity,
          createdAt: order.createdAt,
          updatedAt: order.updatedAt,
        });
      });
    });

    return result;
  };

  useEffect(() => {
    setFinalData(flattenOrders(allOrders))
  }, [allOrders])


  // Transform orders data to include product names at the top level
  const transformOrdersData = (orders) => {
    return orders.map((order) => {
      const productNames = order.products
        .map((product) => product.product?.name)
        .filter((name) => name)
        .join(", ");

      const quantity = order.products
        .map((product) => product?.quantity)
        .filter((quantity) => quantity)
        .join(", ");

      return {
        ...order,
        productNames, // Add product names at the top level
        quantity, // Add quantity at the top level
        amount: parseFloat(order.amount).toFixed(2),
      };
    });
  };



  // Handle search functionality
  // const filteredOrders = transformOrdersData(finalData)
  const filteredOrders = finalData
    .filter(
      (order) =>
        order.amount.toString().includes(searchTerm.toLowerCase()) || // Convert number to string
        order.shippingFees.toString().includes(searchTerm.toLowerCase()) ||
        order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.billingDetail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shippingDetail.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((order) => {
      const orderDate = new Date(order.createdAt);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      if (from && isNaN(from.getTime())) return false;
      if (to && isNaN(to.getTime())) return false;
      if (isNaN(orderDate.getTime())) return false;

      if (from && to) return orderDate >= from && orderDate <= to;
      if (from) return orderDate >= from;
      if (to) return orderDate <= to;

      return true;
    })
    .filter((order) => {
      if (statusFilter) {
        return order.orderStatus.toLowerCase() === statusFilter.toLowerCase();
      }
      return true;
    })
    .filter((order) => {
      if (customerFilter) {
        return (
          (order.userEmail &&
            order.userEmail
              .toLowerCase()
              .includes(customerFilter.toLowerCase())) ||
          (order.userMobile && order.userMobile.includes(customerFilter))
        );
      }
      return true;
    })
    .slice(0, limit);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  if (orderLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 custom-container">
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-orange-500 text-white px-6 py-3 shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold">Total Orders</h1>
        </header>

        {/* Filters Section */}
        <div className="bg-white shadow-md rounded-lg p-4 mt-4 mx-3">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium">From Date</label>
              <input
                type="date"
                className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">To Date</label>
              <input
                type="date"
                className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Status Types</label>
              <select
                className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Process">Process</option>
                <option value="Dispatch">Dispatch</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium">
                Customer Email
              </label>
              <input
                type="text"
                className="border px-2 py-1.5 w-full mt-1 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Email"
                value={customerFilter}
                onChange={(e) => setCustomerFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white shadow-md rounded-lg p-4 mt-4 mx-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Today's Orders</h2>

            <div className="flex space-x-4">
              {/* Search Bar on the Right */}
              <input
                type="search"
                className="border px-2 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Limit Dropdown */}
              <select
                className="border px-3 border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                value={limit}
                onChange={(e) => setLimit(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>

          {/* Table Component */}
          <div>
            <Table isOrderScroll={isOrderScroll} data={filteredOrders} onEye={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOrders;