import authBaseApi from "../../../common/request/authBaseApi";
import endpoints from "../../../endpoints";

export const categoriesApi = authBaseApi.injectEndpoints({
    endpoints: builder => ({
        getCategory: builder.query({
            query: () => ({
                ...endpoints.get_category,
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),
        getCountryCode: builder.query({
            query: () => ({
                ...endpoints.get_country_code,
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),
        postCategory: builder.mutation({
            query: data => ({
                ...endpoints.post_category,
                data,
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),
        deleteCategory: builder.mutation({
            query: data => ({
                ...endpoints.delete_category,
                data,
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),

    })
})

export const { useDeleteCategoryMutation, useGetCategoryQuery, usePostCategoryMutation, useGetCountryCodeQuery } = categoriesApi;