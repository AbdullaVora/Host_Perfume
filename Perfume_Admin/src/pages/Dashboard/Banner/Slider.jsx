import React, { useState, useEffect } from "react";
import Table from "../../../components/Table";
import SortModal from "../../../components/Banner_config/Slider/SortModal";
import Model from "../../../components/Banner_config/Slider/SliderModel";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  deleteSlider,
  fetchSliders,
  updateSlider,
} from "../../../redux/slices/Dashboard/Banner_Config/sliderSlice";
import { fetchSubAdmins } from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { getUsers } from "../../../redux/slices/auth/userSlice";

const Slider = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [EditData, setEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [canEdit, setCanEdit] = useState(true);
  const [canDelete, setCanDelete] = useState(true);
  const [canCreate, setCanCreate] = useState(true);
  const [canActive, setCanActive] = useState(true);
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow =
      isModalOpen || isSortModalOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isModalOpen, isSortModalOpen]);

  useEffect(() => {
    dispatch(fetchSliders());
    dispatch(fetchSubAdmins());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem("AdminId");
    setUserId(userId);
  }, []);

  const {
    sliders,
    loading: sliderLoading,
    error,
  } = useSelector((state) => state.sliders);
  // console.log(sliders)

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
        const permissions = currentSubAdmin.permissions?.slider_config;
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
    const EditData = sliders.find((cat) => cat._id === id);

    if (EditData) {
      setEditData(EditData);
      setIsEdit(true);
      setIsModalOpen(true);
      // console.log("Editing Slider:", EditData);
      // Perform edit operation, such as opening a modal with category details
    } else {
      setIsEdit(false);
      console.log("Slider not found!");
    }
  };

  const onDelete = (id) => {
    dispatch(deleteSlider(id))
      .then(() => {
        console.log("Slider deleted successfully!");
        dispatch(fetchCategories());
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  const onStatus = (id, status) => {
    // console.log("id:", id);
    // console.log("status:", status);

    // Find the category to update
    const updatedSlider = sliders.find((cat) => cat._id === id);

    if (!updatedSlider) {
      console.warn("Slider not found in the list");
      return;
    }

    // Create updated category object with the new status
    const updatedData = { ...updatedSlider, status };

    // Dispatch the update action
    dispatch(updateSlider({ id, sliderData: updatedData }))
      .then(() => {
        toast.update("Status updated successfully!");
        console.log("Status updated successfully!");

        // Refetch categories to update UI (optional)
        dispatch(fetchSliders());
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  if (sliderLoading) {
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
          <h1 className="text-2xl font-bold">Slider</h1>
        </header>
        <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
          <div className="flex space-x-4">
            {canCreate && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Slider
              </button>
            )}
            {/* <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                            onClick={() => setIsSortModalOpen(true)}
                        >
                            ☰ Sort Slider
                        </button> */}
          </div>
          <div className="py-3">
            {sliderLoading ? (
              <p>{sliderLoading}</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <Table
                canEdit={canEdit}
                canDelete={canDelete}
                canActive={canActive}
                data={sliders}
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
        <Model
          onClose={() => setIsModalOpen(false)}
          isEdit={isEdit}
          EditData={EditData}
        />
      )}

      {/* Sorting Modal */}
      {isSortModalOpen && (
        <SortModal
          sliders={sliders}
          onClose={() => setIsSortModalOpen(false)}
          onConfirm={(newList) => {
            setIsSortModalOpen(false);
          }}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Slider;
