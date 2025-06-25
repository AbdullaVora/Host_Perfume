"use client";

import React from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header';
import Script from 'next/script';

const About = () => {
    const frontendUrl = process.env.NEXT_FRONTEND_URL; // fallback

    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "HQ PERFUME",
        "url": `${frontendUrl}/about`,
        "logo": `${frontendUrl}/logo.png`,
        "description": "HQ PERFUME is a luxury fragrance brand known for long-lasting, elegant scents.",
        "sameAs": [
            "https://www.instagram.com/yourbrand"
        ],
        "founder": {
            "@type": "Person",
            "name": "HQ PERFUME"
        },
        "foundingDate": "2025",
        "location": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": "SURAT",
                "addressCountry": "IN"
            }
        }
    };
    return (
        <>
            {/* SEO */}
            <Script
                id="about-organization-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
            />

            {/* <Header /> */}
            <div className="about">
                <div className="container">
                    <h2 className='my-3 my-md-5 display-4 display-md-5 text-center fw-bold'>ABOUT US</h2>

                    {/* Top Section */}
                    <div className="topSection my-3 my-md-5 pb-3 pb-md-5">
                        <div className="img my-3 my-md-5 text-center">
                            <img
                                src="/images/about_1.webp"
                                alt="about"
                                className='rounded-3 img-fluid' width={1300}
                            />
                        </div>
                        <div className="title px-2 px-md-0">
                            <p className='fw-bold'>Lorem ipsum dolor sit am et, consectetur adipiscing elit. Etiam consequat ut ex vel finibus. Nunc eget molestie purus. Fusce imperdiet pulvinar est, eget fermentum nisilin as. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curaes</p>
                            <p className='my-3 my-md-4'>Maecenas congue metus id turpis iaculis mattis. Sed pellentesque id arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit eros maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus rutrum, lobortis sed mauris. Integer congue, sem elementum varius tristique, erat nulla rutrum risus, a imperdiet nulla lorem fermentum erat. Pellentesque elementum justo at velit fringilla, eu feugiat erat fermentum. Vivamus libero dolor, porta eget vehicula eu, iaculis id lacus. Sed interdum convallis sapien, eget faucibus sapien. Proin hendrerit lacus turpis.</p>
                            <p className=''>Maecenas congue metus id turpis iaculis mattis. Sed pellentesque id arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit eros maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus rutrum, lobortis sed mauris.</p>
                            <p className='mb-2'>Maecenas congue metus id turpis iaculis mattis. Sed pellentesque id arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit eros maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus rutrum, lobortis sed mauris.</p>
                        </div>
                    </div>

                    {/* Comment Box Section */}
                    <div className="secondSection my-1 my-md-2">
                        <div className="commentBox rounded-5 p-3 p-md-5 mx-auto" style={{ maxWidth: '100%', height: 'auto', backgroundColor: '#f1f1f1' }}>
                            <div className="row justify-content-between align-items-center">
                                <div className="col-12 col-md-3 text-center text-md-start mb-3 mb-md-0">
                                    <img src="/images/about_2.avif" alt="" className='img-fluid' style={{ maxWidth: '150px' }} />
                                </div>
                                <div className="col-12 col-md-9">
                                    <p className='fs-5 fs-md-4 mb-2 mb-md-3'>Best purchase I've made this winter! The color and knitting are exquisite and it's so comfy! Went from NYC to Miami without ever taking it off. Super cute!!</p>
                                    <span className="fw-bold"> Kwang Shang - CEO VinovaThemes</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="thirdSection my-3 my-md-5">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-6 order-2 order-md-1 mt-3 mt-md-0">
                                <span className='fs-4 fs-md-3 d-block fw-bold mb-3 mb-md-4'>Why Choose Us ?</span>
                                <p className='opacity-75' style={{ lineHeight: '1.6', fontSize: '1rem' }}>
                                    Maecenas congue metus id turpis iaculis mattis. Sed pellentesque id arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit eros maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus rutrum, lobortis sed mauris. Integer congue, sem elementum varius tristique.
                                </p>
                                <p className='opacity-75' style={{ lineHeight: '1.6', fontSize: '1rem' }}>
                                    Maecenas congue metus id turpis iaculis mattis. Sed pellentesque id arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit eros maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus rutrum, lobortis sed mauris. Integer congue, sem elementum varius tristique.
                                </p>
                                <p className='opacity-75' style={{ lineHeight: '1.6', fontSize: '1rem' }}>
                                    Integer non tincidunt justo, rhoncus Aenean venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus rutrum, lobortis sed mauris. Integer congue, sem elementum varius tristique.
                                </p>
                            </div>
                            <div className="col-12 col-md-6 order-1 order-md-2 text-center">
                                <img src="/images/about_3.webp" alt="" className='img-fluid rounded' />
                            </div>
                        </div>
                    </div>

                    {/* Trusted Shopping Section */}
                    <div className="fourthSection my-2">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-6 text-center mb-3 mb-md-0">
                                <img src="/images/about_4.gif" alt="" className='img-fluid rounded' />
                            </div>
                            <div className="col-12 col-md-6">
                                <span className='fs-4 fs-md-3 d-block fw-bold mb-3 mb-md-4'>Trusted Online Shopping</span>
                                <p className='opacity-75' style={{ lineHeight: '1.6', fontSize: '1rem' }}>
                                    Maecenas congue metus id turpis iaculis mattis. Sed pellentesque id arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit eros maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus rutrum, lobortis sed mauris. Integer congue, sem elementum varius tristique.
                                </p>
                                <p className='opacity-75' style={{ lineHeight: '1.6', fontSize: '1rem' }}>
                                    Maecenas congue metus id turpis iaculis mattis. Sed pellentesque id arcu id scelerisque. Ut ullamcorper rutrum justo, at blandit eros maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus rutrum, lobortis sed mauris. Integer congue, sem elementum varius tristique.
                                </p>
                                <p className='opacity-75' style={{ lineHeight: '1.6', fontSize: '1rem' }}>
                                    Ut ullamcorper rutrum justo, at blandit eros maximus ut. Integer non tincidunt justo, rhoncus Aenean venenatis sed purus ac sollicitudin. Nulla mauris risus, commodo et luctus rutrum, lobortis sed mauris. Integer congue, sem elementum varius tristique.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* <Footer /> */}
                </div>
            </div>

            {/* Add responsive styles */}
            <style jsx>{`
                .about {
                    overflow-x: hidden;
                }
                
                .commentBox {
                    transition: all 0.3s ease;
                }
                
                @media (max-width: 768px) {
                    .commentBox {
                        padding: 1.5rem !important;
                    }
                    
                    .title p {
                        font-size: 0.95rem;
                    }
                }
            `}</style>
        </>
    )
}

export default About