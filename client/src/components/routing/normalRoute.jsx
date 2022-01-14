import React, { memo } from 'react';
import { useState } from 'react';
import { Route } from 'react-router-dom';
import Cart from '../../pages/cart/cart';
import Home from '../../pages/home/home';
import Page404 from '../../pages/page404/page404';
import ProductDetail from '../../pages/product-detail/product-detail';
import ProductList from '../../pages/product-list/product-list';
import FirstNotification from '../first-notification/first-notification';
import WrapperRoute from './wrapperRoute';

function NormalRoute() {console.log('reload')
    const [firstNotiStatus, setFirstNotiStatus] = useState(false);
    return (
        <div className="app-wrapper">
            <FirstNotification 
                handleFirstNoti={(status)=>{setFirstNotiStatus(status)}}
            />
            <WrapperRoute 
                path="/" 
                firstNotiStatus={firstNotiStatus}
                exact
                render={()=>{return <Home />}}
            />
            <WrapperRoute 
                path="/product-list" 
                firstNotiStatus={firstNotiStatus}
                render={()=>{return <ProductList />}}
            />
            <WrapperRoute 
                path="/product-detail/:id" 
                firstNotiStatus={firstNotiStatus}
                render={()=>{return <ProductDetail />}}
            />
            <WrapperRoute 
                path="/cart" 
                firstNotiStatus={firstNotiStatus}
                render={()=>{return <Cart />}}
            />
            <Route path="*" exact component={Page404} />
        </div>
    );
}

export default NormalRoute;