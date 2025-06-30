"use client";

import React from 'react';
import Script from 'next/script';

const ReturnPolicy = () => {
    const frontendUrl = process.env.NEXT_FRONTEND_URL;

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Return & Cancellation Policy",
        "description": "Return and cancellation policy for HQ PERFUME: conditions for returns, refund eligibility, and contact process.",
        "url": `${frontendUrl}/return-policy`,
        "publisher": {
            "@type": "Organization",
            "name": "HQ PERFUME"
        }
    };

    return (
        <>
            <Script
                id="return-policy-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />

            <div className="return-policy container">
                <h2 className='my-3 my-md-5 display-4 text-center fw-bold'>RETURN & CANCELLATION POLICY</h2>

                <div className="content px-3 py-4 bg-white rounded-3 shadow-sm">

                    <section className="mb-4">
                        <h3 className='fs-5 fw-bold'>Return Eligibility</h3>
                        <p className="opacity-75">
                            At HQ PERFUME, we only accept returns in the following two conditions:
                        </p>
                        <ul className="list-disc ps-4 opacity-75">
                            <li>Product was <strong>physically damaged or broken</strong> during delivery</li>
                            <li>Customer received a <strong>completely different product</strong> than what was ordered</li>
                        </ul>
                        <p className="mt-2 opacity-75">
                            To process the return, you must provide an <strong>unboxing video</strong> and <strong>clear photos</strong> of the product and packaging immediately upon delivery.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">Return Process</h3>
                        <p className="opacity-75">
                            If your order meets the above conditions:
                        </p>
                        <ul className="list-disc ps-4 opacity-75">
                            <li>Email us at <strong>hqperfume63@gmail.com</strong> within <strong>48 hours</strong> of receiving the package</li>
                            <li>Attach your order number, unboxing video, and photos</li>
                            <li>Or call us at <strong>+91 6355772763</strong> (Mon–Sat, 10AM–6PM)</li>
                        </ul>
                        <p className="mt-2 opacity-75">
                            We respond within 24 hours on working days and verify your issue before processing a return.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">Replacement or Refund</h3>
                        <p className="opacity-75">
                            Once your return is approved, we will:
                        </p>
                        <ul className="list-disc ps-4 opacity-75">
                            <li><strong>Send a replacement</strong> of the same product (if available)</li>
                            <li>Or offer you a <strong>refund</strong> if the product is not available</li>
                        </ul>
                        <p className="mt-2 opacity-75">
                            Refunds are processed to your original payment method within <strong>9–10 business days</strong>.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">Cancellation Policy</h3>
                        <p className="opacity-75">
                            Orders can only be cancelled <strong>before they are dispatched</strong>. Once the order is shipped, it cannot be cancelled under any circumstances.
                        </p>
                        <p className="opacity-75 mt-2">
                            To cancel, contact us as soon as possible via email or phone with your order number.
                        </p>
                    </section>

                    <section>
                        <h3 className="fs-5 fw-bold">Contact Information</h3>
                        <p className="opacity-75">
                            <strong>Email:</strong> hqperfume63@gmail.com<br />
                            <strong>Phone:</strong> +91 6355772763<br />
                            <strong>Address:</strong> River Point, New Rander Road, Surat, Gujarat – 395009
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ReturnPolicy;
