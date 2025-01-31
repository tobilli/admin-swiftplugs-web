import React, { useCallback, useState, useEffect } from 'react'
import AddProduct from './AddProduct';
import Modal from '../../../common/customComponents/CustomModal';
import ProductList from './ProductList';
import languages from '../../../common/languages/languages';
import "../styles/products.scss";
import toaster from "../../../common/utils/toaster";
import { useGetProductsMutation } from "../services/productsApi";
import ProductDetails from './ProductDetails';

function Products() {
  const [openAddProd, setOpenAddProd] = useState(false);
  const [openEditProd, setOpenEditProd] = useState(false);
  const [openDetailProd, setOpenDetailProd] = useState(false);
  const [allProducts, setAllProducts] = useState([])
  const [productDetail, setProductDetail] = useState({})
  const [category, setCategory] = useState({});
  const [country, setCountry] = useState({});
  const [getProduct, getProductProps] = useGetProductsMutation()

  const langs = languages("product");
  const onOpenAdd = useCallback(() => {
    setOpenAddProd(true);
  });
  const onOpenEdit = useCallback(() => {
    setOpenEditProd(true);
  });
  const onOpenDetail = useCallback(() => {
    setOpenDetailProd(true);
  });
  const onCloseModal = useCallback(() => {
    setOpenAddProd(false);
    setOpenDetailProd(false);
    setOpenEditProd(false);
    setProductDetail({});
  });

  const onGetProductHandle = async ({ countryCode, categoryId , size, page}) => {
    const payload = {
      countryCode,
      categoryId,
      page,
      size,
    }
    try {
      const response = await getProduct(payload).unwrap();
      setAllProducts(response?.data)
    } catch (error) {
      toaster("error", {
        context: error?.data?.message
      })
    }
  }

  useEffect(() => {
    const countryCode = country.id || "";
    const categoryId = category.value || "";
    const page = "";
    const size = "";

    onGetProductHandle({ countryCode, categoryId, page, size });
  }, [category, country])
  return (
    <div className='product'>
      <div className="body">
       <ProductList languages={languages} allProducts={allProducts} onOpenEdit={onOpenEdit} onOpenAdd={onOpenAdd} setProductDetail={setProductDetail} onOpenDetail={onOpenDetail} setCategory={setCategory} setCountry={setCountry} country={country} category={category}/>
      </div>


      <Modal size="large"
        style={{ width: "60vw", height: "auto", paddingBlock: "0rem" }}
        open={openAddProd}
        onClose={onCloseModal}
         >
        <AddProduct languages={languages} onCloseModal={onCloseModal} openEditProd={openEditProd} 
        productDetail={productDetail} onGetProductHandle={onGetProductHandle} />
      </Modal>

      <Modal size="large"
        style={{ width: "60vw", height: "70vh", paddingBlock: "0rem" }}
        open={openDetailProd}
        onClose={onCloseModal}
        closeOnDimmerClick={true} >
        <ProductDetails languages={languages} onCloseModal={onCloseModal} productDetail={productDetail}/>
      </Modal>

      <Modal size="large"
        style={{ width: "60vw", height: "auto", paddingBlock: "0rem" }}
        open={openEditProd}
        onClose={onCloseModal} >
        <AddProduct languages={languages} onCloseModal={onCloseModal} productDetail={productDetail} onGetProductHandle={onGetProductHandle} openEditProd={openEditProd}/>
      </Modal>

    </div>
  )
}

export default Products