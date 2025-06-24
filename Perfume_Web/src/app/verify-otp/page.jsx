"use client";

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiInstance from '@/api/instance';
import Header from '@/components/Header';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';

const VerifyOtp = () => {

    const { userEmail } = useSelector((state) => state.userData)

    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const inputRefs = useRef([]);

    useEffect(() => {
        const checkPermission = localStorage.getItem('resetEmail');
        if (!checkPermission) {
            router.push('/forgot');
            Swal.fire({
                icon: 'error',
                text: 'You are not allowed to access this page',
                timer: 1000,
                showConfirmButton: false
            })
        }
        // Focus the first input on component mount
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }

        // Get email from localStorage if available
        const storedEmail = userEmail
        if (storedEmail) {
            setEmail(storedEmail);
        }
    }, []);

    const handleChange = (index, value) => {
        // Only allow digits
        if (value && !/^\d+$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus to next input
        if (value !== '' && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace to move to previous input
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();

        // Check if pasted content is 6 digits
        if (/^\d{6}$/.test(pastedData)) {
            const newOtp = pastedData.split('');
            setOtp(newOtp);

            // Focus the last input after pasting
            inputRefs.current[5].focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const otpString = otp.join('');

        // Validate OTP is complete
        if (otpString.length !== 6) {
            // toast.error('Please enter the complete 6-digit OTP', { autoClose: 2000 });
            Swal.fire({
                icon: 'error',
                text: 'Please enter the complete 6-digit OTP',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        setLoading(true);

        try {
            const response = await apiInstance.post('/api/auth/verify-otp', {
                email: email,
                otp: otpString
            });

            if (response.status === 200) {
                localStorage.setItem('resetPermission', true);
                // toast.success('OTP verified successfully', { autoClose: 2000 });
                Swal.fire({
                    icon: 'success',
                    text: 'OTP verified successfully',
                    timer: 2000,
                    showConfirmButton: false
                });
                setTimeout(() => {
                    router.push('/change-password');
                }, 2000);
            }
        } catch (error) {
            // toast.error(error.response?.data?.message || 'Invalid OTP. Please try again.', { autoClose: 2000 });
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message || 'Invalid OTP. Please try again',
                timer: 2000,
                showConfirmButton: false
            });
        } finally {
            setLoading(false);
        }
    };

    const resendOtp = async () => {
        if (!email) {
            // toast.error('Email not found. Please go back to the forgot password page.', { autoClose: 2000 });
            Swal.fire({
                icon: 'error',
                text: 'Email not found. Please go back to the forgot password page',
                timer: 2000,
                showConfirmButton: false
            });
            return;
        }

        try {
            setLoading(true);
            const response = await apiInstance.post('/api/auth/resend-otp', { email });

            if (response.status === 200) {
                // toast.success('OTP resent successfully', { autoClose: 2000 });
                Swal.fire({
                    icon: 'error',
                    text: 'OTP Resend Succesfully',
                    timer: 2000,
                    showConfirmButton: false
                });
            }
        } catch (error) {
            // toast.error(error.response?.data?.message || 'Failed to resend OTP', { autoClose: 2000 });
            Swal.fire({
                icon: 'error',
                text: error.response?.data?.message || 'Failed to resend OTP',
                timer: 2000,
                showConfirmButton: false
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* <Header /> */}
            <h2 className='text-center fw-bolder display-5 mt-4 mt-md-5 mb-3 mb-md-5'>ACCOUNT</h2>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-sm-10 col-md-8 col-lg-6 py-3 py-md-5">
                        <div className="login px-3 px-sm-4">
                            <h4 className='fw-bold mb-2'>VERIFY OTP</h4>
                            <span className='d-block' style={{ fontSize: '13px' }}>Enter the 6-digit code sent to your email</span>

                            {loading ? (
                                <div className='loader-container'>
                                    <span className="loader"></span>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="d-flex justify-content-between gap-1 gap-sm-2 mt-3 mb-3">
                                        {[0, 1, 2, 3, 4, 5].map((index) => (
                                            <input
                                                key={index}
                                                ref={(el) => (inputRefs.current[index] = el)}
                                                type="text"
                                                maxLength={1}
                                                className="form-control text-center fw-bold fs-4 p-0"
                                                value={otp[index]}
                                                onChange={(e) => handleChange(index, e.target.value)}
                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                onPaste={index === 0 ? handlePaste : null}
                                                style={{
                                                    width: '100%',
                                                    height: '50px',
                                                    maxWidth: '60px',
                                                    minWidth: '40px'
                                                }}
                                            />
                                        ))}
                                    </div>

                                    <button
                                        className='d-block w-100 mb-2 mt-4 py-3 border-0 fw-semibold text-white rounded-1'
                                        type='submit'
                                        disabled={loading}
                                    >
                                        Verify OTP
                                    </button>
                                    <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2">
                                        <span style={{ fontSize: '13px', opacity: '80%' }}>
                                            Didn't receive code? <span className='greenHover fw-bold cursor-pointer' onClick={resendOtp}>Resend OTP</span>
                                        </span>
                                        <span style={{ fontSize: '13px', opacity: '80%', marginTop: '8px', marginTop: '0' }}>
                                            <Link href="/forgot" className='text-decoration-none text-black'>
                                                <span className='greenHover fw-bold'>Back</span>
                                            </Link>
                                        </span>
                                    </div>

                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {/* <ToastContainer /> */}
        </>
    )
}

export default VerifyOtp