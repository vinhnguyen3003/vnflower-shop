import React, { useEffect } from 'react';
import './stylesheets/product-list.scss';
import './stylesheets/product-list-responsive.scss';
import SectionBreadcrumb from './components/section-breadcrumb/section-breadcrumb';
import SectionMain from './components/section-main/section-main';
import ScrollTopReset from '../../utils/scrollTop-reset';
import PrListContextProvider from './contexts/prListContext';

function ProductList() {
    useEffect(()=>{
        ScrollTopReset();
    },[])
    return (
        <>
            <title>VnFlower | Danh sách sản phẩm</title>
            <SectionBreadcrumb />
            <PrListContextProvider>
                <SectionMain />
            </PrListContextProvider>
        </>
    );
}

export default ProductList;