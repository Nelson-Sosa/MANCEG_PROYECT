import React from 'react';
import './Modal.css'; 

const Modal = ({ show, onClose, onConfirm, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-content">
          {children}
        </div>
        <div className="modal-actions">
          <button className="modal-button-conf" onClick={onConfirm}>Confirm</button>
          <button className="modal-button-canc" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
