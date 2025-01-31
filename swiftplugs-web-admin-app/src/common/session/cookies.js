import { Cookies } from "react-cookie";

const cookies = new Cookies();


export const getAccessToken = () => {
  const token = cookies.get("SpAdAt");
  return token;
};

// /**
//  *
//  * @param {{ access_token: string}} data
//  */


export const saveAccessToken = ({ accessToken , refreshToken,}) => {
  const tokenExpiry = new Date(); 
  const expires_in = 3600; 
  tokenExpiry.setSeconds(tokenExpiry.getSeconds() + expires_in);
  const cookieOptions = {
    expires: tokenExpiry,
    secure: true,
    path: "/",
    sameSite: "Strict",
  };

  //Remove exisiting  cookies....
  cookies.remove("SpAdAt", "", {
    ...cookieOptions
  });
  cookies.remove("SpAdRt", "", {
    ...cookieOptions
  });

  cookies.set("SpAdAt", accessToken, cookieOptions);
  cookies.set("SpAdRt", refreshToken);
};

export const removeAccessToken = () => {
   const date = new Date(Date.now());
  const cookieOptions = {
    expires: date,
    secure: true,
    path: "/",
    sameSite: "Strict",
  };
  cookies.remove('SpAdAt', cookieOptions);
  cookies.remove("SpAdRt");
};

/**
 * -------------------------------------------------------------------------------------
 * This is Session Time Out Implementation
 * @param {number} sessionTime
 * @param {Function} callback
 *
 */

