import React, { useEffect } from 'react';
import './stylesheets/cart.scss';
import './stylesheets/cart-responsive.scss';
import SectionBreadcrumb from './components/section-breadcrumb/section-breadcrumb';
import SectionMain from './components/section-main/section-main';
import SectionCheckout from './components/section-checkout/section-checkout';
import CheckOutContextProvider from './contexts/checkoutContext';
import ScrollTopReset from '../../utils/scrollTop-reset';

function Cart() {
    useEffect(()=>{
        ScrollTopReset();
    },[])
    return (
        <>
            <title>VnFlower | Giỏ hàng</title>
            <CheckOutContextProvider>
                <SectionBreadcrumb />
                <SectionMain />
                <SectionCheckout />
            </CheckOutContextProvider>
        </>
    );
}

export default Cart;