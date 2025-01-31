import axios from "axios";
import { removeAccessToken ,getAccessToken} from "../session/cookies";
import { Cookies } from "react-cookie";
import toaster from "../utils/toaster";

const cookies = new Cookies()


const axiosAuthBaseQuery = ({headers } = { headers: {}}) => {
  const axiosInstance = axios.create({
       baseURL: import.meta.env.VITE_APP_BACKEND_SERVICE_API,
    withCredentials: false,
  });

  axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessToken();

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
    }

    if (config.additionalHeaders) {
      config.headers = {
        ...config.headers,
        ...config.additionalHeaders,
      };
    }

    // Remove the existing Cookie header
    delete config.headers["Cookie"];

    return config;
  });

  return async ({url, method, data, params, additionalHeaders}) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers, // Here we are passing the headers from the base function
        additionalHeaders, // Here we are passing additionalHeaders to the axiosInstance
      });

      return {
        data: result.data,
      };
    } catch (axiosError) {
      const err = axiosError;
       if(err.response?.status === 401 || err.response?.status === "401" ){
        toaster("error", {
          content: "UnAuthorized User!"
        });
  }
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };
};

// const refreshAccessToken = async ()=>{
//   const baseRefreshURL = `${process.env.REACT_APP_BACKEND_SERVICE_API}/`;
//   const refreshTkn = cookies.get("");

//   try {
//     const response = await axios.post(baseRefreshURL,{
//       refreshToken: refreshTkn,
//     });
//   } catch (error) {
//     console.log(error)
//     removeAccessToken();
//   }
// }


const axiosUnauthBaseQuery = (
  { headers } = {headers: {} }
) => {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BACKEND_SERVICE_API,
    //  withCredentials: true, 
  });

  axiosInstance.interceptors.request.use((config) => {
    // Remove the existing Cookie header
    delete config.headers["Cookie"];
    return config;
  });

  return async ({url, method, data, params, additionalHeaders}) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers: {
          ...additionalHeaders,
          ...headers,
        },
      });
      return {
        data: result.data,
      };
    } catch (axiosError) {
      const err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }; 
    }
  };
};

export { axiosAuthBaseQuery, axiosUnauthBaseQuery };
