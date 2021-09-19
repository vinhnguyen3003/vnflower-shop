import React from 'react';
import SidebarAdmin from '../sidebar-admin/sidebar-admin';
import TopNavAdmin from '../top-nav-admin/top-nav-admin';
import HelloImage from './images/hi.png';
import './stylesheets/dashboard-admin.scss';


function DashboardAdmin(props) {
    return (
        <div className="app">
            <title>Admin | Trang chủ</title>
            <TopNavAdmin />
            <SidebarAdmin {...props}/>
            <div className="wrapper">
                <div className="dashboard-admin">
                    <img src={HelloImage} alt="" />
                    <span>Xin chào, Admin</span>
                    <span>Rất vui khi bạn trở lại, mời bạn chọn thao tác cần thực hiện</span>
                </div>
            </div>
        </div>
    );
}

export default DashboardAdmin;