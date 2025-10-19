import React, { useState, useEffect } from "react";
import "./Discounts.css";
import AddDiscountModal from "../component/AddDiscountModal";
import DeleteConfirmationModal from "../component/DeleteConfirmationModal";
import overViewImage from "../assets/icons/overview-image.png";
import editIcon from "../assets/icons/edit.png";
import deleteIcon from "../assets/icons/delete.png";

export default function Discounts() {
  const defaultDiscounts = [
    { id: 1, name: "Discount 1", amount: 250, currency: "€", type: "one-time", enabled: true, isManual: false },
    { id: 2, name: "Discount 2", amount: 5, currency: "%", type: "one-time", enabled: false, isManual: false },
    { id: 3, name: "Discount 3", amount: 250, currency: "€", type: "monthly", enabled: false, isManual: false },
  ];

  const [discounts, setDiscounts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDiscount, setEditingDiscount] = useState(null);
  const [deletingDiscount, setDeletingDiscount] = useState(null);

  const baseOneTime = 1000;
  const baseMonthly = 10;

  useEffect(() => {
    const stored = localStorage.getItem("manualDiscounts");
    if (stored) {
      setDiscounts([...defaultDiscounts, ...JSON.parse(stored)]);
    } else {
      setDiscounts(defaultDiscounts);
    }
  }, []);

  const saveManualDiscounts = (manualDiscounts) => {
    localStorage.setItem("manualDiscounts", JSON.stringify(manualDiscounts));
  };

  const toggleDiscount = (id) => {
    const updated = discounts.map(d => d.id === id ? { ...d, enabled: !d.enabled } : d);
    setDiscounts(updated);
  };

  const handleAddOrEditDiscount = (data) => {
    if (editingDiscount) {
      const updated = discounts.map(d => 
        d.id === editingDiscount.id
          ? { ...d, name: data.description, amount: data.price, currency: data.discountType, type: data.priceType }
          : d
      );
      setDiscounts(updated);
      saveManualDiscounts(updated.filter(d => d.isManual));
      setEditingDiscount(null);
    } else {
      const newDiscount = {
        id: discounts.length ? discounts[discounts.length - 1].id + 1 : 1,
        name: data.description,
        amount: data.price,
        currency: data.discountType,
        type: data.priceType,
        enabled: true,
        isManual: true,
      };
      const updated = [...discounts, newDiscount];
      setDiscounts(updated);
      saveManualDiscounts(updated.filter(d => d.isManual));
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    const updated = discounts.filter(d => d.id !== id);
    setDiscounts(updated);
    saveManualDiscounts(updated.filter(d => d.isManual));
  };

  const handleEditClick = (discount) => {
    setEditingDiscount(discount);
    setShowModal(true);
  };

  const selectedDiscounts = discounts.filter(d => d.enabled);

  const totalOneTimeDiscount = selectedDiscounts
    .filter(d => d.type === "one-time")
    .reduce((acc, d) => {
      if (d.currency === "€") return acc + Number(d.amount);
      if (d.currency === "%") return acc + (baseOneTime * Number(d.amount)) / 100;
      return acc;
    }, 0);

  const totalMonthlyDiscount = selectedDiscounts
    .filter(d => d.type === "monthly")
    .reduce((acc, d) => {
      if (d.currency === "€") return acc + Number(d.amount);
      if (d.currency === "%") return acc + (baseMonthly * Number(d.amount)) / 100;
      return acc;
    }, 0);

  return (
    <>
      <div className="page-center">
        <div className="previous-btb-container">
          <button className="previous-top-btn">Previous</button>
        </div>

        <div className="content-row">
          <div className="discounts-left">
            <div className="discounts-header"><h2>Discounts</h2></div>

            <div className="add-discount-btn-container">
              <button className="add-discount-btn" onClick={() => { setEditingDiscount(null); setShowModal(true); }}>
                + Add manual discount
              </button>
            </div>

            <div className="discounts-list">
              {discounts.map(d => (
                <div className={`discount-item ${d.isManual ? "manual-discount" : ""}`} key={d.id}>
                  <div className="discount-info">
                    <p className="discount-name">{d.name}</p>
                    <p className="discount-description">
                      {d.currency} {d.amount} {d.type === "monthly" ? "monthly" : "one-time"}
                    </p>
                  </div>

                  {!d.isManual && (
                    <label className="switch">
                      <input type="checkbox" checked={d.enabled} onChange={() => toggleDiscount(d.id)} />
                      <span className="slider"></span>
                    </label>
                  )}

                  {d.isManual && (
                    <div className="manual-actions">
                      <button className="edit-discount-btn" onClick={() => handleEditClick(d)}>
                        <img src={editIcon} alt="edit"/>
                      </button>
                      <button className="delete-discount-btn" onClick={() => setDeletingDiscount(d)}>
                        <img src={deleteIcon} alt="delete"/>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="discounts-footer">
              <button className="footer-btn previous">Previous</button>
              <button className="footer-btn next">Next</button>
            </div>

            <div className="content-row-stepper"><span>Klantgegevens</span></div>
            <div className="content-row-stepper"><span>Productgegevens</span></div>
            <div className="content-row-stepper"><span>Checkout</span></div>
          </div>

          <div className="discounts-right">
            <div className="summary-box">
              <span className="overview-image-container">
                <img src={overViewImage} alt="overview" />
              </span>
              <h3>Overview</h3>

              <div className="product-text-container">
                <p className="product-name">Webasto Pure II laadpaal type 2</p>
                <span>€ {baseOneTime}</span>
              </div>
              <div className="product-text-container">
                <p className="product-name"><i>Maandelijkse prijs</i></p>
                <span>€ {baseMonthly - totalMonthlyDiscount}</span>
              </div>

              <div className="edit-btn"><button>Edit</button></div>

              <div className="summary-row">
                <div>
                  <span>Eventually per month excl. btw</span>
                  <span>€ {baseMonthly - totalMonthlyDiscount}</span>
                </div>
              </div>

              <div className="summary-row-total">
                <div>
                  <span>Subtotal onetime costs excl. btw</span>
                  <span>€ {baseOneTime}</span>
                </div>

                {selectedDiscounts.map(d => (
                  <div key={d.id}>
                    <span>{d.name}</span>
                    <span>- {d.currency === "€" ? `€ ${d.amount}` : `${d.amount}%`}</span>
                  </div>
                ))}

                <div>
                  <span><strong>Onetime costs excl. btw</strong></span>
                  <span><strong>€ {baseOneTime - totalOneTimeDiscount}</strong></span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <AddDiscountModal
          onClose={() => { setShowModal(false); setEditingDiscount(null); }}
          onSave={handleAddOrEditDiscount}
          discountData={editingDiscount}
        />
      )}

      {deletingDiscount && (
        <DeleteConfirmationModal
          onClose={() => setDeletingDiscount(null)}
          onConfirm={() => {
            handleDelete(deletingDiscount.id);
            setDeletingDiscount(null);
          }}
        />
      )}
    </>
  );
}
