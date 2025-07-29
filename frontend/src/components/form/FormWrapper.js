import React from 'react';
import './form.css';

const FormWrapper = ({ title, children }) => {
  return (
    <div className={ `form-wrapper ${className}` }>
      {title && <h2 className="form-title">{title}</h2>}
      {children}
    </div>
  );
};

export default FormWrapper;