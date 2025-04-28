import React, { useState } from "react";
import "./SellerHome.css";
import AddProduct from "./AddProduct";

const SellerHome = () => {
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="seller-home">
    

      <main>
        <p className="welcome">
          Welcome{" "}
          <span className="highlight">{user?.First_Name || "Seller Name"}</span>
        </p>

        <div className="top-section">
          <h2>Sell Your Product</h2>
          <button onClick={() => setShowModal(true)}>Add Product</button>
          {showModal && <AddProduct onClose={() => setShowModal(false)} />}
        </div>

        <div className="dashboard">
          <div>
            <h3>Seller Dashboard</h3>
            <img src="/images/dashboard.png" alt="Dashboard" />
          </div>
          <div>
            <h3>Monthly Sales</h3>
            <img src="/images/sales-chart.png" alt="Sales" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerHome;
