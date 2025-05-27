import React from 'react';
import './form.css';

const FormInput = ({ type = 'text', placeholder, value, onChange }) => {
  return (
    <input
      className="form-input"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormInput;