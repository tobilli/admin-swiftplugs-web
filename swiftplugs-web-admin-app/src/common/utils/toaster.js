import React from "react";
import toast from "react-hot-toast";
import constants from "../../constants";
import isMobile from "./isMobile";
import closeIcon from "../../images/close.png";

const toastStatusStyles = {
  success: {
    borderColour: "#BEF2B9",
    borderLeftColour: "#519E47",
    background: "#F1FEF1",
    color: "#163C29",
  },
  error: {
    borderColour: "#F4B7B5",
    borderLeftColour: "#DC4437",
    background: "#FBE9E9",
    color: "#590C07",
  },
  warning: {
    borderColour: "#FDED94",
    borderLeftColour: "#EC9B40",
    background: "#FEF6CF",
    color: "#6B2B0D",
  },
  info: {
    borderColour: "#E1E6ED",
    borderLeftColour: "#0275D8",
    background: "#FFFFFF",
    color: "#0275D8",
  },
};

/**
 *
 * @param {string} status
 * @returns {Object}
 */

const toastStyle = (status) => ({
  main: {
    border: `1px solid ${toastStatusStyles[status]?.borderColour || "#E1E6ED"}`,
    borderRadius: "0.3em",
    width: `${isMobile() ? "100%" : "35%"}`,
    padding: "8px 12px 4px",
    borderLeft: `5px solid ${
      toastStatusStyles[status]?.borderLeftColour || "#353F50"
    }`,
    background: `${toastStatusStyles[status]?.background || "#FFFFFF"}`,
    boxShadow:
      "0px 20px 25px -5px rgba(0, 0, 0, 0.1), 0px 10px 10px -5px rgba(0, 0, 0, 0.04)",
    height: "auto",
  },
  title: {
    fontSize: "1rem",
    color: `${toastStatusStyles[status]?.color || "#353F50"}`,
    margin: 0,
    paddingTop: "4px",
    paddingBottom: "6px",
    fontFamily: "Averta",
    fontWeight: "700px",
  },
  content: {
    color: `${
      toastStatusStyles[status === "info" ? "default" : status]?.color ||
      "#353F50"
    }`,
    fontSize: "0.875rem",
    margin: 0,
    paddingBottom: "3px",
  },
  close: {
    width: "15px",
    float: "right",
    marginTop: "1px",
    cursor: "pointer",
  },
});

/**
 * toaster
 * @param {string} toastStatus
 * @param {string | {title: string, content: string}} toastMessage
 * @param {number} [toastDuration]
 * @param {number} errorStatus **This erroStatus params takes in https status code**
 */

const toaster = (
  toastStatus,
  toastMessage,
  errorStatus,
  toastDuration = 5000
) => {
  toast.custom(
    (t) => (
      <div
        className={t.visible ? "toast-enter" : "toast-leave"}
        style={toastStyle(toastStatus).main}
      >
        {(toastMessage.title ||
          toastMessage.content ||
          !!Object.keys(toastMessage).length) && (
          <img
            style={toastStyle(toastStatus).close}
            src={closeIcon}
            alt="alt"
            onClick={() => toast.dismiss(t.id)}
          />
        )}

        {toastMessage.title && (
          <h5 style={toastStyle(toastStatus).title}>
            {errorStatus >= 500
              ? constants.DEFAULT_ERROR_TITLE
              : toastMessage.title}
          </h5>
        )}

        {toastMessage.content && (
          <p style={toastStyle(toastStatus).content}>{toastMessage.content}</p>
        )}

        {!toastMessage.content?.length && toastStatus === "error" && (
          <p style={toastStyle(toastStatus).content}>
            {constants.DEFAULT_ERROR_MESSAGE}
          </p>
        )}

        {typeof toastMessage === "string" && (
          <p style={toastStyle(toastStatus).content}>{toastMessage}</p>
        )}
      </div>
    ),
    { duration: toastDuration }
  );
};

export default toaster;
