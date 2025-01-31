export default {
    login: {
        url: "/api/v1/auth/login",
        method: "post"
    },
    signup: {
        url: "/api/v1/auth/sign-up",
        method: "post"
    },
    reset_password: {
        url: "/auth/reset-password/initiate",
        method: "post"
    },

    //category
    post_category: {
        url: "/api/v1/config/category/create",
        method: "post"
    },
    get_category: {
        url: "/api/v1/config/category/get",
        method: "get"
    },
    delete_category: {
        url: "/api/v1/config/category/delete",
        method: "delete"
    },
    //country
    get_country_code: {
        url: "/api/v1/config/country-code/get",
        method: "get"
    },
  

    //products
    post_products: {
        url: "/api/v1/products/add",
        method: "post"
    },
    update_products: {
        url: "/api/v1/products/update",
        method: "put"
    },
    get_products: ({countryCode, categoryId, page, size}) => ({
        url: `/api/v1/products/get?countryCode=${countryCode}&categoryId=${categoryId}&page=${page}&size=${size}`,
        method: "get"
    }),
    get_products_img: ({id}) => ({
        url: `/api/v1/products/img/get?${id}`,
        method: "get"
    }),

    //orders
    get_orders: ({ userId }) => ({
        url: `/api/v1/orders?${userId}`,
        method: "get"
    }),
    post_order: {
        url: "/api/v1/orders",
        method: "post"
    },
 
};