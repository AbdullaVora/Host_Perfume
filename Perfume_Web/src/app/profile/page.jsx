// "use client";

// import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation';
// import { IoIosMail } from "react-icons/io";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import apiInstance from '@/api/instance';
// import Header from '@/components/Header';
// import Swal from 'sweetalert2';
// import { useSelector } from 'react-redux';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';


// const Profile = () => {
//     const { userId, userEmail, userName, userPhone } = useSelector((state) => state.userData)
//     const [phone, setPhone] = useState('');


//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: ''
//     });
//     const [originalData, setOriginalData] = useState({
//         name: '',
//         email: '',
//         phone: ''
//     });
//     const [isLoading, setIsLoading] = useState(false);

//     const [id, setId] = useState(null)


//     useEffect(() => {
//         const name = userName;
//         const email = userEmail;
//         const usermobile = userPhone; // Replace with actual userPhone from Redux if available
//         const id = userId;

//         setId(id);
//         setPhone(userPhone || ''); // Initialize phone here
//         setFormData({
//             name: name || '',
//             email: email || '',
//             phone: usermobile || ''
//         });
//         setOriginalData({
//             name: name || '',
//             email: email || '',
//             phone: usermobile || ''
//         });
//     }, []);


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const hasChanges = () => {
//         return (
//             formData.name !== originalData.name ||
//             formData.email !== originalData.email ||
//             phone !== originalData.phone
//         );
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!hasChanges()) {
//             // toast.info('No changes made', { autoClose: 2000 });
//             Swal.fire({
//                 icon: 'info',
//                 text: 'No Changes Made',
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//             return;
//         }

//         // console.log(formData)

//         setIsLoading(true);
//         try {
//             const response = await apiInstance.put(`/api/auth/editUser/${id}`, {...formData, mobile: phone});

//             if (response.status === 200) {
//                 // toast.success('Profile updated successfully', { autoClose: 2000 });
//                 Swal.fire({
//                     icon: 'success',
//                     text: 'Profile Updated Successfully',
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//                 localStorage.setItem('user', response.data.name);
//                 localStorage.setItem('userEmail', response.data.email);
//                 localStorage.setItem('userPhone', response.data.mobile);
//                 setOriginalData({
//                     name: response.data.name,
//                     email: response.data.email,
//                     phone: response.data.mobile
//                 });
//                 setFormData(prev => ({
//                     ...prev
//                 }));
//             } else {
//                 // toast.error(response.data.message || 'Update failed', { autoClose: 2000 });
//                 Swal.fire({
//                     icon: 'error',
//                     text: response.data.messsage,
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//             }
//         } catch (error) {
//             // toast.error(error.response?.data?.message || error.message || 'Update failed', { autoClose: 2000 });
//             Swal.fire({
//                 icon: 'error',
//                 text: error.response?.data?.message,
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <>
//             {/* <Header /> */}
//             <div className="container-fluid px-3">
//                 <h2 className='text-center fw-bolder display-5 mt-4 mb-4'>PROFILE</h2>
//                 <div className="d-flex flex-column align-items-center justify-contant-center py-3 py-md-5">
//                     <div className="login w-100" style={{ maxWidth: "500px" }}>
//                         <h4 className='fw-bold mb-2'>Update Profile</h4>
//                         <form onSubmit={handleSubmit}>
//                             <label className='mt-3'>Full Name: </label>
//                             <input
//                                 type="text"
//                                 name="name"
//                                 id="name"
//                                 onChange={handleChange}
//                                 className='form-control py-3'
//                                 placeholder='ENTER YOUR NAME'
//                                 value={formData.name}
//                             />
//                             <label className='mt-3'>E-Mail: </label>
//                             <input
//                                 type="email"
//                                 name="email"
//                                 id="email"
//                                 onChange={handleChange}
//                                 className='form-control py-3'
//                                 placeholder='ENTER YOUR EMAIL'
//                                 value={formData.email}
//                             />
//                             <div className='mt-3'>
//                                 <PhoneInput
//                                     international
//                                     defaultCountry="US"
//                                     value={phone}
//                                     onChange={setPhone}
//                                     className='form-control py-3'
//                                     placeholder="ENTER YOUR PHONE NUMBER"
//                                 />
//                             </div>
//                             {/* <div className="position-relative mt-3">
//                                 <input
//                                     type={showPassword ? "text" : "password"}
//                                     name="password"
//                                     id="password"
//                                     onChange={handleChange}
//                                     className='form-control py-3'
//                                     placeholder='ENTER NEW PASSWORD (leave blank to keep current)'
//                                     value={formData.password}
//                                 />
//                                 <button
//                                     type="button"
//                                     className="position-absolute end-0 top-50 translate-middle-y bg-transparent border-0 me-3"
//                                     onClick={togglePasswordVisibility}
//                                 >
//                                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                                 </button>
//                             </div> */}
//                             <button
//                                 className='d-block w-100 mt-3 py-3 border-0 fw-semibold text-white rounded-1'
//                                 type='submit'
//                                 disabled={!hasChanges() || isLoading}
//                                 style={{
//                                     backgroundColor: !hasChanges() ? '#cccccc' : '#0a5d5d',
//                                     cursor: !hasChanges() ? 'not-allowed' : 'pointer'
//                                 }}
//                             >
//                                 {isLoading ? 'Updating...' : 'Update Profile'}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             {/* <ToastContainer /> */}
//         </>
//     )
// }

// export default Profile


// "use client";

// import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation';
// import { IoIosMail } from "react-icons/io";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import apiInstance from '@/api/instance';
// import Header from '@/components/Header';
// import Swal from 'sweetalert2';
// import { useSelector } from 'react-redux';
// import PhoneInput from 'react-phone-number-input';
// import 'react-phone-number-input/style.css';

// const Profile = () => {
//     const { userId, userEmail, userName, userPhone } = useSelector((state) => state.userData)
//     const [phone, setPhone] = useState('');

//     // Profile form state
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         phone: ''
//     });
//     const [originalData, setOriginalData] = useState({
//         name: '',
//         email: '',
//         phone: ''
//     });

//     // Address form state
//     const [addressData, setAddressData] = useState({
//         firstName: '',
//         lastName: '',
//         addressLine1: '',
//         addressLine2: '',
//         city: '',
//         state: '',
//         zipCode: ''
//     });

//     const [isLoading, setIsLoading] = useState(false);
//     const [id, setId] = useState(null)

//     useEffect(() => {
//         const name = userName;
//         const email = userEmail;
//         const usermobile = userPhone;
//         const id = userId;

//         setId(id);
//         setPhone(userPhone || '');
//         setFormData({
//             name: name || '',
//             email: email || '',
//             phone: usermobile || ''
//         });
//         setOriginalData({
//             name: name || '',
//             email: email || '',
//             phone: usermobile || ''
//         });

//         // Here you would typically load the user's address data if available
//         // For example:
//         // loadAddressData();
//     }, []);

//     const loadAddressData = async () => {
//         try {
//             const response = await apiInstance.get(`/api/address/${id}`);
//             if (response.status === 200) {
//                 setAddressData({
//                     firstName: response.data.firstName || '',
//                     lastName: response.data.lastName || '',
//                     addressLine1: response.data.addressLine1 || '',
//                     addressLine2: response.data.addressLine2 || '',
//                     city: response.data.city || '',
//                     state: response.data.state || '',
//                     zipCode: response.data.zipCode || ''
//                 });
//             } else {
//                 console.error('Failed to load address data');
//             }
//         } catch (error) {
//             console.error('Error loading address data:', error);
//         }
//     }

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const handleAddressChange = (e) => {
//         const { name, value } = e.target;
//         setAddressData(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const hasChanges = () => {
//         return (
//             formData.name !== originalData.name ||
//             formData.email !== originalData.email ||
//             phone !== originalData.phone
//         );
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!hasChanges()) {
//             Swal.fire({
//                 icon: 'info',
//                 text: 'No Changes Made',
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//             return;
//         }

//         setIsLoading(true);
//         try {
//             const response = await apiInstance.put(`/api/auth/editUser/${id}`, { ...formData, mobile: phone });

//             if (response.status === 200) {
//                 Swal.fire({
//                     icon: 'success',
//                     text: 'Profile Updated Successfully',
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//                 localStorage.setItem('user', response.data.name);
//                 localStorage.setItem('userEmail', response.data.email);
//                 localStorage.setItem('userPhone', response.data.mobile);
//                 setOriginalData({
//                     name: response.data.name,
//                     email: response.data.email,
//                     phone: response.data.mobile
//                 });
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     text: response.data.messsage,
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 text: error.response?.data?.message,
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleAddressSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);
//         try {
//             // Adjust this API call to match your backend endpoint for saving addresses
//             const response = await apiInstance.post('/api/address', {
//                 userId: id,
//                 ...addressData
//             });

//             if (response.status === 200 || response.status === 201) {
//                 Swal.fire({
//                     icon: 'success',
//                     text: 'Address Saved Successfully',
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//                 // Optionally reset form or do something with the response
//             } else {
//                 Swal.fire({
//                     icon: 'error',
//                     text: response.data.message || 'Failed to save address',
//                     timer: 2000,
//                     showConfirmButton: false
//                 });
//             }
//         } catch (error) {
//             Swal.fire({
//                 icon: 'error',
//                 text: error.response?.data?.message || 'Failed to save address',
//                 timer: 2000,
//                 showConfirmButton: false
//             });
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <>
//             <div className="container-fluid px-3">
//                 <h2 className='text-center fw-bolder display-5 mt-4 mb-4'>PROFILE</h2>
//                 <div className="d-flex flex-column align-items-center justify-contant-center py-3 py-md-5">
//                     <div className="w-100" style={{ maxWidth: "500px" }}>
//                         <div className="mb-5">
//                             <h4 className='fw-bold mb-2'>Update Profile</h4>
//                             <form onSubmit={handleSubmit}>
//                                 <label className='mt-3'>Full Name: </label>
//                                 <input
//                                     type="text"
//                                     name="name"
//                                     id="name"
//                                     onChange={handleChange}
//                                     className='form-control py-3'
//                                     placeholder='ENTER YOUR NAME'
//                                     value={formData.name}
//                                 />
//                                 <label className='mt-3'>E-Mail: </label>
//                                 <input
//                                     type="email"
//                                     name="email"
//                                     id="email"
//                                     onChange={handleChange}
//                                     className='form-control py-3'
//                                     placeholder='ENTER YOUR EMAIL'
//                                     value={formData.email}
//                                 />
//                                 <div className='mt-3'>
//                                     <PhoneInput
//                                         international
//                                         defaultCountry="US"
//                                         value={phone}
//                                         onChange={setPhone}
//                                         className='form-control py-3'
//                                         placeholder="ENTER YOUR PHONE NUMBER"
//                                     />
//                                 </div>
//                                 <button
//                                     className='d-block w-100 mt-3 py-3 border-0 fw-semibold text-white rounded-1'
//                                     type='submit'
//                                     disabled={!hasChanges() || isLoading}
//                                     style={{
//                                         backgroundColor: !hasChanges() ? '#cccccc' : '#0a5d5d',
//                                         cursor: !hasChanges() ? 'not-allowed' : 'pointer'
//                                     }}
//                                 >
//                                     {isLoading ? 'Updating...' : 'Update Profile'}
//                                 </button>
//                             </form>
//                         </div>

//                         <div className="mt-5">
//                             <h4 className='fw-bold mb-2'>Shipping Address</h4>
//                             <form onSubmit={handleAddressSubmit}>
//                                 <div className="row mb-3">
//                                     <div className="col-md-6">
//                                         <input
//                                             type="text"
//                                             name="firstName"
//                                             className="form-control"
//                                             placeholder="First name"
//                                             value={addressData.firstName}
//                                             onChange={handleAddressChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="col-md-6">
//                                         <input
//                                             type="text"
//                                             name="lastName"
//                                             className="form-control"
//                                             placeholder="Last name"
//                                             value={addressData.lastName}
//                                             onChange={handleAddressChange}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="text"
//                                         name="address"
//                                         className="form-control"
//                                         placeholder="Address"
//                                         value={addressData.addressLine1}
//                                         onChange={handleAddressChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <input
//                                         type="text"
//                                         name="apartment"
//                                         className="form-control"
//                                         placeholder="Apartment, suite, etc. (optional)"
//                                         value={addressData.addressLine2}
//                                         onChange={handleAddressChange}
//                                     />
//                                 </div>
//                                 <div className="row mb-3">
//                                     <div className="col-md-5">
//                                         <input
//                                             type="text"
//                                             name="city"
//                                             className="form-control"
//                                             placeholder="City"
//                                             value={addressData.city}
//                                             onChange={handleAddressChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="col-md-3">
//                                         <input
//                                             type="text"
//                                             name="state"
//                                             className="form-control"
//                                             placeholder="State"
//                                             value={addressData.state}
//                                             onChange={handleAddressChange}
//                                             required
//                                         />
//                                     </div>
//                                     <div className="col-md-4">
//                                         <input
//                                             type="text"
//                                             name="zipCode"
//                                             className="form-control"
//                                             placeholder="ZIP code"
//                                             value={addressData.zipCode}
//                                             onChange={handleAddressChange}
//                                             required
//                                         />
//                                     </div>
//                                 </div>
//                                 <button
//                                     className='d-block w-100 mt-3 py-3 border-0 fw-semibold text-white rounded-1'
//                                     type='submit'
//                                     disabled={isLoading}
//                                     style={{
//                                         backgroundColor: '#0a5d5d',
//                                         cursor: isLoading ? 'not-allowed' : 'pointer'
//                                     }}
//                                 >
//                                     {isLoading ? 'Saving...' : 'Save Address'}
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Profile
"use client";

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import Swal from 'sweetalert2';
import apiInstance from '@/api/instance';

const Profile = () => {
    const { userId, userEmail, userName, userPhone } = useSelector((state) => state.userData);
    const [phone, setPhone] = useState('');
    const [hasExistingAddress, setHasExistingAddress] = useState(false);
    const [addressId, setAddressId] = useState(null);

    // Profile form state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [originalData, setOriginalData] = useState({
        name: '',
        email: '',
        phone: ''
    });

    // Address form state
    const [addressData, setAddressData] = useState({
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: ''
    });
    const [originalAddressData, setOriginalAddressData] = useState({
        firstName: '',
        lastName: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        zipCode: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState(null);

    useEffect(() => {
        const name = userName;
        const email = userEmail;
        const usermobile = userPhone;
        const id = userId;

        setId(id);
        setPhone(userPhone || '');
        setFormData({
            name: name || '',
            email: email || '',
            phone: usermobile || ''
        });
        setOriginalData({
            name: name || '',
            email: email || '',
            phone: usermobile || ''
        });

        // Load address data when component mounts
        loadAddressData();
    }, [userId, userEmail, userName, userPhone]);

    const loadAddressData = async () => {
        try {
            const response = await apiInstance.get(`/api/address/user/${userId}`);
            if (response.status === 200 && response.data) {
                // If address exists, set the flag and ID
                setHasExistingAddress(true);
                setAddressId(response.data._id || response.data.id);
                
                // Populate address form with existing data
                const newAddressData = {
                    firstName: response.data.firstName || '',
                    lastName: response.data.lastName || '',
                    addressLine1: response.data.addressLine1 || '',
                    addressLine2: response.data.addressLine2 || '',
                    city: response.data.city || '',
                    state: response.data.state || '',
                    zipCode: response.data.zipCode || ''
                };

                setAddressData(newAddressData);
                setOriginalAddressData(newAddressData);
            }
        } catch (error) {
            console.error('Error loading address data:', error);
            // If no address exists, keep the form empty
            setHasExistingAddress(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setAddressData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const hasProfileChanges = () => {
        return (
            formData.name !== originalData.name ||
            formData.email !== originalData.email ||
            phone !== originalData.phone
        );
    };

    const hasAddressChanges = () => {
        return (
            addressData.firstName !== originalAddressData.firstName ||
            addressData.lastName !== originalAddressData.lastName ||
            addressData.addressLine1 !== originalAddressData.addressLine1 ||
            addressData.addressLine2 !== originalAddressData.addressLine2 ||
            addressData.city !== originalAddressData.city ||
            addressData.state !== originalAddressData.state ||
            addressData.zipCode !== originalAddressData.zipCode
        );
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        if (!hasProfileChanges()) {
            Swal.fire({
                icon: 'info',
                text: 'No Changes Made',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await apiInstance.put(`/api/auth/editUser/${id}`, { ...formData, mobile: phone });

            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    text: 'Profile Updated Successfully',
                    timer: 2000,
                    showConfirmButton: false
                });
                localStorage.setItem('user', response.data.name);
                localStorage.setItem('userEmail', response.data.email);
                localStorage.setItem('userPhone', response.data.mobile);
                setOriginalData({
                    name: response.data.name,
                    email: response.data.email,
                    phone: response.data.mobile
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message || 'Update failed',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message || 'Update failed',
                timer: 2000,
                showConfirmButton: false
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        if (!hasAddressChanges()) {
            Swal.fire({
                icon: 'info',
                text: 'No Changes Made',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        setIsLoading(true);
        try {
            let response;
            
            if (hasExistingAddress && addressId) {
                // Update existing address with PUT request
                response = await apiInstance.put(`/api/address/${addressId}`, {
                    ...addressData,
                    userId: id
                });
            } else {
                // Create new address with POST request
                response = await apiInstance.post('/api/address', {
                    ...addressData,
                    userId: id
                });
            }

            if (response.status === 200 || response.status === 201) {
                Swal.fire({
                    icon: 'success',
                    text: hasExistingAddress ? 'Address Updated Successfully' : 'Address Saved Successfully',
                    timer: 2000,
                    showConfirmButton: false
                });
                
                // Update state if this was a new address
                if (!hasExistingAddress) {
                    setHasExistingAddress(true);
                    setAddressId(response.data._id || response.data.id);
                }

                // Update original address data
                setOriginalAddressData(addressData);
            } else {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message || 'Failed to save address',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message || 'Failed to save address',
                timer: 2000,
                showConfirmButton: false
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container-fluid px-3">
            <h2 className='text-center fw-bolder display-5 mt-4 mb-4'>PROFILE</h2>
            <div className="d-flex flex-column align-items-center justify-contant-center py-3 py-md-5">
                <div className="w-100" style={{ maxWidth: "500px" }}>
                    <div className="mb-5">
                        <h4 className='fw-bold mb-2'>Update Profile</h4>
                        <form onSubmit={handleProfileSubmit}>
                            <label className='mt-3'>Full Name: </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                onChange={handleChange}
                                className='form-control py-3'
                                placeholder='ENTER YOUR NAME'
                                value={formData.name}
                            />
                            <label className='mt-3'>E-Mail: </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                className='form-control py-3'
                                placeholder='ENTER YOUR EMAIL'
                                value={formData.email}
                            />
                            <div className='mt-3'>
                                <PhoneInput
                                    international
                                    defaultCountry="US"
                                    value={phone}
                                    onChange={setPhone}
                                    className='form-control py-3'
                                    placeholder="ENTER YOUR PHONE NUMBER"
                                />
                            </div>
                            <button
                                className='d-block w-100 mt-3 py-3 border-0 fw-semibold text-white rounded-1'
                                type='submit'
                                disabled={!hasProfileChanges() || isLoading}
                                style={{
                                    backgroundColor: !hasProfileChanges() ? '#cccccc' : '#0a5d5d',
                                    cursor: !hasProfileChanges() ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isLoading ? 'Updating...' : 'Update Profile'}
                            </button>
                        </form>
                    </div>

                    <div className="mt-5">
                        <h4 className='fw-bold mb-2'>Shipping Address</h4>
                        <form onSubmit={handleAddressSubmit}>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="firstName"
                                        className="form-control"
                                        placeholder="First name"
                                        value={addressData.firstName}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="lastName"
                                        className="form-control"
                                        placeholder="Last name"
                                        value={addressData.lastName}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="addressLine1"
                                    className="form-control"
                                    placeholder="Address"
                                    value={addressData.addressLine1}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="addressLine2"
                                    className="form-control"
                                    placeholder="Apartment, suite, etc. (optional)"
                                    value={addressData.addressLine2}
                                    onChange={handleAddressChange}
                                />
                            </div>
                            <div className="row mb-3">
                                <div className="col-md-5">
                                    <input
                                        type="text"
                                        name="city"
                                        className="form-control"
                                        placeholder="City"
                                        value={addressData.city}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-3">
                                    <input
                                        type="text"
                                        name="state"
                                        className="form-control"
                                        placeholder="State"
                                        value={addressData.state}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </div>
                                <div className="col-md-4">
                                    <input
                                        type="text"
                                        name="zipCode"
                                        className="form-control"
                                        placeholder="ZIP code"
                                        value={addressData.zipCode}
                                        onChange={handleAddressChange}
                                        required
                                    />
                                </div>
                            </div>
                            <button
                                className='d-block w-100 mt-3 py-3 border-0 fw-semibold text-white rounded-1'
                                type='submit'
                                disabled={!hasAddressChanges() || isLoading}
                                style={{
                                    backgroundColor: !hasAddressChanges() ? '#cccccc' : '#0a5d5d',
                                    cursor: !hasAddressChanges() ? 'not-allowed' : 'pointer'
                                }}
                            >
                                {isLoading ? 'Saving...' : hasExistingAddress ? 'Update Address' : 'Save Address'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;