import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrderStatus, fetchOrderStatus, updateOrderStatus } from "../../redux/slices/Dashboard/Order_Config/orderStatusSlice";

const OrderStatusModel = ({ onClose, isEdit, EditData }) => {
    const dispatch = useDispatch();

    const [orderStatusCode, setorderStatusCode] = useState("");
    const [orderStatusName, setorderStatusName] = useState("");
    const [orderStatus, setorderStatus] = useState("");
    const [updateDate, setUpdateDate] = useState("");

    const statusOptions = ["Pending", "Process", "Dispatch", "Delivered", "Cancelled"];

    // // Fetch Order Statuses when component mounts
    // useEffect(() => {
    //     dispatch(fetchOrderStatus());
    // }, [dispatch]);\

    // useEffect(() => {
    //     if()
    //     dispatch(fetchOrderStatus());
    // }, [dispatch]);

    // console.log(EditData)

    // Set form values when EditData is available
    useEffect(() => {
        if (isEdit && EditData) {
            console.log(EditData)

            setorderStatusCode(EditData.orderId || "");
            setorderStatusName(EditData.orderName || "");

            // Convert to title case to match dropdown options
            const status = EditData.orderStatus
                ? EditData.orderStatus.charAt(0).toUpperCase() + EditData.orderStatus.slice(1).toLowerCase()
                : "";
            setorderStatus(status);

            // Format the date to YYYY-MM-DD
            if (EditData.updatedAt) {
                const formattedDate = new Date(EditData.updatedAt).toISOString().split("T")[0];
                setUpdateDate(formattedDate);
            }
        }
    }, [isEdit, EditData]);


    const handleSubmit = () => {
        if (!orderStatusCode?.trim() || !orderStatus) {
            toast.error("All fields are required!");
            return;
        }

        const orderData = {
            orderId: orderStatusCode.trim(),
            // orderName: orderStatusName.trim(),
            orderStatus,
            updateDate,
        };

        console.log(EditData)

        if (isEdit && EditData) {
            // Update existing order status
            dispatch(updateOrderStatus({ id: EditData.orderId, updatedData: orderData }))
                .then(() => {
                    toast.success("Order status updated successfully!");
                    dispatch(fetchOrderStatus());
                    onClose();
                })
                .catch(() => {
                    toast.error("Failed to update order status. Please try again.");
                });
        } else {
            // Create new order status
            dispatch(createOrderStatus(orderData))
                .then(() => {
                    toast.success("Order status added successfully!");
                    dispatch(fetchOrderStatus());
                    onClose();
                })
                .catch(() => {
                    toast.error("Failed to add order status. Please try again.");
                });
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-lg w-[600px] border-t-[6px] border-[#F77F00]"
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#F77F00]">
                        {isEdit ? "Edit Order Status" : "Add Order Status"}
                    </h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
                        ✕
                    </button>
                </div>

                {/* orderStatus Code */}
                <label className="block mb-2 font-medium text-[#0B0F19]">
                    Order Status Code <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    placeholder="Enter Order Status Code"
                    value={orderStatusCode}
                    onChange={(e) => setorderStatusCode(e.target.value)}
                />

                {/* orderStatus Name */}
                {/* <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
                    Order Status Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    placeholder="Enter Order Status Name"
                    value={orderStatusName}
                    onChange={(e) => setorderStatusName(e.target.value)}
                /> */}

                {/* orderStatus Status (Dropdown) */}
                <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
                    Order Status <span className="text-red-500">*</span>
                </label>
                <select
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    value={orderStatus || ""} // Make sure it's not undefined or null
                    onChange={(e) => setorderStatus(e.target.value)}
                >
                    <option value="">Select Status</option>
                    {statusOptions.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                    ))}
                </select>
                {/* Update Date */}
                <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
                    Update Date <span className="text-red-500">*</span>
                </label>
                <input
                    type="date"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    value={updateDate}
                    onChange={(e) => setUpdateDate(e.target.value)}
                />

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                        onClick={onClose}
                    >
                        Close
                    </button>
                    <button
                        className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]"
                        onClick={handleSubmit}
                    >
                        {isEdit ? "Update" : "Confirm"}
                    </button>
                </div>
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default OrderStatusModel;
