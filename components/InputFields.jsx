// InputField.js
import React from 'react';

const InputField = ({ label, type, name, value, onChange, placeholder }) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="form-control"
    />
  </div>
);

export default InputField;
