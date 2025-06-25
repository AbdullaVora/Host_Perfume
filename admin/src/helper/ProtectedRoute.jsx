// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// /**
//  * ProtectedRoute component that checks if the user is authenticated
//  * by looking for a token in localStorage.
//  * 
//  * If authenticated, it renders the child routes (via Outlet)
//  * If not authenticated, it redirects to the home page
//  */
// const ProtectedRoute = () => {
//   // Check if there's a token in localStorage
//   const isAuthenticated = localStorage.getItem('token') !== null;
  
//   // If authenticated, render the child routes
//   // Otherwise, redirect to the home page
//   return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;

import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubAdmins } from "../redux/slices/Dashboard/SubAdmin/subAdminSlice";
import { getUsers } from "../redux/slices/auth/userSlice";

/**
 * Enhanced ProtectedRoute component that checks both authentication
 * and permissions for accessing routes.
 */
const ProtectedRoute = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);
  const [hiddenSections, setHiddenSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get authentication status
  const isAuthenticated = localStorage.getItem('Admintoken') !== null;

  // Fetch necessary data for permission checking
  useEffect(() => {
    if (isAuthenticated) {
      const storedUserId = localStorage.getItem('AdminId');
      setUserId(storedUserId);
      
      // Load users and subadmins data
      dispatch(fetchSubAdmins());
      dispatch(getUsers());
    }
  }, [dispatch, isAuthenticated]);

  // Get data from Redux store
  const { list } = useSelector((state) => state.subAdmins);
  const { users } = useSelector((state) => state.user);

  // Process permissions
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    if (users.length && list.length && userId) {
      const cleanUserId = String(userId).replace(/[^a-zA-Z0-9]/g, "");
      const findUser = users.find((user) => String(user._id) === cleanUserId);
      
      let userRole = null;
      if (findUser && findUser.role === "super-admin") {
        userRole = "super-admin";
        setHiddenSections([]);
      } else {
        userRole = "sub-admin";
        
        if (findUser) {
          const currentSubAdmin = list.find((sub) => sub.email === findUser.email);
          
          if (currentSubAdmin) {
            const permissions = currentSubAdmin.permissions;
            const sectionsToHide = [];
            
            for (const [section, config] of Object.entries(permissions)) {
              if (typeof config === "object" && config !== null) {
                // Check if all values are false or the entire section should be hidden
                const allFalse = Object.values(config).every((val) => val === false);
                if (allFalse) {
                  sectionsToHide.push(section);
                }
              } else if (config === false) {
                // Handle boolean permissions directly
                sectionsToHide.push(section);
              }
            }
            
            setHiddenSections(sectionsToHide);
          }
        }
      }
      
      setIsLoading(false);
    } else if (users.length && list.length) {
      // If we have the data but no userId, we're done loading
      setIsLoading(false);
    }
  }, [users, list, userId, isAuthenticated]);

  // Permission mapping from routes to permission keys
  const routePermissionMap = {
    '/dashboard': 'dashboard',
    '/banner': 'banner_config',
    '/slider': 'slider_config',
    '/product-inquiry': 'productInquiry',
    '/products/add-product': 'product_config',
    '/products': 'product_config',
    '/category': 'category',
    '/variants': 'variants',
    '/brands': 'brands',
    '/order-status': 'orders_config',
    '/all-orders': 'orders_config',
    '/payment-method': 'payments_methods',
    '/shipping-partners': 'shipping_partners',
    '/social-links': 'social_links',
    '/coupon': 'coupon',
    // Add any other routes and their corresponding permissions here
  };

  // Check if current route is allowed
  const canAccessRoute = () => {
    // Super admin can access everything
    const cleanUserId = userId ? String(userId).replace(/[^a-zA-Z0-9]/g, "") : "";
    const findUser = users.find((user) => String(user._id) === cleanUserId);
    
    if (findUser && findUser.role === "super-admin") {
      return true;
    }
    
    // Check if current route requires permission
    const currentPath = location.pathname;
    const requiredPermission = routePermissionMap[currentPath];
    
    // If no specific permission is required or the permission is not in hidden sections
    if (!requiredPermission || !hiddenSections.includes(requiredPermission)) {
      return true;
    }
    
    return false;
  };

  // Handle loading state
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  // If authenticated but doesn't have permission, redirect to dashboard or another fallback page
  if (!canAccessRoute()) {
    return <Navigate to="/dashboard" replace state={{ from: location, permissionDenied: true }} />;
  }
  
  // If authenticated and has permission, render the child routes
  return <Outlet />;
};

export default ProtectedRoute;