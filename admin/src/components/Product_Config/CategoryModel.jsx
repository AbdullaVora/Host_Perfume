// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { createCategory, fetchCategories } from "../../redux/slices/Dashboard/Product_Config/categorySlice";

// const CategoryModel = ({ onClose, EditData, isEdit }) => {
//     const dispatch = useDispatch();
//     const { categories } = useSelector((state) => state.categories); // Access categories from Redux store

//     const [categoryName, setCategoryName] = useState("");
//     const [categoryDescription, setCategoryDescription] = useState("");
//     const [parentCategory, setParentCategory] = useState("N/A");

//     // Fetch Categories from Redux when component mounts
//     useEffect(() => {
//         dispatch(fetchCategories());
//     }, [dispatch]);

//     // Filter categories to show only those with parent === "N/A"
//     const parentCategories = categories.filter(cat => cat.parent === "N/A");

//     const handleSubmit = () => {
//         if (!categoryName) {
//             alert("Category Name is required!");
//             return;
//         }

//         const newCategory = {
//             name: categoryName,
//             // description: categoryDescription,
//             parent: parentCategory || "N/A", // Default "N/A" if no parent selected
//         };

//         dispatch(createCategory(newCategory)); // Dispatch Redux action to add category
//         setTimeout(() => {
//             onClose(); // Close modal after submission
//         }, 1000);
//         window.location.reload()
//     };

//     return (
//         <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white p-6 rounded-lg shadow-lg w-[600px] border-t-[6px] border-[#F77F00]"
//             >
//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold text-[#F77F00]">Add New Category</h2>
//                     <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
//                         ✕
//                     </button>
//                 </div>

//                 {/* Category Name */}
//                 <label className="block mb-2 font-medium text-[#0B0F19]">
//                     Category Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                     type="text"
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     placeholder="Enter Category Name"
//                     value={categoryName}
//                     onChange={(e) => setCategoryName(e.target.value)}
//                 />

//                 {/* Category Description */}
//                 <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
//                     Category Description
//                 </label>
//                 <textarea
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     placeholder="Enter Category Description"
//                     value={categoryDescription}
//                     onChange={(e) => setCategoryDescription(e.target.value)}
//                 ></textarea>

//                 {/* Parent Category Dropdown */}
//                 <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
//                     Parent Category
//                 </label>
//                 <select
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     value={parentCategory}
//                     onChange={(e) => setParentCategory(e.target.value)}
//                 >
//                     <option value="" selected>Select Category</option>
//                     {parentCategories.map((category) => (
//                         <option key={category._id} value={category.name}>
//                             {category.name}
//                         </option>
//                     ))}
//                 </select>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end space-x-2 mt-4">
//                     <button
//                         className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                         onClick={onClose}
//                     >
//                         Close
//                     </button>
//                     <button
//                         className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]"
//                         onClick={handleSubmit}
//                     >
//                         Confirm
//                     </button>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default CategoryModel;

// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { createCategory, updateCategory, fetchCategories } from "../../redux/slices/Dashboard/Product_Config/categorySlice"; // Import updateCategory
// import { motion } from "framer-motion";

// const CategoryModel = ({ onClose, EditData, isEdit }) => {
//     const dispatch = useDispatch();
//     const { categories } = useSelector((state) => state.categories); // Access categories from Redux store

//     const [categoryName, setCategoryName] = useState("");
//     const [categoryDescription, setCategoryDescription] = useState("");
//     const [parentCategory, setParentCategory] = useState("N/A");

//     // Fetch categories from Redux when component mounts
//     useEffect(() => {
//         dispatch(fetchCategories());
//     }, [dispatch]);

//     // Set form values when EditData is available
//     useEffect(() => {
//         if (isEdit && EditData) {
//             setCategoryName(EditData.name || "");
//             setCategoryDescription(EditData.description || "");
//             setParentCategory(EditData.parent || "N/A");
//         }
//     }, [isEdit, EditData]);

//     // Filter categories to show only those with parent === "N/A"
//     const parentCategories = categories.filter(cat => cat.parent === "N/A");

//     const handleSubmit = () => {
//         if (!categoryName) {
//             alert("Category Name is required!");
//             return;
//         }

//         const categoryData = {
//             name: categoryName,
//             description: categoryDescription,
//             parent: parentCategory || "N/A", // Default "N/A" if no parent selected
//         };

//         if (isEdit) {
//             // Edit existing category
//             dispatch(updateCategory({ id: EditData._id, updatedData: categoryData }));
//         } else {
//             // Create new category
//             dispatch(createCategory(categoryData));
//         }

//         setTimeout(() => {
//             onClose(); // Close modal after submission
//         }, 1000);
//     };

//     return (
//         <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 exit={{ opacity: 0, scale: 0.9 }}
//                 transition={{ duration: 0.3 }}
//                 className="bg-white p-6 rounded-lg shadow-lg w-[600px] border-t-[6px] border-[#F77F00]"
//             >
//                 {/* Modal Header */}
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold text-[#F77F00]">
//                         {isEdit ? "Edit Category" : "Add New Category"}
//                     </h2>
//                     <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
//                         ✕
//                     </button>
//                 </div>

//                 {/* Category Name */}
//                 <label className="block mb-2 font-medium text-[#0B0F19]">
//                     Category Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                     type="text"
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     placeholder="Enter Category Name"
//                     value={categoryName}
//                     onChange={(e) => setCategoryName(e.target.value)}
//                 />

//                 {/* Category Description */}
//                 <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
//                     Category Description
//                 </label>
//                 <textarea
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     placeholder="Enter Category Description"
//                     value={categoryDescription}
//                     onChange={(e) => setCategoryDescription(e.target.value)}
//                 ></textarea>

//                 {/* Parent Category Dropdown */}
//                 <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
//                     Parent Category
//                 </label>
//                 <select
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     value={parentCategory}
//                     onChange={(e) => setParentCategory(e.target.value)}
//                 >
//                     <option value="N/A">No Parent</option>
//                     {parentCategories.map((category) => (
//                         <option key={category._id} value={category.name}>
//                             {category.name}
//                         </option>
//                     ))}
//                 </select>

//                 {/* Action Buttons */}
//                 <div className="flex justify-end space-x-2 mt-4">
//                     <button
//                         className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
//                         onClick={onClose}
//                     >
//                         Close
//                     </button>
//                     <button
//                         className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]"
//                         onClick={handleSubmit}
//                     >
//                         {isEdit ? "Update" : "Confirm"}
//                     </button>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default CategoryModel;




import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, updateCategory, fetchCategories } from "../../redux/slices/Dashboard/Product_Config/categorySlice";
import { motion } from "framer-motion";

const CategoryModel = ({ onClose, EditData, isEdit }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);

    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [parentCategory, setParentCategory] = useState("N/A");

    // // Fetch categories from Redux when component mounts
    // useEffect(() => {
    //     dispatch(fetchCategories());
    // }, [dispatch]);

    useEffect(() => {
        if (!categories.length) { // Fetch only if variants are empty
            dispatch(fetchCategories());
        }
    }, [dispatch, categories]);


    // Set form values when EditData is available
    useEffect(() => {
        if (isEdit && EditData) {
            setCategoryName(EditData.name || "");
            setCategoryDescription(EditData.description || "");
            setParentCategory(EditData.parent || "N/A");
        }
    }, [isEdit, EditData]);

    // Filter to only show top-level categories (parent === "N/A") as potential parents
    const parentCategories = categories.filter(cat =>
        cat.parent === "N/A" &&
        !(isEdit && EditData && EditData._id === cat._id)
    );

    const handleSubmit = () => {
        if (!categoryName) {
            alert("Category Name is required!");
            return;
        }

        const categoryData = {
            name: categoryName,
            description: categoryDescription,
            parent: parentCategory || "N/A", // Default "N/A" if no parent selected
        };

        if (isEdit && EditData) {
            // Edit existing category
            dispatch(updateCategory({ id: EditData._id, updatedData: categoryData }))
                .then(() => {
                    // Only close after successful update
                    dispatch(fetchCategories());
                    onClose();
                })
                .catch(err => {
                    console.error("Error updating category:", err);
                    alert("Failed to update category. Please try again.");
                });
        } else {
            // Create new category
            dispatch(createCategory(categoryData))
                .then(() => {
                    // Only close after successful creation
                    dispatch(fetchCategories());
                    onClose();
                })
                .catch(err => {
                    console.error("Error creating category:", err);
                    alert("Failed to create category. Please try again.");
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
                        {isEdit ? "Edit Category" : "Add New Category"}
                    </h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
                        ✕
                    </button>
                </div>

                {/* Category Name */}
                <label className="block mb-2 font-medium text-[#0B0F19]">
                    Category Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    placeholder="Enter Category Name"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />

                {/* Category Description */}
                <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
                    Category Description
                </label>
                <textarea
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    placeholder="Enter Category Description"
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                ></textarea>

                {/* Parent Category Dropdown */}
                <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
                    Parent Category
                </label>
                <select
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    value={parentCategory}
                    onChange={(e) => setParentCategory(e.target.value)}
                >
                    <option value="N/A">No Parent</option>
                    {parentCategories.map((category) => (
                        <option key={category._id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>

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
        </div>
    );
};

export default CategoryModel;