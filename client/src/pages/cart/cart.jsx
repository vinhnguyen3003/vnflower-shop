import React, { useEffect } from 'react';
import './stylesheets/cart.scss';
import './stylesheets/cart-responsive.scss';
import Header from './../../components/header/header';
import Footer from './../../components/footer/footer';
import SectionBreadcrumb from './components/section-breadcrumb/section-breadcrumb';
import SectionMain from './components/section-main/section-main';
import SectionCheckout from './components/section-checkout/section-checkout';
import Message from '../../components/message/message';
import CheckOutContextProvider from './contexts/checkoutContext';
import ScrollTopReset from '../../utils/scrollTop-reset';

function Cart() {
    useEffect(()=>{
        ScrollTopReset();
    },[])
    return (
        <div className="app">
            <title>VnFlower | Giỏ hàng</title>
            <Header />
            <CheckOutContextProvider>
                <SectionBreadcrumb />
                <SectionMain />
                <SectionCheckout />
            </CheckOutContextProvider>
            <Footer />
            <Message />
        </div>
    );
}

export default Cart;