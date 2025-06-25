// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import { useEffect, useState } from "react";
// // import { useRouter } from "next/navigation";

// // const SideNav = ({ openSlide, closeSideBar }) => {
// //     const [name, setName] = useState("");
// //     const router = useRouter();

// //     useEffect(() => {
// //         if (typeof window !== "undefined") {
// //             const storedUser = localStorage.getItem("user");
// //             setName(storedUser || "");
// //         }
// //     }, []);

// //     const handleLogout = () => {
// //         if (typeof window !== "undefined") {
// //             localStorage.removeItem("token");
// //             localStorage.removeItem("user");
// //         }
// //         closeSideBar();
// //         router.push("/login");
// //     };

// //     return (
// //         <div className="sidenav">
// //             <div
// //                 className={`slide d-flex flex-column justify-content-center w-50 align-items-start position-fixed bg-white`}
// //                 style={{
// //                     zIndex: '999',
// //                     top: 0,
// //                     left: openSlide ? 0 : '-30%',
// //                     height: '100vh',
// //                     transition: 'left 0.3s ease-in-out',
// //                 }}
// //             >
// //                 <div
// //                     className="position-absolute start-50 translate-middle-x"
// //                     style={{ top: '8%', width: '50%' }}
// //                 >
// //                     <Image
// //                         src="/images/Logo.webp"
// //                         alt="logo"
// //                         width={500}
// //                         height={200}
// //                         className="img-fluid"
// //                         style={{ objectFit: 'contain' }}
// //                     />
// //                 </div>
// //                 <div className="align-self-center mb-3">
// //                     <span className="fs-2 fw-semibold">{name ? name : ''}</span>
// //                 </div>
// //                 <ul type="none" className="border-bottom text-center ps-0 w-100 ms-0">
// //                     <Link href="/" className="text-decoration-none text-black" onClick={closeSideBar}>
// //                         <li className="fs-5 py-3">Home</li>
// //                     </Link>
// //                     <Link href="/blog" className="text-decoration-none text-black" onClick={closeSideBar}>
// //                         <li className="fs-5 py-3">Blog</li>
// //                     </Link>
// //                     <Link href="/about" className="text-decoration-none text-black">
// //                         <li onClick={closeSideBar} className="fs-5 py-3">About</li>
// //                     </Link>
// //                     <Link href="/contact" className="text-decoration-none text-black">
// //                         <li onClick={closeSideBar} className="fs-5 py-3">Contact</li>
// //                     </Link>
// //                 </ul>
// //             </div>
// //         </div>
// //     );
// // };

// // export default SideNav;

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { usePreventScroll } from "@/hook/usePreventScroll";
// import { useSelector } from "react-redux";

// const SideNav = ({ openSlide, closeSideBar }) => {
//     const [name, setName] = useState("");
//     const router = useRouter();

//     const { userId, userName } = useSelector((state) => state.userData)

//     useEffect(() => {
//         if (typeof window !== "undefined") {
//             const storedUser = userName;
//             setName(storedUser || "");
//         }
//     }, []);

//     const handleLogout = () => {
//         if (typeof window !== "undefined") {
//             localStorage.removeItem("token");
//             localStorage.removeItem("user");
//             localStorage.removeItem("userId");
//             localStorage.removeItem("userEmail");
//             localStorage.removeItem("userName");
//             localStorage.removeItem("userPhone");
//         }
//         closeSideBar();
//         router.push("/login");
//     };

//     usePreventScroll(openSlide);

//     return (
//         <div className="sidenav">
//             <div
//                 className={`
//                     slide 
//                     d-flex 
//                     flex-column 
//                     justify-content-start 
//                     align-items-start 
//                     position-fixed 
//                     bg-white 
//                     h-100
//                     ${openSlide ? 'show-sidebar' : 'hide-sidebar'}
//                 `}
//                 style={{
//                     zIndex: '999',
//                     top: 0,
//                     width: '100%', // Full width on mobile
//                     maxWidth: '300px', // Maximum width
//                     transition: 'transform 0.3s ease-in-out',
//                     transform: openSlide ? 'translateX(0)' : 'translateX(-100%)',
//                     overscrollBehavior: 'contain'
//                 }}
//             >
//                 <div className="w-100 text-center my-3">
//                     <Image
//                         src="/images/logo.png"
//                         alt="logo"
//                         width={150}
//                         height={150}
//                         className="img-fluid"
//                         style={{ maxWidth: '250px', objectFit: 'contain' }}
//                     />
//                 </div>

//                 <div className="w-100 text-center mb-3">
//                     <span className="fs-2 fw-semibold">{name || ''}</span>
//                 </div>

//                 <ul className="list-unstyled w-100">
//                     {[
//                         { href: "/", label: "Home" },
//                         { href: "/collection", label: "Collection" },
//                         { href: "/blog", label: "Blog" },
//                         { href: "/about", label: "About" },
//                         { href: "/contact", label: "Contact" }
//                     ].map((item) => (
//                         <Link
//                             key={item.href}
//                             href={item.href}
//                             className="text-decoration-none text-dark"
//                             onClick={closeSideBar}
//                         >
//                             <li className="fs-5 py-3 text-center hover-bg-light border">
//                                 {item.label}
//                             </li>
//                         </Link>
//                     ))}
//                 </ul>

//                 {/* Optional: Logout button
//                 <div className="w-100 mt-auto mb-3 text-center">
//                     <button
//                         onClick={handleLogout}
//                         className="btn btn-outline-danger"
//                     >
//                         Logout
//                     </button>
//                 </div> */}
//             </div>
//         </div>
//     );
// };

// export default SideNav;
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePreventScroll } from "@/hook/usePreventScroll";
import { useSelector } from "react-redux";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";

const SideNav = ({ openSlide, closeSideBar }) => {
    const [name, setName] = useState("");
    const [collectionDropdown, setCollectionDropdown] = useState(false);
    const [categories, setCategories] = useState([]);
    const router = useRouter();

    const { userId, userName } = useSelector((state) => state.userData);
    const allCategories = useSelector((state) => state.Collection.categories);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedUser = userName;
            setName(storedUser || "");
        }
    }, []);

    useEffect(() => {
        // Organize categories and subcategories
        if (allCategories) {
            const parentCategories = allCategories.filter(
                (cat) => cat.parent === "N/A" && cat.status === true
            );
            const categoriesWithSubs = parentCategories.map((parent) => ({
                ...parent,
                subcategories: allCategories.filter(
                    (cat) => cat.parent === parent.name && cat.status === true
                ),
            }));
            setCategories(categoriesWithSubs);
        }
    }, [allCategories]);

    const handleLogout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            localStorage.removeItem("userEmail");
            localStorage.removeItem("userName");
            localStorage.removeItem("userPhone");
        }
        closeSideBar();
        router.push("/login");
    };

    usePreventScroll(openSlide);

    return (
        <div className="sidenav">
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
                    width: '100%',
                    maxWidth: '300px',
                    transition: 'transform 0.3s ease-in-out',
                    transform: openSlide ? 'translateX(0)' : 'translateX(-100%)',
                    overscrollBehavior: 'contain',
                    overflowY: 'auto' // Added for scrolling
                }}
            >
                <div className="w-100 text-center my-3">
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

                <ul className="list-unstyled w-100" style={{ flex: 1, overflowY: 'auto' }}>
                    {[
                        { href: "/", label: "Home" },
                        { href: "/collection", label: "Collection" },
                        { href: "/Mens", label: "Mens" },
                        { href: "/Womens", label: "Womens" },
                        { href: "/Unisex", label: "Unisex" },
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

                    {/* Fragrance with dropdown */}
                    <div className="border">
                        <div
                            className="fs-5 py-3 text-center hover-bg-light d-flex justify-content-center align-items-center"
                            onClick={() => setCollectionDropdown(!collectionDropdown)}
                            style={{ cursor: 'pointer' }}
                        >
                            Fragrance
                            {collectionDropdown ? (
                                <FaChevronDown className="ms-2" size={14} />
                            ) : (
                                <FaChevronRight className="ms-2" size={14} />
                            )}
                        </div>

                        {collectionDropdown && (
                            <div className="bg-light" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                {categories.map((category) => (
                                    <div key={category._id}>
                                        <Link
                                            href={`/Fragnance?category=${encodeURIComponent(category.name)}`}
                                            className="text-decoration-none text-dark d-block py-2 ps-4 hover-bg-lighter"
                                            onClick={closeSideBar}
                                        >
                                            {category.name}
                                        </Link>

                                        {category.subcategories.length > 0 && (
                                            <div className="bg-white">
                                                {category.subcategories.map((subcategory) => (
                                                    <Link
                                                        key={subcategory._id}
                                                        href={`/Fragnance?category=${encodeURIComponent(category.name)}&subcategory=${encodeURIComponent(subcategory.name)}`}
                                                        className="text-decoration-none text-dark d-block py-2 ps-5 hover-bg-lighter"
                                                        onClick={closeSideBar}
                                                    >
                                                        {subcategory.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {[
                        { href: "/blog", label: "Blog" },
                        { href: "/about", label: "About Us" },
                        { href: "/contact", label: "Contact Us" }
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

                    {/* Account and Wishlist links */}
                    <Link
                        href="/wishlist"
                        className="text-decoration-none text-dark"
                        onClick={closeSideBar}
                    >
                        <li className="fs-5 py-3 text-center hover-bg-light border">
                            Wishlist
                        </li>
                    </Link>
                </ul>

                {/* <div className="w-100 mt-auto mb-3 text-center">
                    <button
                        onClick={handleLogout}
                        className="btn btn-outline-danger"
                    >
                        Logout
                    </button>
                </div> */}
            </div>
        </div>
    );
};

export default SideNav;