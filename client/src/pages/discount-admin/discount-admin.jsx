import React from 'react';
import './stylesheets/discount-admin.scss';
import './stylesheets/discount-admin-responsive.scss';
import SidebarAdmin from '../../components/sidebar-admin/sidebar-admin';
import TopNavAdmin from '../../components/top-nav-admin/top-nav-admin';
import DiscountAdminLeft from './components/discount-admin-left';
import DiscountAdminRight from './components/discount-admin-right';
import DiscountAdminContextProvider from './contexts/discountAdminContext';

function DiscountAdmin(props) {
    return (
        <div className="app">
            <title>Admin | Chương trình khuyến mãi</title>
            <TopNavAdmin />
            <SidebarAdmin {...props}/>
            <div className="wrapper">
                <div className="discount-admin-wrapper">
                    <DiscountAdminContextProvider>
                        <DiscountAdminLeft />
                        <DiscountAdminRight />
                    </DiscountAdminContextProvider>
                </div>
            </div>
        </div>
    );
}

export default DiscountAdmin;