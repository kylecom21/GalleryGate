import React from "react";

const SuccessModal = ({ message, onClose }) => {
  return (
    <div className="success-modal-overlay" onClick={onClose}>
      <div className="success-modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>{message}</h3>
        <button className="close-success-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SuccessModal;