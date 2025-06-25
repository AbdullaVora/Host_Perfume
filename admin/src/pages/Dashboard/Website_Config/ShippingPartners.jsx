import React, { useEffect, useState } from "react";
import shippingPartnersData from "../../../../data/shippingPartner.json";
import Table from "../../../components/Table";
import ShippingpartnersModel from "../../../components/Website_Config/ShippingPartnersModel";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteShippingPartner,
  fetchShippingPartners,
  updateShippingPartner,
} from "../../../redux/slices/Dashboard/Website_Config/shippingPartnerSlice";
import { fetchSubAdmins } from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { getUsers } from "../../../redux/slices/auth/userSlice";
const ShippingPartners = () => {
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
    shippingPartners,
    loading: shippingLoading,
    error,
  } = useSelector((state) => state.shippingPartners);
  // console.log(paymentMethods)

  useEffect(() => {
    dispatch(fetchShippingPartners());
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
        const permissions = currentSubAdmin.permissions?.shipping_partners;
        setCanCreate(permissions?.create ?? false);
        setCanEdit(permissions?.edit ?? false);
        setCanDelete(permissions?.delete ?? false);
        setCanActive(permissions?.active ?? false);
      }
    } else if (findUser) {
      // fallback for super-admin or if currentSubAdmin not found
      setCanEdit(true);
      setCanDelete(true);
      setCanActive(true)
    }
  }, [list, findUser]);

  const onEdit = (id) => {
    const EditData = shippingPartners.find((cat) => cat._id === id);

    if (EditData) {
      setEditData(EditData);
      setIsEdit(true);
      setIsModalOpen(true);
    } else {
      setIsEdit(false);
      console.log("shipping partners not found!");
    }
  };

  const onDelete = (id) => {
    dispatch(deleteShippingPartner(id))
      .then(() => {
        toast.success("shipping partners deleted successfully!");
        console.log("shipping partners deleted successfully!");
        dispatch(fetchShippingPartners());
      })
      .catch((error) => {
        console.error("Error deleting shipping partners:", error);
        toast.error(error.message);
      });
  };

  const onStatus = (id, status) => {
    // console.log("id:", id);
    // console.log("status:", status);

    const updatedShippingPartners = shippingPartners.find(
      (cat) => cat._id === id
    );

    if (!updatedShippingPartners) {
      console.warn("shipping partners not found in the list");
      return;
    }

    const updatedData = { ...updatedShippingPartners, status };

    // Dispatch the update action
    dispatch(updateShippingPartner({ id, updatedData }))
      .then(() => {
        toast.success("shipping partners successfully!");
        console.log("shipping partners successfully!");

        dispatch(fetchShippingPartners());
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error(error.message);
      });
  };

  if (shippingLoading) {
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
          <h1 className="text-2xl font-bold">Shipping Partners</h1>
        </header>
        <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
          <div className="flex space-x-4">
            {canCreate && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Shipping Partner
              </button>
            )}
            {/* <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ☰ Sort Payment Method
                        </button> */}
          </div>
          <div className="py-3">
            {shippingLoading ? (
              <p>{shippingLoading}</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <Table
                data={shippingPartners}
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
        {isModalOpen && (
          <ShippingpartnersModel
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

export default ShippingPartners;
