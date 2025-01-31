import React from 'react';
import closeIcon from "../../../images/close.png";
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import "../styles/products.scss";
import CustomRateStar from '../../../common/customComponents/CustomRateStar';

function ProductDetails({ languages, onCloseModal, productDetail }) {
    const langs = languages("product");
    const categoryList = JSON.parse(localStorage.getItem('categories'));
    const currencyList = JSON.parse(sessionStorage.getItem('countryCode'));
    const countryList = JSON.parse(sessionStorage.getItem('countryCode'));
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
    const carosealImg = productDetail?.images?.map((item) => ({
        original: item,
        thumbnail: item
    }))

    const amountBaseFormat = (amt, currencyCode) => {
        const amount = amt.toLocaleString("en-US", {
            style: "currency",
            currency: currencyCode,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return amount;
    };

    const amountFormat = (amt) => {
        const amount = amt.toLocaleString("en-NG", {
            style: "currency",
            currency: "NGN",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        return amount;
    };



    const categories = (id) => {
        for (let cat of categoryList) {
            if (Number(cat.id) === Number(id)) { return cat.name; }
            const subCat = cat.subCategories.find(sub => Number(sub.id) === Number(id) || Number(sub.parentId) === Number(id));
            if (subCat) { return subCat.name; }
        }
        return null;
    }
    const findCategoryOrParentNameById = (id) => {
        for (let cat of categoryList) {
            if (Number(cat.id) === Number(id)) {
                return cat.name;
              }
              const subCat = cat.subCategories.find(sub => Number(sub.id) === Number(id));
              if (subCat) {
                return cat.name;
              }
        }
    };

    const info = [{ title: langs.stock, value: productDetail.stock },
    { title: langs.manufacturer, value: productDetail.manufactiurer },
    { title: langs.category, value: categories(productDetail.categoryId)},
    { title: langs.subCategory, value: findCategoryOrParentNameById(productDetail.categoryId) }]


    return (
        <div className='product_details'>
            <div className='head'>
                <p className="title">{langs.productDetails}</p>
                <img src={closeIcon} alt='closeIcon' width={15} height={15} onClick={onCloseModal} />
            </div>

            <div className="body">
                <section className="left">
                    <ImageGallery items={carosealImg} showThumbnails={true} showPlayButton={false}
                        showFullscreenButton={false}
                        showNav={false}
                        showBullets={true}
                    />
                </section>
                <section className="right">
                    <p className="title">{productDetail.name}</p>
                    <CustomRateStar rate={productDetail?.review} />
                    <section className="prices">
                        <h2 className="price">
                            {amountBaseFormat(productDetail?.basePrice, countryList.find((curr) => curr.code === productDetail.countryCode)?.currency)}
                        </h2>
                        <h3 className="price">
                            {amountFormat(productDetail?.price)}
                        </h3>
                    </section>
                    <section className="details">
                        <p className='description'>{productDetail?.description}</p>
                        {productDetail?.availableSize && <aside>
                            <p>{langs.availableSize}</p>
                            <p>{productDetail?.availableSize}</p>
                        </aside>}
                    </section>
                    <div className='general'>
                        <p className='title'>{langs.generalInfo}</p>
                        {info.map((item, index) =>
                            <div key={index} className='list'>
                                <p className='title'>{item.title}</p>
                                <p className='value'>{item.value}</p>
                            </div>
                        )}

                    </div>

                </section>
            </div>
        </div>
    )
}

export default ProductDetails