// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { updateBrand, fetchBrands, createBrand } from "../../redux/slices/Dashboard/Product_Config/brandSlice";
// import { motion } from "framer-motion";
// import { fetchCategories } from "../../redux/slices/Dashboard/Product_Config/categorySlice";

// const BrandModel = ({ onClose, EditData, isEdit }) => {
//     const dispatch = useDispatch();

//     const { brands } = useSelector((state) => state.brand);
//     const { categories } = useSelector((state) => state.categories);

//     const [brandName, setbrandName] = useState("");
//     const [brandDescription, setbrandDescription] = useState("");
//     const [parentbrand, setParentbrand] = useState("N/A");

//     // Fetch categories from Redux when component mounts
//     useEffect(() => {
//         dispatch(fetchBrands());
//         dispatch(fetchCategories());
//     }, [dispatch]);

//     // Set form values when EditData is available
//     useEffect(() => {
//         if (isEdit && EditData) {
//             setbrandName(EditData.name || "");
//             setbrandDescription(EditData.description || "");
//             setParentbrand(EditData.parent || "N/A");
//         }
//     }, [isEdit, EditData]);

//     // Filter to only show top-level categories (parent === "N/A") as potential parents
//     const parentCategories = categories.filter(cat =>
//         cat.parent === "N/A" &&
//         !(isEdit && EditData && EditData._id === cat._id)
//     );

//     const handleSubmit = () => {
//         if (!brandName) {
//             alert("brand Name is required!");
//             return;
//         }

//         const brandData = {
//             name: brandName,
//             description: brandDescription,
//             parent: parentbrand || "N/A", // Default "N/A" if no parent selected
//         };

//         if (isEdit && EditData) {
//             // Edit existing brand
//             dispatch(updateBrand({ id: EditData._id, updatedData: brandData }))
//                 .then(() => {
//                     // Only close after successful update
//                     dispatch(fetchBrands());
//                     onClose();
//                 })
//                 .catch(err => {
//                     console.error("Error updating brand:", err);
//                     alert("Failed to update brand. Please try again.");
//                 });
//         } else {
//             // Create new brand
//             dispatch(createBrand(brandData))
//                 .then(() => {
//                     // Only close after successful creation
//                     dispatch(fetchBrands());
//                     dispatch(fetchCategories());
//                     onClose();
//                 })
//                 .catch(err => {
//                     console.error("Error creating brand:", err);
//                     alert("Failed to create brand. Please try again.");
//                 });
//         }
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
//                         {isEdit ? "Edit Brand" : "Add New Brand"}
//                     </h2>
//                     <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
//                         ✕
//                     </button>
//                 </div>

//                 {/* brand Name */}
//                 <label className="block mb-2 font-medium text-[#0B0F19]">
//                     brand Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                     type="text"
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     placeholder="Enter Brand Name"
//                     value={brandName}
//                     onChange={(e) => setbrandName(e.target.value)}
//                 />

//                 {/* brand Description */}
//                 <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
//                     Brand Description
//                 </label>
//                 <textarea
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     placeholder="Enter Brand Description"
//                     value={brandDescription}
//                     onChange={(e) => setbrandDescription(e.target.value)}
//                 ></textarea>

//                 {/* Parent brand Dropdown */}
//                 <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
//                     Parent Brand
//                 </label>
//                 <select
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     value={parentbrand}
//                     onChange={(e) => setParentbrand(e.target.value)}
//                 >
//                     <option value="N/A">No Parent</option>
//                     {parentCategories.map((cat) => (
//                         <option key={cat._id} value={cat.name}>
//                             {cat.name}
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

// export default BrandModel;


import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBrand, fetchBrands, createBrand } from "../../redux/slices/Dashboard/Product_Config/brandSlice";
import { motion } from "framer-motion";
import { fetchCategories } from "../../redux/slices/Dashboard/Product_Config/categorySlice";

const BrandModel = ({ onClose, EditData, isEdit }) => {
    const dispatch = useDispatch();

    const { brands } = useSelector((state) => state.brand);
    const { categories } = useSelector((state) => state.categories);

    const [brandName, setbrandName] = useState("");
    const [brandDescription, setbrandDescription] = useState("");
    const [parentbrand, setParentbrand] = useState("N/A");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // // Fetch categories from Redux when component mounts
    // useEffect(() => {
    //     dispatch(fetchBrands());
    //     dispatch(fetchCategories());
    // }, [dispatch]);

    useEffect(() => {
        if (!brands.length) {
            dispatch(fetchBrands());
            dispatch(fetchCategories());
        }
    }, [dispatch, brands]);

    // Set form values when EditData is available
    useEffect(() => {
        if (isEdit && EditData) {
            if (!EditData._id) {
                console.error("EditData is missing _id");
                onClose();
                return;
            }
            setbrandName(EditData.name || "");
            setbrandDescription(EditData.description || "");
            setParentbrand(EditData.parent || "N/A");
        } else {
            // Reset form when creating new brand
            setbrandName("");
            setbrandDescription("");
            setParentbrand("N/A");
        }
    }, [isEdit, EditData, onClose]);

    // Filter to only show top-level categories (parent === "N/A") as potential parents
    const parentCategories = categories.filter(cat =>
        cat.parent === "N/A" &&
        !(isEdit && EditData && EditData._id === cat._id)
    );

    const handleSubmit = async () => {
        if (!brandName) {
            alert("Brand Name is required!");
            return;
        }

        setIsSubmitting(true);
        const brandData = {
            name: brandName,
            description: brandDescription,
            parent: parentbrand || "N/A",
        };

        try {
            if (isEdit && EditData) {
                await dispatch(updateBrand({
                    id: EditData._id,
                    updatedData: brandData
                })).unwrap();
            } else {
                await dispatch(createBrand(brandData)).unwrap();
            }

            // Refresh data
            await dispatch(fetchBrands());
            if (!isEdit) await dispatch(fetchCategories());

            // Close modal only after everything is successful
            onClose();
        } catch (err) {
            console.error("Error:", err);
            alert(`Failed to ${isEdit ? "update" : "create"} brand. ${err.message || 'Please try again.'}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
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
                        {isEdit ? "Edit Brand" : "Add New Brand"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-600 hover:text-gray-800 text-lg"
                        disabled={isSubmitting}
                    >
                        ✕
                    </button>
                </div>

                {/* Brand Name */}
                <label className="block mb-2 font-medium text-[#0B0F19]">
                    Brand Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    placeholder="Enter Brand Name"
                    value={brandName}
                    onChange={(e) => setbrandName(e.target.value)}
                    disabled={isSubmitting}
                />

                {/* Brand Description */}
                <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
                    Brand Description
                </label>
                <textarea
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    placeholder="Enter Brand Description"
                    value={brandDescription}
                    onChange={(e) => setbrandDescription(e.target.value)}
                    disabled={isSubmitting}
                ></textarea>

                {/* Parent Brand Dropdown */}
                <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
                    Parent Category
                </label>
                <select
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    value={parentbrand}
                    onChange={(e) => setParentbrand(e.target.value)}
                    disabled={isSubmitting}
                >
                    <option value="N/A">No Parent</option>
                    {parentCategories.map((cat) => (
                        <option key={cat._id} value={cat.name}>
                            {cat.name}
                        </option>
                    ))}
                </select>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-2 mt-4">
                    <button
                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 disabled:opacity-50"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Close
                    </button>
                    <button
                        className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00] disabled:opacity-50"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Processing..." : (isEdit ? "Update" : "Confirm")}
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default BrandModel;