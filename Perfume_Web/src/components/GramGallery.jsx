import React from 'react'

const GramGallery = ({ img }) => {
    return (
        <>
            <div className="img">
                <img src={img} alt="" className='img-fluid' />
            </div>
        </>
    )
}

export default GramGallery
