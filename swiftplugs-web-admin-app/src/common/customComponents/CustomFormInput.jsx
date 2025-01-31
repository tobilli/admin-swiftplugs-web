import React, { useMemo } from "react";
import { Icon } from "semantic-ui-react";
import { useFormContext } from "react-hook-form";
// import { ShowPassword } from "../../images/SvgComponent/ShowPassword";
// import { HidePassword } from "../../images/SvgComponent/HidePassword";

const CustomFormInput = ({
  label,
  type,
  id,
  optional,
  placeholder,
  onChange,
  onBlur,
  dontShowError,
  name,
  autoComplete,
  style,
  classes,
  svg,
  onMouseEnter,
  onMouseLeave,
  cvv,
  maxLength,
  errorBorder,
  hasTouched,
  cardNumberErrorMessage,
  errorMessage,
  inputId,
  clear,
  onClear,
  rightComponent,
  ...otherProps
}) => {
  const { formState, register } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);

  const passwordType = useMemo(
    () => (showPassword ? "text" : "password"),
    [showPassword]
  );

  return (
    <div
      className={`custom__form ${
        classes?.customFormLabel || classes || "_margin"
      }`}
    >
      {label && (
        <div className="custom__form__header">
          <label htmlFor={id} className="custom__form__label">
            {label}{" "}
            {optional && (
              <span className="custom__form__label__optional">(Optional)</span>
            )}
          </label>
          {/* {cvv && (
            <div
              className="cvv__icn__pointer"
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
            >
              <img src={cvvIcn} alt="cvv__icn" />
            </div>
          )} */}
        </div>
      )}
      <div
        className={`custom__form__input ${
          formState?.errors[name] && !dontShowError && "errorInput__border"
        } ${hasTouched && errorBorder && "error__card"} ${
          classes?.customFormInput || ""
        }`}
        style={style}
        id={id}
        data-theme="dark"
      >
        {svg && <img src={svg} alt="__icn" className="card__type" />}
        <input
          id={inputId}
          className={`inside__input`}
          autoComplete={type === "password" ? "new-password" : "off"}
          type={type === "password" ? passwordType : type}
          {...register(name, { onChange })}
          placeholder={placeholder}
          onBlur={onBlur}
          {...otherProps}
          maxLength={maxLength}
        />
        {/* {clear && (
          <img
            src={clearIcn}
            alt="clear icon"
            style={{ cursor: "pointer" }}
            onClick={onClear}
          />
        )} */}
        {/* {!clear && type === "password" && (
          <span
            onClick={() => setShowPassword((state) => !state)}
            className="password__eye"
          >
            {showPassword ? (
              <ShowPassword iconColor={"var(--textThemeColor5)"} />
            ) : (
              <HidePassword iconColor={"var(--textThemeColor5)"} />
            )}
          </span>
        )} */}
        {rightComponent}
      </div>
      {formState?.errors[name] && !dontShowError && (
        <span className="errorText">
          <Icon name="info circle" />
          {formState?.errors[name].message}
        </span>
      )}
      {hasTouched && errorBorder && (
        <span className="errorText">
          <Icon name="info circle" />
          <span>{svg && cardNumberErrorMessage}</span>
          <span>{errorMessage}</span>
        </span>
      )}
    </div>
  );
};

export default CustomFormInput;
