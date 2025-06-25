// import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { FaFileAlt, FaRupeeSign, FaPercent } from "react-icons/fa";
// import { addCoupon, fetchCoupons, updateCoupon } from "../../../redux/slices/Dashboard/Banner_Config/couponSlice";
// import { useDispatch } from "react-redux";

// const CouponModel = ({ onClose, isEdit, EditData }) => {
//     const [couponName, setCouponName] = useState("")
//     const [couponType, setCouponType] = useState("amount");
//     const [couponValue, setCouponValue] = useState("");
//     const [amountRange, setAmountRange] = useState("");
//     const [launchDate, setLaunchDate] = useState("");
//     const [expiryDate, setExpiryDate] = useState("");
//     const [maxUsage, setMaxUsage] = useState(1);

//     const dispatch = useDispatch()

//     // Fetch categories from Redux when component mounts
//     useEffect(() => {
//         dispatch(fetchCoupons());
//     }, [dispatch]);

//     // When editing, set the existing data in the form
//     useEffect(() => {
//         if (isEdit && EditData) {
//             setCouponName(EditData.name || "");
//             setCouponType(EditData.Type || "amount"); // Ensure correct key casing
//             setCouponValue(EditData.Value || ""); // Ensure correct key casing
//             setAmountRange(EditData.minAmount || ""); // Fix min_amount to match API response
//             setMaxUsage(EditData.maxUsage || 1);

//             // Handle dateDetail: Split it back into launchDate and expiryDate
//             if (EditData.dateDetail) {
//                 const dates = EditData.dateDetail.split(" To "); // Split by " To "
//                 if (dates.length === 2) {
//                     setLaunchDate(dates[0]); // Keep as YYYY-MM-DD (no need to reverse)
//                     setExpiryDate(dates[1]); // Keep as YYYY-MM-DD (no need to reverse)
//                 }
//             }
//         }
//     }, [isEdit, EditData]);


//     console.log(EditData)

//     const handleSubmit = async () => {
//         if (!couponName || !couponValue || !amountRange || !launchDate || !expiryDate) {
//             toast.error("Please fill all required fields!");
//             return;
//         }

//         const couponData = {
//             name: couponName,
//             type: couponType,
//             value: Number(couponValue),
//             min_amount: Number(amountRange),
//             dateDetail: `${launchDate} To ${expiryDate}`, // Concatenated date as a string
//             maxUsage: Number(maxUsage)
//         };

//         try {
//             if (isEdit && EditData) {
//                 // Update Coupon
//                 await dispatch(updateCoupon({ id: EditData._id, couponData: couponData })).unwrap();
//                 toast.success("Coupon updated successfully!", { autoClose: 200 });
//             } else {
//                 // Add Coupon
//                 await dispatch(addCoupon(couponData)).unwrap();
//                 toast.success("Coupon added successfully!", { autoClose: 200 });
//             }

//             dispatch(fetchCoupons());
//             setTimeout(() => {
//                 onClose(); // Close Modal after success
//             }, 1000);
//         } catch (error) {
//             console.error("Error saving coupon:", error);
//             toast.error("Failed to save coupon. Please try again.");
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
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold text-[#F77F00]">Coupon Form</h2>
//                     <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">✕</button>
//                 </div>

//                 <label className="block font-medium">Coupon Name <span className="text-red-500">*</span></label>
//                 <div className="relative w-full mb-3">
//                     <FaFileAlt className="absolute left-3 top-3 text-gray-500" />
//                     <input type="text" onChange={(e) => setCouponName(e.target.value)} value={couponName} className="w-full pl-10 p-2 border rounded" placeholder="Enter Coupon Name" />
//                 </div>

//                 <label className="block font-medium">Coupon Type <span className="text-red-500">*</span></label>
//                 <div className="flex gap-4 mb-3">
//                     <label className="flex items-center gap-2">
//                         <input type="radio" value="percentage" checked={couponType === "percentage"} onChange={() => setCouponType("percentage")} /> In Percentage
//                     </label>
//                     <label className="flex items-center gap-2">
//                         <input type="radio" value="amount" checked={couponType === "amount"} onChange={() => setCouponType("amount")} /> In Amount
//                     </label>
//                 </div>

//                 <label className="block font-medium">Coupon Value <span className="text-red-500">*</span></label>
//                 <div className="relative w-full mb-3">
//                     {couponType === "amount" ? <FaRupeeSign className="absolute left-3 top-3 text-gray-500" /> : <FaPercent className="absolute left-3 top-3 text-gray-500" />}
//                     <input type="number" className="w-full pl-10 p-2 border rounded" placeholder="Enter Value" value={couponValue} onChange={(e) => setCouponValue(e.target.value)} />
//                 </div>

//                 <label className="block font-medium">Coupon Amount Range <span className="text-red-500">*</span></label>
//                 <div className="relative w-full mb-3">
//                     <FaRupeeSign className="absolute left-3 top-3 text-gray-500" />
//                     <input type="number" className="w-full pl-10 p-2 border rounded" placeholder="Enter Amount" value={amountRange} onChange={(e) => setAmountRange(e.target.value)} />
//                 </div>

//                 <div className="flex gap-4 mb-3">
//                     <div className="w-1/2">
//                         <label className="block font-medium">Launch Date <span className="text-red-500">*</span></label>
//                         <input type="date" className="w-full p-2 border rounded" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} />
//                     </div>
//                     <div className="w-1/2">
//                         <label className="block font-medium">Expiry Date <span className="text-red-500">*</span></label>
//                         <input type="date" className="w-full p-2 border rounded" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
//                     </div>
//                 </div>

//                 <label className="block font-medium">Max Used Limit <span className="text-red-500">*</span></label>
//                 <input type="number" className="w-full p-2 border rounded mb-4" value={maxUsage} onChange={(e) => setMaxUsage(e.target.value)} />

//                 <div className="flex justify-end gap-2">
//                     <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={onClose}>Close</button>
//                     <button className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]" onClick={handleSubmit}>Confirm</button>
//                 </div>
//             </motion.div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default CouponModel;



import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFileAlt, FaRupeeSign, FaPercent, FaClock } from "react-icons/fa";
import { addCoupon, fetchCoupons, updateCoupon } from "../../../redux/slices/Dashboard/Banner_Config/couponSlice";
import { useDispatch } from "react-redux";

const CouponModel = ({ onClose, isEdit, EditData }) => {
    const [couponName, setCouponName] = useState("");
    const [couponType, setCouponType] = useState("amount");
    const [couponValue, setCouponValue] = useState("");
    const [amountRange, setAmountRange] = useState("");
    const [launchDate, setLaunchDate] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [maxUsage, setMaxUsage] = useState(1);
    const [timeRestriction, setTimeRestriction] = useState(false);
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("17:00");
    const [daysActive, setDaysActive] = useState({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: true,
        sunday: true
    });

    const dispatch = useDispatch();

    // Fetch categories from Redux when component mounts
    useEffect(() => {
        dispatch(fetchCoupons());
    }, [dispatch]);

    // When editing, set the existing data in the form
    useEffect(() => {
        if (isEdit && EditData) {
            setCouponName(EditData.name || "");
            setCouponType(EditData.Type || "amount");
            setCouponValue(EditData.Value || "");
            setAmountRange(EditData.minAmount || "");
            setMaxUsage(EditData.maxUsage || 1);

            // Handle time restrictions if they exist
            if (EditData.timeRestriction) {
                setTimeRestriction(true);

                const timeDetail = EditData.timeDetail.split(" To ");
                if (timeDetail.length === 2) {
                    setStartTime(timeDetail[0]);
                    setEndTime(timeDetail[1]);
                }

                if (EditData.daysActive) {
                    setDaysActive(EditData.daysActive);
                }
            }

            // Handle dateDetail
            if (EditData.dateDetail) {
                const dates = EditData.dateDetail.split(" To ");
                if (dates.length === 2) {
                    setLaunchDate(dates[0]);
                    setExpiryDate(dates[1]);
                }
            }
        }
    }, [isEdit, EditData]);

    const handleDayToggle = (day) => {
        setDaysActive(prev => ({
            ...prev,
            [day]: !prev[day]
        }));
    };

    const handleSubmit = async () => {
        if (!couponName || !couponValue || !amountRange || !launchDate || !expiryDate) {
            toast.error("Please fill all required fields!");
            return;
        }

        if (timeRestriction && startTime >= endTime) {
            toast.error("End time must be after start time!");
            return;
        }

        const couponData = {
            name: couponName,
            type: couponType,
            value: Number(couponValue),
            min_amount: Number(amountRange),
            dateDetail: `${launchDate} To ${expiryDate}`,
            maxUsage: Number(maxUsage),
            timeRestriction: timeRestriction,
            ...(timeRestriction && {
                timeDetail: `${startTime} To ${endTime}`,
                daysActive
            })
        };

        try {
            if (isEdit && EditData) {
                await dispatch(updateCoupon({ id: EditData._id, couponData: couponData })).unwrap();
                toast.success("Coupon updated successfully!", { autoClose: 200 });
            } else {
                await dispatch(addCoupon(couponData)).unwrap();
                toast.success("Coupon added successfully!", { autoClose: 200 });
            }

            dispatch(fetchCoupons());
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            console.error("Error saving coupon:", error);
            toast.error("Failed to save coupon. Please try again.");
        }
    };

    return (
        <div className="fixed mt-15 inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-6 rounded-lg shadow-lg w-[600px] border-t-[6px] border-[#F77F00] max-h-[90vh] overflow-y-auto"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#F77F00]">Coupon Form</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">✕</button>
                </div>
                <div className="overflow-y-auto flex-1 pr-2">
                    <label className="block font-medium">Coupon Name <span className="text-red-500">*</span></label>
                    <div className="relative w-full mb-3">
                        <FaFileAlt className="absolute left-3 top-3 text-gray-500" />
                        <input type="text" onChange={(e) => setCouponName(e.target.value)} value={couponName} className="w-full pl-10 p-2 border rounded" placeholder="Enter Coupon Name" />
                    </div>

                    <label className="block font-medium">Coupon Type <span className="text-red-500">*</span></label>
                    <div className="flex gap-4 mb-3">
                        <label className="flex items-center gap-2">
                            <input type="radio" value="percentage" checked={couponType === "percentage"} onChange={() => setCouponType("percentage")} /> In Percentage
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" value="amount" checked={couponType === "amount"} onChange={() => setCouponType("amount")} /> In Amount
                        </label>
                    </div>

                    <label className="block font-medium">Coupon Value <span className="text-red-500">*</span></label>
                    <div className="relative w-full mb-3">
                        {couponType === "amount" ? <FaRupeeSign className="absolute left-3 top-3 text-gray-500" /> : <FaPercent className="absolute left-3 top-3 text-gray-500" />}
                        <input type="number" className="w-full pl-10 p-2 border rounded" placeholder="Enter Value" value={couponValue} onChange={(e) => setCouponValue(e.target.value)} />
                    </div>

                    <label className="block font-medium">Coupon Amount Range <span className="text-red-500">*</span></label>
                    <div className="relative w-full mb-3">
                        <FaRupeeSign className="absolute left-3 top-3 text-gray-500" />
                        <input type="number" className="w-full pl-10 p-2 border rounded" placeholder="Enter Amount" value={amountRange} onChange={(e) => setAmountRange(e.target.value)} />
                    </div>

                    <div className="flex gap-4 mb-3">
                        <div className="w-1/2">
                            <label className="block font-medium">Launch Date <span className="text-red-500">*</span></label>
                            <input type="date" className="w-full p-2 border rounded" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} />
                        </div>
                        <div className="w-1/2">
                            <label className="block font-medium">Expiry Date <span className="text-red-500">*</span></label>
                            <input type="date" className="w-full p-2 border rounded" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                        </div>
                    </div>

                    <label className="block font-medium">Max Used Limit <span className="text-red-500">*</span></label>
                    <input type="number" className="w-full p-2 border rounded mb-4" value={maxUsage} onChange={(e) => setMaxUsage(e.target.value)} />

                    {/* Time Restriction Section */}
                    <div className="mb-4 p-3 border rounded">
                        <label className="flex items-center cursor-pointer gap-2 font-medium mb-2">
                            <input
                                type="checkbox"
                                className="cursor-pointer"
                                checked={timeRestriction}
                                onChange={() => setTimeRestriction(!timeRestriction)}
                            />
                            <span>Enable Time Restrictions</span>
                        </label>

                        {timeRestriction && (
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <FaClock className="text-gray-500" />
                                    <div className="flex items-center gap-2">
                                        <label>From:</label>
                                        <input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            className="p-1 border rounded"
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <label>To:</label>
                                        <input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            className="p-1 border rounded"
                                        />
                                    </div>
                                </div>

                                <div className="mt-2">
                                    <label className="block mb-2">Active Days:</label>
                                    <div className="flex flex-wrap gap-2">
                                        {Object.keys(daysActive).map(day => (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => handleDayToggle(day)}
                                                className={`px-3 py-1 rounded-full text-sm ${daysActive[day] ? 'bg-[#F77F00] text-white' : 'bg-gray-200 text-gray-700'}`}
                                            >
                                                {day.charAt(0).toUpperCase() + day.slice(1)}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end gap-2">
                        <button className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500" onClick={onClose}>Close</button>
                        <button className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]" onClick={handleSubmit}>Confirm</button>
                    </div>
                </div>
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default CouponModel;