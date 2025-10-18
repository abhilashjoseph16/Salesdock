import React, { useState } from "react";
import "./AddDiscountModal.css";
import OutsideIcon from "../assets/icons/Outside.png";
import RadioIcon from "../assets/icons/Radio.png";

export default function AddDiscountModal({ onClose, onSave }) {
  const [priceType, setPriceType] = useState("monthly");
  const [discountType, setDiscountType] = useState("%");
  const [discount, setDiscount] = useState("");
  const [duration, setDuration] = useState("");
  const [newPrice, setNewPrice] = useState("€ 950.00");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ priceType, discountType, discount, duration, newPrice, description });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Add discount</h3>
        <span className="modal-content-subtitle">For which price do you calculate the discount?</span>
        <form onSubmit={handleSubmit}>
          <div className="price-toggle">
            <button
              type="button"
              className={priceType === "one-time" ? "toggle-btn active" : "toggle-btn"}
              onClick={() => setPriceType("one-time")}
            >
              One time price <img src={priceType === "one-time" ? RadioIcon : OutsideIcon} />
            </button>
            <button
              type="button"
              className={priceType === "monthly" ? "toggle-btn active" : "toggle-btn"}
              onClick={() => setPriceType("monthly")}
            >
              Monthly price <img src={priceType === "monthly" ? RadioIcon : OutsideIcon} />
            </button>
          </div>

          <label>Discount</label>
          <div className="discount-input">
            <select value={discountType} onChange={(e) => setDiscountType(e.target.value)}>
              <option value="%">%</option>
              <option value="€">€</option>
            </select>
            <input
              type="text"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter discount value"
            />
          </div>

          <label>Duration</label>
          <div className="duration-row">
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="months"
            />
          </div>

          <label>New price</label>
          <input type="text" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />

          <label>Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description"
          />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="add-btn">Add</button>
          </div>
        </form>
      </div>
    </div>
  );
}
