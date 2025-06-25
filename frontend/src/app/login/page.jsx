"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { IoIosMail } from "react-icons/io";
import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import apiInstance from '@/api/instance';
import SideBar from '@/components/SideBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import { setUserData } from '@/redux/slice/userDataSlice';

const Login = () => {
    const [input, setInput] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch()

    const handleChange = (e) => {
        const { name, value } = e.target
        setInput({ ...input, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }

    const loginUser = async () => {
        try {
            const response = await apiInstance.post('/api/auth/login', input);
            if (response.loading) {
                return (
                    <div className='loader-container'>
                        <span className="loader"></span>
                    </div>
                )
            }
            if (response.status === 200) {
                Swal.fire({
                    icon: 'success',
                    text: 'Login Success',
                    timer: 2000,
                    showConfirmButton: false
                });
                localStorage.setItem('token', response?.data?.token);
                localStorage.setItem('userName', response?.data?.name);
                localStorage.setItem('userId', response?.data?.id);
                localStorage.setItem('userEmail', response?.data?.email);
                localStorage.setItem('userPhone', response?.data?.mobile);

                dispatch(setUserData({
                    userId: response?.data?.id,
                    userName: response?.data?.name,
                    userEmail: response?.data?.email,
                    userPhone: response?.data?.mobile,
                    token: response?.data?.token
                }))

                router.push('/');
            } else {
                Swal.fire({
                    icon: 'error',
                    text: response.data.message,
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            const errMsg = error.response?.data?.message || error.message;
            Swal.fire({
                icon: 'error',
                text: errMsg,
                timer: 2000,
                showConfirmButton: false
            });
        }
    }

    return (
        <>
            {/* <Header /> */}
            <div className="container-fluid px-3">
                <h2 className='text-center fw-bolder display-5 mt-4 mb-4'>ACCOUNT</h2>
                <div className="d-flex flex-column align-items-center justify-contant-center py-3 py-md-5">
                    <div className="login w-100" style={{ maxWidth: "500px" }}>
                        <h4 className='fw-bold mb-2'>SIGN IN</h4>
                        <span className='d-block' style={{ fontSize: '13px' }}>Insert Your Account Information: </span>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                name="email"
                                id="email"
                                onChange={handleChange}
                                className='form-control mt-3 py-3'
                                placeholder='ENTER YOUR EMAIL'
                            />
                            <div className="position-relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    onChange={handleChange}
                                    className='form-control mt-3 py-3 mb-2'
                                    placeholder='ENTER YOUR PASSWORD'
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
                            <Link href="/forgot" className='text-decoration-none text-black'>
                                <span style={{ fontSize: '13px' }} className='d-flex mb-2 align-items-center'>
                                    <IoIosMail color='#0a5d5d' size={20} className='me-1' />
                                    Forgot Your <span className='fw-bold greenHover'>&nbsp;Password ?</span>
                                </span>
                            </Link>
                            <button className='d-block w-100 mt-3 py-3 mb-2 border-0 fw-semibold text-white rounded-1' type='submit'>Login</button>
                            <span style={{ fontSize: '14px', opacity: '80%' }}>
                                If you don't have an account, please <Link href="/register" className='text-decoration-none text-black'><span className='greenHover fw-bold'>Register Here.</span></Link>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </>
    )
}

export default Login