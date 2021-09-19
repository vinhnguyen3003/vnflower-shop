import React from 'react';
import SidebarAdmin from '../../components/sidebar-admin/sidebar-admin';
import TopNavAdmin from '../../components/top-nav-admin/top-nav-admin';
import ProductModal from './components/product-modal';
import CartHeader from './components/cart-header';
import CartContent from './components/cart-content';
import './stylesheets/product-admin.scss';
import ProductAdminProvider from './contexts/productAdminContext';


function ProductAdmin(props) {
    return (
        <div className="app">
            <title>Admin | Sản phẩm</title>
            <TopNavAdmin />
            <SidebarAdmin {...props}/>
            <ProductAdminProvider>
                <div className="wrapper">
                    <div className="product-admin-wrapper">
                        <div className="card">
                            <CartHeader />
                            <CartContent />
                        </div>
                    </div>
                    <ProductModal />
                </div>
            </ProductAdminProvider>
        </div>
    );
}

export default ProductAdmin;