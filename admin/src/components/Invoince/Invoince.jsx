import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import { fetchOrders } from "../../redux/slices/Dashboard/Order_Config/orderStatusSlice";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import QRCode from 'qrcode';
import logo from '/images/logo.png'; // Adjust the path according to your folder structure

const InvoiceComponent = ({ id }) => {
  const dispatch = useDispatch();
  const {
    allOrders,
    loading: orderLoading,
    error,
  } = useSelector((state) => state.orderStatus);
  const invoiceRef = useRef();
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // const filterData = allOrders.find((data) => data._id === id);

  const filterData = allOrders.find((order) =>
    order.products.some(product => product._id === id)
  );

  console.log(filterData)

  console.log("filterData", filterData);
  console.log(id);
  console.log(allOrders);

  // Generate QR code when order data is available
  useEffect(() => {
    if (filterData) {
      const generateQrCode = async () => {
        try {
          const qrData = JSON.stringify({
            orderId: filterData._id,
            orderCode: filterData.orderCode,
            timestamp: new Date().toISOString()
          });

          const url = await QRCode.toDataURL(qrData, {
            width: 200,
            margin: 2,
            color: {
              dark: '#000000',
              light: '#ffffff'
            }
          });
          setQrCodeUrl(url);
        } catch (err) {
          console.error('QR generation error:', err);
        }
      };

      // Only generate if not already present in order data
      if (!filterData.qrCode) {
        generateQrCode();
      } else {
        setQrCodeUrl(filterData.qrCode);
      }
    }
  }, [filterData]);

  // Print handler
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    pageStyle: `
      @page { size: auto; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        img { max-width: 100% !important; height: auto !important; }
        .page-break { page-break-after: always; }
        .no-print { display: none !important; }
        .logo { max-height: 60px !important; }
      }
    `,
  });

  const downloadPdf = async () => {
    const input = invoiceRef.current;

    try {
      const clone = input.cloneNode(true);
      clone.style.width = "210mm";
      clone.style.minHeight = "297mm";
      clone.style.boxSizing = "border-box";
      clone.style.position = "relative";
      clone.style.overflow = "visible";
      clone.style.display = "block";

      const processStyles = (originalElement, clonedElement) => {
        if (!originalElement || originalElement.nodeType !== 1) return;

        const essentialStyles = [
          "font-size", "font-family", "font-weight", "line-height",
          "color", "background-color", "border", "border-color",
          "padding", "margin", "width", "height", "min-height",
          "display", "position", "text-align", "vertical-align",
        ];

        const styles = window.getComputedStyle(originalElement);
        essentialStyles.forEach((prop) => {
          let value = styles.getPropertyValue(prop);
          if (value.includes("oklch")) {
            if (prop.includes("color") && !prop.includes("background")) {
              value = "#000000";
            } else if (prop.includes("background")) {
              value = "#ffffff";
            } else if (prop.includes("border")) {
              value = "#cccccc";
            }
          }
          clonedElement.style[prop] = value;
        });

        const originalChildren = originalElement.childNodes;
        const clonedChildren = clonedElement.childNodes;
        for (let i = 0; i < originalChildren.length; i++) {
          if (originalChildren[i].nodeType === 1 && clonedChildren[i]) {
            processStyles(originalChildren[i], clonedChildren[i]);
          }
        }
      };

      const removeProblematicClasses = (element) => {
        if (element.classList) {
          element.classList.remove(
            "overflow-hidden", "overflow-x-hidden", "overflow-y-hidden"
          );
        }
        Array.from(element.children).forEach((child) => {
          removeProblematicClasses(child);
        });
      };

      removeProblematicClasses(clone);
      processStyles(input, clone);

      const tempDiv = document.createElement("div");
      tempDiv.appendChild(clone);
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      document.body.appendChild(tempDiv);

      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
      });

      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        putOnlyUsedFonts: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10;
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(
        canvas,
        "PNG",
        margin,
        margin,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );

      let heightLeft = imgHeight;
      while (heightLeft >= pageHeight) {
        const position = heightLeft - pageHeight;
        pdf.addPage();
        pdf.addImage(
          canvas,
          "PNG",
          margin,
          -(position - margin),
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pageHeight;
      }

      pdf.save(`invoice_${filterData.orderCode}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("There was an error generating the PDF. Please try again.");
    } finally {
      const tempDivs = document.querySelectorAll('div[style*="left: -9999px"]');
      tempDivs.forEach((div) => document.body.removeChild(div));
    }
  };

  if (!filterData) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateSubtotal = () => {
    return filterData.products.reduce(
      (total, item) => total + item.variant.price * item.quantity,
      0
    );
  };

  const calculateDiscount = () => {
    return filterData.products.reduce(
      (total, item) => total + (item.discount || 0) * item.quantity,
      0
    );
  };

  return (
    <div className="relative">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mb-4 no-print">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
        >
          Print Invoice
        </button>
        <button
          onClick={downloadPdf}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
        >
          Download PDF
        </button>
      </div>

      {/* Invoice Container */}
      <div
        ref={invoiceRef}
        className="bg-white border rounded shadow-lg max-w-full p-8 text-sm print:shadow-none print:border-0"
      >
        {/* Invoice Header with Logo */}
        <div className="flex justify-between border-b pb-4 mb-6">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Company Logo"
              className="logo h-12 mr-4"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div>
              <h2 className="text-md font-semibold">
                Order{" "}
                <span className="text-blue-600 print:text-blue-800">
                  #{filterData.orderCode}
                </span>
              </h2>
              <p className="text-gray-600 text-xs">
                Date: {formatDate(filterData.createdAt)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-md font-semibold">Invoice</h2>
            <p className="text-xs text-gray-600">
              Status: {filterData.orderStatus}
            </p>
          </div>
        </div>

        {/* Billing and Shipping Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-1 text-sm">Billing Details</h3>
            <p className="text-gray-800 text-sm break-words">
              {filterData.billingDetail}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-sm">Shipping Details</h3>
            <p className="text-gray-800 text-sm break-words">
              {filterData.shippingDetail}
            </p>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-sm">Order Items</h3>
          <table className="min-w-full text-sm border-t border-b">
            <thead>
              <tr className="bg-gray-100 text-left text-xs print:bg-gray-200">
                <th className="py-2 px-3">Product</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3">Qty</th>
                <th className="py-2 px-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {filterData.products.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="py-2 px-3">
                    <div className="flex items-center">
                      {item.product.thumbnail && (
                        <img
                          src={item.product.thumbnail}
                          className="w-8 h-8 rounded mr-3 object-cover"
                          alt={item.product.name}
                          crossOrigin="anonymous"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      )}
                      <div>
                        <p className="text-gray-900 font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          SKU: {item.product.skuCode}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <span>₹{(parseFloat(item.variant.price) || 0).toFixed(2)}</span>
                  </td>
                  <td className="py-2 px-3">{item.quantity}</td>
                  <td className="py-2 px-3">
                    ₹{(parseFloat(item.variant.price) * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end mb-6">
          <div className="w-full md:w-1/3 border-t pt-4 text-sm">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>₹{filterData.shippingFees?.toFixed(2) || '0.00'}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount:</span>
              <span>-₹{calculateDiscount().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-3 print:text-black">
              <span>Total:</span>
              <span>₹{filterData.amount?.toFixed(2) || calculateSubtotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* QR Code Section */}
        {qrCodeUrl && (
          <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold text-sm mb-2 text-center">
              Delivery Verification QR Code
            </h3>
            <div className="flex flex-col items-center">
              <img
                src={qrCodeUrl}
                alt="Delivery QR Code"
                className="w-32 h-32 border p-2"
              />
              <p className="text-xs text-gray-500 text-center mt-2 max-w-xs">
                Scan this code with the delivery app to verify successful delivery
              </p>
            </div>
          </div>
        )}

        {/* Payment Method */}
        <div className="border-t pt-4 mb-4">
          <h3 className="font-semibold text-sm mb-1">Payment Method</h3>
          <p className="text-gray-700">{filterData.paymentMethod}</p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 print:text-gray-700">
          <p>Thank you for your order!</p>
          <p>
            If you have any questions, please contact us at support@example.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;

