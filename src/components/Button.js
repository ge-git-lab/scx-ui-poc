// components/Button.js
import React from 'react';

const Button = ({ label, variant, onClick }) => {
  return (
    <button type="button" className={`btn btn-${variant} me-1`} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
