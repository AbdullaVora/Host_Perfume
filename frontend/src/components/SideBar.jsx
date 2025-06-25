// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const SideBar = ({ openSlide, closeSideBar }) => {
//     const [name, setName] = useState(""); 
//     const router = useRouter();

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             const storedUser = localStorage.getItem("user");
//             setName(storedUser || ""); 
//         }
//     }, []);

//     const handleLogout = () => {
//         if (typeof window !== "undefined") {
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//         }
//         closeSideBar();
//         router.push("/login");
//     };

//     return (
//         <div className="sidebar">
//             <div
//                 className={`slide d-flex flex-column justify-content-center align-items-start position-fixed bg-white`}
//                 style={{
//                     zIndex: '999',
//                     top: 0,
//                     right: openSlide ? 0 : '-30%',
//                     height: '100vh',
//                     width: '25%',
//                     transition: 'right 0.3s ease-in-out',
//                 }}
//             >
//                 <div 
//                     className="position-absolute start-50 translate-middle-x"
//                     style={{ top: '8%', width: '50%' }}
//                 >
//                     <Image
//                         src="/images/Logo.webp"
//                         alt="logo"
//                         width={500}
//                         height={200}
//                         className="img-fluid"
//                         style={{ objectFit: 'contain' }}
//                     />
//                 </div>
//                 <div className="align-self-center mb-3">
//                     <span className="fs-2 fw-semibold">{name ? name : ''}</span>
//                 </div>
//                 <ul type="none" className="border-bottom text-center ps-0 w-100 ms-0">
//                     <Link href="/login" className="text-decoration-none text-black" onClick={closeSideBar}>
//                         <li className="fs-5 py-3">Login</li>
//                     </Link>
//                     <Link href="/register" className="text-decoration-none text-black" onClick={closeSideBar}>
//                         <li className="fs-5 py-3">Register</li>
//                     </Link>
//                     <Link href="/wishlist" className="text-decoration-none text-black">
//                         <li onClick={closeSideBar} className="fs-5 py-3">Wishlist</li>
//                     </Link>
//                     <Link href="/cart" className="text-decoration-none text-black">
//                         <li onClick={closeSideBar} className="fs-5 py-3">Check out</li>
//                     </Link>
//                     <li className="fs-5 py-3" onClick={handleLogout}>Log Out</li>
//                 </ul>
//             </div>
//         </div>
//     );
// };

// export default SideBar;

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePreventScroll } from "@/hook/usePreventScroll";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartCart, resetCart } from "@/redux/slice/addToCartSlice";
import { getUserWishlist, resetWish } from "@/redux/slice/wishSlice";
import Swal from "sweetalert2";
import { clearUserData } from "@/redux/slice/userDataSlice";

const SideBar = ({ openSlide, closeSideBar }) => {
    const [name, setName] = useState("");
    const router = useRouter();

    const { userId, userName } = useSelector((state) => state.userData)

    const dispatch = useDispatch()

    useEffect(() => {
        const storedUser = userName
        setName(storedUser || "");
    }, [openSlide]);

    const handleLogout = () => {
        Swal.fire({
            icon: 'success',
            text: 'Log Out Success',
            timer: 2000,
            showConfirmButton: false
        })
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userName");
            localStorage.removeItem("userPhone");
        }
        dispatch(resetCart())
        dispatch(resetWish())
        dispatch(clearUserData())
        closeSideBar();
        router.push("/login");
    };

    usePreventScroll(openSlide);

    return (
        <div className="sidebar">
            <div
                className={`
                    slide 
                    d-flex 
                    flex-column 
                    justify-content-start 
                    align-items-start 
                    position-fixed 
                    bg-white 
                    h-100 
                    ${openSlide ? 'show-sidebar' : 'hide-sidebar'}
                `}
                style={{
                    zIndex: '999',
                    top: 0,
                    width: '100%', // Full width on mobile
                    maxWidth: '300px', // Maximum width
                    right: 0,
                    transition: 'transform 0.3s ease-in-out',
                    transform: openSlide ? 'translateX(0)' : 'translateX(100%)',
                    overscrollBehavior: 'contain'
                }}
            >
                <div
                    className="w-100 text-center my-3"
                >
                    <Image
                        src="/images/logo.png"
                        alt="logo"
                        width={150}
                        height={150}
                        className="img-fluid mx-auto"
                        style={{ maxWidth: '250px', objectFit: 'contain' }}
                    />
                </div>

                <div className="w-100 text-center mb-3">
                    <span className="fs-2 fw-semibold">{name || ''}</span>
                </div>

                <ul className="list-unstyled w-100">
                    {[
                        // Only show Register if user is not logged in
                        ...(!name ? [{ href: "/login", label: "Login" }, { href: "/register", label: "Register" }] : [{ href: "/profile", label: "Edit Profile" }, { href: "/change-password", label: "Change Password" }, { href: "/wishlist", label: "Wishlist" }, { href: "/myOrders", label: "My Orders" }, { href: "/TrackOrder", label: "Track Order" }]),
                    ].map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-decoration-none text-dark"
                            onClick={closeSideBar}
                        >
                            <li className="fs-5 py-3 text-center hover-bg-light border">
                                {item.label}
                            </li>
                        </Link>
                    ))}
                    {name && (
                        <li
                            className="fs-5 py-3 text-center hover-bg-light"
                            style={{ cursor: 'pointer' }}
                            onClick={handleLogout}
                        >
                            Log Out
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SideBar;