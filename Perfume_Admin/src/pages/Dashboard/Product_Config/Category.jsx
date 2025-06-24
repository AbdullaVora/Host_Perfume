import React, { useEffect, useState } from "react";
import categoryData from "../../../../data/category.json";
import Table from "../../../components/Table";
import CategoryModel from "../../../components/Product_Config/CategoryModel";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCategory,
  fetchCategories,
  updateCategory,
} from "../../../redux/slices/Dashboard/Product_Config/categorySlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchSubAdmins } from "../../../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { getUsers } from "../../../redux/slices/auth/userSlice";

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [EditData, setEditData] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [canEdit, setCanEdit] = useState(true);
  const [canDelete, setCanDelete] = useState(true);
  const [canCreate, setCanCreate] = useState(true);
  const [canActive, setCanActive] = useState(true);
  const [userId, setUserId] = useState();
  const dispatch = useDispatch();

  // Get categories from Redux store
  const {
    categories,
    loading: categoryLoading,
    error,
  } = useSelector((state) => state.categories);
  console.log(categories);

  // Fetch categories when component mounts
  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchSubAdmins());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    const userId = localStorage.getItem("AdminId");
    setUserId(userId);
  }, []);

  const onEdit = (id) => {
    const EditData = categories.find((cat) => cat._id === id);

    if (EditData) {
      setEditData(EditData);
      setIsEdit(true);
      setIsModalOpen(true);
      console.log("Editing category:", EditData);
      // Perform edit operation, such as opening a modal with category details
    } else {
      setIsEdit(false);
      console.log("Category not found!");
    }
  };

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
        const permissions = currentSubAdmin.permissions?.category;
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

  const onDelete = (id) => {
    dispatch(deleteCategory(id))
      .then(() => {
        toast.success("Category deleted successfully!");
        console.log("Category deleted successfully!");
        dispatch(fetchCategories());
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Error deleting category:", error);
      });
  };

  const onStatus = (id, status) => {
    // console.log("id:", id);
    // console.log("status:", status);

    // Find the category to update
    const updatedCategory = categories.find((cat) => cat._id === id);

    if (!updatedCategory) {
      console.warn("Category not found in the list");
      return;
    }

    // Create updated category object with the new status
    const updatedData = { ...updatedCategory, status };

    // Dispatch the update action
    dispatch(updateCategory({ id, updatedData }))
      .then(() => {
        toast.success("Status updated successfully!");
        console.log("Status updated successfully!");

        // Refetch categories to update UI (optional)
        dispatch(fetchCategories());
      })
      .catch((error) => {
        toast.error(error.message);
        console.error("Error updating status:", error);
      });
  };

  if (categoryLoading) {
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
          <h1 className="text-2xl font-bold">Category</h1>
        </header>
        <div className="box bg-white p-4 mx-3 mt-5 rounded shadow">
          <div className="flex space-x-4">
            {canCreate && (
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => setIsModalOpen(true)}
              >
                + Add Category
              </button>
            )}
            {/* <button
                            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                        >
                            ☰ Sort Category
                        </button> */}
          </div>
          <div className="py-3">
            {categoryLoading ? (
              <p>{categoryLoading}</p>
            ) : error ? (
              <p className="text-red-500">Error: {error}</p>
            ) : (
              <Table
                data={categories}
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
          <CategoryModel
            onClose={() => setIsModalOpen(false)}
            EditData={EditData}
            isEdit={isEdit}
          />
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Category;
