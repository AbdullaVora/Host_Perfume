import { useRouter } from 'next/navigation'
import React from 'react'
import { HiOutlineShoppingCart } from 'react-icons/hi'
import { RiStarSmileLine } from 'react-icons/ri'

const FlahCard = ({ id, img, title, price }) => {
    const router = useRouter()

    const handleDetail = (id) => {
        router.push(`/productDetails/${id}`);
    }
    return (
        <>
            <div
                className="flashCard position-relative overflow-hidden px-2 w-[400px] h-[350px]"
                data-aos="zoom-in" data-aos-delay="150"
                onClick={() => handleDetail(id)}
            >
                <div className="img" style={{ width: '100%', height: '350px'}}>
                    <img
                        src={img}
                        alt="Flash-Card-img"
                        style={{objectFit: 'contain', objectPosition: 'center'}}
                        className="img-fluid w-[100%] h-[100%]"
                    />
                </div>
                <div className="content mt-3 text-center">
                    <h6 className="fw-normal">{title}</h6>
                    <span>${price}.00</span>
                </div>
                <div className="sideIcons">
                    <div className="cart">
                        <HiOutlineShoppingCart size={14} />
                    </div>
                    <div className="star">
                        <RiStarSmileLine size={17} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FlahCard
