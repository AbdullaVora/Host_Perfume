import React from 'react'

const PolicyCard = ({ img, title }) => {
    return (
        <>
            <div className="policyCard shadow-lg py-4 rounded-3 border-dark-subtle mx-2 mb-3">
                <div className="policy-head d-flex align-items-center justify-content-center">
                    <img src={img} alt="image" className='img-fluid' width={30} />
                    <span className='fs-6 ms-2'>{title}</span>
                </div>
                <p className='text-center mt-3'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
        </>
    )
}

export default PolicyCard
