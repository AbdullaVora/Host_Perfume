"use client";

import React from 'react';
import Script from 'next/script';

const TermsAndConditions = () => {
    const frontendUrl = process.env.NEXT_FRONTEND_URL;

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Terms and Conditions",
        "description": "Terms and Conditions for using HQ PERFUME's website and services.",
        "url": `${frontendUrl}/terms-and-conditions`,
        "publisher": {
            "@type": "Organization",
            "name": "HQ PERFUME"
        }
    };

    return (
        <>
            <Script
                id="terms-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />

            <div className="terms-page container">
                <h2 className='my-3 my-md-5 display-4 text-center fw-bold'>TERMS & CONDITIONS</h2>

                <div className="content px-3 py-4 bg-white rounded-3 shadow-sm">
                    <section className="mb-4">
                        <h3 className='fs-4 fw-bold'>Overview</h3>
                        <p className="opacity-75">
                            This website is operated by HQ PERFUME. Throughout the site, the terms “we”, “us” and “our” refer to HQ PERFUME. By accessing our site or purchasing something from us, you agree to be bound by these Terms and Conditions ("Terms of Service", "Terms").
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">1. Online Store Terms</h3>
                        <p className="opacity-75">
                            By using this site, you confirm that you are at least the age of majority in your state or province. You agree not to use our products for illegal purposes or violate any laws. Any breach will result in termination of your services.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">2. General Conditions</h3>
                        <p className="opacity-75">
                            We reserve the right to refuse service to anyone. Your non-credit card data may be transferred unencrypted over networks. Reproduction or exploitation of our service without written permission is prohibited.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">3. Accuracy, Completeness & Timeliness</h3>
                        <p className="opacity-75">
                            Information on this site may not always be current or complete. You are responsible for monitoring changes to our website.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">4. Modifications to the Service & Prices</h3>
                        <p className="opacity-75">
                            Product prices and availability may change without notice. We are not liable for any service changes or discontinuation.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">5. Products or Services</h3>
                        <p className="opacity-75">
                            Products may be available exclusively online and are subject to return/exchange per our policy. We may limit sales geographically or by individual. We do not guarantee product descriptions or colors are always accurate.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">6. Billing and Account Info</h3>
                        <p className="opacity-75">
                            We may cancel or limit orders at our discretion. You must provide accurate account and payment info. See our Return Policy for details.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">7. Optional Tools</h3>
                        <p className="opacity-75">
                            Third-party tools may be offered "as is". Use at your own risk. We’re not liable for third-party functionality or services.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">8. Third-Party Links</h3>
                        <p className="opacity-75">
                            We are not responsible for third-party content or services linked on our website. Read their terms before transacting.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">9. User Comments & Submissions</h3>
                        <p className="opacity-75">
                            Any submissions may be used by us without obligation. Do not submit unlawful, offensive, or malicious content. You're responsible for your submissions.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">10. Personal Information</h3>
                        <p className="opacity-75">
                            Your information is governed by our <a href="/privacy-policy" className="text-decoration-underline">Privacy Policy</a>.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">11. Errors and Omissions</h3>
                        <p className="opacity-75">
                            We reserve the right to correct errors or omissions at any time, including after orders are placed.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">12. Prohibited Uses</h3>
                        <p className="opacity-75">
                            You may not use our site for unlawful, abusive, obscene, or harmful activity. We reserve the right to terminate access if any violations occur.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">13. Disclaimer & Limitation of Liability</h3>
                        <p className="opacity-75">
                            We do not guarantee uninterrupted service. Products and services are provided “as is”. We are not liable for damages unless required by law.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">14. Indemnification</h3>
                        <p className="opacity-75">
                            You agree to indemnify HQ PERFUME from any third-party claims due to your breach of these Terms.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">15. Severability</h3>
                        <p className="opacity-75">
                            If any provision is deemed unenforceable, the rest of the agreement remains valid.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">16. Termination</h3>
                        <p className="opacity-75">
                            We may terminate service at any time if Terms are violated. Obligations before termination remain enforceable.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">17. Entire Agreement</h3>
                        <p className="opacity-75">
                            These Terms represent the full agreement between you and HQ PERFUME. No oral or prior agreements apply.
                        </p>
                    </section>

                    <section className="mb-4">
                        <h3 className="fs-5 fw-bold">18. Governing Law</h3>
                        <p className="opacity-75">
                            These Terms are governed by the laws of Surat, Gujarat, India.
                        </p>
                    </section>

                    <section>
                        <h3 className="fs-5 fw-bold">19. Contact Information</h3>
                        <p className="opacity-75">
                            For questions, contact us at: <strong>hqperfume63@gmail.com</strong><br />
                            Address: River Point, New Rander Road, Surat, Gujarat - 395009
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default TermsAndConditions;
