import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createPaymentMethod, fetchPaymentMethods, updatePaymentMethod } from "../../redux/slices/Dashboard/Website_Config/paymentMethodSlice";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

const PaymentModel = ({ onClose, isEdit, EditData }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentMode, setPaymentMode] = useState("test");
  const [testKey, setTestKey] = useState("");
  const [liveKey, setLiveKey] = useState("");

  const dispatch = useDispatch()

  // Set form values when EditData is available
  useEffect(() => {
    if (isEdit && EditData) {
      setPaymentMethod(EditData.paymentMethod || "");
      setPaymentMode(EditData.paymentMode || "");
      setTestKey(EditData.testKey || "");
      setLiveKey(EditData.liveKey || "");
    }
  }, [isEdit, EditData]);

  const handleSubmit = () => {

    const paymentData = {
      paymentMethod, paymentMode, testKey, liveKey
    };

    if (isEdit && EditData) {
      dispatch(updatePaymentMethod({ id: EditData._id, updatedData: paymentData }))
        .then(() => {
          toast.success("payment method updated successfully!", {className: "custom-toast"});
          dispatch(fetchPaymentMethods());
          onClose();
        })
        .catch(() => {
          toast.error("Failed to update payment method. Please try again.", {className: "custom-toast"});
        });
    } else {
      dispatch(createPaymentMethod(paymentData))
        .then(() => {
          toast.success("payment method added successfully!", {className: "custom-toast"});
          dispatch(fetchPaymentMethods());
          onClose();
        })
        .catch(() => {
          toast.error("Failed to add payment method. Please try again.", {className: "custom-toast"});
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
          <h2 className="text-xl font-bold text-[#F77F00]">{isEdit ? "Edit" : "Add"} Payment Method</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
            ✕
          </button>
        </div>

        {/* Select Method Name */}
        <label className="block mb-2 font-medium text-[#0B0F19]">Select Method Name<span className="text-red-500">*</span></label>
        <select
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">Select a method</option>
          <option value="Cash On delivery">Cash On delivery</option>
          <option value="Credit">Credit/Debit</option>
          <option value="payTM">PayTM</option>
          <option value="paypal">PayPal</option>
          <option value="stripe">Stripe</option>
          <option value="razorpay">Razorpay</option>
        </select>

        {/* Payment Method Mode */}
        <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Payment Method Mode<span className="text-red-500">*</span></label>
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="radio"
              value="test"
              checked={paymentMode === "test"}
              onChange={() => setPaymentMode("test")}
            /> Test
          </label>
          <label>
            <input
              type="radio"
              value="live"
              checked={paymentMode === "live"}
              onChange={() => setPaymentMode("live")}
            /> Live
          </label>
        </div>

        {/* Payment Method Test Key */}
        <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Payment Method Test Key<span className="text-red-500">*</span></label>
        <input
          type="text"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
          placeholder="Enter test key"
          value={testKey}
          onChange={(e) => setTestKey(e.target.value)}
        />

        {/* Payment Method Live Key */}
        <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Payment Method Live Key<span className="text-red-500">*</span></label>
        <input
          type="text"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
          placeholder="Enter live key"
          value={liveKey}
          onChange={(e) => setLiveKey(e.target.value)}
        />

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={onClose}
          >
            Close
          </button>
          <button onClick={handleSubmit} className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]">
            {isEdit ? 'Update' : 'Confirm'}
          </button>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default PaymentModel;