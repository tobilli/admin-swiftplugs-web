import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import {
  getAccessToken,
  getSessionTimeOut,
  saveSessionTimeOut,
} from "./cookies";
import logOut from "./logOut";
import toaster from "../utils/toaster";
import { AUTH, DASHBOARD } from "../../RoutesConstants";

const config = {
  duration: 5,
  isEnabled: true,
  messageTitle: "Still with us?",
  message: "You were signed out due to inactivity, Log in to continue.",
};

const SessionTimeOut = ({ children }) => {
  const navigate = useNavigate();

  if (!config?.isEnabled) {
    return <section>{children}</section>;
  } else {
    const timeUserOut = (bool) => {
      if (getAccessToken()) {
        if (getSessionTimeOut()) {
          saveSessionTimeOut(config?.duration);
        } else {
          logOut();
          navigate(AUTH.LANDINGPAGE);
          !bool &&
            toaster(
              "info",
              { title: config?.messageTitle, content: config?.message },
              null,
              3000
            );
        }
      }
    };
    window.addEventListener("load", () => timeUserOut(true));
    window.addEventListener("scrollend", () => timeUserOut());
    window.addEventListener("keypress", () => timeUserOut());
    window.addEventListener("mousemove", () => timeUserOut());
    window.addEventListener("mousedown", () => timeUserOut());
    window.addEventListener("mouseenter", () => timeUserOut());
    window.addEventListener("keydown", () => timeUserOut());
    window.addEventListener("click", () => timeUserOut());

    return <section>{children}</section>;
  }
};

SessionTimeOut.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SessionTimeOut;
