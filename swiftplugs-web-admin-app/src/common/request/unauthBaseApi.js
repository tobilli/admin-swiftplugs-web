import { createApi } from "@reduxjs/toolkit/query/react";
import { axiosUnauthBaseQuery } from "./request";


const unauthBaseApi = createApi({
  reducerPath: "unauthBaseApi",
  baseQuery: axiosUnauthBaseQuery({
    baseUrl: "",
    headers: {
     'Content-Type': 'application/json',
    },
  }),
  endpoints: () => ({}),
});

export default unauthBaseApi;
