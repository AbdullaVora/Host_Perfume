"use client";

import React, { useEffect } from 'react'
import BlogCard from '@/components/BlogCard'
import { useDispatch, useSelector } from 'react-redux'
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchBanners } from '@/redux/slice/HomeSlice';
import Script from 'next/script';

const Blog = () => {

    const frontendUrl = process.env.NEXT_FRONTEND_URL;

    const blogSchema = {
        "@context": "https://schema.org",
        "@type": "Blog",
        "name": "HQ PERFUME Blog",
        "url": `${frontendUrl}/blog`,
        "description": "Luxury perfume insights, tips, and stories from HQ PERFUME."
    };

    const dispatch = useDispatch()
    const { Home, loading: Loading } = useSelector((state) => state.Home)

    const data = Home

    useEffect(() => {
        dispatch(fetchBanners());
    }, [dispatch])

    const Blog = data.banners?.filter((item) => item.forPage === 'Blog' && item.forSection === 'Blogs' && item.status === true) || [];

    if (Loading) {
        return (
            <div className='loader-container'>
                <span className="loader"></span>
            </div>
        );
    }

    return (
        <>
            {/* SEO */}
            <Script
                id="blog-schema"
                type="application/ld+json"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
            />

            {/* <Header /> */}
            <div className="blog-page">
                <h2 className='text-center fw-bolder display-5 mt-3 mt-lg-5 mb-4 mb-lg-5'>BLOGS</h2>
                <div className="container">
                    <div className="row">
                        {Blog.map((blog, index) => (
                            <div key={index} className="col-12 mb-5">
                                <BlogCard
                                    img={blog.desktopImage}
                                    title={blog.name}
                                    date={new Date(blog.updatedAt).toLocaleDateString()}
                                    description={blog.description}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default Blog