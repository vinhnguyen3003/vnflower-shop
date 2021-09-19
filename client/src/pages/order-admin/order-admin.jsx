import React from 'react';
import SidebarAdmin from '../../components/sidebar-admin/sidebar-admin';
import TopNavAdmin from '../../components/top-nav-admin/top-nav-admin';
import OrderAdminContent from './components/order-admin-content';
import './stylesheets/order-admin.scss';
//import PropTypes from 'prop-types';

OrderAdmin.propTypes = {
    
};

function OrderAdmin(props) {
    return (
        <div className="app">
            <title>Admin | Đơn hàng</title>
            <TopNavAdmin />
            <SidebarAdmin {...props}/>
            <div className="wrapper">
                <div className="order-admin-wrapper">
                    <div className="order-admin-title">
                        Danh sách đơn hàng
                    </div>
                    <OrderAdminContent />
                </div>
            </div>
        </div>
    );
}

export default OrderAdmin;