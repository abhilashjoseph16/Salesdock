import { useState } from "react";
import "./Discounts.css";

const INITIAL_DISCOUNTS = [
  { id: "1", name: "Discount name", description: "€ 250,00 one time", enabled: true, amount: 250 },
  { id: "2", name: "Discount name", description: "5 % one time", enabled: false, amount: 0 },
  { id: "3", name: "Discount name", description: "€ 250,00 monthly", enabled: false, amount: 0 },
  { id: "4", name: "Discount name", description: "25 % monthly first 3 months", enabled: false, amount: 0 },
];

export default function Discounts() {
  const [discounts, setDiscounts] = useState(INITIAL_DISCOUNTS);

  const handleToggle = (id) => {
    setDiscounts(prev =>
      prev.map(d =>
        d.id === id
          ? { ...d, enabled: !d.enabled, amount: !d.enabled ? parseFloat(d.description.match(/[\d.,]+/)?.[0].replace(",", ".") || 0) : 0 }
          : d
      )
    );
  };

  const subtotal = discounts.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="discounts-page">
      <div className="discounts-left">
        <div className="discounts-header">
          <h2>Discounts</h2>
          <button className="add-button">+ Add manual discount</button>
        </div>

        <div className="discounts-list">
          {discounts.map(d => (
            <div key={d.id} className="discount-row">
              <div className="discount-info">
                <span>{d.name}</span>
                <span>{d.description}</span>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={d.enabled}
                  onChange={() => handleToggle(d.id)}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>

        <div className="discounts-footer">
          <button className="previous-btn">Previous</button>
          <button className="next-btn">Next</button>
        </div>
      </div>

      <div className="discounts-right">
        <h3>Overzicht</h3>
        <div className="summary-item">
          <span>Webasto Pure II laadpaal type 2</span>
          <span>€ 1.000,00</span>
        </div>
        <div className="summary-item">
          <span>Maandelijkse prijs</span>
          <span>€ 10,00</span>
        </div>
        <hr />
        <div className="summary-item">
          <span>Uiteindelijk per maand excl. btw</span>
          <span>€ 10,00</span>
        </div>
        <div className="summary-item">
          <span>Subtotal eenmalige kosten excl. btw</span>
          <span>€ 1.000,00</span>
        </div>
        <div className="summary-item">
          <span>Discount name</span>
          <span>€ {discounts[0].enabled ? discounts[0].amount.toFixed(2) : "0,00"}</span>
        </div>
        <div className="summary-item total">
          <span>Eenmalige kosten excl. btw</span>
          <span>€ {(1000 - (discounts[0].enabled ? discounts[0].amount : 0)).toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
