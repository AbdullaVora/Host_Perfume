import React, { useEffect, useState } from "react";
import PaymentModal from "../../../components/Website_Config/PaymentModel";
import Table from "../../../components/Table";
import paymentData from "../../../../data/payment.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deletePaymentMethod,
  fetchPaymentMethods,
  updatePaymentMethod,
} from "../../../redux/slices/Dashboard/Website_Config/paymentMethodSlice";
import { fetchSubAdmins } from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { getUsers } from "../../../redux/slices/auth/userSlice";

const PaymentMethod = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [EditData, setEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [canEdit, setCanEdit] = useState(true);
  const [canDelete, setCanDelete] = useState(true);
  const [canCreate, setCanCreate] = useState(true);
  const [canActive, setCanActive] = useState(true);
  const [userId, setUserId] = useState();

  const dispatch = useDispatch();

  const {
    paymentMethods,
    loading: paymentLoading,
    error,
  } = useSelector((state) => state.paymentMethods);
  // console.log(paymentMethods)

  useEffect(() => {
    dispatch(fetchPaymentMethods());
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
      //   console.log(currentSubAdmin);
      if (currentSubAdmin) {
        const permissions = currentSubAdmin.permissions?.payments_methods;
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
    const EditData = paymentMethods.find((cat) => cat._id === id);

    if (EditData) {
      setEditData(EditData);
      setIsEdit(true);
      setIsModalOpen(true);
    } else {
      setIsEdit(false);
      console.log("payment methods not found!");
    }
  };

  const onDelete = (id) => {
    dispatch(deletePaymentMethod(id))
      .then(() => {
        toast.success("payment methods deleted successfully!");
        console.log("payment methods deleted successfully!");
        dispatch(fetchPaymentMethods());
      })
      .catch((error) => {
        console.error("Error deleting payment methods:", error);
        toast.error(error.message);
      });
  };

  const onStatus = (id, status) => {
    // console.log("id:", id);
    // console.log("status:", status);

    // Find the category to update
    const updatedPaymentMethods = paymentMethods.find((cat) => cat._id === id);

    if (!updatedPaymentMethods) {
      console.warn("payment methods not found in the list");
      return;
    }

    // Create updated category object with the new status
    const updatedData = { ...updatedPaymentMethods, status };

    // Dispatch the update action
    dispatch(updatePaymentMethod({ id, updatedData }))
      .then(() => {
        toast.success("Status updated successfully!");
        console.log("Status updated successfully!");

        // Refetch categories to update UI (optional)
        dispatch(fetchPaymentMethods());
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error(error.message);
      });
  };

  if (paymentLoading) {
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
          <h1 className="text-2xl font-bold">Payment Methods</h1>
        </header>
        <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
          <div className="flex space-x-4">
            {canCreate && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Payment Method
              </button>
            )}
            {/* <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ☰ Sort Payment Method
                        </button> */}
          </div>
          <div className="py-3">
            {paymentLoading ? (
              <p>{paymentLoading}</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <Table
                data={paymentMethods}
                canEdit={canEdit}
                canDelete={canDelete}
                canActive={canActive}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatus={onStatus}
              />
            )}
          </div>
        </div>
        {/* Add Slider Modal */}
        {isModalOpen && (
          <PaymentModal
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

export default PaymentMethod;
