import React from 'react';

const CustomFormArea = ({ label, placeholder, name, errors, onChange, className, register }) => (
  <div className={`form-textarea ${className}`}>
    <label>{label}</label>
    <textarea
      placeholder={placeholder}
      {...register(name)}
      onChange={onChange}
    />
    {errors[name] && <p className="error-message">{errors[name].message}</p>}
  </div>
);

export default CustomFormArea;
