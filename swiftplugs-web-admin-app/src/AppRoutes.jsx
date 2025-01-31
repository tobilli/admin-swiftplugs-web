import React from "react";
import { Routes, Route } from "react-router-dom";
import { AUTH, DASHBOARD } from "./RouteConstants";
import Signin from "./features/userAccount/signin/component/Signin";
import Signup from "./features/userAccount/signup/component/Signup";
import ProtectedRoutes from "./common/ProtectedRoutes";
import ResetPassword from "./features/userAccount/forgotPassword/component/ResetPassword";
import Layout from "./features/layout/component/DashboardLayout";
import HomePlaceholder from "./features/homePlaceholder/HomePlaceholder";
import Categories from "./features/categories/component/Categories";
import Products from "./features/products/component/Products";
import Orders from "./features/orders/components/Orders";
import User from "./features/customers/component/User";




const AppRoutes = props => {
    return (
        <Routes>
            <Route path={DASHBOARD.INDEX} element={<ProtectedRoutes{...props} />}>
            <Route path={DASHBOARD.INDEX} element={<Layout {...props}/>}>
                <Route path={DASHBOARD.HOME} element={<HomePlaceholder {...props}/>}/>
                <Route path={DASHBOARD.CATEGORIES} element={<Categories {...props}/>}/>
                <Route path={DASHBOARD.PRODUCTS} element={<Products {...props}/>}/>
                <Route path={DASHBOARD.ORDERS} element={<Orders {...props}/>}/>
                <Route path={DASHBOARD.CUSTOMERS} element={<User {...props}/>}/>
                
                </Route>
            </Route>


            {/* <Route path="*" element={<Signin {...props} />} /> */}
            <Route path={AUTH.SIGNIN} element={<Signin {...props} />} />
            <Route path={AUTH.RESETPASSWORD} element={<ResetPassword {...props} />} />
        </Routes>
    )
}

export default AppRoutes;