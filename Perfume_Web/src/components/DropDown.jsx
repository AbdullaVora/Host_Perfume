import React from 'react';

const DropDown = () => {
    // Stop event propagation to prevent dropdown from hiding
    const handleClick = (event) => {
        event.stopPropagation();
    };

    return (
        <>
            <div
                className="DropBox bg-light px-3 py-4 position-absolute visible"
                style={{ top: 40, right: 0, width: '201px' }}
                onClick={handleClick} // Add click handler to stop propagation
            >
                <div className="check text-start">
                    <input type="checkbox" name="inStock" id="" /> <span className='ms-2 bg-transparent'>In Stock</span>
                </div>
                <div className="check text-start">
                    <input type="checkbox" name="inStock" id="" /> <span className='ms-2 bg-transparent'>Out Of Stock</span>
                </div>
            </div>
        </>
    );
};

export default DropDown;
    