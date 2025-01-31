import React from "react";
import {
  Modal as ModalComponent,
  TransitionablePortal,
} from "semantic-ui-react";
import PropTypes from "prop-types";

export const DEFAULT_PROPS = {
  transition: {
    animation: "scale",
    duration: 300,
  },
};

const Modal = ({
  size,
  children,
  open,
  onClose,
  style,
  closeIcon,
  contentPadding,
  title,
  className,
  ...otherProps
}) => {
  if (!open) return null;

  return (
    <>
      <TransitionablePortal {...{ open }}>
        <ModalComponent
          size={size || "small"}
          open
          closeIcon={closeIcon ? true : false}
          onClose={onClose}
          closeOnDimmerClick={false}
          closeOnEscape={false}
          style={style}
          className={className}
          {...otherProps}
        >
          {title && <ModalComponent.Header>{title}</ModalComponent.Header>}
          <div
            className=""
            style={{ paddingBlock: contentPadding || "1.5rem" }}
          >
            {children}
          </div>
        </ModalComponent>
      </TransitionablePortal>
    </>
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
