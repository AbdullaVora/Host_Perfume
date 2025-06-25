import React, { useEffect, useState } from "react";
import CouponModel from "../../../components/Banner_config/Coupen/CouponModel";
import couponData from "../../../../data/coupon.json";
import Table from "../../../components/Table";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCoupon,
  fetchCoupons,
  updateCoupon,
} from "../../../redux/slices/Dashboard/Banner_Config/couponSlice";
import { fetchSubAdmins } from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { getUsers } from "../../../redux/slices/auth/userSlice";

const Coupon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EditData, setEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [canEdit, setCanEdit] = useState(true);
  const [canDelete, setCanDelete] = useState(true);
  const [canCreate, setCanCreate] = useState(true);
  const [canActive, setCanActive] = useState(true);

  const [userId, setUserId] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = isModalOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isModalOpen]);

  useEffect(() => {
    dispatch(fetchCoupons());
    dispatch(fetchSubAdmins());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem("AdminId");
    setUserId(userId);
  }, []);

  const {
    coupons,
    loading: CouponLoading,
    error,
  } = useSelector((state) => state.coupons);

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
      console.log(currentSubAdmin);
      if (currentSubAdmin) {
        const permissions = currentSubAdmin.permissions?.coupon;
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

  // console.log(coupons)

  const onEdit = (id) => {
    const EditData = coupons.find((cat) => cat._id === id);

    if (EditData) {
      setEditData(EditData);
      setIsEdit(true);
      setIsModalOpen(true);
      // console.log("Editing Slider:", EditData);
      // Perform edit operation, such as opening a modal with category details
    } else {
      setIsEdit(false);
      console.log("coupon not found!");
    }
  };

  const onDelete = (id) => {
    dispatch(deleteCoupon(id))
      .then(() => {
        // console.log("Slider deleted successfully!");
        toast.success("Coupon deleted successfully!");
        dispatch(fetchCoupons());
      })
      .catch((error) => {
        console.error("Error deleting coupon:", error);
        toast.error(error.message);
      });
  };

  const onStatus = (id, status) => {
    // console.log("id:", id);
    // console.log("status:", status);

    // Find the category to update
    const updatedCoupon = coupons.find((cat) => cat._id === id);

    if (!updatedCoupon) {
      console.warn("Coupon not found in the list");
      return;
    }

    // Create updated category object with the new status
    const updatedData = { ...updatedCoupon, status };

    // Dispatch the update action
    dispatch(updateCoupon({ id, couponData: updatedData }))
      .then(() => {
        toast.success("Status updated successfully!");
        console.log("Status updated successfully!");

        // Refetch categories to update UI (optional)
        dispatch(fetchCoupons());
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error(error.message);
      });
  };

  if (CouponLoading) {
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
          <h1 className="text-2xl font-bold">Coupon</h1>
        </header>
        <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
          <div className="flex space-x-4">
            {canCreate && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Coupon
              </button>
            )}
          </div>
          <div className="py-3">
            {/* <h2 className="text-xl font-bold mb-2">R  ecent Sliders</h2> */}
            {CouponLoading ? (
              <p>{CouponLoading}</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <Table
                data={coupons}
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
      </div>
      {/* Add Slider Modal */}
      {isModalOpen && (
        <CouponModel
          onClose={() => setIsModalOpen(false)}
          isEdit={isEdit}
          EditData={EditData}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Coupon;
