import React, { useState } from "react";
import "./Discounts.css";
import AddDiscountModal from "../component/AddDiscountModal";

export default function Discounts() {
  const [discounts, setDiscounts] = useState([
    {
      id: 1,
      name: "Discount name",
      description: "€ 250,00 one time",
      enabled: true,
    },
    {
      id: 2,
      name: "Discount name",
      description: "5% one time",
      enabled: false,
    },
    {
      id: 3,
      name: "Discount name",
      description: "€ 250,00 monthly",
      enabled: false,
    },
  ]);

  const [showModal, setShowModal] = useState(false);

  const toggleDiscount = (id) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, enabled: !d.enabled } : d))
    );
  };

  return (
    <div className="discounts-page">
      <div className="discounts-left">
        <div className="discounts-header">
          <h2>Discounts</h2>
        </div>
        <div className="add-discount-btn-container">
          <button
            className="add-discount-btn"
            onClick={() => setShowModal(true)}
          >
            + Add manual discount
          </button>
        </div>

        <div className="discounts-list">
          {discounts.map((discount) => (
            <div className="discount-item" key={discount.id}>
              <div className="discount-info">
                <p className="discount-name">{discount.name}</p>
                <p className="discount-description">{discount.description}</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={discount.enabled}
                  onChange={() => toggleDiscount(discount.id)}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>

        <div className="discounts-footer">
          <button className="footer-btn previous">Previous</button>
          <button className="footer-btn next">Next</button>
        </div>
      </div>

      <div className="discounts-right">
        <div className="summary-box">
          <h3>Overview</h3>
          <p className="product-name">Webasto Pure II laadpaal type 2</p>

          <div className="summary-row">
            <span>Monthly price</span>
            <span>€ 1.000,00</span>
          </div>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>€ 1.000,00</span>
          </div>
          <div className="summary-row">
            <span>Discount name</span>
            <span>- € 250,00</span>
          </div>
          <div className="summary-row total">
            <span>Final price</span>
            <span>€ 750,00</span>
          </div>
        </div>
      </div>

      {showModal && <AddDiscountModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
