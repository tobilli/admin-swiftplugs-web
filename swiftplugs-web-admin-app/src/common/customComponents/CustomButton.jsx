import React from "react";
import { Button, Icon } from "semantic-ui-react";

const CustomButton = ({
  title,
  type,
  onClick,
  isBusy,
  icon,
  id,
  isDisabled,
  isOutlined,
  isCancelButton,
  className,
  ...otherProp
}) => (
  <Button
    type={type}
    onClick={onClick}
    disabled={isBusy || isDisabled}
    className={`${
      isDisabled || isBusy
        ? "contained__disabled-button"
        : isOutlined
        ? "outlined__button"
        : isCancelButton
        ? "cancel__button"
        : "contained__button"
    } ${className}`}
    {...otherProp}
  >
    {isBusy ? (
      <span>
        <Icon name="spinner" loading />
      </span>
    ) : (
      <p>
        {icon && (
          <img src={icon} alt="" width="16px" style={{ marginRight: "8px" }} />
        )}{" "}
        {title}
      </p>
    )}
  </Button>
);

export default CustomButton;
