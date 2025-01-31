import authBaseApi from "../../../common/request/authBaseApi";
import endpoints from "../../../endpoints";

export const productsApi = authBaseApi.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.mutation({
            query: (data) => ({
                ...endpoints.get_products(data),
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),
        getProductsImg: builder.mutation({
            query: (data) => ({
                ...endpoints.get_products_img(data),
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),
        postProduct: builder.mutation({
            query: (data) => ({
                ...endpoints.post_products,
                data,
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                ...endpoints.update_products,
                data,
                additionalHeaders: { "Content-Type": "application/json" },
            })
        }),
       
    })
})

export const {useGetProductsImgMutation, useGetProductsMutation, usePostProductMutation, useUpdateProductMutation} = productsApi;