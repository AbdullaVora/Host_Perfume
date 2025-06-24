"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { IoIosMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiInstance from '@/api/instance';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Swal from 'sweetalert2';

const Forgot = () => {
    const [input, setInput] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [otpSend, setOtpSend] = useState(true);

    const router = useRouter()

    const handleChange = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        submitEmail();
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const submitEmail = async () => {
        try {
            const response = await apiInstance.post('/api/auth/forgot', input);
            if (response.loading) {
                return (
                    <div className='loader-container'>
                        <span className="loader"></span>
                    </div>
                )
            }
            if (response.status === 200) {
                if (response.data.message === "OTP sent to email") {
                    localStorage.setItem('resetEmail', response.data.email);
                    // localStorage.setItem('resetPermission', true);
                    // toast.success(response.data.message, { autoClose: 2000 });
                    Swal.fire({
                        icon: 'success',
                        text: 'OTP Sent To Email',
                        timer: 2000,
                        showConfirmButton: false
                    });
                    setTimeout(() => {
                        router.push('/verify-otp');
                    }, 1000);
                    // } else {
                    //     // toast.success(response.data.message, { autoClose: 2000 });
                    //     Swal.fire({
                    //         icon: 'success',
                    //         text: 'Email And Password Verified',
                    //         timer: 2000,
                    //         showConfirmButton: false
                    //     });
                    //     // localStorage.setItem('resetEmail', response.data.email);
                    //     // localStorage.setItem('resetPermission', true);
                    //     setTimeout(() => {
                    //         router.push('/change-password');
                    //     }, 1000);
                }
            } else {
                // toast.error(response.data.message, { autoClose: 2000 });
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            // toast.error(error.message, { autoClose: 2000 });
            Swal.fire({
                icon: 'error',
                text: error.message,
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    return (
        <>
            {/* <Header /> */}
            <h2 className='text-center fw-bolder display-5 mt-4 mt-md-5 mb-3 mb-md-5'>ACCOUNT</h2>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 py-3 py-md-5">
                        <div className="login px-3 px-sm-4">
                            <h4 className='fw-bold mb-2'>FORGOT PASSWORD</h4>
                            <span className='d-block' style={{ fontSize: '13px' }}>
                                Insert Your Email:
                            </span>
                            {/* {otpSend ? "Insert Your Email And Password : " : "Insert Your Email: "} */}
                            <form onSubmit={handleSubmit}>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    onChange={handleChange}
                                    required
                                    className='form-control mt-3 py-3'
                                    placeholder='ENTER YOUR EMAIL'
                                />
                                {/* {
                                    otpSend && (
                                        <div className="position-relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                onChange={handleChange}
                                                className='form-control mt-3 py-3 mb-2'
                                                placeholder='ENTER YOUR PASSWORD'
                                                required
                                            />
                                            <button
                                                type="button"
                                                className="position-absolute end-0 top-0 bg-transparent border-0 h-100 px-3"
                                                onClick={togglePasswordVisibility}
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                                            </button>
                                        </div>
                                    )
                                } */}

                                {/* {
                                    otpSend ? (
                                        <span style={{ fontSize: '13px', opacity: '80%', cursor: 'pointer' }}>Forgot using <span className='greenHover fw-bold' onClick={() => setOtpSend(false)}>OTP Send.</span></span>
                                    ) : (
                                        <span style={{ fontSize: '13px', opacity: '80%', cursor: 'pointer' }}>Forgot using <span className='greenHover fw-bold' onClick={() => setOtpSend(true)}>Password.</span></span>
                                    )
                                } */}
                                <button className='d-block w-100 mt-3 mb-2 py-3 border-0 fw-semibold text-white rounded-1' type='submit'>{otpSend ? "Verify Email" : "Send OTP"}</button>
                                <span className='d-block' style={{ fontSize: '13px', opacity: '80%' }}>Return to login page <Link href="/login" className='text-decoration-none text-black'><span className='greenHover fw-bold'>Login Here.</span></Link></span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    )
}

export default Forgot