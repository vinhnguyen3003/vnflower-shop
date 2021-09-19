import React from 'react';
import TopNav from './../top-nav-admin/top-nav-admin';
import Sidebar from './../sidebar-admin/sidebar-admin';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProductAdmin from '../../pages/product-admin/product-admin';
import DashboardAdmin from '../dashboard-admin/dashboard-admin';
// import PropTypes from 'prop-types';

LayoutAdmin.propTypes = {
    
};

function LayoutAdmin(props) {
    return (
        <div className="app">
            <TopNav />
            <Sidebar />
            <BrowserRouter>
                <Switch>
                    <Route path="/product" component={ProductAdmin}/>
                    <Route path="/" exact component={DashboardAdmin}/>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default LayoutAdmin;