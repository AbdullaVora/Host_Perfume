import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaLink, FaFile } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addSlider, fetchSliders, updateSlider } from "../../../redux/slices/Dashboard/Banner_Config/sliderSlice";
import { fetchCategories } from "../../../redux/slices/Dashboard/Product_Config/categorySlice";
import { fetchBrands } from "../../../redux/slices/Dashboard/Product_Config/brandSlice";


// const Model = ({ onClose, isEdit, EditData }) => {
//     const dispatch = useDispatch();
//     const { categories } = useSelector(state => state.categories);
//     const { brands } = useSelector(state => state.brand);

//     const [name, setName] = useState("");
//     const [forPage, setForPage] = useState("");
//     const [forSection, setForSection] = useState("");
//     const [relatedTo, setRelatedTo] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const [selectedSubcategory, setSelectedSubcategory] = useState("");
//     const [sliderLink, setSliderLink] = useState("");
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const [selectedBrand, setSelectedBrand] = useState("");

//     // const brandOptions = ["NewTech", "Inc.", "Tech"];
//     const sectionOptions = ["Testimonials", "Flash Deals", "Latest News"]

//     useEffect(() => {
//         dispatch(fetchCategories());
//         dispatch(fetchBrands());
//     }, [dispatch]);

//     // Set form values when EditData is available
//     useEffect(() => {
//         if (isEdit && EditData) {
//             setName(EditData.name || "");
//             setForPage(EditData.forPage || "");
//             setForSection(EditData.forSection || "");
//             setRelatedTo(EditData.relatedTo || "");
//             setSelectedCategory(EditData.sliderCategory || "");
//             setSelectedSubcategory(EditData.sliderSubcategory || "");
//             setSelectedBrand(EditData.bannerBrand || ""); // Load brand
//             setImageFile(EditData.image || "");
//             setSelectedImage(EditData.image || "");
//             setSliderLink(EditData.sliderLink || "");
//         }
//     }, [isEdit, EditData]);

//     const categoryOptions = categories.filter(cat => cat.parent === "N/A" && cat.status === true);
//     const subcategoryOptions = categories.filter(cat => cat.parent === selectedCategory);
//     const brandOptions = brands.filter(brand => brand.parent === selectedCategory && brand.status === true);

//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setSelectedImage(URL.createObjectURL(file));
//             setImageFile(file);
//         }
//     };

//     const convertToBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             if (typeof file === "string") {
//                 resolve(file); // If it's already a URL, return as is
//                 return;
//             }

//             if (!(file instanceof Blob)) {
//                 reject(new Error("Invalid file format"));
//                 return;
//             }

//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = (error) => reject(error);
//         });
//     };


//     const handleSubmit = async () => {
//         console.log("isEdit at submit:", isEdit);
//         console.log("EditData at submit:", EditData);

//         if (!name || !relatedTo || !selectedCategory || !sliderLink || !imageFile) {
//             toast.error("All fields are required!", { className: "custom-toast" });
//             return;
//         }

//         try {
//             let base64Image = imageFile;
//             if (imageFile instanceof File) {
//                 console.log("Converting image to base64...");
//                 base64Image = await convertToBase64(imageFile);
//             }

//             // console.log("Base64 image:", base64Image);

//             const payload = {
//                 name,
//                 relatedTo,
//                 forPage,
//                 forSection,
//                 category: selectedCategory,
//                 subcategory: selectedSubcategory,
//                 brand: selectedBrand,
//                 // sliderLink,
//                 image: base64Image,
//             };

//             // console.log("Payload:", payload);

//             if (isEdit && EditData) {
//                 // console.log("Dispatching updateSlider...");
//                 const response = await dispatch(updateSlider({ id: EditData._id, sliderData: payload })).unwrap();
//                 // console.log("Update Response:", response);

//                 if (response.error) {
//                     throw new Error(response.error.message || "Failed to update slider.");
//                 }

//                 toast.success("Slider updated successfully!", { className: "custom-toast" });
//             } else {
//                 // console.log("Dispatching addSlider...");
//                 const response = await dispatch(addSlider(payload)).unwrap();
//                 // console.log("Add Response:", response);

//                 if (response.error) {
//                     throw new Error(response.error.message || "Failed to add slider.");
//                 }

//                 toast.success("Slider added successfully!", { className: "custom-toast" });
//             }

//             dispatch(fetchSliders());
//             setTimeout(() => {
//                 onClose();
//             }, 1000)
//         } catch (error) {
//             console.error("Error caught in handleSubmit:", error);
//             toast.error(error.message || "An error occurred.", { className: "custom-toast" });
//         }
//     };


//     return (
//         <div className="fixed mt-10 inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
//             <motion.div className="bg-white p-6 rounded-lg shadow-lg w-[800px] border-t-[6px] border-[#F77F00]">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold text-[#F77F00]">{isEdit ? 'Edit' : 'Add New'} Slider</h2>
//                     <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">✕</button>
//                 </div>

//                 <label className="block mb-2 font-medium text-[#0B0F19]">Name *</label>
//                 <div className="relative w-full">
//                     <FaFile className="absolute left-3 top-3 text-gray-500" />
//                     <input type="text" className="w-full pl-10 p-2 border rounded" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
//                 </div>

//                 <div className="flex space-x-4 mt-3">
//                     <div className="w-1/2">
//                         <label className="block mb-2 font-medium text-[#0B0F19]">Related To *</label>
//                         <select className="w-full p-2 border rounded" value={relatedTo} onChange={(e) => setRelatedTo(e.target.value)}>
//                             <option value="">Select</option>
//                             <option value="Brand">Brand</option>
//                             <option value="Category">Category</option>
//                         </select>
//                     </div>
//                     <div className="w-1/2">
//                         <label className="block mb-2 font-medium text-[#0B0F19]">{relatedTo || "Select Related"} *</label>
//                         <select className="w-full p-2 border rounded" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                             <option value="">Select {relatedTo}</option>
//                             {relatedTo === "Category" && categoryOptions.map((cat, index) => (
//                                 <option key={index} value={cat.name}>{cat.name}</option>
//                             ))}
//                             {relatedTo === "Brand" &&
//                                 [...new Set(brands.map((brand) => brand.parent))]
//                                     .map((uniqueBrand, index) => (
//                                         <option key={index} value={uniqueBrand}>{uniqueBrand}</option>
//                                     ))
//                             }
//                         </select>
//                     </div>
//                 </div>

//                 {selectedCategory && relatedTo === "Category" && (
//                     <div className="mt-3">
//                         <label className="block mb-2 font-medium text-[#0B0F19]">Subcategory</label>
//                         <select className="w-full p-2 border rounded" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
//                             <option value="">Select Subcategory</option>
//                             {subcategoryOptions.map((sub, index) => (
//                                 <option key={index} value={sub.name}>{sub.name}</option>
//                             ))}
//                         </select>
//                     </div>
//                 )}

//                 {selectedCategory && relatedTo === "Brand" && (
//                     <div className="mt-3">
//                         <label className="block mb-2 font-medium text-[#0B0F19]">Brand  <span className="text-red-500">*</span></label>
//                         <select
//                             className="w-full p-2 border rounded"
//                             value={selectedBrand}
//                             onChange={(e) => setSelectedBrand(e.target.value)}
//                         >
//                             <option value="">Select Brand</option>
//                             {brandOptions.map((brand, index) => (
//                                 <option key={index} value={brand.name}>{brand.name}</option>
//                             ))}
//                         </select>
//                     </div>
//                 )}

//                 <div className="flex space-x-4 mt-3">
//                     <div className="w-1/2">
//                         <label className="block mb-2 font-medium text-[#0B0F19]">For Which Page *</label>
//                         <div className="relative w-full">
//                             <FaFile className="absolute left-3 top-3 text-gray-500" />
//                             <input type="text" className="w-full pl-10 p-2 border rounded" placeholder="Enter Which Page" value={forPage} onChange={(e) => setForPage(e.target.value)} />
//                         </div>
//                     </div>
//                     <div className="w-1/2">
//                         <label className="block mb-2 font-medium text-[#0B0F19]">For Which Section *</label>
//                         <div className="relative w-full">
//                             <FaFile className="absolute left-3 top-3 text-gray-500" />
//                             <input type="text" className="w-full pl-10 p-2 border rounded" placeholder="Enter Which Section" value={forSection} onChange={(e) => setForSection(e.target.value)} />
//                         </div>
//                     </div>
//                 </div>

//                 {/* <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Slider Link *</label>
//                 <div className="relative w-full">
//                     <FaLink className="absolute left-3 top-3 text-gray-500" />
//                     <input type="url" className="w-full pl-10 p-2 border rounded" placeholder="Enter URL" value={sliderLink} onChange={(e) => setSliderLink(e.target.value)} />
//                 </div> */}

//                 <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Slider Image *</label>
//                 <div className="w-full border rounded p-3 flex justify-center items-center cursor-pointer" onClick={() => document.getElementById("imageUpload").click()}>
//                     {selectedImage ? <img src={selectedImage} alt="Uploaded" className="w-40 h-30 object-cover" /> : <div className="text-gray-500">Click to Select Image</div>}
//                 </div>
//                 <input type="file" id="imageUpload" className="hidden" onChange={handleImageUpload} />

//                 <div className="flex justify-end space-x-2 mt-4">
//                     <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
//                     <button className="bg-[#F77F00] text-white px-4 py-2 rounded" onClick={handleSubmit}>{isEdit ? 'Update' : 'Confirm'}</button>
//                 </div>
//             </motion.div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Model;

// const Model = ({ onClose, isEdit, EditData }) => {
//     const dispatch = useDispatch();
//     const { categories } = useSelector(state => state.categories);
//     const { brands } = useSelector(state => state.brand);

//     const [name, setName] = useState("");
//     const [forPage, setForPage] = useState("");
//     const [forSection, setForSection] = useState("");
//     const [relatedTo, setRelatedTo] = useState("");
//     const [selectedCategory, setSelectedCategory] = useState("");
//     const [selectedSubcategory, setSelectedSubcategory] = useState("");
//     const [sliderLink, setSliderLink] = useState("");
//     const [selectedImage, setSelectedImage] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const [selectedBrand, setSelectedBrand] = useState("");
//     const [title, setTitle] = useState("");
//     const [subTitle, setSubTitle] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const [publisherName, setPublisherName] = useState("");

//     const sectionOptions = [{ Home: ["Banner", "Testimonials", "Flash Deals", "Latest News"] }, { Collection: ["Banner", "products"] }, { Blog: ["Banner", "Blogs"] }, { About: ["Banner", "Main"] }];
//     const pageOptions = ["Home", "Collection", "Blog", "About"];

//     useEffect(() => {
//         dispatch(fetchCategories());
//         dispatch(fetchBrands());
//     }, [dispatch]);

//     useEffect(() => {
//         if (isEdit && EditData) {
//             setName(EditData.name || "");
//             setForPage(EditData.forPage || "");
//             setForSection(EditData.forSection || "");
//             setRelatedTo(EditData.relatedTo || "");
//             setSelectedCategory(EditData.sliderCategory || "");
//             setSelectedSubcategory(EditData.sliderSubcategory || "");
//             setSelectedBrand(EditData.bannerBrand || "");
//             setImageFile(EditData.image || "");
//             setSelectedImage(EditData.image || "");
//             // setSliderLink(EditData.sliderLink || "");

//             if (EditData.forSection === "Testimonials") {
//                 setTitle(EditData.title || "");
//                 setSubTitle(EditData.subTitle || "");
//                 setDescription(EditData.description || "");
//             } else if (EditData.forSection === "Flash Deals") {
//                 setTitle(EditData.title || "");
//                 setPrice(EditData.price || "");
//             } else if (EditData.forSection === "Latest News") {
//                 setDescription(EditData.description || "");
//                 setPublisherName(EditData.publisherName || "");
//             }
//         }
//     }, [isEdit, EditData]);

//     const categoryOptions = categories.filter(cat => cat.parent === "N/A" && cat.status === true);
//     const subcategoryOptions = categories.filter(cat => cat.parent === selectedCategory);
//     const brandOptions = brands.filter(brand => brand.parent === selectedCategory && brand.status === true);

//     const handleImageUpload = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             setSelectedImage(URL.createObjectURL(file));
//             setImageFile(file);
//         }
//     };

//     const convertToBase64 = (file) => {
//         return new Promise((resolve, reject) => {
//             if (typeof file === "string") {
//                 resolve(file);
//                 return;
//             }

//             if (!(file instanceof Blob)) {
//                 reject(new Error("Invalid file format"));
//                 return;
//             }

//             const reader = new FileReader();
//             reader.readAsDataURL(file);
//             reader.onload = () => resolve(reader.result);
//             reader.onerror = (error) => reject(error);
//         });
//     };

//     const handleSectionChange = (value) => {
//         setForSection(value);
//         setTitle("");
//         setSubTitle("");
//         setDescription("");
//         setPrice("");
//         setPublisherName("");
//     };

//     const handleSubmit = async () => {
//         if (!name || !relatedTo || !selectedCategory || !imageFile) {
//             toast.error("All fields are required!", { className: "custom-toast" });
//             return;
//         }

//         if (forSection === "Testimonials" && (!subTitle || !title || !description)) {
//             toast.error("Subname and Description are required for Testimonials!", { className: "custom-toast" });
//             return;
//         } else if (forSection === "Flash Deals" && !price) {
//             toast.error("Price is required for Flash Deals!", { className: "custom-toast" });
//             return;
//         } else if (forSection === "Latest News" && (!description || !publisherName)) {
//             toast.error("Description and Publisher Name are required for Latest News!", { className: "custom-toast" });
//             return;
//         }

//         try {
//             let base64Image = imageFile;
//             if (imageFile instanceof File) {
//                 base64Image = await convertToBase64(imageFile);
//             }

//             const payload = {
//                 name,
//                 relatedTo,
//                 forPage,
//                 forSection,
//                 category: selectedCategory,
//                 subcategory: selectedSubcategory,
//                 brand: selectedBrand,
//                 image: base64Image,
//                 ...(forSection === "Testimonials" && { title, subTitle, description }),
//                 ...(forSection === "Flash Deals" && { title, price }),
//                 ...(forSection === "Latest News" && { title, description, publisherName }),
//             };

//             // console.log("Payload:", payl  oad);

//             if (isEdit && EditData) {
//                 const response = await dispatch(updateSlider({ id: EditData._id, sliderData: payload })).unwrap();
//                 if (response.error) {
//                     throw new Error(response.error.message || "Failed to update slider.");
//                 }
//                 toast.success("Slider updated successfully!", { className: "custom-toast" });
//             } else {
//                 const response = await dispatch(addSlider(payload)).unwrap();
//                 if (response.error) {
//                     throw new Error(response.error.message || "Failed to add slider.");
//                 }
//                 toast.success("Slider added successfully!", { className: "custom-toast" });
//             }

//             dispatch(fetchSliders());
//             setTimeout(() => {
//                 onClose();
//             }, 1000)
//         } catch (error) {
//             console.error("Error caught in handleSubmit:", error);
//             toast.error(error.message || "An error occurred.", { className: "custom-toast" });
//         }
//     };

//     return (
//         <div className="fixed mt-20 inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
//             <motion.div className="bg-white p-6 rounded-lg shadow-lg w-[800px] border-t-[6px] border-[#F77F00] max-h-[90vh] flex flex-col">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold text-[#F77F00]">{isEdit ? 'Edit' : 'Add New'} Slider</h2>
//                     <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">✕</button>
//                 </div>

//                 <div className="overflow-y-auto flex-1 pr-2">
//                     <label className="block mb-2 font-medium text-[#0B0F19]">Name *</label>
//                     <div className="relative w-full">
//                         <FaFile className="absolute left-3 top-3 text-gray-500" />
//                         <input type="text" className="w-full pl-10 p-2 border rounded" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
//                     </div>

//                     <div className="flex space-x-4 mt-3">
//                         <div className="w-1/2">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">Related To *</label>
//                             <select className="w-full p-2 border rounded" value={relatedTo} onChange={(e) => setRelatedTo(e.target.value)}>
//                                 <option value="">Select</option>
//                                 <option value="Brand">Brand</option>
//                                 <option value="Category">Category</option>
//                             </select>
//                         </div>
//                         <div className="w-1/2">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">{relatedTo || "Select Related"} *</label>
//                             <select className="w-full p-2 border rounded" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
//                                 <option value="">Select {relatedTo}</option>
//                                 {relatedTo === "Category" && categoryOptions.map((cat, index) => (
//                                     <option key={index} value={cat.name}>{cat.name}</option>
//                                 ))}
//                                 {relatedTo === "Brand" &&
//                                     [...new Set(brands.map((brand) => brand.parent))]
//                                         .map((uniqueBrand, index) => (
//                                             <option key={index} value={uniqueBrand}>{uniqueBrand}</option>
//                                         ))
//                                 }
//                             </select>
//                         </div>
//                     </div>

//                     {selectedCategory && relatedTo === "Category" && (
//                         <div className="mt-3">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">Subcategory</label>
//                             <select className="w-full p-2 border rounded" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
//                                 <option value="">Select Subcategory</option>
//                                 {subcategoryOptions.map((sub, index) => (
//                                     <option key={index} value={sub.name}>{sub.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     )}

//                     {selectedCategory && relatedTo === "Brand" && (
//                         <div className="mt-3">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">Brand  <span className="text-red-500">*</span></label>
//                             <select
//                                 className="w-full p-2 border rounded"
//                                 value={selectedBrand}
//                                 onChange={(e) => setSelectedBrand(e.target.value)}
//                             >
//                                 <option value="">Select Brand</option>
//                                 {brandOptions.map((brand, index) => (
//                                     <option key={index} value={brand.name}>{brand.name}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     )}

//                     <div className="flex space-x-4 mt-3">
//                         <div className="w-1/2">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">For Which Page *</label>
//                             <div className="relative w-full">
//                                 <FaFile className="absolute left-3 top-3 text-gray-500" />
//                                 <input type="text" className="w-full pl-10 p-2 border rounded" placeholder="Enter Which Page" value={forPage} onChange={(e) => setForPage(e.target.value)} />
//                             </div>
//                         </div>
//                         <div className="w-1/2">
//                             <label className="block mb-2 font-medium text-[#0B0F19]">For Which Section *</label>
//                             <select
//                                 className="w-full p-2 border rounded"
//                                 value={forSection}
//                                 onChange={(e) => handleSectionChange(e.target.value)}
//                             >
//                                 <option value="">Select Section</option>
//                                 {sectionOptions.map((section, index) => (
//                                     <option key={index} value={section}>{section}</option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>

//                     {forSection === "Testimonials" && (
//                         <>
//                             <div className="flex space-x-3">
//                                 <div className="mt-3 w-1/2">
//                                     <label className="block mb-2 font-medium text-[#0B0F19]">Title *</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border rounded"
//                                         placeholder="Enter Title"
//                                         value={title}
//                                         onChange={(e) => setTitle(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="mt-3 w-1/2">
//                                     <label className="block mb-2 font-medium text-[#0B0F19]">Sub Title *</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border rounded"
//                                         placeholder="Enter SubTitle"
//                                         value={subTitle}
//                                         onChange={(e) => setSubTitle(e.target.value)}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="mt-3">
//                                 <label className="block mb-2 font-medium text-[#0B0F19]">Description *</label>
//                                 <textarea
//                                     className="w-full p-2 border rounded"
//                                     placeholder="Enter Description"
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                     rows="3"
//                                 />
//                             </div>
//                         </>
//                     )}

//                     {forSection === "Flash Deals" && (
//                         <div className="flex space-x-3">
//                             <div className="mt-3 w-1/2">
//                                 <label className="block mb-2 font-medium text-[#0B0F19]">Title *</label>
//                                 <input
//                                     type="text"
//                                     className="w-full p-2 border rounded"
//                                     placeholder="Enter Title"
//                                     value={title}
//                                     onChange={(e) => setTitle(e.target.value)}
//                                 />
//                             </div>
//                             <div className="mt-3 w-1/2">
//                                 <label className="block mb-2 font-medium text-[#0B0F19]">Price *</label>
//                                 <input
//                                     type="text"
//                                     className="w-full p-2 border rounded"
//                                     placeholder="Enter Price"
//                                     value={price}
//                                     onChange={(e) => setPrice(e.target.value)}
//                                 />
//                             </div>
//                         </div>
//                     )}

//                     {forSection === "Latest News" && (
//                         <>
//                             <div className="flex space-x-4 mt-3">
//                                 <div className="w-1/2">
//                                     <label className="block mb-2 font-medium text-[#0B0F19]">Title *</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border rounded"
//                                         placeholder="Enter Title"
//                                         value={title}
//                                         onChange={(e) => setTitle(e.target.value)}
//                                     />
//                                 </div>
//                                 <div className="w-1/2">
//                                     <label className="block mb-2 font-medium text-[#0B0F19]">Publisher Name *</label>
//                                     <input
//                                         type="text"
//                                         className="w-full p-2 border rounded"
//                                         placeholder="Enter Publisher Name"
//                                         value={publisherName}
//                                         onChange={(e) => setPublisherName(e.target.value)}
//                                     />
//                                 </div>
//                             </div>
//                             <div className="mt-3">
//                                 <label className="block mb-2 font-medium text-[#0B0F19]">Description *</label>
//                                 <textarea
//                                     className="w-full p-2 border rounded"
//                                     placeholder="Enter Description"
//                                     value={description}
//                                     onChange={(e) => setDescription(e.target.value)}
//                                     rows="3"
//                                 />
//                             </div>
//                         </>

//                     )}

//                     <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Slider Image *</label>
//                     <div className="w-full border rounded p-3 flex justify-center items-center cursor-pointer mb-4" onClick={() => document.getElementById("imageUpload").click()}>
//                         {selectedImage ? <img src={selectedImage} alt="Uploaded" className="w-40 h-30 object-cover" /> : <div className="text-gray-500">Click to Select Image</div>}
//                     </div>
//                     <input type="file" id="imageUpload" className="hidden" onChange={handleImageUpload} />
//                 </div>

//                 <div className="flex justify-end space-x-2 mt-4 pt-4">
//                     <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
//                     <button className="bg-[#F77F00] text-white px-4 py-2 rounded" onClick={handleSubmit}>{isEdit ? 'Update' : 'Confirm'}</button>
//                 </div>
//             </motion.div>
//             <ToastContainer />
//         </div>
//     );
// };

// export default Model;

const Model = ({ onClose, isEdit, EditData }) => {
    const dispatch = useDispatch();
    const { categories } = useSelector(state => state.categories);
    const { brands } = useSelector(state => state.brand);

    const [name, setName] = useState("");
    const [forPage, setForPage] = useState("");
    const [forSection, setForSection] = useState("");
    const [relatedTo, setRelatedTo] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSubcategory, setSelectedSubcategory] = useState("");
    const [sliderLink, setSliderLink] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [selectedBrand, setSelectedBrand] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [publisherName, setPublisherName] = useState("");

    // Define page and section options
    const pageSectionMap = {
        Home: ["Testimonials", "Flash Deals", "Latest News"],
        // Collection: ["Banner", "Products"],
        // Blog: ["Banner", "Blogs"],
        // About: ["Banner", "Main"]
    };

    const pageOptions = Object.keys(pageSectionMap);

    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchBrands());
    }, [dispatch]);

    useEffect(() => {
        if (isEdit && EditData) {
            setName(EditData.name || "");
            setForPage(EditData.forPage || "");
            setForSection(EditData.forSection || "");
            setRelatedTo(EditData.relatedTo || "");
            setSelectedCategory(EditData.sliderCategory || "");
            setSelectedSubcategory(EditData.sliderSubcategory || "");
            setSelectedBrand(EditData.bannerBrand || "");
            setImageFile(EditData.image || "");
            setSelectedImage(EditData.image || "");

            if (EditData.forSection === "Testimonials") {
                setTitle(EditData.title || "");
                setSubTitle(EditData.subTitle || "");
                setDescription(EditData.description || "");
            } else if (EditData.forSection === "Flash Deals") {
                setTitle(EditData.title || "");
                setPrice(EditData.price || "");
            } else if (EditData.forSection === "Latest News") {
                setTitle(EditData.title || "")
                setDescription(EditData.description || "");
                setPublisherName(EditData.publisherName || "");
            }
        }
    }, [isEdit, EditData]);

    const categoryOptions = categories.filter(cat => cat.parent === "N/A" && cat.status === true);
    const subcategoryOptions = categories.filter(cat => cat.parent === selectedCategory);
    const brandOptions = brands.filter(brand => brand.parent === selectedCategory && brand.status === true);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
            setImageFile(file);
        }
    };

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            if (typeof file === "string") {
                resolve(file);
                return;
            }

            if (!(file instanceof Blob)) {
                reject(new Error("Invalid file format"));
                return;
            }

            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handlePageChange = (value) => {
        setForPage(value);
        setForSection(""); // Reset section when page changes
    };

    const handleSectionChange = (value) => {
        setForSection(value);
        // Reset section-specific fields when section changes
        setTitle("");
        setSubTitle("");
        setDescription("");
        setPrice("");
        setPublisherName("");
    };

    const getSectionOptions = () => {
        return forPage ? pageSectionMap[forPage] || [] : [];
    };

    const handleSubmit = async () => {
        if (!name || !relatedTo || !selectedCategory || !imageFile || !forPage || !forSection) {
            toast.error("All required fields must be filled!", { className: "custom-toast" });
            return;
        }

        if (forSection === "Testimonials" && (!subTitle || !title || !description)) {
            toast.error("Subname and Description are required for Testimonials!", { className: "custom-toast" });
            return;
        } else if (forSection === "Flash Deals" && !price) {
            toast.error("Price is required for Flash Deals!", { className: "custom-toast" });
            return;
        } else if (forSection === "Latest News" && (!description || !publisherName)) {
            toast.error("Description and Publisher Name are required for Latest News!", { className: "custom-toast" });
            return;
        }

        try {
            let base64Image = imageFile;
            if (imageFile instanceof File) {
                base64Image = await convertToBase64(imageFile);
            }

            const payload = {
                name,
                relatedTo,
                forPage,
                forSection,
                category: selectedCategory,
                subcategory: selectedSubcategory,
                brand: selectedBrand,
                image: base64Image,
                ...(forSection === "Testimonials" && { title, subTitle, description }),
                ...(forSection === "Flash Deals" && { title, price }),
                ...(forSection === "Latest News" && { title, description, publisherName }),
            };

            if (isEdit && EditData) {
                const response = await dispatch(updateSlider({ id: EditData._id, sliderData: payload })).unwrap();
                if (response.error) {
                    throw new Error(response.error.message || "Failed to update slider.");
                }
                toast.success("Slider updated successfully!", { className: "custom-toast" });
            } else {
                const response = await dispatch(addSlider(payload)).unwrap();
                if (response.error) {
                    throw new Error(response.error.message || "Failed to add slider.");
                }
                toast.success("Slider added successfully!", { className: "custom-toast" });
            }

            dispatch(fetchSliders());
            setTimeout(() => {
                onClose();
            }, 1000);
        } catch (error) {
            console.error("Error caught in handleSubmit:", error);
            toast.error(error.message || "An error occurred.", { className: "custom-toast" });
        }
    };

    return (
        <div className="fixed mt-20 inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
            <motion.div className="bg-white p-6 rounded-lg shadow-lg w-[800px] border-t-[6px] border-[#F77F00] max-h-[90vh] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-[#F77F00]">{isEdit ? 'Edit' : 'Add New'} Slider</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800 text-lg">✕</button>
                </div>

                <div className="overflow-y-auto flex-1 pr-2">
                    <label className="block mb-2 font-medium text-[#0B0F19]">Name *</label>
                    <div className="relative w-full">
                        <FaFile className="absolute left-3 top-3 text-gray-500" />
                        <input type="text" className="w-full pl-10 p-2 border rounded" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>

                    <div className="flex space-x-4 mt-3">
                        <div className="w-1/2">
                            <label className="block mb-2 font-medium text-[#0B0F19]">Related To *</label>
                            <select className="w-full p-2 border rounded" value={relatedTo} onChange={(e) => setRelatedTo(e.target.value)}>
                                <option value="">Select</option>
                                <option value="Brand">Brand</option>
                                <option value="Category">Category</option>
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block mb-2 font-medium text-[#0B0F19]">{relatedTo || "Select Related"} *</label>
                            <select className="w-full p-2 border rounded" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                                <option value="">Select {relatedTo}</option>
                                {relatedTo === "Category" && categoryOptions.map((cat, index) => (
                                    <option key={index} value={cat.name}>{cat.name}</option>
                                ))}
                                {relatedTo === "Brand" &&
                                    [...new Set(brands.map((brand) => brand.parent))]
                                        .map((uniqueBrand, index) => (
                                            <option key={index} value={uniqueBrand}>{uniqueBrand}</option>
                                        ))
                                }
                            </select>
                        </div>
                    </div>

                    {selectedCategory && relatedTo === "Category" && (
                        <div className="mt-3">
                            <label className="block mb-2 font-medium text-[#0B0F19]">Subcategory</label>
                            <select className="w-full p-2 border rounded" value={selectedSubcategory} onChange={(e) => setSelectedSubcategory(e.target.value)}>
                                <option value="">Select Subcategory</option>
                                {subcategoryOptions.map((sub, index) => (
                                    <option key={index} value={sub.name}>{sub.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    {selectedCategory && relatedTo === "Brand" && (
                        <div className="mt-3">
                            <label className="block mb-2 font-medium text-[#0B0F19]">Brand *</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={selectedBrand}
                                onChange={(e) => setSelectedBrand(e.target.value)}
                            >
                                <option value="">Select Brand</option>
                                {brandOptions.map((brand, index) => (
                                    <option key={index} value={brand.name}>{brand.name}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="flex space-x-4 mt-3">
                        <div className="w-1/2">
                            <label className="block mb-2 font-medium text-[#0B0F19]">For Which Page *</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={forPage}
                                onChange={(e) => handlePageChange(e.target.value)}
                            >
                                <option value="">Select Page</option>
                                {pageOptions.map((page, index) => (
                                    <option key={index} value={page}>{page}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-1/2">
                            <label className="block mb-2 font-medium text-[#0B0F19]">For Which Section *</label>
                            <select
                                className="w-full p-2 border rounded"
                                value={forSection}
                                onChange={(e) => handleSectionChange(e.target.value)}
                                disabled={!forPage}
                            >
                                <option value="">Select Section</option>
                                {getSectionOptions().map((section, index) => (
                                    <option key={index} value={section}>{section}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {forSection === "Testimonials" && (
                        <>
                            <div className="flex space-x-3">
                                <div className="mt-3 w-1/2">
                                    <label className="block mb-2 font-medium text-[#0B0F19]">Title *</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="mt-3 w-1/2">
                                    <label className="block mb-2 font-medium text-[#0B0F19]">Sub Title *</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter SubTitle"
                                        value={subTitle}
                                        onChange={(e) => setSubTitle(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-3">
                                <label className="block mb-2 font-medium text-[#0B0F19]">Description *</label>
                                <textarea
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="3"
                                />
                            </div>
                        </>
                    )}

                    {forSection === "Flash Deals" && (
                        <div className="flex space-x-3">
                            <div className="mt-3 w-1/2">
                                <label className="block mb-2 font-medium text-[#0B0F19]">Title *</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="mt-3 w-1/2">
                                <label className="block mb-2 font-medium text-[#0B0F19]">Price *</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                    )}

                    {forSection === "Latest News" && (
                        <>
                            <div className="flex space-x-4 mt-3">
                                <div className="w-1/2">
                                    <label className="block mb-2 font-medium text-[#0B0F19]">Title *</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter Title"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>
                                <div className="w-1/2">
                                    <label className="block mb-2 font-medium text-[#0B0F19]">Publisher Name *</label>
                                    <input
                                        type="text"
                                        className="w-full p-2 border rounded"
                                        placeholder="Enter Publisher Name"
                                        value={publisherName}
                                        onChange={(e) => setPublisherName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mt-3">
                                <label className="block mb-2 font-medium text-[#0B0F19]">Description *</label>
                                <textarea
                                    className="w-full p-2 border rounded"
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows="3"
                                />
                            </div>
                        </>
                    )}

                    <label className="block mb-2 font-medium text-[#0B0F19] mt-3">Slider Image *</label>
                    <div className="w-full border rounded p-3 flex justify-center items-center cursor-pointer mb-4" onClick={() => document.getElementById("imageUpload").click()}>
                        {selectedImage ? <img src={selectedImage} alt="Uploaded" className="w-40 h-30 object-cover" /> : <div className="text-gray-500 text-center">
                            <img src="https://cdn-icons-png.flaticon.com/512/126/126477.png"
                                alt="Upload"
                                className="w-16 h-16 mx-auto mb-2 opacity-60" />
                            Click For Select Image
                        </div>}
                    </div>
                    <input type="file" id="imageUpload" className="hidden" onChange={handleImageUpload} />
                </div>

                <div className="flex justify-end space-x-2 mt-4 pt-4">
                    <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>Close</button>
                    <button className="bg-[#F77F00] text-white px-4 py-2 rounded" onClick={handleSubmit}>{isEdit ? 'Update' : 'Confirm'}</button>
                </div>
            </motion.div>
            <ToastContainer />
        </div>
    );
};

export default Model;
