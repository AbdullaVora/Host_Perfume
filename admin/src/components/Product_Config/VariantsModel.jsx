// import { useState } from "react";
// import { motion } from "framer-motion";

// const VariantsModel = ({ onClose }) => {
//     const [VariantsName, setVariantsName] = useState("");
//     const [VariantsDescription, setVariantsDescription] = useState("");
//     const [parentVariants, setParentVariants] = useState("");

//     const parentCategories = ["Electronics", "Fashion", "Home & Kitchen", "Sports", "Books"];

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
//                     <h2 className="text-xl font-bold text-[#F77F00]">Add New Varinat</h2>
//                     <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
//                         ✕
//                     </button>
//                 </div>

//                 {/* Variants Name */}
//                 <label className="block mb-2 font-medium text-[#0B0F19]">Variants Name <span className="text-red-500">*</span></label>
//                 <input
//                     type="text"
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     placeholder="Enter Variants Name"
//                     value={VariantsName}
//                     onChange={(e) => setVariantsName(e.target.value)}
//                 />

//                 {/* Variants Description */}
//                 <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Variants Description</label>
//                 <textarea
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     placeholder="Enter Variants Description"
//                     value={VariantsDescription}
//                     onChange={(e) => setVariantsDescription(e.target.value)}
//                 ></textarea>

//                 {/* Parent Variants */}
//                 <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Parent Variants</label>
//                 <select
//                     className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//                     value={parentVariants}
//                     onChange={(e) => setParentVariants(e.target.value)}
//                 >
//                     <option value="">Select Parent Variants</option>
//                     {parentCategories.map((Variants, index) => (
//                         <option key={index} value={Variants}>{Variants}</option>
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
//                     <button className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]">
//                         Confirm
//                     </button>
//                 </div>
//             </motion.div>
//         </div>
//     );
// };

// export default VariantsModel;

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { createVariant, fetchVariants, updateVariant } from "../../redux/slices/Dashboard/Product_Config/variantsSlice";

const VariantsModel = ({ onClose, EditData, isEdit }) => {
    const dispatch = useDispatch();
    const { variants } = useSelector((state) => state.variants); // Access variants from Redux store

    const [variantName, setVariantName] = useState("");
    const [variantDescription, setVariantDescription] = useState("");
    const [parentVariant, setParentVariant] = useState("N/A");

    // // Fetch Variants from Redux when component mounts
    // useEffect(() => {
    //     dispatch(fetchVariants());
    // }, [dispatch]);

    useEffect(() => {
        if (!variants.length) { // Fetch only if variants are empty
            dispatch(fetchVariants());
        }
    }, [dispatch, variants]);

    // Set form values when EditData is available
    useEffect(() => {
        if (isEdit && EditData) {
            setVariantName(EditData.name || "");
            setVariantDescription(EditData.description || "");
            setParentVariant(EditData.parent || "N/A");
        }
    }, [isEdit, EditData]);

    // Filter variants to show only those with parent === "N/A"
    const parentVariants = variants.filter(variant => variant.parent === "N/A");

    const handleSubmit = () => {
        if (!variantName) {
            alert("Variant Name is required!");
            return;
        }

        const newVariant = {
            name: variantName,
            parent: parentVariant || "N/A", // Default "N/A" if no parent selected
        };

        if (isEdit && EditData) {
            // Edit existing category
            dispatch(updateVariant({ id: EditData._id, updatedData: newVariant }))
                .then(() => {
                    // Only close after successful update
                    dispatch(fetchVariants());
                    onClose();
                })
                .catch(err => {
                    console.error("Error updating variant:", err);
                    alert("Failed to update variant. Please try again.");
                });
        } else {
            // Create new category
            dispatch(createVariant(newVariant))
                .then(() => {
                    // Only close after successful creation
                    dispatch(fetchVariants());
                    onClose();
                })
                .catch(err => {
                    console.error("Error creating variant:", err);
                    alert("Failed to create variant. Please try again.");
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
                    <h2 className="text-xl font-bold text-[#F77F00]">Add New Variant</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
                        ✕
                    </button>
                </div>

                {/* Variant Name */}
                <label className="block mb-2 font-medium text-[#0B0F19]">
                    Variant Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    placeholder="Enter Variant Name"
                    value={variantName}
                    onChange={(e) => setVariantName(e.target.value)}
                />

                {/* Variant Description */}
                <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
                    Variant Description
                </label>
                <textarea
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    placeholder="Enter Variant Description"
                    value={variantDescription}
                    onChange={(e) => setVariantDescription(e.target.value)}
                ></textarea>

                {/* Parent Variant Dropdown */}
                <label className="block mb-2 font-medium text-[#0B0F19] mt-3">
                    Parent Variant
                </label>
                <select
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                    value={parentVariant}
                    onChange={(e) => setParentVariant(e.target.value)}
                >
                    <option value="" selected>Select Variant</option>
                    {parentVariants.map((variant) => (
                        <option key={variant._id} value={variant.name}>
                            {variant.name}
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

export default VariantsModel;
