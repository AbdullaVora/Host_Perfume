import React, { useEffect, useState } from "react";
import orderStatusData from "../../../../data/orderStatus.json";
import Table from "../../../components/Table";
import OrderStatusModel from "../../../components/Order_Config/OrderStatusModel";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteOrderStatus,
  fetchOrderStatus,
  updateOrderStatus,
} from "../../../redux/slices/Dashboard/Order_Config/orderStatusSlice";
import { fetchSubAdmins } from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { getUsers } from "../../../redux/slices/auth/userSlice";

const OrderStatus = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EditData, setEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [canEdit, setCanEdit] = useState(true);
  const [canDelete, setCanDelete] = useState(true);
  const [canCreate, setCanCreate] = useState(true);
  const [canActive, setCanActive] = useState(true);
  const [userId, setUserId] = useState();


  const dispatch = useDispatch();

  // Get orderStatus from Redux store
  const {
    orderStatus,
    loading: orderLoading,
    error,
  } = useSelector((state) => state.orderStatus);
  console.log("order status: ", orderStatus);

  // Transform orders data to include product names at the top level
  const transformOrdersData = (orders) => {
    return orders.map((order) => {
      const productNames = order.products
        .map((product) => product.product?.name)
        .filter((name) => name)
        .join(", ");

      // const quantity = order.products
      //   .map((product) => product?.quantity)
      //   .filter((quantity) => quantity)
      //   .join(", ");

      return {
        ...order,
        productNames, // Add product names at the top level
        // quantity, // Add quantity at the top level
        // amount: parseFloat(order.amount).toFixed(2),
      };
    });
  };

  // const transformOrderData = (orders) => {
  //   console.log(orders)
  //   return orders.flatMap(order =>
  //     order.products.map(productItem => ({
  //       id: productItem._id,
  //       orderCode: order.orderCode,
  //       userEmail: order.userEmail,
  //       productName: productItem.product.name,
  //       // productId: productItem.product._id,
  //       // skuCode: productItem.product.skuCode,
  //       // thumbnail: productItem.product.thumbnail,
  //       // mainImage: productItem.product.main,
  //       quantity: productItem.quantity,
  //       orderStatus: productItem.orderStatus, // status of that specific product
  //       // orderStatus: order.orderStatus,              // status of overall order
  //       createdAt: order.createdAt,
  //       isAction: order.isAction,
  //       isOrderStatus: order.isOrderStatus,
  //       status: order.status,
  //     }))
  //   );
  // };

  const transformOrderData = (orders) => {
    if (!orders || !Array.isArray(orders)) return [];
    
    return orders.flatMap(order => {
      console.log(order);

      if (!order.products || !Array.isArray(order.products)) return [];

      return order.products.map(productItem => {

        const productName = productItem.product?.name || 'Unknown Product';

        return {
          id: productItem.orderId,
          _id: order._id,
          orderCode: order.orderCode,
          image: productItem.product?.thumbnail,
          productName: productName,
          userEmail: order.userEmail,
          quantity: productItem.quantity,
          // paymentMethod: order.paymentMethod,
          // paymentStatus: order.paymentStatus,
          orderStatus: productItem.orderStatus,
          createdAt: order.createdAt,
          isAction: order.isAction,
          isOrderStatus: order.isOrderStatus,
          status: order.status,
        };
      });
    });
  };

  const filteredData = transformOrderData(orderStatus)


  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchOrderStatus());
    dispatch(fetchSubAdmins());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem("AdminId");
    setUserId(userId);
  }, []);

  const { list } = useSelector((state) => state.subAdmins);
  const { users } = useSelector((state) => state.user);

  const cleanUserId = String(userId).replace(/[^a-zA-Z0-9]/g, ""); // removes ;, spaces, etc.

  const findUser = users.find((user) => String(user._id) === cleanUserId);
  //   console.log(findUser);

  useEffect(() => {
    if (
      list &&
      list.length > 0 &&
      findUser &&
      findUser.role !== "super-admin"
    ) {
      const currentSubAdmin = list.find((sub) => sub.email === findUser.email);
      // console.log(currentSubAdmin);
      if (currentSubAdmin) {
        const permissions = currentSubAdmin.permissions?.orders_config;
        setCanCreate(permissions?.create ?? false);
        setCanEdit(permissions?.edit ?? false);
        setCanDelete(permissions?.delete ?? false);
        setCanActive(permissions?.active ?? false);
      }
    } else if (findUser) {
      // fallback for super-admin or if currentSubAdmin not found
      setCanEdit(true);
      setCanDelete(true);
      setCanActive(true);
    }
  }, [list, findUser]);

  const onEdit = (id) => {
    const order = orderStatus; // Get the order object

    console.log('ID:', id);
    console.log('All orders:', order); // This is probably your array of orders

    // First, find which order contains the product with this id
    const targetOrder = order.find(orderItem =>
      orderItem.products && orderItem.products.some(product => product.orderId == id)
    );

    // const orders = orderStatus;
    // const targetId = id;

    // let matchedProduct = null;

    // for (const order of orders) {
    //   for (const productItem of order.products) {
    //     if (productItem._id === targetId || productItem.id === targetId) {
    //       matchedProduct = productItem;
    //       break;
    //     }
    //   }
    //   if (matchedProduct) break; // Exit early if found
    // }

    // if (matchedProduct) {
    //   console.log("Matched product:", matchedProduct);
    // } else {
    //   console.log("Product not found.");
    // }


    if (!targetOrder) {
      console.error('No order found containing product with id:', id);
      return;
    }

    console.log('Found order:', targetOrder);

    // Then find the specific product within that order
    const productData = targetOrder.products.find(product => product.orderId === id);

    // console.log('Product Data:', productData);

    if (!productData) {
      console.error('Product not found with id:', id);
      return;
    }

    const EditData = {
      ...productData,
      orderCode: targetOrder.orderCode
    };
    console.log(EditData)
    if (EditData) {
      setEditData(EditData);
      setIsEdit(true);
      setIsModalOpen(true);
    } else {
      setIsEdit(false);
      console.log("orderStatus not found!");
    }
  };


  // const onEdit = (id) => {
  //   console.log('Editing ID:', id, typeof id); // Log ID and its type

  //   if (!Array.isArray(orderStatus)) {
  //     console.error('orderStatus is not an array');
  //     return;
  //   }

  //   // Enhanced search that handles different ID formats
  //   let foundOrder = null;
  //   let foundProduct = null;

  //   for (const order of orderStatus) {
  //     if (!order.products || !Array.isArray(order.products)) continue;

  //     // Compare both string and number IDs
  //     const product = order.products.find(p =>
  //       String(p.id) === String(id) ||
  //       String(p._id) === String(id)
  //     );

  //     if (product) {
  //       foundOrder = order;
  //       foundProduct = product;
  //       break;
  //     }
  //   }

  //   if (!foundProduct) {
  //     console.error('Product not found. Available products:'),
  //       orderStatus.flatMap(o => o.products?.map(p => ({ id: p.id, _id: p._id })) || []);
  //     return;
  //   }

  //   console.log('Found order:', foundOrder.orderCode);
  //   console.log('Found product:', foundProduct);

  //   const EditData = {
  //     ...foundProduct,
  //     orderCode: foundOrder.orderCode
  //   };

  //   setEditData(EditData);
  //   setIsEdit(true);
  //   setIsModalOpen(true);
  // };

  const onDelete = (id) => {
    dispatch(deleteOrderStatus(id))
      .then(() => {
        toast.success("orderStatus deleted successfully!");
        console.log("orderStatus deleted successfully!");
        dispatch(fetchOrderStatus());
      })
      .catch((error) => {
        console.error("Error deleting orderStatus:", error);
        toast.error(error.message);
      });
  };

  const onStatus = (id, status) => {
    // console.log("id:", id);
    // console.log("status:", status);

    // Find the category to update
    const updatedOrderStatus = orderStatus.find((cat) => cat._id === id);

    if (!updatedOrderStatus) {
      console.warn("orderStatus not found in the list");
      return;
    }

    // Create updated category object with the new status
    const updatedData = { ...updatedOrderStatus, status };

    // Dispatch the update action
    dispatch(updateOrderStatus({ id, updatedData }))
      .then(() => {
        toast.update("Status updated successfully!");
        console.log("Status updated successfully!");

        // Refetch categories to update UI (optional)
        dispatch(fetchOrderStatus());
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error(error.message);
      });
  };

  if (orderLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span class="loader"></span>
      </div>
    );
  }

  return (
    <div className="flex bg-gray-100 custom-container">
      <div className="flex-1 flex flex-col">
        <header className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">Order Status</h1>
        </header>
        <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
          <div className="flex space-x-4">
            {canCreate && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Order Status
              </button>
            )}
            {/* <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ☰ Sort Order Status
                        </button> */}
          </div>
          <div className="py-3">
            {orderLoading ? (
              <p>{orderLoading}</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <Table
                data={filteredData}
                canEdit={canEdit}
                canActive={canActive}
                canDelete={canDelete}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatus={onStatus}
                onEye={true}
              />
            )}
          </div>
        </div>
        {/* Add Slider Modal */}
        {isModalOpen && (
          <OrderStatusModel
            onClose={() => setIsModalOpen(false)}
            isEdit={isEdit}
            EditData={EditData}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default OrderStatus;
