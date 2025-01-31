import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosAuthBaseQuery } from "./request";

const authBaseApi = createApi({
  reducerPath: "authBaseApi",
  baseQuery: axiosAuthBaseQuery({
    baseUrl: "",
    headers: {
      'Content-Type': 'application/json',
    },
  }),
  endpoints: () => ({}),
});

export default authBaseApi;
