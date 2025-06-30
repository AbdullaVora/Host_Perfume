"use client";

import React from 'react';
import Script from 'next/script';
import Link from 'next/link';

const ShippingPolicy = () => {
    const frontendUrl = process.env.NEXT_FRONTEND_URL;

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Shipping Policy",
        "description": "Shipping and delivery information for HQ PERFUME.",
        "url": `${frontendUrl}/shipping-policy`,
        "publisher": {
            "@type": "Organization",
            "name": "HQ PERFUME"
        }
    };

    return (
        <>
            <Script
                id="shipping-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />

            <div className="shipping-page container">
                <h2 className='my-3 my-md-5 display-4 text-center fw-bold'>SHIPPING POLICY</h2>

                <div className="content px-3 py-4 bg-white rounded-3 shadow-sm">
                    {/* Processing Time */}
                    <section className="mb-4">
                        <h3 className='fs-4 fw-bold mb-3'>Processing Time</h3>
                        <p className='opacity-75'>Orders are processed within 1-2 business days. Orders placed on weekends or public holidays will be processed on the next business day.</p>
                    </section>

                    {/* Estimated Delivery Time */}
                    <section className="mb-4">
                        <h3 className='fs-4 fw-bold mb-3'>Estimated Delivery Time</h3>
                        <p className='opacity-75'>Delivery times vary depending on your location:</p>
                        <ul className='list-disc ps-4 opacity-75'>
                            <li>Domestic (India): 2-7 business days</li>
                        </ul>
                        <p className='mt-2 opacity-75'>Delivery times may be extended during peak seasons or due to unforeseen circumstances.</p>
                    </section>

                    {/* Shipping Charges */}
                    <section className="mb-4">
                        <h3 className='fs-4 fw-bold mb-3'>Shipping Charges</h3>
                        <p className='opacity-75'>
                            We offer <strong>free shipping</strong> on all orders above ₹200. For orders below ₹200, a standard shipping fee will be applied and shown during checkout.
                        </p>
                    </section>

                    {/* Tracking & Order Information */}
                    <section>
                        <h3 className='fs-4 fw-bold mb-3'>Order Tracking</h3>
                        <p className='opacity-75'>
                            Once your order is shipped, you will receive an email with your tracking number and order confirmation. You can track your order using the <strong><Link href="/TrackOrder" className="text-decoration-underline">Track Order</Link></strong> page on our website. Simply enter your order number from the email to view the delivery status.
                        </p>
                        <p className='opacity-75'>
                            If you face any issues with tracking, feel free to contact our support team at <strong>hqperfume63@gmail.com</strong>.
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ShippingPolicy;
