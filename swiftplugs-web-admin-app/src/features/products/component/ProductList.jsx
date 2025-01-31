import React, { useCallback, useEffect, useState } from 'react'
import { Input } from 'semantic-ui-react';
import CustomTable from "../../../common/customComponents/CustomTable";
import CustomButton from '../../../common/customComponents/CustomButton';
import { CustomDropdown } from '../../../common/customComponents/CustomSelect';

function ProductList({ languages, allProducts, onOpenEdit, setProductDetail, onOpenDetail, onOpenAdd, setCategory, category, setCountry, country }) {
    const langs = languages("product");
    const [filteredData, setFilteredData] = useState([])
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(0)
    const [searchValue, setSearchValue] = useState("");
    const countryList = JSON.parse(sessionStorage.getItem('countryCode'));
    const categoryList = JSON.parse(localStorage.getItem('categories'));
    const pageNo = 6;

    useEffect(() => {
        if (allProducts) {
            const details = allProducts;
            setTotalPage(details?.length);
            setFilteredData(
                details.filter((item, index) => {
                    return (index >= page * pageNo) & (index < (page + 1) * pageNo);
                })
            )
        }
    }, [allProducts, page])

    const tableHeader = [{ name: langs.productName, id: "1", key: "name" }, { name: langs.image, id: "2", key: "images" },
    { name: langs.manufacturer, id: "3", key: "manufactiurer" },
    { name: langs.category, id: "4", key: "categoryId" },
    { name: langs.price, id: "5", key: "basePrice" },
    { name: langs.nairaPrice, id: "6", key: "price" },
    { name: langs.country, id: "7", key: "countryCode" },
    { name: langs.stock, id: "8", key: "stock" },
    { name: langs.action, id: "9", key: "action" }];

    const selectAllOption = { label: langs.selectAll, value: "", subCategories: "" };

    // const handleSearchValue = useCallback(({ target: { value } }) => {
    //     setSearchValue(value);

    //     const filterParams = [
    //         "accountID",
    //         "fullName",
    //         "emailAddress",
    //         "phoneNumber",
    //     ];

    //     if (value.length > 0) {
    //         const searchTerm = value.toLocaleLowerCase();
    //         // Filter clients based on search term
    //         const filteredClients = clientList?.filter((client) =>
    //             filterParams.some((prop) =>
    //                 client[prop]?.toString()?.toLocaleLowerCase().includes(searchTerm)
    //             )
    //         );

    //         setTotalPage(filteredClients.length);
    //         setFilteredData(
    //             filteredClients.filter((item, index) => {
    //                 return index >= page * pageNo && index < (page + 1) * pageNo;
    //             })
    //         );
    //     } else {
    //         const details = [...clientList];
    //         setTotalPage(details.length);
    //         setFilteredData(
    //             details.filter((item, index) => {
    //                 return index >= page * pageNo && index < (page + 1) * pageNo;
    //             })
    //         );
    //     }
    // }, [allProducts, page, pageNo]);
    const categoryOptions = [ selectAllOption,
         ...categoryList.map((category) => ({ label: category.name, value: category.id, subCategories: category.subCategories, })) ];

    const countryOptions = [selectAllOption,
        ...countryList.map((category) => ({
        label: category.country,
        value: category.code,
    }))];

    const categoryHandler = (event, data) => {
        event.preventDefault();
        const reformatData = {
            label: data.label,
            value: data.value,
            subCategories: data.subCategories,
        };
        setCategory(reformatData);
    };
    const countryHandler = (event, data) => {
        event.preventDefault();
        const reformatData = { label: data.label, id: data.value };
        setCountry(reformatData);
    };

    return (
        <div className='product_list'>
            {allProducts ? <div>
                <div className='header'>
                    <div className='search_field'>
                        <Input icon='search' placeholder='Category Name' style={{ width: "400px" }} value={searchValue} onChange="" />
                    </div>

                    <div className='right'>
                        <CustomDropdown value={country}
                            placeholder="Select Country" searchPlaceholder="Select Country"
                            options={countryOptions}
                            OnChange={countryHandler}
                            style={{ height: "50px", width:"130px", whiteSpace: "nowrap", marginTop: "8px" }}
                            upward={false} floating />

                        <CustomDropdown
                            value={category}
                            placeholder="Select Category" searchPlaceholder="Select Category"
                            options={categoryOptions}
                            OnChange={categoryHandler}
                            style={{ height: "50px", width:"130px", whiteSpace: "nowrap", marginTop: "8px" }} upward={false} floating />

                        <CustomButton onClick={() => onOpenAdd()} title={langs.createProduct} className="btn" />
                    </div>
                </div>
                <p className="title">
                    {langs.productList}
                </p>
                <CustomTable tableHeader={tableHeader} filteredData={filteredData} setPage={setPage} totalPage={totalPage} pageNo={pageNo}
                    onOpenDetail={onOpenDetail}
                    setProductDetail={setProductDetail} onOpenEdit={onOpenEdit}
                />
            </div> : <div>
            </div>}


        </div>
    )
}

export default ProductList