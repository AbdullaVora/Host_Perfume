import React from 'react'
import Link from "next/link";

const GalleryBox = ({ img, title_1, title_2, category, subcategory }) => {
    return (
        <>
            <div className="box rounded-3 relative shadow-lg">
                <img src={img} alt="image" className='img-fluid rounded-3' />
                <h2 style={{ color:'black' }} className='absolute translate-middle fw-semibold'>
                    <span style={{ color:'#0A5D5D' }}>{title_1}&nbsp;</span>{title_2}
                </h2>
                <p style={{ color:'black' }} className='absolute translate-middle fw-semibold'>Get up to 40% off</p>
                <Link 
                    href={`/collection?category=${encodeURIComponent(category)}${subcategory ? `&subcategory=${encodeURIComponent(subcategory)}` : ''}`}
                >
                    <button 
                        style={{ 
                            background: '#2c2c2c', 
                            color: 'white' 
                        }} 
                        className='py-2 px-3 absolute translate-middle fw-semibold'
                    >
                        SHOP NOW
                    </button>
                </Link>
            </div>
        </>
    )
}

export default GalleryBox;
