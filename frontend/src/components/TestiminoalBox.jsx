import React from 'react'
import { FaComments } from "react-icons/fa6";


const TestiminoalBox = ({ title, author, img, description }) => {
    return (
        <>
            <div className="testimonialBox w-100 d-flex px-4 py-5 shadow justify-content-between">
                <div className="left col-5">
                    <div className="img">
                        <img src={img} alt="" className='img-fluid mx-3' />
                    </div>
                    <h5 className='fw-normal mt-2 text-center'>{title}</h5>
                    <span className='text-center d-block'>{author}</span>
                </div>
                <div className="right col-6">
                    <div className="icon text-center mb-2">
                        <FaComments size={45} color='#0A5D5D' />
                    </div>
                    <p className='text-center opacity-50'>{description}</p>
                </div>
            </div>
        </>
    )
}

export default TestiminoalBox
