import { configureStore } from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import useThemeReducer from "./common/customHooks/useTheme/slices/useThemeSlice";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistStore,
  } from "redux-persist";
import authBaseApi from "./common/request/authBaseApi";
import unauthBaseApi from "./common/request/unauthBaseApi";
import loginReducer from "./features/userAccount/slices/loginSlice";


  export const store = configureStore({
    reducer:{
         useTheme: useThemeReducer,
[authBaseApi.reducerPath]: authBaseApi.reducer,
[unauthBaseApi.reducerPath]: unauthBaseApi.reducer,
auth:loginReducer,
    }, 
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:{
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            }
        }).concat([authBaseApi.middleware, unauthBaseApi.middleware]),
});


  setupListeners(store.dispatch);
export const persistor = persistStore(store);