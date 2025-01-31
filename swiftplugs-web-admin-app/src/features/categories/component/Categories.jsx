import React, { useCallback, useEffect, useState } from 'react';
import "../style/categories.scss";
import languages from '../../../common/languages/languages';
import CategoriesList from './CategoriesList';
import Modal from "../../../common/customComponents/CustomModal";
import AddCategory from './AddCategory';
import CustomButton from '../../../common/customComponents/CustomButton';
import { useGetCategoryQuery } from '../services/categoriesApi';


function Categories() {
  const [openAddCat, setOpenAddCat] = useState(false);
  const [openEditCat, setOpenEditCat] = useState(false);
  const {data: categories , refetch , isLoading: categoryLoading} = useGetCategoryQuery();

  if (categories?.data?.length > 0) {localStorage.setItem("categories", JSON.stringify(categories?.data))};

const categoryList = categories?.data 
  const langs = languages("category");
  const onOpenAdd = useCallback(() => {
    setOpenAddCat(true);
  });
  const onOpenEdit = useCallback(() => {
    setOpenEditCat(true);
  });
  const onCloseModal = useCallback(() => {
    setOpenAddCat(false);
    setOpenEditCat(false);
  })
  useEffect(()=>{
    if (categories?.data?.length > 0) {localStorage.setItem("categories", JSON.stringify(categories?.data))};
  },[refetch]);
  return (
    <div className='category'>
      <div className="header">
        <CustomButton onClick={() => onOpenAdd()} title={langs.createCategory} />
      </div>
      <CategoriesList languages={languages} categoryList={categoryList} refetch={refetch}/>
      <Modal size="mini"
        style={{ width: "400px", height: "auto", paddingBlock: "0rem" }}
        open={openAddCat}
        onClose={onCloseModal} >
        <AddCategory languages={languages} onCloseModal={onCloseModal} refetch={refetch} />
      </Modal>
    </div>
  )
}

export default Categories