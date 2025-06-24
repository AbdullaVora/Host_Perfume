import React, { useState, useEffect } from 'react';
import { FaCameraRetro, FaPlay, FaRupeeSign } from 'react-icons/fa';
import { BiPackage } from 'react-icons/bi';
import { LuPackagePlus } from 'react-icons/lu';
import { IoMdClose } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../redux/slices/Dashboard/Product_Config/categorySlice';
import { fetchVariants } from '../../../redux/slices/Dashboard/Product_Config/variantsSlice';
import { createProduct, fetchProducts, updateProduct } from '../../../redux/slices/Dashboard/product/productSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { fetchBrands } from '../../../redux/slices/Dashboard/Product_Config/brandSlice';

const Addproduct = () => {
  // State for general info
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [skuCode, setSkuCode] = useState('');
  // const [brand, setBrand] = useState('');
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedBrandCategory, setSelectedBrandCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [main, setMain] = useState(null);
  const [description, setDescription] = useState('');
  const [forPage, setForPage] = useState(null);
  const [forSection, setForSection] = useState(null);
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [metaKeywords, setMetaKeywords] = useState('');

  // State for details and additional rows
  const [details, setDetails] = useState([{ title: '', value: '' }]);
  const [additional, setAdditional] = useState([{ title: '', value: '' }]);

  // State for images
  const [images, setImages] = useState([]);

  // State for videos
  const [videos, setVideos] = useState([]);
  const [mainVideo, setMainVideo] = useState(null);

  // State for inventory and pricing
  const [mrp, setMrp] = useState(0);
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [stockManagement, setStockManagement] = useState(false);
  const [editData, setEditData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();
  const params = useParams();

  // Fetch categories and variants from Redux store
  const { categories } = useSelector((state) => state.categories);
  const { variants } = useSelector((state) => state.variants);
  const { products } = useSelector((state) => state.products);
  const { brands } = useSelector((state) => state.brand);

  // Define page and section options
  const pageSectionMap = {
    Home: ["New Arrival", "Our Products", "Flash Deals"],
    Collection: ["Products"],
    // Blog: ["Banner", "Blogs"],
    // About: ["Banner", "Main"]
  };

  const pageOptions = Object.keys(pageSectionMap);

  const handlePageChange = (value) => {
    setForPage(value);
    setForSection(""); // Reset section when page changes
  };

  const handleSectionChange = (value) => {
    setForSection(value);
  }

  const getSectionOptions = () => {
    console.log(forPage)
    return forPage ? pageSectionMap[forPage] || [] : [];
  };

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchVariants());
    dispatch(fetchProducts());
    dispatch(fetchBrands());
  }, [dispatch]);

  useEffect(() => {
    if (params.id) {
      fetchEditData(params.id);
    }
  }, [params.id, products]);

  const fetchEditData = (id) => {
    const data = products.find((product) => product._id === id);

    if (data) {
      console.log(data, "data")
      setEditData(data);
      setIsEditing(true);
      populateFormData(data);
    }
  };

  // const populateFormData = (data) => {
  //   console.log(data)
  //   setName(data.name || '');
  //   setSlug(data.slug || '');
  //   setBrand(data.brand || '');
  //   setSkuCode(data.skuCode || '');
  //   setSelectedCategory(data.category.name || '');
  //   setSelectedSubcategory(data.subcategory.name || '');
  //   setDescription(data.description || '');
  //   setDetails(data.details?.length > 0 ? setDetails.title  = data.details.title : [{ title: '', value: '' }]);
  //   setAdditional(data.additional?.length > 0 ? data.additional : [{ title: '', value: '' }]);
  //   setMrp(data.mrp || 0);
  //   setPrice(data.price || 0);
  //   setDiscount(data.discount || 0);
  //   setStockManagement(data.stockManagement || false);
  //   setThumbnail(data.thumbnail || null);
  //   setImages(data.images || []);

  //   // Set variants if they exist
  //   if (data.variants && data.variants.length > 0) {
  //     setSelectedVariants(data.variants.map(variant => ({
  //       ...variant,
  //       id: variant.id || new Date().getTime().toString() // Ensure each variant has an ID
  //     })));
  //   }
  // };

  // State for variants

  const populateFormData = (data) => {
    console.log(data)
    setName(data?.name || '');
    setSlug(data?.slug || '');
    setSkuCode(data?.skuCode || '');
    setSelectedCategory(data?.category?.name || '');
    setSelectedBrandCategory(data?.brandCategory?.name || '');
    setForPage(data?.forPage || '');
    setForSection(data?.forSection || '');
    setSelectedBrand(data?.brand?.name || ''); // Load brand
    setSelectedSubcategory(data?.subcategory?.name || '');
    setDescription(data?.description || '');
    setMetaTitle(data?.metaTitle || '');
    setMetaDescription(data?.metaDescription || '');
    setMetaKeywords(data?.metaKeywords || '')

    // Set details - ensure it's always an array with at least one item
    setDetails(
      data?.details?.details?.length > 0
        ? data?.details?.details
        : [{ title: '', value: '' }]
    );

    console.log(details)
    // Set additional info - ensure it's always an array with at least one item
    setAdditional(
      data?.additional?.additional?.length > 0
        ? data?.additional?.additional
        : [{ title: '', value: '' }]
    );


    setMrp(data?.mrp || 0);
    setPrice(data?.price || 0);
    setDiscount(data?.discount || 0);
    setMainMedia(data?.main || null);
    setStockManagement(data?.stockManagement || false);
    setThumbnail(data?.thumbnail || null);
    setImages(data?.images || []);
    setVideos(data?.videos || []);


    // Set variants if they exist
    if (data?.variants?.variants?.length > 0) {
      const formattedVariants = data?.variants?.variants.map(variant => {
        // For existing data, we might need to handle different structures
        const firstData = variant.data?.[0] || {};

        return {
          ...variant,
          id: variant.id || new Date().getTime().toString(),
          data: [{
            label: firstData.label || '',
            value: firstData.value || '',
            parentId: firstData.parentId || '',
            childId: firstData.childId || ''
          }]
        };
      });
      setSelectedVariants(formattedVariants);
    } else {
      setSelectedVariants([]);
    }
  };

  console.log(images, "images")

  const [selectedParentVariant, setSelectedParentVariant] = useState('');
  const [selectedChildVariant, setSelectedChildVariant] = useState('');
  const [selectedVariants, setSelectedVariants] = useState([]);


  // Filter categories based on status and parent
  const filteredCategories = categories.filter((cat) => cat.status === true && cat.parent === 'N/A');
  const subcategories = categories.filter((cat) => cat.parent === selectedCategory && cat.status === true);
  const brandData = brands.filter((cat) => cat.parent === selectedCategory && cat.status === true);

  // Filter variants to only show parent variants
  const parentVariants = variants.filter((variant) => variant.parent === 'N/A');
  const childVariants = variants.filter((variant) => variant.parent === selectedParentVariant);

  // Automatically calculate price based on MRP and discount
  useEffect(() => {
    const calculatedPrice = mrp - mrp * (discount / 100);
    setPrice(calculatedPrice);
  }, [mrp, discount]);

  // Add detail row
  const addDetailRow = () => {
    setDetails([...details, { title: '', value: '' }]);
  };

  // Add additional row
  const addAdditionalRow = () => {
    setAdditional([...additional, { title: '', value: '' }]);
  };

  const addVariant = () => {
    if (selectedParentVariant && selectedChildVariant) {
      // Find the actual variant objects
      const parentVariantObj = variants.find(v => v.parent === selectedParentVariant);
      const childVariantObj = variants.find(v => v.name === selectedChildVariant);

      const newVariant = {
        id: new Date().getTime().toString(),
        data: [
          {
            label: parentVariantObj.parent, // Store the name as label
            value: childVariantObj.name,  // Store the name as value
            parentId: selectedParentVariant,
            childId: selectedChildVariant
          },
        ],
        mrp: mrp,
        price: price,
        stock: 0,
      };

      setSelectedVariants([...selectedVariants, newVariant]);
      // Reset the dropdowns
      setSelectedParentVariant('');
      setSelectedChildVariant('');
    }
  };

  // Remove variant
  const removeVariant = (index) => {
    const newVariants = [...selectedVariants];
    newVariants.splice(index, 1);
    setSelectedVariants(newVariants);
  };

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  // Update state declarations
  const [mainMedia, setMainMedia] = useState(null); // Can be either image or video

  // Update the handleMainUpload function
  const handleMainUpload = (mediaUrl, type) => {
    setMainMedia({ url: mediaUrl, type });
  };

  // Update the file upload handler
  // Update the file upload handler
  const handleFileUpload = async (e) => {
    try {
      const files = Array.from(e.target.files);
      if (files.length === 0) return;

      const newMedia = [];

      for (const file of files) {
        const base64 = await convertToBase64(file);

        newMedia.push({
          url: base64,
          file: file,
          type: file.type.startsWith('video/') ? 'video' : 'image'
        });
      }

      if (newMedia.length > 0) {
        const newImages = newMedia.filter(item => item.type === 'image');
        const newVideos = newMedia.filter(item => item.type === 'video');

        setImages(prev => [...prev, ...newImages]);
        setVideos(prev => [...prev, ...newVideos]);

        // Set first image as thumbnail if no thumbnail exists
        if (!thumbnail && newImages.length > 0) {
          handleThumbnailUpload(newImages[0].url);
        }

        // Set first media as main if no main exists
        if (!mainMedia && newMedia.length > 0) {
          handleMainUpload(newMedia[0].url, newMedia[0].type);
        }

        toast.success(`${newMedia.length} files added`);
      }
    } catch (error) {
      console.error("Error processing files:", error);
      toast.error("Failed to process files");
    }
  };

  // Update the removeImage function
  const removeImage = (index) => {
    const imageToRemove = images[index];
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);

    // If removed image was the thumbnail, clear thumbnail
    if (thumbnail === imageToRemove.url) {
      setThumbnail(null);
    }

    // If removed image was the main media, clear main
    if (mainMedia && mainMedia.type === 'image' && mainMedia.url === imageToRemove.url) {
      setMainMedia(null);
    }
  };

  const removeVideo = (index) => {
    const videoToRemove = videos[index];
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);

    // If removed video was the main media, clear main
    if (mainMedia && mainMedia.type === 'video' && mainMedia.url === videoToRemove.url) {
      setMainMedia(null);
    }
  };

  const handleThumbnailUpload = (image) => {
    // Don't do anything if this is already the thumbnail
    if (thumbnail === image) return;

    setThumbnail(image);

    // Remove from images array if it exists there
    setImages(prev => prev.filter(img => img !== image));

    toast.success("Thumbnail image set");
  };

  // const handleMainUpload = (image) => {
  //   // Don't do anything if this is already the main image
  //   if (main === image) return;

  //   setMain(image);

  //   // Remove from images array if it exists there
  //   setImages(prev => prev.filter(img => img !== image));

  //   toast.success("Main image set");
  // };

  // const removeImage = (index) => {
  //   const imageToRemove = images[index];

  //   // Remove from images array
  //   const newImages = images.filter((_, i) => i !== index);
  //   setImages(newImages);

  //   toast.success("Image removed");
  // };
  // Handle form submission



  const handleSubmit = async () => {
    // Validate required fields
    if (!name || !slug || !skuCode || !brand || !selectedCategory || !selectedSubcategory) {
      toast.error("Please fill all required fields");
      return;
    }

    // Validate at least one image is uploaded
    if (images.length === 0) {
      toast.error("Please upload at least one product image");
      return;
    }

    // Validate thumbnail is selected
    if (!thumbnail) {
      toast.error("Please select a thumbnail image");
      return;
    }

    // Validate main is selected
    // if (!main) {
    //   toast.error("Please select a main image");
    //   return;
    // }

    const normalizeImages = (images) => {
      return images
        .map(image => {
          if (typeof image === "string") {
            return image;
          } else if (image && typeof image === "object" && "url" in image) {
            return image.url;
          }
          return null; // Optional: handle unexpected entries
        })
        .filter(Boolean); // Removes null or undefined
    }


    const formData = {
      name,
      slug,
      metaTitle,
      metaDescription,
      metaKeywords,
      skuCode,
      brandCategory: selectedBrandCategory,
      brand: selectedBrand,
      category: selectedCategory,
      subcategory: selectedSubcategory,
      description,
      details: details.filter(d => d.title && d.value), // Filter out empty details
      additional: additional.filter(a => a.title && a.value), // Filter out empty additional
      mrp,
      price,
      discount,
      stockManagement,
      variants: selectedVariants,
      images: normalizeImages(images), // Assuming images are stored as URLs
      thumbnail,
      main,
      mainMedia: (mainMedia && mainMedia.url) ? mainMedia.url : mainMedia, // Use mainMedia state
      // mainVide,
      videos: videos.map(video => video.url), // Assuming videos are stored as URLs
      forPage,
      forSection
    };

    if (isEditing && editData?._id) {
      // Update existing product
      console.log("edit data: ", formData)
      dispatch(updateProduct({ id: editData._id, updatedData: formData }))
        .then(() => {
          toast.success("Product updated successfully");
          // Redirect or reset form as needed
        })
        .catch((err) => {
          toast.error("Failed to update product: " + (err.message || "Unknown error"));
        });
    } else {
      // Create new product
      dispatch(createProduct(formData))
        .then(() => {
          toast.success("Product created successfully");
          // Reset form or redirect to products page
        })
        .catch((err) => {
          toast.error("Failed to create product: " + (err.message || "Unknown error"));
        });
    }
  };

  // // Helper function to get variant name by ID
  // const getVariantNameById = (id) => {
  //   const variant = variants.find(v => v.id === id);
  //   return variant ? variant.name : 'N/A';
  // };



  return (
    <div className="flex bg-gray-100 custom-container">
      <div className="flex flex-1 flex-col">
        <header className="flex bg-gradient-to-r justify-between shadow-md text-white from-orange-500 items-center mb-5 px-6 py-3 to-yellow-500">
          <h1 className="text-2xl font-bold">{isEditing ? 'Edit Product' : 'Add Product'}</h1>
        </header>

        {/* General Info Section */}
        <div className="px-6 py-3">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex gap-8">
              {/* Left Side - Icon and Title */}
              <div className="flex flex-col bg-gray-50 justify-start p-5 rounded-lg w-[250px] items-start">
                <div className="rounded-lg">
                  <LuPackagePlus size={130} className="text-gray-600" />
                </div>
                <div className="mt-4">
                  <h2 className="text-gray-800 text-xl font-bold">General Info</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    Add here the product name, slug, brand, categories & other necessary information.
                  </p>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="flex-1 pe-6 py-6">
                <form className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="text-gray-500 text-sm block font-medium mb-1">
                      Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                    />
                  </div>

                  {/* Slug and SKU Code Row */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="slug" className="text-gray-500 text-sm block font-medium mb-1">
                        Slug
                      </label>
                      <input
                        type="text"
                        id="slug"
                        value={slug}
                        onChange={(e) => setSlug(e.target.value)}
                        className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="skuCode" className="text-gray-500 text-sm block font-medium mb-1">
                        SKU Code
                      </label>
                      <input
                        type="text"
                        id="skuCode"
                        value={skuCode}
                        onChange={(e) => setSkuCode(e.target.value)}
                        className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                      />
                    </div>
                  </div>

                  {/* Brand and Category Row */}
                  <div className="grid grid-cols-2 gap-6">
                    {/* <div>
                      <label htmlFor="brand" className="text-gray-500 text-sm block font-medium mb-1">
                        Brand
                      </label>
                      <select
                        id="brand"
                        value={selectedBrandCategory}
                        onChange={(e) => setSelectedBrandCategory(e.target.value)}
                        className="border border-gray-300 rounded-md text-gray-500 w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                      >
                        <option value="">Not Selected</option>
                        {
                          [...new Set(brands.map((brand) => brand.parent))]
                            .map((uniqueBrand, index) => (
                              <option key={index} value={uniqueBrand}>{uniqueBrand}</option>
                            ))
                        }
                      </select>
                    </div>
                    <div>
                      <label htmlFor="brand" className="text-gray-500 text-sm block font-medium mb-1">
                        Brand
                      </label>
                      <select
                        id="brand"
                        value={selectedCategory}
                        onChange={(e) => setBrand(e.target.value)}
                        className="border border-gray-300 rounded-md text-gray-500 w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                      >
                        <option value="">Not Selected</option>
                        {brandData.map((brand) => (
                          <option value={brand}>{brand}</option>
                        ))}
                      </select>
                    </div> */}
                    <div>
                      <label htmlFor="brandCategory" className="text-gray-500 text-sm block font-medium mb-1">
                        Brand Category
                      </label>
                      <select
                        id="brandCategory"
                        value={selectedBrandCategory}
                        onChange={(e) => setSelectedBrandCategory(e.target.value)}
                        className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                      >
                        <option value="">Select Brand Category</option>
                        {[...new Set(brands.map((brand) => brand.parent))]
                          .filter(cat => cat !== "N/A")
                          .map((uniqueBrand, index) => (
                            <option key={index} value={uniqueBrand}>{uniqueBrand}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div>
                      <label htmlFor="category" className="text-gray-500 text-sm block font-medium mb-1">
                        Category
                      </label>
                      <select
                        id="category"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                      >
                        <option value="">Select Category</option>
                        {filteredCategories.map((cat) => (
                          <option key={cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {selectedBrandCategory && (
                      <div>
                        <label htmlFor="brand" className="text-gray-500 text-sm block font-medium mb-1">
                          Brand<span className="text-red-500">*</span>
                        </label>
                        <select
                          id="brand"
                          value={selectedBrand}
                          onChange={(e) => setSelectedBrand(e.target.value)}
                          className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                          disabled={!selectedBrandCategory}
                        >
                          <option value="">Select Brand</option>
                          {brands
                            .filter(brand => brand.parent === selectedBrandCategory)
                            .map((brand) => (
                              <option key={brand._id} value={brand.name}>
                                {brand.name}
                              </option>
                            ))
                          }
                        </select>
                      </div>
                    )}
                    {/* Subcategory Dropdown */}
                    {selectedCategory && (
                      <div>
                        <label htmlFor="subcategory" className="text-gray-500 text-sm block font-medium mb-1">
                          Subcategory
                        </label>
                        <select
                          id="subcategory"
                          value={selectedSubcategory}
                          onChange={(e) => setSelectedSubcategory(e.target.value)}
                          className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                        >
                          <option value="">Select Subcategory</option>
                          {subcategories.map((subcat) => (
                            <option key={subcat.id} value={subcat.name}>
                              {subcat.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </div>
                  <div className="flex space-x-4">
                    <div className="w-1/2">
                      <label className="text-gray-500 text-sm block font-medium mb-1">For Which Page *</label>
                      <select
                        className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
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
                      <label className="text-gray-500 text-sm block font-medium mb-1">For Which Section *</label>
                      <select
                        className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
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
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* SEO Metadata Section */}
        <div className="px-6 py-3">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex gap-8">
              {/* Left Side - Icon and Title */}
              <div className="flex flex-col bg-gray-50 justify-start p-5 rounded-lg w-[250px] items-start">
                <div className="rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-24 w-24 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <div className="mt-4">
                  <h2 className="text-gray-800 text-xl font-bold">SEO Metadata</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    Add metadata to improve search engine visibility.
                  </p>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="flex-1 pe-6 py-6">
                <form className="space-y-6">
                  {/* Meta Title */}
                  <div>
                    <label htmlFor="metaTitle" className="text-gray-500 text-sm block font-medium mb-1">
                      Meta Title
                    </label>
                    <input
                      type="text"
                      id="metaTitle"
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                      maxLength="60"
                      placeholder="Recommended: 50-60 characters"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {metaTitle.length}/60 characters
                    </p>
                  </div>

                  {/* Meta Description */}
                  <div>
                    <label htmlFor="metaDescription" className="text-gray-500 text-sm block font-medium mb-1">
                      Meta Description
                    </label>
                    <textarea
                      id="metaDescription"
                      rows={3}
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                      className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                      maxLength="160"
                      placeholder="Recommended: 150-160 characters"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {metaDescription.length}/160 characters
                    </p>
                  </div>

                  {/* Meta Keywords */}
                  <div>
                    <label htmlFor="metaKeywords" className="text-gray-500 text-sm block font-medium mb-1">
                      Meta Keywords
                    </label>
                    <input
                      type="text"
                      id="metaKeywords"
                      value={metaKeywords}
                      onChange={(e) => setMetaKeywords(e.target.value)}
                      className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                      placeholder="Comma separated keywords (e.g., product, category, brand)"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Section */}
        <div className="px-6 py-3">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex gap-8">
              {/* Left Side - Icon and Title */}
              <div className="flex flex-col bg-gray-50 justify-start p-5 rounded-lg w-[250px] items-start">
                <div className="rounded-lg">
                  <BiPackage size={120} className="text-gray-600" />
                </div>
                <div className="mt-4">
                  <h2 className="text-gray-800 text-xl font-bold">Product Information</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    Add here the product short description, product detail & about item.
                  </p>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="flex-1 pe-6 py-6">
                <form className="space-y-6">
                  {/* Short Description */}
                  <div>
                    <label htmlFor="shortDescription" className="text-gray-700 text-sm block font-medium mb-1">
                      Short Description<span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="shortDescription"
                      rows={4}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                    />
                  </div>

                  {/* Detail Section */}
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h3 className="text-gray-700 text-lg font-medium mb-4">Detail</h3>
                    {details.map((detail, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="flex-1 mb-3">
                          <input
                            type="text"
                            placeholder="Write Detail Title"
                            value={detail.title}
                            onChange={(e) => {
                              const newDetails = [...details];
                              newDetails[index].title = e.target.value;
                              setDetails(newDetails);
                            }}
                            className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                          />
                        </div>
                        <div className="flex-1 mb-3">
                          <input
                            type="text"
                            placeholder="Write Detail Value"
                            value={detail.value}
                            onChange={(e) => {
                              const newDetails = [...details];
                              newDetails[index].value = e.target.value;
                              setDetails(newDetails);
                            }}
                            className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newDetails = details.filter((_, i) => i !== index);
                            setDetails(newDetails);
                          }}
                          className="bg-orange-500 p-2 rounded-md text-white hover:bg-orange-600 mb-3"
                        >
                          <IoMdClose size={20} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addDetailRow}
                      className="flex bg-blue-600 rounded-md text-white hover:bg-blue-700 items-center mt-4 px-4 py-2"
                    >
                      <span className="mr-2">+</span> Add Detail Row
                    </button>
                  </div>

                  {/* Additional Section */}
                  <div className="border border-gray-200 p-4 rounded-lg">
                    <h3 className="text-gray-700 text-lg font-medium mb-4">Additional</h3>
                    {additional.map((add, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <div className="flex-1 mb-3">
                          <input
                            type="text"
                            placeholder="Write Additional Title"
                            value={add.title}
                            onChange={(e) => {
                              const newAdditional = [...additional];
                              newAdditional[index].title = e.target.value;
                              setAdditional(newAdditional);
                            }}
                            className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                          />
                        </div>
                        <div className="flex-1 mb-3">
                          <input
                            type="text"
                            placeholder="Write Additional Value"
                            value={add.value}
                            onChange={(e) => {
                              const newAdditional = [...additional];
                              newAdditional[index].value = e.target.value;
                              setAdditional(newAdditional);
                            }}
                            className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            const newAdditional = additional.filter((_, i) => i !== index);
                            setAdditional(newAdditional);
                          }}
                          className="bg-orange-500 p-2 rounded-md text-white hover:bg-orange-600 mb-3"
                        >
                          <IoMdClose size={20} />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addAdditionalRow}
                      className="flex bg-gray-600 rounded-md text-white hover:bg-gray-700 items-center mt-4 px-4 py-2"
                    >
                      <span className="mr-2">+</span> Add Additional Row
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Inventory & Cartesian Section */}
        <div className="px-6 py-3">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex gap-8">
              {/* Left Side - Icon and Title */}
              <div className="flex flex-col bg-gray-50 justify-start p-5 rounded-lg w-[250px] items-start">
                <div className="rounded-lg">
                  <FaRupeeSign size={100} className="text-gray-600" />
                </div>
                <div className="mt-4">
                  <h2 className="text-gray-800 text-xl font-bold">Inventory & Cartesian</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    The Cartesian product between two sets is the set of all possible ordered pairs with first element from the first set and second element from the second
                  </p>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="flex-1 pe-6 py-6">
                <form className="space-y-6">
                  {/* MRP, Price, and Discount Row */}
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="text-gray-700 text-sm block font-medium mb-1">
                        MRP<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="text-gray-500 absolute left-3 top-2">₹</span>
                        <input
                          type="number"
                          value={mrp}
                          onChange={(e) => setMrp(Number(e.target.value))}
                          className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 pl-8 pr-3 py-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm block font-medium mb-1">
                        Price<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="text-gray-500 absolute left-3 top-2">₹</span>
                        <input
                          type="number"
                          value={price}
                          readOnly
                          className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 pl-8 pr-3 py-2"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-700 text-sm block font-medium mb-1">
                        Discount<span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <span className="text-gray-500 absolute left-3 top-2">%</span>
                        <input
                          type="number"
                          value={discount}
                          onChange={(e) => setDiscount(Number(e.target.value))}
                          className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 pl-8 pr-3 py-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stock Management */}
                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={stockManagement}
                        onChange={(e) => setStockManagement(e.target.checked)}
                        className="border-gray-300 h-4 rounded text-orange-500 w-4 focus:ring-orange-500"
                      />
                      <span className="text-gray-700 text-sm">Enable stock management at product level</span>
                    </label>
                  </div>

                  {/* Variant Dropdowns */}
                  <div className="flex gap-4 items-center">
                    {/* Parent Variant Dropdown */}
                    <select
                      className="flex-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                      value={selectedParentVariant}
                      onChange={(e) => {
                        setSelectedParentVariant(e.target.value);
                        setSelectedChildVariant("");
                      }}
                    >
                      <option value="">Select Parent Variant</option>
                      {parentVariants.map((variant) => (
                        <option key={variant.id} value={variant.id}>
                          {variant.name}
                        </option>
                      ))}
                    </select>

                    {/* Child Variant Dropdown */}
                    {selectedParentVariant && (
                      <select
                        className="flex-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                        value={selectedChildVariant}
                        onChange={(e) => setSelectedChildVariant(e.target.value)}
                      >
                        <option value="">Select Value</option>
                        {childVariants.map((variant) => (
                          <option key={variant.id} value={variant.id}>
                            {variant.name}
                          </option>
                        ))}
                      </select>
                    )}
                    <button
                      type="button"
                      onClick={addVariant}
                      className="bg-blue-600 rounded-md text-white disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-blue-700 px-6 py-2"
                      disabled={!selectedChildVariant}
                    >
                      Add Variant
                    </button>
                  </div>

                  {/* Variant Table */}
                  <table className="rounded-lg shadow-sm divide-gray-200 divide-y min-w-full overflow-hidden">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-gray-500 text-left text-xs font-medium px-6 py-3 tracking-wider uppercase">
                          Parent
                        </th>
                        <th className="text-gray-500 text-left text-xs font-medium px-6 py-3 tracking-wider uppercase">
                          Value
                        </th>
                        <th className="text-gray-500 text-left text-xs font-medium px-6 py-3 tracking-wider uppercase">
                          MRP
                        </th>
                        <th className="text-gray-500 text-left text-xs font-medium px-6 py-3 tracking-wider uppercase">
                          Price
                        </th>
                        <th className="text-gray-500 text-left text-xs font-medium px-6 py-3 tracking-wider uppercase">
                          Stock
                        </th>
                        <th className="text-gray-500 text-left text-xs font-medium px-6 py-3 tracking-wider uppercase">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-gray-200 divide-y">
                      {selectedVariants.map((variant, index) => {
                        // For edit mode, we might have parentId and childId stored
                        const parentId = variant.data[0]?.parentId || variant.data[0]?.label;
                        const childId = variant.data[0]?.childId || variant.data[0]?.value;

                        const parentVariant = variants.find(v => v.id === parentId);
                        const childVariant = variants.find(v => v.id === childId);

                        return (
                          <tr key={variant.id || index}>
                            <td className="text-gray-900 text-sm px-6 py-4 whitespace-nowrap">
                              {parentVariant ? parentVariant.name : variant.data[0]?.label || 'N/A'}
                            </td>
                            <td className="text-gray-900 text-sm px-6 py-4 whitespace-nowrap">
                              {childVariant ? childVariant.name : variant.data[0]?.value || 'N/A'}
                            </td>
                            <td className="text-gray-900 text-sm px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={variant.mrp}
                                onChange={(e) => {
                                  const newVariants = [...selectedVariants];
                                  newVariants[index].mrp = Number(e.target.value);
                                  setSelectedVariants(newVariants);
                                }}
                                className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                              />
                            </td>
                            <td className="text-gray-900 text-sm px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={variant.price}
                                onChange={(e) => {
                                  const newVariants = [...selectedVariants];
                                  newVariants[index].price = Number(e.target.value);
                                  setSelectedVariants(newVariants);
                                }}
                                className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                              />
                            </td>
                            <td className="text-gray-900 text-sm px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                value={variant.stock}
                                onChange={(e) => {
                                  const newVariants = [...selectedVariants];
                                  newVariants[index].stock = Number(e.target.value);
                                  setSelectedVariants(newVariants);
                                }}
                                className="border border-gray-300 rounded-md w-full focus:outline-none focus:ring-1 focus:ring-orange-500 px-3 py-2"
                                disabled={!stockManagement}
                              />
                            </td>
                            <td className="text-gray-900 text-sm px-6 py-4 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => removeVariant(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Product Image Section */}
        {/* <div className="px-6 py-3"> */}
        {/* <div className="bg-white rounded-lg shadow-md">
            <div className="flex gap-8">
              <div className="flex flex-col bg-gray-50 justify-start p-5 rounded-lg w-[250px] items-start shadow-md">
                <div className="rounded-lg">
                  <FaCameraRetro size={120} className="text-gray-600" />
                </div>
                <div className="mt-4">
                  <h2 className="text-gray-800 text-xl font-bold">Product Image</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    Upload your product image via link or manually select files.
                  </p>
                  <label
                    htmlFor="fileInput"
                    className="bg-blue-600 text-white rounded-md text-center block hover:bg-blue-700 mt-4 w-[220px] py-2 cursor-pointer"
                  >
                    Upload Images
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div> */}

        {/* Right Side - Image Upload Area */}
        {/* <div className="flex-1 pe-6 py-6">

                {thumbnail && (
                  <div className="mb-6">
                    <h3 className="text-gray-700 text-lg font-medium mb-2">Thumbnail Preview</h3>
                    <div className="border border-gray-200 p-4 rounded-lg relative max-w-xs">
                      <img
                        src={thumbnail}
                        alt="Thumbnail preview"
                        className="w-[200px] h-[300px] rounded-lg object-cover"
                      />
                      <button
                        onClick={() => setThumbnail(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <h3 className="text-gray-700 text-lg font-medium mb-2">Product Images</h3>
                <div className="grid grid-cols-2 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
                      <div className="aspect-h-9 aspect-w-16 mb-2">
                        <img
                          src={image}
                          alt="Product preview"
                          className="h-48 rounded-lg w-full object-cover"
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <button
                          onClick={() => removeImage(index)}
                          className="text-red-600 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                        <button
                          onClick={() => handleThumbnailUpload(image)}
                          className={`text-sm px-3 py-1 rounded ${thumbnail === image ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                        >
                          {thumbnail === image ? 'Thumbnail' : 'Set as Thumbnail'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
        {/* <div className="flex-1 pe-6 py-6">

                {thumbnail && (
                  <div className="mb-6">
                    <h3 className="text-gray-700 text-lg font-medium mb-2">Thumbnail Preview</h3>
                    <div className="border border-gray-200 p-4 rounded-lg relative w-[500px]">
                      <img
                        src={thumbnail}
                        alt="Thumbnail preview"
                        className="w-[500px] h-[200px] rounded-lg object-cover"
                      />
                      <button
                        onClick={() => setThumbnail(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {main && (
                  <div className="mb-6">
                    <h3 className="text-gray-700 text-lg font-medium mb-2">Main Image Preview</h3>
                    <div className="border border-gray-200 p-4 rounded-lg relative w-[500px]">
                      <img
                        src={main}
                        alt="Main image preview"
                        className="w-[500px] h-[200px] rounded-lg object-cover"
                      />
                      <button
                        onClick={() => setMain(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </div>
                  </div>
                )}

                <h3 className="text-gray-700 text-lg font-medium mb-2">Product Images</h3>
                <div className="grid grid-cols-2 gap-4">
                  {images.map((image, index) => (
                    <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
                      <div className="aspect-h-9 aspect-w-16 mb-2">
                        <img
                          src={image}
                          alt="Product preview"
                          className="h-48 rounded-lg w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-wrap justify-between items-center gap-2">
                        <button
                          onClick={() => removeImage(index)}
                          className="text-red-600 text-sm hover:text-red-700"
                        >
                          Remove
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleThumbnailUpload(image)}
                            className={`text-sm px-2 py-1 rounded ${thumbnail === image ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                          >
                            {thumbnail === image ? 'Thumbnail' : 'Set as Thumbnail'}
                          </button>
                          <button
                            onClick={() => handleMainUpload(image)}
                            className={`text-sm px-3 py-1 rounded ${main === image ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                          >
                            {main === image ? 'Main Image' : 'Set as Main'}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div> */}
        {/* Thumbnail Preview (if exists) */}
        {/* <div className="flex-1 pe-6 py-6">
                {thumbnail && (
                  <div className="mb-6">
                    <h3 className="text-gray-700 text-lg font-medium mb-2">Thumbnail Preview</h3>
                    <div className="border border-gray-200 p-4 rounded-lg relative w-[500px]">
                      <img
                        src={thumbnail}
                        alt="Thumbnail preview"
                        className="w-[500px] h-[200px] rounded-lg object-cover"
                      />
                      <button
                        onClick={() => setThumbnail(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </div>
                  </div>
                )} */}

        {/* Main Image Preview (if exists) */}
        {/* {main && main !== thumbnail && (
                  <div className="mb-6">
                    <h3 className="text-gray-700 text-lg font-medium mb-2">Main Image Preview</h3>
                    <div className="border border-gray-200 p-4 rounded-lg relative w-[500px]">
                      <img
                        src={main}
                        alt="Main image preview"
                        className="w-[500px] h-[200px] rounded-lg object-cover"
                      />
                      <button
                        onClick={() => setMain(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </div>
                  </div>
                )} */}

        {/* Additional Images Grid */}
        {/* <h3 className="text-gray-700 text-lg font-medium mb-2">Additional Images</h3>
                {images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
                        <div className="aspect-h-9 aspect-w-16 mb-2">
                          <img
                            src={image}
                            alt="Product preview"
                            className="h-48 rounded-lg w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <button
                            onClick={() => removeImage(index)}
                            className="text-red-600 text-sm hover:text-red-700"
                          >
                            Remove
                          </button>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleThumbnailUpload(image)}
                              className={`text-sm px-2 py-1 rounded ${thumbnail === image ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                              {thumbnail === image ? 'Thumbnail' : 'Set as Thumbnail'}
                            </button>
                            <button
                              onClick={() => handleMainUpload(image)}
                              className={`text-sm px-3 py-1 rounded ${main === image ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                              {main === image ? 'Main Image' : 'Set as Main'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No additional images uploaded yet</p>
                )}
              </div>
            </div>
          </div>
        </div> */}

        <div className="px-6 py-3">
          <div className="bg-white rounded-lg shadow-md">
            <div className="flex gap-8">
              <div className="flex flex-col bg-gray-50 justify-start p-5 rounded-lg w-[250px] items-start shadow-md">
                <div className="rounded-lg">
                  <FaCameraRetro size={120} className="text-gray-600" />
                </div>
                <div className="mt-4">
                  <h2 className="text-gray-800 text-xl font-bold">Product Media</h2>
                  <p className="text-gray-600 text-sm mt-2">
                    Upload your product images and videos.
                  </p>
                  <label
                    htmlFor="fileInput"
                    className="bg-blue-600 text-white rounded-md text-center block hover:bg-blue-700 mt-4 w-[220px] py-2 cursor-pointer"
                  >
                    Upload Files
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <div className="flex-1 pe-6 py-6">
                {/* Thumbnail Preview (image only) */}
                {thumbnail && (
                  <div className="mb-6">
                    <h3 className="text-gray-700 text-lg font-medium mb-2">Thumbnail Preview</h3>
                    <div className="border border-gray-200 p-4 rounded-lg relative w-[500px]">
                      <img
                        src={thumbnail}
                        alt="Thumbnail preview"
                        className="w-[500px] h-[200px] rounded-lg object-cover"
                      />
                      <button
                        onClick={() => setThumbnail(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </div>
                  </div>
                )}
                {/* Main Image Preview */}
                {/* {main && main !== thumbnail && (
                  <div className="mb-6">
                    <h3 className="text-gray-700 text-lg font-medium mb-2">Main Image Preview</h3>
                    <div className="border border-gray-200 p-4 rounded-lg relative w-[500px]">
                      <img
                        src={main}
                        alt="Main image preview"
                        className="w-[500px] h-[200px] rounded-lg object-cover"
                      />
                      <button
                        onClick={() => setMain(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </div>
                  </div>
                )} */}

                {/* Main Video Preview */}

                {/* {mainVideo && (
                  <div className="mb-6">
                    <h3 className="text-gray-700 text-lg font-medium mb-2">Main Video Preview</h3>
                    <div className="border border-gray-200 p-4 rounded-lg relative w-[500px]">
                      <div className="relative w-[500px] h-[200px] bg-black rounded-lg flex items-center justify-center">
                        <video className="w-full h-full object-contain" controls>
                          <source src={mainVideo} type="video/mp4" />
                        </video>
                      </div>
                      <button
                        onClick={() => setMainVideo(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </div>
                  </div>
                )} */}
                {/* Additional Images Grid */}
                {/* <h3 className="text-gray-700 text-lg font-medium mb-2">Additional Images</h3>
                {images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {images.map((image, index) => (
                      <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
                        <div className="aspect-h-9 aspect-w-16 mb-2">
                          <img
                            src={image.url}
                            alt="Product preview"
                            className="h-48 rounded-lg w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <button
                            onClick={() => removeImage(index)}
                            className="text-red-600 text-sm hover:text-red-700"
                          >
                            Remove
                          </button>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleThumbnailUpload(image.url)}
                              className={`text-sm px-2 py-1 rounded ${thumbnail === image.url ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                              {thumbnail === image.url ? 'Thumbnail' : 'Set as Thumbnail'}
                            </button>
                            <button
                              onClick={() => handleMainUpload(image.url)}
                              className={`text-sm px-3 py-1 rounded ${main === image.url ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                            >
                              {main === image.url ? 'Main Image' : 'Set as Main'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No additional images uploaded yet</p>
                )} */}

                {/* Additional Videos Grid */}
                {/* <h3 className="text-gray-700 text-lg font-medium mt-6 mb-2">Additional Videos</h3>
                {videos.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {videos.map((video, index) => (
                      <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
                        <div className="relative w-full h-48 bg-black rounded-lg mb-2 flex items-center justify-center">
                          <video className="w-full h-full object-contain">
                            <source src={video.url} type="video/mp4" />
                          </video>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <FaPlay className="text-white text-2xl" />
                          </div>
                        </div>
                        <div className="flex flex-wrap justify-between items-center gap-2">
                          <button
                            onClick={() => removeVideo(index)}
                            className="text-red-600 text-sm hover:text-red-700"
                          >
                            Remove
                          </button>
                          <button
                            onClick={() => handleMainVideoUpload(video.url)}
                            className={`text-sm px-3 py-1 rounded ${mainVideo === video.url ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                          >
                            {mainVideo === video.url ? 'Main Video' : 'Set as Main Video'}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No additional videos uploaded yet</p>
                )} */}

                {mainMedia && (
                  <div className="mb-6">
                    <h3 className="text-gray-700 text-lg font-medium mb-2">
                      Main {/\.(jpg|jpeg|png|gif|webp)$/i.test(mainMedia) ? 'Image' : 'Video'} Preview
                    </h3>
                    <div className="border border-gray-200 p-4 rounded-lg relative w-[500px]">
                      {(mainMedia.type === "image" || /\.(jpg|jpeg|png|gif|webp)$/i.test(mainMedia)) ? (
                        <img
                          src={mainMedia.url || mainMedia}
                          alt="Main preview"
                          className="w-[500px] h-[200px] rounded-lg object-cover"
                        />
                      ) : (
                        <div className="relative w-[500px] h-[200px] bg-black rounded-lg flex items-center justify-center">
                          <video className="w-full h-full object-contain" controls>
                            <source src={mainMedia.url || mainMedia} type="video/mp4" />
                          </video>
                        </div>
                      )}
                      <button
                        onClick={() => setMainMedia(null)}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                      >
                        <IoMdClose size={16} />
                      </button>
                    </div>
                  </div>
                )}


                {images.length > 0 && (
                  <>
                    <h3 className="text-gray-700 text-lg font-medium mb-2">Additional Images</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
                          <img
                            src={image.url || image}
                            alt="Product preview"
                            className="h-48 rounded-lg w-full object-cover mb-2"
                          />
                          <div className="flex justify-between items-center gap-2">
                            <button
                              onClick={() => removeImage(index)}
                              className="text-red-600 text-sm hover:text-red-700"
                            >
                              Remove
                            </button>
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleThumbnailUpload(image.url)}
                                className={`text-sm px-2 py-1 rounded ${thumbnail === image.url
                                  ? 'bg-green-500 text-white'
                                  : 'bg-gray-200 text-gray-700'
                                  }`}
                              >
                                {thumbnail === (image.url || image) ? 'Thumbnail' : 'Set as Thumbnail'}
                              </button>
                              <button
                                onClick={() => handleMainUpload(image.url, 'image')}
                                className={`text-sm px-3 py-1 rounded ${mainMedia?.type === 'image' && mainMedia.url === image.url
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-200 text-gray-700'
                                  }`}
                              >
                                {mainMedia?.type === 'image' && (mainMedia.url === image.url || mainMedia === image)
                                  ? 'Main Image'
                                  : 'Set as Main'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {videos.length > 0 && (
                  <>
                    <h3 className="text-gray-700 text-lg font-medium mt-6 mb-2">Additional Videos</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {videos.map((video, index) => (
                        <div key={index} className="border border-gray-200 p-4 rounded-lg relative">
                          <div className="relative w-full h-48 bg-black rounded-lg mb-2 flex items-center justify-center">
                            <video className="w-full h-full object-contain">
                              <source src={video.url || video} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FaPlay className="text-white text-2xl" />
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => removeVideo(index)}
                              className="text-red-600 text-sm hover:text-red-700"
                            >
                              Remove
                            </button>
                            <button
                              onClick={() => handleMainUpload(video.url, 'video')}
                              className={`text-sm px-3 py-1 rounded ${mainMedia?.type === 'video' && mainMedia.url === video.url
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                                }`}
                            >
                              {mainMedia?.type === 'video' && mainMedia.url === video.url
                                ? 'Main Video'
                                : 'Set as Main'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>


        {/* Save and Cancel Buttons */}
        <div className="flex gap-4 px-6 py-3">
          <button onClick={handleSubmit} className="bg-green-600 rounded-md text-white hover:bg-green-700 px-8 py-2">
            {isEditing ? 'Update Product' : 'Save Product'}
          </button>
          <Link to="/products">
            <button className="bg-gray-100 rounded-md text-gray-700 hover:bg-gray-200 px-8 py-2">
              Cancel
            </button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Addproduct;