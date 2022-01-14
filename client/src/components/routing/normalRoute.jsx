import React from 'react';
import { Route } from 'react-router-dom';
import Cart from '../../pages/cart/cart';
import Home from '../../pages/home/home';
import ProductDetail from '../../pages/product-detail/product-detail';
import ProductList from '../../pages/product-list/product-list';
import FirstNotification from '../first-notification/first-notification';
import Footer from '../footer/footer';
import Header from '../header/header';
import Message from '../message/message';

function NormalRoute() {
    return (
        <div className="app-wrapper">
            <FirstNotification />
            <div className="app">
                <Header />
                <>
                    <Route path="/" exact component={Home}/>
                    <Route path="/product-list" component={ProductList}/>
                    <Route path="/product-detail/:id" component={ProductDetail}/>
                    <Route path="/cart" component={Cart}/>
                </>
                <Footer />
                <Message />
            </div>
        </div>
    );
}

export default NormalRoute;