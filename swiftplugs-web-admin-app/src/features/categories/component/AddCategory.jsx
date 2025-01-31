import React, { useState } from 'react';
import "../style/categories.scss";
import closeIcon from "../../../images/close.png";
import { useForm } from 'react-hook-form';
import CustomButton from '../../../common/customComponents/CustomButton';
import CustomInput from '../../../common/customComponents/CustomInput';
import { usePostCategoryMutation } from '../services/categoriesApi';
import toaster from '../../../common/utils/toaster';
import deleteSubIcon from "../../../images/removeIcon.png"

function AddCategory({ languages, onCloseModal, refetch }) {
    const [postCategory, postCategoryProps] = usePostCategoryMutation()
    const [subCategories, setSubCategories] = useState([]);

    const langs = languages("category");
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        defaultValues: {
            category: "",
            subCategory: [],
        },
    });

    const handleAddCategory = async (data) => {
        const payload = {
            name: data.category,
            subCategories: subCategories
        };
        try {
             await postCategory(payload).unwrap();
            toaster("success",{
                content: "Category created successfully!"
            })
            setValue("category", "");
            setValue("subCategory", "");
            setSubCategories([]);
            refetch();
        } catch (error) {
            toaster("error", {
                content: error?.data?.message
            })
        }
    };

    const handleCatChange = (event) => {
        const value = event.target.value;
        setValue("category", value);
    };

    const handleSubCatChange = (event) => { const value = event.target.value; setValue("subCategory", value); }; 
    
    const addToList = () => {
        const newSubCategory = watch("subCategory");
        if (
            newSubCategory &&
            typeof newSubCategory === "string" && // Ensure it's a string
            !subCategories.includes(newSubCategory)
        ) {
            setSubCategories((prev) => [...prev, newSubCategory]);
            setValue("subCategory", ""); // Clear the input field after adding
        }
    };

    const handleDeleteSub = (index) => {
        const updatedList = subCategories.filter((_, i) => i !== index);
        setSubCategories(updatedList); // Correctly update the state to an array
    };
    


    return (
        <div className='add_category'>
            <div className='head'>
                <p className="title">{langs.createCategory}</p>
                <img src={closeIcon} alt='closeIcon' width={15} height={15} onClick={onCloseModal} />
            </div>
            <div className="body">
                <form onSubmit={handleSubmit((data) => handleAddCategory(data))} >
                    <CustomInput
                        type="name"
                        placeholder={langs.categoryName}
                        register={register}
                        name="category"
                        label={langs.categoryName}
                        errors={errors}
                        onChange={handleCatChange}
                    />
                    <div className='sub_cat'>
                        <CustomInput
                            type="name"
                            label={langs.subCategoryName}
                            placeholder={langs.subCategoryName}
                            register={register}
                            minLength={0}
                            name="subCategory"
                            errors={errors}
                            required={false}
                            onChange={handleSubCatChange}
                        />
                        <div onClick={addToList} className='add_list' style={{ cursor: "pointer" }}> Add </div>
                    </div>

                    {subCategories.length > 0 && <div className="list">
                        {subCategories.map((sub, index) =>
                            <div key={index} className='sub'>
                                <p>{sub}</p>
                                <img src={deleteSubIcon} alt='remove' width={10} height={10} style={{ cursor: "pointer" }} onClick={() => handleDeleteSub(index)} />
                            </div>)}
                    </div>}


                    <CustomButton title={langs.createCategory} isBusy={postCategoryProps.isLoading} className="btn" />
                </form>
            </div>

        </div>
    )
}

export default AddCategory