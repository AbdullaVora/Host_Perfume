// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { createSocialLink, fetchSocialLinks, updateSocialLink } from "../../redux/slices/Dashboard/Website_Config/socialLinksSlice";
// import { useDispatch } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";

// const SocialLinksModel = ({ onClose, isEdit, EditData }) => {
//   const [socialName, setSocialName] = useState("");
//   const [socialLink, setSocialLink] = useState("");
//   const [icon, setIcon] = useState(""); // Default icon

//   const dispatch = useDispatch()

//   // Set form values when EditData is available
//   useEffect(() => {
//     if (isEdit && EditData) {
//       setSocialName(EditData.name || "");
//       setSocialLink(EditData.link || "");
//       setIcon(EditData.icon || "");
//     }
//   }, [isEdit, EditData]);

//   const handleSubmit = () => {

//     const socialLinksData = {
//       name: socialName, link: socialLink, icon
//     };

//     if (isEdit && EditData) {
//       dispatch(updateSocialLink({ id: EditData._id, updatedData: socialLinksData }))
//         .then(() => {
//           toast.success("social links updated successfully!", { className: "custom-toast" });
//           dispatch(fetchSocialLinks());
//           onClose();
//         })
//         .catch(() => {
//           toast.error("Failed to update social links. Please try again.", { className: "custom-toast" });
//         });
//     } else {
//       dispatch(createSocialLink(socialLinksData))
//         .then(() => {
//           toast.success("social links added successfully!", { className: "custom-toast" });
//           dispatch(fetchSocialLinks());
//           onClose();
//         })
//         .catch(() => {
//           toast.error("Failed to add social links. Please try again.", { className: "custom-toast" });
//         });
//     }
//   };


//   return (
//     <div className="flex bg-opacity-50 justify-center backdrop-blur-sm fixed inset-0 items-center">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         exit={{ opacity: 0, scale: 0.9 }}
//         transition={{ duration: 0.3 }}
//         className="bg-white border-[#F77F00] border-t-[6px] p-6 rounded-lg shadow-lg w-[600px]"
//       >
//         {/* Modal Header */}
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-[#F77F00] text-xl font-bold">{isEdit ? "Edit" : "Add"} Social Links</h2>
//           <button onClick={onClose} className="text-gray-600 text-lg hover:text-gray-800">
//             ✕
//           </button>
//         </div>

//         {/* Social Name */}
//         <label className="text-[#0B0F19] block font-medium mb-2">
//           Social Name<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="text"
//           className="border p-2 rounded w-full focus:outline-none focus:ring-[#F77F00] focus:ring-2"
//           placeholder="Enter social name"
//           value={socialName}
//           onChange={(e) => setSocialName(e.target.value)}
//         />

//         {/* Social Link */}
//         <label className="text-[#0B0F19] block font-medium mb-2 mt-3">
//           Social Link<span className="text-red-500">*</span>
//         </label>
//         <input
//           type="url"
//           className="border p-2 rounded w-full focus:outline-none focus:ring-[#F77F00] focus:ring-2"
//           placeholder="Enter social link"
//           value={socialLink}
//           onChange={(e) => setSocialLink(e.target.value)}
//         />

//         {/* Icon Selection */}
//         <label className="text-[#0B0F19] block font-medium mb-2 mt-3">
//           Icon<span className="text-red-500">*</span>
//         </label>
//         <div className="flex items-center space-x-3">
//           <i className={`${icon} text-3xl text-[#F77F00]`}></i>
//           <input
//             type="text"
//             className="border p-2 rounded w-full focus:outline-none focus:ring-[#F77F00] focus:ring-2"
//             placeholder="Enter FontAwesome icon class (e.g., fab fa-twitter)"
//             value={icon}
//             onChange={(e) => setIcon(e.target.value)}
//           />
//         </div>

//         {/* Action Buttons */}
//         <div className="flex justify-end mt-4 space-x-2">
//           <button className="bg-gray-400 rounded text-white hover:bg-gray-500 px-4 py-2" onClick={onClose}>
//             Close
//           </button>
//           <button onClick={handleSubmit} className="bg-[#F77F00] rounded text-white hover:bg-[#d96d00] px-4 py-2">
//             {isEdit ? "Update" : "Confirm"}
//           </button>
//         </div>
//       </motion.div>
//       <ToastContainer/>
//     </div>
//   );
// };

// export default SocialLinksModel;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { createSocialLink, fetchSocialLinks, updateSocialLink } from "../../redux/slices/Dashboard/Website_Config/socialLinksSlice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

const SocialLinksModel = ({ onClose, isEdit, EditData }) => {
  const [socialName, setSocialName] = useState("");
  const [socialLink, setSocialLink] = useState("");
  const [icon, setIcon] = useState(""); // Will store icon class or image data
  const [iconType, setIconType] = useState(""); // Default to icon selection

  const dispatch = useDispatch()

  // Set form values when EditData is available
  useEffect(() => {
    if (isEdit && EditData) {
      setSocialName(EditData.name || "");
      setSocialLink(EditData.link || "");
      setIcon(EditData.icon || "");
      // Determine icon type based on the data format
      setIconType(EditData.icon?.startsWith("data:") ? "image" : "icon");
    }
  }, [isEdit, EditData]);

  const handleSubmit = () => {
    const socialLinksData = {
      name: socialName, 
      link: socialLink, 
      icon
    };

    if (isEdit && EditData) {
      dispatch(updateSocialLink({ id: EditData._id, updatedData: socialLinksData }))
        .then(() => {
          toast.success("Social links updated successfully!", { className: "custom-toast" });
          dispatch(fetchSocialLinks());
          onClose();
        })
        .catch(() => {
          toast.error("Failed to update social links. Please try again.", { className: "custom-toast" });
        });
    } else {
      dispatch(createSocialLink(socialLinksData))
        .then(() => {
          toast.success("Social links added successfully!", { className: "custom-toast" });
          dispatch(fetchSocialLinks());
          onClose();
        })
        .catch(() => {
          toast.error("Failed to add social links. Please try again.", { className: "custom-toast" });
        });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setIcon(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex bg-opacity-50 justify-center backdrop-blur-sm fixed inset-0 items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white border-[#F77F00] border-t-[6px] p-6 rounded-lg shadow-lg w-[600px]"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[#F77F00] text-xl font-bold">{isEdit ? "Edit" : "Add"} Social Links</h2>
          <button onClick={onClose} className="text-gray-600 text-lg hover:text-gray-800">
            ✕
          </button>
        </div>

        {/* Social Name */}
        <label className="text-[#0B0F19] block font-medium mb-2">
          Social Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="border p-2 rounded w-full focus:outline-none focus:ring-[#F77F00] focus:ring-2"
          placeholder="Enter social name"
          value={socialName}
          onChange={(e) => setSocialName(e.target.value)}
        />

        {/* Social Link */}
        <label className="text-[#0B0F19] block font-medium mb-2 mt-3">
          Social Link<span className="text-red-500">*</span>
        </label>
        <input
          type="url"
          className="border p-2 rounded w-full focus:outline-none focus:ring-[#F77F00] focus:ring-2"
          placeholder="Enter social link"
          value={socialLink}
          onChange={(e) => setSocialLink(e.target.value)}
        />

        {/* Icon Type Selection Dropdown */}
        <label className="text-[#0B0F19] block font-medium mb-2 mt-3">
          Icon Type<span className="text-red-500">*</span>
        </label>
        <select 
          className="border p-2 rounded w-full focus:outline-none focus:ring-[#F77F00] focus:ring-2 mb-3"
          value={iconType}
          onChange={(e) => setIconType(e.target.value)}
        >
          <option value="">Select Type</option>
          <option value="icon">Icon</option>
          <option value="image">Image</option>
        </select>

        {/* Conditional Icon Input Field */}
{iconType === "icon" && (
  <>
    <div className="icon">
      <label className="text-[#0B0F19] block font-medium mb-2">
        Icon<span className="text-red-500">*</span>
      </label>
      <div className="flex flex-col space-y-2">
        {icon && (
          <div className="h-16 rounded w-16 overflow-hidden">
            <img src={icon} alt="Social icon" className="h-full w-full object-contain" />
          </div>
        )}
        <input
          type="url"
          className="border p-2 rounded w-full focus:outline-none focus:ring-[#F77F00] focus:ring-2"
          placeholder="Enter icon link (e.g., https://www.instagram.com)"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
      </div>
    </div>
  </>
)}

{iconType === "image" && (
  <>
    <label className="text-[#0B0F19] block font-medium mb-2">
      Image<span className="text-red-500">*</span>
    </label>
    <div className="flex flex-col space-y-2">
      {icon && (
        <div className="h-16 rounded w-16 overflow-hidden">
          <img src={icon} alt="Social icon" className="h-full w-full object-contain" />
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="border p-2 rounded w-full focus:outline-none focus:ring-[#F77F00] focus:ring-2"
        onChange={handleFileChange}
      />
    </div>
  </>
)}


        {/* Action Buttons */}
        <div className="flex justify-end mt-4 space-x-2">
          <button className="bg-gray-400 rounded text-white hover:bg-gray-500 px-4 py-2" onClick={onClose}>
            Close
          </button>
          <button onClick={handleSubmit} className="bg-[#F77F00] rounded text-white hover:bg-[#d96d00] px-4 py-2">
            {isEdit ? "Update" : "Confirm"}
          </button>
        </div>
      </motion.div>
      <ToastContainer/>
    </div>
  );
};

export default SocialLinksModel;