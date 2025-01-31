import React from "react";
import languages from "../../common/languages/languages";
import Dashboard from "../dashboard/component/Dashboard";
import isMobile from "../../common/utils/isMobile";
import { useGetCategoryQuery, useGetCountryCodeQuery } from "../categories/services/categoriesApi";

const HomePlaceholder = () => {
    const { data: categories, isLoading: categoryLoading } = useGetCategoryQuery();
    const { data: countryCode, isLoading: countryCodeLoading } = useGetCountryCodeQuery();

    if (categories?.data?.length > 0) {localStorage.setItem("categories", JSON.stringify(categories?.data))};

    if (countryCode?.data?.countryCodes?.length > 0) {sessionStorage.setItem("countryCode", JSON.stringify(countryCode?.data?.countryCodes))};


    return (
        <div className={isMobile() ? "home__dashboardMobile" : "home__dashboard"}>
            {/* {<DashboardSkeleton lineNumber="10"/>: */}
            <Dashboard />

        </div>
    )
}

export default HomePlaceholder;