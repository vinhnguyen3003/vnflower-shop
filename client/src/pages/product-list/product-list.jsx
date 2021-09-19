import React, { useEffect } from 'react';
import './stylesheets/product-list.scss';
import './stylesheets/product-list-responsive.scss';
import Header from './../../components/header/header';
import Footer from './../../components/footer/footer';
import SectionBreadcrumb from './components/section-breadcrumb/section-breadcrumb';
import SectionMain from './components/section-main/section-main';
import ScrollTopReset from '../../utils/scrollTop-reset';
import PrListContextProvider from './contexts/prListContext';
import Message from '../../components/message/message';

function ProductList() {
    useEffect(()=>{
        ScrollTopReset();
    },[])
    return (
        <div className="app">
            <title>VnFlower | Danh sách sản phẩm</title>
            <Header />
            <SectionBreadcrumb />
            <PrListContextProvider>
                <SectionMain />
            </PrListContextProvider>
            <Footer />
            <Message />
        </div>
    );
}

export default ProductList;