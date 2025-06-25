// import React from 'react'

// const BlogCard = ({ img, title, date, description }) => {
//     return (
//         <div className="blog-card shadow-lg rounded-4 overflow-hidden">
//             <div className="img-container">
//                 <img
//                     src={img}
//                     alt="blog"
//                     className='img-fluid w-100 h-auto rounded-top-4'
//                     style={{
//                         objectFit: 'cover',
//                         maxHeight: '500px',
//                         minHeight: '300px'
//                     }}
//                 />
//             </div>
//             <div className="content p-3 p-md-4 p-lg-5">
//                 <h3 className="title mb-3 fw-bold fs-4 fs-lg-3">{title}</h3>
//                 <div className="meta mb-3 d-flex flex-wrap gap-2">
//                     <span className='fw-semibold opacity-75 text-uppercase' style={{ fontSize: '0.75rem' }}>
//                         {date}
//                     </span>
//                     <span className='fw-semibold opacity-75 text-uppercase' style={{ fontSize: '0.75rem' }}>
//                         Comments
//                     </span>
//                 </div>
//                 <p className="description opacity-75 mb-0">{description}</p>
//                 <button className="btn btn-outline-dark mt-4 px-4 py-2">
//                     Read More
//                 </button>
//             </div>
//         </div>
//     )
// }

// export default BlogCard


import React, { useState } from 'react';

const BlogCard = ({ img, title, date, description }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(prev => !prev);
    };

    return (
        <div className="blog-card shadow-lg rounded-4 overflow-hidden">
            <div className="img-container">
                <img
                    src={img}
                    alt="blog"
                    className='img-fluid w-100 h-auto rounded-top-4'
                    style={{
                        objectFit: 'cover',
                        maxHeight: '500px',
                        minHeight: '300px'
                    }}
                />
            </div>
            <div className="content p-3 p-md-4 p-lg-5">
                <h3 className="title mb-3 fw-bold fs-4 fs-lg-3">{title}</h3>
                <div className="meta mb-2 d-flex flex-wrap gap-2">
                    <span className='fw-semibold opacity-75 text-uppercase' style={{ fontSize: '0.75rem' }}>
                        {date}
                    </span>
                    <span className='fw-semibold opacity-75 text-uppercase' style={{ fontSize: '0.75rem' }}>
                        Comments
                    </span>
                </div>
                <p className="description opacity-75 mb-0">
                    {showFullDescription
                        ? description
                        : (description.length > 150
                            ? `${description.substring(0, 350)}...`
                            : description)
                    }
                </p>
                {description.length > 150 && (
                    <button
                        className="btn btn-outline-dark mt-4 px-4 py-2"
                        onClick={toggleDescription}
                    >
                        {showFullDescription ? 'Show Less' : 'Read More'}
                    </button>
                )}
            </div>
        </div>
    );
};

export default BlogCard;
