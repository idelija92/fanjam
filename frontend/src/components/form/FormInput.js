import React from 'react';
import './form.css';

const FormInput = ({ type = 'text', name, placeholder, value, onChange }) => {
  return (
    <input
      className="form-input"
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default FormInput;