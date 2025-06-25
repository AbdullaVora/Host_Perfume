"use client";

import { useState, useEffect } from 'react';

export default function LoadingWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      ) : (
        children
      )}
    </>
  );
}