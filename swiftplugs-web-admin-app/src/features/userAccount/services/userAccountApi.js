import authBaseApi from "../../../common/request/authBaseApi";
import endpoints from "../../../endpoints";

export const userAccountApi = authBaseApi.injectEndpoints({
    endpoints: builder => ({
        postSignin: builder.mutation({
            query: (data) => ({
                ...endpoints.login,
                data,
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),
        postSignup: builder.mutation({
            query: (data) => ({
                ...endpoints.signup,
                data,
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                ...endpoints.reset_password,
                data,
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),
        resetPasswordOtp: builder.mutation({
            query: (data) => ({
                ...endpoints.complete_reset_password,
                data,
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),
    })
})

export const {usePostSigninMutation, usePostSignupMutation, useResetPasswordMutation, useResetPasswordOtpMutation} = userAccountApi;