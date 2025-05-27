import React from 'react';
import './form.css';

const FormButton = ({ children, ...props }) => {
  return (
    <button className="form-button" {...props}>
      {children}
    </button>
  );
};

export default FormButton;