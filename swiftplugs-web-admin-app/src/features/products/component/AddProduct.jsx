import React, { useEffect, useState } from 'react'
import { usePostProductMutation, useUpdateProductMutation } from '../services/productsApi';
import toaster from "../../../common/utils/toaster";
import "../styles/products.scss";
import closeIcon from "../../../images/close.png";
import { useForm, Controller } from 'react-hook-form';
import { CustomDropdown } from "../../../common/customComponents/CustomSelect"
import CustomInput from '../../../common/customComponents/CustomInput';
import CustomButton from '../../../common/customComponents/CustomButton';
import { Button, TextArea, Input } from 'semantic-ui-react';
import deleteIcon from "../../../images/deleteIcon.png";
import uploadIcon from "../../../images/uploadIcon.png";
import { useGetCountryCodeQuery } from '../../categories/services/categoriesApi';
import CurrencyInput from 'react-currency-input-field';
import deleteSubIcon from "../../../images/removeIcon.png";


function AddProduct({ openEditProd, productDetail, languages, onCloseModal, onGetProductHandle }) {
    const langs = languages("product");
    const [createProduct, createProductProps] = usePostProductMutation();
    const [updateProduct, updateProductProps] = useUpdateProductMutation();
    const [productDetails, setProductDetails] = useState([])
    const [category, setCategory] = useState([]);
    const [getCategory, setGetCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [availableSize, setAvailableSize] = useState([]);
    const [review, setReview] = useState([]);
    const [country, setCountry] = useState({});
    const [currency, setCurrency] = useState({});
    const [stockNo, setStockNo] = useState(openEditProd ? productDetail?.stock : 1);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        reset,
        watch,
        control,
    } = useForm({
        defaultValues: {
            name: "",
            description: "",
            currency: "",
            price: "",
            stockNumber: "",
            availableSize: [],
            review: "",
            manufactiurer: "",
            countryCode: "",
            images: [],
            discount: "",
        },
    });


    const categoryList = JSON.parse(localStorage.getItem('categories'));
    const currencyList = JSON.parse(sessionStorage.getItem('countryCode'));
    const countryList = JSON.parse(sessionStorage.getItem('countryCode'));

    if (!currencyList || !countryList) {
        const { data: countryCode, } = useGetCountryCodeQuery();
        sessionStorage.setItem("countryCode", JSON.stringify(countryCode?.data?.countryCodes))
    };

    const categoryOptions = categoryList.map((category) => ({
        label: category.name,
        value: category.id,
        subCategories: category.subCategories,
    }));
    const currencyOptions = currencyList.map((category) => ({
        label: category.currency,
        value: category.currency,
    }));
    const countryOptions = countryList.map((category) => ({
        label: category.country,
        value: category.code,
    }));

    const reviewOptions = [{
        label: "1",
        value: "1"
    }, {
        label: "2",
        value: "2"
    }, {
        label: "3",
        value: "3"
    }, {
        label: "4",
        value: "4"
    }, {
        label: "5",
        value: "5"
    }]

    const handleNameChange = (event) => {
        const value = event.target.value;
        setValue("name", value);
    };
    const handleDescChange = (event) => {
        const value = event.target.value;
        setValue("description", value);
    };
    const handlePriceChange = (event) => {
        const value = event.target.value.replace(/[^0-9.]/g, "");
        setValue("price", value);
    };

    const handleManufactiurerChange = (event) => {
        const value = event.target.value;
        setValue("manufactiurer", value);
    };
    const handleDiscountChange = (event) => {
        const value = event.target.value.replace(/[^0-9.]/g, "");
        setValue("discount", value);
    };

    const categoryHandler = (event, data) => {
        event.preventDefault();
        const reformatData = {
            label: data.label,
            value: data.value,
            subCategories: data.subCategories,
        };
        const subCategoryOptions = data.subCategories?.map((category) => ({
            label: category.name,
            value: category.id,
            parentId: category.parentId,
        }));
        setCategory(reformatData);
        setGetCategory(subCategoryOptions)
    };
    const currencyHandler = (event, data) => {
        event.preventDefault();
        const reformatData = {
            label: data.label,
            id: data.value,
        };
        setCurrency(reformatData);
    };
    const subCategoryHandler = (event, data) => {
        event.preventDefault();
        const reformatData = { label: data.label, value: data.value };
        setSubCategory(reformatData);
    };
    const countryHandler = (event, data) => {
        event.preventDefault();
        const reformatData = { label: data.label, id: data.value };
        setCountry(reformatData);
    };
    const reviewHandler = (event, data) => {
        event.preventDefault();
        const reformatData = { label: data.label, id: data.value };
        setReview(reformatData);
    };

    const handleAvailableSizeChange = (event) => { const value = event.target.value; setValue("availableSize", value); };

    const addToList = () => {
        const availableSizes = watch("availableSize");
        if (
            availableSizes &&
            typeof availableSizes === "string" && // Ensure it's a string
            !availableSize.includes(availableSizes)
        ) {
            setAvailableSize((prev) => [...prev, availableSizes]);
            setValue("availableSize", ""); // Clear the input field after adding
        }
    };

    const handleDeleteSize = (index) => {
        const updatedList = availableSize.filter((_, i) => i !== index);
        setAvailableSize(updatedList); // Correctly update the state to an array
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const newFile = e.dataTransfer.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                const updatedList = [...productDetails.images, base64String];
                setProductDetails((prev) => ({
                    ...prev,
                    images: updatedList,
                }));
            };
            reader.readAsDataURL(newFile);
        }
    };

    const handleFileChange = (e) => {
        e.preventDefault();
        const newFile = e.target.files[0];
        if (newFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                const currentImages = watch("images") || []; // Get the current images, fallback to an empty array
                const updatedList = [...currentImages, base64String]; // Append the new image
                setValue("images", updatedList);
            };
            reader.readAsDataURL(newFile);
        }
    };

    const handleDelete = (index) => {
        const currentImages = watch("images") || [];
        const updatedList = currentImages.filter((_, i) => i !== index); // Remove the image by index
        setValue("images", updatedList); // Update the 'images' field
    };

    const onCreateHandler = async (data) => {

        if(openEditProd){
            const payload = {
                productId: productDetail.id,
                name: data.name,
                description: data.description,
                unitId: "",
                categoryId: subCategory.value,
                currency: currency.id,
                price: data.price,
                stockNumber: stockNo,
                availableSize: availableSize,
                review: review.id,
                manufactiurer: data.manufacturer,
                countryCode: country.id,
                images: data.images,
                discount: data.discount,
                removeImagesById: [ ],
            }

            try {
                const response = await updateProduct(payload).unwrap();
                toaster("success", {
                    content: `${data.name} updated successfully!!`
                });
                reset();
                setAvailableSize([]);
                setProductDetails([]);
                setCategory([]);
                setReview([]);
                setCountry([]);
                setCurrency([]);
                setStockNo(1);
                onGetProductHandle({ countryCode: "", categoryId: "", size: "", page: "" })
                onCloseModal();
            } catch (error) {
                toaster("error", {
                    content: error?.data?.message
                })
            }
        }else{
            const payload = {
                name: data.name,
                description: data.description,
                unitId: "",
                categoryId: subCategory.value,
                currency: currency.id,
                price: data.price,
                stockNumber: stockNo,
                availableSize: availableSize,
                review: review.id,
                manufactiurer: data.manufacturer,
                countryCode: country.id,
                images: data.images,
                discount: data.discount,
            }
    
            try {
                const response = await createProduct(payload).unwrap();
                toaster("success", {
                    content: response?.description
                });
                reset();
                setAvailableSize([])
                setProductDetails([])
                setCategory([])
                setReview([])
                setCountry([])
                setCurrency([])
                setStockNo(1);
                onGetProductHandle({ countryCode: "", categoryId: "", size: "", page: "" })
            } catch (error) {
                toaster("error", {
                    content: error?.data?.message
                })
            }
        }
    }

    useEffect(() => {
       if (openEditProd ){   
        const categoryList = JSON.parse(localStorage.getItem('categories'));
        const countryList = JSON.parse(sessionStorage.getItem('countryCode'));
        const reviewOptions = [{
            label: "1",
            value: "1"
        }, {
            label: "2",
            value: "2"
        }, {
            label: "3",
            value: "3"
        }, {
            label: "4",
            value: "4"
        }, {
            label: "5",
            value: "5"
        }]

        const country = countryList.find((item) => item.code === productDetail?.countryCode);
        setCountry({ label: country.country, id: country.code });
        setCurrency({ label: country.currency, id: country.currency });

        const findCategoryAndSubCategory = () => { 
            for (let cat of categoryList) 
            { if (Number(cat.id) === Number(productDetail?.categoryId)) {
                 setCategory({ value: cat.id, label: cat.name, subCategories: cat.subCategories });
                setSubCategory({label: cat.subCategories.name , value: cat.subCategories.id}); 
                } 
                const subCat = cat.subCategories.find(sub => Number(sub.id) === Number(productDetail?.categoryId) || Number(sub.parentId) === Number(productDetail?.categoryId)); 
                if (subCat) {
                    setCategory({ value: cat.id, label: cat.name });
                    setSubCategory({label: subCat.name , value: subCat.id}); 
                }
            }
            };

        findCategoryAndSubCategory(productDetail);

        const rev = reviewOptions.find((item) => Number(item.value) === productDetail?.review);
        setReview({ label: rev.label, id: rev.value })

        reset({
            name: productDetail?.name || "",
            description: productDetail?.description || "",
            currency: "",
            price: productDetail?.basePrice || "",
            stockNumber: "",
            availableSize: [],
            review: "",
            manufacturer: productDetail?.manufactiurer || "",
            countryCode: "",
            images: productDetail?.images || [],
            discount: productDetail?.discount || "",
        })
}
    },[openEditProd === true])


    return (
        <div className='add__product'>
            <div className='head'>
                {openEditProd ? <p className="title">{langs.editProduct}</p> :
                    <p className="title">{langs.createProduct}</p>}
                <img src={closeIcon} alt='closeIcon' width={15} height={15} onClick={onCloseModal} />
            </div>

            <div className="body">
                <form onSubmit={handleSubmit((data) => onCreateHandler(data))} >
                    <div className="row">
                        <CustomInput
                            type="name"
                            placeholder={langs.productNamePlace}
                            register={register}
                            isDisabled={openEditProd}
                            name="name"
                            label={langs.productName}
                            errors={errors}
                            onChange={handleNameChange}
                        />
                        <CustomInput
                            type="name"
                            label={langs.manufacturer}
                            placeholder={langs.manufacturer}
                            register={register}
                            name="manufacturer"
                            errors={errors}
                            onChange={handleManufactiurerChange}
                        />
                    </div>
                    <div className="row">

                        <div className="product__wrap">
                            <span>{langs.category}</span>
                            <CustomDropdown
                                value={category}
                                placeholder="Select Category" searchPlaceholder="Select Category"
                                options={categoryOptions}
                                OnChange={categoryHandler}
                                style={{ height: "50px", whiteSpace: "nowrap", marginTop: "8px" }} upward={false} floating />
                        </div>
                        <div className="product__wrap">
                            <span>{langs.subCategory}</span>
                            <CustomDropdown value={subCategory} placeholder="Select Sub-Category" searchPlaceholder="Select Sub-Category" options={getCategory} OnChange={subCategoryHandler}
                                style={{ height: "50px", whiteSpace: "nowrap", marginTop: "8px" }} upward={false} floating />
                        </div>
                    </div>
                    <div className="row">
                        <div className='price'>
                            <p className="text">
                                {langs.price}
                            </p>
                            <CurrencyInput
                                type="text"
                                placeholder="0.00"
                                decimalSeparator='.'
                                inputMode='numeric'
                                style={{ width: "100%", height: "50px", borderRadius: "4px", border: "none", background: "#f7f6f6", padding: "10px" }}
                                autoComplete='off'
                                value={watch("price")}
                                id='input-field'
                                intlConfig={{ currency: currency.id }}
                                name="price"
                                errors={errors}
                                onChange={handlePriceChange}
                            />
                        </div>
                        <div className='price'>
                            <p className="text">
                                {langs.discount}
                            </p>
                            <CurrencyInput
                                type="text"
                                placeholder="0.00"
                                decimalSeparator='.'
                                inputMode='numeric'
                                style={{ width: "100%", height: "50px", borderRadius: "4px", border: "none", background: "#f7f6f6", padding: "10px" }}
                                autoComplete='off'
                                value={watch("discount")}
                                id='input-field'
                                intlConfig={{ currency: currency.id }}
                                name="discount"
                                errors={errors}
                                onChange={handleDiscountChange}
                            />
                        </div>


                    </div>
                    <div className="row">
                        <div className="product__wrap">
                            <span>{langs.country}</span>
                            <CustomDropdown value={country} placeholder="Select Country" searchPlaceholder="Select Country" options={countryOptions} OnChange={countryHandler} style={{ height: "50px", whiteSpace: "nowrap", marginTop: "8px" }} upward={false} floating />
                        </div>

                        <div className="product__wrap">
                            <span>{langs.currency}</span>
                            <CustomDropdown value={currency} placeholder="Select Currency" searchPlaceholder="Select Currency" options={currencyOptions} OnChange={currencyHandler} style={{ height: "50px", whiteSpace: "nowrap", marginTop: "8px" }} upward={false} floating />
                        </div>
                    </div>
                    <div className="row">
                        <div className="product__wrap">
                            <span>{langs.review}</span>
                            <CustomDropdown value={review} placeholder="Select Review" searchPlaceholder="Select Currency" options={reviewOptions} OnChange={reviewHandler} style={{ height: "50px", whiteSpace: "nowrap", marginTop: "8px" }} upward={false} floating />
                        </div>

                        <div className="stock__wrap">
                            <span>{langs.stockCount}</span>
                            <div className="number">
                                <button type="button" onClick={() => setStockNo(stockNo > 1 ? stockNo - 1 : stockNo)}>-</button>
                                <input value={stockNo} onChange={(e) => setStockNo(Number(e.target.value))} />
                                <button type="button" onClick={() => setStockNo(stockNo + 1)}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className='av_size'>
                            <CustomInput
                                type="name"
                                label={langs.availableSize}
                                placeholder={langs.availableSizePlace}
                                register={register}
                                minLength={0}
                                name="availableSize"
                                errors={errors}
                                required={false}
                                onChange={handleAvailableSizeChange}
                            />
                            <div onClick={addToList} className='add_list' style={{ cursor: "pointer" }}> Add </div>
                        </div>

                        {availableSize.length > 0 && <div className="list">
                            {availableSize.map((sub, index) =>
                                <div key={index} className='sub'>
                                    <p>{sub}</p>
                                    <img src={deleteSubIcon} alt='remove' width={10} height={10} style={{ cursor: "pointer" }} onClick={() => handleDeleteSize(index)} />
                                </div>)}
                        </div>}
                    </div>

                    <Controller name="description" control={control} render={({ field }) => (
                    <TextArea
                        label={langs.productDescription}
                        placeholder={langs.productDescriptionPlace}
                        {...field}
                        name="description"
                        errors={errors}
                        onChange={(e, { value }) => field.onChange(value)}
                        className='description'
                    />
                )} />
                    <div className="image_row">
                        <div className='upload__image' onDrop={handleDrop}>
                            <img src={uploadIcon} alt='uploadIcon' width={32} height={32} />
                            <p className="title">
                                {langs.selectImage}
                            </p>
                            <p className="text">{langs.selectImageText}</p>
                            <Input type='file' onChange={handleFileChange} style={{ display: "none" }} id="file-input" />
                            <label htmlFor="file-input">
                                <Button as="span" primary>
                                    {langs.upload}
                                </Button>
                            </label>
                        </div>
                        {watch("images").length > 0 && <div className="image_preview">
                            {(watch("images") || []).map((image, index) => (
                                <div
                                    key={index}
                                    style={{
                                        position: "relative",
                                        display: "inline-block",
                                        margin: "10px",
                                    }}
                                >
                                    <img
                                        src={image}
                                        alt={`uploaded ${index}`}
                                        style={{ width: "150px", height: "150px", margin: "10px" }}
                                    />
                                    <img
                                        src={deleteIcon}
                                        alt="deleteIcon"
                                        style={{
                                            width: "20px",
                                            position: "absolute",
                                            top: "0px",
                                            right: "0px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleDelete(index)}
                                    />
                                </div>
                            ))}
                        </div>}


                    </div>



                    <CustomButton title={openEditProd ? langs.saveChanges :langs.addProduct} className="btn" isBusy={createProductProps.isLoading || updateProductProps.isLoading} />
                </form>
            </div>

        </div>
    )
}

export default AddProduct