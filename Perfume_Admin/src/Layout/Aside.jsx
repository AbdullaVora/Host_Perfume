// import React, { useEffect, useState } from "react";
// import {
//   FaBars,
//   FaHome,
//   FaCogs,
//   FaShoppingCart,
//   FaGlobe,
//   FaEnvelope,
//   FaUsers,
//   FaLayerGroup,
//   FaComment,
//   FaDatabase,
//   FaChevronDown,
//   FaGift,
//   FaShippingFast,
//   FaTimes,
// } from "react-icons/fa";
// import { BiSolidSlideshow } from "react-icons/bi";
// import { TbCategoryFilled } from "react-icons/tb";
// import { LuPackageOpen, LuPackagePlus, LuPackageSearch } from "react-icons/lu";
// import { MdPayments } from "react-icons/md";
// import { PiLinkSimpleBold } from "react-icons/pi";
// import { Link, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchSubAdmins } from "../redux/slices/Dashboard/SubAdmin/subAdminSlice";
// import { getUsers } from "../redux/slices/auth/userSlice";

// const Aside = ({ isCollapsed, toggleCollapse }) => {
//   const [openDropdown, setOpenDropdown] = useState(null);
//   const [userId, setUserId] = useState();
//   const [hovered, setHovered] = useState(false)
//   const dispatch = useDispatch();

//   const isTemporarilyExpanded = hovered;

//   useEffect(() => {
//     const userId = localStorage.getItem("AdminId");
//     setUserId(userId);
//   }, []);

//   useEffect(() => {
//     dispatch(fetchSubAdmins());
//     dispatch(getUsers());
//   }, []);

//   const { list } = useSelector((state) => state.subAdmins);
//   const { users } = useSelector((state) => state.user);

//   const cleanUserId = String(userId).replace(/[^a-zA-Z0-9]/g, "");

//   const findUser = users.find((user) => String(user._id) === cleanUserId);

//   let userRole = null;
//   if (findUser && findUser.role === "super-admin") {
//     userRole = "super-admin";
//   } else {
//     userRole = "sub-admin";
//   }

//   const [hiddenSections, setHiddenSections] = useState([]);

//   useEffect(() => {
//     if (list && list.length > 0 && userRole !== "super-admin" && findUser) {
//       const currentSubAdmin = list.find((sub) => sub.email === findUser.email);

//       if (currentSubAdmin) {
//         const permissions = currentSubAdmin.permissions;
//         const sectionsToHide = [];

//         for (const [section, config] of Object.entries(permissions)) {
//           if (typeof config === "object" && config !== null) {
//             const allFalse = Object.values(config).every(
//               (val) => val === false
//             );
//             if (allFalse) {
//               sectionsToHide.push(section);
//             }
//           } else if (config === false) {
//             sectionsToHide.push(section);
//           }
//         }

//         setHiddenSections(sectionsToHide);
//       }
//     }
//   }, [list, findUser, userRole]);

//   const shouldShowItem = (item) => {
//     if (userRole === "super-admin") return true;

//     if (item.permission && hiddenSections.includes(item.permission)) {
//       return false;
//     }

//     if (!item.permission && item.dropdown) {
//       return item.dropdown.some((subItem) => {
//         if (!subItem.permission) return true;
//         return !hiddenSections.includes(subItem.permission);
//       });
//     }

//     return true;
//   };

//   const menuItems = [
//     {
//       id: 1,
//       icon: <FaHome />,
//       label: "Dashboard",
//       link: "dashboard",
//       permission: "dashboard",
//     },
//     {
//       id: 2,
//       icon: <FaLayerGroup size={16} />,
//       label: "Banner Config",
//       permission: "banner_config",
//       dropdown: [
//         {
//           id: "2-1",
//           icon: <BiSolidSlideshow size={18} />,
//           label: "Banner",
//           link: "banner",
//         },
//       ],
//     },
//     {
//       id: "3",
//       icon: <FaLayerGroup size={18} />,
//       label: "Slider Config",
//       permission: "slider_config",
//       dropdown: [
//         {
//           id: "3-1",
//           icon: <BiSolidSlideshow size={18} />,
//           label: "Slider",
//           link: "slider",
//         },
//       ],
//     },
//     {
//       id: 4,
//       icon: <FaShoppingCart size={16} />,
//       label: "Product Config",
//       permission: "product_config",
//       dropdown: [
//         {
//           id: "4-1",
//           icon: <FaShoppingCart size={16} />,
//           label: "Product Inquiry",
//           link: "product-inquiry",
//         },
//         {
//           id: "4-2",
//           icon: <FaDatabase size={16} />,
//           label: "Product",
//           link: "products",
//         },
//       ],
//     },
//     {
//       id: 5,
//       icon: <FaCogs size={16} />,
//       label: "CAB Config",
//       dropdown: [
//         {
//           id: "5-1",
//           icon: <TbCategoryFilled size={18} />,
//           label: "Category",
//           link: "category",
//           permission: "category",
//         },
//         {
//           id: "5-2",
//           icon: <TbCategoryFilled size={18} />,
//           label: "Variants",
//           link: "variants",
//           permission: "variants",
//         },
//         {
//           id: "5-3",
//           icon: <TbCategoryFilled size={18} />,
//           label: "Brands",
//           link: "brands",
//           permission: "brands",
//         },
//       ],
//     },
//     {
//       id: 6,
//       icon: <FaGlobe size={16} />,
//       label: "Order Config",
//       permission: "orders_config",
//       dropdown: [
//         {
//           id: "6-1",
//           icon: <LuPackageSearch size={22} />,
//           label: "Order Status",
//           link: "order-status",
//         },
//         {
//           id: "6-2",
//           icon: <LuPackageOpen size={22} />,
//           label: "All Orders",
//           link: "all-orders",
//         },
//       ],
//     },
//     {
//       id: 7,
//       icon: <FaEnvelope size={16} />,
//       label: "Website Config",
//       dropdown: [
//         {
//           id: "7-1",
//           icon: <MdPayments size={22} />,
//           label: "Payment Method",
//           link: "payment-method",
//           permission: "payments_methods",
//         },
//         {
//           id: "7-2",
//           icon: <FaShippingFast size={22} />,
//           label: "Shipping Partners",
//           link: "shipping-partners",
//           permission: "shipping_partners",
//         },
//         {
//           id: "7-3",
//           icon: <PiLinkSimpleBold size={22} />,
//           label: "Social Links",
//           link: "social-links",
//           permission: "social_links",
//         },
//       ],
//     },
//     {
//       id: "8",
//       icon: <FaGift size={16} />,
//       label: "Coupon",
//       link: "coupon",
//       permission: "coupon",
//     },
//   ];

//   const toggleDropdown = (id) => {
//     setOpenDropdown(openDropdown === id ? null : id);
//   };

//   return (
//     <aside
//       className={`bg-black fixed aside text-white h-screen ${
//         isCollapsed ? "w-19" : "w-55"
//       } transition-all duration-300 overflow-y-auto flex flex-col z-50`}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       {/* Toggle Button */}
//       <div
//         className={`pt-5 ps-1 flex ${
//           isCollapsed ? "justify-center" : "justify-start ps-2"
//         } items-center border-b border-gray-700`}
//       >
//         <button
//           onClick={toggleCollapse}
//           className="p-4 cursor-pointer text-left"
//         >
//           {isCollapsed ? <FaTimes size={20} /> : <FaBars size={20} />}
//         </button>
//         {!isCollapsed && <span className="font-bold">Admin Panel</span>}
//       </div>

//       <nav className="flex flex-col pt-2 space-y-2 text-[12px] font-bold p-4">
//         {menuItems.filter(shouldShowItem).map((item) => (
//           <div key={item.id}>
//             <SidebarItem
//               icon={item.icon}
//               label={item.label}
//               isCollapsed={isCollapsed}
//               hasDropdown={!!item.dropdown}
//               isOpen={openDropdown === item.id}
//               toggleDropdown={() => toggleDropdown(item.id)}
//               link={item.link}
//               dropdown={item.dropdown?.filter(shouldShowItem)}
//             />
//             {item.dropdown && openDropdown === item.id && !isCollapsed && (
//               <div className="ml-3">
//                 {item.dropdown.filter(shouldShowItem).map((subItem) => (
//                   <SidebarItem
//                     key={subItem.id}
//                     icon={subItem.icon}
//                     label={subItem.label}
//                     isCollapsed={isCollapsed}
//                     isSubItem
//                     link={subItem.link}
//                   />
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </nav>
//     </aside>
//   );
// };

// const SidebarItem = ({
//   icon,
//   label,
//   isCollapsed,
//   hasDropdown,
//   isOpen,
//   toggleDropdown,
//   isSubItem,
//   link,
//   dropdown,
// }) => {
//   const location = useLocation();
//   const fullLink = link ? `/${link}` : "#";
//   const isActive = location.pathname === fullLink;
//   const isDropdownActive =
//     hasDropdown &&
//     dropdown?.some((sub) => location.pathname.startsWith(`/${sub.link}`));

//   return (
//     <div>
//       <Link
//         to={hasDropdown ? "#" : fullLink}
//         className={`flex items-center p-3 my-1 rounded-lg transition-all cursor-pointer
//                     ${
//                       isActive || isDropdownActive
//                         ? "bg-blue-600 text-white"
//                         : "hover:bg-gray-700"
//                     }
//                     ${hasDropdown && isOpen ? "bg-gray-800" : ""}
//                     ${isSubItem ? "pl-5" : ""}`}
//         onClick={(e) => {
//           if (hasDropdown) {
//             e.preventDefault();
//             toggleDropdown();
//           }
//         }}
//         title={!isCollapsed ? label : ""} // Show tooltip when collapsed
//       >
//         <span className="text-xl">{icon}</span>
//         {!isCollapsed && <span className="ml-3 flex-grow">{label}</span>}
//         {hasDropdown && !isCollapsed && (
//           <FaChevronDown
//             className={`transition-transform duration-300 ${
//               isOpen ? "rotate-180" : ""
//             }`}
//           />
//         )}
//       </Link>
//     </div>
//   );
// };

// export default Aside;



import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaHome,
  FaCogs,
  FaShoppingCart,
  FaGlobe,
  FaEnvelope,
  FaUsers,
  FaLayerGroup,
  FaComment,
  FaDatabase,
  FaChevronDown,
  FaGift,
  FaShippingFast,
  FaTimes,
} from "react-icons/fa";
import { BiSolidSlideshow } from "react-icons/bi";
import { TbCategoryFilled } from "react-icons/tb";
import { LuPackageOpen, LuPackagePlus, LuPackageSearch } from "react-icons/lu";
import { MdPayments } from "react-icons/md";
import { PiLinkSimpleBold } from "react-icons/pi";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSubAdmins } from "../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { getUsers } from "../redux/slices/auth/userSlice";
import { AiFillShop } from "react-icons/ai";


const Aside = ({ isCollapsed, toggleCollapse }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [userId, setUserId] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();

  // Only show expanded state when hovered AND collapsed
  const shouldShowExpanded = isCollapsed && isHovered;

  useEffect(() => {
    const userId = localStorage.getItem("AdminId");
    setUserId(userId);
  }, []);

  useEffect(() => {
    dispatch(fetchSubAdmins());
    dispatch(getUsers());
  }, []);

  const { list } = useSelector((state) => state.subAdmins);
  const { users } = useSelector((state) => state.user);

  const cleanUserId = String(userId).replace(/[^a-zA-Z0-9]/g, "");

  const findUser = users.find((user) => String(user._id) === cleanUserId);

  let userRole = null;
  if (findUser && findUser.role === "super-admin") {
    userRole = "super-admin";
  } else {
    userRole = "sub-admin";
  }

  const [hiddenSections, setHiddenSections] = useState([]);

  useEffect(() => {
    if (list && list.length > 0 && userRole !== "super-admin" && findUser) {
      const currentSubAdmin = list.find((sub) => sub.email === findUser.email);

      if (currentSubAdmin) {
        const permissions = currentSubAdmin.permissions;
        const sectionsToHide = [];

        for (const [section, config] of Object.entries(permissions)) {
          if (typeof config === "object" && config !== null) {
            const allFalse = Object.values(config).every(
              (val) => val === false
            );
            if (allFalse) {
              sectionsToHide.push(section);
            }
          } else if (config === false) {
            sectionsToHide.push(section);
          }
        }

        setHiddenSections(sectionsToHide);
      }
    }
  }, [list, findUser, userRole]);

  const shouldShowItem = (item) => {
    if (userRole === "super-admin") return true;

    if (item.permission && hiddenSections.includes(item.permission)) {
      return false;
    }

    if (!item.permission && item.dropdown) {
      return item.dropdown.some((subItem) => {
        if (!subItem.permission) return true;
        return !hiddenSections.includes(subItem.permission);
      });
    }

    return true;
  };

  const menuItems = [
    {
      id: 1,
      icon: <FaHome />,
      label: "Dashboard",
      link: "dashboard",
      permission: "dashboard",
    },
    {
      id: 2,
      icon: <FaLayerGroup size={16} />,
      label: "Banner / Blogs",
      permission: "banner_config",
      dropdown: [
        {
          id: "2-1",
          icon: <BiSolidSlideshow size={18} />,
          label: "Banner / Blogs",
          link: "banner",
        },
      ],
    },
    {
      id: "3",
      icon: <FaLayerGroup size={18} />,
      label: "Slider Config",
      permission: "slider_config",
      dropdown: [
        {
          id: "3-1",
          icon: <BiSolidSlideshow size={18} />,
          label: "Slider",
          link: "slider",
        },
      ],
    },
    // {
    //   id: 4,
    //   icon: <FaShoppingCart size={16} />,
    //   label: "Product Config",
    //   permission: "product_config",
    //   dropdown: [
    //     {
    //       id: "4-1",
    //       icon: <FaShoppingCart size={16} />,
    //       label: "Product Inquiry",
    //       link: "product-inquiry",
    //     },
    //     {
    //       id: "4-2",
    //       icon: <FaDatabase size={16} />,
    //       label: "Product",
    //       link: "products",
    //     },
    //   ],
    // },
    {
      id: 4,
      icon: <FaShoppingCart size={16} />,
      label: "Products",
      link: "products",
      permission: "product_config",
    },
    {
      id: 5,
      icon: <FaShoppingCart size={16} />,
      label: "Inquiry Config",
      permission: "inquiry_config",
      dropdown: [
        {
          id: "5-1",
          icon: <FaShoppingCart size={16} />,
          label: "Product Inquiry",
          link: "product-inquiry",
        },
        {
          id: "5-2",
          icon: <FaEnvelope size={16} />,
          label: "Inquiry Emails",
          link: "inquiry-emails",
        },
      ],
    },
    {
      id: 5,
      icon: <FaCogs size={16} />,
      label: "CAB Config",
      dropdown: [
        {
          id: "5-1",
          icon: <TbCategoryFilled size={18} />,
          label: "Category",
          link: "category",
          permission: "category",
        },
        {
          id: "5-2",
          icon: <TbCategoryFilled size={18} />,
          label: "Variants",
          link: "variants",
          permission: "variants",
        },
        {
          id: "5-3",
          icon: <TbCategoryFilled size={18} />,
          label: "Brands",
          link: "brands",
          permission: "brands",
        },
      ],
    },
    {
      id: 6,
      icon: <FaGlobe size={16} />,
      label: "Order Config",
      permission: "orders_config",
      dropdown: [
        {
          id: "6-1",
          icon: <LuPackageSearch size={22} />,
          label: "Order Status",
          link: "order-status",
        },
        {
          id: "6-2",
          icon: <LuPackageOpen size={22} />,
          label: "All Orders",
          link: "all-orders",
        },
      ],
    },
    {
      id: 7,
      icon: <FaEnvelope size={16} />,
      label: "Website Config",
      dropdown: [
        {
          id: "7-1",
          icon: <MdPayments size={22} />,
          label: "Payment Method",
          link: "payment-method",
          permission: "payments_methods",
        },
        {
          id: "7-2",
          icon: <FaShippingFast size={22} />,
          label: "Shipping Partners",
          link: "shipping-partners",
          permission: "shipping_partners",
        },
        {
          id: "7-3",
          icon: <PiLinkSimpleBold size={22} />,
          label: "Social Links",
          link: "social-links",
          permission: "social_links",
        },
      ],
    },
    {
      id: "8",
      icon: <FaGift size={16} />,
      label: "Coupon",
      link: "coupon",
      permission: "coupon",
    },
    {
      id: "9",
      icon: <AiFillShop size={18} />,
      label: "Stock Manage",
      link: "stock",
      permission: "stock_manage",
    },
  ];

  const toggleDropdown = (id) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  return (
    <aside
      className={`bg-black fixed aside text-white h-screen ${
        isCollapsed && !isHovered ? "w-19" : "w-55"
      } transition-all duration-300 overflow-y-auto flex flex-col z-50`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Toggle Button */}
      <div
        className={`pt-5 ps-1 flex ${
          isCollapsed && !isHovered ? "justify-center" : "justify-start ps-2"
        } items-center border-b border-gray-700`}
      >
        <button
          onClick={toggleCollapse}
          className="p-4 cursor-pointer text-left"
        >
          {isCollapsed && !isHovered ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
        {(!isCollapsed || isHovered) && <span className="font-bold">Admin Panel</span>}
      </div>

      <nav className="flex flex-col pt-2 space-y-2 text-[12px] font-bold p-4">
        {menuItems.filter(shouldShowItem).map((item) => (
          <div key={item.id}>
            <SidebarItem
              icon={item.icon}
              label={item.label}
              isCollapsed={isCollapsed && !isHovered}
              hasDropdown={!!item.dropdown}
              isOpen={openDropdown === item.id}
              toggleDropdown={() => toggleDropdown(item.id)}
              link={item.link}
              dropdown={item.dropdown?.filter(shouldShowItem)}
              isHoverExpanded={isHovered && isCollapsed}
            />
            {item.dropdown && openDropdown === item.id && (!isCollapsed || isHovered) && (
              <div className="ml-3">
                {item.dropdown.filter(shouldShowItem).map((subItem) => (
                  <SidebarItem
                    key={subItem.id}
                    icon={subItem.icon}
                    label={subItem.label}
                    isCollapsed={isCollapsed && !isHovered}
                    isSubItem
                    link={subItem.link}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

const SidebarItem = ({
  icon,
  label,
  isCollapsed,
  hasDropdown,
  isOpen,
  toggleDropdown,
  isSubItem,
  link,
  dropdown,
  isHoverExpanded,
}) => {
  const location = useLocation();
  const fullLink = link ? `/${link}` : "#";
  const isActive = location.pathname === fullLink;
  const isDropdownActive =
    hasDropdown &&
    dropdown?.some((sub) => location.pathname.startsWith(`/${sub.link}`));

  return (
    <div>
      <Link
        to={hasDropdown ? "#" : fullLink}
        className={`flex items-center p-3 my-1 rounded-lg transition-all cursor-pointer
                    ${
                      isActive || isDropdownActive
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-700"
                    }
                    ${hasDropdown && isOpen ? "bg-gray-800" : ""}
                    ${isSubItem ? "pl-5" : ""}`}
        onClick={(e) => {
          if (hasDropdown) {
            e.preventDefault();
            toggleDropdown();
          }
        }}
        title={isCollapsed ? label : ""} // Show tooltip only when collapsed
      >
        <span className="text-xl">{icon}</span>
        {!isCollapsed && <span className="ml-3 flex-grow">{label}</span>}
        {hasDropdown && !isCollapsed && (
          <FaChevronDown
            className={`transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        )}
      </Link>
    </div>
  );
};

export default Aside;