// import { useState, useEffect } from "react";
// import { FaEnvelope, FaSearch } from "react-icons/fa";
// import { FaEye } from "react-icons/fa6";
// import InvoiceComponent from "./Invoince/Invoince";
// import ErrorBoundary from "../helper/ErrorBoundary";
// import EmailModal from "./Email/EmailModal";
// import api from "../api/instance";
// import { toast, ToastContainer } from "react-toastify";

// const Table = ({
//   data,
//   onEdit,
//   onDelete,
//   onStatus,
//   isOrderScroll,
//   canEdit,
//   canDelete,
//   canActive,
//   canEmail,
//   onEye,
// }) => {
//   console.log("Table component rendered with data:", data);
//   // Ensure data is always an array
//   const safeData = Array.isArray(data) ? data : [];

//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [status, setStatus] = useState({});
//   const [sortCriteria, setSortCriteria] = useState("latest");
//   const [selectedInvoice, setSelectedInvoice] = useState(null);
//   const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
//   const [selectedInquiry, setSelectedInquiry] = useState(null);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage, setItemsPerPage] = useState(10);

//   // Initialize status values from data when component mounts
//   useEffect(() => {
//     if (Array.isArray(data) && data.length > 0) {
//       const statusObj = {};
//       data.forEach((row, index) => {
//         const id = row._id || row.id || `row-${index}`;
//         statusObj[id] = row.status || false;
//       });
//       setStatus(statusObj);
//     }
//   }, [data]);

//   const sendEmail = async (emailData) => {
//     try {
//       const response = await api.post('/api/dashboard/addInquiryEmail', {
//         emailData
//         // headers: {
//         //   'Content-Type': 'application/json',
//         //   'Authorization': `Bearer ${yourAuthToken}` // if needed
//         // },
//       });

//       if (response.status === 200) {
//         toast.success('Email sent successfully');
//       } else {
//         throw new Error('Failed to send email');
//       }
//     } catch (error) {
//       throw error;
//     }
//   };


//   const getUniqueData = (data) => {
//     if (!Array.isArray(data) || !data.length) return [];

//     if (data[0]._id) {
//       return data.filter(
//         (item, index, self) =>
//           index === self.findIndex((t) => t._id === item._id)
//       );
//     }

//     return [...data];
//   };

//   useEffect(() => {
//     if (!Array.isArray(data) || data.length === 0) {
//       setFilteredData([]);
//       return;
//     }

//     let uniqueData = getUniqueData(data);

//     // Apply search filter
//     if (searchTerm.trim()) {
//       uniqueData = uniqueData.filter((row) =>
//         Object.keys(row).some((key) => {
//           if (typeof row[key] === "boolean" || key.startsWith("is")) {
//             return false;
//           }
//           const value = String(row[key]).toLowerCase();
//           return value.includes(searchTerm.toLowerCase());
//         })
//       );
//     }

//     // Sort data
//     let sortedData = [...uniqueData];

//     const hasDateField =
//       uniqueData.length > 0 &&
//       (uniqueData[0].createdAt || uniqueData[0].updatedAt);
//     const hasNameField = uniqueData.length > 0 && uniqueData[0].name;

//     if (sortCriteria === "latest" && hasDateField) {
//       sortedData.sort((a, b) => {
//         const dateA = new Date(b.createdAt || b.updatedAt);
//         const dateB = new Date(a.createdAt || a.updatedAt);
//         return dateA - dateB;
//       });
//     } else if (sortCriteria === "oldest" && hasDateField) {
//       sortedData.sort((a, b) => {
//         const dateA = new Date(a.createdAt || a.updatedAt);
//         const dateB = new Date(b.createdAt || b.updatedAt);
//         return dateA - dateB;
//       });
//     } else if (sortCriteria === "nameAtoZ" && hasNameField) {
//       sortedData.sort((a, b) => a.name.localeCompare(b.name));
//     } else if (sortCriteria === "nameZtoA" && hasNameField) {
//       sortedData.sort((a, b) => b.name.localeCompare(a.name));
//     }

//     setFilteredData(sortedData);
//     setCurrentPage(1); // Reset to first page when filters change
//   }, [data, searchTerm, sortCriteria]);

//   // Pagination logic
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(filteredData.length / itemsPerPage);

//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   const handleItemsPerPageChange = (e) => {
//     setItemsPerPage(Number(e.target.value));
//     setCurrentPage(1); // Reset to first page when items per page changes
//   };

//   const handleView = (id) => {
//     console.log("View button clicked for ID:", id);
//     setSelectedInvoice(id);
//     setIsInvoiceOpen(true);
//   };

//   const handleEdit = (id) => {
//     if (onEdit) onEdit(id);
//   };

//   const handleDelete = (id) => {
//     if (onDelete) onDelete(id);
//   };

//   const handleToggleStatus = (id) => {
//     const updatedStatus = { ...status, [id]: !status[id] };
//     setStatus(updatedStatus);
//     if (onStatus) {
//       onStatus(id, updatedStatus[id]);
//     }
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleSortChange = (e) => {
//     setSortCriteria(e.target.value);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "N/A";

//     const date = new Date(dateString);
//     if (isNaN(date.getTime())) return "Invalid Date";

//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     }).format(date);
//   };

//   if (!Array.isArray(safeData) || safeData.length === 0) {
//     return (
//       <div className="bg-white rounded-xl shadow-md p-4 text-center text-gray-500">
//         No Data Found
//       </div>
//     );
//   }

//   const getStatusColor = (statusValue) => {
//     if (statusValue === undefined || statusValue === null) {
//       return "bg-gray-300 text-gray-700";
//     }

//     if (!statusValue) return "bg-gray-300 text-gray-700";

//     const statusStr = String(statusValue).toLowerCase();

//     switch (statusStr) {
//       case "complete":
//       case "Complete":
//       case "Completed":
//       case "completed":
//       case "Paid":
//       case "paid":
//         return "bg-green-500 text-white";
//       case "process":
//       case "Process":
//       case "in progress":
//         return "bg-blue-500 text-white";
//       case "pending":
//       case "Pending":
//         return "bg-yellow-500 text-white";
//       case "cancelled":
//       case "Cancelled":
//       case "failed":
//       case "Failed":
//         return "bg-red-500 text-white";
//       case "true":
//         return "bg-green-500 text-white";
//       case "false":
//         return "bg-gray-300 text-gray-700";
//       default:
//         return "bg-gray-300 text-gray-700";
//     }
//   };

//   const reservedFields = [
//     "_id", "isAction", "isSlider", "isBanner", "isCoupon",
//     "isInquiry", "isCategory", "isVariant", "isOrderStatus",
//     "isPayment", "isShippingPartner", "isSocial", "isBrand",
//     "status", "sliderCategory", "sliderSubcategory", "bannerCategory",
//     "bannerSubcategory", "brand", "title", "subTitle", "description",
//     "userId", "products", "permissions", "isSubAdmin", "role",
//     "isInquiry", "isUser", "isOrders", "daysActive", "id", "isStock", "inquiry", "isEmail", "__v"
//   ];

//   const allColumns = safeData.length > 0
//     ? Object.keys(safeData[0]).filter(column => !reservedFields.includes(column))
//     : [];

//   const reorderedColumns = [...allColumns];
//   const imageIndex = reorderedColumns.indexOf("image");

//   if (imageIndex > -1) {
//     reorderedColumns.splice(imageIndex, 1);
//     reorderedColumns.unshift("image");
//   }

//   const productNamesIndex = reorderedColumns.indexOf("productName");
//   const quantityIndex = reorderedColumns.indexOf("quantity");

//   if (productNamesIndex > -1 && reorderedColumns.length > 2) {
//     reorderedColumns.splice(productNamesIndex, 1);
//     reorderedColumns.splice(2, 0, "productName");
//   }

//   if (quantityIndex > -1 && reorderedColumns.includes("productName")) {
//     const newQuantityIndex = reorderedColumns.indexOf("quantity");
//     if (newQuantityIndex > -1) {
//       reorderedColumns.splice(newQuantityIndex, 1);
//     }
//     const afterProductNamesPos = reorderedColumns.indexOf("productName") + 1;
//     reorderedColumns.splice(afterProductNamesPos, 0, "quantity");
//   }

//   const toggleExpandRow = (id) => {
//     setExpandedRow(expandedRow === id ? null : id);
//   };

//   const renderCellContent = (row, column) => {
//     if (!row) return "N/A";

//     const value = row[column];

//     if (value === null || value === undefined) {
//       return "N/A";
//     } else if (typeof value === "object") {
//       return JSON.stringify(value);
//     } else if (
//       column === "desktopMedia" ||
//       column === "mobileMedia" ||
//       column === "frontAadharPhoto" ||
//       column === "backAadharPhoto" ||
//       column === "image" ||
//       column === "icon"
//     ) {
//       const isVideo = value.match(/\.(mp4|webm|ogg)$/i) ||
//         (typeof value === "string" && value.includes("data:video"));

//       if (isVideo) {
//         return (
//           <video
//             className={`${row.isSlider ? "w-150 h-50 rounded-md" : "w-15 h-15 rounded-full"
//               } ${column === "desktopMedia"
//                 ? "w-220 h-30 rounded-md"
//                 : "w-15 h-15 rounded-full"
//               } ${column === "mobileMedia"
//                 ? "w-90 h-45 rounded-md"
//                 : "w-15 h-15 rounded-full"
//               } ${column === "icon" ? "rounded-md" : "w-15 h-15 rounded-full"
//               } object-cover`}
//             muted
//             autoPlay
//             loop
//             playsInline
//           >
//             <source src={value} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         );
//       }

//       return (
//         <img
//           src={
//             value?.includes("/uploads")
//               ? `${import.meta.env.VITE_API_URL}${value}`
//               : value
//           }
//           alt={column}
//           className={`${row.isSlider ? "w-150 h-50 rounded-md" : "w-15 h-15 rounded-full"
//             } ${column === "desktopMedia"
//               ? "w-220 h-30 rounded-md"
//               : "w-15 h-15 rounded-full"
//             } ${column === "frontAadharPhoto" || column === "backAadharPhoto"
//               ? "w-220 h-30 rounded-md"
//               : "w-15 h-15 rounded-full"
//             } ${column === "mobileMedia"
//               ? "w-90 h-45 rounded-md"
//               : "w-15 h-15 rounded-full"
//             } ${column === "icon" ? "rounded-md" : "w-15 h-15 rounded-full"
//             } object-cover`}
//         />
//       );
//     } else if (typeof value === "string" && value.startsWith("http")) {
//       const isVideoLink = value.match(/\.(mp4|webm|ogg)$/i);

//       if (isVideoLink) {
//         return (
//           <video
//             controls
//             className="w-32 h-24 rounded-md object-cover"
//             muted
//             playsInline
//           >
//             <source src={value} type="video/mp4" />
//             Your browser does not support the video tag.
//           </video>
//         );
//       }
//       return (
//         <a
//           href={value}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 hover:text-blue-700"
//         >
//           <FaEye size={20} />
//         </a>
//       );
//     } else if (
//       column === "createdAt" ||
//       column === "sentAt" ||
//       column === "updatedAt" ||
//       column === "orderDate"
//     ) {
//       return formatDate(value);
//     } else if (
//       column.toLowerCase() === "status" ||
//       column.toLowerCase().includes("status")
//     ) {
//       return (
//         <span
//           className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
//             value || ""
//           )}`}
//         >
//           {value || "N/A"}
//         </span>
//       );
//     } else if (column === "productNames") {
//       if (!value) return "N/A";

//       const isExpanded = expandedRow === row._id || row.id;
//       let displayValue = String(value);

//       if (Array.isArray(value)) {
//         displayValue = value.join(", ");
//       }

//       if (isExpanded) {
//         return (
//           <div className="relative">
//             <div className="text-sm pb-6">{displayValue}</div>
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleExpandRow(row._id || row.id);
//               }}
//               className="absolute bottom-0 right-0 text-blue-500 hover:text-blue-700 text-xs"
//             >
//               Show less
//             </button>
//           </div>
//         );
//       }

//       return (
//         <div className="relative">
//           <div className="text-sm truncate max-w-xs">
//             {displayValue.length > 20
//               ? displayValue.substring(0, 20) + "..."
//               : displayValue}
//           </div>
//           {displayValue.length > 20 && (
//             <button
//               onClick={(e) => {
//                 e.stopPropagation();
//                 toggleExpandRow(row._id || row.id);
//               }}
//               className="text-blue-500 hover:text-blue-700 text-xs"
//             >
//               Show more
//             </button>
//           )}
//         </div>
//       );
//     }

//     return String(value);
//   };

//   const hasActionColumn =
//     Array.isArray(safeData) && safeData.some((row) => row && row.isAction);

//   return (
//     <div className="bg-white rounded-xl shadow-md">
//       {safeData.length > 0 &&
//         safeData[0] &&
//         (safeData[0].isBanner ||
//           safeData[0].isSlider ||
//           safeData[0].isCoupon ||
//           safeData[0].isInquiry ||
//           safeData[0].isCategory ||
//           safeData[0].isVariant ||
//           safeData[0].isOrderStatus ||
//           safeData[0].isPayment ||
//           safeData[0].isShippingPartner ||
//           safeData[0].isSocial ||
//           safeData[0].isBrand ||
//           safeData[0].isSubAdmin ||
//           safeData[0].isInquiry ||
//           safeData[0].isStock ||
//           safeData[0].isEmail ||
//           safeData[0].isUser) && (
//           <div className="px-4 py-3 bg-gray-50 rounded-2xl border-gray-200 flex justify-between items-center">
//             <div className="relative w-64 mx-1">
//               <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
//                 <FaSearch className="text-gray-400 text-sm" />
//               </div>
//               <input
//                 type="text"
//                 className="block w-full font-medium pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                 placeholder="Search table..."
//                 value={searchTerm}
//                 onChange={handleSearchChange}
//               />
//             </div>
//             <div className="flex space-x-4">
//               <select
//                 className="block w-42 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                 value={itemsPerPage}
//                 onChange={handleItemsPerPageChange}
//               >
//                 <option value={5}>5 per page</option>
//                 <option value={10}>10 per page</option>
//                 <option value={20}>20 per page</option>
//                 <option value={50}>50 per page</option>
//               </select>
//               <select
//                 className="block w-42 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
//                 value={sortCriteria}
//                 onChange={handleSortChange}
//               >
//                 <option value="latest">Latest</option>
//                 <option value="oldest">Oldest</option>
//                 <option value="nameAtoZ">Name A-Z</option>
//                 <option value="nameZtoA">Name Z-A</option>
//               </select>
//             </div>
//           </div>
//         )}

//       <div
//         className={`overflow-x-auto rounded-xl w-full shadow-lg ${isOrderScroll ? "max-w-[1259px] table-responsive overflow-x-auto" : ""
//           }`}
//       >
//         {isInvoiceOpen && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 mt-15 z-[9999]">
//             <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
//               <div className="flex justify-between items-center p-4 border-b">
//                 <h2 className="text-xl font-bold">ORDER INVOINCE</h2>
//                 <button
//                   onClick={() => setIsInvoiceOpen(false)}
//                   className="text-gray-500 hover:text-gray-700"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-6 w-6"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M6 18L18 6M6 6l12 12"
//                     />
//                   </svg>
//                 </button>
//               </div>
//               <div className="p-6">
//                 {selectedInvoice && (
//                   <ErrorBoundary>
//                     <InvoiceComponent id={selectedInvoice} />
//                   </ErrorBoundary>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}

//         <table className="bg-white border border-gray-200 rounded-xl w-full">
//           <thead className="bg-gray-900 text-white">
//             <tr>
//               <th className="py-3 px-6 text-left">Sr No.</th>
//               {reorderedColumns.map((column) => (
//                 <th key={column} className="py-3 px-6 text-left capitalize">
//                   {column.replace(/([A-Z])/g, " $1").trim()}
//                 </th>
//               ))}
//               {hasActionColumn &&
//                 (canActive || canDelete || canEdit || canEmail || onEye) && (
//                   <th className="py-3 px-6 text-left">Action</th>
//                 )}
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.length === 0 ? (
//               <tr>
//                 <td
//                   colSpan={reorderedColumns.length + (hasActionColumn ? 2 : 1)}
//                   className="py-4 px-6 text-center text-gray-500"
//                 >
//                   No matching results found
//                 </td>
//               </tr>
//             ) : (
//               currentItems.map((row, index) => (
//                 <tr
//                   key={row?._id || `row-${indexOfFirstItem + index}`}
//                   className="border-b border-gray-200 hover:bg-gray-100"
//                 >
//                   <td className="py-3 px-6">{indexOfFirstItem + index + 1}</td>
//                   {reorderedColumns.map((column) => (
//                     <td
//                       key={column}
//                       className={`py-3 px-6 ${isOrderScroll ? "whitespace-nowrap" : ""
//                         }`}
//                     >
//                       {renderCellContent(row, column)}
//                     </td>
//                   ))}
//                   {row?.isAction &&
//                     hasActionColumn &&
//                     (canActive || canDelete || canEdit || canEmail || onEye) && (
//                       <td
//                         className={`${row.image ? "py-8" : "py-3"} px-6 flex items-center space-x-3 ${row.isCoupon ||
//                           row.isCategory ||
//                           row.isOrderStatus ||
//                           row.isPayment ||
//                           row.isShippingPartner ||
//                           row.isSocial ||
//                           row.isBrand ||
//                           row.isVariant ||
//                           row.isSubAdmin ||
//                           row.isInquiry ||
//                           row.isOrders ||
//                           row.isStock ||
//                           row.isEmail ||
//                           row.isUser
//                           ? "my-2"
//                           : row.isBanner
//                             ? "my-[48%]"
//                             : "my-[52%]"
//                           }`}
//                       >
//                         {canEdit && (
//                           <button
//                             className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-100"
//                             onClick={() =>
//                               handleEdit(row._id || row.id || `row-${indexOfFirstItem + index}`)
//                             }
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-5 w-5"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
//                               />
//                             </svg>
//                           </button>
//                         )}
//                         {canDelete && (
//                           <button
//                             className="text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
//                             onClick={() =>
//                               handleDelete(row._id || row.id || `row-${indexOfFirstItem + index}`)
//                             }
//                           >
//                             <svg
//                               xmlns="http://www.w3.org/2000/svg"
//                               className="h-5 w-5"
//                               fill="none"
//                               viewBox="0 0 24 24"
//                               stroke="currentColor"
//                             >
//                               <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                               />
//                             </svg>
//                           </button>
//                         )}
//                         {onEye && (
//                           <td>
//                             <button
//                               className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 p-2 rounded-full hover:bg-indigo-100"
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 e.stopPropagation();
//                                 handleView(row._id || row.id);
//                               }}
//                             >
//                               <FaEye className="h-5 w-5" />
//                             </button>
//                           </td>
//                         )}
//                         {
//                           canEmail && (
//                             <button
//                               className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-green-100"
//                               onClick={() => {
//                                 setSelectedInquiry(row);
//                                 setIsEmailModalOpen(true);
//                               }}
//                             >
//                               <FaEnvelope className="h-5 w-5" />
//                             </button>
//                           )
//                         }
//                         {canActive && (
//                           <label className="flex items-center cursor-pointer">
//                             <input
//                               type="checkbox"
//                               className="sr-only peer"
//                               checked={!!status[row._id || row.id || `row-${indexOfFirstItem + index}`]}
//                               onChange={() =>
//                                 handleToggleStatus(row._id || row.id || `row-${indexOfFirstItem + index}`)
//                               }
//                             />
//                             <div
//                               className={`w-10 h-5 rounded-full relative transition-all ${status[row._id || row.id || `row-${indexOfFirstItem + index}`]
//                                 ? "bg-green-500"
//                                 : "bg-gray-300"
//                                 }`}
//                             >
//                               <div
//                                 className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${status[row._id || row.id || `row-${indexOfFirstItem + index}`]
//                                   ? "left-6"
//                                   : "left-1"
//                                   }`}
//                               ></div>
//                             </div>
//                           </label>
//                         )}
//                       </td>
//                     )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>

//         {isEmailModalOpen && selectedInquiry && (
//           <EmailModal
//             inquiry={selectedInquiry}
//             onClose={() => {
//               setIsEmailModalOpen(false);
//               setSelectedInquiry(null);
//             }}
//             onSend={sendEmail}
//           />
//         )}

//         {/* Pagination Controls */}
//         {filteredData.length > itemsPerPage && (
//           <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
//             <div className="text-sm text-gray-700">
//               Showing {indexOfFirstItem + 1} to{" "}
//               {Math.min(indexOfLastItem, filteredData.length)} of{" "}
//               {filteredData.length} entries
//             </div>
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => paginate(1)}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 rounded-md ${currentPage === 1
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//               >
//                 First
//               </button>
//               <button
//                 onClick={() => paginate(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className={`px-3 py-1 rounded-md ${currentPage === 1
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//               >
//                 Previous
//               </button>

//               {/* Page numbers */}
//               {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                 let pageNum;
//                 if (totalPages <= 5) {
//                   pageNum = i + 1;
//                 } else if (currentPage <= 3) {
//                   pageNum = i + 1;
//                 } else if (currentPage >= totalPages - 2) {
//                   pageNum = totalPages - 4 + i;
//                 } else {
//                   pageNum = currentPage - 2 + i;
//                 }

//                 return (
//                   <button
//                     key={pageNum}
//                     onClick={() => paginate(pageNum)}
//                     className={`px-3 py-1 rounded-md ${currentPage === pageNum
//                       ? "bg-blue-600 text-white"
//                       : "bg-blue-500 text-white hover:bg-blue-600"
//                       }`}
//                   >
//                     {pageNum}
//                   </button>
//                 );
//               })}

//               <button
//                 onClick={() => paginate(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-1 rounded-md ${currentPage === totalPages
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//               >
//                 Next
//               </button>
//               <button
//                 onClick={() => paginate(totalPages)}
//                 disabled={currentPage === totalPages}
//                 className={`px-3 py-1 rounded-md ${currentPage === totalPages
//                   ? "bg-gray-200 text-gray-500 cursor-not-allowed"
//                   : "bg-blue-500 text-white hover:bg-blue-600"
//                   }`}
//               >
//                 Last
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       <ToastContainer />
//     </div>
//   );
// };

// export default Table;


import { useState, useEffect } from "react";
import { FaEnvelope, FaSearch } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";
import InvoiceComponent from "./Invoince/Invoince";
import ErrorBoundary from "../helper/ErrorBoundary";
import EmailModal from "./Email/EmailModal";
import api from "../api/instance";
import { toast, ToastContainer } from "react-toastify";

const Table = ({
  data,
  onEdit,
  onDelete,
  onStatus,
  isOrderScroll,
  canEdit,
  canDelete,
  canActive,
  canEmail,
  onEye,
}) => {
  console.log("Table component rendered with data:", data);
  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : [];

  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState({});
  const [sortCriteria, setSortCriteria] = useState("latest");
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Initialize status values from data when component mounts
  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) {
      const statusObj = {};
      data.forEach((row, index) => {
        const id = row._id || row.id || `row-${index}`;
        statusObj[id] = row.status || false;
      });
      setStatus(statusObj);
    }
  }, [data]);

  const sendEmail = async (emailData) => {
    try {
      const response = await api.post('/api/dashboard/addInquiryEmail', {
        emailData
      });

      if (response.status === 200) {
        toast.success('Email sent successfully');
      } else {
        throw new Error('Failed to send email');
      }
    } catch (error) {
      throw error;
    }
  };

  const getUniqueData = (data) => {
    if (!Array.isArray(data) || !data.length) return [];
    return [...data]; // Return all data without filtering for uniqueness
  };

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      setFilteredData([]);
      return;
    }

    let processedData = getUniqueData(data);

    // Apply search filter
    if (searchTerm.trim()) {
      processedData = processedData.filter((row) =>
        Object.keys(row).some((key) => {
          if (typeof row[key] === "boolean" || key.startsWith("is")) {
            return false;
          }
          const value = String(row[key]).toLowerCase();
          return value.includes(searchTerm.toLowerCase());
        })
      );
    }

    // Sort data
    let sortedData = [...processedData];

    const hasDateField =
      processedData.length > 0 &&
      (processedData[0].createdAt || processedData[0].updatedAt);
    const hasNameField = processedData.length > 0 && processedData[0].name;

    if (sortCriteria === "latest" && hasDateField) {
      sortedData.sort((a, b) => {
        const dateA = new Date(b.createdAt || b.updatedAt);
        const dateB = new Date(a.createdAt || a.updatedAt);
        return dateA - dateB;
      });
    } else if (sortCriteria === "oldest" && hasDateField) {
      sortedData.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt);
        const dateB = new Date(b.createdAt || b.updatedAt);
        return dateA - dateB;
      });
    } else if (sortCriteria === "nameAtoZ" && hasNameField) {
      sortedData.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortCriteria === "nameZtoA" && hasNameField) {
      sortedData.sort((a, b) => b.name.localeCompare(a.name));
    }

    setFilteredData(sortedData);
    setCurrentPage(1); // Reset to first page when filters change
  }, [data, searchTerm, sortCriteria]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  const handleView = (id) => {
    console.log("View button clicked for ID:", id);
    setSelectedInvoice(id);
    setIsInvoiceOpen(true);
  };

 


  const handleEdit = (id) => {
    if (onEdit) onEdit(id);
  };

  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
  };

  const handleToggleStatus = (id) => {
    const updatedStatus = { ...status, [id]: !status[id] };
    setStatus(updatedStatus);
    if (onStatus) {
      onStatus(id, updatedStatus[id]);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortCriteria(e.target.value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  if (!Array.isArray(safeData) || safeData.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-4 text-center text-gray-500">
        No Data Found
      </div>
    );
  }

  const getStatusColor = (statusValue) => {
    if (statusValue === undefined || statusValue === null) {
      return "bg-gray-300 text-gray-700";
    }

    if (!statusValue) return "bg-gray-300 text-gray-700";

    const statusStr = String(statusValue).toLowerCase();

    switch (statusStr) {
      case "complete":
      case "Complete":
      case "Completed":
      case "completed":
      case "delivered":
      case "Delivered":
      case "Paid":
      case "paid":
        return "bg-green-500 text-white";
      case "process":
      case "Process":
      case "in progress":
        return "bg-blue-500 text-white";
      case "Dispatch":
      case "dispatch":
      case "in progress":
        return "bg-green-800 text-white";
      case "pending":
      case "Pending":
        return "bg-yellow-500 text-white";
      case "cancelled":
      case "Cancelled":
      case "failed":
      case "Failed":
        return "bg-red-500 text-white";
      case "true":
        return "bg-green-500 text-white";
      case "false":
        return "bg-gray-300 text-gray-700";
      default:
        return "bg-gray-300 text-gray-700";
    }
  };

  const reservedFields = [
    "_id", "isAction", "isSlider", "isBanner", "isCoupon",
    "isInquiry", "isCategory", "isVariant", "isOrderStatus",
    "isPayment", "isShippingPartner", "isSocial", "isBrand",
    "status", "sliderCategory", "sliderSubcategory", "bannerCategory",
    "bannerSubcategory", "brand", "title", "subTitle", "description",
    "userId", "products", "permissions", "isSubAdmin", "role",
    "isInquiry", "isUser", "isOrders", "daysActive", "id", "isStock", "inquiry", "isEmail", "__v"
  ];

  const allColumns = safeData.length > 0
    ? Object.keys(safeData[0]).filter(column => !reservedFields.includes(column))
    : [];

  const reorderedColumns = [...allColumns];
  const imageIndex = reorderedColumns.indexOf("image");

  if (imageIndex > -1) {
    reorderedColumns.splice(imageIndex, 1);
    reorderedColumns.unshift("image");
  }

  const productNamesIndex = reorderedColumns.indexOf("productName");
  const quantityIndex = reorderedColumns.indexOf("quantity");

  if (productNamesIndex > -1 && reorderedColumns.length > 2) {
    reorderedColumns.splice(productNamesIndex, 1);
    reorderedColumns.splice(2, 0, "productName");
  }

  if (quantityIndex > -1 && reorderedColumns.includes("productName")) {
    const newQuantityIndex = reorderedColumns.indexOf("quantity");
    if (newQuantityIndex > -1) {
      reorderedColumns.splice(newQuantityIndex, 1);
    }
    const afterProductNamesPos = reorderedColumns.indexOf("productName") + 1;
    reorderedColumns.splice(afterProductNamesPos, 0, "quantity");
  }

  const toggleExpandRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const renderCellContent = (row, column) => {
    if (!row) return "N/A";

    const value = row[column];

    if (value === null || value === undefined) {
      return "N/A";
    } else if (typeof value === "object") {
      return JSON.stringify(value);
    } else if (
      column === "desktopMedia" ||
      column === "mobileMedia" ||
      column === "frontAadharPhoto" ||
      column === "backAadharPhoto" ||
      column === "image" ||
      column === "icon"
    ) {
      const isVideo = value.match(/\.(mp4|webm|ogg)$/i) ||
        (typeof value === "string" && value.includes("data:video"));

      if (isVideo) {
        return (
          <video
            className={`${row.isSlider ? "w-150 h-50 rounded-md" : "w-15 h-15 rounded-full"
              } ${column === "desktopMedia"
                ? "w-220 h-30 rounded-md"
                : "w-15 h-15 rounded-full"
              } ${column === "mobileMedia"
                ? "w-90 h-45 rounded-md"
                : "w-15 h-15 rounded-full"
              } ${column === "icon" ? "rounded-md" : "w-15 h-15 rounded-full"
              } object-cover`}
            muted
            autoPlay
            loop
            playsInline
          >
            <source src={value} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      }

      return (
        <img
          src={
            value?.includes("/uploads")
              ? `${import.meta.env.VITE_API_URL}${value}`
              : value
          }
          alt={column}
          className={`${row.isSlider ? "w-150 h-50 rounded-md" : "w-15 h-15 rounded-full"
            } ${column === "desktopMedia"
              ? "w-220 h-30 rounded-md"
              : "w-15 h-15 rounded-full"
            } ${column === "frontAadharPhoto" || column === "backAadharPhoto"
              ? "w-220 h-30 rounded-md"
              : "w-15 h-15 rounded-full"
            } ${column === "mobileMedia"
              ? "w-90 h-45 rounded-md"
              : "w-15 h-15 rounded-full"
            } ${column === "icon" ? "rounded-md" : "w-15 h-15 rounded-full"
            } object-cover`}
        />
      );
    } else if (typeof value === "string" && value.startsWith("http")) {
      const isVideoLink = value.match(/\.(mp4|webm|ogg)$/i);

      if (isVideoLink) {
        return (
          <video
            controls
            className="w-32 h-24 rounded-md object-cover"
            muted
            playsInline
          >
            <source src={value} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
      }
      return (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-700"
        >
          <FaEye size={20} />
        </a>
      );
    } else if (
      column === "createdAt" ||
      column === "sentAt" ||
      column === "updatedAt" ||
      column === "orderDate"
    ) {
      return formatDate(value);
    } else if (
      column.toLowerCase() === "status" ||
      column.toLowerCase().includes("status")
    ) {
      return (
        <span
          className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(
            value || ""
          )}`}
        >
          {value || "N/A"}
        </span>
      );
    } else if (column === "productNames") {
      if (!value) return "N/A";

      const isExpanded = expandedRow === row._id || row.id;
      let displayValue = String(value);

      if (Array.isArray(value)) {
        displayValue = value.join(", ");
      }

      if (isExpanded) {
        return (
          <div className="relative">
            <div className="text-sm pb-6">{displayValue}</div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpandRow(row._id || row.id);
              }}
              className="absolute bottom-0 right-0 text-blue-500 hover:text-blue-700 text-xs"
            >
              Show less
            </button>
          </div>
        );
      }

      return (
        <div className="relative">
          <div className="text-sm truncate max-w-xs">
            {displayValue.length > 20
              ? displayValue.substring(0, 20) + "..."
              : displayValue}
          </div>
          {displayValue.length > 20 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpandRow(row._id || row.id);
              }}
              className="text-blue-500 hover:text-blue-700 text-xs"
            >
              Show more
            </button>
          )}
        </div>
      );
    }

    return String(value);
  };

  const hasActionColumn =
    Array.isArray(safeData) && safeData.some((row) => row && row.isAction);

  return (
    <div className="bg-white rounded-xl shadow-md">
      {safeData.length > 0 &&
        safeData[0] &&
        (safeData[0].isBanner ||
          safeData[0].isSlider ||
          safeData[0].isCoupon ||
          safeData[0].isInquiry ||
          safeData[0].isCategory ||
          safeData[0].isVariant ||
          safeData[0].isOrderStatus ||
          safeData[0].isPayment ||
          safeData[0].isShippingPartner ||
          safeData[0].isSocial ||
          safeData[0].isBrand ||
          safeData[0].isSubAdmin ||
          safeData[0].isInquiry ||
          safeData[0].isStock ||
          safeData[0].isEmail ||
          safeData[0].isUser) && (
          <div className="px-4 py-3 bg-gray-50 rounded-2xl border-gray-200 flex justify-between items-center">
            <div className="relative w-64 mx-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FaSearch className="text-gray-400 text-sm" />
              </div>
              <input
                type="text"
                className="block w-full font-medium pl-10 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                placeholder="Search table..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="flex space-x-4">
              <select
                className="block w-42 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
              <select
                className="block w-42 font-medium pl-3 pr-10 py-1.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                value={sortCriteria}
                onChange={handleSortChange}
              >
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="nameAtoZ">Name A-Z</option>
                <option value="nameZtoA">Name Z-A</option>
              </select>
            </div>
          </div>
        )}

      <div
        className={`overflow-x-auto rounded-xl w-full shadow-lg ${isOrderScroll ? "max-w-[1259px] table-responsive overflow-x-auto" : ""
          }`}
      >
        {isInvoiceOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 mt-15 z-[9999]">
            <div className="bg-white rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">ORDER INVOINCE</h2>
                <button
                  onClick={() => setIsInvoiceOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-6">
                {selectedInvoice && (
                  <ErrorBoundary>
                    <InvoiceComponent id={selectedInvoice} />
                  </ErrorBoundary>
                )}
              </div>
            </div>
          </div>
        )}

        <table className="bg-white border border-gray-200 rounded-xl w-full">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Sr No.</th>
              {reorderedColumns.map((column) => (
                <th key={column} className="py-3 px-6 text-left capitalize">
                  {column.replace(/([A-Z])/g, " $1").trim()}
                </th>
              ))}
              {hasActionColumn &&
                (canActive || canDelete || canEdit || canEmail || onEye) && (
                  <th className="py-3 px-6 text-left">Action</th>
                )}
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan={reorderedColumns.length + (hasActionColumn ? 2 : 1)}
                  className="py-4 px-6 text-center text-gray-500"
                >
                  No matching results found
                </td>
              </tr>
            ) : (
              currentItems.map((row, index) => (
                <tr
                  key={`${row?._id || `row-${indexOfFirstItem + index}`}-${index}`}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6">{indexOfFirstItem + index + 1}</td>
                  {reorderedColumns.map((column) => (
                    <td
                      key={column}
                      className={`py-3 px-6 ${isOrderScroll ? "whitespace-nowrap" : ""
                        }`}
                    >
                      {renderCellContent(row, column)}
                    </td>
                  ))}
                  {row?.isAction &&
                    hasActionColumn &&
                    (canActive || canDelete || canEdit || canEmail || onEye) && (
                      <td
                        className={`${row.image ? "py-8" : "py-3"} px-6 flex items-center space-x-3 ${row.isCoupon ||
                          row.isCategory ||
                          row.isOrderStatus ||
                          row.isPayment ||
                          row.isShippingPartner ||
                          row.isSocial ||
                          row.isBrand ||
                          row.isVariant ||
                          row.isSubAdmin ||
                          row.isInquiry ||
                          row.isOrders ||
                          row.isStock ||
                          row.isEmail ||
                          row.isUser
                          ? "my-2"
                          : row.isBanner
                            ? "my-[48%]"
                            : "my-[52%]"
                          }`}
                      >
                        {canEdit && (
                          <button
                            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-blue-100"
                            onClick={() =>
                              handleEdit(row.id || row._id || `row-${indexOfFirstItem + index}`)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                              />
                            </svg>
                          </button>
                        )}
                        {canDelete && (
                          <button
                            className="text-gray-600 hover:text-red-600 transition-colors duration-200 p-2 rounded-full hover:bg-red-100"
                            onClick={() =>
                              handleDelete(row.id || row._id || `row-${indexOfFirstItem + index}`)
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        )}
                        {/* {onEye && (
                          <td>
                            <button
                              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 p-2 rounded-full hover:bg-indigo-100"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleView(row._id || row.id);
                              }}
                            >
                              <FaEye className="h-5 w-5" />
                            </button>
                          </td>
                        )} */}
                        {onEye && (
                          <td>
                            <button
                              className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 p-2 rounded-full hover:bg-indigo-100"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleView(row._id || row.id);
                                // Trigger PDF download automatically
                                if (row._id || row.id) {
                                  const invoiceComponent = document.querySelector('.invoice-component');
                                  if (invoiceComponent) {
                                    invoiceComponent.downloadPdf();
                                  }
                                }
                              }}
                            >
                              <FaEye className="h-5 w-5" />
                            </button>
                          </td>
                        )}
                        {
                          canEmail && (
                            <button
                              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 p-2 rounded-full hover:bg-green-100"
                              onClick={() => {
                                setSelectedInquiry(row);
                                setIsEmailModalOpen(true);
                              }}
                            >
                              <FaEnvelope className="h-5 w-5" />
                            </button>
                          )
                        }
                        {canActive && (
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only peer"
                              checked={!!status[row._id || row.id || `row-${indexOfFirstItem + index}`]}
                              onChange={() =>
                                handleToggleStatus(row._id || row.id || `row-${indexOfFirstItem + index}`)
                              }
                            />
                            <div
                              className={`w-10 h-5 rounded-full relative transition-all ${status[row._id || row.id || `row-${indexOfFirstItem + index}`]
                                ? "bg-green-500"
                                : "bg-gray-300"
                                }`}
                            >
                              <div
                                className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${status[row._id || row.id || `row-${indexOfFirstItem + index}`]
                                  ? "left-6"
                                  : "left-1"
                                  }`}
                              ></div>
                            </div>
                          </label>
                        )}
                      </td>
                    )}
                </tr>
              ))
            )}
          </tbody>
        </table>

        {isEmailModalOpen && selectedInquiry && (
          <EmailModal
            inquiry={selectedInquiry}
            onClose={() => {
              setIsEmailModalOpen(false);
              setSelectedInquiry(null);
            }}
            onSend={sendEmail}
          />
        )}

        {/* Pagination Controls */}
        {filteredData.length > itemsPerPage && (
          <div className="flex justify-between items-center px-4 py-3 bg-gray-50 border-t border-gray-200">
            <div className="text-sm text-gray-700">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredData.length)} of{" "}
              {filteredData.length} entries
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
              >
                First
              </button>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${currentPage === 1
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
              >
                Previous
              </button>

              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => paginate(pageNum)}
                    className={`px-3 py-1 rounded-md ${currentPage === pageNum
                      ? "bg-blue-600 text-white"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
              >
                Next
              </button>
              <button
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${currentPage === totalPages
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
              >
                Last
              </button>
            </div>
          </div>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Table;