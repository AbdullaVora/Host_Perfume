import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component to display permission denied alerts when a user tries to access
 * a route they don't have permission for.
 */
const PermissionDeniedAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if redirected due to permission denial
    if (location.state?.permissionDenied) {
      setShowAlert(true);
      
      // Auto-hide after 5 seconds
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [location]);

  if (!showAlert) return null;

  return (
    <div className="fixed top-20 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 animate-fadeIn">
      <div className="flex items-center">
        <svg className="w-6 h-6 mr-2" fill="none" strokeCurrentColor viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
        <div>
          <p className="font-bold">Access Denied</p>
          <p className="text-sm">You don't have permission to access this page.</p>
        </div>
        <button 
          onClick={() => setShowAlert(false)}
          className="ml-4 text-white hover:text-gray-200"
        >
          <svg className="w-5 h-5" fill="none" strokeCurrentColor viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default PermissionDeniedAlert;