import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OrderPlacedPopup = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center overflow-hidden bg-light">
        <div
          className="position-fixed z-5 top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
        >
          <div className="card border-success  text-success rounded-3 shadow-lg" style={{ width: "30rem", height: "15rem" }}>
            <div className="card-body text-center d-flex justify-content-center align-items-center flex-column">
              <h2 className="card-title display-4 fw-bold">Order Placed!</h2>
              <p className="card-text mt-2 fs-5">Thank you for shopping with us.</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default OrderPlacedPopup;
