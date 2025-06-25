// import { useState } from "react";
// import { FaEnvelope } from "react-icons/fa";

// const EmailModal = ({ inquiry, onClose, onSend }) => {
//     const [emailData, setEmailData] = useState({
//         subject: `Re: ${inquiry.subject || "Your Inquiry"}`,
//         message: "",
//     });
//     const [isSending, setIsSending] = useState(false);
//     const [error, setError] = useState(null);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEmailData((prev) => ({ ...prev, [name]: value }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSending(true);
//         setError(null);

//         try {
//             await onSend({
//                 to: inquiry.email,
//                 subject: emailData.subject,
//                 text: emailData.message,
//                 inquiryId: inquiry._id,
//             });
//             onClose();
//         } catch (err) {
//             setError(err.message || "Failed to send email");
//         } finally {
//             setIsSending(false);
//         }
//     };

//     return (
//         <div className="fixed mt-20 inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
//             <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
//                 <div className="flex justify-between items-center p-4 border-b">
//                     <h2 className="text-xl font-bold">Reply to Inquiry</h2>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-500 hover:text-gray-700"
//                     >
//                         <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-6 w-6"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                         >
//                             <path
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth={2}
//                                 d="M6 18L18 6M6 6l12 12"
//                             />
//                         </svg>
//                     </button>
//                 </div>
//                 <form onSubmit={handleSubmit} className="p-6">
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-medium mb-2">
//                             To:
//                         </label>
//                         <input
//                             type="email"
//                             value={inquiry.email}
//                             readOnly
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
//                         />
//                     </div>
//                     <div className="mb-4">
//                         <label className="block text-gray-700 text-sm font-medium mb-2">
//                             Subject:
//                         </label>
//                         <input
//                             type="text"
//                             name="subject"
//                             value={emailData.subject}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     <div className="mb-6">
//                         <label className="block text-gray-700 text-sm font-medium mb-2">
//                             Message:
//                         </label>
//                         <textarea
//                             name="message"
//                             value={emailData.message}
//                             onChange={handleChange}
//                             rows="8"
//                             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             required
//                         />
//                     </div>
//                     {error && (
//                         <div className="mb-4 text-red-500 text-sm">{error}</div>
//                     )}
//                     <div className="flex justify-end space-x-3">
//                         <button
//                             type="button"
//                             onClick={onClose}
//                             className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
//                             disabled={isSending}
//                         >
//                             Cancel
//                         </button>
//                         <button
//                             type="submit"
//                             className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                             disabled={isSending}
//                         >
//                             {isSending ? "Sending..." : "Send Email"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default EmailModal;


import { motion } from "framer-motion";
import { useState } from "react";
import { FaEnvelope, FaFile } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";

const EmailModal = ({ inquiry, onClose, onSend }) => {
    console.log(inquiry);
    const [emailData, setEmailData] = useState({
        subject: `${inquiry.subject || "Your Inquiry"}`,
        message: "",
    });
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmailData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        setError(null);

        try {
            await onSend({
                to: inquiry.email,
                subject: emailData.subject,
                text: emailData.message,
                inquiryId: inquiry._id,
                mobile: inquiry.phone,
            });
            toast.success("Email sent successfully!", { className: "custom-toast" });
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (err) {
            setError(err.message || "Failed to send email");
            toast.error(err.message || "Failed to send email", { className: "custom-toast" });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
            {/* Blur backdrop covering entire screen */}
            <div 
                className="absolute inset-0 bg-opacity-30 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Centered modal content */}
            <div className="relative flex items-center justify-center h-full w-full p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white p-6 rounded-lg shadow-lg w-full max-w-[800px] border-t-[6px] border-[#F77F00] max-h-[90vh] flex flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold text-[#F77F00]">Reply to Inquiry</h2>
                        <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">
                            ✕
                        </button>
                    </div>

                    <div className="overflow-y-auto flex-1 pr-2">
                        {/* Email Field */}
                        <label className="block mb-2 font-medium text-[#0B0F19]">To: <span className="text-red-500">*</span></label>
                        <div className="relative w-full">
                            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
                            <input
                                type="email"
                                value={inquiry.email}
                                readOnly
                                className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00] bg-gray-100"
                            />
                        </div>

                        {/* Subject Field */}
                        <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Subject: <span className="text-red-500">*</span></label>
                        <div className="relative w-full">
                            <FaFile className="absolute left-3 top-3 text-gray-500" />
                            <input
                                type="text"
                                name="subject"
                                value={emailData.subject}
                                onChange={handleChange}
                                className="w-full pl-10 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                                required
                            />
                        </div>

                        {/* Message Field */}
                        <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Message: <span className="text-red-500">*</span></label>
                        <textarea
                            name="message"
                            value={emailData.message}
                            onChange={handleChange}
                            rows="8"
                            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-[#F77F00]"
                            required
                        />

                        {error && (
                            <div className="mt-3 text-red-500 text-sm">{error}</div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            onClick={onClose}
                            disabled={isSending}
                        >
                            Close
                        </button>
                        <button
                            className="bg-[#F77F00] text-white px-4 py-2 rounded hover:bg-[#d96d00]"
                            onClick={handleSubmit}
                            disabled={isSending}
                        >
                            {isSending ? "Sending..." : "Send Email"}
                        </button>
                    </div>
                </motion.div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EmailModal;