import React from "react";
import "./DeleteConfirmationModal.css";
import closeIcon from "../assets/icons/close.png";

export default function DeleteConfirmationModal({ onClose, onConfirm }) {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-content">
        <div className="delete-modal-header">
          <h3>Delete discount</h3>
          <button className="close-btn" onClick={onClose}>
            <img src={closeIcon} alt="Close" />
          </button>
        </div>
        <p>Are you sure you want to delete this discount?</p>
        <div className="delete-modal-actions">
          <button className="delete-btn" onClick={onConfirm}>Delete discount</button>
        </div>
      </div>
    </div>
  );
}
