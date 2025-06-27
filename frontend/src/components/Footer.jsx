// import React from 'react'
// import { IoLocationOutline } from "react-icons/io5";
// import { CiPhone } from "react-icons/ci";
// import { MdOutlineAttachEmail } from "react-icons/md";
// import { FaFacebookF } from "react-icons/fa";
// import { FaInstagram } from "react-icons/fa";
// import { FaTwitter } from "react-icons/fa";
// import { FaPinterestP } from "react-icons/fa";

// const Footer = () => {
//     const footer = [{ logo: <IoLocationOutline />, title: '2357 Gordon Street, CA' }, { logo: <CiPhone />, title: '123-456-7890' }, { logo: <MdOutlineAttachEmail />, title: 'info@domain.com' }]
//     return (
//         <>
//             <footer className='py-5 mt-5'>
//                 <div className="container">
//                     <div className="row justify-content-between align-items-baseline">
//                         <div className="col-2">
//                             <div className="logo">
//                                 <img src="/images/Logo.webp" alt="Logo" className='img-fluid' width={200} />
//                             </div>
//                             {footer.map((foot, index) => (
//                                 <div key={index} className="location mt-3 d-flex align-items-center">
//                                     {foot.logo}
//                                     <span className='opacity-75 ps-3'>{foot.title}</span>
//                                 </div>
//                             ))}
//                         </div>
//                         <div className="col-2">
//                             <h4 className='pb-2'>About Us</h4>
//                             <h5 className='mt-4 fw-normal fs-6 opacity-75'>Our Storys</h5>
//                             <h5 className='mt-3 fw-normal fs-6 opacity-75'>Our Teams</h5>
//                             <h5 className='mt-3 fw-normal fs-6 opacity-75'>Our Designers</h5>
//                         </div>
//                         <div className="col-2">
//                             <h4 className='pb-2'>Customer Service</h4>
//                             <h5 className='mt-4 fw-normal fs-6 opacity-75'>Home</h5>
//                             <h5 className='mt-3 fw-normal fs-6 opacity-75'>Products</h5>
//                             <h5 className='mt-3 fw-normal fs-6 opacity-75'>Contact Us</h5>
//                         </div>
//                         <div className="col-2">
//                             <h4 className='pb-2'>Support</h4>
//                             <h5 className='mt-4 fw-normal fs-6 opacity-75'>FAQ's</h5>
//                             <h5 className='mt-3 fw-normal fs-6 opacity-75'>hipping</h5>
//                             <h5 className='mt-3 fw-normal fs-6 opacity-75'>Returns</h5>
//                         </div>
//                         <div className="col-3">
//                             <h4 className='pb-2'>News Letter</h4>
//                             <form className='position-relative'>
//                                 <input type="text" name="newsLetter" placeholder='Enter Your Email' className='p-2 rounded-2' style={{ width: '250px' }} />
//                                 <button type='submit' className='position-absolute start-25 translate-middle-x py-2 px-3 rounded-2'>Submit</button>
//                             </form>
//                             <div className="d-flex mt-4">
//                                 <div className="facebook me-2">
//                                     <FaFacebookF className='icon' size={25} />
//                                 </div>
//                                 <div className="imstagram mx-2">
//                                     <FaInstagram className='icon' size={25} />
//                                 </div>
//                                 <div className="pinterset mx-2">
//                                     <FaPinterestP className='icon' size={25} />
//                                 </div>
//                                 <div className="twiter mx-2">
//                                     <FaTwitter className='icon' size={25} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </>
//     )
// }

// export default Footer

import React from 'react'
import { IoLocationOutline } from "react-icons/io5";
import { CiPhone } from "react-icons/ci";
import { MdOutlineAttachEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterestP } from "react-icons/fa";
import Link from 'next/link';

const Footer = () => {
    const footer = [{ logo: <IoLocationOutline />, title: 'River Point, New Rander Road, Surat, Gujarat, India - 395009' }, { logo: <CiPhone />, title: '+91 63557 72763' }, { logo: <MdOutlineAttachEmail />, title: 'hqperfume63@gmail.com' }]
    return (
        <>
            <footer className='py-5 mt-5'>
                <div className="container">
                    <div className="row">
                        {/* First Column - Logo and Contact Info */}
                        <div className="col-12 col-md-6 col-lg-2 mb-4 mb-lg-0">
                            <div className="logo-2 ">
                                <img src="/images/logo.png" alt="Logo" className='img-fluid my-auto mx-auto' width={200} />
                            </div>
                        </div>



                        {/* Second Column - About Us */}
                        <div className="col-6 col-md-3 col-lg-2 mb-4 mb-lg-0">
                            <h4 className='pb-2 mt-3'>Contact Us</h4>
                            {footer.map((foot, index) => (
                                <div key={index} className="location mt-3 d-flex align-items-center">
                                    <span className='icon'>{foot.logo}</span>
                                    <span className='opacity-75 ps-3'>{foot.title}</span>
                                </div>
                            ))}
                        </div>

                        {/* Third Column - Customer Service */}
                        <div className="col-6 col-md-3 col-lg-2 mb-4 mb-lg-0">
                            <h4 className='pb-2 mt-3'>Customer Service</h4>
                            <Link href="/" className='text-decoration-none text-black'>
                                <h5 className='mt-3 fw-normal fs-6 opacity-75'>Home</h5>
                            </Link>
                            <Link href="/Mens" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Mens</h5>
                            </Link>
                            <Link href="/Womens" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Womens</h5>
                            </Link>
                            <Link href="/Unisex" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Unisex</h5>
                            </Link>
                            <Link href="/Fragnance" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Fragnance</h5>
                            </Link>
                        </div>

                        {/* Fourth Column - Support */}
                        <div className="col-6 col-md-3 col-lg-2 mb-4 mb-md-0">
                            <h4 className='pb-2 mt-3'>Support</h4>
                            <Link href="/about" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>About Us</h5>
                            </Link>
                            <Link href="/contact" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Contact Us</h5>
                            </Link>
                            <Link href="/privacy-policy" className='text-decoration-none text-black'>
                                <h5 className='mt-1 fw-normal fs-6 opacity-75'>Privacy Policy</h5>
                            </Link>
                        </div>

                        {/* Fifth Column - Newsletter and Social */}
                        <div className="col-12 col-md-6 col-lg-3">
                            <h4 className='pb-2 mt-3'>News Letter</h4>
                            <form className='relative'>
                                <input type="text" name="newsLetter" placeholder='Enter Your Email' className='p-2 border-2 rounded-2' style={{ width: '250px' }} />
                                <button type='submit' className='absolute right-0 translate-middle-x py-2 px-3 rounded-2'>Submit</button>
                            </form>
                            <div className="d-flex mt-3">
                                <div className="facebook me-2">
                                    <FaFacebookF className='icon' size={20} />
                                </div>
                                <div className="imstagram mx-2">
                                    <FaInstagram className='icon' size={20} />
                                </div>
                                <div className="pinterset mx-2">
                                    <FaPinterestP className='icon' size={20} />
                                </div>
                                <div className="twiter mx-2">
                                    <FaTwitter className='icon' size={20} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer >
        </>
    )
}

export default Footer