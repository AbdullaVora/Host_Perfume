// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { createShippingPartner, fetchShippingPartners, updateShippingPartner } from "../../redux/slices/Dashboard/Website_Config/shippingPartnerSlice";

// const ShippingpartnersModel = ({ onClose, isEdit, EditData }) => {
//   const [partnerName, setPartnerName] = useState("");
//   const [loginId, setLoginId] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const dispatch = useDispatch()

//   // Set form values when EditData is available
//   useEffect(() => {
//     if (isEdit && EditData) {
//       setPartnerName(EditData.partnerName || "");
//       setLoginId(EditData.loginId || "");
//       setLoginPassword(EditData.password || "");
//     }
//   }, [isEdit, EditData]);

//   const handleSubmit = () => {

//     const shippingPartnerData = {
//       partnerName, loginId, password: loginPassword
//     };

//     if (isEdit && EditData) {
//       dispatch(updateShippingPartner({ id: EditData._id, updatedData: shippingPartnerData }))
//         .then(() => {
//           toast.success("shipping partner updated successfully!", { className: "custom-toast" });
//           dispatch(fetchShippingPartners());
//           onClose();
//         })
//         .catch(() => {
//           toast.error("Failed to update shipping partner. Please try again.", { className: "custom-toast" });
//         });
//     } else {
//       dispatch(createShippingPartner(shippingPartnerData))
//         .then(() => {
//           toast.success("shipping partner added successfully!", { className: "custom-toast" });
//           dispatch(fetchShippingPartners());
//           onClose();
//         })
//         .catch(() => {
//           toast.error("Failed to add shipping partner. Please try again.", { className: "custom-toast" });
//         });
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white p-6 rounded-lg shadow-lg w-[600px] border-t-[6px] border-[#F77F00]"
//       >
//         {/* Modal Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold text-[#F77F00]">{isEdit ? "Edit" : "Add"} Shipping Partner</h2>
//           <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">✕</button>
//         </div>

//         {/* Select Method Name */}
//         <label className="block mb-2 font-medium text-[#0B0F19]">Enter Partner Name<span className="text-red-500">*</span></label>
//         <input
//           type="text"
//           className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//           placeholder="Enter partner name"
//           value={partnerName}
//           onChange={(e) => setPartnerName(e.target.value)}
//         />

//         {/* Shipping Method Login ID */}
//         <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Shipping Partner Login Id<span className="text-red-500">*</span></label>
//         <div className="relative">
//           <input
//             type="text"
//             className="w-full p-2 border rounded pl-10 focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//             placeholder="Enter login id"
//             value={loginId}
//             onChange={(e) => setLoginId(e.target.value)}
//           />
//           <span className="absolute left-3 top-2.5 text-gray-500">🔑</span>
//         </div>

//         {/* Shipping Method Login Password */}
//         <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Shipping Partner Login Password<span className="text-red-500">*</span></label>
//         <div className="relative">
//           <input
//             type={showPassword ? "text" : "password"}
//             className="w-full p-2 border rounded pl-10 focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
//             placeholder="Enter login password"
//             value={loginPassword}
//             onChange={(e) => setLoginPassword(e.target.value)}
//           />
//           <span className="absolute left-3 top-2.5 text-gray-500">🔒</span>
//           <button
//             type="button"
//             className="absolute right-3 top-2.5 text-gray-500"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? "🙈" : "👁️"}
//           </button>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end space-x-2 mt-4">
//           <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={onClose}>Close</button>
//           <button onClick={handleSubmit} className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]">{isEdit ? "Update" : "Confirm"}</button>
//         </div>
//       </motion.div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default ShippingpartnersModel;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createShippingPartner, fetchShippingPartners, updateShippingPartner } from "../../redux/slices/Dashboard/Website_Config/shippingPartnerSlice";
import { prefetchDNS } from "react-dom";

const ShippingpartnersModel = ({ onClose, isEdit, EditData }) => {
  const [partnerName, setPartnerName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [frontAadharPhoto, setFrontAadharPhoto] = useState(null);
  const [backAadharPhoto, setBackAadharPhoto] = useState(null);
  const [previewFront, setPreviewFront] = useState("");
  const [previewBack, setPreviewBack] = useState("");
  const dispatch = useDispatch();

  // Set form values when EditData is available
  useEffect(() => {
    if (isEdit && EditData) {
      console.log(EditData);
      setPartnerName(EditData.partnerName || "");
      setContactNumber(EditData.contactNumber || "");
      setVehicleNumber(EditData.vehicleNumber || "");
      setPreviewFront(EditData.frontAadharPhoto || "");
      setPreviewBack(EditData.backAadharPhoto || "");
    }
  }, [isEdit, EditData]);

  const handleFrontPhotoChange = (e) => {
    const file = e.target.files[0];
    setFrontAadharPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewFront(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackPhotoChange = (e) => {
    const file = e.target.files[0];
    setBackAadharPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewBack(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("partnerName", partnerName);
    formData.append("contactNumber", contactNumber);
    formData.append("vehicleNumber", vehicleNumber);

    if (frontAadharPhoto) {
      formData.append("frontAadharPhoto", frontAadharPhoto);
    }
    if (backAadharPhoto) {
      formData.append("backAadharPhoto", backAadharPhoto);
    }

    if (isEdit && EditData) {
      dispatch(updateShippingPartner({ id: EditData._id, updatedData: formData }))
        .then(() => {
          toast.success("Shipping partner updated successfully!", { className: "custom-toast" });
          dispatch(fetchShippingPartners());
          onClose();
        })
        .catch(() => {
          toast.error("Failed to update shipping partner. Please try again.", { className: "custom-toast" });
        });
    } else {
      dispatch(createShippingPartner(formData))
        .then(() => {
          toast.success("Shipping partner added successfully!", { className: "custom-toast" });
          dispatch(fetchShippingPartners());
          onClose();
        })
        .catch(() => {
          toast.error("Failed to add shipping partner. Please try again.", { className: "custom-toast" });
        });
    }
  };

  console.log(previewBack, previewFront);

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
          <h2 className="text-xl font-bold text-[#F77F00]">{isEdit ? "Edit" : "Add"} Shipping Partner</h2>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">✕</button>
        </div>

        {/* Partner Name */}
        <label className="block mb-2 font-medium text-[#0B0F19]">Partner Name<span className="text-red-500">*</span></label>
        <input
          type="text"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
          placeholder="Enter partner name"
          value={partnerName}
          onChange={(e) => setPartnerName(e.target.value)}
        />

        {/* Contact Number */}
        <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Contact Number<span className="text-red-500">*</span></label>
        <input
          type="text"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
          placeholder="Enter contact number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
        />

        {/* Vehicle Number */}
        <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Vehicle Number</label>
        <input
          type="text"
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
          placeholder="Enter vehicle number"
          value={vehicleNumber}
          onChange={(e) => setVehicleNumber(e.target.value)}
        />

        {/* Front Aadhar Document Photo */}
        <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Front Aadhar Document<span className="text-red-500">*</span></label>
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300">
            Upload Front Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFrontPhotoChange}
            />
          </label>
          {previewFront && (
            <div className="w-55 h-32 border rounded overflow-hidden">
              <img
                src={
                  previewFront?.includes("/uploads")
                    ? `${import.meta.env.VITE_API_URL}${previewFront}`
                    : previewFront
                }
                alt="Front Aadhar Preview"
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>

        {/* Back Aadhar Document Photo */}
        <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Back Aadhar Document<span className="text-red-500">*</span></label>
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded border border-gray-300">
            Upload Back Photo
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBackPhotoChange}
            />
          </label>
          {previewBack && (
            <div className="w-55 h-32 border rounded overflow-hidden">
              <img
                src={
                  previewBack?.includes("/uploads")
                    ? `${import.meta.env.VITE_API_URL}${previewBack}`
                    : previewBack
                }
                alt="Back Aadhar Preview"
                className="w-full h-full object-cover"
              />

            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2 mt-6">
          <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={onClose}>Close</button>
          <button onClick={handleSubmit} className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]">{isEdit ? "Update" : "Confirm"}</button>
        </div>
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default ShippingpartnersModel;