import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSubAdmin,
  fetchSubAdmins,
  updateSubAdmin,
} from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import Table from "../../../components/Table";
import { toast, ToastContainer } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const AllSubAdmins = () => {
  const {
    list,
    loading: Loading,
    error,
  } = useSelector((state) => state.subAdmins);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [EditData, setEditData] = useState([]);
  const [isEdit, setIsEdit] = useState();

  useEffect(() => {
    dispatch(fetchSubAdmins());
  }, []);

  const onEdit = (id) => {
    const EditData = list.find((cat) => cat._id === id);
    if (EditData) {
      setIsEdit(true);
      setEditData(EditData);
      navigate("/addSubAdmin", { state: { EditData } });
    } else {
      setIsEdit(false);
      console.log("Data not found");
    }
  };

  const onDelete = (id) => {
    dispatch(deleteSubAdmin(id))
      .then(() => {
        // console.log("Slider deleted successfully!");
        toast.success("Sub Admin deleted successfully!");
        dispatch(fetchSubAdmins());
      })
      .catch((error) => {
        console.error("Error deleting Sub Admin:", error);
        toast.error(error.message);
      });
  };

  const onStatus = (id, status) => {
    // console.log("id:", id);
    // console.log("status:", status);

    // Find the category to update
    const updatedSubAdmin = list.find((cat) => cat._id === id);

    if (!updatedSubAdmin) {
      console.warn("Sub Admin not found in the list");
      return;
    }

    // Create updated category object with the new status
    const updatedData = { ...updatedSubAdmin, status };

    // Dispatch the update action
    dispatch(updateSubAdmin({ id, updatedData }))
      .then(() => {
        toast.success("Status updated successfully!");
        console.log("Status updated successfully!");

        // Refetch categories to update UI (optional)
        dispatch(fetchSubAdmins());
      })
      .catch((error) => {
        console.error("Error updating status:", error);
        toast.error(error.message);
      });
  };

  if (Loading) {
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
          <h1 className="text-2xl font-bold">All Sub Admins</h1>
        </header>
        <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
          <div className="flex space-x-4">
            <Link to="/addSubAdmin">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                + Add Sub Admin
              </button>
            </Link>
          </div>
          <div className="py-3">
            {Loading ? (
              <p>{Loading}</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <Table
                data={list}
                canEdit={true}
                canDelete={true}
                onEdit={onEdit}
                onDelete={onDelete}
                onStatus={onStatus}
              />
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AllSubAdmins;
