"use client";

import React from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header';
import Script from 'next/script';

const PrivacyPolicy = () => {
    const frontendUrl = process.env.NEXT_FRONTEND_URL;

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Privacy Policy",
        "description": "Privacy policy and terms of service for HQ PERFUME online store.",
        "url": `${frontendUrl}/privacy-policy`,
        "publisher": {
            "@type": "Organization",
            "name": "HQ PERFUME"
        }
    };

    return (
        <>
            {/* SEO */}
            <Script
                id="privacy-policy-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />

            {/* <Header /> */}
            <div className="privacy-policy">
                <div className="container">
                    <h2 className='my-3 my-md-5 display-4 display-md-5 text-center fw-bold'>PRIVACY POLICY</h2>

                    <div className="content px-2 px-md-4 py-3 py-md-4 bg-white rounded-3 shadow-sm">
                        {/* Introduction */}
                        <section className="mb-4 mb-md-5">
                            <h3 className='fs-3 fs-md-2 fw-bold mb-3 mb-md-4'>Introduction</h3>
                            <p className='mb-3 opacity-75'>
                                Welcome to HQ PERFUME. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website or make a purchase.
                            </p>
                            <p className='opacity-75'>
                                By using our website, you agree to the terms outlined in this policy. Please read this document carefully to understand our practices regarding your personal data.
                            </p>
                        </section>

                        {/* Information Collection */}
                        <section className="mb-4 mb-md-5">
                            <h3 className='fs-3 fs-md-2 fw-bold mb-3 mb-md-4'>Information We Collect</h3>
                            <p className='mb-2 opacity-75'>We may collect the following types of information:</p>
                            <ul className='list-disc ps-4 opacity-75'>
                                <li className='mb-2'>Personal identification information (Name, email address, phone number, etc.)</li>
                                <li className='mb-2'>Shipping and billing address</li>
                                <li className='mb-2'>Payment information (processed securely through our payment gateways)</li>
                                <li className='mb-2'>Order history and preferences</li>
                                <li className='mb-2'>Device and browsing information for analytics</li>
                            </ul>
                        </section>

                        {/* Delivery Policy */}
                        <section className="mb-4 mb-md-5">
                            <h3 className='fs-3 fs-md-2 fw-bold mb-3 mb-md-4'>Delivery Policy</h3>
                            <div className="bg-gray-100 p-3 p-md-4 rounded-3 mb-3">
                                <h4 className='fs-4 fw-bold mb-2'>Shipping Information</h4>
                                <p className='mb-2 opacity-75'>
                                    We aim to process and ship all orders within 1-2 business days. Delivery typically takes:
                                </p>
                                <ul className='list-disc ps-4 opacity-75'>
                                    <li className='mb-1'>Domestic (India): 2-7 business days</li>
                                </ul>
                                <p className='mt-2 opacity-75'>
                                    Delivery times may vary during holidays or peak seasons. You will receive tracking information once your order ships.
                                </p>
                            </div>
                        </section>

                        {/* Return Policy */}
                        <section className="mb-4 mb-md-5">
                            <h3 className='fs-3 fs-md-2 fw-bold mb-3 mb-md-4'>Return & Refund Policy</h3>
                            <div className="bg-gray-100 p-3 p-md-4 rounded-3">
                                <h4 className='fs-4 fw-bold mb-2'>No Return Policy</h4>
                                <p className='mb-2 opacity-75'>
                                    Due to the nature of our products (perfumes being personal care items), we do not accept returns or exchanges unless the product arrives damaged or defective.
                                </p>
                                <p className='opacity-75'>
                                    If you receive a damaged or incorrect item, please contact us within 48 hours of delivery at <span className="fw-bold">hqperfume63@gmail.com</span> with your order number and photos of the issue.
                                </p>
                            </div>
                        </section>

                        {/* Payment Security */}
                        <section className="mb-4 mb-md-5">
                            <h3 className='fs-3 fs-md-2 fw-bold mb-3 mb-md-4'>Secure Payment Methods</h3>
                            <p className='mb-3 opacity-75'>
                                We offer multiple secure payment options to ensure your transaction is safe:
                            </p>
                            <div className="row g-3">
                                <div className="col-6 col-md-3 text-center">
                                    <div className="p-2 bg-white rounded-2 shadow-sm h-100 d-flex align-items-center justify-content-center">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Credit-card.svg" alt="Credit Cards" className="img-fluid" style={{maxHeight: '30px'}} />
                                    </div>
                                </div>
                                <div className="col-6 col-md-3 text-center">
                                    <div className="p-2 bg-white rounded-2 shadow-sm h-100 d-flex align-items-center justify-content-center">
                                        <img src="https://razorpay.com/build/browser/static/logo-blue.5a32db88.svg" alt="Razorpay" className="img-fluid" style={{maxHeight: '30px'}} />
                                    </div>
                                </div>
                                <div className="col-6 col-md-3 text-center">
                                    <div className="p-2 bg-white rounded-2 shadow-sm h-100 d-flex align-items-center justify-content-center">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/e/eb/UPI-Logo-vector.svg" alt="UPI" className="img-fluid" style={{maxHeight: '30px'}} />
                                    </div>
                                </div>
                            </div>
                            <p className='mt-3 opacity-75'>
                                All payments are processed through PCI-DSS compliant payment gateways. We do not store your credit card information on our servers.
                            </p>
                        </section>

                        {/* Customer Support */}
                        <section className="mb-4 mb-md-5">
                            <h3 className='fs-3 fs-md-2 fw-bold mb-3 mb-md-4'>Customer Support</h3>
                            <div className="bg-gray-100 p-3 p-md-4 rounded-3">
                                <h4 className='fs-4 fw-bold mb-2'>Contact Us</h4>
                                <p className='mb-2 opacity-75'>
                                    For any questions or concerns regarding your order, privacy, or our policies, please contact our support team:
                                </p>
                                <ul className='opacity-75'>
                                    <li className='mb-1'><span className="fw-bold">Email:</span> hqperfume63@gmail.com</li>
                                    <li className='mb-1'><span className="fw-bold">Phone:</span> +91 6355772763 (10AM-6PM, Mon-Sat)</li>
                                    <li className='mb-1'><span className="fw-bold">Address:</span> River Point, New Rander Road, Surat, Gujarat, India - 395009</li>
                                </ul>
                                <p className='mt-2 opacity-75'>
                                    We aim to respond to all inquiries within 24-48 hours during business days.
                                </p>
                            </div>
                        </section>

                        {/* Data Protection */}
                        <section className="mb-4 mb-md-5">
                            <h3 className='fs-3 fs-md-2 fw-bold mb-3 mb-md-4'>Data Protection</h3>
                            <p className='mb-3 opacity-75'>
                                We implement appropriate security measures to protect your personal information:
                            </p>
                            <ul className='list-disc ps-4 opacity-75'>
                                <li className='mb-2'>SSL encryption for all data transmissions</li>
                                <li className='mb-2'>Regular security audits of our systems</li>
                                <li className='mb-2'>Limited access to personal data within our organization</li>
                                <li className='mb-2'>Secure storage of sensitive information</li>
                            </ul>
                        </section>

                        {/* Policy Updates */}
                        <section>
                            <h3 className='fs-3 fs-md-2 fw-bold mb-3 mb-md-4'>Policy Updates</h3>
                            <p className='opacity-75'>
                                We may update this Privacy Policy periodically. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy regularly to stay informed about how we protect your information.
                            </p>
                            <p className='mt-3 opacity-75 fw-bold'>
                                Last Updated: June 26, 2025
                            </p>
                        </section>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}

            {/* Add responsive styles */}
            <style jsx>{`
                .privacy-policy {
                    overflow-x: hidden;
                }
                
                ul.list-disc li {
                    margin-bottom: 0.5rem;
                }
                
                @media (max-width: 768px) {
                    .content {
                        padding: 1.5rem !important;
                    }
                }
            `}</style>
        </>
    )
}

export default PrivacyPolicy