import React, { useState, useEffect } from "react";
import "./AddDiscountModal.css";
import OutsideIcon from "../assets/icons/Outside.png";
import RadioIcon from "../assets/icons/Radio.png";

export default function AddDiscountModal({ onClose, onSave, discountData }) {
  const [priceType, setPriceType] = useState("monthly");
  const [discountType, setDiscountType] = useState("%");
  const [discount, setDiscount] = useState("");
  const [duration, setDuration] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [description, setDescription] = useState("Manual");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (discountData) {
      setPriceType(discountData.type);
      setDiscountType(discountData.currency);
      setDiscount(discountData.amount);
      setDuration(discountData.duration || "");
      setNewPrice(discountData.newPrice || "");
      setDescription(discountData.name);
    }
  }, [discountData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      priceType,
      discountType,
      price: Number(discount),
      duration,
      newPrice,
      description,
    });
  };

  const isDiscountInvalid = discountType === "%" && Number(discount) > 10;

  const handleOptionSelect = (value) => {
    setDiscountType(value);
    setDropdownOpen(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{discountData ? "Edit discount" : "Add discount"}</h3>
        <span className="modal-content-subtitle">
          For which price do you calculate the discount?
        </span>

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
            <div className={`custom-select-box ${isDiscountInvalid ? "error" : ""}`} onClick={() => setDropdownOpen(!dropdownOpen)}>
              {discountType}
            </div>
            {dropdownOpen && (
              <div className="custom-select-dropdown">
                <div className="custom-option" onClick={() => handleOptionSelect("%")}>% Percentage</div>
                <div className="custom-option" onClick={() => handleOptionSelect("€")}>€ Euro</div>
              </div>
            )}
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount amount"
              className={isDiscountInvalid ? "discount-field invalid-input" : ""}
            />
          </div>
          {isDiscountInvalid && (
            <span className="error-text">Exceeds the max. of 10%</span>
          )}

          <label>Duration (months)</label>
          <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Number of months" />

          <label>New price</label>
          <input type="text" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} placeholder="e.g. € 950.00" />

          <label>Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Discount description" />

          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
            <button type="submit" className="add-btn">{discountData ? "Save" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
