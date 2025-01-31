import React from 'react'

const CustomInput = ({ label, type, placeholder, register, name, errors, onChange, maxLength,minLength ,isDisabled, classes, required = true, ...otherProps }) => {
  return (
    <div className={`custom__form ${classes}`}>
      <label>{label}</label>
      <input
        className="inside__input"
        type={type}
        placeholder={placeholder}
        {...register(name, {
          ...(required && {
            required: `${name} is required`,
          }),
          ...(maxLength && {
            maxLength: {
              value: maxLength,
              message: `${name} cannot exceed ${maxLength} characters`,
            },
          }),
          ...(minLength && {
            minLength: {
              value: minLength,
              message: `${name} cannot be below ${minLength} characters`,
            },
          }),
          onChange,
        })}
        disabled={isDisabled}
      />
      {errors[name] && <p className="error">{errors[name].message}</p>}
    </div>
  );
};

export default CustomInput;
