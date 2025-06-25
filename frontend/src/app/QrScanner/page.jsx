'use client';
import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';
import apiInstance from '@/api/instance';

const DeliveryScanner = () => {
  const [scanResult, setScanResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner('reader', {
      qrbox: {
        width: 250,
        height: 250,
      },
      fps: 5,
    });

    const successHandler = (result) => {
      scanner.clear();
      setScanResult(result);
      handleScan(result);
    };

    const errorHandler = (err) => {
      console.warn(err);
    };

    scanner.render(successHandler, errorHandler);

    return () => {
      scanner.clear().catch(error => {
        console.error("Failed to clear scanner", error);
      });
    };
  }, []);

  const handleScan = async (result) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      let orderData;
      try {
        orderData = JSON.parse(result);
      } catch (e) {
        throw new Error('Invalid QR code format');
      }

      if (!orderData.orderId) {
        throw new Error('QR code does not contain order information');
      }

      const response = await apiInstance.put(`/api/dashboard/updateOrderStatus/${orderData.orderId}`, {orderStatus: "Complete"} );

      if (response.status === 200) {
        setSuccess(true);
      } else {
        throw new Error(response.data.message || 'Failed to update order status');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4 text-center">Delivery Scanner</h1>
      
      {loading && (
        <div className="text-center py-4">
          <p className="text-blue-600">Processing...</p>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>Error: {error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>Order marked as delivered successfully!</p>
        </div>
      )}

      {!scanResult && (
        <div id="reader" className="w-full border rounded-lg overflow-hidden"></div>
      )}

      {scanResult && !success && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p className="font-medium">Scanned Order:</p>
          <p className="text-sm text-gray-600 break-all">{scanResult}</p>
          <button 
            onClick={() => {
              setScanResult(null);
              setError(null);
            }}
            className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Scan Another Order
          </button>
        </div>
      )}
    </div>
  );
};

export default DeliveryScanner;