import React, { useState } from 'react';

const LatestNews = ({ title, img, description, author }) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(prev => !prev);
    };

    return (
        <div className="latest-news-item">
            <div className="row align-items-center">
                {/* Image Column */}
                <div className="col-12 col-md-6 mb-4 mb-md-0">
                    <div className="img-container">
                        <img
                            src={img}
                            alt="news"
                            className='img-fluid rounded shadow-sm'
                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                    </div>
                </div>

                {/* Content Column */}
                <div className="col-12 col-md-6 px-3 px-md-5">
                    <div className="content">
                        <div className="meta mb-2">
                            <span className='text-muted small'>Oct 22, 2023 </span>
                            <span className='text-muted small'>- By {author}</span>
                        </div>
                        <h2 className='h3 fw-normal pt-1'>{title}</h2>
                        <hr className='my-3' />
                        <p className='text-muted pb-3'>
                            {showFullDescription ? description : (
                                description.length > 150 ? `${description.substring(0, 150)}...` : description
                            )}
                        </p>
                        {description.length > 150 && (
                            <button
                                className='btn btn-outline-primary px-4 py-2'
                                onClick={toggleDescription}
                            >
                                {showFullDescription ? 'Show Less' : 'Read More'}
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Responsive CSS */}
            <style jsx>{`
                .latest-news-item {
                    padding: 15px;
                }
                @media (max-width: 767.98px) {
                    .latest-news-item {
                        text-align: center;
                    }
                    .content {
                        padding-top: 20px;
                    }
                    hr {
                        margin-left: auto;
                        margin-right: auto;
                        width: 50%;
                    }
                }
                @media (min-width: 768px) {
                    .img-container {
                        max-height: 350px;
                        overflow: hidden;
                    }
                }
            `}</style>
        </div>
    );
};

export default LatestNews;
