// import React, { useEffect, useState } from "react";
// import CryptoJS from "crypto-js";
// import {
//   FaHome,
//   FaBox,
//   FaUsers,
//   FaCog,
//   FaChartPie,
//   FaCartArrowDown,
// } from "react-icons/fa";
// import Table from "../../../components/Table";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   deleteUser,
//   getUsers,
//   updateUser,
// } from "../../../redux/slices/auth/userSlice";
// import { fetchOrderStatus } from "../../../redux/slices/Dashboard/Order_Config/orderStatusSlice";
// import { fetchSubAdmins } from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
// import { toast, ToastContainer } from "react-toastify";

// import {
//   LineChart,
//   Line,
//   CartesianGrid,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";

// const Home = () => {
//   const dispatch = useDispatch();
//   const [userId, setUserId] = useState();
//   const [isAdmin, setIsAdmin] = useState(true);
//   const [canDelete, setCanDelete] = useState(true);
//   const [canActive, setCanActive] = useState(true);
//   const { users } = useSelector((state) => state.user);
//   const { list } = useSelector((state) => state.subAdmins);

//   const {
//     orderStatus,
//     loading: orderLoading,
//     error,
//   } = useSelector((state) => state.orderStatus);

//   const transformOrdersData = (orders) => {
//     return orders.map((order) => {
//       const productNames = order.products
//         .map((product) => product.product?.name)
//         .filter((name) => name)
//         .join(", ");

//       // const quantity = order.products
//       //   .map((product) => product?.quantity)
//       //   .filter((quantity) => quantity)
//       //   .join(", ");

//       return {
//         ...order,
//         productNames, // Add product names at the top level
//         // quantity, // Add quantity at the top level
//         // amount: parseFloat(order.amount).toFixed(2),
//       };
//     });
//   };

//   // const filteredData = transformOrdersData(orderStatus);

//   useEffect(() => {
//     dispatch(getUsers());
//     dispatch(fetchOrderStatus());
//     dispatch(fetchSubAdmins());
//   }, [dispatch]);

//   useEffect(() => {
//     const userId = localStorage.getItem("AdminId");
//     setUserId(userId);
//   }, []);

//   const cleanUserId = String(userId).replace(/[^a-zA-Z0-9]/g, ""); // removes ;, spaces, etc.

//   const findUser = users.find((user) => String(user._id) === cleanUserId);
//   //   console.log(findUser);

//   useEffect(() => {
//     if (
//       list &&
//       list.length > 0 &&
//       findUser &&
//       findUser.role !== "super-admin"
//     ) {
//       const currentSubAdmin = list.find((sub) => sub.email === findUser.email);
//       if (currentSubAdmin) {
//         const permissions = currentSubAdmin.permissions?.users_config;
//         // setCanEdit(permissions?.edit ?? false);
//         setCanDelete(permissions?.delete ?? false);
//         setCanActive(permissions?.active ?? false);
//         setIsAdmin(false);
//       }
//     } else if (findUser) {
//       console.log(findUser);
//       // fallback for super-admin or if currentSubAdmin not found
//       // setCanEdit(true);
//       setCanDelete(true);
//       setIsAdmin(true);
//       setCanActive(true);
//     }
//   }, [list, findUser]);

//   // const filteredOrderStatus = orderStatus.map(
//   //   ({ isAction, isOrderStatus, ...rest }) => rest
//   // );

//   const filteredOrderStatus = orderStatus;

//   // const filteredOrderStatus = orderStatus.map(
//   //   ({ isAction, isOrderStatus, ...rest }) => rest
//   // );

//   const onDelete = (id) => {
//     dispatch(deleteUser(id))
//       .then(() => {
//         // console.log("Slider deleted successfully!");
//         toast.success("User deleted successfully!");
//         dispatch(getUsers());
//       })
//       .catch((error) => {
//         console.error("Error deleting user:", error);
//         toast.error(error.message);
//       });
//   };

//   const onStatus = (id, status) => {
//     // console.log("id:", id);
//     // console.log("status:", status);

//     const updatedData = users.find((cat) => cat._id === id);

//     if (!updatedData) {
//       console.warn("Banner not found in the list");
//       return;
//     }

//     // Create updated category object with the new status
//     const updatedUser = { ...updatedData, status };

//     // Dispatch the update action
//     dispatch(updateUser({ id, updatedData: updatedUser }))
//       .then(() => {
//         toast.success("Status updated successfully!");
//         console.log("Status updated successfully!");

//         dispatch(getUsers());
//       })
//       .catch((error) => {
//         console.error("Error updating status:", error);
//         toast.error(error.message);
//       });
//   };

//   const sanitizedUsers = users
//     .filter((user) => user.email !== "admin@gmail.com") // remove admin user
//     .map((user) => {
//       if (!isAdmin) {
//         try {
//           const decryptedPassword = user.password.startsWith("U2FsdGVkX1")
//             ? CryptoJS.AES.decrypt(user.password, "your_secret_key").toString(
//                 CryptoJS.enc.Utf8
//               )
//             : "ENCRYPTION_NOT_DETECTED";

//           return {
//             ...user,
//             password: decryptedPassword || "DECRYPTION_FAILED",
//           };
//         } catch (error) {
//           return {
//             ...user,
//             password: "DECRYPTION_ERROR",
//           };
//         }
//       } else {
//         const { password, ...rest } = user;
//         return rest; // remove password
//       }
//     });

//   // console.log(users)

//   return (
//     <div className="flex bg-gray-100 custom-container">
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
//           <h1 className="text-2xl font-bold">Dashboard</h1>
//           {/* <div className="flex items-center space-x-4">
//             <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold">
//               A
//             </div>
//           </div> */}
//         </header>

//         {/* Dashboard Content */}
//         {/* <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="bg-white px-4 py-5 rounded-xl shadow-md flex items-center space-x-4">
//             <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full">
//               <FaBox size={30} />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold">Total Orders</h2>
//               <p className="text-gray-500 text-lg">
//                 {filteredOrderStatus.length}
//               </p>
//             </div>
//           </div>

//           <div className="bg-white px-4 py-5 rounded-xl shadow-md flex items-center space-x-4">
//             <div className="w-16 h-16 bg-red-500 text-white flex items-center justify-center rounded-full">
//               <FaCartArrowDown size={30} />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold">Total Reports</h2>
//               <p className="text-gray-500 text-lg">15</p>
//             </div>
//           </div>

//           <div className="bg-white px-4 py-5 rounded-xl shadow-md flex items-center space-x-4">
//             <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded-full">
//               <FaUsers size={30} />
//             </div>
//             <div>
//               <h2 className="text-xl font-bold">Users</h2>
//               <p className="text-gray-500 text-lg">{users.length}</p>
//             </div>
//           </div>
//         </div> */}

//         <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Left Column: Cards */}
//           <div className="md:col-span-1 mt-5 space-y-6">
//             <div className="bg-white px-4 py-5 rounded-xl shadow-md flex items-center space-x-4">
//               <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full">
//                 <FaBox size={30} />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold">Total Orders</h2>
//                 <p className="text-gray-500 text-lg">
//                   {filteredOrderStatus.length}
//                 </p>
//               </div>
//             </div>

//             <div className="bg-white px-4 py-5 rounded-xl shadow-md flex items-center space-x-4">
//               <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded-full">
//                 <FaUsers size={30} />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold">Users</h2>
//                 <p className="text-gray-500 text-lg">{users.length}</p>
//               </div>
//             </div>
//             <div className="bg-white px-4 py-5 rounded-xl shadow-md flex items-center space-x-4">
//               <div className="w-16 h-16 bg-red-500 text-white flex items-center justify-center rounded-full">
//                 <FaCartArrowDown size={30} />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold">Total Reports</h2>
//                 <p className="text-gray-500 text-lg">15</p>
//               </div>
//             </div>
//           </div>

//           {/* Right Column: Chart */}
//           <div className="md:col-span-2 bg-white px-6 py-6 rounded-xl shadow-md">
//             <h2 className="text-xl font-bold mb-4">Orders Over Time</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={data}>
//                 <Line
//                   type="monotone"
//                   dataKey="orders"
//                   stroke="#3b82f6"
//                   strokeWidth={2}
//                 />
//                 <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Recent Orders */}
//         <div className="py-3 px-6">
//           <h2 className="text-xl font-bold mb-2">Recent Orders</h2>
//           <Table data={filteredOrderStatus} onEye={true} />
//         </div>

//         {/* Recent Users */}
//         <div className="py-3 px-6">
//           <h2 className="text-xl font-bold mb-2">Recent Users</h2>
//           <Table
//             canDelete={canDelete}
//             canActive={canActive}
//             onDelete={onDelete}
//             onStatus={onStatus}
//             data={sanitizedUsers}
//           />
//         </div>
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import {
  FaHome,
  FaBox,
  FaUsers,
  FaCog,
  FaChartPie,
  FaCartArrowDown,
} from "react-icons/fa";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getUsers,
  updateUser,
} from "../../../redux/slices/auth/userSlice";
import { fetchOrderStatus } from "../../../redux/slices/Dashboard/Order_Config/orderStatusSlice";
import { fetchSubAdmins } from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { toast, ToastContainer } from "react-toastify";

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";

const Home = () => {
  const dispatch = useDispatch();
  const [userId, setUserId] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [canDelete, setCanDelete] = useState(true);
  const [canActive, setCanActive] = useState(true);
  const { users } = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.subAdmins);
  const [cleanUserId, setCleanId] = useState(null);
  const [findUser, setFindUser] = useState({});

  const {
    orderStatus,
    loading: orderLoading,
    error,
  } = useSelector((state) => state.orderStatus);

  console.log("Order Status:", orderStatus);


  const transformOrdersData = (orders) => {
    return orders.flatMap(order =>
      order.products.map(productItem => ({
        _id: productItem._id,
        orderCode: order.orderCode,
        userEmail: order.userEmail,
        productName: productItem.product?.name || 'Unknown Product',
        // quantity: productItem.quantity,
        orderStatus: productItem.orderStatus,              // status of overall order
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        // productOrderStatus: productItem.orderStatus, // status of that specific product
        createdAt: order.createdAt,
        isAction: order.isAction,
        isOrderStatus: order.isOrderStatus,
        status: order.status,
      }))
    );
  };

  // const transformOrderData = (orders) => {
  //   return orders.flatMap(order =>
  //     order.products.map(productItem => ({
  //       // orderId: order._id,
  //       orderCode: order.orderCode,
  //       userEmail: order.userEmail,
  //       productName: productItem.product.name,
  //       // productId: productItem.product._id,
  //       // skuCode: productItem.product.skuCode,
  //       // thumbnail: productItem.product.thumbnail,
  //       // mainImage: productItem.product.main,
  //       // quantity: productItem.quantity,
  //       productOrderStatus: productItem.orderStatus, // status of that specific product
  //       // orderStatus: order.orderStatus,              // status of overall order
  //       createdAt: order.createdAt,
  //       isAction: order.isAction,
  //       isOrderStatus: order.isOrderStatus,
  //       status: order.status,
  //     }))
  //   );
  // };


  useEffect(() => {
    const userId = localStorage.getItem("AdminId");
    setUserId(userId);
    dispatch(getUsers());
    dispatch(fetchOrderStatus());
    dispatch(fetchSubAdmins());
  }, [dispatch]);

  // Add this new useEffect to handle user finding
  useEffect(() => {
    if (userId && users?.length > 0) {
      const cleanUserId = String(userId).replace(/[^a-zA-Z0-9]/g, "");
      setCleanId(cleanUserId);
      console.log("Clean User ID:", cleanUserId);
      console.log("All Users:", users);

      const findUser = users.find((user) => String(user?._id) === cleanUserId);
      console.log("Found User:", findUser);
      setFindUser(findUser);

      // Do something with findUser here
      // Or set it to state if needed
    }
  }, [userId, users]);

  useEffect(() => {
    // Only run if findUser exists
    if (findUser) {
      if (list && list.length > 0 && findUser.role !== "super-admin") {
        const currentSubAdmin = list.find(
          (sub) => sub.email === findUser.email
        );
        console.log(currentSubAdmin);

        if (currentSubAdmin) {
          const permissions = currentSubAdmin.permissions?.users_config;
          setCanDelete(permissions?.delete ?? false);
          setCanActive(permissions?.active ?? false);
          setIsAdmin(false);
        }
      } else {
        // This runs if either:
        // 1. list is empty/undefined OR
        // 2. user is super-admin
        setCanDelete(true);
        setIsAdmin(true);
        setCanActive(true);
      }
    }
  }, [findUser, list]); // Add list to dependencies

  const filteredOrderStatus = transformOrdersData(orderStatus);
  // const filteredOrderStatus = orderStatus;

  console.log("Filtered Order Status:", filteredOrderStatus);

  const onDelete = (id) => {
    dispatch(deleteUser(id))
      .then(() => {
        toast.success("User deleted successfully!");
        dispatch(getUsers());
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error(error.message);
      });
  };

  const onStatus = (id, status) => {
    const updatedData = users.find((cat) => cat._id === id);

    if (!updatedData) {
      console.warn("Banner not found in the list");
      return;
    }

    const updatedUser = { ...updatedData, status };

    dispatch(updateUser({ id, updatedData: updatedUser }))
      .then(() => {
        toast.success("Status updated successfully!");
        dispatch(getUsers());
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error(error.message);
      });
  };

  const sanitizedUsers = users
    .filter((user) => user.email !== "admin@gmail.com")
    .map((user) => {
      // For admin users, show decrypted password
      if (isAdmin) {
        try {
          const decryptedPassword = user.password.startsWith("U2FsdGVkX1")
            ? CryptoJS.AES.decrypt(user.password, "your_secret_key").toString(
              CryptoJS.enc.Utf8
            )
            : "ENCRYPTION_NOT_DETECTED";
          return {
            ...user,
            password: decryptedPassword || "DECRYPTION_FAILED",
          };
        } catch (error) {
          return {
            ...user,
            password: "DECRYPTION_ERROR",
          };
        }
      } else {
        // For non-admin users, hide password
        const { password, ...rest } = user;
        return rest;
      }
    });

  // Prepare data for orders chart (group by date)
  const prepareOrdersData = () => {
    const ordersByDate = {};

    filteredOrderStatus.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString();
      if (!ordersByDate[date]) {
        ordersByDate[date] = 0;
      }
      ordersByDate[date]++;
    });

    return Object.keys(ordersByDate).map((date) => ({
      date,
      orders: ordersByDate[date],
    }));
  };

  // Prepare data for users chart (group by date)
  const prepareUsersData = () => {
    const usersByDate = {};

    sanitizedUsers.forEach((user) => {
      const date = new Date(user.createdAt).toLocaleDateString();
      if (!usersByDate[date]) {
        usersByDate[date] = 0;
      }
      usersByDate[date]++;
    });

    return Object.keys(usersByDate).map((date) => ({
      date,
      users: usersByDate[date],
    }));
  };

  const ordersChartData = prepareOrdersData();
  const usersChartData = prepareUsersData();

  const getTodayOrdersCount = () => {
    const today = new Date().toLocaleDateString();

    return filteredOrderStatus.filter((order) => {
      const orderDate = new Date(order.createdAt).toLocaleDateString();
      return orderDate === today;
    }).length;
  };


  return (
    <div className="flex bg-gray-100 custom-container">
      <div className="flex-1 flex flex-col">
        <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </header>

        <div className="py-4 px-3 flex flex-col gap-6">
          {/* Row 1: Stat Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white px-4 py-5 rounded-xl shadow-md flex h-28 items-center space-x-4">
              <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full">
                <FaBox size={30} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Total Orders</h2>
                <p className="text-gray-500 text-lg">
                  {filteredOrderStatus.length}
                </p>
              </div>
            </div>

            <div className="bg-white px-4 py-5 h-28 rounded-xl shadow-md flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-500 text-white flex items-center justify-center rounded-full">
                <FaUsers size={30} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Users</h2>
                <p className="text-gray-500 text-lg">{users.length}</p>
              </div>
            </div>

            <div className="bg-white px-4 py-5 h-28 rounded-xl shadow-md flex items-center space-x-4">
              <div className="w-16 h-16 bg-red-500 text-white flex items-center justify-center rounded-full">
                <FaCartArrowDown size={30} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Today Orders</h2>
                <p className="text-gray-500 text-lg">{getTodayOrdersCount()}</p>
              </div>
            </div>
          </div>

          {/* Row 2: Charts Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Orders Chart */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4">Orders Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={ordersChartData}>
                  <Line
                    type="monotone"
                    dataKey="orders"
                    stroke="#3b82f6"
                    strokeWidth={2}
                  />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Users Chart */}
            <div className="bg-white px-6 py-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4">User Registers Over Time</h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={usersChartData}>
                  <Bar dataKey="users" fill="#10b981" radius={[4, 4, 0, 0]} />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="py-4 px-3">
          <h2 className="text-xl font-bold mb-2">Recent Orders</h2>
          <Table data={filteredOrderStatus} onEye={true} />
        </div>

        {/* Recent Users */}
        <div className="py-4 px-3">
          <h2 className="text-xl font-bold mb-2">Recent Users</h2>
          <Table
            canDelete={canDelete}
            canActive={canActive}
            onDelete={onDelete}
            onStatus={onStatus}
            data={sanitizedUsers}
          />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;