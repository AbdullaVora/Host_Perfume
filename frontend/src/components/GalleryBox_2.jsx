import React from 'react';
import Link from "next/link";


const GalleryBox_2 = ({img,title}) => {
    return (
        <>
            <div className="box_2 position-relative overflow-hidden shadow-lg rounded-4" style={{height: '350px'}}>
                <img src={img} alt="image" className='img-fluid w-100 h-100 rounded-4' />
                {/* <h2 className='position-absolute top-50 translate-middle-y ms-3 fs-1 fw-normal'>{title}</h2> */}
                {/* <Link href="#" className='position-absolute translate-middle-y text-black' style={{top: '60%', left:'3%'}}>Discover Now</Link>     */}
            </div>
        </>
    )
}


export default GalleryBox_2
